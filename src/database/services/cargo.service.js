import { dataBase } from '../firebase';
import { collection, query, where, getDocs, getDoc, doc } from 'firebase/firestore';

//Consulta Cargo pelo ID
export  const consultaCargoPorID = async (cargoID) => {
  const cargoCollection = collection(dataBase, 'cargo');
  const cargoDoc = await getDoc(doc(cargoCollection, cargoID));
  const cargo = {
    id : cargoID,
    ...cargoDoc.data()
  }
  return cargo; 
};

//Consulta todos os Cargos
export const consultaCargos = async () => {
  const cargos = [];
  const cargoCollection = collection(dataBase, 'cargo');
  const cargoDocs = await getDocs(cargoCollection);
  cargoDocs.forEach((cDoc) => {
    const cargo = {
      id: cDoc.id,
      ...cDoc.data()
    }
    cargos.push(cargo)
  })
  return cargos;
}

//Retorna a Referência do Documento (Para adicionar ou atualizar usuarios)
export const getCargoDocRef = async (cargoID) => {
  const cargoCollection = collection(dataBase, 'cargo');
  const cargoDoc = await getDoc(doc(cargoCollection, cargoID));
  const cargoRef = await cargoDoc.ref;
  return cargoRef
}

export default {
  getCargoDocRef,
  consultaCargoPorID,
  consultaCargos,
}