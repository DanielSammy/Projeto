import * as React from 'react';
import { View, Image } from 'react-native';
import {styles, Header, theme, Footer} from '../Pages/GlobalStyle';
import { Button, TextInput } from 'react-native-paper';


export const LoginScreen = (props) => {
  

    return(      
      <>
        <Header/>
        <View style={styles.container}>
        <View style={{ bottom: '15%'}}>
          <Image
          style={styles.image}
          source={require('../img/LOGEXPRESS.png')}/>
          </View>



       <View>
        <TextInput 
          theme={theme}
          mode='outlined'
          style={styles.input}
          placeholder = "Usuário"
          />

        <TextInput
          theme={theme}
          mode='outlined' 
          style={styles.input}
          placeholder ="Senha"
          />
        <Button theme={theme} icon="cannabis" mode="contained"  onPress={() => props.navigation.navigate("Home")}></Button>

        </View>
          </View>
    <Footer/>
    </>
       

);
};

