<template>
  <div class="resume-view container" v-if="resume">
    <h1>{{ resume.title }}</h1>
    <button @click="shareResume" class="btn btn-primary">Поделиться резюме</button>
    <div class="resume-content" :style="{ fontFamily: resume.font, '--primary-color': resume.theme }">
      <section class="about">
        <h2>Обо мне</h2>
        <p>{{ resume.about }}</p>
      </section>
      
      <Experience :experiences="resume.experience" />
      
      <ProjectSlider :projects="resume.projects" />
      
      <section class="education" v-if="resume.education && resume.education.length">
        <h2>Образование</h2>
        <div v-for="edu in resume.education" :key="edu.id" class="education-item">
          <h3>{{ edu.degree }}</h3>
          <p>{{ edu.school }}, {{ edu.year }}</p>
        </div>
      </section>
      
      <section class="skills" v-if="resume.skills && resume.skills.length">
        <h2>Навыки</h2>
        <ul>
          <li v-for="skill in resume.skills" :key="skill">{{ skill }}</li>
        </ul>
      </section>
    </div>
  </div>
  <div v-else class="loading">
    <p>Загрузка...</p>
  </div>
</template>

<script>
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { mapState } from "vuex";
import Experience from '@/components/Experience.vue';
import ProjectSlider from '@/components/ProjectSlider.vue';

export default {
  name: "ResumeView",
  components: {
    Experience,
    ProjectSlider
  },
  data() {
    return {
      resume: null,
    };
  },
  computed: {
    ...mapState(['user']),
  },
  async created() {
    const resumeId = this.$route.params.id;
    if (this.user) {
      const docRef = doc(db, "users", this.user.uid, "resumes", resumeId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        this.resume = { id: docSnap.id, ...docSnap.data() };
      }
    } else {
      this.$router.push('/login');
    }
  },
  methods: {
    shareResume() {
      const url = window.location.href;
      navigator.clipboard.writeText(url).then(() => {
        alert("Ссылка на резюме скопирована в буфер обмена");
      }, (err) => {
        console.error("Не удалось скопировать ссылку: ", err);
      });
    },
  },
};
</script>

<style scoped>
.resume-view {
  padding: 40px 0;
  width: 100%;
}

h1, h2 {
  color: var(--primary-color);
}

.resume-content {
  background-color: white;
  border-radius: 10px;
  padding: 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.education-item {
  margin-bottom: 20px;
}

.skills ul {
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}

.skills li {
  background-color: var(--light-gray);
  padding: 5px 10px;
  margin: 5px;
  border-radius: 5px;
}

.loading {
  text-align: center;
  padding: 40px 0;
  font-size: 1.2em;
  color: var(--dark-gray);
}
</style>