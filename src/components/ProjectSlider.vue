<template>
  <section id="projects" class="section">
    <h2>Мои проекты</h2>
    <div class="slider">
      <div
        class="slider-container"
        :style="{ transform: `translateX(-${currentSlide * 100}%)` }"
      >
      <button class="prev" @click="prevSlide">&lt;</button>

        <div
          v-for="(project, index) in projects"
          :key="index"
          class="slide"
          @click="goToProject(project.link)"
        >
          <img :src="project.image" :alt="project.title" />
          <h3>{{ project.title }}</h3>
          <p>{{ project.description }}</p>
        </div>
      <button class="next" @click="nextSlide">&gt;</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "ProjectSlider",
  props: {
    projects: Array
  },
  data() {
    return {
      currentSlide: 0,
      localProjects: [
      
      ],
    };
  },
  mounted() {
    this.localProjects = [...this.projects];
    console.log(this.projects);
  },
  methods: {
    prevSlide() {
      this.currentSlide =
        this.currentSlide > 0
          ? this.currentSlide - 1
          : this.projects.length - 1;
    },
    nextSlide() {
      this.currentSlide =
        this.currentSlide < this.projects.length - 1
          ? this.currentSlide + 1
          : 0;
    },
    goToProject(link) {
      window.open(link, "_blank");
    },
  },
};
</script>

<style scoped>
.slider {
  position: relative;
  overflow: hidden;
  width: 100%;
  height: 450px;
  border-radius: 8px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}
.slider-container {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.slide {
  flex: 0 0 100%;
  padding: 2rem;
  box-sizing: border-box;
  text-align: center;
  background-color: white;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.02);
  }

  img {
    max-width: 100%;
    height: auto;
    border-radius: 8px;
    margin-bottom: 1rem;
  }

  h3 {
    color: var(--primary-color);
    margin-bottom: 0.5rem;
  }
}

.prev,
.next {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background-color: rgba(255, 255, 255, 0.8);
  color: var(--primary-color);
  border: none;
  padding: 1rem;
  cursor: pointer;
  font-size: 1.5rem;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background-color: var(--primary-color);
    color: white;
  }
}
</style>
