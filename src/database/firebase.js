import { initializeApp } from 'firebase/app'
import { collection, getFirestore, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { isEmpty } from '@firebase/util';
import { carga, cargo, colaborador, cte, nota, usuario } from './services/services.service';

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

//Consulta Generica, busca o campo na tabela informada (não funciona com id)
export async function consultaFirebase(tabela, campoWhere, sinalWhere, valorWhere) {
  const genericCollection = collection(dataBase, tabela);
  const genericQuery = query(genericCollection, where(campoWhere , sinalWhere, valorWhere));
  const genericDoc = await getDocs(genericQuery);
  return genericDoc;
}

export default {
  consultaFirebase,
  carga,
  cargo,
  colaborador,
  cte,
  nota,
  usuario,
}