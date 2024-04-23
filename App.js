import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import * as Location from 'expo-location';

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    let intervalId;

    (async () => {
      const locationSubscription = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          // Remove timeInterval from here
        },
        (location) => {
          setLocation(location);
          console.log(
            'New location update: ' +
              location.coords.latitude +
              ', ' +
              location.coords.longitude
          );
        }
      );

      // Set interval to request location updates every 500 milliseconds
      intervalId = setInterval(async () => {
        const updatedLocation = await Location.getCurrentPositionAsync({});
        setLocation(updatedLocation);
        console.log(
          'New location update: ' +
            updatedLocation.coords.latitude +
            ', ' +
            updatedLocation.coords.longitude
        );
      }, 500);
    })();

    return () => {
      clearInterval(intervalId); // Clear the interval on unmount
      locationSubscription.remove();
    };
  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Hi</Text>
      <Text>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  paragraph: {
    fontSize: 18,
    textAlign: 'center',
  },
});