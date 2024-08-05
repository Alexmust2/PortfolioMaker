<template>
  <header>
    <nav class="container">
      <router-link to="/" class="logo">Резюме Билдер</router-link>
      <div class="nav-links">
        <template v-if="isAuthenticated">
          <router-link to="/profile">Профиль</router-link>
          <router-link to="/resume/create">Создать резюме</router-link>
          <a href="#" @click.prevent="handleLogout">Выйти</a>
        </template>
        <template v-else>
          <router-link to="/">Войти</router-link>
        </template>
      </div>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'Header',
  computed: {
    ...mapGetters(['isAuthenticated'])
  },
  methods: {
    ...mapActions(['logout']),
    async handleLogout() {
      await this.logout()
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
header {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 1000;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 0;
}

.logo {
  font-size: 1.8em;
  font-weight: 700;
  color: var(--primary-color);
  text-decoration: none;
}

.nav-links a {
  color: var(--text-color);
  text-decoration: none;
  margin-left: 25px;
  font-weight: 500;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: var(--primary-color);
}
</style>