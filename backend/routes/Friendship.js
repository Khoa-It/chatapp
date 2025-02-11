const express = require('express');
const { FriendshipController } = require('../controllers/Friendship');
const { response } = require('../responses/api');
const friendshipRouter = express.Router();

const controller = new FriendshipController();

friendshipRouter.post('/', async (req, res)=> {
    const data = await controller.create(req.body);
    return response(res, data);
})

friendshipRouter.get('/:id', async (req, res)=> {
    const {id} = req.params;
    const data = await controller.get(id);
    return response(res, data);
})

friendshipRouter.put('/:id', async (req, res)=> {
    const {id} = req.params;
    const data = await controller.update(id,req.body);
    return response(res, data);
})

friendshipRouter.delete('/:id', async (req, res)=> {
    const {id} = req.params;
    const data = await controller.delete(id);
    return response(res, data);
})

friendshipRouter.get('/relationships/:userId', async (req, res)=> {
    const {userId} = req.params;
    const data = await controller.getRelations(userId);
    return response(res, data);
})

module.exports = {friendshipRouter};