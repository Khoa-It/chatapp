const { handelResponse } = require("../helper/mylib");
const { FriendshipRepository } = require("../repositories/Friendship");

class FriendshipController {
    constructor(parameters) {
        this.repository = new FriendshipRepository();
    }
    
    async create(body){
        const {sender_id, status} = body;
        if( !sender_id || !status) return handelResponse(null, '', 'Missing property');
        const res = await this.repository.create(body);
        return handelResponse(res, 'created successful', 'created error');
    }

    async update(id, body){
        const { sender_id, status} = body;
        if(!id || !sender_id || !status) return handelResponse(null, '', 'Missing property');
        const res = await this.repository.update(id, body);
        return handelResponse(res, 'update successful', 'update error');
    }

    async delete(id){
        if(!id) return handelResponse(null, '', 'Missing property');
        const res = await this.repository.delete(id);
        return handelResponse(res, 'update successful', 'update error');
    }

    async get(id){
        if(!id) return handelResponse(null, '', 'Missing property');
        const res = await this.repository.get(id);
        return handelResponse(res, 'get successful', 'get error');
    }
}

module.exports = {FriendshipController};