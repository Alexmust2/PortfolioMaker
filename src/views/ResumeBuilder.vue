<template>
  <div class="resume-builder container">
    <h1>Создание резюме</h1>
    <form @submit.prevent="saveResume">
      <div class="form-group">
        <label for="title">Название резюме</label>
        <input id="title" v-model="resume.title" type="text" required />
      </div>

      <div class="form-group">
        <label for="about">О себе</label>
        <textarea id="about" v-model="resume.about" required></textarea>
      </div>

      <h2>Опыт работы</h2>
      <div v-for="(exp, index) in resume.experience" :key="index" class="experience-item">
        <div class="form-group">
          <label :for="'exp-title-' + index">Должность</label>
          <input :id="'exp-title-' + index" v-model="exp.title" type="text" required />
        </div>
        <div class="form-group">
          <label :for="'exp-company-' + index">Компания</label>
          <input :id="'exp-company-' + index" v-model="exp.company" type="text" required />
        </div>
        <div class="form-group">
          <label :for="'exp-date-' + index">Период работы</label>
          <input :id="'exp-date-' + index" v-model="exp.date" type="text" required />
        </div>
        <div class="form-group">
          <label :for="'exp-description-' + index">Описание</label>
          <textarea :id="'exp-description-' + index" v-model="exp.description" required></textarea>
        </div>
        <button @click.prevent="removeExperience(index)" class="btn btn-danger">Удалить</button>
      </div>
      <button @click.prevent="addExperience" class="btn btn-secondary">Добавить опыт работы</button>

      <h2>Проекты</h2>
      <div v-for="(project, index) in resume.projects" :key="index" class="project-item">
        <div class="form-group">
          <label :for="'project-title-' + index">Название проекта</label>
          <input :id="'project-title-' + index" v-model="project.title" type="text" required />
        </div>
        <div class="form-group">
          <label :for="'project-description-' + index">Описание проекта</label>
          <textarea :id="'project-description-' + index" v-model="project.description" required></textarea>
        </div>
        <div class="form-group">
          <label :for="'project-link-' + index">Ссылка на проект</label>
          <input :id="'project-link-' + index" v-model="project.link" type="url" />
        </div>
        <button @click.prevent="removeProject(index)" class="btn btn-danger">Удалить</button>
      </div>
      <button @click.prevent="addProject" class="btn btn-secondary">Добавить проект</button>

      <h2>Образование</h2>
      <div v-for="(edu, index) in resume.education" :key="index" class="education-item">
        <div class="form-group">
          <label :for="'edu-degree-' + index">Степень</label>
          <input :id="'edu-degree-' + index" v-model="edu.degree" type="text" required />
        </div>
        <div class="form-group">
          <label :for="'edu-school-' + index">Учебное заведение</label>
          <input :id="'edu-school-' + index" v-model="edu.school" type="text" required />
        </div>
        <div class="form-group">
          <label :for="'edu-year-' + index">Год</label>
          <input :id="'edu-year-' + index" v-model="edu.year" type="text" required />
        </div>
        <button @click.prevent="removeEducation(index)" class="btn btn-danger">Удалить</button>
      </div>
      <button @click.prevent="addEducation" class="btn btn-secondary">Добавить образование</button>

      <h2>Навыки</h2>
      <div class="form-group">
        <input v-model="newSkill" @keyup.enter="addSkill" placeholder="Введите навык и нажмите Enter" />
      </div>
      <div class="skills-list">
        <span v-for="(skill, index) in resume.skills" :key="index" class="skill-tag">
          {{ skill }}
          <button @click="removeSkill(index)" class="remove-skill">&times;</button>
        </span>
      </div>

      <h2>Настройки</h2>
      <div class="form-group">
        <label for="theme">Цветовая тема</label>
        <input id="theme" v-model="resume.theme" type="color" />
      </div>
      <div class="form-group">
        <label for="font">Шрифт</label>
        <select id="font" v-model="resume.font">
          <option value="Arial">Arial</option>
          <option value="Helvetica">Helvetica</option>
          <option value="Times New Roman">Times New Roman</option>
          <option value="Courier New">Courier New</option>
        </select>
      </div>

      <button type="submit" class="btn btn-primary">Сохранить резюме</button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { db } from '@/firebase'
import { collection, doc, addDoc } from 'firebase/firestore'

export default {
  name: 'ResumeBuilder',
  data() {
    return {
      resume: {
        title: '',
        about: '',
        experience: [],
        projects: [],
        education: [],
        skills: [],
        theme: '#007bff',
        font: 'Arial'
      },
      newSkill: ''
    }
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    addExperience() {
      this.resume.experience.push({
        title: '',
        company: '',
        date: '',
        description: '',
      })
    },
    removeExperience(index) {
      this.resume.experience.splice(index, 1)
    },
    addProject() {
      this.resume.projects.push({ title: '', description: '', link: '' })
    },
    removeProject(index) {
      this.resume.projects.splice(index, 1)
    },
    addEducation() {
      this.resume.education.push({ degree: '', school: '', year: '' })
    },
    removeEducation(index) {
      this.resume.education.splice(index, 1)
    },
    addSkill() {
      if (this.newSkill.trim() !== '') {
        this.resume.skills.push(this.newSkill.trim())
        this.newSkill = ''
      }
    },
    removeSkill(index) {
      this.resume.skills.splice(index, 1)
    },
    async saveResume() {
      try {
        const userRef = doc(db, 'users', this.user.uid)
        const resumesCollectionRef = collection(userRef, 'resumes')
        await addDoc(resumesCollectionRef, this.resume)
        this.$router.push('/')
      } catch (error) {
        console.error('Error saving resume:', error)
      }
    }
  }
}
</script>

<style scoped>
.resume-builder {
  padding: 40px 0;
}

h1, h2 {
  color: var(--primary-color);
}

.experience-item, .project-item, .education-item {
  background-color: var(--light-gray);
  padding: 20px;
  border-radius: 10px;
  margin-bottom: 20px;
}

button {
  margin-top: 10px;
}

button[type="submit"] {
  margin-top: 30px;
}

.skills-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.skill-tag {
  background-color: var(--light-gray);
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
}

.remove-skill {
  background: none;
  border: none;
  color: var(--dark-gray);
  margin-left: 5px;
  cursor: pointer;
}
</style>