export interface Query {
    text: string;
    values: number[]
}

export interface CreateHistory {
    user_id: number,
    action: string
}