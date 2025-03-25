import { faShieldCat as faCat, faCheese, faSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState, useRef } from "react";

const GameComponent = () => {
    const [number, setNumber] = useState(2);
    const [score, setScore] = useState(0);
    const [maxTime, setMaxTime] = useState(5);
    const [seconds, setSeconds] = useState(0);
    const [counter, setCounter] = useState(0);
    const [playing, setPlaying] = useState(false);
    const [message, setMessage] = useState("");
    const [scores, setScores] = useState([]);
    const [player, setPlayer] = useState([1, 0]);
    const [target, setTarget] = useState([Math.floor(Math.random() * number), Math.floor(Math.random() * number)]);

    const intervalRef = useRef(null);

    const handleStart = () => {
        setPlaying(true);
        setSeconds(maxTime);
        setScore(0);
        setCounter(0);
    };

    const handleStop = () => {
        setPlaying(false);
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

                        if (prev === 1) {
                            const realScore = ((counter * (maxTime - seconds) + 10) * 3)
                            setScore(realScore);
                            setScores([...scores, realScore])
                        };
                        return prev - 1;
                    } else {
                        clearInterval(intervalRef.current);
                        setPlaying(false);
                        setCounter(0);
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
            setCounter(counter + 1);
            setScore(25);
            setPlayer([Math.floor(Math.random() * number), Math.floor(Math.random() * number)]);
            setTarget([Math.floor(Math.random() * number), Math.floor(Math.random() * number)]);
        }
    }, [player, target, number]);

    useEffect(() => {
        setTarget([Math.floor(Math.random() * number), Math.floor(Math.random() * number)]);
    }, [number]);

    const getScore = () => {
        return playing ? score.toString().padStart(4, "0") : 0;
    };

    return (
        <div className="flex flex-col items-center justify-center">
            <div className="flex flex-row gap-2 items-end justify-center text-center">
                <div className="max-w-xs mx-auto">
                    <label htmlFor="quantity-input" className="block mb-2 text-sm font-medium text-gray-900" >Cantidad de cuadros</label>
                    <div className="relative flex items-center max-w-[8rem]">
                        <button id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                            onClick={() => { if (number > 2 && number < 50) setNumber(number - 1) }}
                        >
                            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                            </svg>
                        </button>
                        <input type="text" min="2" max="50" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation"
                            className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={number} onInput={(e) => { if (number > 2 && number < 50) setNumber(Number(e.target.value)) }} />
                        <button type="button" id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                            onClick={() => { if (number < 50 && number > 2) setNumber(number + 1) }}
                        >
                            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div className="max-w-xs mx-auto">
                    <label htmlFor="quantity-input" className="block mb-2 text-sm font-medium text-gray-900" >Tiempo</label>
                    <div className="relative flex items-center max-w-[8rem]">
                        <button id="decrement-button" data-input-counter-decrement="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-s-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                            onClick={() => { if (maxTime > 2 && maxTime < 50) setMaxTime(maxTime - 1) }}
                        >
                            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 2">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h16" />
                            </svg>
                        </button>
                        <input type="text" min="2" max="50" id="quantity-input" data-input-counter aria-describedby="helper-text-explanation"
                            className="bg-gray-50 border-x-0 border-gray-300 h-11 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            value={maxTime} onInput={(e) => { if (maxTime < 50 && maxTime > 2) setMaxTime(Number(e.target.value)) }} />
                        <button type="button" id="increment-button" data-input-counter-increment="quantity-input" className="bg-gray-100 dark:bg-gray-700 dark:hover:bg-gray-600 dark:border-gray-600 hover:bg-gray-200 border border-gray-300 rounded-e-lg p-3 h-11 focus:ring-gray-100 dark:focus:ring-gray-700 focus:ring-2 focus:outline-none"
                            onClick={() => { if (maxTime < 50 && maxTime > 2) setMaxTime(maxTime + 1) }}
                        >
                            <svg className="w-3 h-3 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                            </svg>
                        </button>
                    </div>
                </div>
                {playing ?
                    <button onClick={handleStop} className="bg-blue-500 hover:bg-blue-700 mx-auto mb-2 max-w-[8rem] text-white font-bold py-2 px-4 rounded">
                        Parar
                    </button> :
                    <button onClick={handleStart} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Iniciar
                    </button>
                }
            </div>

            <button onClick={() => {
                console.log({ score, scores });
            }} className="bg-blue-500 hover:bg-blue-700 text-white font-bold mt-4 py-2 px-4 rounded">
                show details
            </button>
                    {counter ?? '0'}
            {playing ?
                <>
                    <h2>Tiempo: {seconds}</h2>
                    {/* <h3>X {player[0]} - Y {player[1]}</h3> */}
                    <h3>Puntuación  {getScore()}</h3>
                </>
                : <h5>
                    Récord: {scores?.sort((a, b) => b - a)[0] ?? 0}
                    <br />
                    Último: {scores[0] ?? 0}
                </h5>}

            {getMesh().map((square, indexY) => {
                return (
                    <div className="flex flex-row gap-2 my-2 items-center justify-center" key={indexY}>
                        {
                            square.map((square, indexX) => {
                                return (
                                    <button className={(
                                        player[1] === (indexY) && player[0] === (indexX) ? "bg-slate-200 " :
                                            target[1] === (indexY) && target[0] === (indexX) ? " bg-[#ba6427] p-2 " : " ") +
                                        " h-12 w-12 rounded-md hover:bg-slate-600 hover:text-white text-center "} key={indexX}>
                                        <FontAwesomeIcon icon={
                                            player[1] === (indexY) && player[0] === (indexX) ? faCat :
                                                target[1] === (indexY) && target[0] === (indexX) ? faCheese : faSquare}
                                            color={
                                                player[1] === (indexY) && player[0] === (indexX) ? "#a9af9b" :
                                                    target[1] === (indexY) && target[0] === (indexX) ? "#d1a02d" : "#456d98"}
                                            size="2x"
                                        />
                                    </button>
                                )
                            })
                        }
                    </div>
                )
            })}
        </div>
    );
}

export default GameComponent;