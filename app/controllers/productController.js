// controllers/productController.js
import productModel from '../models/productModel.js';

const productController = {

    async productsListPage(req, res) {
        try {
            const products = await productModel.getAllProducts();
            //   console.log('at controller get all: ' +products);
            // res.render('index', { title: 'Products List', page: 'productsList', list: 'products', displayName: 'UserDisplayName(req)'});
            res.render('index', { title: 'Products List', page: 'product/productsList', products: products});

        } catch (error) {
            res.status(500).json({ error: 'Error fetching products from the database.' });
        }
    },


    async productViewPage(req, res) {
        try {
            const productId = req.params.id;
            const product = await productModel.getProductById(productId);
            const depts = await productModel.getDeptsList();
            
            // console.log('at controller view: ', product);
      
            res.render('index', { title: 'Product View', page: 'product/productView', product: product, depts: depts });
      
        } catch (error) {
          res.status(500).json({ error: 'Error fetching product from the database.' });
        }
    },
      

    
    async productUpdatePage(req, res) {
        try {
            const productId = req.params.id;
            const product = await productModel.getProductById(productId);
            const depts = await productModel.getDeptsList();

            // console.log('at controller update: ', depts);

            res.render('index', { title: 'Product View', page: 'product/productUpdate', product: product, depts: depts});
            
        } catch (error) {
            res.status(500).json({ error: 'Error updating product in the database.' });
        }
    },
    
    async productAddPage(req, res) {
        try {
            const newProductId = await productModel.getNewProductId();
            const depts = await productModel.getDeptsList();

            // console.log('at controller new product id: ', newProductId);


            res.render('index', { title: 'Product View', page: 'product/productAdd', depts: depts, newProductId : newProductId});

        } catch (error) {
            res.status(500).json({ error: 'Error fetching product from the database.' });
        }
    },

  
    

    async addProduct(req, res) {
        try {
            const productData = {
                idProduct: req.params.id,
                productName: req.body.ProductName,
                description: req.body.Description,
                productImage: req.body.ProductImage ? req.body.productImage : null, // Assuming you are using multer for file upload
                price: req.body.Price,
                saleStart: req.body.SaleStart,
                saleEnd: req.body.SaleEnd,
                salePrice: req.body.SalePrice,
                // active: req.body.Active === 'on', // Convert checkbox value to a boolean
                // featured: req.body.Featured === 'on', // Convert checkbox value to a boolean
                active: req.body.Active === 'on' ? 1 : 0, // Convert checkbox value to a number (0 or 1)
                featured: req.body.Featured === 'on' ? 1 : 0, // Convert checkbox value to a number (0 or 1)    
                featureStart: req.body.FeatureStart,
                featureEnd: req.body.FeatureEnd,
                type: req.body.Type,
                idDepartment: req.body.idDepartment,
                STOCK: req.body.STOCK,
                ORDERED: req.body.ORDERED,
                REORDER: req.body.REORDER
            };
          
            // console.log('at controller add: ', productData);
      
            await productModel.addProduct(productData);
            res.redirect('/productslist');
        } catch (error) {
          res.status(500).json({ error: 'Error adding product to the database.' });
        }
    },

      

    async updateProduct(req, res) {
        try {
            const productData = {
                idProduct: req.params.id,
                productName: req.body.ProductName,
                description: req.body.Description,
                productImage: req.body.ProductImage ? req.body.productImage : null, // Assuming you are using multer for file upload
                price: req.body.Price,
                saleStart: req.body.SaleStart,
                saleEnd: req.body.SaleEnd,
                salePrice: req.body.SalePrice,
                // active: req.body.Active === 'on', // Convert checkbox value to a boolean
                // featured: req.body.Featured === 'on', // Convert checkbox value to a boolean
                active: req.body.Active === 'on' ? 1 : 0, // Convert checkbox value to a number (0 or 1)
                featured: req.body.Featured === 'on' ? 1 : 0, // Convert checkbox value to a number (0 or 1)    
                featureStart: req.body.FeatureStart,
                featureEnd: req.body.FeatureEnd,
                type: req.body.Type,
                idDepartment: req.body.idDepartment,
                STOCK: req.body.STOCK,
                ORDERED: req.body.ORDERED,
                REORDER: req.body.REORDER
            };
          
            // console.log('at controller update: ', productData);
    
            await productModel.updateProduct(productData); // Assuming you have an updateProduct function in productModel
            res.redirect('/productslist');
        } catch (error) {
            res.status(500).json({ error: 'Error updating product in the database.' });
        }
    },
    

    async deleteProduct(req, res) {
        try {
            const productId = req.params.id;
            await productModel.deleteProduct(productId);
            res.redirect('/productslist');
        } catch (error) {
            res.status(500).json({ error: 'Error deleting product from the database.' });
        }
    },
};

export default productController;