import { initializeApp } from 'firebase/app'
import { collection, getFirestore, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import { isEmpty } from '@firebase/util';

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

//Login
export const loginFirebase = async (email, senha) => {
  const usuarioLogando = {};
  const usuarioCollection = collection(dataBase, 'usuario');
  const usuarioQuery = query(usuarioCollection, where('email', '==' , email ));
  const usuarioDoc = await getDocs(usuarioQuery);
  if (isEmpty(usuarioDoc.docs)) {
    const tipoErro = 'email'
    const mensagemErro = 'Usuario informado não existe';
    const erro =  new Error()
    erro.tipo = tipoErro;
    erro.message = mensagemErro;
  throw(erro);
  };
  usuarioDoc.forEach(async (uDoc) => {
    const uData = uDoc.data();
    usuarioLogando.dados = uData;
    usuarioLogando.dados.id = uDoc.id;
    const cargo = await consultaCargoPorID(uData.cargo.id);
    usuarioLogando.dados.cargo = cargo;   
    console.log(cargo)
    console.log(usuarioLogando.dados.cargo)
  })
  if (usuarioLogando.dados.senha !== senha ) {
    const tipoErro = 'senha'
    const mensagemErro = 'Senha Informada incorreta';
    const erro =  new Error()
      erro.tipo = tipoErro;
      erro.message = mensagemErro;
    throw(erro);
  };
  return usuarioLogando.dados;
}

//Consulta Generica, busca o campo na tabela informada
export async function consultaFirebase(tabela, campoWhere, sinalWhere, valorWhere) {
  const genericCollection = collection(dataBase, tabela);
  const genericQuery = query(genericCollection, where(campoWhere , sinalWhere, valorWhere));
  const genericDoc = await getDocs(genericQuery);
  return genericDoc;
}

//Consulta Cargo pelo ID
export async function consultaCargoPorID(cargoID){
  const cargoCollection = collection(dataBase, 'cargo');
  const cargoDoc = await getDoc(doc(cargoCollection, cargoID));
  const cData = cargoDoc.data();
  const cargo = {
    id : cargoID,
    ...cData
  }
  return cargo; 
};