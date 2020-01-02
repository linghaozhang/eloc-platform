(function (global, factory) {
    factory(global);
}(typeof window !== "undefined" ? window : this, function (global) {
    global.rabbitmq = global.rabbitmq || {};

    global.rabbitmq.config = {
        url: '',
        heartbeatoutgoing: 0,
        heartbeatincoming: 0,
        username: '',
        password: '',
        reconnectperiod: 10000,
    };
}));