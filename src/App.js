import React from 'react';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator} from '@react-navigation/stack'
import { View } from 'react-native';
import { LoginScreen } from './components/Pages/Login';
import { styles } from './components/Pages/GlobalStyle'; 

const Stack = createStackNavigator();

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} options={{headerTransparent:true, title:""}} />
    </Stack.Navigator>
  )
}

export default function App() {
  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
}

registerRootComponent(App);




