export interface Match {
    id: number;
    awayTeamName: string;
    date: Date;
    homeTeamName: string;
    matchday: number;
    odds: any;
    status: 'SCHEDULED' | 'CANCELED' | 'TIMED' | 'IN_PLAY' | 'POSTPONED' | 'FINISHED';
}

