import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { Card } from '@rneui/themed';


const LeaderboardScreen = () => {
    return (
      <View style={styles.container}>
        <Text style={styles.heading}>Top Antendees</Text>
        <View style={styles.rankings}>
          <View style = {styles.secondPlaceContainer}>
            <Text style = {styles.secondPlaceText}>2nd</Text>
            <View style = {styles.secondPlaceCircle} />
          </View> 
          <View style = {styles.firstPlaceContainer}>
            <Text style = {styles.firstPlaceText}>1st</Text>
            <View style={styles.firstPlaceCircle} />
          </View>
          <View style = {styles.thirdPlaceContainer}>
            <Text style = {styles.thirdPlaceText}>3rd</Text>
            <View style = {styles.thirdPlaceCircle} />
          </View>
        </View>
        <View style={styles.rankingContainer}>
          <ScrollView style = {styles.allRankings}>
            <Text style = {styles.rankingHeading}>Antendee Rankings</Text>
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
