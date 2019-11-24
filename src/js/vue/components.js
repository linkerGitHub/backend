import Vue from 'vue';
import SubMenu from 'components/common/sub-menu';
import SearchFilter from 'components/common/search-filter';

Vue.component('SubMenu', SubMenu);
Vue.component('SearchFilter', SearchFilter);
Vue.component('Qiniu', (resolve) => require(['components/common/qiniu'], resolve));
Vue.component('Chart', (resolve) => require(['components/common/chart'], resolve));
Vue.component('RichTextEditor', (resolve) => require(['components/common/richtext-editor'], resolve));
Vue.component('MarkdownEditor', (resolve) => require(['components/common/markdown-editor'], resolve));