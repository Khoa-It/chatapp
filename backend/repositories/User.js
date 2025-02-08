const { handelResponse } = require("../helper/mylib");
const { Users } = require("../models/User");

class UserRepository {
    constructor() {}

    async create(data) {
        try {
            const newUser = new Users(data);
            await newUser.save();
            return handelResponse(newUser, 'Created successful!', 'Created error!');
        } catch (error) {
            return handelResponse(null, '', 'Created error!');
        }
    }

    async delete(id) {
        try {
            const result = await Users.deleteOne({ id });
            return handelResponse(result, 'Deleted user successfully', 'No user deleted');
        } catch (error) {
            return handelResponse(null, '', 'Deleted error!');
        }
    }

    async update(id, updateInfo) {
        try {
            const user = await Users.findOneAndUpdate(
                { id },
                { $set: updateInfo },
                { new: true }
            );
            return handelResponse(user, 'Updated user successfully', 'No user updated');
        } catch (error) {
            return handelResponse(null, '', 'Updated error!');
        }
    }

    async getByEmailAndPassword(param) {
        try {
            const user = await Users.findOne(param);
            return handelResponse(user, 'Get user successful', 'User does not exist!');
        } catch (error) {
            return handelResponse(null, '', 'Get user error!');
        }
    }

    async getByEmail(email) {
        try {
            const user = await Users.findOne({ email });
            return handelResponse(user, 'Get user successful', 'User does not exist!');
        } catch (error) {
            return handelResponse(null, '', 'Get user error!');
        }
    }
}

module.exports = { UserRepository };
