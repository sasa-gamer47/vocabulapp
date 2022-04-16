import React, { useRef } from 'react'
import { useRouter } from 'next/router'
import { createWord } from '../services'

const WordForm = ({ user }) => {


    const { pathname } = useRouter()
    const router = useRouter()
    const word = useRef(null)
    const meaning = useRef(null)
    const other = useRef(null)

    function generateSlug(user, word) {
        const slug = `${user.nickname.toLowerCase()}-${word.toLowerCase()}`

        return slug
    }

    

    return (
        <div className='fixed z-50 inset-0 bg-black opacity-60 flex items-center justify-center'>
            <button className='opacity-100 absolute right-1 top-1 text-5xl text-white' onClick={() => router.push({ pathname, query: { ...user, showWordForm: false},  })}>&#10005;</button>
            <div className='p-5 w-9/12 sm:w-3/12 rounded-lg bg-white flex flex-col items-center gap-y-1'>
                <input ref={word} className='w-full text-lg outline-none mb-5 border-2 border-gray-300 p-2 rounded-lg' type="text" placeholder='Inserisci il vocabolo' />
                <textarea ref={meaning} className='w-full h-28 text-lg outline-none mb-5 border-2 border-gray-300 p-2 rounded-lg' placeholder='Inserisci il significato' ></textarea>
                <textarea ref={other} className='w-full h-28 text-lg outline-none mb-5 border-2 border-gray-300 p-2 rounded-lg' placeholder='Altre informazioni (opzionale)' ></textarea>
                <button onClick={() => {
                    createWord({
                        word: word.current.value,
                        meaning: meaning.current.value,
                        other: other.current.value,
                        slug: generateSlug(user, word.current.value),
                        id: user.id,
                    })
                        .then((res) => console.log(res))
                    router.push({ pathname, query: { ...user, showWordForm: false},  })
                }} className='mt-5 text-white font-semibold rounded-lg p-2 px-4 bg-green-500'>Pubblica</button>
            </div>
        </div>
    )
}

export default WordForm