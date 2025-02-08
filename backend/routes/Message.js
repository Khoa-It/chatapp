const express = require('express');
const { response } = require('../responses/api');
const { MessageController } = require('../controllers/Message');
const messageRouter = express.Router();

const controller = new MessageController();

messageRouter.post('/', async (req,res) => {
    const data = await controller.create(req.body);
    return response(res,data);
})

messageRouter.put('/:id', async (req,res) => {
    const {id} = req.params;
    const data = await controller.update(id, req.body);
    return response(res,data);
});

messageRouter.get('/:room_id', async (req,res) => {
    const {room_id} = req.params;
    const data = await controller.getByRoom(room_id);
    return response(res,data);
})

messageRouter.delete('/:id', async (req,res) => {
    const {id} = req.params;
    const data = await controller.delete(id);
    return response(res,data);
})

messageRouter.delete('/room/:room_id', async (req,res) => {
    const {room_id} = req.params;
    const data = await controller.deleteByRoom(room_id);
    return response(res,data);
})

module.exports = {messageRouter};