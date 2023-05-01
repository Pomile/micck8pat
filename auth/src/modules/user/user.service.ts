import { User } from "../../database/models";
import ErrorHandler from "../../exception/errorHandler";

class UserService {

    /**
     * @description Create a user
     * @param {object} data
     * @returns {object}
     */

    static async createUser (data) {
        let user = await User.findOne({ where: { email: data.email } });
        if(user) throw new ErrorHandler('Email already exists', 422, {})
        user = await User.create(data);
        return user;
    }

    static async updateUserProfile(data, auth) {
        const profile = await User.findOne({
           where: { id: auth.id}
        
        });
        if(!profile) throw new ErrorHandler('User not found', 404, {})
        await profile.update(data);
        return profile;
    }

    static async getUserProfile(auth) {
        const profile = await User.findOne({
            where: { id: auth.id}
        });
        return profile;
    }
}
export default UserService
