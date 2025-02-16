export interface Call {
    in_out: number;
    date: string;
    person_name: string;
    status: { id: number; status: string };
    from_number: string;
    time: string;
    person_avatar: string;
    partner_data: {phone: string};
    record: string;
    partnership_id: string;
    extraData?: Record<string, unknown>;
}

