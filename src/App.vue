<template>
  <div id="app">
    <Header />
    <Experience />
    <ProjectSlider />
    <Footer />
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Experience from './components/Experience.vue'
import ProjectSlider from './components/ProjectSlider.vue'
import Footer from './components/Footer.vue'

export default {
  name: 'App',
  components: {
    Header,
    Experience,
    ProjectSlider,
    Footer
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;700&display=swap');

body {
  margin: 0;
  padding: 0;
  font-family: 'Roboto', sans-serif;
  background-color: #f5f5f5;
  color: #333;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

h1, h2, h3 {
  color: #2c3e50;
}

.section {
  margin-bottom: 60px;
}
</style>