import * as React from 'react';
import { View, KeyboardAvoidingView,  Image } from 'react-native';
import {styles, Header, theme} from '../Pages/GlobalStyle';
import { Button, TextInput } from 'react-native-paper';






export const LoginScreen = () => {
    const [text, setText] = React.useState("");

    return(
      
      <>
        <Header/>
      <KeyboardAvoidingView style={styles.container}>
        <View>

          <Image
          
          style={styles.image}
          source={require('../img/logo2.png')}
          />
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
        <Button theme={theme} icon="cannabis" mode="contained" text='ENTRAR' onPress={() => console.log('Pressed')}></Button>
    </View>
    </KeyboardAvoidingView>
    </>
       

);
};

