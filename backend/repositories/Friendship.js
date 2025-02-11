const { idIncludes } = require("../helper/mylib");
const { Friendships } = require("../models/Friendship");

class FriendshipRepository {
    constructor(parameters) {
        
    }

    async create(data) {
        try {
            const newFriendship = new Friendships(data);
            await newFriendship.save();
            return newFriendship;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async delete(id) {
        try {
            const result = await Friendships.deleteOne({ id });
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async update(id, updateInfo) {
        try {
            const friendship = await Friendships.findOneAndUpdate(
                { id },
                { $set: updateInfo },
                { new: true }
            );
            return friendship;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async get(id) {
        try {
            const friendship = await Friendships.findOne({id});
            return friendship;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    

    async getRelation(userId){
        try {
            const friendship = await Friendships.find({});
            return friendship.filter(item => idIncludes(item.id, userId));
        } catch (error) {
            return null;
        }
    }
}
module.exports = {FriendshipRepository};