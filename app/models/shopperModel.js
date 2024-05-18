// Import your database connection and other dependencies
import oracledb from 'oracledb';
import dbConfig from '../../config/dbConfig.js';

const shopperModel = {
    
  async getAllShoppers() {
    try {
      const connection = await oracledb.getConnection(dbConfig);
      const result = await connection.execute('SELECT s.*, TOT_PURCH_SF(s.IDSHOPPER) AS TOTAL_PURCHASES FROM BB_Shopper s');
      
      // console.log("shopperModel - getAllShoppers" , result.rows);
      connection.close();

      if (result.rows.length === 0) {
        return null; // No shopper found with the given ID
      }

      const shopperArray = result.rows;
      return shopperArray.map((shopperArray) => {
      const [
        idShopper, FirstName, LastName, Address, City, State, ZipCode, Phone, Fax, Email, UserName, Password, Cookie, dtEntered,
        Province, Country, promo, TOTAL_PURCHASES
      ] = shopperArray;

      return {
        idShopper, FirstName, LastName, Address, City, State, ZipCode, Phone, Fax, Email, UserName, Password, Cookie, dtEntered,
        Province, Country, promo, TOTAL_PURCHASES
      };
    });

    } catch (error) {
      console.error('Error fetching shoppers from database:', error);
      throw error;
    }
  },


  async getShopperById(shopperId) {
    try {
      const connection = await oracledb.getConnection(dbConfig);
      const result = await connection.execute(
        `SELECT * FROM BB_Shopper WHERE idShopper = :shopperId`,
        {
          shopperId: shopperId,
        }
      );
      connection.close();

      if (result.rows.length === 0) {
        return null; // No shopper found with the given ID
      }

      const shopperArray = result.rows[0];
      const [
        idShopper, FirstName, LastName, Address, City, State, ZipCode, Phone, Fax, Email, UserName, Password, Cookie, dtEntered,
        Province, Country, promo, TOTAL_PURCHASES
      ] = shopperArray;

      return {
        idShopper, FirstName, LastName, Address, City, State, ZipCode, Phone, Fax, Email, UserName, Password, Cookie, dtEntered,
        Province, Country, promo, TOTAL_PURCHASES
      };

    } catch (error) {
      console.error('Error fetching shopper by ID:', error);
      throw error;
    }
  },



  async getTotalPurchases(shopperId) {
    try {
      const connection = await oracledb.getConnection(dbConfig);
      const result = await connection.execute(
        `SELECT TOT_PURCH_SF(:shopperId) AS TOTAL_PURCHASES FROM DUAL`,
        { shopperId: shopperId,}
      );
      // console.log("shopperModel - getTotalPurchases" , result.rows[0]);
      connection.close();

      return result.rows[0];
    } catch (error) {
      console.error('Error getting total purchases:', error);
      throw error;
    }
  },

};

export default shopperModel;
