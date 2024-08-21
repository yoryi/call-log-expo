import { useState } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as moduleNative from "./modules/callregister";

export default function App() {
  const handleMakeCall = async () => {
    const res = moduleNative.makeCall("+573005554313");
    console.log("res", res);
  };

  const handleOther = async () => {
    const res = moduleNative.getLocalize()
    console.log("hola", res);
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
          onPress={handleOther}
          style={{
            backgroundColor: "black",
            padding: 20,
            borderRadius: 20,
            marginTop: 40,
          }}
        >
          <Text style={{ color: "white" }}>
            Get
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return renderUI();
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
