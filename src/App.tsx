import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { AuthProvider } from "./hooks/auth";
import RootNavigator from "./navigation";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import "../global.css";

export default function App() {
  return (
    <Provider store={store}>
      <AuthProvider>
        <RootNavigator />
      </AuthProvider>
    </Provider>
  );
}
