<template>
  <div class="form-title">
     <slot></slot>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="less" scoped>
.form-title {
  position: relative;
  font-size: 18px;
  padding-left: 20px;
  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 5px;
    border-radius: 1px;
    background-color:#1492FF ;
    
  }
}
</style>