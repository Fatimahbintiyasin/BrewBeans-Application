// controllers/webController.js
import productModel from '../models/productModel.js';
import Settings from '../models/settingsModel.js';

const webController = {

    homePage(req, res) {
        try {
            res.render('index', { title: 'Home', page: 'web/home', displayName: 'User'});

        } catch (error) {
            res.status(500).json({ error: 'Error loading home page.' });
        }
    },

    aboutPage(req, res) {
        try {
            res.render('index', { title: 'About', page: 'web/about', displayName: 'User'});

        } catch (error) {
            res.status(500).json({ error: 'Error loading about page.' });
        }
    },

    contactPage(req, res) {
        try {
            res.render('index', { title: 'Contact', page: 'web/contact', displayName: 'User'});

        } catch (error) {
            res.status(500).json({ error: 'Error loading contact page.' });
        }
    },



    resetPage(req, res) {
        try {
            res.render('index', { title: 'Reset', page: 'web/reset', displayName: 'User'});

        } catch (error) {
            res.status(500).json({ error: 'Error loading contact page.' });
        }
    },


    async resetDatabase(req, res) {   
        // console.log('at web controller reset database');

        try {
            await Settings.setupDatabase();
            res.redirect('/home');
        } catch (error) {
            res.status(500).json({ error: 'Error resetting database.' });
        }
    }

};


export default webController;