import React, { useLayoutEffect, useState } from "react";
import {  Text , View} from 'react-native';
import { IconButton, Menu, Divider } from "react-native-paper";
import { PageDefault, styles, Button } from './GlobalStyle'
import { CommonActions } from "@react-navigation/native";

const Home = ({route, navigation}) => {
  const [ visible, setVisible ] = useState(false)
  const {usuarioLogado} = route.params

   const openMenu = () => {
    setVisible(true);
  };

  const closeMenu = () => {
    setVisible(false);
  };

  useLayoutEffect(() => {
    navigation.setOptions(
      {headerLeft: () => (
        <View>
        </View>
      ),
        headerRight:() => (
        <View style={{display: 'flex', flexDirection: 'row', 
        flexDirection: 'row',
        justifyContent: 'center',}}>
          <Menu
            visible={visible}
            onDismiss={() => closeMenu()}
            anchor={<IconButton
              onPress={() => openMenu()}
              icon='dots-vertical'
              size={24}          
            />}>
            <Menu.Item onPress={() => {}} title="Perfil" />
            <Divider />
            <Menu.Item onPress={() => logout()} title="Logout" />
          </Menu>
        </View>
      ),});
  }, [visible])

  const logout = async () => {
    await setVisible(false);
    backAction();
  }
  const backAction = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes:[
          {name: 'Login'},
        ], 
      })
      )
   return true;
  };


  return (
    <PageDefault>
      {/* <View style={styles.document}>
        <Button  icon='account' style={{backgroundColor:'#009', width: 100, height: 100,}} onPress={() => console.warn('teste1')}/>
        <View style={styles.document}>
          <Button icon='account' style={{backgroundColor:'#090', width: 100, height: 100,}} onPress={() => console.warn('teste2')}/>
        </View>
      </View>
      <View style={styles.document}>
        <Button icon='account' style={{backgroundColor:'#900', width: 100, height: 100,}} onPress={() => console.warn('teste3')}/>
      <View style={styles.document}>
        <Button icon='account' style={{backgroundColor:'#0999', width: 100, height: 100,}} onPress={() => console.warn('teste4')}/>
      </View>
      </View> */}
    <View style={{flex: 1, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center'}}>
      {/* <Icon name='add'></Icon> */}
      <Buttom />
      <Buttom/>
    </View>

    <View style={{flex:1, justifyContent: 'space-around', flexDirection: 'row', alignItems: 'center'}}>
      <Buttom/>
      <Buttom/>
    </View>
  </PageDefault>
  )
}

export default Home
