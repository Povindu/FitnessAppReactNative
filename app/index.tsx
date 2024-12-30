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

export default function Index() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const router = useRouter();

  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
  }>({});

  const { setUserEmail, setUserPassword, setuserName } =
    useContext(ClickCountContext);

  const handleSignUp = () => {
    setuserName(name);
    let validity = true;
    const newErrors: any = {};

    if (!name) {
      newErrors.name = "Name is required";
      validity = false;
    }

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
    } else if (password !== confirmPassword) {
      newErrors.password = "Passwords do not match";
      validity = false;
      return;
    }

    setErrors(newErrors);

    if (validity) {
      setUserEmail(email);
      setUserPassword(password);
      router.push("/login");
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const toggleShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mainLogoContainer}>
        <Image
          source={require("../assets/images/logo2.png")}
          style={styles.cardImage}
        />
      </View>
      <Text style={styles.title}>SportsCorner</Text>
      <TextInput
        placeholderTextColor="#000"
        placeholder="Enter Name"
        style={styles.input}
        value={name}
        onChangeText={setName}
      />
      {errors.name && <Text style={styles.errorText}>{errors.name}</Text>}
      <TextInput
        placeholderTextColor="#000"
        placeholder="Enter Email"
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

      <View style={styles.pass}>
        <TextInput
          placeholderTextColor="#000"
          placeholder="Confirm Password"
          style={styles.inputPass}
          {...(showConfirmPassword
            ? { secureTextEntry: false }
            : { secureTextEntry: true })}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <Pressable onPress={toggleShowConfirmPassword}>
          <Text style={styles.passText}>Show</Text>
        </Pressable>
      </View>
      {errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
      )}

      <TouchableOpacity style={styles.button} onPress={handleSignUp}>
        <Text style={styles.buttonText}>Sign Up</Text>
      </TouchableOpacity>

      <Text style={styles.footerText}>
        Already have an account?{" "}
        <Text style={styles.link}>
          <Link href="/login">Login</Link>
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
    backgroundColor: "#fff",
    padding: 20,
  },
  mainLogoContainer: {
    flexDirection: "row",
    marginBottom: 30,
  },
  pass: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  logoBox: {
    width: 40,
    height: 40,
    backgroundColor: "#FFD700", 
    margin: 5,
    borderRadius: 5,
  },
  passText: {
    fontSize: 18,
    color: "#FFA500",
    padding: 15,
    marginBottom: 30,
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
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
  button: {
    width: "80%",
    height: 50,
    backgroundColor: "#FFA500",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginTop: 5,
  },
  cardImage: {
    height: 170,
    width: "48%",
    borderRadius: 30,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerText: {
    marginTop: 10,
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
});
