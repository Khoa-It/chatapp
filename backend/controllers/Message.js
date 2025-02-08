const { handelResponse } = require("../helper/mylib");
const { MessageRepository } = require("../repositories/Message");

class MessageController {
    constructor(parameters) {
        this.repository = new MessageRepository();
    }
    
    async create(body){
        const {room_id, content, sender_id} = body;
        if(!room_id || !content || !sender_id) return handelResponse(null, '', 'Missing property');
        const res = await this.repository.create(body);
        return handelResponse(res, 'created successful', 'created error');
    }

    async update(id, body){
        const {room_id, content, sender_id} = body;
        if(!id || !room_id || !content || !sender_id) return handelResponse(null, '', 'Missing property');
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

    async getByRoom(room_id){
        if(!room_id) return handelResponse(null, '', 'Missing property');
        const res = await this.repository.getByRoom(room_id);
        return handelResponse(res, 'get successful', 'get error');
    }

    async deleteByRoom(room_id){
        if(!room_id) return handelResponse(null, '', 'Missing property');
        const res = await this.repository.deleteByRoomId(room_id);
        return handelResponse(res, 'delete successful', 'delete error');
    }
}

module.exports = {MessageController};