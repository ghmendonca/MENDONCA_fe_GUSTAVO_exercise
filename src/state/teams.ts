import {teamsApi} from 'api';
import {useQuery} from 'utils/useQuery';

export const useTeams = () => {
    return useQuery(() => teamsApi.getAll());
};

export const useTeam = (teamId: string) => {
    return useQuery(() => teamsApi.getById(teamId));
};