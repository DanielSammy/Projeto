import { dataBase } from '../firebase';
import { isEmpty } from '@firebase/util';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';
import cargoService from './cargo.service';

//Consulta Colaborador por ID 
export const consultaColaboradorID = async (colaboradorID) => {
  const colaboradorCollection = collection(dataBase, 'colaborador');
  const colaboradorDoc = await getDoc(doc(colaboradorCollection, colaboradorID));
  const colaboradorRetorno = {
    id : colaboradorDoc.id,
    ...colaboradorDoc.data()
  };
  const cargoConsulta = await cargoService.consultaCargoPorID(colaboradorRetorno.cargo.id);
  colaboradorRetorno.cargo = cargoConsulta;
  return colaboradorRetorno
}

//Consulta Colaborador por outro campo qualquer
export const consultaColaboradorCampo = async (descCampo, sinalWhere, valorCampo ) => {
  const colaboradorRetorno = {}
  const colaboradorCollection = collection(dataBase, 'colaborador');
  const colaboradorQuery = query(colaboradorCollection, where(descCampo , sinalWhere, valorCampo));
  const colaboradorDoc = await getDocs(colaboradorQuery);
  if (isEmpty(colaboradorDoc.docs)) {
    return 
  }
  colaboradorDoc.forEach((cDoc) => {
    colaboradorRetorno.dados = cDoc.data()
    colaboradorRetorno.dados.id = cDoc.id;
  });
  const cargoConsulta = await cargoService.consultaCargoPorID(colaboradorRetorno.dados.cargo.id);
  colaboradorRetorno.dados.cargo = cargoConsulta;
  return colaboradorRetorno.dados
}

//Retorna a Referência do Documento (Para adicionar Usuario)
export const getColaboradorDocRef = async (colaboradorID) => {
  const colaboradorCollection = collection(dataBase, 'colaborador');
  const colaboradorDoc = await getDoc(doc(colaboradorCollection, colaboradorID));
  const colaboradorRef = await colaboradorDoc.ref;
  return colaboradorRef
}

//Adiciona Novo Colaborador
export const adicionaColaborador = async (dados, cargoID) => {
  const colaboradorCollection = collection(dataBase, 'colaborador');
  const cargoRef = await cargo.getCargoDocRef(cargoID);
  const novoColaboradorDoc = await addDoc(colaboradorCollection, {
    cpf : dados.cpf,
    datanascimento : dados.dataNascimento,
    email : dados.email,
    fone : dados.fone,
    nome : dados.nome,
    sobrenome : dados.sobreNome,
    cargo : cargoRef
  })
  return novoColaboradorDoc.id
}

export default {
  adicionaColaborador,
  consultaColaboradorID,
  consultaColaboradorCampo,
  getColaboradorDocRef,
}