<template>
<div class="count-box">
  <button @click="handleSub" class="minus">-</button>
  <input @change="handleChange" :value="value" class="inp" type="number" min="1">
  <button @click="handleAdd" class="add">+</button>
</div>
</template>

<script>
export default {
  props: {
    value: {
      type: Number,
      default: 1
    }
  },
  methods: {
    handleSub () {
      if (this.value <= 1) {
        return
      }
      this.$emit('input', this.value - 1)
      // console.log(this.value)
    },
    handleAdd () {
      this.$emit('input', this.value + 1)
      // console.log(this.value)
    },
    handleChange (e) {
      // console.log('change')
      const num = +e.target.value // 转数字处理 1.是数字 2. 不是数字
      if (isNaN(num) || num < 1) {
        // 输入不合法文本
        // 回退成原来的value
        e.target.value = this.value
        return
      }
      this.$emit('input', num)
    }
  }
}
</script>

<style lang="less" scoped>
.count-box {
  width: 110px;
  display: flex;
  .add, .minus {
    width: 30px;
    height: 30px;
    outline: none;
    border: none;
    background-color: #efefef;
  }
  .inp {
    width: 40px;
    height: 30px;
    outline: none;
    border: none;
    margin: 0 5px;
    background-color: #efefef;
    text-align: center;
  }
}
</style>
