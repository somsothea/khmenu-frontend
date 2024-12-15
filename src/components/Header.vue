<template>
        <!-- Page Loader -->
        <div id="loader-wrapper">
        <div id="loader"></div>

        <div class="loader-section section-left"></div>
        <div class="loader-section section-right"></div>

        </div>
        <nav class="navbar navbar-expand-lg">
        <div class="container-fluid">
            <a class="navbar-brand" href="/">
                <i class="fa fa-th-large" aria-hidden="true"></i> KH Cloud Menu
            </a>
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <i class="fas fa-bars"></i>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
                <li class="nav-item">
                    <router-link to="/stores" class="nav-link nav-link-1" :class="{ active: $route.path === '/stores' }">Stores</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/items" class="nav-link nav-link-1" :class="{ active: $route.path === '/items' }">Items</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/login" class="nav-link nav-link-1" :class="{ active: $route.path === '/login' }">Login</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/contact" class="nav-link nav-link-1" :class="{ active: $route.path === '/contact' }">Contact</router-link>
                </li>
                <li class="nav-item">
                    <router-link to="/about" class="nav-link nav-link-1" :class="{ active: $route.path === '/about' }">About Us</router-link>
                </li>
            </ul>
            </div>
        </div>
    </nav>
</template>