import { Text, View, StyleSheet, ScrollView, Image, ProgressViewIOS } from 'react-native'
import { Card } from '@rneui/themed';

const friendsList = [
  { id: 1, username: 'treestan', icon: require('../assets/images/trystan.png'), score: 50 },
  { id: 2, username: 'kylehundai', icon: require('../assets/images/kyle.png'), score: 20 },
  { id: 3, username: 'bowenchungus', icon: require('../assets/images/bowen.png'), score: 0.7 },
  { id: 4, username: 'dangnabbits', icon: require('../assets/images/dang.jpg'), score: 0.6 },
  { id: 5, username: 'priskalicious', icon: require('../assets/images/priska.png'), score: 0.5 },
  { id: 6, username: 'natebutwishitwasluca', icon: require('../assets/images/nate.jpeg'), score: 0.4 },
  { id: 7, username: 'jojosiwa', icon: require('../assets/images/cursed.png'), score: 0.3},
  { id: 8, username: 'gaya3', icon: require('../assets/images/gaya3.jpeg'), score: 0.3},
];

const LeaderboardScreen = () => {
  const FriendCard = ({ id, name, icon, score }: { id: number, name: string, icon: string, score: number }) => (
    <Card containerStyle={styles.card}>
      <View style={styles.cardContent}>
        <Image style={styles.friendImage} source={icon} />
        <View style={styles.friendInfoContainer}>
          <Text style={styles.cardUsername}>{name}</Text>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}/>
          </View>
        </View>
      </View>
    </Card>
  );
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Top Antendees</Text>
        <View style={styles.rankings}>
          <View style = {styles.secondPlaceContainer}>
            <Text style = {styles.secondPlaceText}>2nd</Text>
            <Image style = {styles.secondPlaceCircle} source={require('../assets/images/kyle.png')}/>
          </View> 
          <View style = {styles.firstPlaceContainer}>
            <Text style = {styles.firstPlaceText}>1st</Text>
            <Image style={styles.firstPlaceCircle} source={require('../assets/images/trystan.png')}/>
          </View>
          <View style = {styles.thirdPlaceContainer}>
            <Text style = {styles.thirdPlaceText}>3rd</Text>
            <Image style = {styles.thirdPlaceCircle} source={require('../assets/images/bowen.png')}/>
          </View>
        </View>
        <View style={styles.rankingContainer}>
          <ScrollView style = {styles.allRankings}>
            <Text style = {styles.rankingHeading}>Antendee Rankings</Text>
            {friendsList.map(friend => (
              <FriendCard key={friend.id} id={friend.id} name={friend.username} icon={friend.icon} />
            ))}
          </ScrollView>
        </View>
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
      marginLeft: 10,
      marginRight: 10,
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
      marginTop: 10,
    },
    friendInfoContainer: {
      marginLeft: 15,
      flexDirection: 'column'
    },
    progressBarContainer: {
      position: 'relative',
      backgroundColor: '#D9D9D9',
      height: 4,
      borderRadius: 4,
      marginTop: 5,
      width: 200,
      flexDirection: 'row',
    },
    progressBar: {
      position: 'absolute',
      backgroundColor: '#85B9D6',
      height: 4,
      width: 100,
    },
    rankingContainer: {
      flexDirection: 'column',
      flex: 1,
      margin: 25,
      backgroundColor: '#3C6198',
      borderRadius: 20,
    },
    allRankings: {
      flex: 1,
      margin: 10,
    },
    rankingHeading: {
      fontSize: 18,
      fontFamily: 'Inter',
      color: 'white',
      fontWeight: 'bold',
      marginTop: 10,
      textAlign: 'center'
    },
    heading: {
      fontSize: 22,
      fontFamily: 'Inter',
      color: 'white',
      fontWeight: 'bold',
      marginTop: 25,
      textAlign: 'center'
    },
    rankings: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginLeft: 30,
      marginRight: 30,
    },
    firstPlaceContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 25
    },
    firstPlaceText: {
      fontSize: 15,
      fontFamily: 'Inter',
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    firstPlaceCircle: {
      width: 100,
      height: 100,
      borderRadius: 100 / 2,
      marginTop: 5,
      backgroundColor: "#3C6198", // Should be the avatar of the person
    },
    secondPlaceContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 25
    },
    secondPlaceText: {
      fontSize: 12,
      fontFamily: 'Inter',
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    secondPlaceCircle: {
      width: 80,
      height: 80,
      borderRadius: 80 / 2,
      marginTop: 5,
      backgroundColor: "#3C6198", // Should be the avatar of the person
    },
    thirdPlaceContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 25
    },
    thirdPlaceText: {
      fontSize: 10,
      fontFamily: 'Inter',
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    thirdPlaceCircle: {
      width: 65,
      height: 65,
      borderRadius: 65 / 2,
      marginTop: 5,
      backgroundColor: "#3C6198", // Should be the avatar of the person
    },
});

export default LeaderboardScreen;
