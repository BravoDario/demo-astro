import React, { useEffect, useState } from "react";
import GraphicMostUsed from "./GraphicMostUsed.jsx";

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
    "á": { index: [6, 0], counter: 0 },
    "é": { index: [7, 0], counter: 0 },
    "í": { index: [8, 0], counter: 0 },
    "ó": { index: [9, 0], counter: 0 },
    "ú": { index: [10, 0], counter: 0 },
    "ü": { index: [11, 0], counter: 0 },
    "¡": { index: [0, 7], counter: 0 },
    "¿": { index: [1, 6], counter: 0 },
    "!": { index: [2, 5], counter: 0 },
    "?": { index: [3, 4], counter: 0 },
    "@": { index: [4, 3], counter: 0 },
    "#": { index: [5, 2], counter: 0 },
    "$": { index: [6, 1], counter: 0 },
    "%": { index: [7, 1], counter: 0 },
    "^": { index: [8, 1], counter: 0 },
    "&": { index: [9, 1], counter: 0 },
    "*": { index: [10, 1], counter: 0 },
    "(": { index: [11, 1], counter: 0 },
    ")": { index: [0, 10], counter: 0 },
    "-": { index: [1, 9], counter: 0 },
    "_": { index: [2, 8], counter: 0 },
    "=": { index: [3, 7], counter: 0 },
    "+": { index: [4, 6], counter: 0 },
    "[": { index: [5, 5], counter: 0 },
    "]": { index: [6, 4], counter: 0 },
    "{": { index: [7, 3], counter: 0 },
    "}": { index: [8, 2], counter: 0 },
    "\\": { index: [9, 2], counter: 0 },
    "|": { index: [10, 2], counter: 0 },
    ";": { index: [11, 2], counter: 0 },
    ":": { index: [0, 11], counter: 0 },
    "'": { index: [1, 10], counter: 0 },
    "\"": { index: [2, 9], counter: 0 },
    ",": { index: [3, 6], counter: 0 },
    ".": { index: [4, 5], counter: 0 },
    "<": { index: [5, 4], counter: 0 },
    ">": { index: [6, 3], counter: 0 },
    "/": { index: [7, 2], counter: 0 },
    "`": { index: [9, 3], counter: 0 },
    "~": { index: [10, 3], counter: 0 },
    "°": { index: [11, 3], counter: 0 },
    "¬": { index: [0, 13], counter: 0 },
    "ç": { index: [0, 14], counter: 0 },
    "¨": { index: [0, 15], counter: 0 },
    "´": { index: [0, 16], counter: 0 },
    "1": { index: [0, 8], counter: 0 },
    "2": { index: [1, 7], counter: 0 },
    "3": { index: [2, 6], counter: 0 },
    "4": { index: [3, 5], counter: 0 },
    "5": { index: [4, 4], counter: 0 },
    "6": { index: [5, 3], counter: 0 },
    "7": { index: [6, 2], counter: 0 },
    "8": { index: [7, 1], counter: 0 },
    "9": { index: [8, 0], counter: 0 },
    "0": { index: [0, 9], counter: 0 },
    " ": { index: [1, 8], counter: 0 }
};

const GraphLetters = () => {
    const [number, setNumber] = useState(30);
    const [word, setWord] = useState("text");
    const [letters, setLetters] = useState([]);
    const [letterIndex, setLetterIndex] = useState(indexes);
    const [wordBreaker, setWordBreaker] = useState(word.split("").map(letter => letterIndex[letter.toLowerCase()] ?? ""));
    const [activeTab, setActiveTab] = useState('grafica');

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
            const quantityLetter = word.split("").filter(l => l.toLowerCase() == letterSearch).length;
            const newLetter = {
                index: letterIndex[letterSearch].index,
                counter: quantityLetter,
            }

            setWordBreaker({ ...wordBreaker, [letterSearch]: newLetter });
        })

        setWordBreaker(currentWord.map(letter => { return { ...letterIndex[letter.toLowerCase()] ?? "", letter: letter.toLowerCase() } }))
        setLetters([...currentWord.map(letter => {
            const letterSearch = letter?.toLowerCase();
            return letterIndex[letterSearch].index ?? ""
        })]);
    }

    useEffect(() => breakWord(), [word]);

    const getIndexLetter = (indexX, indexY) => {
        const l = letters.filter(l => l[0] == indexX && l[1] == [indexY])
        return l.length > 0 ? true : false;
    }

    const getLetter = (x, y) => {
        let letter = "";
        let letterCounter = 0;

        for (const [key, value] of Object.entries(letterIndex)) {
            if (value.index[0] === x && value.index[1] === y) {
                letter = key;
                letterCounter = wordBreaker.filter(l => l.letter === key).length;
            }
        }

        return {
            letter,
            opacity: getIndexLetter(x, y) ? letterCounter * 0.3 : 1,
            quantity: letterCounter,
            text: letter ? `${letter}: ${letterCounter}` : ''
        };
    }

    const getInfoLetter = () => {
        const infoLetter = letters.map(indexes => {
            const letterSearch = getLetter(indexes[0], indexes[1]);
            return {
                counter: letterSearch.quantity,
                letter: letterSearch.letter,
            }
        })
        return infoLetter.filter((letter, index, self) => index === self.findIndex(t => t.letter === letter.letter));;
    }

    const TabContent = ({ activeTab }) => {
        return (
            <div className="bg-slate-300">
                <div className={`w-full p-4 rounded-lg bg-gray-50 dark:bg-gray-800 ${activeTab !== 'grafica' ? 'hidden' : ''}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    <GraphicMostUsed letters={getInfoLetter()} />
                </div>
                <div className={`p-4 rounded-lg  ${activeTab !== 'plano' ? 'hidden' : ''}`} id="profile" role="tabpanel" aria-labelledby="profile-tab">
                    {getMesh().map((square, indexY) => {
                        return (
                            <React.Fragment key={indexY}>
                                <div className="flex flex-row justify-end">
                                    {indexY == 0 ? ["Y/X", ...square].map((square) =>
                                        <span className=" min-h-[25px]  min-w-[30px] border-[1px] text-center" key={square}>
                                            {square}
                                        </span>)
                                        : ''}
                                </div>
                                <div className="flex flex-row items-center justify-end " key={indexY}>
                                    <span className="flex justify-center items-center w-full ">{indexY}</span>
                                    {
                                        square.map((square, indexX) => <div
                                            className={`${getIndexLetter(indexX, indexY) ? `bg-red-300` : 'bg-slate-400'} min-h-[25px] min-w-[30px] text-xs border-[1px] flex justify-center items-center hover:bg-slate-600 hover:text-white text-center`}
                                            style={{ opacity: getLetter(indexX, indexY).opacity }}
                                            key={indexX}>
                                            {/* {getLetter(indexX, indexY).text} */}
                                        </div>)
                                    }
                                </div>
                            </React.Fragment>
                        )
                    })}
                </div>
            </div>)
    }

    return (
        <div className="flex flex-col items-center justify-end">
            <div className="px-2 w-full">
                <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                    placeholder="Escribe tu palabra"
                    value={word} onInput={(e) => { setWord(e.target.value) }} />
                <div className="flex flex-col items-center justify-center">
                    <div className="mb-4">
                        <ul className="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
                            <li className="me-2" role="presentation">
                                <button
                                    className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'plano' ? 'border-blue-500' : ''}`}
                                    onClick={() => setActiveTab('plano')}
                                    type="button"
                                    role="tab"
                                    aria-controls="plano"
                                    aria-selected={activeTab === 'plano'}
                                >
                                    Plano cartesiano
                                </button>
                            </li>
                            <li className="me-2" role="presentation">
                                <button
                                    className={`inline-block p-4 border-b-2 rounded-t-lg ${activeTab === 'grafica' ? 'border-blue-500' : 'hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'}`}
                                    onClick={() => setActiveTab('grafica')}
                                    type="button"
                                    role="tab"
                                    aria-controls="dashboard"
                                    aria-selected={activeTab === 'grafica'}
                                >
                                    Gráfica
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div className="pb-8 bg-slate-300">
                        {TabContent({ activeTab })}
                    </div>
                </div>
            </div>
        </div>
    )

}

export default GraphLetters