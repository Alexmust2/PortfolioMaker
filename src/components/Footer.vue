<template>
    <footer id="contact">
      <h2>Свяжитесь со мной</h2>
      <div class="contact-info">
        <p>Email: ivan@example.com</p>
        <p>Телефон: +7 (999) 123-45-67</p>
        <p>LinkedIn: <a href="https://linkedin.com/in/ivanivanov" target="_blank">ivanivanov</a></p>
        <p>GitHub: <a href="https://github.com/ivanivanov" target="_blank">ivanivanov</a></p>
      </div>
    </footer>
  </template>
  
  <script>
  export default {
    name: 'Footer'
  }
  </script>
  
  <style scoped>
  footer {
    background-color: #2c3e50;
    color: white;
    padding: 40px;
    text-align: center;
  }
  
  .contact-info {
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
  }
  
  .contact-info p {
    margin: 10px;
  }
  
  a {
    color: #3498db;
    text-decoration: none;
  }
  
  a:hover {
    text-decoration: underline;
  }
  </style>