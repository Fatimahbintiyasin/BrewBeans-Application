import shopperModel from '../models/shopperModel.js';

const shopperController = {

  async shoppersListPage(req, res) {
    try {
      // Fetch shoppers from the database using the model function
      const shoppers = await shopperModel.getAllShoppers();
      // console.log("shopperController - shoppersListPage" , shoppers);

      res.render('index', { title: 'Shoppers List', page: 'shopper/shoppersList', shoppers: shoppers });
    } catch (error) {
      console.error('Error fetching shoppers:', error);
      res.status(500).json({ error: 'Error fetching shoppers from the database.' });
    }
  },


  async shopperView(req, res) {
    const shopperId = req.params.id; 

    try {
      const shopper = await shopperModel.getShopperById(shopperId);
      if (!shopper) {
        return res.status(404).send('Shopper not found');
      }
      
      const totalPurchases = await shopperModel.getTotalPurchases(shopperId);
      // console.log("shopperController - shopperView" , totalPurchases);

      res.render('index', {title: 'Shoppers List', page: 'shopper/shopperView', shopper:shopper, totalPurchases:totalPurchases });
    } catch (error) {
      console.error('Error in shopperView controller:', error);
      res.status(500).send('Internal Server Error');
    }
  },

};


export default shopperController;
