import { StyleSheet } from "react-native";
import { useState } from "react";

// Theme Component requires work in order to be functional

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
    containerMargin: {
      width: '100%',
      height: '100%',
      marginTop: 20,
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
      fontSize: 20,
      lineHeight: 24,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      fontWeight: 'bold',
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
    },
    description: {
      fontSize: 10,
    },
    separator: {
      marginVertical: 30,
      height: 1,
      width: '80%',
    },
    gridContainer: {
      paddingTop: 15,
      width: '100%',
      paddingBottom: 15,
    },
    gridItem: {
        borderColor: 'rgba(0,0,0,0.2)',
        backgroundColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        width: '100%',
        height: 75,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    listItem: {
      borderColor: 'rgba(0,0,0,0.2)',
      borderBottomWidth: 1,
    },
    subtitle: {
      fontSize: 12,
      color: 'rgba(0,0,0,0.4)',
    },
  });
  