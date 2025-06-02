import { View, Text, ActivityIndicator } from "react-native";
import React from "react";

const FallbackScreen = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <ActivityIndicator size="large" color={"black"} />
    </View>
  );
};

export default FallbackScreen;
