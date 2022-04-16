import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import Link from 'next/link'
import VocabulAppIcon from '../images/VocabulAppIcon.png'
import { AiOutlineUser, AiOutlineSearch, AiOutlineLogin } from 'react-icons/ai'
import { getSearchedWords } from '../services/'
import { ThemeSelector } from './'
    
const Navbar = ({ user }) => {

    const [showSearchContainer, setShowSearchContainer] = useState(false)
    const [showUserSettings, setShowUserSettings] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [searchedWords, setSearchedWords] = useState([])
    const { pathname } = useRouter()
    const [screenWidth, setScreenWidth] = useState(null)
    const [isToggled, setIsToggled] = useState(false)
    const router = useRouter()

    
    useEffect(() => { 
        if (typeof window !== 'undefined') {
            setScreenWidth(window.innerWidth)
            window.addEventListener('resize', () => { 
                setScreenWidth(window.innerWidth)
            })
        }
        setIsToggled(true)
        setTimeout(() => {
            setIsToggled(false)
        }, 1)
    }, [pathname])

    return (
        <div className='w-full fixed top-0 h-20 bg-sky-500 drop-shadow-lg z-50'>
            <div className={`grid ${screenWidth > 500 ? 'navbar-container' : 'navbar-container-mobile'} grid-cols-2 h-full content-center items-center`}>
                {screenWidth > 500 && (
                    <>
                    <div className='overflow-hidden h-full flex items-center justify-center'>
                        <Link href={'/'}>
                            <div className='hover:bg-sky-600 hover:cursor-pointer transition duration-300 flex justify-center items-center'>
                                <Image src={VocabulAppIcon} className='navbar-icon' />
                            </div>
                        </Link>
                    </div>
                    <div className='h-full flex items-center justify-between mr-5'>
                        <Link href={'/'}>
                            <div className={`${pathname === '/' ? 'bg-sky-400' : ''} hover:text-gray-200 border-transparent border-b-4 hover:border-sky-900 h-full w-full text-3xl p-5 text-white font-extrabold transition duration-300 hover:cursor-pointer flex items-center justify-center hover:bg-sky-600`}>
                                Home
                            </div>
                        </Link>
                        <div onClick={() => router.push({ pathname: '/about', query: user })} className={`${pathname === '/about' ? 'bg-sky-400' : ''} hover:text-gray-200 border-transparent border-b-4 hover:border-sky-900 h-full w-full text-3xl p-5 text-white font-extrabold transition duration-300 hover:cursor-pointer flex items-center justify-center hover:bg-sky-600`}>
                            About
                        </div>
                        <Link href={user?.nickname ? '/mywords' : '/login'}>
                            <div className={`${pathname === '/mywords' ? 'bg-sky-400' : ''} hover:text-gray-200 border-transparent border-b-4 hover:border-sky-900 h-full w-full text-3xl p-5 text-white font-extrabold transition duration-300 hover:cursor-pointer flex items-center justify-center hover:bg-sky-600`}>
                                I miei vocaboli
                            </div>
                        </Link>
                        <div className='w-1/6 hover:text-gray-200 border-transparent border-b-4 hover:border-sky-900 h-full w-full text-3xl p-5 text-white font-extrabold transition duration-300 hover:cursor-pointer flex items-center justify-center hover:bg-sky-600'>
                            <ThemeSelector />
                        </div>
                        <div onClick={() => setShowSearchContainer(!showSearchContainer)} className='relative hover:scale-110 h-full w-1/6 text-3xl text-white font-extrabold transition duration-300 hover:cursor-pointer flex items-center justify-center hover:bg-sky-600'>
                            <AiOutlineSearch />
                        </div>
                        <div onClick={() => setShowUserSettings(!showUserSettings)} className='h-full w-full w-1/6 text-3xl text-white font-extrabold transition duration-300 hover:cursor-pointer flex items-center justify-center hover:bg-sky-600'>
                            {!user?.nickname && (
                                <Link href={'/login'}>
                                    <AiOutlineLogin />
                                </Link>
                            )}
                            {user?.nickname && <AiOutlineUser />}
                        </div>
                        {user?.nickname && showUserSettings && (
                            <div className='top-full text-2xl gap-y-1 font-semibold text-white items-center right-0 flex flex-col w-2/12 bg-sky-500 absolute rounded-b-lg'>
                                <div onClick={() => router.push({ pathname: `/user/${user.nickname}`, query: user.nickname })} className='w-full h-full p-2 py-3 flex items-center justify-center transition duration-300 hover:cursor-pointer hover:bg-sky-600'>
                                    Profilo
                                </div>
                                <div onClick={() => {
                                    router.push({ pathname, query: { ...user, showModal: true},  })
                                    }} className='w-full h-full p-2 py-3 flex items-center justify-center transition duration-300 hover:cursor-pointer hover:bg-sky-600'>
                                    Log out
                                </div>
                            </div>
                        )}
                        {showSearchContainer && (
                            <div className='top-full w-full bg-sky-500  absolute rounded-b-lg'>
                                <input onInput={(e) => setSearchQuery(e.target.value)} type="text" placeholder='Cerca...' className='w-8/12 my-3 p-3 text-xl outline-none font-semibold rounded-lg' />
                                <button onClick={() => {
                                    getSearchedWords(searchQuery)
                                        .then((res) => {
                                            setSearchedWords(res)
                                            router.push({ pathname, query: { ...user, showSearchContainer: true, words: JSON.stringify(res)},  })
                                        })
                                    }}
                                    className='ml-5 p-3 px-5 drop-shadow-lg text-white transition duration-300 hover:bg-sky-400 bg-sky-300 my-3 rounded-lg text-xl font-semibold'
                                >Cerca</button>
                            </div>
                        )}
                    </div>
                </>
                )}
                {screenWidth <= 500 && (
                    <>
                        <div className='overflow-hidden h-full flex items-center justify-center'>
                            <Link href={'/'}>
                                <div className='hover:bg-sky-600 hover:cursor-pointer transition duration-300 flex justify-center items-center'>
                                    <Image src={VocabulAppIcon} className='navbar-icon-mobile' />
                                </div>
                            </Link>
                        </div>
                        <div onClick={() => setIsToggled(!isToggled)} className='container relative w-full h-full'>
                            <div className={`burger ${isToggled ? 'toggled' : ''}`}>
                                <span></span>
                            </div>
                        </div>
                        {isToggled && (
                            <div className='w-full absolute p-2 pb-5 bg-sky-500 top-20'>
                                <div className='flex flex-col grid-cols-1 items-center justify-between mr-5'>
                                    <Link href={'/'}>
                                        <div className={`${pathname === '/' ? 'bg-sky-400' : ''} hover:text-gray-200 border-transparent border-b-4 hover:border-sky-900 h-full w-full text-3xl p-5 text-white font-extrabold transition duration-300 hover:cursor-pointer flex items-center justify-center hover:bg-sky-600`}>
                                            Home
                                        </div>
                                    </Link>
                                    <div onClick={() => router.push({ pathname: '/about', query: user })} className={`${pathname === '/about' ? 'bg-sky-400' : ''} hover:text-gray-200 border-transparent border-b-4 hover:border-sky-900 h-full w-full text-3xl p-5 text-white font-extrabold transition duration-300 hover:cursor-pointer flex items-center justify-center hover:bg-sky-600`}>
                                        About
                                    </div>
                                    <Link href={user?.nickname ? '/mywords' : '/login'}>
                                        <div className={`${pathname === '/mywords' ? 'bg-sky-400' : ''} hover:text-gray-200 border-transparent border-b-4 hover:border-sky-900 h-full w-full text-3xl p-5 text-white font-extrabold transition duration-300 hover:cursor-pointer flex items-center justify-center hover:bg-sky-600`}>
                                            I miei vocaboli
                                        </div>
                                    </Link>
                                    <div className='w-1/6 hover:text-gray-200 border-transparent border-b-4 hover:border-sky-900 h-full w-full text-3xl p-5 text-white font-extrabold transition duration-300 hover:cursor-pointer flex items-center justify-center hover:bg-sky-600'>
                                        <ThemeSelector />
                                    </div>
                                    <div onClick={() => setShowSearchContainer(!showSearchContainer)} className='relative hover:scale-110 h-full w-1/6 text-3xl text-white font-extrabold transition duration-300 hover:cursor-pointer flex items-center justify-center hover:bg-sky-600'>
                                        <AiOutlineSearch />
                                    </div>
                                    <div onClick={() => setShowUserSettings(!showUserSettings)} className='h-full w-full w-1/6 text-3xl text-white font-extrabold transition duration-300 hover:cursor-pointer flex items-center justify-center hover:bg-sky-600'>
                                        {!user?.nickname && (
                                            <Link href={'/login'}>
                                                <AiOutlineLogin />
                                            </Link>
                                        )}
                                        {user?.nickname && <AiOutlineUser />}
                                    </div>
                                    {user?.nickname && showUserSettings && (
                                        <div className='top-full w-full text-2xl gap-y-1 font-semibold text-white items-center right-0 flex flex-col bg-sky-500 absolute rounded-b-lg'>
                                            <div onClick={() => router.push({ pathname: `/user/${user.nickname}`, query: user.nickname })} className='w-full h-full p-2 py-3 flex items-center justify-center transition duration-300 hover:cursor-pointer hover:bg-sky-600'>
                                                Profilo
                                            </div>
                                            <div onClick={() => {
                                                router.push({ pathname, query: { ...user, showModal: true},  })
                                                }} className='w-full h-full p-2 py-3 flex items-center justify-center transition duration-300 hover:cursor-pointer hover:bg-sky-600'>
                                                Log out
                                            </div>
                                        </div>
                                    )}
                                    {showSearchContainer && (
                                        <div className='top-full w-full bg-sky-500 right-0 pl-3 absolute rounded-b-lg'>
                                            <input onInput={(e) => setSearchQuery(e.target.value)} type="text" placeholder='Cerca...' className='w-8/12 my-3 p-3 text-xl outline-none font-semibold rounded-lg' />
                                            <button onClick={() => {
                                                getSearchedWords(searchQuery)
                                                    .then((res) => {
                                                        setSearchedWords(res)
                                                        router.push({ pathname, query: { ...user, showSearchContainer: true, words: JSON.stringify(res)},  })
                                                    })
                                                }}
                                                className='ml-5 p-3 px-5 drop-shadow-lg text-white transition duration-300 hover:bg-sky-400 bg-sky-300 my-3 rounded-lg text-xl font-semibold'
                                            >Cerca</button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    )
}

export default Navbar