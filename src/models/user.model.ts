import mongoose, {Types} from "mongoose";

export interface User{
    _id: Types.ObjectId;
    email: string;
    username: string;
    password: string;
    roles: string[];
    profilePicture: string;
}

const Schema = mongoose.Schema;

const UsersSchema = new Schema<User>(
    {
        email: {
            type: Schema.Types.String,
            required: true,
        },
        username: {
            type: Schema.Types.String,
            required: true,
        },
        password: {
            type: Schema.Types.String,
            required: true,
        },
        roles: {
            type: [Schema.Types.String],
            required: true,
        },
        profilePicture: {
            type: Schema.Types.String,
            required: true,
        }
    },
    {
        timestamps: true
    }
);

const UsersModel = mongoose.model("Users", UsersSchema, "users");

export default UsersModel;