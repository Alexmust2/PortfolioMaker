<template>
    <section id="projects" class="section">
      <h2>Мои проекты</h2>
      <div class="slider">
        <div class="slider-container" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
          <div v-for="project in projects" :key="project.id" class="slide" @click="goToProject(project.link)">
            <img :src="project.image" :alt="project.title">
            <h3>{{ project.title }}</h3>
            <p>{{ project.description }}</p>
          </div>
        </div>
        <button class="prev" @click="prevSlide">&lt;</button>
        <button class="next" @click="nextSlide">&gt;</button>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'ProjectSlider',
    data() {
      return {
        currentSlide: 0,
        projects: [
          { id: 1, title: 'Проект 1', description: 'Краткое описание проекта 1', image: 'https://via.placeholder.com/300x200', link: 'https://example.com/project1' },
          { id: 2, title: 'Проект 2', description: 'Краткое описание проекта 2', image: 'https://via.placeholder.com/300x200', link: 'https://example.com/project2' },
          { id: 3, title: 'Проект 3', description: 'Краткое описание проекта 3', image: 'https://via.placeholder.com/300x200', link: 'https://example.com/project3' },
        ]
      }
    },
    methods: {
      prevSlide() {
        this.currentSlide = this.currentSlide > 0 ? this.currentSlide - 1 : this.projects.length - 1;
      },
      nextSlide() {
        this.currentSlide = this.currentSlide < this.projects.length - 1 ? this.currentSlide + 1 : 0;
      },
      goToProject(link) {
        window.open(link, '_blank');
      }
    }
  }
  </script>
  
  <style scoped>
  .slider {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 400px;
  }
  
  .slider-container {
    display: flex;
    transition: transform 0.5s ease;
  }
  
  .slide {
    flex: 0 0 100%;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
    cursor: pointer;
  }
  
  .slide img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
  }
  
  .prev, .next {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    padding: 10px 15px;
    cursor: pointer;
  }
  
  .prev {
    left: 10px;
  }
  
  .next {
    right: 10px;
  }
  </style>