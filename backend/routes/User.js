const express = require('express');
const userRouter = express.Router();
const { UserController } = require('../controllers/User');
const { response } = require("../responses/api");

const userController = new UserController();

userRouter.post('/create',async (req, res) => {
    const data = await userController.create(req, res);
    return response(res,data);
})

userRouter.put('/:id', async (req,res) => {
    const {id} = req.params;
    const data = await userController.update(id, req.body);
    return response(res,data);
})

userRouter.delete('/:id', async (req,res) => {
    const {id} = req.params;
    const data = await userController.delete(id);
    return response(res,data);
})

userRouter.post('/login', async (req,res) => {
    const data = await userController.getByEmailAndPassword(req.body);
    return response(res,data);
})

userRouter.post('/others', async (req, res) => {
    const arrId = req.body.arrId;
    if (!arrId || !Array.isArray(arrId)) {
        return response(res, null);
    }
    const data = await userController.getListUserById(arrId);
    return response(res, data);
})

userRouter.get('/all', async (req, res) => {
    const data = await userController.getAll();
    return response(res, data);
})

module.exports = {userRouter};
