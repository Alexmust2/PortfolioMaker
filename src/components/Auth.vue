<template>
  <div class="auth">
    <h2>{{ isLogin ? "Вход" : "Регистрация" }}</h2>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="email" type="email" required />
      </div>
      <div class="form-group">
        <label for="password">Пароль</label>
        <input id="password" v-model="password" type="password" required />
      </div>
      <button type="submit" class="btn btn-primary">
        {{ isLogin ? "Войти" : "Зарегистрироваться" }}
      </button>
    </form>
    <p @click="isLogin = !isLogin" class="toggle-auth">
      {{
        isLogin
          ? "Нет аккаунта? Зарегистрируйтесь"
          : "Уже есть аккаунт? Войдите"
      }}
    </p>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Auth",
  data() {
    return {
      isLogin: true,
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["login", "register"]),
    async handleSubmit() {
      try {
        if (this.isLogin) {
          await this.login({ email: this.email, password: this.password });
        } else {
          await this.register({ email: this.email, password: this.password });
        }
        this.$router.push("/");
      } catch (error) {
        console.error("Ошибка аутентификации:", error);
      }
    },
  },
};
</script>

<style scoped>
.auth {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 15px;
}

.toggle-auth {
  cursor: pointer;
  color: var(--primary-color);
  text-decoration: underline;
}
</style>
