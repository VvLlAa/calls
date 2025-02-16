import axios from 'axios';
import { Call } from "../types.ts";

export interface ApiResponse {
    results: Call[];
    [key: string]: unknown;
}

const grade = [
    { id: 0, status: 'Отлично' },
    { id: 1, status: 'Хорошо' },
    { id: 2, status: 'Плохо' },
];

const TOKEN = import.meta.env.VITE_API_TOKEN;

export const fetchCalls = async (params?: Record<string, unknown>): Promise<Call[]> => {
    try {
        const response = await axios.post<ApiResponse>(
            `https://api.skilla.ru/mango/getList?limit=${params?.limit}&date_start=${params?.date_start}&date_end=${params?.date_end}`,
            {},
            {
                headers: { Authorization: `Bearer ${TOKEN}` },
            }
        );

        const newStatus = response.data.results.map(item => ({
            ...item,
            status: grade[Math.floor(Math.random() * grade.length)]
        }));

        return newStatus;
    } catch (error) {
        console.error("Error fetching calls:", error);
        throw error;
    }
};


export const getRecord = async (record: string, partnershipId: string): Promise<string | null> => {
    try {
        const res = await axios.post(
            `https://api.skilla.ru/mango/getRecord?record=${record}&partnership_id=${partnershipId}`,
            {},
            {
                headers: {
                    Authorization: `Bearer ${TOKEN}`,
                    "Content-Type": "audio/mpeg",
                },
                responseType: "blob",
            }
        );

        return URL.createObjectURL(res.data);
    } catch (error) {
        console.error("Ошибка загрузки записи:", error);
        return null;
    }
};
