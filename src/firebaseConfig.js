// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // ✅ Import correcto
// (Puedes quitar getAnalytics si no lo usas)

const firebaseConfig = {
  apiKey: "AIzaSyBRpm4-F7fGzeUeMluEQAmPvogykqR-GZo",
  authDomain: "proyecto-quilca.firebaseapp.com",
  projectId: "proyecto-quilca",
  storageBucket: "proyecto-quilca.firebasestorage.app",
  messagingSenderId: "558152663827",
  appId: "1:558152663827:web:6178c7c2f5f91fdefc50e6",
  measurementId: "G-M1DG9QMRSY"
};

// 🔹 Inicializar Firebase correctamente
const app = initializeApp(firebaseConfig);

// 🔹 Inicializar Firestore
export const db = getFirestore(app);
