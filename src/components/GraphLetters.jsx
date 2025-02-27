import { useEffect, useState } from "react";

const indexes = {
    a: { index: [0, 0], counter: 0 },
    b: { index: [0, 1], counter: 0 },
    c: { index: [1, 0], counter: 0 },
    d: { index: [0, 2], counter: 0 },
    e: { index: [1, 1], counter: 0 },
    f: { index: [2, 0], counter: 0 },
    g: { index: [0, 3], counter: 0 },
    h: { index: [1, 2], counter: 0 },
    i: { index: [2, 1], counter: 0 },
    j: { index: [3, 0], counter: 0 },
    k: { index: [0, 4], counter: 0 },
    l: { index: [1, 3], counter: 0 },
    m: { index: [2, 2], counter: 0 },
    n: { index: [3, 1], counter: 0 },
    "ñ": { index: [4, 0], counter: 0 },
    o: { index: [0, 5], counter: 0 },
    p: { index: [1, 4], counter: 0 },
    q: { index: [2, 3], counter: 0 },
    r: { index: [3, 2], counter: 0 },
    s: { index: [4, 1], counter: 0 },
    t: { index: [5, 0], counter: 0 },
    u: { index: [0, 6], counter: 0 },
    v: { index: [1, 5], counter: 0 },
    w: { index: [2, 4], counter: 0 },
    x: { index: [3, 3], counter: 0 },
    y: { index: [4, 2], counter: 0 },
    z: { index: [5, 1], counter: 0 },
    1: { index: [10, 7], counter: 0 },
    2: { index: [10, 8], counter: 0 },
    3: { index: [10, 9], counter: 0 },
    4: { index: [10, 10], counter: 0 },
    5: { index: [10, 11], counter: 0 },
    6: { index: [10, 12], counter: 0 },
    7: { index: [10, 13], counter: 0 },
    8: { index: [10, 14], counter: 0 },
    9: { index: [10, 15], counter: 0 },
    0: { index: [10, 16], counter: 0 },
    " ": { index: [10, 6], counter: 0 }
}

const GraphLetters = () => {
    const [number, setNumber] = useState(30);
    const [word, setWord] = useState("text");
    const [letters, setLetters] = useState([]);
    const [letterIndex, setLetterIndex] = useState(indexes);
    const [wordBreaker, setWordBreaker] = useState(word.split("").map(letter => letterIndex[letter.toLowerCase()] ?? ""));

    const getMesh = () => {
        let squareY = [];
        for (let i = 1; i <= number; i++) {
            let squareX = [];
            for (let j = 0; j < number; j++) {
                squareX.push(j);
            }
            squareY.push(squareX);
        }
        return squareY;
    };

    const breakWord = () => {
        const currentWord = word.split("")

        currentWord.map(letter => {
            const letterSearch = letter?.toLowerCase();
            const itemBreakWord = indexes[letterSearch];
            const quantityLetter = word.split("").filter(l => l.toLowerCase() == letterSearch).length;

            const newLetter = {
                index: letterIndex[letterSearch].index,
                counter: quantityLetter,
            }

            setWordBreaker({ ...wordBreaker, [letterSearch]: newLetter });
        })

        setWordBreaker(currentWord.map(letter => letterIndex[letter.toLowerCase()] ?? ""))

        currentWord.forEach((letter, index) => {

            const letterSearch = letter?.toLowerCase();
            const quantityLetter = word.split("").filter(l => l.toLowerCase() == letterSearch).length;
            const newLetter = {
                index: letterIndex[letterSearch].index,
                counter: quantityLetter,
            }
            //console.log({ ...letterIndex, [letterSearch]: newLetter });

            //setLetterIndex();
        })

        setLetters([...currentWord.map(letter => {
            const letterSearch = letter?.toLowerCase();
            return letterIndex[letterSearch].index ?? ""
        }
        )]);
    }

    useEffect(() => {
        breakWord();
        //console.log(letterIndex);
    }, [word]);

    const getIndexLetter = (indexX, indexY) => {
        const l = letters.filter(l => l[0] == indexX && l[1] == [indexY])
        return l.length > 0 ? true : false;
    }

    const getLetter = (x, y) => {
        for (const [key, value] of Object.entries(letters)) {
            if (value.index[0] === x && value.index[1] === y) {
                return key;
            }
        }
        return null;
    }

    const getCounterByLetter = (x, y) => {
        const letter = getLetter(x, y);
        return letterIndex[letter.toLowerCase()].counter;
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
                                        className={`${getIndexLetter(indexX, indexY) ? "bg-red-300" : 'bg-slate-400'} min-h-[25px] min-w-[25px] border-[1px] hover:bg-slate-600 hover:text-white text-center`}
                                        key={indexX}>
                                        {/* getCounterByLetter(indexX, indexY) */}
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