const { Router } = require('express'); 
const router = Router();



const apiKeys = [
    '7BTxHCyHhzIME5TI',
    'ngfeNG1iaq9Q2PJK',
    'zaCmZA74PLKCrD8Y',
    'KwOi5vm2TYNmi8Dd',
    'edVCa1E6zDZRztaq'
];

function auth(req, res, next) {
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
}

router.get('/key', (req, res) => {
    console.log('--I api/key--');
    const index = Math.floor(Math.random() * apiKeys.length);
    const apiKey = apiKeys[index];

    const resObj = {
        key: apiKey
    }

    res.json(resObj);
});

module.exports = { router, auth };