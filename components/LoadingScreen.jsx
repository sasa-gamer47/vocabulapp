import React, { useRef, useState, useEffect } from 'react'
import VocabulAppIcon from '../images/VocabulAppIcon.png'
import Image from 'next/image'
import { useRouter } from 'next/router'

const LoadingScreen = ({ hasLoaded, user }) => {

    const loader = useRef(null)
    const [percentage, setPercentage] = useState(0)
    const router = useRouter()
    const { pathname } = router

    useEffect(() => { 

        for (let i = 0; i <= 100 ; i++) {
            setTimeout(() => {
                loader.current.style.width = `${i}%`
                setPercentage(i)

                if (i === 100) {
                    setTimeout(() => {
                        router.push({ pathname, query: {...user, hasLoaded: true} })
                    }, 1000)
                }
            }, i * 300)
        }
    }, [])

    return (
        <>
            {!hasLoaded && (
                <div className='inset-0 z-50 fixed bg-sky-500 flex flex-col items-center justify-center'>
                    <Image src={VocabulAppIcon} alt='VocabulAppIcon' className='w-32 h-32' />
                    <div className='relative mt-10 w-7/12 h-8 bg-black'>
                        <div ref={loader} className='absolute h-full w-0 bg-white'></div>
                    </div>
                    <h3 className='text-white mt-5'>Caricamento: {percentage}%</h3>
                </div>
            )}
        </>
    )
}

export default LoadingScreen