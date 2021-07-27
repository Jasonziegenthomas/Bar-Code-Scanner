import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import React from 'react';
import { StyleSheet, Text, Touchable, TouchableOpacity, View } from 'react-native';
import * as Permissions from 'expo-permissions'
import { BarCodeScanner } from 'expo-barcode-scanner';
export default class App extends React.Component {
  constructor(){
    super()
    this.state={
      hasCameraPermissions:null,
      scanned:false,
      scannedData:'',
      buttonState:'normal',

    }
  }
  getCameraPermissions=async()=>{
     const {status}= await Permissions.askAsync(Permissions.CAMERA)
     this.setState({
       hasCameraPermissions:status==='granted',
       scanned:false,
     })
  }
  handleBarCodeScanned=async({type,data})=>{
    this.setState({
      scanned:true,
      scannedData:data,
      buttonState:'normal',

    })
  }
    render(){
      const hasCameraPermissions=this.state.hasCameraPermissions
      const scanned = this.state.scanned
      const buttonState = this.state.buttonState
      if(buttonState==="clicked"&&hasCameraPermissions){
        return(
          <BarCodeScanner onBarCodeScanned={scanned?undefined:this.handleBarCodeScanned}/>
        )
      }
      else if(buttonState==='normal'){
        return (
        <View style={styles.container}>
          <Text style={styles.text1}>BarCode Scanner</Text>
         <Text style={styles.text}>{hasCameraPermissions===true?this.state.scannedData:'requst Camera Permissions'}</Text>
         <TouchableOpacity style={styles.scanButton} onPress={this.getCameraPermissions}>
           <Text>Scan Qr Code</Text>
         </TouchableOpacity>
        </View>
      );
      }
}}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
    scanButton :{
      buttonSize:40,
     backgroundColor:"aqua",

    },
    text :{
      fontSize:20,
      color:'orange'
    },
    text1 :{
      fontSize:50,
      color:'red',
      backgroundColor:'black'
    }
  });
