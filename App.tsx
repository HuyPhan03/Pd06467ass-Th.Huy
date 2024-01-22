import React from 'react';
import { Text, StyleSheet, View } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import LoginScreen from './src/screens/LoginScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import HomeScreen from './src/screens/HomeScreen'
import { initDatabase } from './src/assets/db/initDB';
const Stack = createNativeStackNavigator();

const App = () => {
  initDatabase();
  return(
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignupScreen">
        <Stack.Screen name="LoginScreen" component={LoginScreen} options={{headerShown: false}} />
        <Stack.Screen name="SignUpScreen" component={SignUpScreen} options={{headerShown: false}}/>
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{headerShown: false}}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({

});

export default App

