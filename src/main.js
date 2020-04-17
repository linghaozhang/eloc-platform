import Vue from 'vue'
import App from './App'
import router from 'router'
import store from 'store'
import ECharts from 'vue-echarts'
import 'echarts/lib/chart/custom'



import 'echarts/lib/component/gridSimple'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/legendScroll'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/component/tooltip'


import {
  Button,
  Menu,
  Icon,
  Modal,
  Form,
  Input,
  Select,
  Tabs,
  Table,
  Tooltip,
  Avatar,
  Badge,
  Dropdown,
  message,
  Spin,
  Radio,
  Checkbox,
  DatePicker,
  LocaleProvider,
  Empty,
  Switch,
  TimePicker,
  Popover,
  Upload,
  Slider
} from 'ant-design-vue';

import {
  Tree,
  Button as ElButton,
  Input as ElInput,
  ButtonGroup as ElButtonGroup,
  Checkbox as ElCheckbox,
  CheckboxGroup as ElCheckboxGroup,
  // TimePicker as ElTimePicker,
  // Form as ElForm,
  // FormItem as ElFormItem
} from 'element-ui';

Vue.component(Button.name, Button);
Vue.component(Button.Group.name, Button.Group);
Vue.component(Radio.Group.name, Radio.Group);
Vue.component(Checkbox.Group.name, Checkbox.Group);
Vue.component(Input.TextArea.name, Input.TextArea);
Vue.component('v-chart', ECharts);
Vue.component(DatePicker.RangePicker.name, DatePicker.RangePicker);
Vue.use(Menu);
Vue.use(Switch);
Vue.use(Slider);
Vue.use(Upload);
Vue.use(Popover);
Vue.use(TimePicker);
Vue.use(LocaleProvider);
Vue.use(Icon);
Vue.use(Empty);
Vue.use(Radio);
Vue.use(Checkbox);
Vue.use(Modal);
Vue.use(Form);
Vue.use(Input);
Vue.use(Select);
Vue.use(Tabs);
Vue.use(Table);
Vue.use(Tooltip);
Vue.use(Avatar);
Vue.use(Badge);
Vue.use(Dropdown);
Vue.use(Spin);
Vue.use(Tree);
Vue.use(ElButton);
Vue.use(ElInput);
Vue.use(ElButtonGroup);
Vue.use(ElCheckbox);
Vue.use(ElCheckboxGroup);
// Vue.use(ElTimePicker);
// Vue.use(ElForm);
// Vue.use(ElFormItem);

Vue.prototype.$message = message;
Vue.prototype.$error = (params) => Modal.error({mask: false, centered: true, ...params});
Vue.prototype.$success = (params) => Modal.success({mask: false, centered: true, ...params});
Vue.prototype.$confirm = (params) => Modal.confirm({mask: false, centered: true, ...params});
Vue.prototype.$info = (params) => Modal.info({mask: false, centered: true, ...params});

if (process.env.NODE_ENV !== 'production') require('./mock')
// require('./mock/release')
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app');