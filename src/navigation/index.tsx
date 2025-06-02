import { View, Text, ActivityIndicator } from "react-native";
import React, { lazy, Suspense, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { useAuth } from "../hooks/auth";
import FallbackScreen from "../screens/FallbackScreen";
const AppNavigator = lazy(() => import("./AppNavigator"));
const AuthNavigator = lazy(() => import("./AuthNavigator"));

const RootNavigator = () => {
  const { isAuthenticated, isTokenLoading } = useAuth();

  if (isTokenLoading) {
    return <FallbackScreen />;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Suspense fallback={<FallbackScreen />}>
          {isAuthenticated ? <AppNavigator /> : <AuthNavigator />}
        </Suspense>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default RootNavigator;
