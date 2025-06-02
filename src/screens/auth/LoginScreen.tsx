import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import {
  Formik,
  FormikConfig,
  FormikHelpers,
  FormikValues,
  useFormik,
} from "formik";
import * as Yup from "yup";
import { useAuth } from "../../hooks/auth";
import TextBox from "../../components/controllers/Textbox";
import TouchButton from "../../components/controllers/TouchButton";

interface ILoginForm {
  username: string;
  password: string;
}

const LoginScreen = ({ navigation }) => {
  const { login } = useAuth();

  const handleFormSubmit = async (
    values: ILoginForm,
    formikHelpers: FormikHelpers<ILoginForm>
  ) => {
    formikHelpers.setSubmitting(true);

    try {
      await login(values);
    } catch (e: any) {
      formikHelpers.setFieldValue("email", e.message || "Something went wrong");
      // console.log("Unexpected error:", e.message);
    }

    formikHelpers.setSubmitting(false);
  };

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
    onSubmit: handleFormSubmit,
    enableReinitialize: true,
  };

  const formik = useFormik(formConfig);

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Login</Text>

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

        {/* <TextInput
          style={styles.input}
          secureTextEntry
          onChangeText={handleChange("password")}
          onBlur={handleBlur("password")}
          value={values.password}
        />
        {touched.password && (
          <Text style={styles.error}>{errors.password}</Text>
        )} */}

        <TouchButton
          label="Login"
          onPress={() => formik.handleSubmit()}
          isLoading={formik.isSubmitting}
        />

        <TouchableOpacity onPress={() => navigation.navigate("ForgotPassword")}>
          <Text style={styles.link}>Forgot password?</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.link}>Don't have an account? Sign up</Text>
        </TouchableOpacity>
      </>
    </View>
  );
};

export default LoginScreen;

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
