import { View, Text, ActivityIndicator } from "react-native";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAuth } from "../hooks/auth";
const AppNavigator = lazy(() => import("./AppNavigator"));
const AuthNavigator = lazy(() => import("./AuthNavigator"));

const RootNavigator = () => {
  const { isAuthenticated, isTokenLoading } = useAuth();

  if (isTokenLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator size="large" color={"black"} />
      </View>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Suspense fallback={null}>
          {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
        </Suspense>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootNavigator;
