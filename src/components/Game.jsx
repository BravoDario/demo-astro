import { useEffect, useState, useRef } from "react";

const Game = () => {
    const [number, setNumber] = useState(5);
    const [player, setPlayer] = useState([0, 0]);
    const [target, setTarget] = useState([Math.floor(Math.random() * number), Math.floor(Math.random() * number)]);
    const [score, setScore] = useState(0);
    const [maxTime, setMaxTime] = useState(20);
    const [seconds, setSeconds] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [message, setMessage] = useState("");
    const [scores, setScores] = useState([0]);

    const intervalRef = useRef(null);

    const handleStart = () => {
        setPlaying(true);
        setSeconds(maxTime);
        setScore(0);
    };

    const getMesh = () => {
        let squareY = [];
        for (let i = 1; i <= number; i++) {
            let squareX = [];
            for (let j = 1; j <= number; j++) {
                squareX.push(j);
            }
            squareY.push(squareX);
        }
        return squareY;
    };

    useEffect(() => {
        if (playing) {
            intervalRef.current = setInterval(() => {
                setSeconds(prev => {
                    if (prev > 0) {
                        return prev - 1;
                    } else {
                        clearInterval(intervalRef.current);
                        setPlaying(false);
                        setScores([...scores, getScore()]);
                        return 0;
                    }
                });
            }, 1000);

            return () => clearInterval(intervalRef.current);
        }
    }, [playing]);

    useEffect(() => {
        if (playing) {
            const handleXbuttons = (event) => {
                setPlayer(prev => {
                    let [x, y] = prev;
                    if (event.key === 'ArrowLeft') x = x > 0 ? x - 1 : 0;
                    if (event.key === 'ArrowRight') x = x < number - 1 ? x + 1 : number - 1;
                    if (event.key === 'ArrowUp') y = y > 0 ? y - 1 : 0;
                    if (event.key === 'ArrowDown') y = y < number - 1 ? y + 1 : number - 1;
                    return [x, y];
                });
            };
            window.addEventListener('keydown', handleXbuttons);

            return () => {
                window.removeEventListener('keydown', handleXbuttons);
            };
        }
    }, [playing, number]);

    useEffect(() => {
        if (player[0] === target[0] && player[1] === target[1]) {
            setScore(prev => prev + 1);
            setPlayer([Math.floor(Math.random() * number), Math.floor(Math.random() * number)]);
            setTarget([Math.floor(Math.random() * number), Math.floor(Math.random() * number)]);
        }
    }, [player, target, number]);

    useEffect(() => {
        setTarget([Math.floor(Math.random() * number), Math.floor(Math.random() * number)]);
    }, [ number ]);

    const getScore = () => {
        return ((score * (maxTime - seconds)) / 2).toString().padStart(4, "0");
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row gap-2 items-center justify-center">
                <div className="flex flex-col gap-2 items-center justify-center">
                    <label htmlFor="number">Select the number of squares:</label>
                    <input type="number" min="2" max="50" value={number} onChange={(e) => setNumber(Number(e.target.value))} />
                </div>
                <div className="flex flex-col gap-2 items-center justify-center">
                    <label htmlFor="time">time (seconds):</label>
                    <input type="number" min="5" max="50" value={maxTime} onChange={(e) => setMaxTime(Number(e.target.value))} />
                </div>
                <button onClick={handleStart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    Start
                </button>
            </div>
            <h4>{playing ? "Playing" : "Stopped"}</h4>
            <h2>time {seconds}</h2>
            <h3>X {player[0]} - Y {player[1]}</h3>
            <h3> Score  {getScore()}</h3>
            <h5>
                High Score {Math.max(...scores)}
            </h5>
            {
                getMesh().map((square, indexY) => {
                    return (
                        <div className="flex flex-row gap-2 my-2 items-center justify-center" key={indexY}>
                            {
                                square.map((square, indexX) => {
                                    return (
                                        <button className={(player[1] === (indexY) && player[0] === (indexX) ? "bg-slate-700" : target[1] === (indexY) && target[0] === (indexX) ? "bg-red-400" : "bg-slate-300") + " h-12 w-12 rounded-md hover:bg-slate-600 hover:text-white text-center"} key={indexX}>

                                        </button>
                                    )
                                })
                            }
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Game;