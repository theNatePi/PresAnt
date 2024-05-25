import { Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { storeAuthToken, retrieveAuthToken } from '../../utils/auth';
import TabsLayout from './(tabs)/_layout';
import { Slot, Redirect, Stack } from 'expo-router';
import { SessionProvider } from '@/utils/ctx';
import { useSession } from '@/utils/ctx';

function LoadingScreen() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Loading...</Text>
      </View>
    );
}

export default function Layout() {
    const { session, isLoading } = useSession();

    if (isLoading) {
        return (<LoadingScreen />)
    }

    if (!session) {
        // On web, static rendering will stop here as the user is not authenticated
        // in the headless Node process that the pages are rendered in.
        return <Redirect href="/sign-in" />;
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
