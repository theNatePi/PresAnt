import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import TabsLayout from './(tabs)/_layout';
import { Slot, Redirect, Stack } from 'expo-router';
import { SessionProvider } from '@/utils/ctx';
import { useSession } from '@/utils/ctx';
import { useStorageState, getStorageItemAsync, setStorageItemAsync } from '@/utils/useStorageState';

import { getItem } from 'expo-secure-store';

function LoadingScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
}

export default function Layout() {
    const [userID, setUserID] = useState("NONE");

    useEffect(() => {
        console.log("LOOP")
        let id = getItem('user');
        setUserID(id);
        console.log(userID);
    }, [])
    

    // if (isLoading) {
    //     return (<LoadingScreen />)
    // } else {
    //     // let [state, setState] = useStorageState('session');
    //     // let userID = state[1];
    // }

    if (userID == "NONE") {
        console.log("hiiiiii");
        console.log(userID);
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        return <Redirect href="/landing" />;
    }

    return (
        <Stack>
            <Stack.Screen
                name="(tabs)"
                options={{
                    headerShown: false
                }}
            />
        </Stack>
    );
}
