import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  GestureResponderEvent,
  TouchableOpacityProps,
} from "react-native";

interface TouchButtonProps extends TouchableOpacityProps {
  label?: string;
  onPress?: (event: GestureResponderEvent) => void;
  isLoading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  backgroundColor?: string;
  textColor?: string;
  children?: React.ReactNode; 
}

const TouchButton: React.FC<TouchButtonProps> = ({
  label,
  onPress,
  isLoading = false,
  disabled = false,
  style,
  textStyle,
  backgroundColor = "#3897f0", 
  textColor = "#fff",
  children,
  ...restProps
}) => {
  const isDisabled = disabled || isLoading;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      disabled={isDisabled}
      style={[
        styles.button,
        { backgroundColor: isDisabled ? "#a0cfff" : backgroundColor },
        style,
      ]}
      {...restProps}
    >
      {isLoading ? (
        <ActivityIndicator color={textColor} />
      ) : children ? (
        children
      ) : (
        <Text style={[styles.text, { color: textColor }, textStyle]}>
          {label}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default TouchButton;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
  },
});
