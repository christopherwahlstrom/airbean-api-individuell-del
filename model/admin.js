const nedb = require('nedb-promise');
const database = new nedb({ filename: './menu.db', autoload: true });


async function addToMenu(menu) {
    return await database.insert(menu);
}

async function removeFromMenu(id) {
    return await database.remove({ id: Number(id) });
}
module.exports = { addToMenu, removeFromMenu }