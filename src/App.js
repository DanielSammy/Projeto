import React from 'react';
import registerRootComponent from 'expo/build/launch/registerRootComponent';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator} from '@react-navigation/stack'
import { LoginScreen } from './components/Pages/Login';
import { Home } from './components/Pages/Home';

const Stack = createStackNavigator();

function MyStack() {
  
  return (
    <Stack.Navigator style={{backgroundColor: '#ff0000'}}>
      <Stack.Screen name="Login" component={LoginScreen} options={{headerTransparent:true, title:""}} />
      <Stack.Screen name="Home" component={Home} options={{title:"teste", backgroundColor: '#fff000'}} />
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




