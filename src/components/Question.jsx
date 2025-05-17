import { useState, useEffect } from 'react'

import questions from '../data/questions.json'

const Question = ({ setCorrectAnswers, setResult }) => {

    const [question, setQuestion] = useState(null)
    const [count, setCount] = useState(0)

    const onAnswer = (option) => {
        if(option === question?.answer){
            setCorrectAnswers(prev => ++prev)
        }

        if(questions[count+1]){
            setQuestion(questions[count+1])
            setCount(prev => ++prev)
        }else{
            setResult(true)
            setQuestion(null)
            setCount(0)
        }
    }

    useEffect(() => {
        setQuestion(questions[0])
    },[])

    console.log(question)

    return (
        <div className='flex flex-col justify-center items-center  bg-slate-800 w-full h-screen'>
            <span className='text-slate-900 mb-2'>
                {count+1} out of 10 questions
            </span>
            <p className='text-white text-3xl mb-5 text-center'>{question?.question || ''}</p>
            <div className='grid md:grid-cols-2 md:grid-rows-2 gap-3'>
                { question?.options.map((option) => <button key={option} onClick={() => onAnswer(option)} className='py-1 px-4 bg-white rounded font-semibold uppercase transition-all hover:bg-slate-200'>{option}</button>) || '' }
            </div>
        </div>
    )
}

export default Question
