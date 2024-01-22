import React, { Component, useState } from 'react'
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import db from '../../database';

const LoginScreen = ({navigation}) => {
    const [userName, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const xuLiDangNhap = () => {
        if (userName === '') {
          Alert.alert('Please check your username');
          return;
        } else if (password === '') {
          Alert.alert('Please check your password');
          return;
        } else {
          // Thực hiện truy vấn SQL để kiểm tra đăng nhập
          db.transaction((tx) => {
            tx.executeSql(
              'SELECT * FROM Users WHERE username = ? AND password = ?',
              [userName, password],
              (_, { rows }) => {
                if (rows.length > 0) {
                  // Đăng nhập thành công
                  // Do something here (e.g., navigate to home screen)
                  console.log('Login successful');
                  navigation.navigate("HomeScreen")
                } else {
                  Alert.alert('Login failed. Invalid credentials.');
                }
              },
              (_, error) => {
                console.error('Error during login:', error);
              }
            );
          });
        }
      };
    return (
        <View style={styles.container}>
            <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={{fontSize: 35, color: '#fff'}}>Hello</Text>
          <Text style={{fontSize: 20, color: '#fff'}}>Welcome back. Have a good time.</Text>
          <TextInput placeholder='Username' style={styles.input} value={userName} onChangeText={(text) => {setUsername(text)}}/>
          <TextInput placeholder='Password' style={styles.input1} value={password} onChangeText={(text) => {setPassword(text)}}/>
          <TouchableOpacity style={styles.buttonDangNhap} onPress={xuLiDangNhap}>
              <Text style={{color: '#fff', fontSize: 16}}>Log In</Text>
          </TouchableOpacity>
          </View>
          <TouchableOpacity style={{ alignItems: 'center'}} onPress={() => navigation.navigate("SignUpScreen")}>
            <Text style={{fontSize: 16, position: 'absolute', bottom: 10}}>Dont' have account ? Sign up</Text>
          </TouchableOpacity>
        </View>
      )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#D9D9D9',
        
    },
    input: {
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        width: '80%',
        marginTop: 40,
        paddingStart: 20,
        backgroundColor: 'white'
    },
    input1: {
        borderColor: '#fff',
        borderWidth: 1,
        borderRadius: 10,
        width: '80%',
        marginTop: 10,
        paddingStart: 20,
        backgroundColor: 'white'
    },
    buttonDangNhap: {
        backgroundColor: 'blue',
        width: "80%",
        height: 45,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    }
});

export default LoginScreen 

