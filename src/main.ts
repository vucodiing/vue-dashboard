import { createApp } from 'vue';
import { createPinia } from 'pinia';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import vi from 'element-plus/es/locale/lang/vi';
import App from './App.vue';
import VButton from './component/VButton/VButton.vue';
import router from './router';
import './styles/index.scss';
const app = createApp(App);

app.use(createPinia());
app.use(router);
app.use(ElementPlus, {
  locale: vi,
});
app.component('VButton', VButton);

app.mount('#app');
