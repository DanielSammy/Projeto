import { dataBase } from '../firebase';
import { isEmpty } from '@firebase/util';
import { collection, query, where, getDocs, getDoc, doc, addDoc } from 'firebase/firestore';
import { cargo, colaborador } from './services.service';


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
  await usuarioDoc.forEach(async (uDoc) => {
    const uData = uDoc.data();
    usuarioLogando.dados = uData;
    usuarioLogando.dados.id = uDoc.id;   
  })
  if (usuarioLogando.dados.senha !== senha ) {
    const tipoErro = 'senha'
    const mensagemErro = 'Senha Informada incorreta';
    const erro =  new Error()
      erro.tipo = tipoErro;
      erro.message = mensagemErro;
    throw(erro);
  };
  delete usuarioLogando.dados.senha
  const colaboradorUsuario = await colaborador.consultaColaboradorID(usuarioLogando.dados.colaborador.id);
  const usuarioRetorno = {
    ...usuarioLogando.dados
  }
  usuarioRetorno.colaborador = colaboradorUsuario;
  return usuarioRetorno;
}

//Consulta Usuario por ID
export const consultaUsarioPorID = async (usuarioID) => {
  const usuarioCollection = collection(dataBase, 'usuario');
  const usuarioDoc = await getDoc(doc(usuarioCollection, usuarioID));
  const uData = usuarioDoc.data();
  const usuario = {
    id : usuarioDoc.id,
    ...uData
  }
  delete usuario.senha
  const colaboradorUsuario = await colaborador.consultaColaboradorID(usuario.colaborador.id);
  usuario.colaborador = colaboradorUsuario;
  return usuario
}

//Consulta todos os Usuarios
export const consultaUsuarios = async () => {
  const usuarios = [];
  const usuarioCollection = collection(dataBase, 'usuario');
  const usuarioDocs = await getDocs(usuarioCollection);
  usuarioDocs.forEach(async (uDoc) => {
    const uData = uDoc.data();
    const usuario = {
      id : uDoc.id,
      ...uData
    }
    const colaboradorUsuario = await colaborador.consultaColaboradorID(usuario.colaborador.id);
    usuario.colaborador = colaboradorUsuario;
    delete usuario.senha
    usuarios.push(usuario);
  })
  return usuarios
}

//Consulta Usuario por outro campo qualquer
export const consultaUsuarioCampo = async (descCampo, sinalWhere, valorCampo ) => {
  const usuarioRetorno = {}
  const usuarioCollection = collection(dataBase, 'usuario');
  const usuarioQuery = query(usuarioCollection, where(descCampo , sinalWhere, valorCampo));
  const usuarioDoc = await getDocs(usuarioQuery);
  if (isEmpty(usuarioDoc.docs)) {
    return 
  }
  usuarioDoc.forEach((cDoc) => {
    usuarioRetorno.dados = cDoc.data()
    usuarioRetorno.dados.id = cDoc.id;
  });
  const colaboradorConsulta = await colaborador.consultaColaboradorID(usuarioRetorno.dados.colaborador.id);
  usuarioRetorno.dados.colaborador = colaboradorConsulta;
  return usuarioRetorno.dados
}

//Adiciona Novo Usuario
export const adicionaUsuario = async (email, senha, colaboradorID) => {
  const usuarioCollection = collection(dataBase, 'usuario');
  const colaboradorRef = await colaborador.getColaboradorDocRef(colaboradorID);
  const novoUsuarioDoc = await addDoc(usuarioCollection, {
    email : email,
    senha : senha,
    colaborador : colaboradorRef
  })
  return novoUsuarioDoc.id
}

export default {
  loginFirebase,
  consultaUsarioPorID,
  consultaUsuarios,
  adicionaUsuario,
  consultaUsuarioCampo,
}