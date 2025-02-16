import { useState } from "react";
import downArrow from "../../assets/downArrow.svg";
import openArrow from "../../assets/openArrow.svg";
import classes from "./FilterTypeSelector.module.css"
import xSvg from "../../assets/x.svg";

interface FilterTypeSelectorProps {
    selectedType: string;
    setSelectedType: (type: string) => void;
}

const FilterTypeSelector = ({ selectedType, setSelectedType }: FilterTypeSelectorProps) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleTypeClick = (type: string) => {
        setSelectedType(type);
        setIsDropdownOpen(false);
    };

    const handleResetFilters = () => {
        setSelectedType("Все типы");
    };

    return (
        <div className={classes.selectedType}>
            <div
                className={classes.allType}
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
                {selectedType}
                <img src={!isDropdownOpen ? downArrow : openArrow} alt="стрелка" />
            </div>
            {isDropdownOpen && (
                <div className={classes.dropdown}>
                    {["Все типы", "Исходящие", "Входящие"].map((type) => (
                        <div
                            key={type}
                            onClick={() => handleTypeClick(type)}
                            className={`${classes.dropdownContent} ${selectedType === type ? classes.active : ''}`}
                        >
                            {type}
                        </div>
                    ))}
                </div>
            )}
            {selectedType !== 'Все типы' && (
                <div className={classes.resetFilter} onClick={handleResetFilters}>
                    Сбросить фильтры <img src={xSvg} alt="" />
                </div>
            )}
        </div>
    );
};

export default FilterTypeSelector;
