import NavBar from "./NavBar"
import QUESTIONS from '../data/questions.json'

const StartMenu = ({ setStart, setQuestions }) => {

    const onStart = () => {
        setQuestions(QUESTIONS)
        setStart(true)
    }

    return (
        <div className='flex flex-col justify-center items-center gap-4 bg-slate-800 w-full h-screen'>
            <NavBar />
            <h1 className='text-white text-4xl font-bold'>Quiz App</h1>
            <button className='py-1 px-4 bg-white rounded font-semibold uppercase transition-all hover:bg-slate-200' onClick={onStart}>Start</button>
        </div>
    )
}

export default StartMenu
