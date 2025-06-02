import { View, Text, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import { useAuth } from "../../hooks/auth";

interface HeaderProps {
  onBackPress: () => void;
  heading: string;
  rightComponent?: ReactNode;
}

const Header = ({ onBackPress, heading, rightComponent }: HeaderProps) => {
  return (
    <View className=" px-4 h-20 flex-row items-center ">
      {/* Back button */}
      <TouchableOpacity
        onPress={() => onBackPress()}
        className=" flex justify-center items-center bg-gray-100 "
        style={{
          marginRight: 8,
          width: 32,
          height: 32,
          borderRadius: "100%",
        }}
      >
        <Entypo name="chevron-small-left" size={24} color="black" />
      </TouchableOpacity>

      {/* Heading */}
      <Text className="text-xl font-bold flex-1 mt-4 mb-3">{heading}</Text>

      {rightComponent}
    </View>
  );
};

export default Header;
