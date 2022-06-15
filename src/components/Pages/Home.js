import react from "react";
import { View } from 'react-native';
import { Button } from "react-native-paper";
import { PageDefault, styles } from './GlobalStyle'

const Home = ({route, navigation}) => {
  // const {usuarioLogado} =route.params
  // console.log(usuarioLogado)
  


  return (
    <PageDefault>
      <View style={styles.document}>
        <Button  icon='account' style={{backgroundColor:'#009', width: 100, height: 100,}} onPress={() => console.warn('teste1')}/>
      <View style={styles.document}>
        <Button icon='account' style={{backgroundColor:'#090', width: 100, height: 100,}} onPress={() => console.warn('teste2')}/>
      </View>
      </View>
      <View style={styles.document}>
        <Button icon='account' style={{backgroundColor:'#900', width: 100, height: 100,}} onPress={() => console.warn('teste3')}/>
      <View style={styles.document}>
        <Button icon='account' style={{backgroundColor:'#0999', width: 100, height: 100,}} onPress={() => console.warn('teste4')}/>
      </View>
      </View>
    </PageDefault>
  )
}

export default Home
