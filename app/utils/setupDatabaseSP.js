import oracledb from 'oracledb';
import dbConfig from '../../config/dbConfig.js';
import {createStoredProcedure, createStoredFunction, createStoredType} 
                from '../utils/oracleUtils.js';

// Connect to Oracle database
async function setupDatabaseSP() {

    // createStoredProcedure('GET_NEXT_PRODUCT_ID', GET_NEXT_PRODUCT_ID);
    // createStoredProcedure('GET_NEXT_BASKET_ID', GET_NEXT_BASKET_ID);

    createStoredProcedure('STATUS_SHIP_SP', STATUS_SHIP_SP);
    createStoredProcedure('ADD_PRODUCT_SP', ADD_PRODUCT_SP);
    createStoredProcedure('UPDATE_PRODUCT_SP', UPDATE_PRODUCT_SP);
    createStoredProcedure('BASKET_ADD_SP', BASKET_ADD_SP);

    createStoredFunction('CK_SALE_SF', CK_SALE_SF);
  }


const BASKET_ADD_SP =`
CREATE OR REPLACE PROCEDURE BASKET_ADD_SP (
    p_product_id IN NUMBER,
    p_basket_id IN NUMBER,
    p_option1 IN NUMBER,
    p_option2 IN NUMBER,
    p_price IN NUMBER,
    p_quantity IN NUMBER
  ) AS
  BEGIN
    INSERT INTO BB_BASKETITEM (
      IDBASKETITEM,
      IDBASKET,
      IDPRODUCT,
      OPTION1,
      OPTION2,
      PRICE,
      QUANTITY
    ) VALUES (
      BB_IDBASKETITEM_SEQ.NEXTVAL,
      p_basket_id,
      p_product_id,
      p_option1,
      p_option2,
      p_price,
      p_quantity
    );
    
    COMMIT;
    
    DBMS_OUTPUT.PUT_LINE('Item added to the basket successfully.');
  EXCEPTION
    WHEN OTHERS THEN
      DBMS_OUTPUT.PUT_LINE('Error: ' || SQLCODE || ' - ' || SQLERRM);
  END;
  
  `;
 

const CK_SALE_SF =`
CREATE OR REPLACE FUNCTION CK_SALE_SF(p_id_product IN NUMBER, p_date IN DATE) RETURN VARCHAR2 AS
  v_sale_status VARCHAR2(20);
BEGIN
  SELECT 
      CASE 
          WHEN p_date BETWEEN SALESTART AND SALEEND THEN 'ON SALE!'
          ELSE 'Great Deal!'
      END
  INTO v_sale_status
  FROM BB_PRODUCT
  WHERE IDPRODUCT = p_id_product;

  RETURN v_sale_status;

  COMMIT; -- Commit the changes to the database

END;
`;


// const GET_NEXT_PRODUCT_ID =`
// CREATE OR REPLACE PROCEDURE GET_NEXT_PRODUCT_ID (
//     nextId OUT NUMBER
// ) AS
// BEGIN
//     SELECT COALESCE(MAX(idProduct), 0) + 1 INTO nextId
//     FROM BB_Product;
// END;
// `;

// const GET_NEXT_BASKET_ID =`
// CREATE OR REPLACE PROCEDURE GET_NEXT_BASKET_ID (
//     nextId OUT NUMBER
// ) AS
// BEGIN
//     SELECT COALESCE(MAX(idBasket), 0) + 1 INTO nextId
//     FROM BB_BASKET;
// END;
// `;

const STATUS_SHIP_SP =`

CREATE OR REPLACE PROCEDURE STATUS_SHIP_SP (
  p_basketid IN NUMBER,
  p_idstatus IN NUMBER,
  p_date IN DATE,
  p_note IN VARCHAR2,
  p_idstage IN NUMBER,
  p_shipper IN VARCHAR2,
  p_shipnum IN VARCHAR2
) AS
BEGIN
  IF p_idstatus = 0 THEN
      INSERT INTO bb_basketstatus (idstatus, idbasket, idstage, dtstage, notes, shipper, shippingnum)
      VALUES (bb_status_seq.NEXTVAL, p_basketid, p_idstage, p_date, p_note,  p_shipper, p_shipnum);
  ELSE
      UPDATE bb_basketstatus
      SET idstage = p_idstage,
          dtstage = p_date,
          Notes = p_note,
          shipper = p_shipper,
          shippingnum = p_shipnum
      WHERE idstatus = p_idstatus;
  END IF;
  
  COMMIT;
  DBMS_OUTPUT.PUT_LINE('Basket status updated successfully.');
EXCEPTION
  WHEN OTHERS THEN
      ROLLBACK;
      DBMS_OUTPUT.PUT_LINE('Error updating basket status: ' || SQLERRM);
      RAISE;
END;
`;


// const STATUS_SHIP_SP =`
// CREATE OR REPLACE PROCEDURE STATUS_SHIP_SP (
//     p_basketid IN NUMBER,
//     p_date IN DATE,
//     p_shipper IN VARCHAR2,
//     p_shipnum IN VARCHAR2
//   ) AS
//   BEGIN
//     INSERT INTO bb_basketstatus (idstatus, idbasket, idstage, dtstage, shipper, shippingnum)
//     VALUES (bb_status_seq.NEXTVAL, p_basketid, 3, p_date, p_shipper, p_shipnum);
//     COMMIT;
//     DBMS_OUTPUT.PUT_LINE('Order status updated successfully.');

//     COMMIT; -- Commit the changes to the database
//   END;
// `;
  
const UPDATE_PRODUCT_SP =`
CREATE OR REPLACE PROCEDURE UPDATE_PRODUCT_SP (
    p_idProduct      IN bb_product.idProduct%TYPE,
    p_productName    IN bb_product.ProductName%TYPE,
    p_description    IN bb_product.Description%TYPE,
    p_productImage   IN bb_product.ProductImage%TYPE,
    p_price          IN bb_product.Price%TYPE,
    p_saleStart      IN bb_product.SaleStart%TYPE,
    p_saleEnd        IN bb_product.SaleEnd%TYPE,
    p_salePrice      IN bb_product.SalePrice%TYPE,
    p_active         IN bb_product.Active%TYPE,
    p_featured       IN bb_product.Featured%TYPE,
    p_featureStart   IN bb_product.FeatureStart%TYPE,
    p_featureEnd     IN bb_product.FeatureEnd%TYPE,
    p_type           IN bb_product.Type%TYPE,
    p_idDepartment   IN bb_product.idDepartment%TYPE,
    p_STOCK          IN bb_product.STOCK%TYPE,
    p_ORDERED        IN bb_product.ORDERED%TYPE,
    p_REORDER        IN bb_product.REORDER%TYPE
  ) AS
  BEGIN
    UPDATE bb_product 
    SET ProductName = p_productName,
        Description = p_description,
        ProductImage = p_productImage,
        Price = p_price,
        SaleStart = p_saleStart,
        SaleEnd = p_saleEnd,
        SalePrice = p_salePrice,
        Active = p_active,
        Featured = p_featured,
        FeatureStart = p_featureStart,
        FeatureEnd = p_featureEnd,
        Type = p_type,
        idDepartment = p_idDepartment,
        STOCK = p_STOCK,
        ORDERED = p_ORDERED,
        REORDER = p_REORDER
    WHERE 
      idProduct = p_idProduct;
    COMMIT; -- Commit the changes to the database
  END;
      `;

  

const ADD_PRODUCT_SP =`
CREATE OR REPLACE PROCEDURE ADD_PRODUCT_SP (
    p_idProduct      IN bb_product.idProduct%TYPE,
    p_productName    IN bb_product.ProductName%TYPE,
    p_description    IN bb_product.Description%TYPE,
    p_productImage   IN bb_product.ProductImage%TYPE,
    p_price          IN bb_product.Price%TYPE,
    p_saleStart      IN bb_product.SaleStart%TYPE,
    p_saleEnd        IN bb_product.SaleEnd%TYPE,
    p_salePrice      IN bb_product.SalePrice%TYPE,
    p_active         IN bb_product.Active%TYPE,
    p_featured       IN bb_product.Featured%TYPE,
    p_featureStart   IN bb_product.FeatureStart%TYPE,
    p_featureEnd     IN bb_product.FeatureEnd%TYPE,
    p_type           IN bb_product.Type%TYPE,
    p_idDepartment   IN bb_product.idDepartment%TYPE,
    p_STOCK          IN bb_product.STOCK%TYPE,
    p_ORDERED        IN bb_product.ORDERED%TYPE,
    p_REORDER        IN bb_product.REORDER%TYPE
  ) AS
  BEGIN
    INSERT INTO bb_product (
      idProduct, productName, description, productImage, price,
      saleStart, saleEnd, salePrice, active, featured,
      featureStart, featureEnd, type, idDepartment,
      STOCK, ORDERED, REORDER
    )
    VALUES (
      p_idProduct, p_productName, p_description, p_productImage, p_price,
      p_saleStart, p_saleEnd, p_salePrice, p_active, p_featured,
      p_featureStart, p_featureEnd, p_type, p_idDepartment,
      p_STOCK, p_ORDERED, p_REORDER
    );
    COMMIT; -- Commit the changes to the database
  END;
    `;

  export default setupDatabaseSP;