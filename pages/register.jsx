import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from "react-cookie"
import Link from 'next/link'
import { createUser, getUserByNickname, getUserByEmail } from '../services/'
import { AiFillInfoCircle } from 'react-icons/ai'

const register = () => {

    const [cookie, setCookie] = useCookies(["user"])
    const [isNicknameAlreadyInUse, setIsNicknameAlreadyInUse] = useState(false)
    const [isEmailAlreadyInUse, setIsEmailAlreadyInUse] = useState(false)
    const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(true)
    const router = useRouter()
    const name = useRef(null)
    const surname = useRef(null)
    const nickname = useRef(null)
    const email = useRef(null)
    const password = useRef(null)
    const repeatPassword = useRef(null)
    const pin = useRef(null)
    const [showInfo, setShowInfo] = useState(false)

    const user = {
        name: 'Francesco',
        surname: 'Omma',
        nickname: 'sasa-gamer47',
        email: 'giacomofilippi237@gmail.com',
        password: 'BrawlStars3.0'
    }

    const handleSignIn = async (user) => {
        try {
            const data = user

            getUserByNickname(user.nickname)
                .then((res) => {
                    
                    if (res !== undefined) {
                        setIsNicknameAlreadyInUse(true)
                        setTimeout(() => {
                            setIsNicknameAlreadyInUse(false)
                        }, 1500)
                    }
                })

            getUserByEmail(user.email)
                .then((res) => {
                    if (res !== undefined) {
                        setIsEmailAlreadyInUse(true)
                        setTimeout(() => {
                            setIsEmailAlreadyInUse(false)
                        }, 1500)
                    }
                })

                setTimeout(() => {






                    if (!isNicknameAlreadyInUse && !isEmailAlreadyInUse) {
                        console.log(isNicknameAlreadyInUse, isEmailAlreadyInUse)
                        createUser(data)
                            .then((res) => {
                                setCookie("user", JSON.stringify(data), {
                                    path: "/",
                                    maxAge: 60,
                                    sameSite: true,
                                })
                    
                                router.push({
                                    pathname: '/',
                                    query: user,
                                })

                            })
            
        
                    }

                }, 3000)

            

        } catch (err) {
            console.log('Error: ' + err)
        }
    }
        
    const [showPassword, setShowPassword] = useState(false)

    return (
        <div className='inset-0 absolute flex flex-col items-center justify-center bg-sky-500'>
            {showInfo && <div className='fixed z-50 inset-0 bg-black opacity-60 flex items-center justify-center'></div>}
            {showInfo && (
                <div className='fixed z-50 p-4 w-8/12 rounded-lg bg-sky-600 flex items-center drop-shadow-lg'>
                    <div onClick={() => setShowInfo(false)} className='absolute transition duration-300 hover:bg-red-600 right-0 top-0 translate-x-full -translate-y-full text-white cursor-pointer text-xl font-semibold p-2 bg-red-500 rounded-lg w-10 h-10 flex items-center justify-center'>&#10005;</div>
                    <p className='text-lg text-white'><b className='text-red-500 text-2xl font-semibold mr-2'>Attenzione:</b> il pin può essere impostato solo una volta e non può essere recuperato,
                        perdere il pin, oltre ai codici backup significa non poter accedere più al proprio account.
                        <br /><br />
                        Quindi conservare in un luogo sicuro il pin, e non dimenticarlo.
                    </p>
                </div>
            )}
            <div className='p-4 sm:w-3/12 w-7/12 rounded-lg bg-sky-600 flex flex-col gap-y-3 items-center drop-shadow-lg'>
                <h5>Registrati</h5>
                <input type="text" ref={name} placeholder='Inserisci nome' className='mt-2 p-2 w-full py-2 text-lg rounded-lg' />
                <input type="text" ref={surname} placeholder='Inserisci cognome' className='mt-2 p-2 w-full py-2 text-lg rounded-lg' />
                <input type="text" ref={nickname} placeholder='Inserisci nickname' className='mt-2 p-2 w-full py-2 text-lg rounded-lg' />
                {isNicknameAlreadyInUse && <p className='text-lg text-red-500'>Il nickname è già in uso</p>}
                <input type="email" ref={email} placeholder='Inserisci email' className='mt-2 p-2 w-full py-2 text-lg rounded-lg' />
                {isEmailAlreadyInUse && <p className='text-lg text-red-500'>La email è già in uso</p>}
                <input ref={password} type={showPassword ? "text" : "password"} placeholder="Crea password" className='p-3 w-full py-2 text-lg rounded-lg' />
                <input ref={repeatPassword} type={showPassword ? "text" : "password"} placeholder="Conferma password" className='p-3 w-full py-2 text-lg rounded-lg' />
                {!isPasswordConfirmed && <p className='text-lg text-red-500'>Le password non sono uguali</p>}
                <div className='flex items-center w-full'>
                    <input ref={pin} type={showPassword ? "text" : "password"} placeholder="Crea pin" className='p-3 w-full py-2 text-lg rounded-lg' />
                    <button onClick={() => setShowInfo(true)} className='text-2xl text-white transition duration-300 hover:scale-125 ml-5'><AiFillInfoCircle /></button>
                </div>
                <label htmlFor="showPassword" className='flex items-center text-lg cursor-pointer' ><input htmlFor='showPassword' type="checkbox" className='mr-3' onInput={() => setShowPassword(!showPassword)} />mostra password</label>
                <button className='mt-3 p-3 py-2 rounded-lg text-lg bg-sky-400'
                    onClick={() => {
                        if (password.current.value === repeatPassword.current.value) {
                            handleSignIn(
                                {
                                    name: name.current.value,
                                    surname: surname.current.value,
                                    nickname: nickname.current.value,
                                    email: email.current.value,
                                    password: password.current.value,
                                    pin: pin.current.value,
                                }
                            )
                        } else {
                            setIsPasswordConfirmed(false)
                            setTimeout(() => {
                                setIsPasswordConfirmed(true)
                            }, 1500)
                        }

                    }}
                >Registrati</button>
            </div>
            <Link href={'/login'}>
                <p className='mt-4 text-white cursor-pointer'>Hai già un account? Vai al login</p>
            </Link>
        </div>
    )
}

export default register