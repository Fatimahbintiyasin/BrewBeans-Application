import basketStatusModel from '../models/basketStatusModel.js';

const basketStatusController = {

    async basketStatusAddPage(req, res) {
    try {
        const basketId = req.params.id;
        // console.log('basketStatusController - basketStatusAddPage' , basketId);

        const today = new Date().toISOString().split('T')[0]; // Get today's date
        const updatedBasketStatus = {
            idBasket: basketId,
            idStatus: 0,
            idStage: 3,
            dtStage: today,
            Notes: '',
            shipper: '',
            ShippingNum: ''
        };
        res.render('index', { title: 'Basket Status Update', page: 'basketStatus/basketstatusadd', basketStatus: updatedBasketStatus });
    } catch (error) {
        res.status(500).json({ error: 'Error displaying update basket data.' });
    }
    },

    async basketStatusListViewPage(req, res) {
    try {

        const basketId = req.params.id;

        let basketStatusList = await basketStatusModel.getBasketStatusListById(basketId);

        console.log('basketStatusController - basketStatusListViewPage');
        
        res.render('index', { title: 'Basket Status', page: 'basketStatus/basketStatusListView', basketStatusList: basketStatusList, idBasket: basketId });
        } catch (error) {
        res.status(500).json({ error: 'Error fetching basket status from the database.' });
        }
    },

    async basketStatusAdd(req, res) {
        try {
            const basketStatusData = {
                idBasket: req.body.idBasket, idStatus: req.body.idStatus, 
                idStage: req.body.idStage,  dtStage: req.body.dtStage, 
                Notes: req.body.Notes,  shipper: req.body.shipper,
                ShippingNum: req.body.ShippingNum
            };

            // const basketId = req.params.id;
            // const today = new Date().toISOString().split('T')[0]; // Get today's date
            await basketStatusModel.basketStatusAdd(basketStatusData);
            res.redirect(`/basketstatuslist/${basketStatusData.idBasket}`);
            
            console.log('basketStatusController - basketStatusAdd ', basketStatusData.idBasket);

        } catch (error) {
            console.error('Error updating or adding basket status:', error);
            res.status(500).json({ error: 'Error updating or adding basket status.' });
        }
    },


};

export default basketStatusController;
