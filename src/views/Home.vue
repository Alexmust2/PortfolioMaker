<template>
  <div class="home container">
    <h1>Добро пожаловать в Резюме Билдер</h1>
    <Auth v-if="!isAuthenticated" />
    <div v-else>
      <h2>Ваши резюме</h2>
      <router-link to="/resume/create" class="btn btn-primary">Создать новое резюме</router-link>
      <div class="resume-list">
        <div v-for="resume in resumes" :key="resume.id" class="resume-card">
          <h3>{{ resume.title }}</h3>
          <p>{{ resume.description || 'Нет описания' }}</p>
          <router-link :to="`/resume/${resume.id}`" class="btn btn-secondary">Просмотреть</router-link>
        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import { mapGetters, mapState, mapActions } from 'vuex'
  import Auth from '../components/Auth.vue'
  
  export default {
    name: 'Home',
    components: {
      Auth
    },
    computed: {
      ...mapGetters(['isAuthenticated']),
      ...mapState(['resumes'])
    },
    methods: {
      ...mapActions(['fetchResumes'])
    },
    created() {
      if (this.isAuthenticated) {
        this.fetchResumes()
      }
    }
  }
  </script>

<style scoped>
.home {
  padding: 40px 0;
}

h1 {
  font-size: 2.5em;
  margin-bottom: 30px;
  color: var(--primary-color);
}

h2 {
  font-size: 2em;
  margin-bottom: 20px;
}

.resume-card {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.resume-card h3 {
  font-size: 1.4em;
  margin-bottom: 10px;
}

.resume-card p {
  margin-bottom: 15px;
  color: var(--dark-gray);
}
</style>