const { FriendshipRepository } = require("../repositories/Friendship");

class FriendshipController {
    constructor(parameters) {
        this.repository = new FriendshipRepository();
    }
    
    async create(body){
        const {sender_id, status} = body;
        if( !sender_id || !status) return null;
        const res = await this.repository.create(body);
        return res;
    }

    async update(id, body){
        const { sender_id, status} = body;
        if(!id || !sender_id || !status) return null; 
        const res = await this.repository.update(id, body);
        return res;
    }

    async delete(id){
        if(!id) return null;
        const res = await this.repository.delete(id);
        return res;
    }

    async get(id){
        if(!id) return null;
        const res = await this.repository.get(id);
        return res;
    }

    async getRelations(userId){
        if (!userId) return null;
        return await this.repository.getRelation(userId);
    }
}

module.exports = {FriendshipController};