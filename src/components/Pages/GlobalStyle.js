import { StyleSheet } from 'react-native';
import { Appbar, DefaultTheme } from 'react-native-paper'

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
      bottom: 50,
      justifyContent: 'center',
      borderRadius: 7,
      marginBottom: 10,
      borderColor: 'blue',
    },
    image:{
      justifyContent: 'center',
      alignItems: 'center',
      bottom: '0%'
    },
    header: {
      height: '9%',
      backgroundColor: '#ff0000',
      
    },
  });

export const Header = () => {

  return(


  <Appbar style={styles.header}>
   <Appbar.Action/>
    </Appbar>

  )
}

