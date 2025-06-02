import { Alert, TouchableOpacity } from "react-native";
import React from "react";
import { useAuth } from "../../hooks/auth";
import { AntDesign } from "@expo/vector-icons";

const LogoutButton = () => {
  const { logout } = useAuth();
  const handleLogout = () => {
    Alert.alert("Logout?", "Do you want to logout?", [
      { text: "Cancel", onPress: () => {} },
      {
        text: "Yes",
        onPress: () => {
          logout();
        },
      },
    ]);
  };
  return (
    <TouchableOpacity
      onPress={handleLogout}
      className=" flex justify-center items-center "
      style={{
        marginRight: 8,
        width: 32,
        height: 32,
        borderRadius: "100%",
      }}
    >
      <AntDesign
        name="logout"
        className="self-end p-1 rounded-full bg-gray-100"
        size={20}
        color="black"
      />
    </TouchableOpacity>
  );
};

export default LogoutButton;
