import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Image } from 'react-native';
import CountryPicker from 'react-native-country-picker-modal';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const [countryCode, setCountryCode] = useState('BT');
  const [callingCode, setCallingCode] = useState('975');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigation = useNavigation();

  const handleContinue = () => {
    navigation.navigate("verification");
  };

  // Check if the phone number is at least 4 digits
  const isPhoneNumberValid = phoneNumber.length >= 4;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Image source={require('@/assets/images/back.png')} style={styles.backButtonImage} />
      </TouchableOpacity>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.formContainer}>
        <Text style={styles.title}>Welcome to Gojek!</Text>
        <Text style={styles.subtitle}>Enter or create an account in a few easy steps.</Text>

        <Text style={styles.label}>Phone number*</Text>

        <View style={styles.inputContainer}>
          <TouchableOpacity style={styles.countryPickerButton} onPress={() => {}}>
            <Text>+{callingCode}</Text>
          </TouchableOpacity>

          <CountryPicker
            countryCode={countryCode as CountryCode}
            countryCode={countryCode}
            withCallingCode
            withFlag
            withFilter
            withModal
            onSelect={(country) => {
              setCountryCode(country.cca2);
              setCallingCode(country.callingCode[0]);
            }}
          />
          
          <TextInput
            style={styles.input}
            placeholder="Enter phone number"
            keyboardType="numeric"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
        </View>

        {/* Continue Button */}
        <TouchableOpacity 
          style={[styles.continueButton, !isPhoneNumberValid && styles.disabledButton]} 
          onPress={handleContinue}
          disabled={!isPhoneNumberValid}
        >
          <Text style={styles.continueButtonText}>Continue</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>from</Text>
        <Image 
          source={require('@/assets/images/goto_logo.png')} 
          style={styles.logoImage}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    backgroundColor: 'white' 
  },

  formContainer: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
    width: '100%',
  },

  backButton: { 
    position: 'absolute', 
    top: 20,  
    left: 20,  
    zIndex: 10 
  },

  backButtonImage: { 
    width: 24, 
    height: 24, 
    resizeMode: 'contain' 
  },

  title: { 
    fontSize: 24, 
    fontWeight: 'bold', 
    marginTop: 50 
  },

  subtitle: { 
    fontSize: 14, 
    color: 'gray', 
    marginBottom: 20 
  },

  label: { 
    fontSize: 14, 
    fontWeight: 'bold', 
    marginBottom: 5 
  },

  inputContainer: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    borderWidth: 1, 
    borderColor: '#ccc', 
    borderRadius: 10, 
    paddingHorizontal: 10, 
    height: 50 
  },

  countryPickerButton: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    marginRight: 10, 
    paddingRight: 10, 
    borderRightWidth: 1, 
    borderRightColor: '#ccc' 
  },

  input: { 
    flex: 1, 
    fontSize: 16 
  },

  continueButton: { 
    backgroundColor: '#00AA13', 
    padding: 15, 
    borderRadius: 50, 
    alignItems: 'center', 
    marginTop: 20, 
    height: 50, 
    justifyContent: 'center' 
  },

  continueButtonText: { 
    color: 'white', 
    fontSize: 16, 
    fontWeight: 'bold' 
  },

  disabledButton: { 
    backgroundColor: '#ccc' 
  }, 

  footer: {
    alignItems: 'center',
    marginBottom: 24,
  },

  footerText: {
    fontSize: 15,
    color: '#666',
    marginBottom: 4,
},
  logoImage: {
    height: 40,
    width: 40,
    resizeMode: 'contain',
},
});
