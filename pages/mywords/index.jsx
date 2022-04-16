import React, { useState, useEffect } from 'react'
import { parseCookies } from "../../helpers"
import { useRouter } from 'next/router'
import { Navbar, ModalConfirm, SearchedWordsContainer, WordForm, TranslationWordForm, SideBar } from '../../components'

const mywords = ({ data }) => {

    const [user, setUser] = useState(null)
    const [showModalConfirm, setShowModalConfirm] = useState(false)
    const [showSearchedWordsContainer, setShowSearchedWordsContainer] = useState(false)
    const [searchedWords, setSearchedWords] = useState([])
    const [collapsed, setCollapsed] = useState(false)
    const [showCreateNew, setShowCreateNew] = useState(false)
    const [showWordForm, setShowWordForm] = useState(false)
    const [showTranslationWordForm, setShowTranslationWordForm] = useState(false)
    const { pathname } = useRouter()
    const router = useRouter()
    
    useEffect(() => {

        if (!data) {
            setUser(router.query)
        } else {
            setUser(JSON.parse(data))
        }

        router.push('/mywords')
        
        return () => {
        }
    }, [])
    
    useEffect(() => {
        if (router.query?.logout == "true") {
            setUser(null)
        }

        setShowCreateNew(router.query?.showCreateNew == "true" ? true : false)
        setShowWordForm(router.query?.showWordForm == "true" ? true : false)
        setShowTranslationWordForm(router.query?.showTranslationWordForm == "true" ? true : false)
        setShowSearchedWordsContainer(router.query?.showSearchContainer == "true" ? true : false)
        setSearchedWords(router.query.words)
        setShowModalConfirm(router.query.showModal == "true" ? true : false)

    }), [router.query]

    return (
        <div>
            <Navbar user={user} />
            {showModalConfirm && <ModalConfirm user={user} />}
            {showSearchedWordsContainer && <SearchedWordsContainer user={user} words={searchedWords} />}
            <SideBar user={user} isIndex={true} />
            {showCreateNew && (
                <div className='fixed z-50 inset-0 bg-black opacity-60 flex items-center justify-center'>
                    <button className='opacity-100 absolute right-1 top-1 text-5xl text-white' onClick={() => router.push({ pathname, query: { ...user, showCreateNew: false} })}>&#10005;</button>
                    <div className='p-5 w-11/12 sm:w-4/12 rounded-lg bg-white text-lg'>
                        <h4 className='text-center'>Scegli il tipo di elemento:</h4>
                        <div className='mt-10 flex justify-between gap-x-2 sm:gap-x-20'>
                            <div onClick={() => {
                                router.push({ pathname, query: { ...user, showCreateNew: false } })
                                router.push({ pathname, query: { ...user, showWordForm: true},  })
                            }} className='bg-green-500 transition duration-300 border-4 border-transparent hover:cursor-pointer hover:border-green-700 hover:bg-green-600 text-white font-semibold rounded-lg p-5 text-xl flex flex-col items-center justify-center'>
                                Vocabolo
                                <p className='text-4xl mt-5'>&#10010;</p>
                            </div>
                            <div onClick={() => {
                                router.push({ pathname, query: { ...user, showCreateNew: false} })
                                router.push({ pathname, query: { ...user, showTranslationWordForm: true},  })
                            }} className='bg-green-500 transition duration-300 border-4 border-transparent hover:cursor-pointer hover:border-green-700 hover:bg-green-600 text-white font-semibold rounded-lg p-5 text-xl flex flex-col items-center justify-center'>
                                Traduzione
                                <p className='text-4xl mt-5'>&#10010;</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {showWordForm && <WordForm user={user} />}
            {showTranslationWordForm && <TranslationWordForm user={user} />}
        </div>
    )
}

mywords.getInitialProps = async ({ req }) => {
    const data = parseCookies(req)
    

    return {
        data: data.user && data.user,
    }
}

export default mywords