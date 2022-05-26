import * as React from 'react';
import { View, KeyboardAvoidingView,  Image } from 'react-native';
import {styles} from '../Pages/GlobalStyle';
import { TextInput } from 'react-native-paper';





export const LoginScreen = () => {
    const [text, setText] = React.useState("");

   return(
   <KeyboardAvoidingView style={styles.container}>
        <View>

          <Image
          
          style={styles.image}
          source={require('../img/logo2.png')}
          />
        </View>


       <View >
        <TextInput 
        mode='outlined'
        style={styles.input}
        placeholder = "teste"
        />

        <TextInput
        mode='outlined' 
        style={styles.input}
        placeholder ="outro teste"
        />
    </View>
    </KeyboardAvoidingView>

);
};

