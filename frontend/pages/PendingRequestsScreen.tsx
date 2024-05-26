import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';


const PendingRequestsScreen = () => {
  const pendingRequests =[
    {id: 1, username: "Olivia Rodrigo"},
    {id: 2, username: "Taylor Swift"},
    {id: 3, username: "Patricia Anteater"},
    {id:4, username: "Wonder Woman"},
    {id: 5, username: "Supergirl"},
    {id: 6, username: "Marie Curie"},
    {id: 7, username: "Hilary Clinton"},
    {id:8, username:"Chaewon"},
  ]
    return (
      <View style={styles.container}>
        <ScrollView style = {styles.pendingListContainer}>
          <Text style = {styles.pendingListHeading}>Pending Friend Requests</Text>
          {pendingRequests.map(request => (
                    <View key={request.id} style={styles.pendingRequestItem}>
                        <Image source={require('../assets/images/PresAnt_logo.png')} style={styles.profileImage} />
                        <Text style={styles.pendingTextDefault}>{request.username}</Text>
                        <View style={styles.actionIcons}>
                            <TouchableOpacity onPress={() => console.log('Accepted', request.id)}>
                                <FontAwesome name="check" size={24} color="white" style={styles.acceptIcon} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => console.log('Rejected', request.id)} style={styles.rejectIcon}>
                                <FontAwesome name="times" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                    </View>
                ))}
        </ScrollView>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7A98C4',
  },
  pendingListContainer: {
    flex: 1,
    backgroundColor: '#3C6198',
    margin: 25,
    borderRadius: 20,
  },
  pendingListHeading: {
    fontSize: 18,
    fontFamily: 'Inter',
    color: 'white',
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 20,
  },
  pendingTextDefault: {
    fontSize: 16,
    fontFamily: 'Inter',
    fontWeight: 'bold',
    color: 'white',
    marginTop: 15
    ,
    marginLeft: 5,
  },
  profileImage: {
    height: 75,
    width: 75,
    marginRight: 10,
},
username: {
    fontSize: 18,
},
pendingRequestItem: {
  flexDirection: 'row',
  alignItems: 'center',
  marginBottom: 20,
},    
actionIcons: {
  flexDirection: 'row',
  alignItems: 'center',
},
rejectIcon: {
  marginLeft: 20,
},
acceptIcon:{
  marginLeft: 15
}
});

export default PendingRequestsScreen;
