// 获取地图配置
export const getGisParams = {
	"code":0,
	"msg":{
		"baseResolution":"2",
		"centerPointX":"117.197159",
		"centerPointY":"39.14253",
		"initZoom":15,
		"mapClientUrl":"http://130.3.3.26:8888/EHL_MapClient_V3.0/build/dist/include-gis.js",
		"mapType":"Baidu",
		"maxZoom":18,
		"minZoom":7,
		"originX":"-180",
		"originY":"90",
		"tileUrl":""
	},
	"result":true
}

// 设置地图配置
export const setGisParams = {
	"code":0,
	"msg":{
		"centerPointX":"",
		"centerPointY":"",
		"sid":"370100004012"
	},
	"result":true
}

//获取显示路口的列表
export const getCrossList = {
	"code":0,
	"msg":[
		{
			"controlMode":"C08",
			"crossId":"1007",
			"crossName":"津港公路与静水道交口",
			"crossNo":"1014",
			"division":"历下",
			"pointx":"117.246214",
			"pointy":"39.0254"
		},
		{
			"controlMode":"C08",
			"crossId":"1005",
			"crossName":"津港公路与梨双公路交口",
			"crossNo":"1015",
			"division":"历下",
			"pointx":"117.239714",
			"pointy":"39.032906"
		},
		{
			"controlMode":"C08",
			"crossId":"1006",
			"crossName":"津港公路与外环南路交口",
			"crossNo":"1016",
			"division":"历下",
			"pointx":"117.240436",
			"pointy":"39.03904"
		},
		{
			"controlMode":"C10",
			"crossId":"1010",
			"crossName":"解放南路与珠江道交口",
			"crossNo":"1041",
			"division":"历下",
			"pointx":"117.238206",
			"pointy":"39.069867"
		},
		{
			"controlMode":"C01",
			"crossId":"2099",
			"crossName":"测试路口",
			"crossNo":"20993",
			"division":"历下",
			"pointx":"117.258206",
			"pointy":"39.079867"
		}
	],
	"result":true
};

//获取显示路口详情
export const getCrossTimingPlan = {
	"code":0,
	"msg":{
		"cycle":"",
		"offsetV":"",
		"plDesc":"",
		"planGuid":"",
		"planNo":"",
		"timingPlanInfo":[]
	},
	"result":true
};

// 搜索路口
export const getCrossInfoByFuzzySearch = {
	"code":0,
	"msg":[
		{
			"controlMode":"C08",
			"crossId":"1007",
			"crossName":"津港公路与静水道交口",
			"crossNo":"1014",
			"division":"历下",
			"pointx":"117.246214",
			"pointy":"39.0254"
		},
		{
			"controlMode":"C08",
			"crossId":"1005",
			"crossName":"津港公路与梨双公路交口",
			"crossNo":"1015",
			"division":"历下",
			"pointx":"117.239714",
			"pointy":"39.032906"
		},
		{
			"controlMode":"C08",
			"crossId":"1006",
			"crossName":"津港公路与外环南路交口",
			"crossNo":"1016",
			"division":"历下",
			"pointx":"117.240436",
			"pointy":"39.03904"
		},
		{
			"controlMode":"C10",
			"crossId":"1010",
			"crossName":"解放南路与珠江道交口",
			"crossNo":"1041",
			"division":"历下",
			"pointx":"117.238206",
			"pointy":"39.069867"
		},
		{
			"controlMode":"C01",
			"crossId":"2099",
			"crossName":"测试路口",
			"crossNo":"20993",
			"division":"历下",
			"pointx":"117.258206",
			"pointy":"39.079867"
		}
	],
	"result":true
}

// 框选空间搜索
export const getCrossInfoBySpatialSearch = {
	"code":0,
	"msg":{
		"crossInf":[],
		"spatialCountData":{
			"adaptiveCount":"0",
			"cannotConnectCount":"0",
			"cannotPingCount":"0",
			"centerManualCount":"0",
			"crossNoList":[],
			"inductionCount":"0",
			"localManualCount":"0",
			"offLineCount":"0",
			"todCount":"0",
			"totalSlcCount":"0",
			"vipCount":"0"
		}
	},
	"result":true
}

// // 获取路口详情
export const getCrossInfo = {
	"code":0,
	"msg":{
		"area":"370100",
		"boxKind":"0",
		"ccuName":"eloc-ccu-test-20999",
		"countdownMode":"",
		"countdownStart":"",
		"crossId":"2099",
		"crossName":"测试路口",
		"crossNo":"20993",
		"installDate":1575517253000,
		"isOnline":"1",
		"manualPulse":"",
		"normalPulse":"",
		"organization":"370100000000",
		"pictureName":"",
		"pointX":"117.258206",
		"pointY":"39.079867",
		"remark":"",
		"slcCompany":"ehl",
		"slcId":"2099",
		"slcIp":"130.3.3.118",
		"slcKind":"2",
		"slcPort":"4000"
	},
	"result":true
};

export const setBatchOperation ={
	"code":999,
	"msg":null,
	"result":false
}