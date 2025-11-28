<template>
  <div class="loading-container">
    <div class="loading">
      <span></span>
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.loading-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  //   background-color: rgba(255, 255, 255, 0.5);
  //   backdrop-filter: blur(5px);
}

.loading {
  position: relative;
  width: 22px;
  height: 22px;
  //   box-sizing: border-box;
  animation: rotation 2s linear infinite;
}

.loading span {
  position: absolute;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background: var(--color-primary);
  box-sizing: border-box;
  animation: fadeInOut 2s linear infinite;
}

.loading span:nth-child(1) {
  left: 0;
  top: 0;
  transform: translate(-50%, -50%);
  animation-delay: 0s;
}

.loading span:nth-child(2) {
  right: 0;
  top: 0;
  transform: translate(50%, -50%);
  animation-delay: 0.5s;
}

.loading span:nth-child(3) {
  right: 0;
  bottom: 0;
  transform: translate(50%, 50%);
  animation-delay: 1s;
}

.loading span:nth-child(4) {
  left: 0;
  bottom: 0;
  transform: translate(-50%, 50%);
  animation-delay: 1.5s;
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@keyframes fadeInOut {
  0% {
    opacity: 0.3;
  }
  50% {
    opacity: 1;
  }
  100% {
    opacity: 0.3;
  }
}
</style>
