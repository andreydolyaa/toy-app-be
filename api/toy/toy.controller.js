const logger = require('../../services/logger.service')
const toyService = require('./toy.service.js');
const userService = require('../user/user.service.js');





module.exports = {
    getToys,
    getToy,
    addToy,
    removeToy,
    updateToy
}




async function getToys(req, res) {
    const toys = await toyService.query(req.query);
    logger.debug(toys);
    res.json(toys);
}


async function getToy(req, res) {
    const toy = await toyService.getById(req.params.id);
    logger.debug(toy);
    res.json(toy);
}


async function addToy(req, res) {
    const toy = await toyService.add(req.body);
    logger.debug(toy);
    res.json(toy);
}


async function removeToy(req, res) {
    const toy = await toyService.remove(req.params.id);
    logger.debug(toy);
    res.end()
}


async function updateToy(req, res) {
    const toy = req.body;
    await toyService.update(toy)
    res.json(toy)
}