import React, { useState } from 'react';
import { Text, StyleSheet, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import db from '../../database';
const SignUpScreen = ({ navigation }) => {
  const [userName, setUsername] = useState('');
  const [passWord, setPassword] = useState('');
  const [rePassword, setRepassword] = useState('');

  const xuLiDangKy = () => {
    if (userName === '') {
      Alert.alert('Username is null');
      return;
    } else if (passWord.length < 5) {
      Alert.alert('Password too short');
      return;
    } else if (passWord !== rePassword) {
      Alert.alert('Check your password');
      return;
    } else {
      // Thực hiện truy vấn SQL để thêm người dùng mới vào cơ sở dữ liệu
      db.transaction((tx) => {
        tx.executeSql(
          'INSERT INTO Users (username, password) VALUES (?, ?)',
          [userName, passWord],
          (_, { rowsAffected }) => {
            if (rowsAffected > 0) {
              // Đăng ký thành công, chuyển đến màn hình đăng nhập
              Alert.alert("Create account success !")
              navigation.navigate('LoginScreen');
            } else {
              Alert.alert('Signup failed. User may already exist.');
            }
          },
          (_, error) => {
            console.error('Error during signup:', error);
          }
        );
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 35, color: '#fff' }}>Welcome</Text>
        <Text style={{ fontSize: 20, color: '#fff' }}>Come together. Enjoy with us.</Text>
        <TextInput placeholder='Username' style={styles.inputUsername} value={userName} onChangeText={(text) => { setUsername(text) }} />
        <TextInput placeholder='Password' style={styles.inputPassword} value={passWord} onChangeText={(text) => { setPassword(text) }} />
        <TextInput placeholder='Confirm Password' style={styles.inputPassword2} value={rePassword} onChangeText={(text) => { setRepassword(text) }} />
        <TouchableOpacity style={styles.buttonDangKy} onPress={xuLiDangKy}>
          <Text style={{ color: '#fff', fontSize: 16 }}>Log In</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={{ alignItems: 'center' }} onPress={() => navigation.navigate("LoginScreen")}>
        <Text style={{ fontSize: 16, position: 'absolute', bottom: 10 }}>Already have account ? Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D9D9D9',
  },
  inputUsername: {
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    width: '80%',
    marginTop: 40,
    paddingStart: 20,
    backgroundColor: 'white'
  },
  inputPassword: {
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    width: '80%',
    marginTop: 10,
    paddingStart: 20,
    backgroundColor: 'white'
  },
  inputPassword2: {
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 10,
    width: '80%',
    marginTop: 10,
    paddingStart: 20,
    backgroundColor: 'white'
  },
  buttonDangKy: {
    backgroundColor: 'blue',
    width: "80%",
    height: 45,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 30
  }
});

export default SignUpScreen;
