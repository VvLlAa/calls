import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import classes from "./DateRangePicker.module.css";
import downArrow from "../../assets/downArrow.svg";
import date from "../../assets/date.svg";

interface DateRangePickerProps {
    selectedDateRange: string;
    setSelectedDateRange: (range: string) => void;
}

const DateRangePicker = ({ selectedDateRange, setSelectedDateRange }: DateRangePickerProps) => {
    const [isDateDropdownOpen, setIsDateDropdownOpen] = useState(false);
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const handleDateSelection = (range: string) => {
        setSelectedDateRange(range);
        setIsDateDropdownOpen(false);
    };

    useEffect(() => {
        if (startDate && endDate) {
            setSelectedDateRange(`${startDate.toISOString().split("T")[0]} - ${endDate.toISOString().split("T")[0]}`);
            setIsDateDropdownOpen(false);
        }
    }, [startDate, endDate, setSelectedDateRange]);

    return (
        <div className={classes.dateFilter}>
            <div
                className={classes.dateSelector}
                onClick={() => setIsDateDropdownOpen(!isDateDropdownOpen)}
                style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
            >
                <img src={downArrow} alt="стрелка" className={classes.arrowIconLeft} />
                <div className={classes.date}><img src={date} alt=""/>{selectedDateRange}</div>
                <img src={downArrow} alt="стрелка" className={classes.arrowIconRight} />
            </div>

            {isDateDropdownOpen && (
                <div className={classes.dateDropdown}>
                    {["3 дня", "Неделя", "Месяц", "Год"].map((range) => (
                        <div
                            key={range}
                            onClick={() => handleDateSelection(range)}
                            className={`${classes.dropdownContent} ${selectedDateRange === range ? classes.active : ''}`}
                        >
                            {range}
                        </div>
                    ))}

                    <div className={classes.indicateTheDate}>Указать даты:</div>
                    <div className={`${classes.blockInputs}`}>
                        <DatePicker
                            selected={startDate}
                            onChange={(date: Date | null) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="dd.MM.yyyy"
                            placeholderText="__.__.____"
                            className={classes.customDatepicker}
                        />
                        -
                        <DatePicker
                            selected={endDate}
                            onChange={(date: Date | null) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="dd.MM.yyyy"
                            placeholderText="__.__.____"
                            className={classes.customDatepicker}
                        />
                        <img src={date} alt=""/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DateRangePicker;
