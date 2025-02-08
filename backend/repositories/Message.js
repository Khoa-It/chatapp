const { handelResponse } = require("../helper/mylib");
const { Messages } = require("../models/Message");

class MessageRepository {
    constructor(parameters) {
        
    }

    async create(data) {
        try {
            const newMessage = new Messages(data);
            await newMessage.save();
            return handelResponse(newMessage, 'Created successful!', 'Created error!');
        } catch (error) {
            console.error(error);
            return handelResponse(null, '', 'Created error!');
        }
    }

    async delete(id) {
        try {
            const result = await Messages.deleteOne({ _id: id });
            return handelResponse(result, 'Deleted message successfully', 'No message deleted');
        } catch (error) {
            console.error(error);
            return handelResponse(null, '', 'Deleted error!');
        }
    }

    async update(id, updateInfo) {
        try {
            const message = await Messages.findOneAndUpdate(
                { id },
                { $set: updateInfo },
                { new: true }
            );
            return handelResponse(message, 'Updated message successfully', 'No message updated');
        } catch (error) {
            console.error(error);
            return handelResponse(null, '', 'Updated error!');
        }
    }

    async get(id) {
        try {
            const messages = await Messages.findOne({id});
            return handelResponse(messages, 'get successful', 'get error')
        } catch (error) {
            console.error(error);
            return handelResponse(null, '', 'get error!');
        }
    }
    async getByRoom(room_id){
        try {
            const messages = await Messages.findOne({room_id});
            return handelResponse(messages, 'get list messages success', 'get error message');
        } catch (error) {
            console.error(error);
            return handelResponse(null, '', 'get error');
        }
    }

    async deleteByRoomId(room_id){
        try {
            const result = await Messages.deleteMany({room_id});
            return handelResponse(result, 'Perform successful', 'Perform error');
        } catch (error) {
            console.error(error);
            return handelResponse(null, '', 'Have error');
        }
    }

}

module.exports = {MessageRepository};