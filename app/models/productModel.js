// models/productModel.js
import oracledb from 'oracledb';
import dbConfig from '../../config/dbConfig.js';

class Product {

  static async getDeptsList() {
    try {
      const connection = await oracledb.getConnection(dbConfig);
      const result = await connection.execute('SELECT * FROM bb_department');
      connection.close();
  
      // Convert the array of arrays to an array of objects with named fields
      const deptsArray = result.rows;
      return deptsArray.map((deptArray) => {
        const [idDeptartment, deptName, deptDesc, deptImage] = deptArray;
        return { idDeptartment, deptName, deptDesc, deptImage };
      });
    } catch (error) {
      console.error('Error fetching all departments:', error);
      throw error;
    }
  }
  
  static async getNewProductId() {
    try {
      const connection = await oracledb.getConnection(dbConfig);

      //*******get new id from SQL SEQUENCE *******/
      const result = await connection.execute('SELECT BB_PRODID_SEQ.NEXTVAL AS NEWPRODUCTID FROM DUAL');
      const newProductId = result.rows[0][0];
      
      connection.close();
      
      // console.log('at model new product id: ', newProductId);
      
      return newProductId;
    } catch (error) {
      console.error('Error getting new product ID:', error);
      throw error;
    }
  }  

  static async getAllProducts() {
    try {
      const connection = await oracledb.getConnection(dbConfig);
      const result = await connection.execute('SELECT * FROM bb_product ORDER BY IDPRODUCT' );
      connection.close();

      // Convert the array of arrays to an array of objects with named fields
      const productsArray = result.rows;
      return productsArray.map((productArray) => {
        const [idProduct, ProductName, Description, ProductImage, Price, SaleStart, SaleEnd, SalePrice,
          Active, Featured, FeatureStart, FeatureEnd, Type, idDepartment, STOCK, ORDERED, REORDER] = productArray;
        return { idProduct, ProductName, Description, ProductImage, Price, SaleStart, SaleEnd, SalePrice,
          Active, Featured, FeatureStart, FeatureEnd, Type, idDepartment, STOCK, ORDERED, REORDER };
      });

    } catch (error) {
      console.error('Error fetching all products:', error);
      throw error;
    }
  }

  static async getProductById(id) {
    try {
      const connection = await oracledb.getConnection(dbConfig);
      const result = await connection.execute('SELECT * FROM bb_product WHERE idProduct = :id', [id]);
      connection.close();
  
      const row = result.rows[0]; // Get the first row from the result
  
      const [
        idProduct, ProductName, Description, ProductImage, Price, SaleStart, SaleEnd, SalePrice,
        Active, Featured, FeatureStart, FeatureEnd, Type, idDepartment, STOCK, ORDERED, REORDER
      ] = row;
  
      return {
        idProduct, ProductName, Description, ProductImage, Price, SaleStart, SaleEnd, SalePrice,
        Active, Featured, FeatureStart, FeatureEnd, Type, idDepartment, STOCK, ORDERED, REORDER
      };
    } catch (error) {
      console.error('Error fetching product by ID:', error);
      throw error;
    }
  }
  
static async addProduct(productData) {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const {
      idProduct, productName, description, productImage, price, saleStart, saleEnd, salePrice,
      active, featured, featureStart, featureEnd, type, idDepartment, STOCK, ORDERED, REORDER,
    } = productData;

    // console.log('at Model add: ' +
    //   idProduct, productName, description, productImage, price, saleStart, saleEnd, salePrice, active, featured,
    //   featureStart, featureEnd, type, idDepartment, STOCK, ORDERED, REORDER,
    // );

    // Call the PL/SQL stored procedure using the bind variables
    const result = await connection.execute(` 
      BEGIN ADD_PRODUCT_SP(:idProduct, :productName, :description, :productImage, :price, 
      :saleStart, :saleEnd, :salePrice, :active, :featured, :featureStart, :featureEnd,
      :type, :idDepartment, :STOCK, :ORDERED, :REORDER); END;`,
      {
        idProduct, productName, description, productImage, price, saleStart, saleEnd, salePrice, active, featured,
        featureStart, featureEnd, type, idDepartment, STOCK, ORDERED, REORDER,
      }
    );

    await connection.commit();
    connection.close();
    console.log('Product added successfully:', productData);
    return result;
  } catch (error) {
    console.error('Error adding a new product:', error);
    throw error;
  }
}


static async updateProduct(productData) {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    const {
      idProduct, productName, description, productImage, price, saleStart, saleEnd, salePrice,
      active, featured, featureStart, featureEnd, type, idDepartment, STOCK, ORDERED, REORDER,
    } = productData;

    // console.log('at Model update: ' +
    //   idProduct, productName, description, productImage, price, saleStart, saleEnd, salePrice, active, featured,
    //   featureStart, featureEnd, type, idDepartment, STOCK, ORDERED, REORDER,
    // );

    // Call the PL/SQL stored procedure using the bind variables
    const result = await connection.execute(`
      BEGIN UPDATE_PRODUCT_SP(:idProduct, :productName, :description, :productImage, :price, 
      :saleStart, :saleEnd, :salePrice, :active, :featured, :featureStart, :featureEnd, 
      :type, :idDepartment, :STOCK, :ORDERED, :REORDER); END;`,
      {
        idProduct, productName, description, productImage, price, saleStart, saleEnd, salePrice, active, featured,
        featureStart, featureEnd, type, idDepartment, STOCK, ORDERED, REORDER,
      }
    );

    await connection.commit();
    connection.close();
    console.log('Product updated successfully:', productData);
    return result;
  } catch (error) {
    console.error('Error updating the product:', error);
    throw error;
  }
}


  static async deleteProduct(id) {
    try {
      const connection = await oracledb.getConnection(dbConfig);
      const result = await connection.execute('DELETE FROM bb_product WHERE idProduct = :id', [id]);
      await connection.commit(); // Commit the changes to the database

      connection.close();
      return result;
    } catch (error) {
      console.error('Error deleting a product:', error);
      throw error;
    }
  }
}

export default Product;