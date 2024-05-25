import { View, Text, Pressable } from "react-native"
import { Link, router } from 'expo-router'
import { useSession } from '../../../utils/ctx'

const HomePage = () => {
    const { signOut } = useSession();

    return (
        <View style={{paddingTop: 70}}>
            <Text>Home</Text>
            <Text
                onPress={() => {
                // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
                signOut();
                }}>
                Sign Out
            </Text>
        </View>
    )
}

export default HomePage
