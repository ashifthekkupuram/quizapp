import { FaInfoCircle } from "react-icons/fa"

import NavBar from "./NavBar"
import QUESTIONS from '../data/questions.json'

const StartMenu = ({ setStart, setQuestions, hardMode, setHardMode }) => {

    const getRandomQuestions = (questions, length = 10) => {
        const questionsCopy = [...questions]

        for (let i = questionsCopy.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [questionsCopy[i], questionsCopy[j]] = [questionsCopy[j], questionsCopy[i]];
        }

        return questionsCopy.slice(0, length)
    }

    const onStart = () => {
        const tenRandomQuestions = getRandomQuestions(QUESTIONS)
        setQuestions(tenRandomQuestions)
        setStart(true)
    }

    return (
        <div className='flex flex-col justify-center items-center gap-4 bg-slate-800 w-full h-screen'>
            <NavBar />
            <h1 className='text-white text-4xl font-bold'>Quiz App</h1>
            <div className='flex justify-center items-center text-white gap-1'>
                <input className='mt-1' checked={hardMode} type="checkbox" name='hardMode' id='hardMode' onChange={(e) => setHardMode(e.target.checked)} />
                <label htmlFor="hardMode" className='text-sm'>Hard Mode</label>
            </div>
            {hardMode && <div className='flex justify-center items-center gap-1 text-[8px] text-[#ec928e] mt-[-15px]'><FaInfoCircle /><span>Lose point for each wrong answer</span></div>}
            <button className='py-1 px-4 bg-white rounded font-semibold uppercase transition-all hover:bg-slate-200' onClick={onStart}>Start</button>
        </div>
    )
}

export default StartMenu
