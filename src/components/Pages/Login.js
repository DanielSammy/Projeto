import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { View, Image, Keyboard } from 'react-native';
import {styles, Header, theme, Footer} from '../Pages/GlobalStyle';
import { Button, TextInput } from 'react-native-paper';
import { useState, useEffect } from 'react';
import { consultaFirebase, loginFirebase, consultaCargoPorID } from '../../firebase';
import { isEmpty } from '@firebase/util';


WebBrowser.maybeCompleteAuthSession();


export const LoginScreen = (props) => {
  // Variaveis para Login com o Google
  const [ request, response, promptAsync ] = Google.useAuthRequest({
    expoClientId    : '549642087049-s7v47uep08u0qcbu4rfbma6goovmjb2s.apps.googleusercontent.com',
    iosClientId     : '549642087049-s7v47uep08u0qcbu4rfbma6goovmjb2s.apps.googleusercontent.com',
    androidClientId : '549642087049-s7v47uep08u0qcbu4rfbma6goovmjb2s.apps.googleusercontent.com',
    webClientId     : '549642087049-s7v47uep08u0qcbu4rfbma6goovmjb2s.apps.googleusercontent.com',
    useProxy: true,
    scopes:['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email','https://www.googleapis.com/auth/plus.login']
  })

  //Variaveis da Tela para Login Normal (Usa o Firebase)
  const [ secureText, setSecureText ] = useState(true);
  const [ display, setDisplay ] = useState(true);
  const [ userLogin, setUserLogin ] = useState('');
  const [ userSenha, setUserSenha ] = useState('');
  const [ token, setToken ] = useState(false);
  const [ usuarioGoogle, setUsuarioGoogle ] = useState(false);
  const [ usuario, setUsuario ] = useState(false);

  /* Funcao que verifica se o Usuario Existe no Firebase se o Usuario existe ele chama a home
    Se não ele vai vai para a tela de Cadastro passando as informações que veio do Google */
  async function verificaUsuarioExisteFirebase(token) {
    const dadosGoogle = await pegaDadosLoginGoogle(token)
    const usuarioDoc = await consultaFirebase('usuario', 'sub', '==', dadosGoogle.sub)
    if (isEmpty(usuarioDoc.docs)) {
      setUsuarioGoogle(dadosGoogle)
      return
    }
    usuarioDoc.forEach(async (doc) => {
      const uData = doc.data();
      uData.id = doc.id;
      const cargo = await consultaCargoPorID(uData.cargo.id)
      uData.cargo = cargo;
      setUsuario(uData);  
    })
  }

  //Pega os dados do usuário logado no Google
  async function pegaDadosLoginGoogle(token) {
    const response = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
    });
  
    const respostaJSON = await response.json();
    return respostaJSON;
  }

  //Funcao para Login
  async function login(usuario,senha) {
    await loginFirebase(usuario, senha)
    .then((data) => {
      console.log(data.cargo)
      setUsuario(data)
    })
    .catch((err) => {
      const tipoErro = err.tipo;
      console.log(err.tipo, ' : ', err.message)
      if (tipoErro == 'email') {
        setUserLogin('');
        setUserSenha('')
        return
      }
      if (tipoErro == 'senha') {
        setUserSenha('');
      }

    })
  }

  //Usuario Existe
  useEffect(() => {
    if (usuario) {
      props.navigation.navigate("Home", {
        usuarioLogado : usuario
      })
    }
  },[usuario])

  //Usuario Não Existe
  useEffect(() => {
    if (usuarioGoogle) {
      props.navigation.navigate("Cadastro", {
        usuarioCadastro : usuarioGoogle
      })
    }
  })

  //Login com o Google
  useEffect(() => {
    if (response?.type === 'success') {
      const { authentication: { accessToken } } = response;
      setToken(accessToken);     
    }
  },[response])

  //Se tiver Logado Com o Google Verifica se Usuario Existe no Banco
  useEffect( () => {
    if (token)  {
      verificaUsuarioExisteFirebase(token);
    }
  }, [token])

  //Quando Teclado Aparece o Footer Some, unica forma que consegui
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
            onPress={async () => await login(userLogin, userSenha)}>
              Logar
            </Button>

            <Button
            mode="contained"
            style={[styles.button, {backgroundColor:'blue'}]}
            labelStyle={{marginHorizontal:35, fontWeight:'bold'}}
            icon='google'
            onPress={() => promptAsync()}>
              Logar Com Google
            </Button>
         
        </View>
      <Footer display={display}/>
      </>
       

);
};