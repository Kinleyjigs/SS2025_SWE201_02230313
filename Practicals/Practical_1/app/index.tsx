import React, { useState, useRef } from "react";
import { 
  View, Text, Image, TouchableOpacity, 
  StyleSheet, ScrollView, Dimensions 
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";

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
  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Logo */}
        <View style={styles.header}>
          <Image source={require("@/assets/images/Gojek_logo.png")} style={styles.logo} />
        </View>

        {/* Image Slider */}
        <View style={styles.imageContainer}>
          <Image source={slides[currentIndex].image} style={styles.image} resizeMode="contain" />
        </View>

        {/* Title and Subtitle */}
        <View style={styles.textContainer}>
          <Text style={styles.title}>{slides[currentIndex].title}</Text>
          <Text style={styles.subtitle}>{slides[currentIndex].subtitle}</Text>
        </View>

        {/* Dots Indicator - Now Horizontal */}
        <View style={styles.dotsContainer}>
          {slides.map((_, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.dot, currentIndex === index && styles.activeDot]}
              onPress={() => setCurrentIndex(index)}
            />
          ))}
        </View>
      </ScrollView>

      {/* Bottom Buttons Section */}
      <View style={styles.bottomContainer}>
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
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  scrollContent: {
    flexGrow: 1,
    alignItems: "center",
    padding: 20,
    paddingBottom: 30,
  },

  header: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingVertical: 10,
    paddingLeft: 8,
  },

  logo: {
    width: 80,
    height: 40,
    resizeMode: "contain",
  },

  imageContainer: {
    width: "100%",
    height: 220,
    marginVertical: 20,
    justifyContent: "center",
    alignItems: "center",
  },

  image: {
    width: "100%",
    height: "100%",
  },

  textContainer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 16,
    color: "#555",
    textAlign: "center",
    paddingHorizontal: 20,
    lineHeight: 22,
  },

  dotsContainer: {
    flexDirection: "row",   // This makes the dots horizontal
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#ccc",
    marginHorizontal: 5,   // Horizontal spacing between dots
  },

  activeDot: {
    backgroundColor: "#00AA13",  // Gojek green color
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  bottomContainer: {
    padding: 20,
    paddingBottom: 30,
    borderTopWidth: 1,
    borderTopColor: "#f0f0f0",
    alignItems: "center",
  },

  loginButton: {
    width: "100%",
    height: 50,
    backgroundColor: "#00AA13",  // Gojek green
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 15,
    elevation: 2,
  },

  loginText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  signupButton: {
    width: "100%",
    height: 50,
    backgroundColor: "white",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#00AA13",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },

  signupText: {
    color: "#00AA13",
    fontSize: 16,
    fontWeight: "bold",
  },

  terms: {
    fontSize: 12,
    color: "#777",
    textAlign: "center",
    lineHeight: 18,
    paddingHorizontal: 20,
  },

  link: {
    color: "#00AA13",
    fontWeight: "500",
  },
});