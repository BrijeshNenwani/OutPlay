import React from "react";
import { View, TextInput } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "../../constants/colors";

interface SearchBarProps {
  value: string;
  onChangeText: (text: string) => void;
  LeftComponent?: React.FC | null;
  RightComponent?: React.FC | null;

  placeholder?: string;
}

export default function SearchBar({
  value,
  onChangeText,
  LeftComponent,
  RightComponent,
  placeholder = "Search...",
}: SearchBarProps) {
  return (
    <View className="px-4 mb-2">
      <View className="flex-row items-center bg-gray-100 h-12 rounded-full px-4">
        <Feather name="search" size={18} color={colors.textMuted} />
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor={colors.textMuted}  
          className="flex-1 ml-2 text-base text-text"
          autoCapitalize="none"
          autoCorrect={false}
          clearButtonMode="while-editing"
        />
      </View>
    </View>
  );
}
