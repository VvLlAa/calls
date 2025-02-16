import { getRecord } from "../../services/api";
import classes from "./AudioPlayer.module.css";
import play from "../../assets/play.svg";
import stop from "../../assets/stop.svg";
import frame from "../../assets/frame.svg";
import close from "../../assets/close.svg";
import { useRef, useState } from "react";

type AudioPlayerProps = {
    time: string;
    record: string;
    partnershipId: string;
};

export const AudioPlayer = ({ time, record, partnershipId }: AudioPlayerProps) => {
    const [audioUrl, setAudioUrl] = useState<string | null>(null);
    const [progress, setProgress] = useState(0);
    const [duration, setDuration] = useState(0);
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    const handleGetRecord = async () => {
        const url = await getRecord(record, partnershipId);
        if (url) {
            setAudioUrl(url);
            setTimeout(() => {
                if (audioRef.current) {
                    audioRef.current.src = url;
                    audioRef.current.play();
                    setIsPlaying(true);
                }
            }, 100);
        }
    };

    const handlePlayPause = () => {
        if (!audioRef.current) return;
        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play();
        }
        setIsPlaying(!isPlaying);
    };

    const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (audioRef.current) {
            const newTime = (parseFloat(e.target.value) / 100) * duration;
            audioRef.current.currentTime = newTime;
            setProgress(parseFloat(e.target.value));
        }
    };

    const handleTimeUpdate = () => {
        if (audioRef.current) {
            const newProgress = (audioRef.current.currentTime / duration) * 100;
            setProgress(newProgress);
        }
    };

    const handleLoadedMetadata = () => {
        if (audioRef.current) {
            setDuration(audioRef.current.duration);
        }
    };

    return (
        <div className={classes.audio}>
            <div className={classes.time}>{time}</div>
            <img
                src={isPlaying ? stop : play}
                alt="Play/Pause"
                className={classes.play}
                onClick={audioUrl ? handlePlayPause : handleGetRecord}
            />

            <div className={classes.timeScale}>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={progress}
                    onChange={handleSeek}
                    className={classes.slider}
                />
            </div>

            <img src={frame} alt="" className={classes.frame}/>
            <img src={close} alt="" className={classes.close}/>

            <audio
                ref={audioRef}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setIsPlaying(false)}
            />
        </div>
    );
};
