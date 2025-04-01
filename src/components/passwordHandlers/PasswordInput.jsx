import { useEffect, useRef } from "react";
import { apiConfig } from "../../utilities/apiConfig";

const PasswordInput = ({ word = "", setWord, token }) => {
    /* const socketRef = useRef(null);

    useEffect(() => {
        socketRef.current = new WebSocket('ws://localhost:8080');

        socketRef.current.onclose = () => {
            console.log('Disconnected from WebSocket server');
        };

        return () => {
            socketRef.current.close();
        };
    }, []); */

    const handleEnter = () => {
        fetch(`${apiConfig.endpoint}/setMessage`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token, text: word }),
        }).then(res => res.json()).then((data) => {
            console.log(data);
        }).catch((error) => {
            console.error(error);
        });
        /* if (word.length > 0 && socketRef.current?.readyState === WebSocket.OPEN) {
            socketRef.current.send(word);
            setWord(e.target.value)
        } */
    }


    const getText = () => {
        fetch(`${apiConfig.endpoint}/getMessage/token/${token}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then(res => res.json()).then(data => {
            setWord(data.message);
        }).catch((error) => {
            console.error(error);
        });
    }

    useEffect(() => getText(), [token]);

    return (
        <div className="flex flex-row items-center justify-center gap-2 px-2 md:px-32 my-4 w-full">
            <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Escribe tu contraseña"
                value={word}
                onInput={(e) => setWord(e.target.value)}
            />
            <button
                type="button"
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg"
                onClick={handleEnter}
            >
                Enviar
            </button>
        </div>
    );
};

export default PasswordInput;