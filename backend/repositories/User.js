const { handelResponse } = require("../helper/mylib");
const { Users } = require("../models/User");

class UserRepository {
    constructor() {}

    async create(data) {
        try {
            const newUser = new Users(data);
            await newUser.save();
            return newUser;
        } catch (error) {
            return null;
        }
    }

    async delete(id) {
        try {
            const result = await Users.deleteOne({ id });
            return result;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async update(id, updateInfo) {
        try {
            const user = await Users.findOneAndUpdate(
                { id },
                { $set: updateInfo },
                { new: true }
            );
            return user;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getByEmailAndPassword(param) {
        try {
            const user = await Users.findOne(param);
            return user;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getByEmail(email) {
        try {
            const user = await Users.findOne({ email });
            return user;
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getListUserById(arrId) {
        try {
            return await Users.find({id: {$in: arrId}});
        } catch (error) {
            console.log(error);
            return null;
        }
    }

    async getAll(){
        try {
            return await Users.find({});
        } catch (error) {
            return null;
        }
    }
}

module.exports = { UserRepository };
