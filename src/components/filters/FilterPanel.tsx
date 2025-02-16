import classes from "./FilterPanel.module.css";
import 'react-datepicker/dist/react-datepicker.css';
import FilterTypeSelector from "./FilterTypeSelector.tsx";
import DateRangePicker from "./DateRangePicker.tsx";

interface IFilterPanelProps {
    selectedType: string;
    setSelectedType: (type: string) => void;
    selectedDateRange: string;
    setSelectedDateRange: (dateRange: string) => void;
}

const FilterPanel = ({ selectedType, setSelectedType, selectedDateRange, setSelectedDateRange } : IFilterPanelProps) => {
    return (
        <div className={classes.header}>
            <FilterTypeSelector
                selectedType={selectedType}
                setSelectedType={setSelectedType}
            />

            <DateRangePicker
                selectedDateRange={selectedDateRange}
                setSelectedDateRange={setSelectedDateRange}
            />
        </div>
    );
};

export default FilterPanel;
