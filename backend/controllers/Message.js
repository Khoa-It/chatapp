const {  } = require("../helper/mylib");
const { MessageRepository } = require("../repositories/Message");

class MessageController {
    constructor(parameters) {
        this.repository = new MessageRepository();
    }
    
    async create(body){
        const {room_id, content, sender_id} = body;
        if(!room_id || !content || !sender_id) return null;
        return await this.repository.create(body);
    }

    async update(id, body){
        const {room_id, content, sender_id} = body;
        if(!id || !room_id || !content || !sender_id) return null;
        return await this.repository.update(id, body);
    }

    async delete(id){
        if(!id) return null;
        return await this.repository.delete(id);
    }

    async get(id){
        if(!id) return null;
        return await this.repository.get(id);
    }

    async getByRoom(room_id){
        if(!room_id) return null;
        return await this.repository.getByRoom(room_id);
    }

    async deleteByRoom(room_id){
        if(!room_id) return null;
        return await this.repository.deleteByRoomId(room_id);
    }

    async getAllRoom(userId){
        if(!userId) return null;
        return await this.repository.getAllRoomWithUserId(userId);        
    }
}

module.exports = {MessageController};