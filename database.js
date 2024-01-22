import SQLite from 'react-native-sqlite-storage';

const db = SQLite.openDatabase({ name: 'mydatabase.db', location: 'default' });

export default db;