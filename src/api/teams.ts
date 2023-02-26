import {Team, TeamData, TeamOverview} from 'types';
import {BaseApi} from './base';
import userApi from './users';

class TeamsApi extends BaseApi {
    constructor() {
        super('/teams');
    }

    public async getAll(): Promise<Team[]> {
        return super.fetch<Team[]>({
            method: 'GET',
        });
    }

    public async getById(id: string): Promise<TeamData> {
        const team = await super.fetch<TeamOverview>({
            path: id,
            method: 'GET',
        });

        const [teamLead, teamMembers] = await Promise.all([
            userApi.getUserById(team.teamLeadId),
            Promise.all(team.teamMemberIds.map((userId) => userApi.getUserById(userId))),
        ]);

        return {
            id: team.id,
            name: team.name,
            teamLead,
            teamMembers,
        };
    }
}

export default new TeamsApi();