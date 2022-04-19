import React, { useState, useEffect } from 'react'
import { parseCookies } from "../../helpers"
import { useCookies } from 'react-cookie'
import { useRouter } from 'next/router'
import { Word, Navbar, ModalConfirm, SearchedWordsContainer, WordForm, TranslationWordForm, SideBar } from '../../components'
import { getFavoriteById, getWordBySlug } from '../../services'

const favorites = ({ data }) => {

    const [user, setUser] = useState(null)
    const [showModalConfirm, setShowModalConfirm] = useState(false)
    const [showSearchedWordsContainer, setShowSearchedWordsContainer] = useState(false)
    const [cookie, setCookie] = useCookies(['user'])
    const [searchedWords, setSearchedWords] = useState([])
    const [showCreateNew, setShowCreateNew] = useState(false)
    const [showWordForm, setShowWordForm] = useState(false)
    const [showTranslationWordForm, setShowTranslationWordForm] = useState(false)
    const [favoritesUserNickname, setFavoritesUserNickname] = useState([])
    const [favorites, setFavorites] = useState([])
    const { pathname } = useRouter()
    const router = useRouter()
    
    
    useEffect(() => {
        console.log(cookie);
        console.clear()

        if (!data) {
            setUser(router.query)
            setCookie('user', JSON.parse(router.query), {
                path: '/',
                maxAge: 500000,
                sameSite: true,
            })
        } else {
            setUser(JSON.parse(data))
        }

        router.push('/mywords/favorites')
        
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

    useEffect(() => {
        if (user?.favorite) {
            console.log(user);
            getFavoriteById(user.favorite.id)
                .then((res) => {
                    setFavoritesUserNickname(res.favoritesUserNickname)
                    if (res.favoritesUserNickname.favorites) {
                        res.favoritesUserNickname.favorites.map((favorite) => {
                            getWordBySlug(favorite)
                                .then((result) => {
                                    setFavorites((prevState) => [...prevState, result])
                                    console.log(favorites)
                                })
                        })
                    } else {
                        console.log(favoritesUserNickname);
                    }
                })
        }

    }, [user])

    return (
        <div>
            <Navbar user={user} />
            {showModalConfirm && <ModalConfirm user={user} />}
            {showSearchedWordsContainer && <SearchedWordsContainer user={user} words={searchedWords} />}
            <SideBar user={user} isIndex={false} />
            {showCreateNew && (
                <div className='fixed z-50 inset-0 bg-black opacity-60 flex items-center justify-center'>
                    <button className='opacity-100 absolute right-1 top-1 text-5xl text-white' onClick={() => router.push({ pathname, query: { ...user, showCreateNew: false} })}>&#10005;</button>
                    <div className='p-5 rounded-lg bg-white text-lg'>
                        <h4 className='text-center'>Scegli il tipo di elemento:</h4>
                        <div className='mt-10 flex justify-between gap-x-20'>
                            <div onClick={() => {
                                router.push({ pathname, query: { ...user, showCreateNew: false} })
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
            {favoritesUserNickname && (
                <div className='fixed top-20 w-9/12 right-0 overflow-y-auto container gap-5 grid grid-cols-1 sm:mr-0 mr-10 sm:grid-cols-3'>
                    {favorites.map((word) => <Word key={Math.floor(Math.random() * 10000000)} word={word} user={user} />)}
                </div>
            )}
            {showWordForm && <WordForm user={user} />}
            {showTranslationWordForm && <TranslationWordForm user={user} />}
        </div>
    )
}

favorites.getInitialProps = async ({ req }) => {
    const data = parseCookies(req)
    

    return {
        data: data.user && data.user,
    }
}

export default favorites