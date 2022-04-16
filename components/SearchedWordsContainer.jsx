import React from 'react'
import { useRouter } from 'next/router'
import { Word } from './'

const SearchedWordsContainer = ({ user, words }) => {
    words = JSON.parse(words)

    const { pathname } = useRouter()
    const router = useRouter()

    return (
        <div className='fixed inset-0 bg-black opacity-60 z-50 flex items-center justify-center '>
            <button className='opacity-100 absolute right-1 top-1 text-5xl text-white' onClick={() => router.push({ pathname, query: { ...user, showSearchedWordsContainer: false }, })}>&#10005;</button>
            <div className='absolute overflow-y-auto p-4 bg-white top-20 bottom-20 rounded-lg flex flex-col items-center gap-y-2'>
                <div>
                    {words && words.map((word) => (
                        <Word key={Math.round(Math.random() * 1000000)} word={word} user={user} />
                    ))}
                </div>
            </div>
            SearchedWordsContainer
        </div>
    )
}

export default SearchedWordsContainer