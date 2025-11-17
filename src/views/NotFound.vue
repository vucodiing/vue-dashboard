<template>
  <div class="not-found">
    <div class="container">
      <div class="error-code">404</div>
      <h1 class="title">Trang không tồn tại</h1>
      <p class="description">
        Xin lỗi, trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>

      <div class="actions">
        <button class="btn btn-primary" @click="goHome">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
            <polyline points="9 22 9 12 15 12 15 22" />
          </svg>
          Về trang chủ
        </button>
        <button class="btn btn-secondary" @click="goBack">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
          Quay lại
        </button>
      </div>

      <div class="illustration">
        <svg viewBox="0 0 500 300" xmlns="http://www.w3.org/2000/svg">
          <circle cx="250" cy="150" r="120" fill="#f0f4ff" opacity="0.5" />
          <path
            d="M200,150 Q250,100 300,150 T400,150"
            stroke="#6366f1"
            stroke-width="3"
            fill="none"
            opacity="0.6"
          />
          <circle cx="220" cy="130" r="15" fill="#6366f1" opacity="0.8">
            <animate attributeName="cy" values="130;110;130" dur="2s" repeatCount="indefinite" />
          </circle>
          <circle cx="280" cy="130" r="15" fill="#6366f1" opacity="0.8">
            <animate
              attributeName="cy"
              values="130;110;130"
              dur="2s"
              begin="0.5s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

const router = useRouter();

const goHome = (): void => {
  router.push('/');
};

const goBack = (): void => {
  router.back();
};
</script>

<style scoped>
.not-found {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem;
}

.container {
  text-align: center;
  max-width: 600px;
  background: white;
  padding: 3rem 2rem;
  border-radius: 20px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
  animation: fadeInUp 0.6s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.error-code {
  font-size: 8rem;
  font-weight: 800;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  line-height: 1;
  margin-bottom: 1rem;
  animation: pulse 2s ease-in-out infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.title {
  font-size: 2rem;
  color: #1f2937;
  margin-bottom: 1rem;
  font-weight: 700;
}

.description {
  font-size: 1.1rem;
  color: #6b7280;
  margin-bottom: 2.5rem;
  line-height: 1.6;
}

.actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 2rem;
}

.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 1.75rem;
  font-size: 1rem;
  font-weight: 600;
  border-radius: 12px;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-primary {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
}

.btn-secondary {
  background: #f3f4f6;
  color: #374151;
}

.btn-secondary:hover {
  background: #e5e7eb;
  transform: translateY(-2px);
}

.illustration {
  margin-top: 2rem;
  opacity: 0.8;
}

.illustration svg {
  max-width: 400px;
  width: 100%;
  height: auto;
}

@media (max-width: 640px) {
  .container {
    padding: 2rem 1.5rem;
  }

  .error-code {
    font-size: 5rem;
  }

  .title {
    font-size: 1.5rem;
  }

  .description {
    font-size: 1rem;
  }

  .actions {
    flex-direction: column;
  }

  .btn {
    width: 100%;
    justify-content: center;
  }
}
</style>
