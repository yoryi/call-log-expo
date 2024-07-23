import uuid from 'uuid';
import { useEffect, useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as moduleNative from './modules/callregister';
import RNCallKeep from 'react-native-callkeep';

//Variables
const getNewUuid = () => uuid.v4().toLowerCase();

//Implemantacion
RNCallKeep.setup({
  ios: {
    appName: 'appcall',
  },
  android: {
     alertTitle: 'Permissions required',
    alertDescription: 'This application needs to access your phone accounts',
    cancelButton: 'Cancel',
    okButton: 'ok',
  },
});


export default function App() {
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  //All Funtions 
  const answerCall = ({ callUUID }) => {
    const number = calls[callUUID];
    console.log(`[answerCall] ${format(callUUID)}, number: ${number}`);
    RNCallKeep.startCall(callUUID, number, number);
  };

  const didPerformDTMFAction = ({ callUUID, digits }) => {
    const number = calls[callUUID];
    console.log(`[didPerformDTMFAction] ${format(callUUID)}, number: ${number} (${digits})`);
  };

  const didReceiveStartCallAction = ({ handle }) => {
    if (!handle) {
      return;
    }
    const callUUID = getNewUuid();
    addCall(callUUID, handle);

    console.log(`[didReceiveStartCallAction] ${callUUID}, number: ${handle}`);
    RNCallKeep.startCall(callUUID, handle, handle);
  };

  const didPerformSetMutedCallAction = ({ muted, callUUID }) => {
    const number = calls[callUUID];
    console.log(`[didPerformSetMutedCallAction] ${format(callUUID)}, number: ${number} (${muted})`);
    setCallMuted(callUUID, muted);
  };

  const didToggleHoldCallAction = ({ hold, callUUID }) => {
    const number = calls[callUUID];
    console.log(`[didToggleHoldCallAction] ${format(callUUID)}, number: ${number} (${hold})`);
    setCallHeld(callUUID, hold);
  };

  const endCall = ({ callUUID }) => {
    const handle = calls[callUUID];
    console.log(`[endCall] ${format(callUUID)}, number: ${handle}`);
    removeCall(callUUID);
  };

  //Hooks Eventos
  useEffect(() => {
    RNCallKeep.addEventListener('answerCall', answerCall);
    RNCallKeep.addEventListener('didPerformDTMFAction', didPerformDTMFAction);
    RNCallKeep.addEventListener('didReceiveStartCallAction', didReceiveStartCallAction);
    RNCallKeep.addEventListener('didPerformSetMutedCallAction', didPerformSetMutedCallAction);
    RNCallKeep.addEventListener('didToggleHoldCallAction', didToggleHoldCallAction);
    RNCallKeep.addEventListener('endCall', endCall);

    return () => {
      RNCallKeep.removeEventListener('answerCall', answerCall);
      RNCallKeep.removeEventListener('didPerformDTMFAction', didPerformDTMFAction);
      RNCallKeep.removeEventListener('didReceiveStartCallAction', didReceiveStartCallAction);
      RNCallKeep.removeEventListener('didPerformSetMutedCallAction', didPerformSetMutedCallAction);
      RNCallKeep.removeEventListener('didToggleHoldCallAction', didToggleHoldCallAction);
      RNCallKeep.removeEventListener('endCall', endCall);
    }
  }, []);

  //Make Call
  const handleMakeCall = async () => {
    const res = moduleNative.makeCall('+573008443534')
    console.log('res', res)
  }

  const getCallTimes = async () => {
    const start = await moduleNative.getCallStartTime();
    const end = await moduleNative.getCallEndTime();
    console.log('res: ', start);
    setStartTime(start);
    setEndTime(end);
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
