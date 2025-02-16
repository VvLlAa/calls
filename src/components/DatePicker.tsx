import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

interface DatePickerProps {
    onDateChange: (dates: { start_date?: string; end_date?: string }) => void;
}

const DatePickerComponent: React.FC<DatePickerProps> = ({ onDateChange }) => {
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    return (
        <div style={{ display: 'flex', gap: '10px' }}>
            <DatePicker
                selected={startDate}
                onChange={(date: Date | null) => {
                    setStartDate(date);
                    onDateChange({ start_date: date?.toISOString(), end_date: endDate?.toISOString() });
                }}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                placeholderText="Start date"
            />
            <DatePicker
                selected={endDate}
                onChange={(date: Date | null) => {
                    setEndDate(date);
                    onDateChange({ start_date: startDate?.toISOString(), end_date: date?.toISOString() });
                }}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate || undefined}
                placeholderText="End date"
            />
        </div>
    );
};

export default DatePickerComponent;