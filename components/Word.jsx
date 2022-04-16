import React from 'react'
import { useRouter } from 'next/router'
import { takeFirstNWords } from '../helpers'

const Word = ({ word, user }) => {

    const router = useRouter()


    return (
        <>
            {!word.isATranslation && (
                <div onClick={() => router.push({ pathname: `/word/${word.slug}`, query: { ...user, word: JSON.stringify(word)},  })} className='aspect-square p-4 mt-5 ml-5 z-10 relative text-white rounded-lg bg-sky-500 flex flex-col gap-y-2 items-center cursor-pointer drop-shadow-lg duration-300 transition hover:scale-110 hover:drop-shadow-2xl'>
                    <h4>{word.word}</h4>
                    <div className='mt-5 font-semibold text-lg'>
                        {takeFirstNWords(20, word.meaning)}
                    </div>
                    <div className='mt-5 font-semibold'>
                        {takeFirstNWords(20, word.other)}
                    </div>
                </div>
            )}
            {word.isATranslation && (
                <div onClick={() => router.push({ pathname: `/word/${word.slug}`, query: { ...user, word: JSON.stringify(word)},  })} className='aspect-square p-4 mt-5 ml-5 z-10 relative text-white rounded-lg bg-sky-500 flex flex-col gap-y-2 items-center cursor-pointer drop-shadow-lg duration-300 transition hover:scale-110 hover:drop-shadow-2xl'>
                    <h4>{word.word} &rarr; {word.translation}</h4>
                    <p className='text-lg'>{word.startLang} &rarr; {word.translatedLang}</p>
                    <div className='mt-5 font-semibold text-lg'>
                        {takeFirstNWords(20, word.meaning)}
                    </div>
                    <div className='mt-5 font-semibold'>
                        {takeFirstNWords(20, word.other)}
                    </div>
                </div>
            )}
        </>
    )
}

export default Word