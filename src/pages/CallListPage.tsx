import { useState, useEffect } from 'react';
import { fetchCalls } from '../services/api';
import { Call } from "../types.ts";
import classes from "./CallListPage.module.css";
import Filters from '../components/filters/FilterPanel.tsx';
import CallTable from "../components/CallTable.tsx";

const CallListPage = () => {
    const [calls, setCalls] = useState<Call[]>([]);
    const [selectedType, setSelectedType] = useState<string>('Все типы');
    const [selectedDateRange, setSelectedDateRange] = useState<string>("3 дня");

    useEffect(() => {
        fetchCallsData();
    }, [selectedType, selectedDateRange]);

    const fetchCallsData = async (type = selectedType, range = selectedDateRange) => {
        const params = getDateRange(range);
        const data = await fetchCalls(params);

        const filteredCalls = data.filter((item: Call) =>
            type === 'Все типы' ? true : type === 'Входящие' ? item.in_out === 1 : item.in_out === 0
        );

        setCalls(filteredCalls);
    };

    const getDateRange = (range: string) => {
        const today = new Date();
        const fromDate = new Date();

        if (range.includes('-')) {
            const [start, end] = range.split(" - ");
            return { limit: 500, date_start: start, date_end: end };
        }

        switch (range) {
            case "Неделя":
                fromDate.setDate(today.getDate() - 7);
                break;
            case "Месяц":
                fromDate.setMonth(today.getMonth() - 1);
                break;
            case "Год":
                fromDate.setFullYear(today.getFullYear() - 1);
                break;
            default:
                fromDate.setDate(today.getDate() - 3);
        }

        return {
            limit: 500,
            date_start: fromDate.toISOString().split("T")[0],
            date_end: today.toISOString().split("T")[0],
        };
    };

    return (
        <div className={classes.callListPage}>
            <Filters
                selectedType={selectedType}
                setSelectedType={setSelectedType}
                selectedDateRange={selectedDateRange}
                setSelectedDateRange={setSelectedDateRange}
            />
            <CallTable
                calls={calls}
                setCalls={setCalls}
            />
        </div>
    );
};

export default CallListPage;
