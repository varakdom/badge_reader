<template>
    <div class="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div class="card shadow p-4" style="width: 400px;">
        <h3 class="text-center mb-4">Créer un Compte</h3>
        <form @submit.prevent="handleSignUp">
          <div class="mb-3">
            <label for="name" class="form-label">Nom Complet</label>
            <input
              type="text"
              id="name"
              v-model="name"
              class="form-control"
              placeholder="Entrez votre nom complet"
              required
            />
          </div>
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
              placeholder="Choisissez un mot de passe"
              required
            />
          </div>
          <button type="submit" class="btn btn-primary w-100 mb-3">S'inscrire</button>
          <button type="button" class="btn btn-outline-primary w-100" @click="signUpWithGoogle">
            S'inscrire avec Google
          </button>
        </form>
        <hr class="my-4" />
        <p class="text-center">
          Vous avez déjà un compte ?
          <a href="/login" class="text-decoration-none">Connectez-vous</a>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import { useFirebaseAuth } from "vuefire";
  import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
  
  export default {
    setup() {
      const auth = useFirebaseAuth();
      const name = ref("");
      const email = ref("");
      const password = ref("");
      const router = useRouter();

      const handleSignUp = async () => {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
          const user = userCredential.user;
          alert("Compte créé avec succès !");
          router.replace('/');

          // Ajoute un nom ou d'autres détails si nécessaires
        } catch (error) {
          alert("Erreur lors de l'inscription : " + error.message);
        }
      };
  
      const signUpWithGoogle = async () => {
        try {
          const provider = new GoogleAuthProvider();
          await signInWithPopup(auth, provider);
          alert("Inscription avec Google réussie !");
          // Redirige vers une page de bienvenue ou tableau de bord
        } catch (error) {
          alert("Erreur lors de l'inscription Google : " + error.message);
        }
      };
  
      return {
        name,
        email,
        password,
        handleSignUp,
        signUpWithGoogle,
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
  