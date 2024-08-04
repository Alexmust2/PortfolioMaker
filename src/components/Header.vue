<template>
  <header>
    <h1>Иван Иванов</h1>
    <nav>
      <a href="#experience">Опыт</a>
      <a href="#projects">Проекты</a>
      <a href="#contact">Контакты</a>
    </nav>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<style scoped>
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 2px solid #2c3e50;
}

h1 {
  font-size: 2.5em;
  margin: 0;
}

nav a {
  margin-left: 20px;
  text-decoration: none;
  color: #2c3e50;
  font-weight: bold;
  transition: color 0.3s;
}

nav a:hover {
  color: #3498db;
}
</style>