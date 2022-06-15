const { Router } = require('express'); 
const router = Router();

const { addToMenu, removeFromMenu } = require('../model/admin');


const apiKeys = [
    '7BTxHCyHhzIME5TI',
    'ngfeNG1iaq9Q2PJK',
    'zaCmZA74PLKCrD8Y',
    'KwOi5vm2TYNmi8Dd',
    'edVCa1E6zDZRztaq'
];

router.use((req, res, next) => {
    console.log('--I middleware--');
    console.log(`Middleware: ${req.url}`);
    console.log(`API key: ${JSON.stringify(req.headers['api-key'])}`);
    const apiKey = req.headers['api-key'];


    if (apiKey && apiKeys.includes(apiKey)) {
        next();
    }   else {
        const resObj = {
            error: 'Access denied!!'
        }

        res.json(resObj);
    }
});


router.get('/key', (req, res) => {
    console.log('--I api/key--');
    const index = Math.floor(Math.random() * apiKeys.length);
    const apiKey = apiKeys[index];

    const resObj = {
        key: apiKey
    }

    res.json(resObj);
});


router.post('/', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    
    console.log('ID: ', typeof id);
    const menu = await removeFromMenu(id);

    const resObj = {
        success: true,
    }
        res.json(resObj);



});

module.exports = router;
