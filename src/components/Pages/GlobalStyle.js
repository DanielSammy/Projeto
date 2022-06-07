import { StyleSheet, View } from 'react-native';
import { DefaultTheme } from 'react-native-paper'

export const theme = {
  ...DefaultTheme,
  roundness: 2,
  colors: {
    ...DefaultTheme.colors,
    primary: '#ff0000',
    accent: '#ff0000',
    borderColor: '#ff0000',
    
  },
};

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    input: {
      backgroundColor: '#fff',
      width: 300,
      fontSize: 13,
      justifyContent: 'center',
      borderRadius: 7,
      marginBottom: 10,
      borderColor: 'blue',
    },
    imagem:{
      width: 200,
      height: 200,
      justifyContent: 'center',
      alignItems: 'center',
      position:'relative' ,
      marginBottom: 40,
      marginTop: 40,
    },
    header: {
      top: 0,
      height: '10%',
      backgroundColor: '#ff0000',
    },
    footer: {
      height: '6%',
      backgroundColor: '#ff0000',
      bottom: 0,
      left: 0,
      right:0 ,
      position:'absolute',
      },
    content: {
      minHeight: '84%',
      height: '84%',
    },
    button: {
      color:'red',
      width: 300,
      height: 50,
      fontSize: 13,
      justifyContent: 'center',
      borderRadius: 7,
      marginBottom:10,
    }
  });

export const PageDefault = ({children}) => {
  return (
    <>
    <Header />
    <Content children={children}>
        
    </Content>  
    <Footer display={true} />
    </>
  )
}

export const Header = () => {

  return(


  <View style={styles.header}>
  </View>

  )
}

export const Footer = ({display}) => {
  

    return(
    <View 
    style={display ? styles.footer: {display:'none'}}>
    </View>
    )
  }

export const Content = ({children}) => {
  return (
    <View style={styles.content}>
      {children}
    </View>
  )
}
  
