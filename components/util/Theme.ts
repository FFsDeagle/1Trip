import { StyleSheet } from "react-native";
import { useState } from "react";

// Theme Component requires work in order to be functional

// Types
export type Theme = {
  colors: {
    primary: string;
    secondary: string;
    background: string;
    text: string;
  };
};

export const defaultTheme: Theme = {
  colors: {
    primary: 'blue',
    secondary: 'green',
    background: 'white',
    text: 'black',
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: 'cyan',
    secondary: 'magenta',
    background: 'black',
    text: 'white',
  },
};

function Theme() {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  
}

// Theme handler
export function toggleTheme(currentTheme: Theme) {

    return currentTheme === defaultTheme ? darkTheme : defaultTheme;
}

export const styles = StyleSheet.create({
    justified: {
      display: 'flex',
      justifyContent: 'center',
      alignContent: 'center'
    },
    justifiedTop: {
      
    },
    container: {
      width: '100%',
      height: '100%',
    },
    gradient: {
      width: '100%',
      height: '100%',
      alignItems: 'center',
      justifyContent: 'center',
    },
    viewStyle: {
      backgroundColor: 'transparent',
    },
    card01: {
      alignItems: 'center',
      width: '100%',
      backgroundColor: 'rgba(0,0,0,0)',
    },
    cardContainer: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 10,
      textAlign: 'center',
      borderRadius: 5,
      backgroundColor: 'rgba(243, 243, 243, 1)',
      width: '90%',
      marginTop: 10,
    },
    getStartedText: {
      fontSize: 24,
      lineHeight: 24,
      textAlign: 'center',
      padding: 20,
      color: 'white',
    },
    textStyle: {
      fontSize: 24,
      lineHeight: 24,
      textAlign: 'center',
      padding: 20,
      color: 'black',
    },
    title: {
      fontSize: 16,
      fontWeight: 'normal',
      marginBottom: 10,
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
  });
  