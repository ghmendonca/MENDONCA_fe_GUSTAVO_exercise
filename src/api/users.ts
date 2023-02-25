import { UserData } from "types";
import { BaseApi } from "./base";

class UsersApi extends BaseApi {
    constructor() {
        super('/users');
    }

    public async getUserById(id: string): Promise<UserData> {
        return super.fetch<UserData>({
            path: id,
            method: 'GET'
        });
    }
}

export default new UsersApi();