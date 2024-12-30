import { useState, useContext } from "react";
import { Link, useRouter } from "expo-router";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { ClickCountContext } from "./context/ClickCounterContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );

  const [showPassword, setShowPassword] = useState(false);
  const { userEmail, userPassword, setIsAuthenticated } =
    useContext(ClickCountContext);
  const router = useRouter();

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleRegisterSwitch = () => {
    router.push("/");
  };

  const handleLogin = () => {
    let validity = true;
    const newErrors: any = {};

    if (!email) {
      newErrors.email = "Email is required";
      validity = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Email address is invalid";
      validity = false;
    }

    if (!password) {
      newErrors.password = "Password is required";
      validity = false;
    } else if (password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
      validity = false;
    }

    setErrors(newErrors);

    if (validity) {
      if (email === userEmail && password === userPassword) {
        setIsAuthenticated(true);
        router.push("/home");
      } else {
        setErrors({ ...newErrors, password: "Invalid credentials" });
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require("../assets/images/logo2.png")}
          style={styles.cardImage}
        />
      </View>
      <Text style={styles.title}>SportsCorner</Text>

      <TextInput
        placeholderTextColor="#000"
        placeholder="Email"
        style={styles.input}
        keyboardType="email-address"
        value={email}
        onChangeText={setEmail}
      />
      {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      <View style={styles.pass}>
        <TextInput
          placeholderTextColor="#000"
          placeholder="Enter Password"
          style={styles.inputPass}
          {...(showPassword
            ? { secureTextEntry: false }
            : { secureTextEntry: true })}
          value={password}
          onChangeText={setPassword}
        />
        <Pressable onPress={toggleShowPassword}>
          <Text style={styles.passText}>Show</Text>
        </Pressable>
      </View>
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>
      <Text style={styles.footerText}>
        Create Your Own Account?{" "}
        <Text style={styles.link}>
          <Link href="/">Sign Up</Link>
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },

  inputPass: {
    width: "80%",
    height: 50,
    color: "#000",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 16,
  },

  logoContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },

  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
  },
  pass: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  passText: {
    fontSize: 18,
    color: "#FFA500",
    padding: 15,
    marginBottom: 30,
  },
  input: {
    width: "100%",
    height: 50,
    color: "#000",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 15,
    fontSize: 16,
  },
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#FFA500",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 20,
    fontSize: 14,
    color: "#555",
  },
  link: {
    color: "#FFA500",
  },
  errorText: {
    color: "red",
    fontSize: 12,
    marginBottom: 10,
  },
  cardImage: {
    height: 170,
    width: "48%",
    borderRadius: 30,
  },
});
