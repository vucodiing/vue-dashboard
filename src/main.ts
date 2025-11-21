import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import App from './App.vue';
import BaseButton from './component/BaseButton/BaseButton.vue';
import router from './router';
import './styles/index.scss';
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus);
app.component('BaseButton', BaseButton);

app.mount('#app');
