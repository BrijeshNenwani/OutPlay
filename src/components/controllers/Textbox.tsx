// components/TextBox.tsx

import React, { useState } from "react";
import {
  TextInput,
  Text,
  View,
  TextInputProps,
  StyleSheet,
} from "react-native";
import colors from "../../constants/colors";

interface TextBoxProps extends TextInputProps {
  id: string;
  formik: any;
  label: string;
}

const TextBox: React.FC<TextBoxProps> = ({ id, formik, label, ...rest }) => {
  const hasError = formik.touched[id] && formik.errors[id];
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.wrapper}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        value={formik.values[id]}
        onChangeText={formik.handleChange(id)}
        onBlur={() => {
          setIsFocused(false);
          formik.handleBlur(id);
        }}
        onFocus={() => setIsFocused(true)}
        style={[
          styles.input,
          isFocused && styles.focused,
          hasError && styles.inputError,
        ]}
        {...rest}
      />
      {hasError && <Text style={styles.errorText}>{formik.errors[id]}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: { marginBottom: 16 },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    backgroundColor: "#f7f7f7aa",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  label: {
    color: colors.textSecondary,
    fontWeight: "700",
    marginLeft: 8,
    marginBottom: 2,
  },
  focused: {
    backgroundColor: "#f9f9f9",
    borderColor: "#007AFF",
  },
  inputError: {
    borderColor: "red",
  },
  errorText: {
    color: "red",
    marginTop: 4,
    fontSize: 13,
  },
});

export default TextBox;
