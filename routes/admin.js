const { Router } = require('express'); 
const router = Router();

const { addToMenu, removeFromMenu } = require('../model/admin');

const { auth } = require('./keys');



router.post('/', auth, async (req, res) => {
    const menu = req.body;

    if(menu.hasOwnProperty('id') && menu.hasOwnProperty('title') && menu.hasOwnProperty('desc') && menu.hasOwnProperty('price')) {
        const menus = await addToMenu(menu);

        const resObj = {
            success: true,
            menus: menus
        }

        res.json(resObj);
    }   else {
        const resObj = {
            success: false,
            message: 'Missing parameters to add to menu'
        }

        res.status(400).json(resObj);
    }
});

router.delete('/:id', auth, async (req, res) => {
    const id = req.params.id;
    console.log('ID: ', typeof id);

     const menu = await removeFromMenu(id);

     const resObj = {
         success: true,
         message: 'Menu item removed',
         menu: menu
        }     
    res.json(resObj);

});
    

module.exports = router;
