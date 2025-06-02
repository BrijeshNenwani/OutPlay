import React from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { FormikConfig, FormikValues, useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../../hooks/auth";
import TextBox from "../../components/controllers/Textbox";
import TouchButton from "../../components/controllers/TouchButton";

const RegisterScreen = ({ navigation }) => {
  // const { register } = useAuth(); // inactive page

  const initialValues = {
    username: "emilys",
    password: "emilyspass",
  };
  const validationSchema = Yup.object().shape({
    username: Yup.string().required("Required"),
    password: Yup.string().min(6).required("Required"),
  });
  const formConfig: FormikConfig<FormikValues> = {
    initialValues,
    validationSchema,
    onSubmit: () => {},
    enableReinitialize: true,
  };

  const formik = useFormik(formConfig);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Sign Up</Text>

      <>
        <TextBox
          id="username"
          formik={formik}
          placeholder="Username"
          label="Username"
          placeholderTextColor="#888"
        />
        <TextBox
          id="password"
          formik={formik}
          placeholder="Password"
          label="Password"
          placeholderTextColor="#888"
        />

        <TouchButton
          label="Register"
          onPress={() => formik.handleSubmit()}
          isLoading={formik.isSubmitting}
        />
        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.link}>Already have an account? Log In</Text>
        </TouchableOpacity>
      </>
    </View>
  );
};

export default RegisterScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 24,
    backgroundColor: "#fff",
  },
  logo: {
    fontSize: 36,
    fontWeight: "bold",
    alignSelf: "center",
    marginBottom: 32,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
  },
  error: {
    color: "red",
    marginBottom: 8,
  },
  link: {
    color: "#007AFF",
    marginTop: 16,
    textAlign: "center",
  },
});
