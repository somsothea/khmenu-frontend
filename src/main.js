import { createApp } from 'vue'
import App from './App.vue'
import router from './routes/index.js'
import '@/assets/css/bootstrap.min.css';
import '@/assets/fontawesome/css/all.min.css';
import '@/assets/css/style.css';
import i18n from '@/i18n.js';
import 'aos/dist/aos.css';
import "bootstrap"; // Import Bootstrap JavaScript
//import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS


const app = createApp(App)
app.use(router)
app.use(i18n)
app.mount('#app')