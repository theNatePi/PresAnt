import { Text, View, StyleSheet, ScrollView } from 'react-native'
import { SearchBar } from 'react-native-screens';

const FriendsScreen = () => {
  // const [search, setSearch] = useState<string>('');

  // const updateSearch = (text: string) => {
  //   setSearch(text);
  //   // Perform search operation using the updated search query
  //   console.log('Search Query:', text);
  // };

//   <SearchBar
//   placeholder="Search for friends..."
//   // onChangeText={this.updateSearch}
//   // value={search} **NOT FUNCTIONAL CURRENTLY
// />

  return (
    <View style={styles.container}>
      <ScrollView style = {styles.friendsListContainer}>
        <Text style = {styles.friendsListHeading}>Your Friends</Text>
      </ScrollView>

    </View>
    );
  };

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#7A98C4',
    },
    friendsListContainer: {
      flex: 1,
      backgroundColor: '#3C6198',
      margin: 25,
      marginTop: 65,
      borderRadius: 20,
    },
    friendsListHeading: {
      fontSize: 18,
      fontFamily: 'Inter',
      color: 'white',
      fontWeight: 'bold',
      marginTop: 20,
      marginLeft: 20,
    },
  });

export default FriendsScreen;
