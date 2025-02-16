import {Call} from "../types.ts";
import classes from "./CallCard.module.css"
import svg0 from "../assets/0.svg"
import svg1 from "../assets/1.svg"
import {AudioPlayer} from "./audio/AudioPlayer.tsx";
import {useState} from "react";

interface CallCardProps {
    call: Call;
}

const CallCard: React.FC<CallCardProps> = ({ call }) => {
    const [isHovered, setIsHovered] = useState(false);

    const formatTime = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
    };

    return (
        <tr
            className={classes.callCard}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <td className={classes.tdInOut}>
                {call.in_out === 0
                    ? <img src={svg0} alt="0"/>
                    : <img src={svg1} alt="1"/>
                }
            </td>
            <td className={classes.tdDate}>{call.date.split(' ')[1].slice(0, 5)}</td>
            <td className={classes.tdPersonName}>
                <img src={call.person_avatar} alt=""/>
            </td>
            <td className={classes.tdStatus}>+{call.partner_data.phone}</td>
            <td className={classes.tdFromNumber}>{call.from_number}</td>
            <td className={classes.tdGrade}>
                <div className={call.status.id === 0
                    ? classes.statusGreat
                    : call.status.id === 1
                        ? classes.statusFine
                        : call.status.id === 2
                            ? classes.statusBadly
                            : ''
                }>
                    {call.status.status}
                </div>
                <div className={classes.tdTime} >
                   {isHovered && <AudioPlayer record={call.record} partnershipId={call.partnership_id} time={formatTime(Number(call.time))}/> || formatTime(Number(call.time))}
                </div>
            </td>

        </tr>
    );
};

export default CallCard;