import { useEffect } from 'react';
import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import Foundation from '@expo/vector-icons/Foundation';
import { TabBarIcon } from '@/components/navigation/TabBarIcon';


const TabsLayout = () => {
    return (
        <Tabs style={styles.tabs}>
            <Tabs.Screen
                name="attendants/index"
                options={{
                    headerShown: false,
                    title: "Updates",
                }}
                initialParams={{test: "test"}}
            />
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: "Home"
                }}
            />
            <Tabs.Screen
                name="friends/index"
                options={{
                    headerShown: false,
                    title: "Friends",
                }} />
        </Tabs>
    )
}

const styles = StyleSheet.create({
    tabs: {
      backgroundColor: '#3C6198',
    },
});

export default TabsLayout
