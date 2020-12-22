


const dbService = require('../../services/db.service');
const userService =require('../user/user.service.js');
const ObjectId = require('mongodb').ObjectId



module.exports = {
    query,
    getById,
    add,
    remove,
    update
}


async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy);
    const collection = await dbService.getCollection('toys');
    try {
        const toys = await collection.find(criteria).toArray();
        return toys;
    } catch (err) {
        console.log('ERROR: cannot find toys');
        throw err;
    }
}



async function getById(toyId) {
    const collection = await dbService.getCollection('toys');
    try {
        const toy = await collection.findOne({ '_id': ObjectId(toyId) });
        return toy;
    } catch (err) {
        console.log('ERROR: cannot get toy id');
        throw err;
    }
}



async function add(toy) {
    const collection = await dbService.getCollection('toys');
    try {
        toy.createdAt = new Date();
        toy.inStock = true;
        await collection.insertOne(toy);
        return toy;
    } catch (err) {
        console.log('ERORR: cannot add toy');
        throw err;
    }
}


async function remove(toyId) {
    const collection = await dbService.getCollection('toys');
    try {
        await collection.deleteOne({ '_id': ObjectId(toyId) });
    } catch (err) {
        console.log('ERROR: could not delete toy');
        throw err;
    }
}


async function update(toy) {
    const collection = await dbService.getCollection('toys');
    toy._id = ObjectId(toy._id);
    try {
        await collection.updateOne({ _id: toy._id }, { $set: toy }); 
        return toy;
    } catch (err) {
        console.log(`ERROR: cannot update toy, id&&: ${toy.name}`);
    }
}






function _buildCriteria(filterBy) {
    const criteria = {};
    if (filterBy.txt) {
        criteria.name = filterBy.txt
    }
    if (filterBy.inStock) {
        criteria.inStock = true
    }
    return criteria;
}