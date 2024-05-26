import { Text, View, StyleSheet, SafeAreaView, ScrollView } from 'react-native'
import { useEffect } from 'react'
import { useSession } from '@/utils/ctx';

const index = ({ test }: { test: string }) => {
    const { session, isLoading } = useSession();

    useEffect(() => {
        console.log(session);
      }, []);

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView style={styles.updatesContainer}>
            <Text style={styles.updatesHeading}>Antendee Updates</Text>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#7A98C4',
    },
    updatesContainer: {
      flex: 1,
      backgroundColor: '#3C6198',
      margin: 25,
      borderRadius: 20,
    },
    updatesHeading: {
      fontSize: 18,
      fontFamily: 'Inter',
      color: 'white',
      fontWeight: 'bold',
      marginTop: 20,
      marginLeft: 20,
    },
  });

export default index
