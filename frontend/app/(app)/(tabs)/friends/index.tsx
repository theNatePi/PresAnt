import { View, SafeAreaView, StyleSheet } from 'react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import LeaderBoardScreen from '../../../../pages/LeaderboardScreen.tsx'
import FriendsScreen from '../../../../pages/FriendsScreen.tsx'
import PendingRequestsScreen from '../../../../pages/PendingRequestsScreen.tsx'

const Tab = createMaterialTopTabNavigator();

function InnerTabs() {
    return (
        <SafeAreaView style={styles.container}>
            <Tab.Navigator screenOptions={{
                tabBarLabelStyle: { fontColor: 'white', fontSize: 12, fontFamily: 'Inter', fontWeight: 'bold' },
                tabBarStyle: { backgroundColor: '#3C6198' },
                tabBarIndicatorStyle: { backgroundColor: 'white'},
                tabBarActiveTintColor: 'white',
                tabBarInactiveTintColor: '#7189AC',
            }}>
                <Tab.Screen name="Leaderboard" component={LeaderBoardScreen} />
                <Tab.Screen name="Friends" component={FriendsScreen} />
                <Tab.Screen name="Requests" component={PendingRequestsScreen} />
            </Tab.Navigator>
        </SafeAreaView>
    );
  }

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3C6198',
    },
    tabContainer: {
        flex: 1,
        backgroundColor: '#3C6198'
      },
});

export default InnerTabs;
