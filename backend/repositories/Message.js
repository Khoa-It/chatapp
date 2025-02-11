const {  } = require("../helper/mylib");
const { Messages } = require("../models/Message");

class MessageRepository {
    constructor(parameters) {
        
    }

    async create(data) {
        try {
            const newMessage = new Messages(data);
            await newMessage.save();
            return newMessage;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async delete(id) {
        try {
            const result = await Messages.deleteOne({ _id: id });
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async update(id, updateInfo) {
        try {
            const message = await Messages.findOneAndUpdate(
                { id },
                { $set: updateInfo },
                { new: true }
            );
            return message;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async get(id) {
        try {
            const messages = await Messages.findOne({id});
            return messages;
        } catch (error) {
            console.log(error);
            return null;
        }
    }
    async getByRoom(room_id){
        try {
            const messages = await Messages.findOne({room_id});
            return messages;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async deleteByRoomId(room_id){
        try {
            const result = await Messages.deleteMany({room_id});
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getAllRoomWithUserId(userId){
        try {
            let result = await Messages.find({});
            result = result.filter(item => item.room_id.includes(userId));
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

}

module.exports = {MessageRepository};