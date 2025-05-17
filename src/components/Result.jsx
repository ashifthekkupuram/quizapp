const Result = ({ setStart, correctAnswers, setCorrectAnswers, setResult }) => {

    const onHome = () => {
        setStart(false)
        setResult(false)
        setCorrectAnswers(0)
    }

    return (
        <div className='flex flex-col justify-center items-center gap-4 bg-slate-800 w-full h-screen'>
            <h1 className='text-white text-4xl font-bold'>{correctAnswers} out of 10 is correct</h1>
            <button className='py-1 px-4 bg-white rounded font-semibold uppercase transition-all hover:bg-slate-200' onClick={onHome}>Go Home</button>
        </div>
    )
}

export default Result
