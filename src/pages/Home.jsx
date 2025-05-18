import { useState } from "react"

import StartMenu from "../components/StartMenu"
import Question from "../components/Question"
import Result from "../components/Result"

const Home = () => {
    const [start, setStart] = useState(false)
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [result, setResult] = useState(false)

    return (
        <div className=''>
            {!start ? <StartMenu setStart={setStart} /> : result ? <Result setStart={setStart} correctAnswers={correctAnswers} setCorrectAnswers={setCorrectAnswers} setResult={setResult} /> : <Question setCorrectAnswers={setCorrectAnswers} setResult={setResult} />}
        </div>
    )
}

export default Home
