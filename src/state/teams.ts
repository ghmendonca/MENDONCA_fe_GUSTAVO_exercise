import {useQuery} from 'utils/useQuery';
import teamsApi from '../api/teams';

export const useTeams = () => {
    return useQuery(() => teamsApi.getAll());
};

export const useTeam = (teamId: string) => {
    return useQuery(() => teamsApi.getById(teamId));
};