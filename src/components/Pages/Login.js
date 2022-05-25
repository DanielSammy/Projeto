import * as React from 'react';
// import { TextInput } from 'react-native-paper';
import { View, KeyboardAvoidingView, StyleSheet, TextInput } from 'react-native';





export const LoginScreen = () => {
    const [text, setText] = React.useState("");

   return(
   <KeyboardAvoidingView style={styles.background}>
       <View>
          
        <TextInput 
        placeholder = "teste"
        />

        <TextInput 
        placeholder ="outro teste"
        />
    </View>
    </KeyboardAvoidingView>

);
};

const styles = StyleSheet.create({
    background:{
        flex: 1,
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor: '#fff'
    }
})