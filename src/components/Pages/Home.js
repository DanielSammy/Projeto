import react from "react";
import { SafeAreaView, Text } from 'react-native';
import { PageDefault } from './GlobalStyle'

const Home = ({route, navigation}) => {
  const {usuarioLogado} =route.params
  console.log(usuarioLogado)


  return (
    <PageDefault>
      <Text >
        Bem Vindo {usuarioLogado.nome}, do Cargo {usuarioLogado.cargo.desc}
        
      </Text>
    </PageDefault>
  )
}

export default Home
