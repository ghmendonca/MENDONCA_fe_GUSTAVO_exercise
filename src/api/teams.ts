import { Team } from "types";
import { BaseApi } from "./base";

class TeamsApi extends BaseApi {
    constructor() {
        super('/teams');
    }

    public async getAll(): Promise<Team[]> {
        return super.fetch<Team[]>({
            method: 'GET'
        });
    }

    public async getById(id: string): Promise<Team> {
        return super.fetch<Team>({
            path: id,
            method: 'GET'
        });
    }
}

export default new TeamsApi();