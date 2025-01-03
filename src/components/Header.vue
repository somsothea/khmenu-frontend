<template>
    <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">
                <i class="fa fa-th-large" aria-hidden="true"></i> Cloud Menu
            </a>
            
            <button 
                class="navbar-toggler" 
                type="button" 
                data-bs-toggle="collapse" 
                data-bs-target="#navbarSupportedContent" 
                aria-controls="navbarSupportedContent" 
                aria-expanded="false" 
                aria-label="Toggle navigation">
                <i class="fas fa-bars"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link 
                            to="/stores" 
                            class="nav-link nav-link-1" 
                            :class="{ active: $route.path === '/stores' }" 
                            @click="collapseNavbar">
                            {{$t('Stores')}}
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link 
                            to="/items" 
                            class="nav-link nav-link-1" 
                            :class="{ active: $route.path === '/items' }" 
                            @click="collapseNavbar">
                            {{$t('Items')}}
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link 
                            to="/login" 
                            class="nav-link nav-link-1" 
                            :class="{ active: $route.path === '/login' }" 
                            @click="collapseNavbar">
                            {{$t('Login')}}
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link 
                            to="/contact" 
                            class="nav-link nav-link-1" 
                            :class="{ active: $route.path === '/contact' }" 
                            @click="collapseNavbar">
                            {{$t('Contact')}}
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link 
                            to="/about" 
                            class="nav-link nav-link-1" 
                            :class="{ active: $route.path === '/about' }" 
                            @click="collapseNavbar">
                            {{$t('About')}}
                        </router-link>
                    </li>
                    <li class="navbar-brand">
                        <img src="../assets/img/cambodia.png" @click="changeLocale('khm')" width="25" />
                    </li>
                    <li class="navbar-brand">
                        <img src="../assets/img/usa.png" @click="changeLocale('en')" width="25" />
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import { Collapse } from "bootstrap";
export default {
  name: "App",
  methods: {
    changeLocale(locale) {
      this.$i18n.locale = locale;
    },
    collapseNavbar() {
      const navbar = document.getElementById("navbarSupportedContent");
      const bsCollapse = new Collapse(navbar, { toggle: false });
      bsCollapse.hide();
    },
  },
};
</script>
<style>
.navbar {
    background-color: whitesmoke;
}

.navbar-collapse {
    /* position: absolute; */ /* Position it independently */
    z-index: 1050;      /* Ensure it's above other content */

}

</style>