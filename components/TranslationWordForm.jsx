import React, { useRef } from 'react'
import { useRouter } from 'next/router'
import { createTranslationWord } from '../services'

const TranslationWordForm = ({ user }) => {

    const { pathname } = useRouter()
    const router = useRouter()
    const word = useRef(null)
    const meaning = useRef(null)
    const other = useRef(null)
    const startLang = useRef(null)
    const translatedLang = useRef(null)
    const translation = useRef(null)

    function generateSlug(user, word) {
        const slug = `${user.nickname.toLowerCase()}-${word.toLowerCase()}`

        return slug
    }

    return (
        <div className='fixed z-50 inset-0 bg-black opacity-60 flex items-center justify-center'>
            <button className='opacity-100 absolute right-1 top-1 text-5xl text-white' onClick={() => router.push({ pathname, query: { ...user, showTranslationWordForm: false},  })}>&#10005;</button>
            <div className='p-5 w-11/12 sm:w-5/12 rounded-lg bg-white flex flex-col items-center gap-y-1'>
                <input ref={word} className='w-full text-lg outline-none mb-3 sm:mb-5 border-2 border-gray-300 p-2 rounded-lg' type="text" placeholder='Inserisci il vocabolo' />
                <div className='w-full flex justify-between items-center gap-x-5'>
                    <input ref={startLang} className='w-full text-lg outline-none mb-3 sm:mb-5 border-2 border-gray-300 p-2 rounded-lg' type="text" placeholder='Lingua di origine' />
                    <p className='text-3xl font-extrabold mb-5'>&rarr;</p>
                    <input ref={translatedLang} className='w-full text-lg outline-none mb-3 sm:mb-5 border-2 border-gray-300 p-2 rounded-lg' type="text" placeholder='Lingua di traduzione' />
                </div>
                <input ref={translation} className='w-full text-lg outline-none mb-3 sm:mb-5 border-2 border-gray-300 p-2 rounded-lg' type="text" placeholder='Inserisci la traduzione' />
                <textarea ref={meaning} className='w-full h-28 text-lg outline-none mb-3 sm:mb-5 border-2 border-gray-300 p-2 rounded-lg' placeholder='Inserisci il significato' ></textarea>
                <textarea ref={other} className='w-full h-28 text-lg outline-none mb-3 sm:mb-5 border-2 border-gray-300 p-2 rounded-lg' placeholder='Altre informazioni (opzionale)' ></textarea>
                <button onClick={() => {
                    createTranslationWord({
                        word: word.current.value,
                        meaning: meaning.current.value,
                        other: other.current.value,
                        slug: generateSlug(user, word.current.value),
                        id: user.id,
                        startLang: startLang.current.value,
                        translatedLang: translatedLang.current.value,
                        translation: translation.current.value,
                    })
                        .then((res) => console.log(res))
                    router.push({ pathname, query: { ...user, showTranslationWordForm: false},  })
                }} className='mt-5 text-white font-semibold rounded-lg p-2 px-4 bg-green-500'>Pubblica</button>
            </div>
        </div>
    )
}

export default TranslationWordForm