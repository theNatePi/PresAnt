import { SearchBarDefault } from '@rneui/base/dist/SearchBar/SearchBar-default';
import { Text, View, StyleSheet, ScrollView, Image } from 'react-native'
import { SearchBar } from 'react-native-screens';
import { Card } from '@rneui/base';



const friendsList = [
  { id: 1, username: 'kylehyundai', icon: require('../assets/images/kyle.png') },
  { id: 2, username: 'natebutwishitwasluca', icon: require('../assets/images/nate.jpeg') },
  { id: 3, username: 'priskalicious', icon: require('../assets/images/priska.png') },
  { id: 4, username: 'treestan', icon: require('../assets/images/trystan.png') },
  { id: 5, username: 'bowenchungus', icon: require('../assets/images/bowen.png') },
  { id: 6, username: 'gaya3', icon: require('../assets/images/gaya3.jpeg') },
  { id: 7, username: 'jojosiwa', icon: require('../assets/images/cursed.png') },
  { id: 8, username: 'dangnabbits', icon: require('../assets/images/dang.jpg') },
  { id: 9, username: 'bowenchungus', icon: require('../assets/images/bowen.png') },
];

const FriendsScreen = () => {

  const FriendCard = ({ id, name, icon }: { id: number, name: string, icon: string }) => (
    <Card containerStyle={styles.card}>
      <View style={styles.cardContent}>
        <Image style={styles.friendImage} source={icon} />
        <Text style={styles.cardUsername}>{name}</Text>
      </View>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style = {styles.searchBar}>
        <Text style = {styles.SearchBarText}>Search for your friends...</Text>
      </View>
      <ScrollView style = {styles.friendsListContainer}>
        <Text style = {styles.friendsListHeading}>Your Friends</Text>
        {friendsList.map(friend => (
          <FriendCard key={friend.id} id={friend.id} name={friend.username} icon={friend.icon} />
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
    card: {
      backgroundColor: '#3C6198',
      borderWidth: 0,
      marginLeft: 20,
      marginRight: 20,
      borderColor: '#3C6198',
      height: 70,
    },
    friendImage: {
      height: 40,
      width: 40,
      borderRadius: 40 / 2,
      marginLeft: 3,
    },
    cardContent: {
      backgroundColor: '#3C6198',
      borderWidth: 0,
      flexDirection: 'row',
    },
    cardUsername: {
      fontFamily: 'Inter',
      fontSize: 13,
      color: 'white',
      fontWeight: 'bold',
      marginLeft: 15,
      marginTop: 10,
    },
    searchBar: {
      margin: 25,
      marginBottom: 0,
      backgroundColor: '#3C6198',
      borderRadius: 10,
    },
    SearchBarText: {
      marginLeft: 10,
      marginTop: 7,
      marginBottom: 7,
      fontSize: 12,
      color: '#7189AC',
      fontFamily: 'Inter',
    },
    friendsListContainer: {
      flex: 1,
      backgroundColor: '#3C6198',
      margin: 25,
      marginTop: 15,
      borderRadius: 20,
    },
    friendsListHeading: {
      fontSize: 18,
      fontFamily: 'Inter',
      color: 'white',
      fontWeight: 'bold',
      marginTop: 20,
      marginLeft: 20,
      marginBottom: 10,
    },
  });

export default FriendsScreen;
