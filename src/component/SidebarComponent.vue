<template>
  <div class="sidebar">
    <router-link to="/">Home</router-link>
    <router-link to="/about">Settings</router-link>
  </div>
</template>

<style scoped>
.sidebar {
  width: 240px;
  background: #1f2a37;
  color: #fff;
  height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}
.sidebar a {
  display: block;
  color: #fff;
  margin-bottom: 12px;
}
</style>
