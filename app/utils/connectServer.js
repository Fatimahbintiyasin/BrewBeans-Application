import oracledb from 'oracledb';
import dbConfig from '../../config/dbConfig.js';

// Connect to Oracle database
async function connectToDatabase() {
    try {
      await oracledb.createPool(dbConfig);
      console.log('Connected to Oracle database');
    } catch (err) {
      console.error('Error connecting to Oracle database:', err);
    }
  }
  
  export default connectToDatabase;