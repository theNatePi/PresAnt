import { View, Text, Pressable, StyleSheet, Image, TouchableOpacity } from "react-native"
import { Link, router, Redirect } from 'expo-router'
import { useSession } from '../../../utils/ctx'
import MapView, { Marker } from "react-native-maps";
import React, {useState} from 'react';
import { getItem, setItem } from "expo-secure-store";

const HomePage = () => {
    const signOut = () => {
        let id = getItem('user');
        console.log(id);
        setItem('user', "NONE");
        router.replace('/landing');
    }

    const customMarkerImage = require('../../../assets/images/PresAnt_logo.png');
    const Region = {
        latitude: 33.646192, // Example latitude
        longitude: -117.842735, // Example longitude
        latitudeDelta: 0.0075, // Delta values determine the zoom level
        longitudeDelta: 0.0075,
    };
    const markerCoordinates = [
        { latitude: 33.647037, longitude: -117.8447 }, // Example marker coordinates
        { latitude: 33.644473, longitude: -117.8428 },
        { latitude: 33.645584, longitude: -117.8446 },
        { latitude: 33.644495, longitude: -117.8406 },
    ]
    const userNames = [
        {username: "kylehyundai"},
        {username: "natebutwishitwasluca"},
        {username:"priskalicious"},
        {username: "treestan"},
    ]

    return (
        <View style = {styles.container}>
        <MapView style = {styles.map}
                initialRegion={Region} >
                {markerCoordinates.map((coordinate, index) => (
                    <Marker
                        key={index}
                        coordinate={coordinate}
                        title={`${userNames[index].username}`} // Marker title (optional)
                        >
                           <Image source={require('../../../assets/images/PresAnt_logo.png')} style={{height: 100, width:100 }} /> 
                        </Marker>
                ))}

                    </MapView>
                    <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
                        <Text style={styles.signOutText}>Sign Out</Text>
                    </TouchableOpacity>
    </View>

    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      width: '100%',
      height: '100%',
    },
    signOutButton: {
        position: 'absolute',
        top: 50,
        right: 20,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    signOutText: {
        color: 'white',
        fontWeight: 'bold',
    }
  });

export default HomePage

