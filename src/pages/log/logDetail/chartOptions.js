import {getCrossControlMode, getCrossType} from 'utils/utils'

function renderItem(params, api) {
  var yValue = api.value(2);
  var start = api.coord([api.value(0), yValue]);
  var size = api.size([api.value(1) - api.value(0), yValue]);
  var style = api.style();
  return {
    type: 'rect',
    shape: {
      x: start[0],
      y: start[1],
      width: size[0],
      height: size[1]
    },
    style: style
  };
}

export const options = (log) => ({
  tooltip: {
    show: true,
    backgroundColor: '#ffffff',
    textStyle: {color: '#000'},
    padding: [5, 10, 10, 10],
    extraCssText: 'box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.137254901960784);',
    formatter: function (params) {
      const {dataIndex} = params;
      let html = `
              <div class="tips-title">详情：</div>
              <div>
                <div class="table-color">路口编号</div>
                <div class="table-content">${log[dataIndex].crossId}</div>
              </div>
              <div>
                <div class="table-color">路口名称</div>
                <div class="table-content">${log[dataIndex].crossName}</div>
              </div>
              <div>
                <div class="table-color">运行时段</div>
                <div class="table-content">${params.data[0] + '—' + params.data[1]}</div>
              </div>
              <div>
                <div class="table-color">路口状态</div>
                <div class="table-content">${getCrossControlMode(log[dataIndex].controlMode)}</div>
              </div>
              <div>
                <div class="table-color">特殊控制状态</div>
                <div class="table-content">${getCrossType(log[dataIndex].controlType,true)}</div>
              </div>
              <div>
                <div class="table-color">初始子区</div>
                <div class="table-content">${log[dataIndex].fixedSubarea}</div>
              </div>
              <div>
                <div class="table-color">周期</div>
                <div class="table-content">${log[dataIndex].cycle}</div>
              </div>`;
      for (var i = 0; i < log[dataIndex].phasePlan.length; i++) {
        html += `<div>
                  <div class="table-color">&nbsp;</div>
                  <div class="table-content">
                    <span>${log[dataIndex].phasePlan[i].split(" ")[0]}</span>
                    <span style="color: #4bcf4e;">${log[dataIndex].phasePlan[i].split(" ")[1]}</span>
                    <span style="color: #bed04d;">${log[dataIndex].phasePlan[i].split(" ")[2]}</span>
                    <span style="color: #f84a4d;">${log[dataIndex].phasePlan[i].split(" ")[3]}</span>
                  </div>
                 </div>
        `;
      }
      if (log[dataIndex].connectCross.length !== 0) {
        html += `<div>
                  <div class="table-color">&nbsp;</div>
                  <div class="table-content">${log[dataIndex].crossId + '' + log[dataIndex].connectCross + '' + log[dataIndex].offset }</div>
                 </div>`
      }
      return html;
    }
  },
  xAxis: {
    name:'d',
    show: true,
    type: 'time',
    scale: true
  },
  legend: {
    data: [],
    selectedMode: false //取消图例上的点击事件
  },
  yAxis: {
    name: 's',
    nameGap: '6',
    show: true,
    nameTextStyle: {fontSize: 16}
  },
  series: [
    {
      name: 'A',
      type: 'custom',
      renderItem,
      zlevel: 16,
      itemStyle: {
        color: '#FD9D3D'
      },
      dimensions: ['from', 'to', 'profit'],
      encode: {
        x: [0, 1],
        y: 2,
        tooltip: [0, 1, 2],
        itemName: 3
      },
      data: []
    },
    {
      name: 'B',
      type: 'custom',
      renderItem,
      zlevel: 15,
      dimensions: ['from', 'to', 'profit'],
      encode: {
        x: [0, 1],
        y: 2,
        tooltip: [0, 1, 2],
        itemName: 3
      },
      itemStyle: {
        color: '#FDD42C'
      },
      data: []
    },
    {
      name: 'C',
      type: 'custom',
      renderItem,
      zlevel: 14,
      dimensions: ['from', 'to', 'profit'],
      encode: {
        x: [0, 1],
        y: 2,
        tooltip: [0, 1, 2],
        itemName: 3
      },
      itemStyle: {
        color: '#B1D538'
      },
      data: []
    },
    {
      name: 'D',
      type: 'custom',
      renderItem,
      zlevel: 13,
      dimensions: ['from', 'to', 'profit'],
      encode: {
        x: [0, 1],
        y: 2,
        tooltip: [0, 1, 2],
        itemName: 3
      },
      itemStyle: {
        color: '#51C8C4'
      },
      data: []
    },
    {
      name: 'E',
      type: 'custom',
      renderItem,
      zlevel: 12,
      dimensions: ['from', 'to', 'profit'],
      encode: {
        x: [0, 1],
        y: 2,
        tooltip: [0, 1, 2],
        itemName: 3
      },
      itemStyle: {
        color: '#61a8db'
      },
      data: []
    },
    {
      name: 'F',
      type: 'custom',
      renderItem,
      zlevel: 11,
      dimensions: ['from', 'to', 'profit'],
      encode: {
        x: [0, 1],
        y: 2,
        tooltip: [0, 1, 2],
        itemName: 3
      },
      itemStyle: {
        color: '#9c5ed0'
      },
      data: []
    },
    {
      name: 'G',
      type: 'custom',
      renderItem,
      zlevel: 10,
      dimensions: ['from', 'to', 'profit'],
      encode: {
        x: [0, 1],
        y: 2,
        tooltip: [0, 1, 2],
        itemName: 3
      },
      itemStyle: {
        color: '#c856c4'
      },
      data: []
    },
    {
      name: 'H',
      type: 'custom',
      renderItem,
      zlevel: 9,
      dimensions: ['from', 'to', 'profit'],
      encode: {
        x: [0, 1],
        y: 2,
        tooltip: [0, 1, 2],
        itemName: 3
      },
      itemStyle: {
        color: '#fb7272'
      },
      data: []
    },
    {
      name: 'I',
      type: 'custom',
      renderItem,
      zlevel: 8,
      dimensions: ['from', 'to', 'profit'],
      encode: {
        x: [0, 1],
        y: 2,
        tooltip: [0, 1, 2],
        itemName: 3
      },
      itemStyle: {
        color: '#fb79a7'
      },
      data: []
    },
    {
      name: 'J',
      type: 'custom',
      renderItem,
      zlevel: 7,
      dimensions: ['from', 'to', 'profit'],
      encode: {
        x: [0, 1],
        y: 2,
        tooltip: [0, 1, 2],
        itemName: 3
      },
      itemStyle: {
        color: '#f5e48c'
      },
      data: []
    },
    {
      name: 'K',
      type: 'custom',
      renderItem,
      zlevel: 6,
      dimensions: ['from', 'to', 'profit'],
      encode: {
        x: [0, 1],
        y: 2,
        tooltip: [0, 1, 2],
        itemName: 3
      },
      itemStyle: {
        color: '#80ebeb'
      },
      data: []
    },
    {
      name: 'L',
      type: 'custom',
      renderItem,
      zlevel: 5,
      dimensions: ['from', 'to', 'profit'],
      encode: {
        x: [0, 1],
        y: 2,
        tooltip: [0, 1, 2],
        itemName: 3
      },
      itemStyle: {
        color: '#55eec3'
      },
      data: []
    },
    {
      name: 'M',
      type: 'custom',
      renderItem,
      zlevel: 4,
      dimensions: ['from', 'to', 'profit'],
      encode: {
        x: [0, 1],
        y: 2,
        tooltip: [0, 1, 2],
        itemName: 3
      },
      itemStyle: {
        color: '#74b9ff'
      },
      data: []
    },
    {
      name: 'N',
      type: 'custom',
      renderItem,
      zlevel: 3,
      dimensions: ['from', 'to', 'profit'],
      encode: {
        x: [0, 1],
        y: 2,
        tooltip: [0, 1, 2],
        itemName: 3
      },
      itemStyle: {
        color: '#a19afd'
      },
      data: []
    },
    {
      name: 'O',
      type: 'custom',
      renderItem,
      zlevel: 2,
      dimensions: ['from', 'to', 'profit'],
      encode: {
        x: [0, 1],
        y: 2,
        tooltip: [0, 1, 2],
        itemName: 3
      },
      itemStyle: {
        color: '#e07055'
      },
      data: []
    },
    {
      name: 'P',
      type: 'custom',
      renderItem,
      zlevel: 1,
      dimensions: ['from', 'to', 'profit'],
      encode: {
        x: [0, 1],
        y: 2,
        tooltip: [0, 1, 2],
        itemName: 3
      },
      itemStyle: {
        color: '#fab1a0'
      },
      data: []
    }
  ]
});