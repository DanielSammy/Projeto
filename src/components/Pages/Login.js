import * as React from 'react';
import { TextInput, Card } from 'react-native-paper';
import { View } from 'react-native';
import { styles } from './GlobalStyle';


const Block =() => {
    return(
        <Card>
        <Card.Content>
        </Card.Content>
    </Card>
        );
};

export const LoginScreen = () => {
    const [text, setText] = React.useState("");

   return(
   <Block>


        <TextInput 
        mode="outlined"
        label="Usuario"
        value={text}
        onChangeText={text => setText(text)}
        />

        <TextInput 
        mode="outlined"
        label="Senha"
        value={text}
        onChangeText={text => setText(text)}
        />
    </Block>

);
};

