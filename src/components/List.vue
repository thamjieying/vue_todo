<template>
   <el-table
    v-loading="loading"
    :data="tableData"
    empty-text=" "
    class="box-card"
  >
    <el-table-column>
      <template v-slot:header>
        <el-input v-model="input"/>
      </template>
      <template v-slot="scope">
        <el-checkbox :value="scope.row.done" @change="handleCheck(scope.$index)" text-color="black" fill="#DDE5F0" class="todo-font">
          {{ scope.row.message }}
        </el-checkbox>
      </template>
    </el-table-column>
    <el-table-column width="100" align="center">
      <template v-slot:header>
        <el-button type="primary" @click="handleAdd">Add</el-button>
      </template>
      <template v-slot="scope">
        <a class="remove-cross" @click="handleRemove(scope.$index)"><i class="el-icon-close"></i></a>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'List', 
  data() {
    return {
      input: '',
    }
  }, 
  computed: {
    tableData() {
      return this.$store.state.tableData
    },
    loading() {
      return this.$store.state.loading
    },
  },
  mounted() {
    this.$store.dispatch('loadTableData')
  },  
  methods: {
    handleAdd() {
      console.log('adding item', this.input)
      const item = {
        message: this.input,
        done: false,
      }
      this.$store.dispatch('addItems', item)
      this.input = ''
    }, 
    handleRemove(index) {
      console.log('removing index', index)
      this.$store.dispatch('removeItems', index)
    }, 
    handleCheck(index) {
      console.log('toggle check', index, this.tableData)
      this.$store.dispatch('toggleCheck', index)
    },
  },
}
</script>

<style scoped>
  .box-card {
    width: 80%;
    margin: 20px 10%;
    border: 1px solid rgb(211,220,236);
  }
  .todo-font {
    font-size: 2em;
  }
  .remove-cross:hover {
    color: #4875B3;
    font-weight: bold;
    font-size: large;
  }
</style>