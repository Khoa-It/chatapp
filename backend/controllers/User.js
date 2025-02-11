const { UserRepository } = require("../repositories/User");

class UserController {
    constructor (){
        this.repository = new UserRepository();
    }

    
    async create (req, res){
        const {username, email, password} = req.body;
        if (!username || !email || !password) return null;
        const checkExist = await this.repository.getByEmail(email);
        if (checkExist != null) return null;
        return await this.repository.create(req.body);
    }
    
    async getByEmailAndPassword(param){
        if (!param || !param.email || !param.password) 
            return null;
        return await this.repository.getByEmailAndPassword(param);
    }

    async delete(id){
        if(!id) return null;
        return await this.repository.delete(id);
    }

    async update(id, updateInfo){
        if(!id || !updateInfo) return null;
        return await this.repository.update(id, updateInfo);
    }

    async getListUserById(arrId){
        return await this.repository.getListUserById(arrId);
    }

    async getAll(){
        return await this.repository.getAll();
    }

}
module.exports = {UserController};