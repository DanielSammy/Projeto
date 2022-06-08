import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import { View, Image, Keyboard } from 'react-native';
import {styles, Header, theme, Footer} from '../Pages/GlobalStyle';
import { Button, TextInput } from 'react-native-paper';
import { useState, useEffect } from 'react';


WebBrowser.maybeCompleteAuthSession();


export const Cadastro = ({route, navigation}) => {
  const { usuarioCadastro } = route.params;
  const [ secureText, setSecureText ] = useState(true);
  const [ display, setDisplay ] = useState(true);

  const [ email, setEmail ] = useState('');
  const [ senha, setSenha ] = useState('');
  const [ nome, setNome ] = useState('');
  const [ dataNascimento, setDataNascimento ] = useState('');
  const [ cpf, setCPF ] = useState('');
  const [ fone, setFone ] = useState('');
  const [ cargo, setCargo ] = useState('0');

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setDisplay(false);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setDisplay(true);
    });
  },[Keyboard])

  useEffect(() => {
    if(usuarioCadastro) {
      setNome(usuarioCadastro.name)
      setEmail(usuarioCadastro.email)
    }
  },[usuarioCadastro])

  return(      
      <>
      <Header/>
        <View
        style={styles.container}>
            <TextInput
              theme={theme}
              mode='outlined'
              style={styles.input}
              placeholder = "Email"
              value={email}
              onChangeText={(login) => setEmail(login)}
            />

            <TextInput
              theme={theme}
              mode='outlined' 
              style={styles.input}
              secureTextEntry={secureText}
              value={senha}
              placeholder ="Senha"
              textContentType='password'
              onChangeText={(senha) => setSenha(senha)}
              right={<TextInput.Icon onPress={() => setSecureText(!secureText)} name={secureText ? 'eye-off-outline' : 'eye-outline'} />}
            />

            <TextInput
              theme={theme}
              mode='outlined' 
              style={styles.input}
              value={nome}
              placeholder ="Nome"
              onChangeText={(nome) => setNome(nome)}
            />

            <TextInput
              theme={theme}
              mode='outlined' 
              style={styles.input}
              value={dataNascimento}
              placeholder ="Data Nascimento"
              onChangeText={(dataNascimento) => setDataNascimento(dataNascimento)}
            />

            <TextInput
              theme={theme}
              mode='outlined' 
              style={styles.input}
              value={cpf}
              placeholder ="CPF"
              onChangeText={(cpf) => setCPF(cpf)}
            />

            <TextInput
              theme={theme}
              mode='outlined' 
              style={styles.input}
              value={fone}
              placeholder ="Fone"
              onChangeText={(fone) => setFone(fone)}
            />

            <TextInput
              theme={theme}
              mode='outlined' 
              style={styles.input}
              value={cargo}
              placeholder ="Cargo"
              onChangeText={(cargo) => setCargo(cargo)}
            />

            <Button
            theme={theme}
            style={styles.button}
            mode="outlined"
            labelStyle={{fontSize:15}}
            onPress={() => console.log('Cadastro')}>
              Cadastrar
            </Button>
        </View>
      <Footer display={display}/>
      </>
       

);
};