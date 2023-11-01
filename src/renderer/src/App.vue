<script setup lang="ts">
import Login from './views/login/Login.vue'
</script>

<template>
  <RouterView></RouterView>

  <!-- 登录页面 -->
  <Teleport to="#login">
    <Login />
  </Teleport>
</template>

<style lang="less"></style>
