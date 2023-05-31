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
      isLoading: false,
      fullPage: true,
      code: `select * from revert_task where store_no =1001 limit 10;`,
      message: 'Hello Vue!',
      head: [{columnName: "a"}, {columnName: "b"}],
      list: [[{value: "111"}, {value: "222"}]]
    }
  },
  setup() {
    const extensions = [sql({
      schema: {
        'revert_task': ['id', 'store_no', 'box_id', 'gtbs_biz_type_code', 'batch_id', 'car_batch_id', 'status', 'loading_id', 'dc', 'supplier_no', 'tran_store', 'recpt_place', 'warehouse_no', 'sealing_time', 'coursegroup_no', 'coursegroup_name', 'create_id', 'create_time', 'update_id', 'update_time'],
        'revert_items_daily': ['id', 'store_no', 'batch_id', 'upper_id', 'demand_id', 'warehouse_no', 'revert_type', 'section_no', 'section_name', 'rt_no', 'rt_name', 'business_type', 'buy_price', 'status', 'is_rs', 'is_dc', 'dc', 'dc_name', 'om', 'op', 'supplier_no', 'supplier_name', 'tran_store', 'type', 'pack', 'spec', 'model_id', 'color_id', 'size_id', 'expect_date', 'begin_date', 'end_date', 'limit_qty', 'real_qty', 'pack_qty', 'create_id', 'create_time', 'update_id', 'update_time', 'gtbs_biz_type_code', 'stockout_num', 'supplier_batch_id', 'demand_source', 'recept_location_no'],
        'revert_box_info': ['id', 'store_no', 'box_id', 'gtbs_biz_type_code', 'batch_id', 'car_batch_id', 'status', 'loading_id', 'dc', 'supplier_no', 'tran_store', 'recpt_place', 'warehouse_no', 'sealing_time', 'coursegroup_no', 'coursegroup_name', 'create_id', 'create_time', 'update_id', 'update_time'],
        'revert_box_items': ['id', 'store_no', 'batch_id', 'rt_no', 'rt_name', 'gtbs_biz_type_code', 'box_id', 'pick_qty', 'corr_qty', 'shelf_no', 'status', 'type', 'warehouse_no', 'spec', 'fin_pick_time', 'create_id', 'create_time', 'update_id', 'update_time', 'task_id'],
        'revert_batch_info': ['id', 'store_no', 'batch_id', 'batch_type', 'warehouse_no', 'status', 'gtbs_biz_type_code', 'section_no', 'shelf_no', 'limit_qty', 'business_type', 'dc', 'sku', 'emp_name', 'emp_no', 'dc_name', 'supplier_no', 'supplier_name', 'tran_store', 'create_id', 'create_time', 'update_id', 'update_time', 'item_type', 'bussiness_id', 'receive_addr', 'pick_area_no', 'pick_area_name', 'model_id', 'end_date'],
        'revert_loading_info': ['id', 'store_no', 'loading_id', 'status', 'recpt_place', 'recpt_place_name', 'warehouse_no', 'create_id', 'create_time', 'update_id', 'update_time', 'car_loading_id'],
      },
    }), oneDark]

    // Codemirror EditorView instance ref
    const view = shallowRef()
    const handleReady = (payload) => {
      view.value = payload.view
    }

    return {
      extensions,
      handleReady,
      log: console.log
    }
  },
  methods:{
    async  query(){

      this.isLoading = true;
      const res = await (await fetch('test/query?sql=' + encodeURI(this.code))).json();
      this.isLoading = false

      // const res = {"head":[{"columnName":"id"},{"columnName":"store_no"},{"columnName":"box_id"},{"columnName":"gtbs_biz_type_code"},{"columnName":"batch_id"},{"columnName":"car_batch_id"},{"columnName":"status"},{"columnName":"loading_id"},{"columnName":"dc"},{"columnName":"supplier_no"},{"columnName":"tran_store"},{"columnName":"recpt_place"},{"columnName":"warehouse_no"},{"columnName":"sealing_time"},{"columnName":"coursegroup_no"},{"columnName":"coursegroup_name"},{"columnName":"create_id"},{"columnName":"create_time"},{"columnName":"update_id"},{"columnName":"update_time"}],"list":[[{"value":4188},{"value":1001},{"value":"08100123400027216190001"},{"value":"frtw1"},{"value":"FT10012023030300001"},{"value":""},{"value":9},{"value":""},{"value":999100},{"value":58935},{"value":1619},{"value":0},{"value":"10"},{"value":1677811267000},{"value":""},{"value":""},{"value":"魏萍20190239238"},{"value":1677811267000},{"value":"潘青娟20221200438"},{"value":1678153856000}],[{"value":4189},{"value":1001},{"value":"08100123400027216190002"},{"value":"frtw1"},{"value":"FT10012023030300001"},{"value":""},{"value":9},{"value":""},{"value":999100},{"value":58935},{"value":1619},{"value":0},{"value":"10"},{"value":1677812324000},{"value":""},{"value":""},{"value":"王波20190232044"},{"value":1677812324000},{"value":"潘青娟20221200438"},{"value":1678168863000}],[{"value":4190},{"value":1001},{"value":"08100123400027216190003"},{"value":"sts"},{"value":"FT10012023030300001"},{"value":""},{"value":1},{"value":"Y10012023051110001"},{"value":999100},{"value":58935},{"value":1619},{"value":0},{"value":"10"},{"value":1677812324000},{"value":""},{"value":""},{"value":"王波20190232044"},{"value":1677812324000},{"value":"13441李坤2"},{"value":1683767625000}],[{"value":4191},{"value":1001},{"value":"08100123400027216190004"},{"value":"frtw1"},{"value":"FT10012023030300001"},{"value":""},{"value":1},{"value":""},{"value":999100},{"value":58935},{"value":1619},{"value":0},{"value":"10"},{"value":1677812324000},{"value":""},{"value":""},{"value":"王波20190232044"},{"value":1677812324000},{"value":""},{"value":1677812324000}],[{"value":4192},{"value":1001},{"value":"08100123400027216190005"},{"value":"frtw1"},{"value":"FT10012023030300001"},{"value":""},{"value":9},{"value":""},{"value":999100},{"value":58935},{"value":1619},{"value":0},{"value":"10"},{"value":1677812324000},{"value":""},{"value":""},{"value":"王波20190232044"},{"value":1677812324000},{"value":"潘青娟20221200438"},{"value":1678158386000}],[{"value":4193},{"value":1001},{"value":"08100123400027216190006"},{"value":"frtw1"},{"value":"FT10012023030300001"},{"value":""},{"value":9},{"value":""},{"value":999100},{"value":58935},{"value":1619},{"value":0},{"value":"10"},{"value":1677812324000},{"value":""},{"value":""},{"value":"王波20190232044"},{"value":1677812324000},{"value":"潘青娟20221200438"},{"value":1678155918000}],[{"value":4194},{"value":1001},{"value":"08100123400027216190007"},{"value":"frtw1"},{"value":"FT10012023030300001"},{"value":""},{"value":9},{"value":""},{"value":999100},{"value":58935},{"value":1619},{"value":0},{"value":"10"},{"value":1677812324000},{"value":""},{"value":""},{"value":"王波20190232044"},{"value":1677812324000},{"value":"潘青娟20221200438"},{"value":1678155717000}],[{"value":4195},{"value":1001},{"value":"08100123400027216190008"},{"value":"frtw1"},{"value":"FT10012023030300001"},{"value":""},{"value":9},{"value":""},{"value":999100},{"value":58935},{"value":1619},{"value":0},{"value":"10"},{"value":1677812324000},{"value":""},{"value":""},{"value":"王波20190232044"},{"value":1677812324000},{"value":"潘青娟20221200438"},{"value":1678155553000}],[{"value":4196},{"value":1001},{"value":"08100123400027216190009"},{"value":"frtw1"},{"value":"FT10012023030300001"},{"value":""},{"value":9},{"value":""},{"value":0},{"value":82263},{"value":1619},{"value":0},{"value":"10"},{"value":1677812427000},{"value":""},{"value":""},{"value":"王波20190232044"},{"value":1677812427000},{"value":"潘青娟20221200438"},{"value":1678170699000}],[{"value":4197},{"value":1001},{"value":"08100123400027216190010"},{"value":"frtw1"},{"value":"FT10012023030300001"},{"value":""},{"value":9},{"value":""},{"value":0},{"value":82263},{"value":1619},{"value":0},{"value":"10"},{"value":1677812427000},{"value":""},{"value":""},{"value":"王波20190232044"},{"value":1677812427000},{"value":"潘青娟20221200438"},{"value":1678171147000}]]};

      if (res.error){
        alert(res.error)
        return
      }
      this.head=res.head;
      this.list=res.list;
    }
  }
  ,
  mounted() {
    key('ctrl+alt+l', () => {
      this.code = format(this.code);
      return false
    });

  }
})
</script>