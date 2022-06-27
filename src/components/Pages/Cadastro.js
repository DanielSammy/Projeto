import * as React from 'react';
import * as WebBrowser from 'expo-web-browser';
import db from '../../database/firebase';
import { useState, useEffect, useLayoutEffect } from 'react';
import { View, Keyboard } from 'react-native';
import {styles, Header, theme, Footer} from '../Pages/GlobalStyle';
import { Button, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useAlerts } from 'react-native-paper-alerts';
import { CommonActions } from '@react-navigation/native'
import { HeaderBackButton, HeaderTitle } from '@react-navigation/elements';
import { MaskedTextInput } from 'react-native-mask-text';



WebBrowser.maybeCompleteAuthSession();


export const Cadastro = ({route, navigation}) => {
  
  const { usuarioCadastro, tipoCadastro } = route.params? route.params : '';
  const [ secureText, setSecureText ] = useState(true);
  const [ display, setDisplay ] = useState(true);
  const [ onLoading, setOnLoading ] = useState(true)
  const [ cargos, setCargos ] = useState([]);
  const [ cadastroColaborador, setCadastroColaborador ] = useState(false);
  const [ cadastroUsuario, setCadastroUsuario ] = useState(false);
  const alerts = useAlerts();

  //Variaveis para Cadastro
  const [ email, setEmail ] = useState('');
  const [ senha, setSenha ] = useState('');
  const [ nome, setNome ] = useState('');
  const [ sobrenome, setSobrenome ] = useState('');
  const [ dataNascimento, setDataNascimento ] = useState('');
  const [ cpf, setCPF ] = useState('');
  const [ fone, setFone ] = useState('');
  const [ cargo, setCargo ] = useState('');
  const [ colaboradorID, setColaboradorID ] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions(
      { title: '',
          headerTitle: (props) => (<HeaderTitle style={{color:'white', fontSize:18}}>{props.children}</HeaderTitle>),
        headerLeft:() => (
        <View style={{display: 'flex', flexDirection: 'row'}}>
          <HeaderBackButton
            onPress={() => backAction()}
            title="backButton"
            tintColor="#fff"
          />
        </View>
      ),});
  }, [])

  const backAction = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: "Login" }],
      })
    );
   return true;
  };

  useEffect(() => {
    if(onLoading) {
      if (tipoCadastro == 'Colaborador') {
        const consultaCargos = async () => {
          const cargoCons = await db.cargo.consultaCargos();
          setCargo(cargoCons[0]);
          setCargos(cargoCons);
        }
        consultaCargos();
        setCadastroColaborador(true);
      }
      if(tipoCadastro == 'Usuario') {
        setCadastroUsuario(true);
        setCargos([usuarioCadastro.cargo]);
        setCargo([usuarioCadastro.cargo[0]]);
        setNome(usuarioCadastro.nome);
        setEmail(usuarioCadastro.email);
        setSobrenome(usuarioCadastro.sobrenome);
        setDataNascimento(usuarioCadastro.datanascimento);
        setCPF(usuarioCadastro.cpf);
        setFone(usuarioCadastro.fone);
        setColaboradorID(usuarioCadastro.id)
      }
      setOnLoading[false]
    }
   },[onLoading])
 

  useEffect(() => {
    Keyboard.addListener('keyboardDidShow', () => {
      setDisplay(false);
    });
    Keyboard.addListener('keyboardDidHide', () => {
      setDisplay(true);
    });
  },[Keyboard])

  const cadastrarUsuario = async (email, senha, colaboradorID) => {
    const novoUsuario = await db.usuario.adicionaUsuario(email, senha, colaboradorID);
    const alerta = {
      title : 'Cadastro Realizado com Sucesso',
      message : 'Usuário cadastrado com sucesso, por favor tente fazer o login novamente'
    }
    alerts.alert(alerta.title, alerta.message, [{
      text: "OK",
      onPress: () => backAction()
    }]);
  };

  return(      
      <>
      <Header/>
        <View
        style={styles.container}>
            <TextInput 
              theme={theme}
              mode='outlined'
              style={styles.input}
              label='Email'
              placeholder = 'Email'
              value={email}
              keyboardType='email-address'
              disabled={cadastroUsuario}
              onChangeText={(login) => setEmail(login)}
            />

            <TextInput
              theme={theme}
              mode='outlined' 
              style={styles.input}
              label='Senha'
              secureTextEntry={secureText}
              value={senha}
              placeholder ="Senha"
              textContentType='password'
              disabled={cadastroColaborador}
              onChangeText={(senha) => setSenha(senha)}
              right={<TextInput.Icon onPress={() => setSecureText(!secureText)} name={secureText ? 'eye-off-outline' : 'eye-outline'} />}
            />

            <TextInput
              theme={theme}
              mode='outlined' 
              style={styles.input}
              label='Nome'
              value={nome}
              disabled={cadastroUsuario}
              placeholder ="Nome"
              onChangeText={(nome) => setNome(nome)}
            />

            <TextInput
              theme={theme}
              mode='outlined' 
              style={styles.input}
              label='Sobrenome'
              value={sobrenome}
              disabled={cadastroUsuario}
              placeholder ="Sobrenome"
              onChangeText={(sobrenome) => setSobrenome(sobrenome)}
            />

            <TextInput
              theme={theme}
              mode='outlined' 
              style={styles.input}
              label='Data de Nascimento'
              value={dataNascimento}
              disabled={cadastroUsuario}
              placeholder ="Data Nascimento"
              keyboardType='numeric'
              onChangeText={(dataNascimento) => setDataNascimento(dataNascimento)}
            />

            <TextInput
              theme={theme}
              mode='outlined' 
              style={styles.input}
              label='C.P.F'
              value={cpf}
              disabled={cadastroUsuario}
              placeholder ="CPF"
              keyboardType='numeric'
              onChangeText={(cpf) => setCPF(cpf)}
            />

            <TextInput
              theme={theme}
              mode='outlined' 
              style={styles.input}
              label='Telefone'
              value={fone}
              disabled={cadastroUsuario}
              placeholder ="Fone"
              onChangeText={(fone) => setFone(fone)}
            />

            <Picker
              mode='outlined' 
              style={[styles.picker]}
              selectedValue={cargo}
              disabled={cadastroUsuario}
            >
              {cargos.map((cargo, index) => {
                return (
                  <Picker.Item label={cargo.desc} value={cargo.id} key={index} />
                )                
              })}
            </Picker>

            <Button
            theme={theme}
            style={styles.button}
            mode="outlined"
            labelStyle={{fontSize:15}}
            onPress={() => {
              if (cadastroUsuario) {
                cadastrarUsuario(email, senha, colaboradorID)
              }
            }}>
              Cadastrar
            </Button>
        </View>
      <Footer display={display}/>
      </>
       

);
};