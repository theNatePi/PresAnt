import { Text, View, StyleSheet, ScrollView } from 'react-native'

const PendingRequestsScreen = () => {
    return (
      <View style={styles.container}>
        <ScrollView style = {styles.pendingListContainer}>
          <Text style = {styles.pendingListHeading}>Pending Friend Requests</Text>
          <Text style = {styles.pendingTextDefault}>No pending friend requests at the moment...</Text>
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
    fontSize: 14,
    fontFamily: 'Inter',
    color: '#7189AC',
    marginTop: 15
    ,
    marginLeft: 20,
  }
});

export default PendingRequestsScreen;
