import React, { useState, useRef } from "react";
import { 
  View, Text, Image, TouchableOpacity, 
  StyleSheet, ScrollView, Dimensions 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";

const screenWidth = Dimensions.get("window").width;

// Image and text data
const slides = [
  {
    image: require("@/assets/images/gojek1.jpg"),
    title: "Get going with us",
    subtitle: "Use GoCar to get across town – from anywhere, at any time.",
  },
  {
    image: require("@/assets/images/gojek2.jpg"),
    title: "Welcome to Gojek!",
    subtitle: "We're your go-to app for hassle-free commutes.",
  },
  {
    image: require("@/assets/images/gojek3.jpg"),
    title: "Rides for all",
    subtitle: "Up to three steps with every trip - perfect for travel with friends and family.",
  },
];

export default function HomeScreen() {
  const navigation = useNavigation();
  const scrollViewRef = useRef<ScrollView>(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
          <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <View style={styles.header}>
        <Image source={require("@/assets/images/Gojek_logo.png")} style={styles.logo} />
      </View>

      
      {/* Image Slider */}
      <Image source={slides[currentIndex].image} style={styles.image} />

      {/* Title and Subtitle */}
      <Text style={styles.title}>{slides[currentIndex].title}</Text>
      <Text style={styles.subtitle}>{slides[currentIndex].subtitle}</Text>

      {/* Dots Indicator */}
      <View style={styles.dots}>
        {slides.map((_, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.dot, currentIndex === index && styles.activeDot]}
            onPress={() => setCurrentIndex(index)}
          />
        ))}
      </View>

    </ScrollView>
      {/* Login Buttons */}
      <TouchableOpacity 
        style={styles.loginButton} 
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.loginText}>Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.signupButton}>
        <Text style={styles.signupText}>I'm new, sign me up</Text>
      </TouchableOpacity>

      {/* Terms */}
      <Text style={styles.terms}>
        By logging in or registering, you agree to our <Text style={styles.link}>Terms of service</Text> and <Text style={styles.link}>Privacy policy</Text>.
      </Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
    padding: 20,
    backgroundColor: "#fff",
  },

  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingVertical: 2,
    paddingLeft: 8,
  },

  logo: {
    width: 80,
    height: 30,
  },

  slide: {
    width: screenWidth,
    height: 500,
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },

  illustration: {
    width: "90%",
    height: 180,
    resizeMode: "contain",
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 10,
  },

  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
  },

  dotContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 50,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,
  },

  activeDot: {
    backgroundColor: "green",
  },

  loginButton: {
    width: "90%",
    height: 50,
    padding: 15,
    backgroundColor: "green",
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  loginText: {
    color: "white",
    fontSize: 13,
    fontWeight: "bold",
    textAlign: "center",
  },

  signupButton: {
    width: "90%",
    padding: 15,
    backgroundColor: "white",
    borderRadius: 50,
    borderWidth: 1,
    borderColor: "green",
    alignItems: "center",
    marginBottom: 20,
  },

  signupText: {
    color: "green",
    fontSize: 13,
    fontWeight: "bold",
  },

  terms: {
    fontSize: 12,
    color: "#777",
    textAlign: "center",
  },

  link: {
    color: "green",
  },
});