import react from "react";
import { SafeAreaView, Text } from 'react-native';
import { dataBase } from '../../firebase';
import { collection, getDocs, getDoc, doc } from 'firebase/firestore';
import { PageDefault } from './GlobalStyle'

async function getUsuariosFirebase(){
  const users = []
  const userCollection = collection(dataBase,'usuario');
  const userDocs = (await getDocs(userCollection));
  userDocs.forEach(async (uDoc) => {
    const data = uDoc.data();
    const user = {};
    user.codigo = uDoc.id;
    user.nome = data.nome;
    user.login = data.login;
    user.senha = data.senha;
    user.email = data.email;
    user.cpf = data.cpf;
    user.dataNascimento = data.dataNascimento;
    user.fone = data.fone;
    users.user = user;
    const cargo = {};
    const cargoCollection = collection(dataBase, 'cargo');
    const cargoDoc = await getDoc(doc(cargoCollection, `${data.cargo.id}`));
    const cData = cargoDoc.data();
    cargo.id = data.cargo.id;
    cargo.descricao = cData.desc;
    cargo.tipo = cData.tipo;
    user.cargo = cargo;
    users.push(user)
    console.log(user)
  });
  await console.log(users[0])
  
}

const Home = () => {
  const teste ='aaaa';
  getUsuariosFirebase();


  return (
    <PageDefault>
      <Text >
        AAAAAAAAAAAAAAAAAAAAAAAAAAAAAA
        BBBBBBBBBBBBBBBBBBBBBBBBBBBBBB
        CCCCCCCCCCCCCCCCCCCCCCCCCCCCC
        DDDDDDDDDDDDDDDDDDDDDDDDDDDD
        EEEEEEEEEEEEEEEEEEEEEEEEEE
        
      </Text>
    </PageDefault>
  )
}

export default Home
