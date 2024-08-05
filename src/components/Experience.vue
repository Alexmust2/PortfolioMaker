<template>
  <section id="experience" class="section">
    <h2>Мой путь</h2>
    <div class="timeline">
      <div v-for="(step, index) in experiences" :key="index" class="timeline-item">
        <div class="timeline-content">
          <h3>{{ step.title }}</h3>
          <p>{{ step.description }}</p>
          <span class="date">{{ step.date }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "Experience",
  props: {
    experiences: Array,
  },
  data() {
    return {
      steps: [
        {
          title: "Университет",
          description: "Изучал компьютерные науки в МГУ",
          date: "2015-2019",
        },
        {
          title: "Стажировка",
          description: "Работал стажером в Яндексе",
          date: "2019-2020",
        },
        {
          title: "Младший разработчик",
          description: "Начал карьеру в стартапе",
          date: "2020-2022",
        },
        {
          title: "Ведущий разработчик",
          description: "Повышение до ведущего разработчика",
          date: "2022-настоящее время",
        },
      ],
    };
  },
};
</script>

<style scoped>
.timeline {
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
}

.timeline::after {
  content: "";
  position: absolute;
  width: 6px;
  background-color: #3498db;
  top: 0;
  bottom: 0;
  left: 50%;
  margin-left: -3px;
}

.timeline-item {
  padding: 10px 40px;
  position: relative;
  background-color: inherit;
  width: 50%;
}

.timeline-item::after {
  content: "";
  position: absolute;
  width: 25px;
  height: 25px;
  right: -17px;
  background-color: white;
  border: 4px solid #3498db;
  top: 15px;
  border-radius: 50%;
  z-index: 1;
}

.timeline-item:nth-child(odd) {
  left: 0;
}

.timeline-item:nth-child(even) {
  left: 50%;
}

.timeline-item:nth-child(even)::after {
  left: -16px;
}

.timeline-content {
  padding: 20px 30px;
  background-color: white;
  position: relative;
  border-radius: 6px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.date {
  font-style: italic;
  color: #777;
}
</style>
