import { useEffect, useState } from "react";

const GraphLetters = () => {
    const [number, setNumber] = useState(30);
    const [player, setPlayer] = useState([0, 0]);
    const [target, setTarget] = useState([Math.floor(Math.random() * number), Math.floor(Math.random() * number)]);
    const [word, setWord] = useState("abcdefghijklmnñopqrstuvwxyz1234567890");
    const [letters, setLetters] = useState([]);

    const letterIndex = {
        a: [0, 0],
        b: [0, 1],
        c: [1, 0],
        d: [1, 1],
        e: [0, 2],
        f: [2, 0],
        g: [2, 2],
        h: [0, 3],
        i: [3, 0],
        j: [3, 3],
        k: [0, 4],
        l: [4, 0],
        m: [4, 4],
        n: [0, 5],
        "ñ": [5, 1],
        o: [5, 0],
        p: [5, 5],
        q: [0, 6],
        r: [6, 0],
        s: [6, 6],
        t: [0, 7],
        u: [7, 0],
        v: [7, 7],
        w: [0, 8],
        x: [8, 0],
        y: [8, 8],
        z: [0, 9],
        1: [12, 12],
        2: [12, 13],
        3: [13, 12],
        4: [13, 13],
        5: [13, 14],
        6: [14, 15],
        7: [15, 16],
        8: [16, 17],
        9: [18, 19],
        0: [19, 20],
        " ": [20, 20],
    }

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

    const breakWord = () => {
        setLetters([...word.split("").map(letter => letterIndex[letter.toLowerCase()])]);
    }

    useEffect(() => {
        breakWord();
    }, [word]);

    const getIndexLetter = (indexX, indexY) => {
        const l = letters.filter(l => l[0] == indexX && l[1] == [indexY])
        return l.length > 0 ? true : false;
    }

    return (
        <div className="flex flex-col items-center justify-end">
            <input type="text" className="bg-slate-300 text-center text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full py-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                value={word} onInput={(e) => { setWord(e.target.value) }} />
            <div className="*:mx-2">
                {getMesh().map((square, indexY) => {
                    return (
                        <>
                            <div className="flex flex-row justify-end">
                                {indexY == 0 ? ["Y/X", ...square].map((square) => 
                                    <span className=" min-h-[25px] min-w-[25px] border-[1px] text-center" key={square}>
                                        {square}
                                    </span>) 
                                : ''}
                            </div>

                            <div className="flex flex-row items-center justify-end" key={indexY}>
                                <span>{indexY}</span>

                                {
                                    square.map((square, indexX) => <span
                                        className={`${getIndexLetter(indexX, indexY) ? "bg-red-300" : 'bg-slate-400'} min-h-[25px] min-w-[25px] border-[1px] hover:bg-slate-600 hover:text-white`}
                                        key={indexX}>
                                    </span>)
                                }
                            </div>
                        </>
                    )
                })}
            </div>
        </div>
    )

}

export default GraphLetters