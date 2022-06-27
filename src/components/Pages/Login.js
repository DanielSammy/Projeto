import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';
import { View, Image, Keyboard, Alert, Platform } from 'react-native';
import {styles, Header, theme, Footer} from '../Pages/GlobalStyle';
import { Button, TextInput } from 'react-native-paper';
import { useState, useEffect, useLayoutEffect } from 'react';
import db from '../../database/firebase';
import { isEmpty } from '@firebase/util';
import { useAlerts } from 'react-native-paper-alerts';



WebBrowser.maybeCompleteAuthSession();


export const LoginScreen = ({navigation}) => {
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
  const [ usuarioCadastro, setUsuarioCadastro ] = useState(false);
  const [ usuario, setUsuario ] = useState(false);
  const [ onLoading, setOnLoading ] = useState(true)
  const alerts = useAlerts();

  /* Funcao que verifica se o Usuario Existe no Firebase se o Usuario existe ele chama a home
    Se não ele vai fazer uma consulta para saber se o colaborador foi cadastrado e caso tenha sido
    vai para a tela de cadastro, do usuário */
  async function verificaUsuarioExisteFirebase(token) {
    const dadosGoogle = await pegaDadosLoginGoogle(token)
    const usuarioDoc = await db.consultaFirebase('usuario', 'email', '==', dadosGoogle.email)
    if (isEmpty(usuarioDoc.docs)) {
      const colaboradorDoc = await db.colaborador.consultaColaboradorCampo('email', '==', dadosGoogle.email)
      if (isEmpty(colaboradorDoc)) {
        const alerta = {
          title : 'Erro de Cadastro',
          message : 'Informações sobre esse colaborador não existem, por favor contate o RH'
        }
        alerts.alert(alerta.title, alerta.message)
        setUserLogin('');
        setUserSenha('')
        return
      }
      setUsuarioCadastro(colaboradorDoc)
      return
    }
    const usuarioLogado = await db.usuario.consultaUsarioPorID(usuarioDoc.docs[0].id);
    setUsuario(usuarioLogado);
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
    const usuarioDoc = await db.usuario.consultaUsuarioCampo('email', '==', usuario)
    if (isEmpty(usuarioDoc)) {
      const colaboradorDoc = await db.colaborador.consultaColaboradorCampo('email', '==', usuario)
      if (isEmpty(colaboradorDoc)) {
        const alerta = {
          title : 'Erro de Cadastro',
          message : 'Informações sobre esse colaborador não existem, por favor contate o RH'
        }
        await alerts.alert(alerta.title, alerta.message, [{
          text:'OK',
          onPress: () => console.log('RAPAZ')
        }])
        setUserLogin('');
        setUserSenha('')
        return
      }
      setUsuarioCadastro(colaboradorDoc)
      return
    }
    const usuarioLogin = await db.usuario.loginFirebase(usuario, senha)
    .catch((err) => {
      const tipoErro = err.tipo;
      console.log(err.tipo, ' : ', err.message)
      if (tipoErro == 'senha') {
        setUserSenha('');
      }
    })
    setUsuario(usuarioLogin)
  }

  useLayoutEffect(() => {
    if (onLoading) {
      setUsuarioCadastro('');
      setUsuario('');
      setUserSenha('@kalunga123');
      setUserLogin('otaviored@gmail.com');
      setToken('');
      setOnLoading(false);
    }
    return () => {
      setOnLoading(true)
    }
  },[])


  //Usuario Existe
  useEffect(() => {
    if (usuario) {
      navigation.navigate("Home", {
        usuarioLogado : usuario
      })
    }
  },[usuario])

  //Usuario Não Existe
  useEffect(() => {
    if (usuarioCadastro) {
      navigation.navigate("Cadastro", {
        usuarioCadastro : usuarioCadastro,
        tipoCadastro : 'Usuario'
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
            theme={theme}
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