<script setup>
import { signOut } from "firebase/auth";
import { ref, onMounted } from "vue";
import { useFirebaseAuth } from "vuefire";
import { getDatabase, ref as dbRef, onChildAdded } from "firebase/database";
import mqtt from "mqtt";

const auth = useFirebaseAuth();
const user = useCurrentUser();
const cards = ref([]); // Liste des cartes dynamiques

// Gestion de la déconnexion
function handleSignOut() {
  signOut(auth);
}

// Initialisation de la Realtime Database
const db = getDatabase();
const cardsRef = dbRef(db, "newcomer");

// Récupération des nouvelles données de la Realtime Database
onMounted(() => {
  onChildAdded(cardsRef, (snapshot) => {
    const data = snapshot.val();
    cards.value.push(data);
  });

  // Connexion au broker MQTT
  const client = mqtt.connect("mqtt://broker.hivemq.com"); // Exemple avec un broker public
  client.on("connect", () => {
    client.subscribe("newcomer", (err) => {
      if (!err) {
        console.log("Abonné au topic newcomer");
      }
    });
  });

  client.on("message", (topic, message) => {
    if (topic === "newcomer") {
      const esp32Data = JSON.parse(message.toString());
      // Ajout des données à la Realtime Database
      dbRef(db, `newcomer/${esp32Data.id}`).set(esp32Data);
    }
  });
});
</script>

<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-between align-items-center mb-4">
      <h1 class="text-primary">Bienvenue, {{ user.displayName }}</h1>
      <button @click="handleSignOut" class="btn btn-outline-danger">Se déconnecter</button>
    </div>

    <div class="row">
      <div class="col-12 mb-4">
        <div class="card shadow-sm p-4 bg-light">
          <h2 class="text-center">ESP32 Dashboard</h2>
          <p class="text-muted text-center">
            Les informations des ESP32 connectés s'affichent ici en temps réel.
          </p>
        </div>
      </div>
    </div>

    <div class="row">
      <div v-for="card in cards" :key="card.id" class="col-md-4 mb-4">
        <div class="card shadow-sm p-3">
          <h5 class="card-title text-center text-primary">{{ card.name || "ESP32 Device" }}</h5>
          <ul class="list-group list-group-flush">
            <li class="list-group-item">ID: {{ card.id }}</li>
            <li class="list-group-item">Status: {{ card.status }}</li>
            <li class="list-group-item">Last Updated: {{ card.timestamp }}</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
body {
  background-color: #f8f9fa;
}
.card {
  border-radius: 10px;
}
</style>
