<template>
  <loading v-model:active="isLoading"
           :can-cancel="false"
           :is-full-page="fullPage"/>
  <div style="text-align: left">
    <button @click="query()">执行</button>

  </div>
  <codemirror
      id="editor"
      v-model="code"
      placeholder="Code goes here..."
      :style="{ height: '400px' ,textAlign: 'left'}"
      :autofocus="true"
      :indent-with-tab="true"
      :tab-size="2"
      :extensions="extensions"
      @ready="handleReady"
      @change="log('change', $event)"
      @focus="log('focus', $event)"
      @blur="log('blur', $event)"
  />
  <table border>
    <tr>
      <th v-for="col in head" :key="col">
        {{ col.columnName }}
      </th>
    </tr>
    <tr v-for="cols in list" :key="cols">
      <td v-for="col in cols" :key="col">
        {{ col.value }}
      </td>
    </tr>

  </table>
</template>

<script>
import {defineComponent, shallowRef} from 'vue'
import {Codemirror} from 'vue-codemirror'
import {sql} from '@codemirror/lang-sql'
import {oneDark} from '@codemirror/theme-one-dark'
import {format} from 'sql-formatter';

import key from 'keymaster'
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/css/index.css';


export default defineComponent({
  components: {
    Codemirror,
    Loading
  },
  data() {
    return {
      extensions: null,
      isLoading: false,
      fullPage: true,
      code: `select * from revert_task where store_no =1001 limit 10;`,
      message: 'Hello Vue!',
      head: [{columnName: "a"}, {columnName: "b"}],
      list: [[{value: "111"}, {value: "222"}]]
    }
  },
  setup() {

    // Codemirror EditorView instance ref
    const view = shallowRef()
    const handleReady = (payload) => {
      view.value = payload.view
    }

    return {
      handleReady,
      log: console.log
    }
  },
  methods: {
    async query() {

      this.isLoading = true;
      const res = await (await fetch('test/query?sql=' + encodeURI(this.code))).json();
      this.isLoading = false

      // const res = {"head":[{"columnName":"id"},{"columnName":"store_no"},{"columnName":"box_id"},{"columnName":"gtbs_biz_type_code"},{"columnName":"batch_id"},{"columnName":"car_batch_id"},{"columnName":"status"},{"columnName":"loading_id"},{"columnName":"dc"},{"columnName":"supplier_no"},{"columnName":"tran_store"},{"columnName":"recpt_place"},{"columnName":"warehouse_no"},{"columnName":"sealing_time"},{"columnName":"coursegroup_no"},{"columnName":"coursegroup_name"},{"columnName":"create_id"},{"columnName":"create_time"},{"columnName":"update_id"},{"columnName":"update_time"}],"list":[[{"value":4188},{"value":1001},{"value":"08100123400027216190001"},{"value":"frtw1"},{"value":"FT10012023030300001"},{"value":""},{"value":9},{"value":""},{"value":999100},{"value":58935},{"value":1619},{"value":0},{"value":"10"},{"value":1677811267000},{"value":""},{"value":""},{"value":"魏萍20190239238"},{"value":1677811267000},{"value":"潘青娟20221200438"},{"value":1678153856000}],[{"value":4189},{"value":1001},{"value":"08100123400027216190002"},{"value":"frtw1"},{"value":"FT10012023030300001"},{"value":""},{"value":9},{"value":""},{"value":999100},{"value":58935},{"value":1619},{"value":0},{"value":"10"},{"value":1677812324000},{"value":""},{"value":""},{"value":"王波20190232044"},{"value":1677812324000},{"value":"潘青娟20221200438"},{"value":1678168863000}],[{"value":4190},{"value":1001},{"value":"08100123400027216190003"},{"value":"sts"},{"value":"FT10012023030300001"},{"value":""},{"value":1},{"value":"Y10012023051110001"},{"value":999100},{"value":58935},{"value":1619},{"value":0},{"value":"10"},{"value":1677812324000},{"value":""},{"value":""},{"value":"王波20190232044"},{"value":1677812324000},{"value":"13441李坤2"},{"value":1683767625000}],[{"value":4191},{"value":1001},{"value":"08100123400027216190004"},{"value":"frtw1"},{"value":"FT10012023030300001"},{"value":""},{"value":1},{"value":""},{"value":999100},{"value":58935},{"value":1619},{"value":0},{"value":"10"},{"value":1677812324000},{"value":""},{"value":""},{"value":"王波20190232044"},{"value":1677812324000},{"value":""},{"value":1677812324000}],[{"value":4192},{"value":1001},{"value":"08100123400027216190005"},{"value":"frtw1"},{"value":"FT10012023030300001"},{"value":""},{"value":9},{"value":""},{"value":999100},{"value":58935},{"value":1619},{"value":0},{"value":"10"},{"value":1677812324000},{"value":""},{"value":""},{"value":"王波20190232044"},{"value":1677812324000},{"value":"潘青娟20221200438"},{"value":1678158386000}],[{"value":4193},{"value":1001},{"value":"08100123400027216190006"},{"value":"frtw1"},{"value":"FT10012023030300001"},{"value":""},{"value":9},{"value":""},{"value":999100},{"value":58935},{"value":1619},{"value":0},{"value":"10"},{"value":1677812324000},{"value":""},{"value":""},{"value":"王波20190232044"},{"value":1677812324000},{"value":"潘青娟20221200438"},{"value":1678155918000}],[{"value":4194},{"value":1001},{"value":"08100123400027216190007"},{"value":"frtw1"},{"value":"FT10012023030300001"},{"value":""},{"value":9},{"value":""},{"value":999100},{"value":58935},{"value":1619},{"value":0},{"value":"10"},{"value":1677812324000},{"value":""},{"value":""},{"value":"王波20190232044"},{"value":1677812324000},{"value":"潘青娟20221200438"},{"value":1678155717000}],[{"value":4195},{"value":1001},{"value":"08100123400027216190008"},{"value":"frtw1"},{"value":"FT10012023030300001"},{"value":""},{"value":9},{"value":""},{"value":999100},{"value":58935},{"value":1619},{"value":0},{"value":"10"},{"value":1677812324000},{"value":""},{"value":""},{"value":"王波20190232044"},{"value":1677812324000},{"value":"潘青娟20221200438"},{"value":1678155553000}],[{"value":4196},{"value":1001},{"value":"08100123400027216190009"},{"value":"frtw1"},{"value":"FT10012023030300001"},{"value":""},{"value":9},{"value":""},{"value":0},{"value":82263},{"value":1619},{"value":0},{"value":"10"},{"value":1677812427000},{"value":""},{"value":""},{"value":"王波20190232044"},{"value":1677812427000},{"value":"潘青娟20221200438"},{"value":1678170699000}],[{"value":4197},{"value":1001},{"value":"08100123400027216190010"},{"value":"frtw1"},{"value":"FT10012023030300001"},{"value":""},{"value":9},{"value":""},{"value":0},{"value":82263},{"value":1619},{"value":0},{"value":"10"},{"value":1677812427000},{"value":""},{"value":""},{"value":"王波20190232044"},{"value":1677812427000},{"value":"潘青娟20221200438"},{"value":1678171147000}]]};

      if (res.error) {
        alert(res.error)
        return
      }
      this.head = res.head;
      this.list = res.list;
    }
  }
  ,
  beforeCreate() {
    fetch('test/getSchema').then(res => {
      return res.json()
    }).then(data => {
      this.extensions = [sql({schema: data}), oneDark];
    })
  },
  mounted() {
    key('ctrl+alt+l', () => {
      this.code = format(this.code);
      return false
    });

  }
})
</script>