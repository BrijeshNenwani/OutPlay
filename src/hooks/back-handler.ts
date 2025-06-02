import { useFocusEffect } from "@react-navigation/native";
import { BackHandler, Alert } from "react-native";
import { useCallback } from "react";

const useBackButtonHandler = () => {
  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Exit App?", "Are you sure you want to exit app?", [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => {},
          },
          {
            text: "Exit",
            onPress: () => BackHandler.exitApp(),
          },
        ]);
        return true;
      };

      BackHandler.addEventListener("hardwareBackPress", onBackPress);

      return () => {
        BackHandler.removeEventListener("hardwareBackPress", onBackPress);
      };
    }, [])
  );
};

export default useBackButtonHandler;
