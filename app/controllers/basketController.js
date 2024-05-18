import basketModel from '../models/basketModel.js';

const basketController = {

  async basketsListPage(req, res) { 
    // console.log('at controller add: ');

    try {
      const baskets = await basketModel.getAllBaskets();

      // console.log('at controller list basket : '+ baskets);

      res.render('index', { title: 'Baskets List', page: 'basket/basketsList', baskets: baskets });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching baskets from the database.' });
    }
  },


  async basketViewPage(req, res) {
    try {
      const basketId = req.params.id;
      const basket = await basketModel.getBasketById(basketId);
      // console.log('at controller view basket id :'+ basketId);

      res.render('index', { title: 'Basket View', page: 'basket/basketView', basket: basket });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching basket from the database.' });
    }
  },

  async basketUpdatePage(req, res) {
    try {
      const basketId = req.params.id;
      const basket = await basketModel.getBasketById(basketId);
      // console.log('at controller edit basket id :' + basketId);

      res.render('index', { title: 'Basket Update', page: 'basket/basketUpdate', basket: basket });
    } catch (error) {
      res.status(500).json({ error: 'Error updating basket in the database.' });
    }
  },


  async basketAddPage(req, res) {
    try {
      const newBasketId = await basketModel.getNewBasketId();
      // console.log('at controller new add basket id :'+ newBasketId);

      res.render('index', { title: 'Basket Add', page: 'basket/basketAdd', newBasketId: newBasketId });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching data for adding a new basket.' });
    }
  },


  async addBasket(req, res) {
    try {
      const basketData = {
        idBasket: req.params.id,
        Quantity: req.body.Quantity,
        idShopper: req.body.idShopper,
        OrderPlaced: req.body.OrderPlaced === 'on' ? 1 : 0, // Converting checkbox value to 1 or 0
        SubTotal: req.body.SubTotal,
        Total: req.body.Total,
        Shipping: req.body.Shipping,
        Tax: req.body.Tax,
        dtCreated: req.body.dtCreated,
        Promo: req.body.Promo,
        ShipFirstName: req.body.ShipFirstName,
        ShipLastName: req.body.ShipLastName,
        ShipAddress: req.body.ShipAddress,
        ShipCity: req.body.ShipCity,
        ShipState: req.body.ShipState,
        ShipZipCode: req.body.ShipZipCode,
        ShipPhone: req.body.ShipPhone,
        ShipFax: req.body.ShipFax,
        ShipEmail: req.body.ShipEmail,
        BillFirstName: req.body.BillFirstName,
        BillLastName: req.body.BillLastName,
        BillAddress: req.body.BillAddress,
        BillCity: req.body.BillCity,
        BillState: req.body.BillState,
        BillZipCode: req.body.BillZipCode,
        BillPhone: req.body.BillPhone,
        BillFax: req.body.BillFax,
        BillEmail: req.body.BillEmail,
        dtOrdered: req.body.dtOrdered,
        ShipProvince: req.body.ShipProvince,
        ShipCountry: req.body.ShipCountry,
        BillProvince: req.body.BillProvince,
        BillCountry: req.body.BillCountry,
        CardType: req.body.CardType,
        CardNumber: req.body.CardNumber,
        ExpMonth: req.body.ExpMonth,
        ExpYear: req.body.ExpYear,
        CardName: req.body.CardName,
        shipbill: req.body.shipbill,
        ShipFlag: req.body.ShipFlag,
        // Add other fields from the form data...
      };
      // console.log('at basket controller add: ', basketData);

      await basketModel.addBasket(basketData);
      res.redirect('/basket/basketslist');
    } catch (error) {
      res.status(500).json({ error: 'Error adding basket to the database.' });
    }
  },

  async updateBasket(req, res) {
    try {
      const basketData = {
        idBasket: req.params.id,
        Quantity: req.body.Quantity,
        idShopper: req.body.idShopper,
        OrderPlaced: req.body.OrderPlaced === 'on' ? 1 : 0, // Converting checkbox value to 1 or 0
        SubTotal: req.body.SubTotal,
        Total: req.body.Total,
        Shipping: req.body.Shipping,
        Tax: req.body.Tax,
        dtCreated: req.body.dtCreated,
        Promo: req.body.Promo,
        ShipFirstName: req.body.ShipFirstName,
        ShipLastName: req.body.ShipLastName,
        ShipAddress: req.body.ShipAddress,
        ShipCity: req.body.ShipCity,
        ShipState: req.body.ShipState,
        ShipZipCode: req.body.ShipZipCode,
        ShipPhone: req.body.ShipPhone,
        ShipFax: req.body.ShipFax,
        ShipEmail: req.body.ShipEmail,
        BillFirstName: req.body.BillFirstName,
        BillLastName: req.body.BillLastName,
        BillAddress: req.body.BillAddress,
        BillCity: req.body.BillCity,
        BillState: req.body.BillState,
        BillZipCode: req.body.BillZipCode,
        BillPhone: req.body.BillPhone,
        BillFax: req.body.BillFax,
        BillEmail: req.body.BillEmail,
        dtOrdered: req.body.dtOrdered,
        ShipProvince: req.body.ShipProvince,
        ShipCountry: req.body.ShipCountry,
        BillProvince: req.body.BillProvince,
        BillCountry: req.body.BillCountry,
        CardType: req.body.CardType,
        CardNumber: req.body.CardNumber,
        ExpMonth: req.body.ExpMonth,
        ExpYear: req.body.ExpYear,
        CardName: req.body.CardName,
        shipbill: req.body.shipbill,
        ShipFlag: req.body.ShipFlag,
        // Add other fields from the form data...
      };
    //   console.log('at basket controller update: ', basketData);

      await basketModel.updateBasket(basketData);
      res.redirect('/basket/basketslist');
    } catch (error) {
      res.status(500).json({ error: 'Error updating basket in the database.' });
    }
  },  


  async deleteBasket(req, res) {
    try {
      const basketId = req.params.id;
      await basketModel.deleteBasket(basketId);
      res.redirect('/basket/basketslist');
    } catch (error) {
      res.status(500).json({ error: 'Error deleting basket from the database.' });
    }
  },


};




export default basketController;
