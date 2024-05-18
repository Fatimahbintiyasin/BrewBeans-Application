import oracledb from 'oracledb';
import dbConfig from '../../config/dbConfig.js';

const BasketStatus = {
    
    async getBasketStatusListById(id) {

    try {
      const connection = await oracledb.getConnection(dbConfig);
      const result = await connection.execute('SELECT * FROM bb_BasketStatus WHERE idBasket = :id ORDER BY idStatus', [id]);
      connection.close();
    //   console.log('at basket model getall: ', result);
      
      const basketsArray = result.rows;
      return basketsArray.map((basketArray) => {
        const [ idStatus, idBasket, idStage, dtStage, Notes, shipper, ShippingNum,

        ] = basketArray;
        
        return { idStatus, idBasket, idStage, dtStage, Notes, shipper, ShippingNum,

        };
      });

    } catch (error) {
      console.error('Error fetching basket status list by basket ID:', error);
      throw error;
    }
  },



  async basketStatusAdd(basketStatusData) {
  try {
      const connection = await oracledb.getConnection(dbConfig);
      const {
          idBasket, dtStage, Notes, idStage, shipper, ShippingNum, idStatus
      } = basketStatusData;
      
      console.log("")
      // Convert dtStage to a JavaScript Date object
      const dtStageDate = new Date(dtStage);

      const result = await connection.execute(
          `BEGIN
              STATUS_SHIP_SP(:idBasket, :idStatus, :dtStageDate, :Notes, :idStage, :shipper, :ShippingNum);
          END;`,
          {
              idBasket, idStatus, dtStageDate, Notes, idStage, shipper, ShippingNum
          },
          {
              autoCommit: true
          }
      );
        
      connection.close();
      return result;
  } catch (error) {
      console.error('Error updating or adding basket status:', error);
      throw error;
  }
},

  
        
}
  
export default BasketStatus;
