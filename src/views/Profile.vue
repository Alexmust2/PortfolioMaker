<template>
  <div class="profile">
    <h1>Профиль</h1>
    <form @submit.prevent="updateProfile">
      <div class="form-group">
        <label for="name">Имя</label>
        <input id="name" v-model="profile.name" type="text" required>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input id="email" v-model="profile.email" type="email" required>
      </div>
      <div class="form-group">
        <label for="phone">Телефон</label>
        <input id="phone" v-model="profile.phone" type="tel">
      </div>
      <div class="form-group">
        <label for="linkedin">LinkedIn</label>
        <input id="linkedin" v-model="profile.linkedin" type="url">
      </div>
      <div class="form-group">
        <label for="github">GitHub</label>
        <input id="github" v-model="profile.github" type="url">
      </div>
      <button type="submit" class="btn btn-primary">Сохранить изменения</button>
    </form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { db } from '../firebase'
import { doc, getDoc, updateDoc } from 'firebase/firestore'

export default {
  name: 'Profile',
  data() {
    return {
      profile: {
        name: '',
        email: '',
        phone: '',
        linkedin: '',
        github: ''
      }
    }
  },
  computed: {
    ...mapState(['user'])
  },
  created() {
    this.loadProfile()
  },
  methods: {
    async loadProfile() {
      const docRef = doc(db, 'users', this.user.uid)
      const docSnap = await getDoc(docRef)
      if (docSnap.exists()) {
        this.profile = { ...this.profile, ...docSnap.data() }
      }
    },
    async updateProfile() {
      const docRef = doc(db, 'users', this.user.uid)
      await updateDoc(docRef, this.profile)
      this.$router.push('/')
    }
  }
}
</script>