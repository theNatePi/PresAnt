import { Text, View, StyleSheet, SafeAreaView, ScrollView, Image } from 'react-native'
import { useEffect } from 'react'
import React,{ FontAwesome } from '@expo/vector-icons';
import { useSession } from '@/utils/ctx';


const index = ({ test }: { test: string }) => {
  const { session, isLoading } = useSession();
  const msgs = [
    {message: "kylehyundai has class soon. Ping to make sure he goes!" },
    {message: "treestan is in ICS53 with you!"}
  ]
  const picture = [
    {pics: require("../../../../assets/images/kyle.png")},
    {pics: require("../../../../assets/images/trystan.png")}
  ]

  useEffect(() => {
      console.log(session);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.updatesContainer}>
            <Text style={styles.updatesHeading}>Antendee Updates</Text>
            {msgs.map((msg, index) => (
                <View key={index} style={styles.notificationContainer}>
                    <Image source={picture[index].pics} style={styles.profileImage} />
                    <Text style={styles.message}>{msg.message}</Text>
                    <FontAwesome name="bell" size={24} color="white" style={styles.bellIcon} />
                </View>
            ))}
        </ScrollView>
    </SafeAreaView>
);
};

const styles = StyleSheet.create({
  notificationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 10,
    backgroundColor: '#3C6198',
    borderRadius: 10,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
},
profileImage: {
    width: 45,
    height: 45,
    borderRadius: 45/2,
    marginRight: 15,
},
message: {
    flex: 1,
    fontSize: 13,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    textAlignVertical : 'center',
    color: 'white',
},
bellIcon: {
    marginLeft: 15,
},
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
