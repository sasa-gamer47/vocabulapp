import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

const SideBar = ({ user, isIndex }) => {

    const [collapsed, setCollapsed] = useState(false)
    const { pathname } = useRouter()
    const router = useRouter()
    const [screenWidth, setScreenWidth] = useState(null)

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setScreenWidth(window.innerWidth)
            window.addEventListener('resize', () => {
            setScreenWidth(window.innerWidth)
            })
        }
    }, [pathname])


    return (
        <div className='left-0 bottom-0 top-20'>
            <div className={`${screenWidth > 500 ? (collapsed ? 'w-10' : 'w-3/12') : (collapsed ? 'w-10' : 'w-7/12')} top-20 bottom-0 z-40 fixed bg-sky-500 p-3`}>
                {/* side navbar */}
                <button onClick={() => setCollapsed(!collapsed)} className={`mb-5 absolute sm:text-3xl text-xl text-white ${collapsed ? 'right-2' : 'left-3'}`}>{collapsed ? '→' : '←'}</button>   
                {!collapsed && (
                    <>
                        <div className='h-full z-50 w-full flex flex-col justify-between items-center'>
                            <div onClick={() => router.push({ pathname, query: { ...user, showCreateNew: true } })} className='w-full h-full flex items-center justify-center sm:text-3xl text-xl font-semibold text-white transition duration-300 hover:bg-sky-600 border-r-8 hover:translate-x-3 border-transparent hover:border-sky-700 hover:cursor-pointer'>Crea nuovo</div>
                            {isIndex && (
                                <>
                                    <div onClick={() => router.push({ pathname: `mywords/favorites`, query: user })} className={`${pathname == '/mywords/favorites' ? 'bg-sky-400' : ''} w-full h-full flex items-center justify-center sm:text-3xl text-xl font-semibold text-white transition duration-300 hover:bg-sky-600 border-r-8 hover:translate-x-3 border-transparent hover:border-sky-700 hover:cursor-pointer`}>Preferite</div>
                                    <div onClick={() => router.push({ pathname: `mywords/mywords`, query: user })} className={`${pathname == '/mywords/mywods' ? 'bg-sky-400' : ''} w-full h-full flex items-center justify-center sm:text-3xl text-xl font-semibold text-white transition duration-300 hover:bg-sky-600 border-r-8 hover:translate-x-3 border-transparent hover:border-sky-700 hover:cursor-pointer`}>I miei vocaboli</div>
                                    <div onClick={() => router.push({ pathname: `mywords/mytranslations`, query: user })} className={`${pathname == '/mywords/mytranslations' ? 'bg-sky-400' : ''} w-full h-full flex items-center justify-center sm:text-3xl text-xl font-semibold text-white transition duration-300 hover:bg-sky-600 border-r-8 hover:translate-x-3 border-transparent hover:border-sky-700 hover:cursor-pointer`}>Le mie traduzioni</div>
                                </>
                            )}
                            {!isIndex && (
                                <>
                                    <div onClick={() => router.push({ pathname: `../mywords/favorites`, query: user })} className={`${pathname == '/mywords/favorites' ? 'bg-sky-400' : ''} w-full h-full flex items-center justify-center sm:text-3xl text-xl font-semibold text-white transition duration-300 hover:bg-sky-600 border-r-8 hover:translate-x-3 border-transparent hover:border-sky-700 hover:cursor-pointer`}>Preferite</div>
                                    <div onClick={() => router.push({ pathname: `../mywords/mywords`, query: user })} className={`${pathname == '/mywords/mywords' ? 'bg-sky-400' : ''} w-full h-full flex items-center justify-center sm:text-3xl text-xl font-semibold text-white transition duration-300 hover:bg-sky-600 border-r-8 hover:translate-x-3 border-transparent hover:border-sky-700 hover:cursor-pointer`}>I miei vocaboli</div>
                                    <div onClick={() => router.push({ pathname: `../mywords/mytranslations`, query: user })} className={`${pathname == '/mywords/mytranslations' ? 'bg-sky-400' : ''} w-full h-full flex items-center justify-center sm:text-3xl text-xl font-semibold text-white transition duration-300 hover:bg-sky-600 border-r-8 hover:translate-x-3 border-transparent hover:border-sky-700 hover:cursor-pointer`}>Le mie traduzioni</div>
                                </>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default SideBar