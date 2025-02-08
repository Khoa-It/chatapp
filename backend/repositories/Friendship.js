const { Friendships } = require("../models/Friendship");

class FriendshipRepository {
    constructor(parameters) {
        
    }

    handleResponse(result, successMessage, errorMessage) {
        if (result) {
            return {
                data: result,
                mes: successMessage,
            };
        } else {
            return {
                data: null,
                mes: errorMessage,
            };
        }
    }

    async create(data) {
        try {
            const newFriendship = new Friendships(data);
            await newFriendship.save();
            return this.handleResponse(newFriendship, 'Created successful!', 'Created error!');
        } catch (error) {
            console.error(error);
            return this.handleResponse(null, '', 'Created error!');
        }
    }

    async delete(id) {
        try {
            const result = await Friendships.deleteOne({ id });
            return this.handleResponse(result, 'Deleted friendship successfully', 'No friendship deleted');
        } catch (error) {
            console.error(error);
            return this.handleResponse(null, '', 'Deleted error!');
        }
    }

    async update(id, updateInfo) {
        try {
            const friendship = await Friendships.findOneAndUpdate(
                { id },
                { $set: updateInfo },
                { new: true }
            );
            return this.handleResponse(friendship, 'Updated friendship successfully', 'No friendship updated');
        } catch (error) {
            console.error(error);
            return this.handleResponse(null, '', 'Updated error!');
        }
    }

    async get(id) {
        try {
            const friendship = await Friendships.findOne({id});
            return this.handleResponse(friendship, 'get successful', 'get error')
        } catch (error) {
            console.error(error);
            return this.handleResponse(null, '', 'get error!');
        }
    }
}
module.exports = {FriendshipRepository};