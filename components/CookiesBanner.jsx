import React, { useState, useEffect } from 'react'

const CookiesBanner = ({ show }) => {

    const [showPrivacyTerms, setShowPrivacyTerms] = useState(false)
    const [useCookies, setUseCookies] = useState(true)
    const [hasAcceptedPrivacyTerms, setHasAcceptedPrivacyTerms] = useState(false)
    const [hasSubmitted, setHasSubmitted] = useState(false)
    const [showBanner, setShowBanner] = useState(true)

    useEffect(() => {
        console.log(useCookies);
    }, [])


    return (
        <>
            {showBanner && (
                <div>
                    <div className={`fixed ${show ? '' : 'translate-y-full opacity-0'} transition duration-300 inset-0 transition opacity-60 bg-black z-50 flex justify-center`}>
                    </div>
                    <div className={`fixed ${show ? '' : 'translate-y-full opacity-0'} opacity-100 transition duration-1000 dark:bg-gray-900 bottom-5 w-11/12 sm:w-7/12 rounded-2xl p-4 bg-white z-50 left-1/2 -translate-x-1/2`}>
                        <h3 className='dark:text-white ml-10'>Questo sito utilizza i cookie: </h3>
                        <div className='dark:bg-gray-800 dark:text-white text-lg sm:text-xl w-full rounded-lg p-2 bg-gray-200 mt-5'>
                            Questo sito utilizza i cookie per garantire una migliore gestione della privacy,
                            e sono usati al solo scopo di immagazzinare i dati inseriti dall'utente nel browser.
                        </div>
                        {hasSubmitted && !hasAcceptedPrivacyTerms && <p className='text-lg text-red-500 m-5'>Devi prima accettare i termini di privacy</p>}
                        <label htmlFor="checked" className='cursor-pointer text-black dark:text-white ml-3 mt-10 flex items-center' ><input onChange={() => setHasAcceptedPrivacyTerms(!hasAcceptedPrivacyTerms)} type="checkbox" className='mr-3' name="checked" id="checked" />Confermo di aver letto e accetto i <p onClick={() => setShowPrivacyTerms(!showPrivacyTerms)} className='anchor ml-1'> termini di privacy</p></label>
                        <div className='flex justify-around items-center w-full mt-10'>
                            <button className='text-lg sm:text-2xl font-semibold text-white rounded-lg bg-red-500 p-2 sm:p-3 px-7 transition duration-300 hover:bg-red-600' onClick={() => {
                                setUseCookies(false)

                                if (typeof window !== "undefined") {
                                    localStorage.setItem('useCookies', false)
                                }

                                setShowBanner(false)
                                setHasSubmitted(true)
                            }}>Rifiuta ✕</button>
                            <button className='text-lg sm:text-2xl font-semibold text-white rounded-lg bg-green-500 p-2 sm:0 p-3 px-7 transition duration-300 hover:bg-green-600' onClick={() => {
                                if (hasAcceptedPrivacyTerms) {
                                    setUseCookies(true)

                                    if (typeof window !== "undefined") {
                                        localStorage.setItem('useCookies', true)
                                    }

                                    setShowBanner(false)
                                    setHasSubmitted(true)
                                } else {
                                    setHasSubmitted(true)

                                    setTimeout(() => setHasSubmitted(false), 1500)

                                }
                            }}>Accetta ✓</button>
                        </div>
                    </div>
                    {showPrivacyTerms && (
                        <div className='fixed dark:bg-gray-900 h-3/4 dark:text-white bottom-5 w-10/12 sm:w-7/12 rounded-2xl p-2 sm:p-4 bg-white z-50 left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2'>
                            <button onClick={() => setShowPrivacyTerms(false)} className='absolute top-0 right-0 w-10 h-10 flex items-center justify-center bg-red-500 rounded-lg font-extrabold text-2xl p-1 translate-x-full -translate-y-full transition duration-300 hover:bg-red-600'>✕</button>
                            <div className='relative container h-full w-full'>
                                <h2 className='sm:text-4xl text-2xl'>Termini di privacy: </h2>
                                <div className='dark:bg-gray-700 absolute bottom-0 top-10 dark:text-white text-lg sm:text-xl w-full rounded-lg p-2 bg-gray-200 mt-10'>
                                    I cookie vengono esclusivamente utilizzati per fini dedicati al conservamento e alla facilitizzazione
                                    dell'utilizzo del sito, non vengo in alcun modo controllati da nessun software di terze parti e venduti a terzi,
                                    rimangono nel browser e sono dedicati al mantenimento dei dati base all'interno del sito.
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            )}
    
        </>
    )
}

export default CookiesBanner