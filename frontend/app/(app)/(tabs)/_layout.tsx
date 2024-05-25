import { useEffect } from 'react';
import { Tabs } from 'expo-router'

const TabsLayout = () => {
    return (
        <Tabs>
            <Tabs.Screen
                name="attendants/index"
                options={{
                    headerShown: false,
                    title: "Tab 1 Title",
                }}
                initialParams={{test: "test"}}
            />
            <Tabs.Screen
                name="index"
                options={{
                    headerShown: false,
                    title: "Home Tab Title"
                }}
            />
            <Tabs.Screen
                name="friends/index"
                options={{
                    headerShown: false,
                    title: "Tab 2 Title"
                }} />
        </Tabs>
    )
}

export default TabsLayout
