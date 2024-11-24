import UsersModel, {User} from "../models/user.model";

export const create = async (payload: User): Promise<User> => {
    const result = await UsersModel.create(payload) 
    return result;
};

// export interface IFindAll {
//   query?: unknown;
//   limit: number;
//   page: number;
// }

export const findAll = async(query: any, limit: number = 10, page: number = 1): Promise<User[]> => {
    const result = await UsersModel.find(query).limit(limit).skip((page - 1) * limit).sort({createdAt: -1});
    return result;
};

export const findOne = async (id: string): Promise<User | null> => {
    const result = await UsersModel.findById(id);
    return result;
};

export const update = async (
    id: string,
    payload: User
): Promise<User | null> => {
    const result = await UsersModel.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
};

export const remove = async (id: string): Promise<User | null> => {
    const result = await UsersModel.findOneAndDelete({
        _id: id,
    });
    return result;
};