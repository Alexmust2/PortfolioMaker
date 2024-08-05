import { createStore } from "vuex";
import { auth, db } from "@/firebase";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from "firebase/auth";
import { collection, getDocs, doc } from "firebase/firestore";

export default createStore({
  state: {
    user: null,
    resumes: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setResumes(state, resumes) {
      state.resumes = resumes;
    },
  },
  actions: {
    async login({ commit }, { email, password }) {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      commit("setUser", userCredential.user);
    },
    async register({ commit }, { email, password }) {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      commit("setUser", userCredential.user);
    },
    async logout({ commit }) {
      await signOut(auth);
      commit("setUser", null);
    },
    async fetchResumes({ commit, state }) {
      const resumesRef = collection(doc(db, "users", state.user.uid), "resumes");
      const snapshot = await getDocs(resumesRef);
      const resumes = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      commit("setResumes", resumes);
    },
    initAuth({ commit }) {
      auth.onAuthStateChanged(user => {
        if (user) {
          commit('setUser', user);
        } else {
          commit('setUser', null);
        }
      });
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
});