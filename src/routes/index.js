
import { createRouter, createWebHistory } from 'vue-router'

// Import your folder pages
import Home from '@/pages/Home.vue'
import About from '@/pages/About.vue'
import Item from '@/pages/Items.vue'
import Store from '@/pages/Store.vue'
import StoreDetail from '@/components/StoreDetail.vue'
import Stores from '@/pages/Stores.vue'
import MyStore from '@/components/MyStore.vue'
import MyAccount from '@/components/MyAccount.vue'
import Terms from '@/pages/Terms.vue'
import Privacy from '@/pages/Privacy.vue'
import Contact from '@/pages/Contact.vue'
import Login from '@/pages/Login.vue'
import SignUp from '@/pages/SignUp.vue'

const routes = [
    
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/items', component: Item },
    { path: '/items/:id', component: Item },
    { path: '/stores', component: Store, children:[
      {path: '', component: Stores },
      {path: ':storeurl', component: StoreDetail}
    ] },
    { path: '/mystore/:id', component: MyStore},
    { path: '/myaccount', component: MyAccount },
    { path: '/term', component: Terms },
    { path: '/privacy', component: Privacy },
    { path: '/contact', component: Contact },
    { path: '/login', component: Login },
    { path: '/register', component: SignUp }
  ]

  const router = createRouter({
    mode: 'history',
    history: createWebHistory(),
    routes
  })

  export default router