import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, SafeAreaView } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons'
import { useState } from "react";

import styles from "./style";
import { COLORS, FONT } from "../../constants";
import { useRouter } from "expo-router";

const dataInput = [
    {
        key: 'email',
        title: 'Enter your email',
        icon: 'mail-outline',
        isPassword: false
    },
    {
        key: 'password',
        title: 'Enter your password',
        icon: 'lock-closed-outline',
        isPassword: true
    }
]

const dataLogo = [
    {
        name: 'Facebook',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png',
    },
    {
        name: 'Google',
        image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/800px-Google_%22G%22_Logo.svg.png',
    },
    {
        name: 'Apple',
        image: 'https://pngfre.com/wp-content/uploads/apple-logo-6-1024x1024.png',
    }
]

const Login = () => {

    const [hide, setHide] = useState(false)

    const router = useRouter()

    return (
        <SafeAreaView style={{backgroundColor: COLORS.white, flex: 1}}>
            <View style={styles.container}>
            <Text style={styles.headerText}>Login</Text>
            {dataInput.map(item => (
                <View style={styles.textInputContainer} key={item.key}>
                    <Ionicons style={styles.textInputIcon} name={item.icon} size={25} />
                    <TextInput 
                        style={styles.textInput}
                        placeholder={item.title}
                        value=""
                        onChangeText={() => {}}
                        secureTextEntry={item.key === 'password'}
                    />
                    {item.isPassword && <Ionicons size={25} style={{position: 'absolute', top: 20, right: 15, opacity: 0.2}} onPress={() => setHide(!hide)} name={hide ? 'eye-outline' : 'eye-off-outline'} />}
                </View>
            ))}
            <View style={styles.fotgetContainer}><Text style={styles.forgetText}>Forget password?</Text></View>
            <TouchableOpacity onPress={() => router.push('/home')} style={styles.buttonContainer}><Text style={styles.buttonText}>Login</Text></TouchableOpacity>
            <View style={styles.orLoginContainer}>
                <View style={styles.line}></View>
                <Text style={styles.orLoginText}>Or login by</Text>
            </View>
            <View style={styles.logoContainer}>
                {dataLogo.map(item => (
                    <TouchableOpacity style={styles.logoItem} key={item.name}>
                        <Image source={{uri: item.image}} height={40} width={40} resizeMode="contain" />
                    </TouchableOpacity>
                ))}
            </View>
            <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 25}}>
                <Text style={{fontFamily: FONT.medium, marginRight: 5}}>Don't you have accont yet?</Text>
                <Text style={{fontFamily: FONT.medium,color: COLORS.tertiary}} onPress={() => {}}>Sign up now</Text>
            </View>
            </View>
        </SafeAreaView>
    )
}

export default Login