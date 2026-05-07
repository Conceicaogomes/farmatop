import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBBz8zbwbWoL6Mb6aXl-9tYc4DLvQ0dgbo",
  authDomain: "farmatop-9fab4.firebaseapp.com",
  databaseURL: "https://farmatop-9fab4-default-rtdb.firebaseio.com",
  projectId: "farmatop-9fab4",
  storageBucket: "farmatop-9fab4.firebasestorage.app",
  messagingSenderId: "950362524731",
  appId: "1:950362524731:web:d79189c4176d03ac20e01e"
};

const app = initializeApp(firebaseConfig);

export const database = getDatabase(app);

export default app;