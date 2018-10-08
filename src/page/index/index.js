import 'babel-polyfill'
import 'common/css/index.less'
import './index.less'
import './abc.less'
import aa from './aa.html'
import { chunk } from 'lodash-es';
console.log(chunk(['a', 'b', 'c', 'd'], 2));

const aaa = new Set([1,2,3]);
console.log(Math.random());
console.log(aa);
const bbb = () => {
    console.log('bbb');
}
$('#aaa').html('<span style="color: #ffc">red</span>');

