<template>
<div class="tableContainer">
  <table class="basic-table">
    <thead class="basic-thead">
    <tr>
      <th v-for="item in columns" :key="item.key">{{item.title}}</th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(itemRow,index) in dataSource" :key="itemRow.key||index">
      <td v-for="(itemValue,index) in itemRow" :key="index">
        <slot>{{itemValue}}</slot>
      </td>
    </tr>
    </tbody>
  </table>
</div>
</template>

<script>
const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];
const dataSource = [
  {
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    name: 'Jim Green',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    name: 'Joe Black',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
];
export default {
  name: 'HuiTable',
  data() {
    return {
      columns,
      dataSource,
    };
  },
};
</script>

<style lang="scss" scoped>
  .tableContainer{
    width: 100%;
    .basic-table{
      width: 100%;
      .basic-thead{
        width: 100%;
      }
    }
  }


</style>
