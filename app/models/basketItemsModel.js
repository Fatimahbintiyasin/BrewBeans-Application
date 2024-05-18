import oracledb from 'oracledb';
import dbConfig from '../../config/dbConfig.js';

const BasketItems =  {
 
    
  async getBasketList() {
    try {
      const connection = await oracledb.getConnection(dbConfig);
      const basketListArray = await connection.execute('SELECT DISTINCT idBasket FROM bb_Basket');
      connection.close();
      const basketList = basketListArray.rows.flat();

      return basketList;
    } catch (error) {
      console.error('Error fetching basket list:', error);
      throw error;
    }
  },

  async getAllBasketItems(basketId) {
    try {
      const connection = await oracledb.getConnection(dbConfig);

      const result = await connection.execute(
        `SELECT IDBASKETITEM, IDPRODUCT, PRICE, QUANTITY, IDBASKET, OPTION1, OPTION2
         FROM bb_BasketItem
         WHERE IDBASKET = :basketId`,
        [basketId]
      );

      connection.close();
      return result.rows;
    } catch (error) {
      console.error('Error fetching basket items:', error);
      throw error;
    }
  },

    async basketAddItem(newItem) {

    try {

      const connection = await oracledb.getConnection(dbConfig);      
      const {p_product_id, p_basket_id, p_option1, p_option2, p_price, p_quantity } = newItem;

      const result = await connection.execute(
        `BEGIN 
        BASKET_ADD_SP (:p_product_id, :p_basket_id, :p_option1, :p_option2, :p_price, :p_quantity); 
        END;`, 
        { 
          p_product_id, p_basket_id, p_option1, p_option2, p_price, p_quantity
        },
        { autoCommit: true }
        );
        
        console.log(' Model basket item add:', {p_product_id, p_basket_id, p_option1, p_option2, p_price, p_quantity });
        // await connection.commit();
        
      connection.close();
      return result;
    } catch (error) {
        console.error('Error updating or adding basket item:', error);
        throw error;
    }

  },

    async getPromoTagsForAllProducts(dt) {
    try {
      const connection = await oracledb.getConnection(dbConfig);
      const products = await connection.execute( `SELECT IDPRODUCT FROM BB_PRODUCT` );
      
      const promoTags = {};
  
      for (const product of products.rows) {
        const productId = product[0];
        const result = await connection.execute(
          `SELECT CK_SALE_SF(:productId, TO_DATE(:dt, 'YYYY-MM-DD')) AS PROMO_TAG FROM DUAL`,
          {productId, dt }
          );
          promoTags[productId] = result.rows[0][0];
        }
        
        // console.log('basketproduct Model - getPromoTag', promoTags);
  
      connection.close();
      return promoTags;
    } catch (error) {
      console.error('Error fetching promo tags:', error);
      throw error;
    }
  },
  

  async getBasketTax(basketId) {
    try {
      const connection = await oracledb.getConnection(dbConfig);

      const result = await connection.execute(`
        SELECT
          b.IDBASKET,
          s.FIRSTNAME || ' ' || s.LASTNAME AS SHOPPER_NAME,
          s.STATE AS SHOPPER_STATE,
          t.TAXRATE AS TAX_FOR_STATE,
          ROUND((b.SUBTOTAL * t.TAXRATE), 2) AS TAX_VALUE
        FROM
          BB_Basket b
        INNER JOIN
          BB_Shopper s ON b.IDSHOPPER = s.IDSHOPPER
        INNER JOIN
          BB_Tax t ON s.STATE = t.STATE
        WHERE
          b.IDBASKET = :basketId`,
        {
          basketId: basketId,
        }
      );
      // console.log("Model - BasketItems - checkBasketStock", result.rows[0]);
      connection.close();
      return result.rows[0];
    }
     catch (error) {
      console.error('Error checking basket stock:', error);
      throw error;
    }
  },





  async checkBasketStock(basketId) {
    try {
      const connection = await oracledb.getConnection(dbConfig);
      const result = await connection.execute(
        `BEGIN
           :result := CHECK_BASKET_STOCK(:basketId);
        END;`,
        {
          basketId: basketId,
          result: { type: oracledb.STRING, dir: oracledb.BIND_OUT },
        }
      );
      
      // console.log("BasketItems - checkBasketStock", result);

      connection.close();
      
      return result.outBinds.result;

    } catch (error) {
      console.error('Error checking basket stock:', error);
      throw error;
    }
  },




    async getProductOptionCategory() {
      try {
        const connection = await oracledb.getConnection(dbConfig);
        const productOptionCategoryArray = await connection.execute('SELECT idOptionCategory, CategoryName FROM bb_ProductOptionCategory');
        connection.close();
        const productOptionCategory = productOptionCategoryArray.rows.map(item => item[1]);
  
        return productOptionCategory;
      } catch (error) {
        console.error('Error fetching product option categories:', error);
        throw error;
      }
    },
  
    async getProductOption() {
      try {
        const connection = await oracledb.getConnection(dbConfig);
        const productOptionArray = await connection.execute('SELECT DISTINCT IDPRODUCT FROM bb_ProductOption');
        connection.close();
        const productOption = productOptionArray.rows.flat();
  
        return productOption;
      } catch (error) {
        console.error('Error fetching product options:', error);
        throw error;
      }
    },
  
  
    async getProductOptionDetails() {
      try {
        const connection = await oracledb.getConnection(dbConfig);
        const productOptionDetailsArray = await connection.execute(`
          SELECT od.OptionName, c.CategoryName
          FROM bb_ProductOptionDetail od
          JOIN bb_ProductOptionCategory c ON od.idOptionCategory = c.idOptionCategory
        `);
        connection.close();
        // console.log("basketProduct Model - getProductOptionDetails", result.rows);
  
        const productOptionDetails = {};
        productOptionDetailsArray.rows.forEach(item => {
          const optionName = item[0];
          const categoryName = item[1];
          if (!productOptionDetails[categoryName]) {
            productOptionDetails[categoryName] = [];
          }
          productOptionDetails[categoryName].push(optionName);
        });
  
  
        return productOptionDetails;
      } catch (error) {
        console.error('Error fetching product option details:', error);
        throw error;
      }
    },
  
}

export default BasketItems;
