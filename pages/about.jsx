import React, { useState, useEffect } from 'react'
import { parseCookies } from "../helpers/"
import { useRouter } from 'next/router'
import Link from 'next/link'
import { Navbar, ModalConfirm, SearchedWordsContainer } from '../components/'

const about = ({ data }) => {

    const [user, setUser] = useState(null)
    const [showModalConfirm, setShowModalConfirm] = useState(false)
    const [showSearchedWordsContainer, setShowSearchedWordsContainer] = useState(false)
    const [searchedWords, setSearchedWords] = useState([])
    const router = useRouter()
    
    
        useEffect(() => {
            if (!data) {
            setUser(router.query)
            } else {
            setUser(JSON.parse(data))
            }
            router.push('/about')
        
        return () => {
        }
    }, [])

    useEffect(() => {
        if (router.query?.logout == "true") {
        setUser(null)
        }

        setShowSearchedWordsContainer(router.query?.showSearchContainer == "true" ? true : false)
        setSearchedWords(router.query.words)
        setShowModalConfirm(router.query.showModal == "true" ? true : false)
    }), [router.query]

    return (
        <div>
            <Navbar user={user} />
            {showModalConfirm && <ModalConfirm user={user} />}
            {showSearchedWordsContainer && <SearchedWordsContainer user={user} words={searchedWords} /> }
            <div className='absolute top-20 dark:text-white w-full h-full'>
                <h1 className='ml-5'>About me</h1>
                <hr />
                <div className='ml-10 my-5 text-lg w-8/12 sm:w-2/12'>
                    <ul className='text-2xl'>
                        <li className='transition duration-300 hover:translate-x-5 hover:text-gray-400 hover:cursor-pointer'><Link href={`${router.pathname}#chi-sono`}>Chi sono?</Link></li>
                        <li className='transition duration-300 hover:translate-x-5 hover:text-gray-400 hover:cursor-pointer'><Link href={`${router.pathname}#cosa-faccio`}>Cosa faccio?</Link></li>
                        <li className='transition duration-300 hover:translate-x-5 hover:text-gray-400 hover:cursor-pointer'><Link href={`${router.pathname}#cos-e-questo-sito`}>Cos'è questo sito?</Link></li>
                        <li className='transition duration-300 hover:translate-x-5 hover:text-gray-400 hover:cursor-pointer'><Link href={`${router.pathname}#faq`}>FAQ</Link></li>
                    </ul>
                </div>
                <hr />
                <div className='container ml-5 my-5 w-11/12'>
                    <h2 name="chi-sono" className='mt-5'>Chi sono?</h2>
                    <p className='ml-5 text-lg'>
                        Sono un ragazzino di 15 anni che ha deciso di imparare a programmare
                        per via della grande curiosità, mi è sempre piaciuto poter utilizzare i
                        servizi e mi sarebbe piaciuto crearli.
                    </p>
                    <h2 name="cosa-faccio" className='mt-5'>Cosa faccio?</h2>
                    <p className='ml-5 text-lg'>
                        Attualmente faccio lo studente (secondaria secondo grado, secondo anno), e 
                        mi immetto nel mondo del development, tra cui anche web development.
                    </p>
                    <h2 name="cos-e-questo-sito" className='mt-5'>Cos'è questo sito?</h2>
                    <p className='ml-5 text-lg'>
                        Questo sito è stato creato (oltre che per test) per poter usufruire di un 
                        vocabolario online, dove ognuno può pubblicare il significato di una parola (o di una frase),
                        o anche di una traduzione.
                    </p>
                    <h2 name="faq" className='mt-5'>FAQ</h2>
                    <p className='ml-10 text-lg'>
                        <ul>
                            <li>
                                <h4 className='ml-2 mt-2'>Come creo un account?</h4>
                                <p className='ml-10'>
                                    Basta cliccare sull'icona del login e cliccare su "Non sei registrato? Registrati", oppure cliccare <Link href={'/register'}>qui</Link>.
                                </p>
                                <h4 className='ml-2 mt-2'>Come creo un nuovo vocabolo?</h4>
                                <p className='ml-10'>
                                    Una volta loggati, basta andare su I miei vocaboli e cliccare su Nuovo vocabolo .
                                </p>
                            </li>
                        </ul>
                        
                    </p>
                </div>
                <h3 className='mt-10'>Versione: 1.0.0</h3>
            </div>
        </div>
    )
}

// 1.0.0

/**
 * the first number is for massive changes, all has changed
 * the second number is for minor changes, only some things have changed
 * the number is the for changed that will not be seen by the user, patch are an example
 */

about.getInitialProps = async ({ req }) => {
    const data = parseCookies(req)
    

    return {
        data: data.user && data.user,
    }
}


export default about