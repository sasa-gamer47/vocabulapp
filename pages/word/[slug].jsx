import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { parseCookies } from '../../helpers/'
import { useCookies } from 'react-cookie'
import { Navbar, ModalConfirm, SearchedWordsContainer } from '../../components/'
import { updateFavorite, getWordBySlug, getFavoriteById, updateFavoriteDel, createFavorite } from '../../services'
import { AiOutlineFlag, AiFillHeart, AiOutlineDelete } from 'react-icons/ai'
import moment from 'moment'


const WordDetails = ({ data }) => {
    
    const router = useRouter()
    const [cookie, setCookie] = useCookies(['user'])
    const [user, setUser] = useState(null)
    const [showModalConfirm, setShowModalConfirm] = useState(false)
    const [showSearchedWordsContainer, setShowSearchedWordsContainer] = useState(false)
    const [searchedWords, setSearchedWords] = useState([])
    const [favoritesUserNickname, setFavoritesUserNickname] = useState([])
    const [word, setWord] = useState(null)
    const [screenWidth, setScreenWidth] = useState(null)

    // console.log(user);
    // console.log(data, word);

    useEffect(() => {
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
        
        return () => {}
    }, [])
    
    useEffect(() => {

        if (router.query?.logout == 'true') {
            setUser(null)
            setCookie('user', null, {
                path: '/',
                maxAge: 500000,
                sameSite: true,
            })
        }
        
        setShowSearchedWordsContainer(
            router.query?.showSearchContainer == 'true' ? true : false
            )
        setShowModalConfirm(router.query?.showModal == 'true' ? true : false)

        if (typeof window !== 'undefined') {
            setScreenWidth(window.innerWidth)
            window.addEventListener('resize', () => {
                setScreenWidth(window.innerWidth)
            })
        }
    }, [router.query])
    
    useEffect(() => {
        if (user?.favorite) {
            getFavoriteById(user.favorite.id).then((res) => {
                setFavoritesUserNickname(res.favoritesUserNickname)
            })
        }

    }, [user])


    useEffect(() => {
        async function getWord() {
            const result = await getWordBySlug(
                JSON.parse(JSON.parse(JSON.stringify(router.query.word))).slug
            )
            setWord(result)

                // router.push(`/word/${result.slug}`)
            return result
        }

        getWord()
    }, [])


    
    
    return (
        <div>
            <Navbar user={user} />
                {showModalConfirm && <ModalConfirm user={user} />}
            {showSearchedWordsContainer && (
                <SearchedWordsContainer user={user} words={searchedWords} />
            )}
            {word && favoritesUserNickname && (
                <div className='w-full mt-20 text-black dark:text-white flex justify-center '>
                    <div className='sm:w-7/12 w-10/12 rounded-lg dark:bg-gray-700 p-5 text-center'>
                        {screenWidth > 500 && (
                            <h1>{word.word}</h1>
                        )}
                        {screenWidth <= 500 && (
                            <h3>{word.word}</h3>
                        )}
                        {word.isATranslation && screenWidth > 500 && (
                            <div>
                                <h2>{word.startLang} &rarr; {word.translatedLang}</h2>
                                <h2>Traduzione: { word.translation }</h2>
                            </div>
                        )}
                        {word.isATranslation && screenWidth <= 500 && (
                            <div>
                                <h4>{word.startLang} &rarr; {word.translatedLang}</h4>
                                <h4>Traduzione: { word.translation }</h4>
                            </div>
                        )}
                        <div className='text-lg mt-5 rounded-lg p-2 dark:bg-gray-600'>{word.meaning}</div>
                        {word.other && <div className='text-lg mt-5 rounded-lg p-2 dark:bg-gray-600'>{word.other}</div>}
                        <p className='font-semibold text-lg mt-3'>Creato il { moment(word.createdAt).format('DD/MM/YYYY') } alle { moment(word.createdAt).format('HH:mm:ss') } </p>  
                        <p onClick={() => router.push({ pathname: `/user/${word.userInfo.nickname}`, query: user.nickname },)} className='font-semibold cursor-pointer text-lg mt-3'>Creato da {word.userInfo.nickname}</p>
                        <div className={`w-full flex items-center justify-center ${favoritesUserNickname?.favorites?.indexOf(word.slug) !== -1 ? 'text-red-500' : ''}`}>
                            <div className='mt-5 text-3xl cursor-pointer transition duration-300 hover:text-red-400' onClick={() => {
                                if (user.favorite) {
                                    if (favoritesUserNickname?.favorites?.indexOf(word.slug) === -1) {
                                        console.log('found');
                                        updateFavorite({
                                            favorites: {
                                                favorites: [...favoritesUserNickname.favorites, word.slug]
                                            },
                                            userId: user.id,
                                            wordId: word.id,
                                            nickname: user.nickname,
                                        })
                                        .then((res) => console.log(res))
                                    } else {
                                        
                                        // console.log('not found');
                                        favoritesUserNickname.favorites.splice(favoritesUserNickname?.favorites?.indexOf(word.slug), 1)
    
                                        updateFavoriteDel({
                                            favorites: {
                                                favorites: favoritesUserNickname.favorites
                                            },
                                            userId: user.id,
                                            wordId: word.id,
                                            nickname: user.nickname,
                                        })
                                            .then((res) => console.log(res))
                                    
    
                                        // Array().splice()
                                    }
                                } else {
                                    console.log('not found');
                                    createFavorite({
                                        favorites: {
                                            favorites: [word.slug]
                                        },
                                        userId: user.id,
                                        nickname: user.nickname,
                                        wordId: word.id,
                                    }).then((res) => console.log(res))
                                }
                            }}>
                                <AiFillHeart />
                            </div>
                        </div>
                    </div>
                </div>
            )}
            {word && user && word.userInfo.id === user.id && (
                <button className='fixed text-4xl font-semibold right-3 bottom-3 duration-300 transition hover:bg-red-600 bg-red-500 text-white p-3 rounded-lg'><AiOutlineDelete /></button>
            )}
            {word && user && word.userInfo.id !== user.id && (
                <button className='fixed text-4xl font-semibold right-3 bottom-3 duration-300 transition hover:bg-red-600 bg-red-500 text-white p-3 rounded-lg'><AiOutlineFlag /></button>
            )}
        </div>
    )
}

WordDetails.getInitialProps = async ({ req }) => {
    const data = parseCookies(req)


    return {
        data: data.user && data.user,
    }
}

export default WordDetails
