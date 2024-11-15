<template>
    <div class="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div class="card shadow p-4" style="width: 400px;">
        <h3 class="text-center mb-4">Se Connecter</h3>
        <form @submit.prevent="handleLogin">
          <div class="mb-3">
            <label for="email" class="form-label">Adresse Email</label>
            <input
              type="email"
              id="email"
              v-model="email"
              class="form-control"
              placeholder="Entrez votre email"
              required
            />
          </div>
          <div class="mb-3">
            <label for="password" class="form-label">Mot de passe</label>
            <input
              type="password"
              id="password"
              v-model="password"
              class="form-control"
              placeholder="Entrez votre mot de passe"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100 mb-3">Connexion</button>
          <button type="button" class="btn btn-outline-primary w-100" @click="loginWithGoogle">
            Connexion avec Google
          </button>
        </form>
        <hr class="my-4" />
        <p class="text-center">
          Pas encore de compte ?
          <a href="/signup" class="text-decoration-none">Inscrivez-vous</a>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import { useFirebaseAuth } from "vuefire";
  import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
  
  export default {
    setup() {
      const auth = useFirebaseAuth();
      const email = ref("");
      const password = ref("");
      const router = useRouter();
  
      const handleLogin = async () => {
        try {
          await signInWithEmailAndPassword(auth, email.value, password.value);
          alert("Connexion réussie !");
          router.replace('/');
          // Redirige vers la page d'accueil ou tableau de bord
        } catch (error) {
          alert("Erreur lors de la connexion : " + error.message);
        }
      };
  
      const loginWithGoogle = async () => {
        try {
          const provider = new GoogleAuthProvider();
          await signInWithPopup(auth, provider);
          alert("Connexion avec Google réussie !");
          // Redirige vers la page d'accueil ou tableau de bord
        } catch (error) {
          alert("Erreur lors de la connexion Google : " + error.message);
        }
      };
  
      return {
        email,
        password,
        handleLogin,
        loginWithGoogle,
      };
    },
  };
  </script>
  
  <style>
  body {
    background-color: #f8f9fa;
  }
  .card {
    border-radius: 10px;
  }
  </style>
  