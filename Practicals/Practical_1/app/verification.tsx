// Verification.tsx
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Verification() {
    const navigation = useNavigation();

    // Function to navigate to OTPVerification screen
    const handleOTPSelection = (method) => {
        console.log(`Navigating to OTP with method: ${method}`); // Add this line for debugging
        navigation.navigate('OTP', { method });
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Image source={require('@/assets/images/back.png')} style={styles.backButtonImage} />
            </TouchableOpacity>

            <Text style={styles.title}>Choose Verification Method</Text>

            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.button} onPress={() => handleOTPSelection('Email')}>
                    <Image source={require('@/assets/images/email.png')} style={styles.OTPimages} />
                    <Text style={styles.buttonText}>OTP via Email</Text>
                    <Image source={require('@/assets/images/right.png')} style={styles.rightButton} />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} onPress={() => handleOTPSelection('WhatsApp')}>
                    <Image source={require('@/assets/images/whatsapp.png')} style={styles.OTPimages} />
                    <Text style={styles.buttonText}>OTP via WhatsApp</Text>
                    <Image source={require('@/assets/images/right.png')} style={styles.rightButton} />
                </TouchableOpacity>
                
                <TouchableOpacity style={styles.button} onPress={() => handleOTPSelection('SMS')}>
                    <Image source={require('@/assets/images/sms.png')} style={styles.OTPimages} />
                    <Text style={styles.buttonText}>OTP via SMS</Text>
                    <Image source={require('@/assets/images/right.png')} style={styles.rightButton} />
                </TouchableOpacity>
            </View>

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
        justifyContent: 'center', 
        alignItems: 'center', 
        backgroundColor: 'white' 
    },
    title: { 
        fontSize: 24, 
        fontWeight: 'bold',
        marginBottom: 20
    },
    backButton: { 
        position: 'absolute', 
        top: 40,  
        left: 20,  
        zIndex: 10 
    },
    backButtonImage: { 
        width: 24, 
        height: 24, 
        resizeMode: 'contain' 
    },
    buttonContainer: { 
        width: '80%', 
        alignItems: 'center', 
        marginTop: 20 
    },
    button: { 
        width: '100%', 
        backgroundColor: 'white', 
        padding: 15, 
        borderRadius: 8, 
        flexDirection: 'row', 
        alignItems: 'center', 
        justifyContent: 'space-between',  
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#ccc'
    },
    buttonText: { 
        color: 'black', 
        fontSize: 16, 
        fontWeight: 'bold',
        flex: 1, 
        textAlign: 'center' 
    },
    OTPimages: {
        width: 24,
        height: 24, 
        resizeMode: 'contain',
        marginRight: 10  
    },
    rightButton: {
        width: 24,
        height: 24, 
        resizeMode: 'contain',
        marginLeft: 10  
    },

    footer: {
        position: 'absolute',
        bottom: 24,
        left: 0,
        right: 0,
        alignItems: 'center',
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
