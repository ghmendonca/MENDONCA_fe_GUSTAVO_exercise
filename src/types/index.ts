export interface Team {
    id: string;
    name: string;
}

export interface TeamOverview extends Team {
    teamLeadId: string;
    teamMemberIds: string[];
}

export interface TeamData {
    id: string;
    name: string;
    teamLead: UserData;
    teamMembers: UserData[];
}

export interface UserData {
    id: string;
    firstName: string;
    lastName: string;
    displayName: string;
    location: string;
    avatar: string;
}

export interface Id {
    id: string;
}