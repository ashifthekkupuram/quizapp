import { useState } from "react"

import StartMenu from "../components/StartMenu"
import Question from "../components/Question"
import Result from "../components/Result"

const Home = () => {
    const [start, setStart] = useState(false)
    const [correctAnswers, setCorrectAnswers] = useState(0)
    const [result, setResult] = useState(false)
    const [questions, setQuestions] = useState(null)

    return (
        <div className=''>
            {!start ? <StartMenu setStart={setStart} setQuestions={setQuestions} /> : result ? <Result setStart={setStart} correctAnswers={correctAnswers} setCorrectAnswers={setCorrectAnswers} setResult={setResult} setQuestions={setQuestions} questions={questions} />  : <Question setCorrectAnswers={setCorrectAnswers} setResult={setResult} questions={questions} />}
        </div>
    )
}

export default Home
