export const logTableData = {
  code: 0,
  msg:{
    records: [
      {
        crossId: "1000",
        crossName: "西南角路口",
        crossNo: "1000",
        data: [
          {
            controlMode: "C01",
            crossType: "0",
            endTime: "当前",
            startTime: "2019-07-17 16:46:51"
          },
          {
            controlMode: "C01",
            crossType: "0",
            endTime: "2019-07-17 16:46:51",
            startTime: "2019-07-17 16:46:34"
          },
          {
            controlMode: "C04",
            crossType: "0",
            endTime: "2019-07-17 16:46:34",
            startTime: "2019-07-17 16:46:34"
          }
        ]
      }
    ],
    result: true
  }
};
export const getCrossHistoryPlanDetail = {
  "code": 0,
  "msg": {
      "crossNo": "1001",
      "crossId": "1001",
      "crossName": "鼓楼路口",
      "dataList": [
          {
              "controlMode": "C08",
              "controlType": "0",
              "fixedSubareaId": "",
              "connectCrossName": "",
              "cycle": "0",
              "offset": "0",
              "planInfo": {
                  "coordinateCrossId": "",
                  "coordinateCrossName": "",
                  "coordinateCrossNo": "",
                  "coordinateFlow": "0",
                  "phaseOrderPlan": null,
                  "timingPlan": null
              },
              "startTime": "2019-07-10 11:24:11",
              "endTime": "2019-07-10 11:24:43"
          },
          {
              "controlMode": "C01",
              "controlType": "0",
              "fixedSubareaId": "",
              "connectCrossName": "",
              "cycle": "0",
              "offset": "0",
              "planInfo": {
                  "coordinateCrossId": "",
                  "coordinateCrossName": "",
                  "coordinateCrossNo": "",
                  "coordinateFlow": "0",
                  "phaseOrderPlan": '',
                  "timingPlan": ''
              },
              "startTime": "2019-07-10 11:24:43",
              "endTime": "当前"
          }
      ]
  },
  "result": true
}
export const getCrossHistoryPlanDetailChart = {
  "code": 0,
  "msg": [
          [
              "2019-07-17 09:02:49",
              "2019-07-17 09:13:43",
              25
          ],
          [
              "2019-07-17 09:13:43",
              "2019-07-17 09:15:43",
              25
          ]
        ],
  "result": true
};
export const getCrossHistoryPlanDetailChartData = {
  "code": 0,
  "msg": [
      {
          "controlMode": "C04",
          "controlType": "0",
          "crossId": "1000",
          "startTime": "2019-07-17 16:09:29",
          "endTime": "2019-07-17 16:09:34",
          "crossName": "天华路",
          "connectCross": "",
          "cycle": "72",
          "phasePlan": [
              "A 15 3 0",
              "B 15 3 0",
              "C 15 3 0",
              "D 15 3 0"
          ],
          "fixedSubarea": "3"
      }],
  "result": true
}
