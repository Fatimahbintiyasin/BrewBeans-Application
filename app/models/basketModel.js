import oracledb from 'oracledb';
import dbConfig from '../../config/dbConfig.js';

const Basket = {

  async getAllBaskets() {
    try {
      const connection = await oracledb.getConnection(dbConfig);
      const result = await connection.execute('SELECT * FROM bb_Basket ORDER BY idBasket');
      connection.close();
      // console.log('at basket model getall: ', result);
      
      const basketsArray = result.rows;
      return basketsArray.map((basketArray) => {
        const [
          idBasket, Quantity, idShopper, OrderPlaced, SubTotal, Total, Shipping, Tax,
          dtCreated, Promo, ShipFirstName, ShipLastName, ShipAddress, ShipCity, ShipState, ShipZipCode,
          ShipPhone, ShipFax, ShipEmail, BillFirstName, BillLastName, BillAddress, BillCity, BillState, BillZipCode,
          BillPhone, BillFax, BillEmail, dtOrdered, ShipProvince, ShipCountry, BillProvince, BillCountry,
          CardType, CardNumber, ExpMonth, ExpYear, CardName, shipbill, ShipFlag,
        ] = basketArray;
        
        return {
          idBasket, Quantity, idShopper, OrderPlaced, SubTotal, Total, Shipping, Tax,
          dtCreated, Promo, ShipFirstName, ShipLastName, ShipAddress, ShipCity, ShipState, ShipZipCode,
          ShipPhone, ShipFax, ShipEmail, BillFirstName, BillLastName, BillAddress, BillCity, BillState, BillZipCode,
          BillPhone, BillFax, BillEmail, dtOrdered, ShipProvince, ShipCountry, BillProvince, BillCountry,
          CardType, CardNumber, ExpMonth, ExpYear, CardName, shipbill, ShipFlag,
        };
      });
    } catch (error) {
      console.error('Error fetching all baskets:', error);
      throw error;
    }
  },
  
  async getBasketById(id) {
    try {
      const connection = await oracledb.getConnection(dbConfig);
      const result = await connection.execute('SELECT * FROM bb_Basket WHERE idBasket = :id', [id]);
      connection.close();
      
      const row = result.rows[0];
      const [
        idBasket, Quantity, idShopper, OrderPlaced, SubTotal, Total, Shipping, Tax,
        dtCreated, Promo, ShipFirstName, ShipLastName, ShipAddress, ShipCity, ShipState, ShipZipCode,
        ShipPhone, ShipFax, ShipEmail, BillFirstName, BillLastName, BillAddress, BillCity, BillState, BillZipCode,
        BillPhone, BillFax, BillEmail, dtOrdered, ShipProvince, ShipCountry, BillProvince, BillCountry,
        CardType, CardNumber, ExpMonth, ExpYear, CardName, shipbill, ShipFlag,
      ] = row;
      
      return {
        idBasket, Quantity, idShopper, OrderPlaced, SubTotal, Total, Shipping, Tax,
        dtCreated, Promo, ShipFirstName, ShipLastName, ShipAddress, ShipCity, ShipState, ShipZipCode,
        ShipPhone, ShipFax, ShipEmail, BillFirstName, BillLastName, BillAddress, BillCity, BillState, BillZipCode,
        BillPhone, BillFax, BillEmail, dtOrdered, ShipProvince, ShipCountry, BillProvince, BillCountry,
        CardType, CardNumber, ExpMonth, ExpYear, CardName, shipbill, ShipFlag,
      };
    } catch (error) {
      console.error('Error fetching basket by ID:', error);
      throw error;
    }
  },
      



  async addBasket(basketData) {
    try {
      const connection = await oracledb.getConnection(dbConfig);
      const {
        idBasket, Quantity, idShopper, OrderPlaced, SubTotal, Total, Shipping, Tax,
        dtCreated, Promo, ShipFirstName, ShipLastName, ShipAddress, ShipCity, ShipState, ShipZipCode,
        ShipPhone, ShipFax, ShipEmail, BillFirstName, BillLastName, BillAddress, BillCity, BillState, BillZipCode,
        BillPhone, BillFax, BillEmail, dtOrdered, ShipProvince, ShipCountry, BillProvince, BillCountry,
        CardType, CardNumber, ExpMonth, ExpYear, CardName, shipbill, ShipFlag,
      } = basketData;

      const result = await connection.execute(
        `INSERT INTO bb_Basket (
          idBasket, Quantity, idShopper, OrderPlaced, SubTotal, Total, Shipping, Tax,
          dtCreated, Promo, ShipFirstName, ShipLastName, ShipAddress, ShipCity, ShipState, ShipZipCode,
          ShipPhone, ShipFax, ShipEmail, BillFirstName, BillLastName, BillAddress, BillCity, BillState, BillZipCode,
          BillPhone, BillFax, BillEmail, dtOrdered, ShipProvince, ShipCountry, BillProvince, BillCountry,
          CardType, CardNumber, ExpMonth, ExpYear, CardName, shipbill, ShipFlag
        ) VALUES (
          :idBasket, :Quantity, :idShopper, :OrderPlaced, :SubTotal, :Total, :Shipping, :Tax,
          :dtCreated, :Promo, :ShipFirstName, :ShipLastName, :ShipAddress, :ShipCity, :ShipState, :ShipZipCode,
          :ShipPhone, :ShipFax, :ShipEmail, :BillFirstName, :BillLastName, :BillAddress, :BillCity, :BillState, :BillZipCode,
          :BillPhone, :BillFax, :BillEmail, :dtOrdered, :ShipProvince, :ShipCountry, :BillProvince, :BillCountry,
          :CardType, :CardNumber, :ExpMonth, :ExpYear, :CardName, :shipbill, :ShipFlag
        )`,
        {
          idBasket, Quantity, idShopper, OrderPlaced, SubTotal, Total, Shipping, Tax,
          dtCreated, Promo, ShipFirstName, ShipLastName, ShipAddress, ShipCity, ShipState, ShipZipCode,
          ShipPhone, ShipFax, ShipEmail, BillFirstName, BillLastName, BillAddress, BillCity, BillState, BillZipCode,
          BillPhone, BillFax, BillEmail, dtOrdered, ShipProvince, ShipCountry, BillProvince, BillCountry,
          CardType, CardNumber, ExpMonth, ExpYear, CardName, shipbill, ShipFlag,
        }
      );

      await connection.commit();
      connection.close();
      return result;
    } catch (error) {
      console.error('Error adding a new basket:', error);
      throw error;
    }
  },

  async updateBasket(basketData) {
    try {
      const connection = await oracledb.getConnection(dbConfig);
      const {
        idBasket, Quantity, idShopper, OrderPlaced, SubTotal, Total, Shipping, Tax,
        dtCreated, Promo, ShipFirstName, ShipLastName, ShipAddress, ShipCity, ShipState, ShipZipCode,
        ShipPhone, ShipFax, ShipEmail, BillFirstName, BillLastName, BillAddress, BillCity, BillState, BillZipCode,
        BillPhone, BillFax, BillEmail, dtOrdered, ShipProvince, ShipCountry, BillProvince, BillCountry,
        CardType, CardNumber, ExpMonth, ExpYear, CardName, shipbill, ShipFlag,
      } = basketData;

      // console.log('at basket model update: ', basketData);

      const result = await connection.execute(
        `UPDATE bb_Basket
         SET Quantity = :Quantity, idShopper = :idShopper, OrderPlaced = :OrderPlaced, SubTotal = :SubTotal,
             Total = :Total, Shipping = :Shipping, Tax = :Tax, dtCreated = :dtCreated, Promo = :Promo,
             ShipFirstName = :ShipFirstName, ShipLastName = :ShipLastName, ShipAddress = :ShipAddress,
             ShipCity = :ShipCity, ShipState = :ShipState, ShipZipCode = :ShipZipCode, ShipPhone = :ShipPhone,
             ShipFax = :ShipFax, ShipEmail = :ShipEmail, BillFirstName = :BillFirstName, BillLastName = :BillLastName,
             BillAddress = :BillAddress, BillCity = :BillCity, BillState = :BillState, BillZipCode = :BillZipCode,
             BillPhone = :BillPhone, BillFax = :BillFax, BillEmail = :BillEmail, dtOrdered = :dtOrdered,
             ShipProvince = :ShipProvince, ShipCountry = :ShipCountry, BillProvince = :BillProvince,
             BillCountry = :BillCountry, CardType = :CardType, CardNumber = :CardNumber, ExpMonth = :ExpMonth,
             ExpYear = :ExpYear, CardName = :CardName, shipbill = :shipbill, ShipFlag = :ShipFlag
         WHERE
             idBasket = :idBasket`,
        {
          idBasket, Quantity, idShopper, OrderPlaced, SubTotal, Total, Shipping, Tax,
          dtCreated, Promo, ShipFirstName, ShipLastName, ShipAddress, ShipCity, ShipState, ShipZipCode,
          ShipPhone, ShipFax, ShipEmail, BillFirstName, BillLastName, BillAddress, BillCity, BillState, BillZipCode,
          BillPhone, BillFax, BillEmail, dtOrdered, ShipProvince, ShipCountry, BillProvince, BillCountry,
          CardType, CardNumber, ExpMonth, ExpYear, CardName, shipbill, ShipFlag,
        }
      );

      await connection.commit();
      connection.close();
      return result;
    } catch (error) {
      console.error('Error updating the basket:', error);
      throw error;
    }
  },

  async deleteBasket(id) {
    try {
      const connection = await oracledb.getConnection(dbConfig);
      const result = await connection.execute('DELETE FROM bb_Basket WHERE idBasket = :id', [id]);
      await connection.commit();
      connection.close();
      return result;
    } catch (error) {
      console.error('Error deleting a basket:', error);
      throw error;
    }
  },

}
  
export default Basket;
