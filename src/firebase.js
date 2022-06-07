import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore';

//Configurações do Firebase

const firebaseConfig = {
  apiKey: "AIzaSyC9JF3Z79leCZ8lvfprZDMmi4_-rgGutCk",
  authDomain: "inovacao-db.firebaseapp.com",
  databaseURL: "https://inovacao-db-default-rtdb.firebaseio.com",
  projectId: "inovacao-db",
  storageBucket: "inovacao-db.appspot.com",
  messagingSenderId: "549642087049",
  appId: "1:549642087049:web:feec31c142f33b3718b458"
};

export const app = initializeApp(firebaseConfig)

export const dataBase = getFirestore(app);

// Consultas ao Banco Firebase

export const loginFirebase = async () => {

}