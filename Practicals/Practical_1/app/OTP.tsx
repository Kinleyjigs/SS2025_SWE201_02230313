import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, TextInput, StatusBar } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';

// Define the type for navigation props
type OTPVerificationProps = {
    route: RouteProp<{ params: { email: string } }, 'params'>;
};

export default function OTPVerification({ route }: OTPVerificationProps) {
    const navigation = useNavigation();
    const email = route?.params?.email || 'yonten@gmail.com'; // Email from params or default
    
    // State for OTP digits and timer
    const [otp, setOtp] = useState<string[]>(['', '', '', '']);
    const [timeLeft, setTimeLeft] = useState(10); // Timer set to 10 seconds
    const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null]);
    
    // Timer countdown effect
    useEffect(() => {
        if (timeLeft <= 0) {
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft(timeLeft - 1);
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft]);
    
    // Format time as MM:SS
    const formatTime = () => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    // Handle input change for each OTP field
    const handleOtpChange = (text: string, index: number) => {
        const newOtp = [...otp];
        newOtp[index] = text;
        setOtp(newOtp);
        
        // Auto-focus next input if text is entered
        if (text.length === 1 && index < 3) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            
            {/* Header with back button */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image 
                        source={require('@/assets/images/back.png')} 
                        style={styles.backIcon}
                    />
                </TouchableOpacity>
                <View style={styles.questionContainer}>
                    <TouchableOpacity>
                        <Image 
                            source={require('@/assets/images/help.png')} 
                            style={styles.questionIcon}
                        />
                    </TouchableOpacity>
                </View>
            </View>
            
            {/* Main content */}
            <View style={styles.content}>
                <Text style={styles.title}>Enter OTP sent via E-Mail</Text>
                <Text style={styles.subtitle}>We've sent OTP to {email}</Text>
                
                {/* OTP Input Fields */}
                <View style={styles.otpContainer}>
                    {otp.map((digit, index) => (
                        <View key={index} style={styles.otpInputContainer}>
                            <TextInput
                                ref={el => inputRefs.current[index] = el}
                                style={styles.otpInput}
                                value={digit}
                                onChangeText={(text) => handleOtpChange(text, index)}
                                maxLength={1}
                                keyboardType="numeric"
                                textAlign="center"
                                secureTextEntry
                            />
                        </View>
                    ))}
                    
                    {/* Timer */}
                    <View style={styles.timerContainer}>
                        <View style={styles.timerIcon}>
                            <Text style={styles.timerText}>{formatTime()}</Text>
                        </View>
                    </View>
                </View>
                
                {/* Try another method button */}
                <TouchableOpacity onPress={() => navigation.goBack()} style={styles.alternateMethodButton}>
                    <Text style={styles.alternateMethodText}>Try another method</Text>
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
        backgroundColor: '#ffffff',
    },
    header: {
        flexDirection: 'row',
        paddingTop: 40,
        paddingHorizontal: 16,
        alignItems: 'center',
    },
    backIcon: {
        width: 24,
        height: 24,
    },
    questionContainer: {
        flex: 1,
        alignItems: 'flex-end',
    },
    questionIcon: {
        width: 24,
        height: 24,
    },
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
    },
    title: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 14,
        color: '#666',
        marginBottom: 24,
        textAlign: 'center',
    },
    otpContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 24,
    },
    otpInputContainer: {
        marginRight: 8,
    },
    otpInput: {
        width: 40,
        height: 40,
        borderBottomWidth: 2,
        borderBottomColor: '#ccc',
        fontSize: 18,
    },
    timerContainer: {
        marginLeft: 'auto',
    },
    timerIcon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    timerText: {
        color: '#4CAF50',
        fontWeight: 'bold',
    },
    alternateMethodButton: {
        marginTop: 32,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 4,
        paddingVertical: 12,
        paddingHorizontal: 16,
        alignSelf: 'center',  // Updated this line to center the button
    },
    alternateMethodText: {
        fontSize: 14,
        color: '#000',
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
