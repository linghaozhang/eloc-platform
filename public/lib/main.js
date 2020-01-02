(function (global, factory) {
    factory(global);
}(typeof window !== "undefined" ? window : this, function (global) {
    var config = global.rabbitmq.config;
    var client;
    var isConnected = false;
    var reconInv;
    var subscribeCallbackArray = new Array();
    var tagCallback = function (tag, callback) {
        var callbackArray = new Array();
        callbackArray.push(callback);

        this.tag = tag;
        this.callbackArray = callbackArray;
        this.subscribeId = '';
    };

    var onOutputCallback;


    //替代find方法(find不兼容ie11及更早版本不兼容)
    function ofind(arr, tagt) {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i].tag == tagt) {
                return arr[i];
            }
        }
    }

    var connect = function (successCallback, errorCallback) {
        var ws = new SockJS(config.url);
        client = Stomp.over(ws);
        client.heartbeat.outgoing = config.heartbeatoutgoing;
        client.heartbeat.incoming = config.heartbeatincoming;
        if (onOutputCallback != null) {
            onOutputCallback('Test Connect');
        }

        //用户名，密码，连接成功回调，连接失败回调
        client.connect(config.username, config.password, successCallback, function (msg) {
            errorCallback(msg);
            if (msg.indexOf('Lost connection') != -1) {
                reconnect(successCallback, errorCallback);
            }
        }, '/');

    };

    var reconnect = function (successCallback, errorCallback) {
        var connected = false;
        reconInv = setInterval(function () {
            var ws = new SockJS(config.url);
            client = Stomp.over(ws);

            client.heartbeat.outgoing = config.heartbeatoutgoing;
            client.heartbeat.incoming = config.heartbeatincoming;

            if (onOutputCallback != null) {
                onOutputCallback('ReTest Connect');
            }

            client.connect(config.username, config.password, function () {
                clearInterval(reconInv);
                connected = true;
                successCallback();
            }, function (msg) {
                errorCallback(msg);
                if (connected && msg.indexOf('Lost connection') != -1) {
                    reconnect(successCallback, errorCallback);
                }
            }, '/');
        }, config.reconnectperiod);
    };

    var on_connect = function () {

        isConnected = true;
        if (onOutputCallback != null) {
            onOutputCallback('RabbitMQ Server connected!');
        }

        $.each(subscribeCallbackArray, function (index, item) {
            var subscribeResult = client.subscribe(item.tag, on_DataReceive);
            item.subscribeId = subscribeResult.id;
        });
    };

    var on_DataReceive = function (data) {
        /*var currentTagCallback = subscribeCallbackArray.find(function (item, index, array) {
            return item.tag == data.headers.destination;
        });*/
        var currentTagCallback = ofind(subscribeCallbackArray, data.headers.destination);

        if (currentTagCallback != null) {
            $.each(currentTagCallback.callbackArray, function (index, item) {
                item(data);
            });
        }
    };

    var on_error = function (msg) {
        isConnected = false;

        if (onOutputCallback != null) {
            onOutputCallback('Error: ' + msg);
        }
    };

    var sendMsg = function (tag, msg) {
        if (isConnected == true) {
            client.send(tag, {}, msg);
        }
    };

    var init = function (parameter, outputCallback) {
        config.url = parameter.url;
        config.username = parameter.username;
        config.password = parameter.password;

        onOutputCallback = outputCallback;

        if (onOutputCallback != null) {
            onOutputCallback('init');
        }

        connect(on_connect, on_error);
    };

    var disconnect = function () {
        if (reconInv != null) {
            clearInterval(reconInv);
        }

        if (client != null && client.connected == true) {
            client.disconnect();

            if (onOutputCallback != null) {
                onOutputCallback('disconnect success!');
            }
        }
    };
    //订阅消息(路由，回调函数)
    var subscribe = function (tag, callback) {

        /*var currentTagCallback = subscribeCallbackArray.find(function (item, index, array) {
            return item.tag == tag;
        });*/

        var currentTagCallback = ofind(subscribeCallbackArray, tag);

        if (currentTagCallback == null) {
            var newTagCallback = new tagCallback(tag, callback);
            subscribeCallbackArray.push(newTagCallback);
            if (client != null && client.connected == true) {
                var subscribeResult = client.subscribe(tag, on_DataReceive);
                newTagCallback.subscribeId = subscribeResult.id;
            }
        } else {
            currentTagCallback.callbackArray.push(callback);
        }

        if (onOutputCallback != null) {
            onOutputCallback(tag + ' subscribe success!');
        }
    };
    //取消订阅(路由，回调函数)
    var unSubscribe = function (tag, callback) {
        /*var currentTagCallback = subscribeCallbackArray.find(function (item, index, array) {
            return item.tag == tag;
        });*/
        var currentTagCallback = ofind(subscribeCallbackArray, tag);
        if (currentTagCallback != null) {
            currentTagCallback.callbackArray.splice($.inArray(callback, currentTagCallback.callbackArray), 1);
            if (currentTagCallback.callbackArray.length == 0) {
                if (client != null && client.connected == true) {
                    client.unsubscribe(currentTagCallback.subscribeId);
                }

                subscribeCallbackArray.splice($.inArray(currentTagCallback, subscribeCallbackArray), 1);
            }

            if (onOutputCallback != null) {
                onOutputCallback(tag + ' unSubscribe success!');
            }
        }
    };

    global.rabbitmq.main = {
        init: init,
        disconnect: disconnect,
        subscribe: subscribe,
        unSubscribe: unSubscribe,
        sendMsg: sendMsg
    };
}));