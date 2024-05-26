import { router } from 'expo-router';
import { Text, View, Image, TouchableOpacity, StyleSheet, TextInput } from 'react-native';

import { useSession } from '../utils/ctx';
import { setItem } from 'expo-secure-store';
import { login } from '@/utils/routes/login';
import { useState } from 'react';

const LogInButton = ({ username, password, router, invalidLogin }) => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={async () => {
            const response = await login(username, password);
            if (response == 400) {
                invalidLogin(true);
            } else {
                let userID = response.user_id;
                console.log(userID);
                setItem('user', userID);
                router.replace('/');
            }
        }}
      >
        <Text style={styles.text}>Log In</Text>
      </TouchableOpacity>
    );
};

const SignUpButton = ({ signUp, router }) => {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={() => {
            // signUp();
            router.replace('/accountcreation');
        }}
      >
        <Text style={styles.text}>Sign Up</Text>
      </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {
      backgroundColor: "#7A98C4",
      width: "80%",
      height: 40,
      alignItems: 'center',
      justifyContent: 'center', // This vertically centers the text
      borderRadius: 5,
      marginTop: 20,
    },
    text: {
      color: "#FFFFFF",
      textAlign: "center",
      // Adjust lineHeight if necessary; it should be close to the Button's height for vertical centering
      lineHeight: 30,
    },
    input: {
        height: 40,
        width: "80%",
        backgroundColor: "#EEEEEE",
        color: "#3C6198",
        margin: 12,
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
    },
  });

export default function SignIn() {
  const [username, setUsername] = useState("NULL");
  const [password, setPassword] = useState("NULL");
  const [invalidPassword, setInvalidPassword] = useState(false);

  const { signIn } = useSession();
  return (
    <View style={{
        backgroundColor: "#3C6198",
        height: "100%",
        width: "100%",
        paddingTop: 70,
        alignItems: "center"
    }}>
        <Image
            style={{
                width: "100%",
                height: "100%",
                maxHeight: 300,
                maxWidth: 250,
                marginLeft: 30,
                marginTop: 30,
                marginBottom: 20
            }}
            source={require('../assets/images/landing_logo.png')}
        />
        <TextInput 
            style={styles.input}
            placeholder="Username"
            returnKeyType="next"
            autoCorrect={false}
            onChangeText={setUsername}
            autoCapitalize='none'
            placeholderTextColor={"#7A98C4"}
        />
        <TextInput 
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#7A98C4"
            returnKeyType='go'
            secureTextEntry
            onChangeText={setPassword}
            autoCorrect={false}
        />
        {invalidPassword && (
            <Text>User Credentials Invalid</Text>
        )}
        <LogInButton router={router} username={username} password={password} invalidLogin={setInvalidPassword}/>
        <SignUpButton router={router} signUp={signIn}/>
    </View>
  );
}
