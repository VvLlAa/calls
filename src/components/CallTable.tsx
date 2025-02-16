import CallCard from './CallCard';
import { Call } from "../types.ts";
import classes from "./CallTable.module.css";
import React, {useState} from "react";
import downArrow from "../assets/downArrow.svg"
import openArrow from "../assets/openArrow.svg"

interface CallTableProps {
    calls: Call[];
    setCalls: React.Dispatch<React.SetStateAction<Call[]>>;
}

const CallTable = ({ calls, setCalls }: CallTableProps) => {
    const [isAscending, setIsAscending] = useState(true);

    const sortDuration = () => {
        setCalls((prevCalls : Call[]) => {
            const sort = [...prevCalls].sort((a,b) =>
                !isAscending ? Number(a.time) - Number(b.time) : Number(b.time) - Number(a.time)
            )
            return sort
        })
        setIsAscending((prev) => !prev);
    }
    return (
        <div className={classes.table}>
            <table>
                <thead>
                    <tr>
                        <th>Тип</th>
                        <th>
                            Время
                            <img src={downArrow} alt="" className={classes.arrow}/>
                        </th>
                        <th>Сотрудник</th>
                        <th>Звонок</th>
                        <th>Источник</th>
                        <th className={classes.grade}>
                            <div>Оценка</div>
                            <div onClick={sortDuration}>
                                Длительность
                                <img src={isAscending ? downArrow : openArrow} alt="" className={classes.arrow}/>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                {calls.length > 0 ? (
                    calls.map((call, i) => <CallCard key={i} call={call} />)
                ) : (
                    <tr>
                        <td colSpan={6} style={{textAlign: "center", padding: "10px"}}>
                            Загрузка данных...
                        </td>

                    </tr>
                )}
                </tbody>
            </table>
        </div>
    );
};

export default CallTable;
