import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    justified: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    },
    justifiedCenter: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      alignContent: 'center',
    },
    justfiedEnd: {
      display: 'flex',
      justifyContent: 'flex-end',
      alignItems: 'center',
      alignContent: 'center',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
    },
    alignContentStart: {
      display: 'flex',
      alignContent: 'flex-end',
      justifyContent: 'center'
    },
    justifiedStart: {
      display: 'flex',
      justifyContent: 'flex-start',
      alignContent: 'center'
    },
    absoluteBottomRight: {
      position: 'absolute',
      bottom: 20,
      right: 20,
      zIndex: 100,
      elevation: 5,
    },
    button: {
      alignItems: 'center',
      padding: 10,
      borderRadius: 5,
      margin: 5,
    },
    buttonText: {
      fontWeight: 'bold',
    },
    flexRow: {
      display: 'flex',
      flexDirection: 'row',
      width: '100%',
    },
    flexEnd: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      width: '100%',
    },
    flexBottom: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      alignContent: 'center',
      justifyContent: 'flex-end',
      width: '100%',
    },
    iconSelection: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0,0,0,0.2)',
      padding: 5,
      borderRadius: 15,
      width: 50,
      height: 50,
      marginTop: 10,
      margin: 5,
    },
    flexColumn: {
      display: 'flex',
      flexDirection: 'column',
    },
    justifiedApart: {
      display: 'flex',
      alignContent: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
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
      textAlign: 'center',
      borderRadius: 5,
      backgroundColor: 'rgba(0,0,0,0.5)',
      width: '98%',
      marginTop: 10,
      height: 125,
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
    header2: {
      fontSize: 18,
      lineHeight: 24,
      paddingTop: 10,
      paddingBottom: 10,
      paddingLeft: 20,
      fontWeight: 'bold',
    },
    header3:{
      fontSize: 16,
      lineHeight: 24,
      paddingTop: 8,
      paddingBottom: 8,
      fontWeight: 'bold',
    },
    textStyle: {
      fontSize: 24,
      lineHeight: 24,
      textAlign: 'center',
      padding: 15,
      paddingTop: 10,
      paddingBottom: 10,
    },
    title: {
      fontSize: 16,
      fontWeight: 'normal',
      marginLeft: 10,
      marginRight: 10,
    },
    heading: {
      fontSize: 18,
      fontWeight: 'bold',
      padding: 10,
    },
    description: {
      fontSize: 10,
    },
    separator: {
      marginVertical: 15,
      borderBottomColor: 'black',
      borderBottomWidth: StyleSheet.hairlineWidth,
      height: 1,
      width: '80%',
    },
    gridContainer: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
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
      borderColor: 'rgba(0,0,0,0.5)',
      borderBottomWidth: 1,
      padding: 10,
      fontSize: 16,
    },
    listText: {
      borderColor: 'rgba(0,0,0,0.2)',
      padding: 5,
      fontSize: 16,
    },
    inputItem: {
      padding: 10,
      borderRadius: 5,
      borderBottomColor: 'rgba(255,255,255,0.5)',
      borderBottomWidth: StyleSheet.hairlineWidth,
      width: '90%',
      marginBottom: 15,
    },
    subtitle: {
      fontSize: 12,
    },
  });
  