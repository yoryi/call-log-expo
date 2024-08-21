import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as moduleNative from './modules/callregister';

export default function App() {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  //Make Call
  const handleMakeCall = async () => {
    const res = moduleNative.makeCall('+573017771564')
    console.log('res', res)
  }

  const getCallTimes = async () => {
    console.log('res: ', start);
  };

  const renderUI = () => {
    return (
      <View style={styles.container}>
        <StatusBar style="auto" />
        <Text style={{ fontWeight: "bold", fontSize: 15 }}>
          App Prueba para llamadas!
        </Text>
        <TouchableOpacity
          onPress={handleMakeCall}
          style={{
            backgroundColor: "black",
            padding: 20,
            borderRadius: 20,
            marginTop: 40,
          }}
        >
          <Text style={{ color: "white" }}>
            Realizar llamada a: +57-300-929****
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={getCallTimes}
          style={{
            backgroundColor: "black",
            padding: 20,
            borderRadius: 20,
            marginTop: 40,
          }}
        >
          <Text style={{ color: "white" }}>Detalles</Text>
        </TouchableOpacity>
        {startTime && (
          <Text>Call Start Time: {new Date(startTime * 1000).toString()}</Text>
        )}
        {endTime && (
          <Text>Call End Time: {new Date(endTime * 1000).toString()}</Text>
        )}
      </View>
    );
  }
  return renderUI();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
