import { useState } from "react"

export function Count({ num }) {

    const [sumar, SetSumar] = useState(num)

    const multiplicar = () => {
        return SetSumar(sumar + 1)
    }

    return (
        <>
            <button onClick={multiplicar} className="bg-gray-900 text-white rounded-lg p-2">
                sumar
            </button>
            <p>
                resultado {sumar}
            </p>
        </>
    )
}