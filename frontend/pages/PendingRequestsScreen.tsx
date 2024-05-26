import { View, Text, Image, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import React from 'react';
import { Card } from '@rneui/themed';


const PendingRequestsScreen = () => {
  const pendingRequests =[
    {id: 1, username: "Olivia Rodrigo", pic: require('../assets/images/PresAnt_logo.png')},
    {id: 2, username: "Taylor Swift", pic: require('../assets/images/PresAnt_logo.png')},
    {id: 3, username: "Patricia Anteater", pic: require('../assets/images/PresAnt_logo.png')},
    {id:4, username: "Wonder Woman", pic: require('../assets/images/PresAnt_logo.png')},
    {id: 5, username: "Supergirl", pic: require('../assets/images/PresAnt_logo.png')},
    {id: 6, username: "Marie Curie", pic: require('../assets/images/PresAnt_logo.png')},
    {id: 7, username: "Hilary Clinton", pic: require('../assets/images/PresAnt_logo.png')},
    {id:8, username:"Chaewon", pic: require('../assets/images/PresAnt_logo.png')},
  ]
    return (
      <View style={styles.container}>
        <ScrollView style = {styles.pendingListContainer}>
          <Text style = {styles.pendingListHeading}>Pending Friend Requests</Text>
          {pendingRequests.map(request => (
                    <View key={request.id} style={styles.pendingRequestItemContainer}>
                    <View style={styles.pendingRequestItem}>
                      <Image source={request.pic} style={styles.profileImage} />
                      <Text style={styles.pendingTextDefault}>{request.username}</Text>
                    </View>
                    <View style={styles.actionIcons}>
                      <TouchableOpacity onPress={() => console.log('Accepted', request.id)}>
                        <FontAwesome name="check" size={15} color="white" style={styles.acceptIcon} />
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => console.log('Rejected', request.id)} style={styles.rejectIcon}>
                        <FontAwesome name="times" size={15} color="white" />
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
  pendingRequestItemContainer: {

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
    marginTop: 15,
    marginLeft: 5,
  },
  profileImage: {
    height: 50,
    width: 50,
    borderRadius: 25,
    marginLeft: 25,
},
username: {
    marginLeft: 5,
    fontSize: 13,
},
pendingRequestItem: {
  flexDirection: 'row',
  alignItems: 'center',
  marginTop: 10,
},    
actionIcons: {
  marginLeft: 15,
  marginBottom: 20,
  flexDirection: 'row',
  justifyContent: "flex-end",
},
rejectIcon: {
  marginLeft: 15,
  marginRight: 20,
},
acceptIcon:{
  marginLeft: 10,
}
});

export default PendingRequestsScreen;
