import basketModel from '../models/basketModel.js';
import productModel from '../models/productModel.js';
import BasketItemsModel from '../models/basketItemsModel.js';

const basketItemsController = {

    
  async shop(req, res) {
    try {
      let shopDate = req.params.dt;
      
      const products = await productModel.getAllProducts(shopDate);
      const productOptionCategory = await BasketItemsModel.getProductOptionCategory();
      const productOption = await BasketItemsModel.getProductOption();
      const productOptionDetails = await BasketItemsModel.getProductOptionDetails();
      const basketList = await BasketItemsModel.getBasketList();
      
      const promoList = await BasketItemsModel.getPromoTagsForAllProducts(shopDate);
      
      console.log("basketItemsController -  shop", products);

      res.render('index', {
        title: 'Products List',
        page: 'basketItems/shopping',
        products: products,
        shopperName: "xyz",
        numberOfProducts: '0',
        productOptionCategory,
        productOptionDetails,
        productOption,
        basketList,
        promoList,
        shopDate
      });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching products from the database.' });
    }
  },



  async basketItemsViewPage(req, res) {
    try {
      
      const basketId = req.params.id; 
      const basketItemList = await BasketItemsModel.getAllBasketItems(basketId); 
      const basketItemInStock = await BasketItemsModel.checkBasketStock(basketId); 
      const basketTax = await BasketItemsModel.getBasketTax(basketId); 

      
      
      let stockMsg =''
      if (basketItemInStock === 'Y') {
        stockMsg = 'All items in stock!';
      } else if (basketItemInStock === 'N') {
        stockMsg = 'All items NOT in stock!';
      } else {
        stockMsg = 'Error checking basket stock.';
      }
      
      // console.log("basketProduct Control - basketItemsViewPage", basketTax);

      res.render('index', { title: 'Basket Items List', page: 'basketItems/basketItemsListView',
        basketItemList: basketItemList, basketId: basketId, stockMsg: stockMsg, basketTax:basketTax}
      );
    } catch (error) {
      console.error('Error fetching basket items:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },

  

  async basketAddItem(req, res) {

    try {
      // Extract data from the request body         
      const newItem = {
        p_product_id: req.body.productId,
        p_basket_id: parseInt(req.body.basketId, 10), // Parse as integer with base 10
        p_option1: parseInt(req.body.option1, 10), // Parse as integer with base 10
        p_option2: parseInt(req.body.option2, 10), // Parse as integer with base 10
        p_price: parseFloat(req.body.price), // Parse as float if price can have decimal points
        p_quantity: parseInt(req.body.quantity, 10) // Parse as integer with base 10
      };

      
      const updatedBasket = await BasketItemsModel.basketAddItem(newItem);
      
      // console.log(updatedBasket);
        
      res.status(200).json({ message: 'Item added to basket successfully', updatedBasket });
    } catch (error) {
      console.error('Error adding item to basket:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  },



};

export default basketItemsController;
