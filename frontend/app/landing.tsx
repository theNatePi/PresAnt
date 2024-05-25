import { router } from 'expo-router';
import { Text, View, Image } from 'react-native';

import { useSession } from '../utils/ctx';

export default function SignIn() {
  const { signIn } = useSession();
  return (
    <View style={{
        backgroundColor: "#3C6198",
        height: "100%",
        width: "100%",
        paddingTop: 70,
        paddingLeft: 20,
        alignItems: "center"
    }}>
        <Image
            style={{
                width: "100%",
                height: "100%",
                maxHeight: 300,
                maxWidth: 250,
                marginLeft: 20
            }}
            source={require('../assets/images/landing_logo.png')}
        />
        <Text
        onPress={() => {
            signIn();
            // Navigate after signing in. You may want to tweak this to ensure sign-in is
            // successful before navigating.
            router.replace('/');
        }}>
        Sign In
        </Text>
    </View>
  );
}
