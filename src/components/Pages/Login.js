import * as React from 'react';
import { View, Image, Keyboard } from 'react-native';
import {styles, Header, theme, Footer} from '../Pages/GlobalStyle';
import { Button, TextInput } from 'react-native-paper';
import { useState, useEffect } from 'react';


export const LoginScreen = (props) => {
  const [ secureText, setSecureText ] = useState(true);
  const [ display, setDisplay ] = useState(true);
  const [ userLogin, setUserLogin ] = useState('');
  const [ userSenha, setUserSenha ] = useState('');

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setDisplay(false);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setDisplay(true);
    });
  },[Keyboard])

    return(      
      <>
      <Header/>
        <View
        style={styles.container}>
          
            <Image
            style={[styles.imagem]}
            source={require('../img/LOGEXPRESS.png')}/>
          


          
            <TextInput 
              theme={theme}
              mode='outlined'
              style={styles.input}
              placeholder = "Usuário"
              value={userLogin}
              onChangeText={(login) => setUserLogin(login)}
            />

            <TextInput
              theme={theme}
              mode='outlined' 
              style={styles.input}
              secureTextEntry={secureText}
              value={userSenha}
              placeholder ="Senha"
              textContentType='password'
              onChangeText={(senha) => setUserSenha(senha)}
              right={<TextInput.Icon onPress={() => setSecureText(!secureText)} name={secureText ? 'eye-off-outline' : 'eye-outline'} />}
            />
            <Button
            theme={theme}
            style={styles.button}
            mode="outlined"
            labelStyle={{fontSize:15}}
            onPress={() => {
              console.log(userLogin, userSenha); 
              props.navigation.navigate("Home")
              }}>
              Logar
            </Button>

            <Button
            mode="contained"
            style={[styles.button, {backgroundColor:'blue'}]}
            labelStyle={{marginHorizontal:35, fontWeight:'bold'}}
            icon='google'
            onPress={() => console.log('Google Login')}>
              Logar Com Google
            </Button>
         
        </View>
      <Footer display={display}/>
      </>
       

);
};