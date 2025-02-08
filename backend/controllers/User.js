const { UserRepository } = require("../repositories/User");

class UserController {
    constructor (){
        this.repository = new UserRepository();
    }

    handleResponse = (message) => {
        return {
            data: null,
            mes: message,
        };
    }

    async create (req, res){
        const {username, email, password} = req.body;
        if (!username || !email || !password) return this.handleResponse('Invalid account info!');
        const checkExist = await this.repository.getByEmail(email);
        if (checkExist.data != null) return this.handleResponse('Account already exists!');
        return await this.repository.create(req.body);
    }
    
    async getByEmailAndPassword(param){
        if (!param || !param.email || !param.password) 
            return this.handleResponse('Email and password are required!');
        return await this.repository.getByEmailAndPassword(param);
    }

    async delete(id){
        if(!id) return this.handleResponse('User ID is required!');
        return await this.repository.delete(id);
    }

    async update(id, updateInfo){
        if(!id || !updateInfo) return this.handleResponse('User ID and info is required!');
        return await this.repository.update(id, updateInfo);
    }

}
module.exports = {UserController};