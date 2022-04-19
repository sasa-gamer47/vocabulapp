import React, { useState, useRef } from 'react'
import { useRouter } from 'next/router'
import { useCookies } from "react-cookie"
import Link from 'next/link'
import { loginQuery } from '../services'

const login = () => {

    const [cookie, setCookie] = useCookies(["user"])
    const router = useRouter()
    const [showPassword, setShowPassword] = useState(false)
    const email = useRef(null)
    const password = useRef(null)

    console.log(cookie);
    console.clear()

    const handleSignIn = async (user) => {
        try {
            const data = user
            
            console.log(data);
            
            loginQuery(data.email, data.password)
                .then((res) => {
                    setCookie("user", JSON.stringify(res), {
                        path: "/",
                        maxAge: 500000,
                        sameSite: true,
                    })
        
                    router.push({
                        pathname: '/',
                        query: res,
                    })
                })
            

            
            


        } catch (err) {
            console.log('Error: ' + err)
        }
    }

    return (
        <div className='inset-0 absolute flex flex-col items-center justify-center bg-sky-500'>
            <div className='p-4 rounded-lg bg-sky-600 flex flex-col gap-y-3 items-center drop-shadow-lg'>
                <h4>Login</h4>
                <input type="email" ref={email} className='mt-3 p-3 py-2 text-lg rounded-lg' />
                <input ref={password} type={showPassword ? "text" : "password"} className='p-3 py-2 text-lg rounded-lg' />
                <label htmlFor="showPassword"className='flex items-center text-lg cursor-pointer' ><input type="checkbox" name='showPassword' className='mr-3' onInput={() => setShowPassword(!showPassword)} />mostra password</label>
                <button className='mt-3 p-3 py-2 rounded-lg text-lg bg-sky-400' onClick={() => {
                    handleSignIn(
                            {
                                email: email.current.value,
                                password: password.current.value,
                            }
                        )
                }}>Login</button>
            </div>
            <p onClick={() => {

                router.push({pathname: '/resetpassword', query: `token=${Math.floor(Math.random() * 1000000000000000000)}`})
                
            }} className='mt-10 text-blue-900 text-lg underline cursor-pointer'>Hai dimenticato la password?</p>
            <Link href={'/register'}>
                <p className='mt-10 text-white cursor-pointer'>Non sei registrato? Registrati</p>
            </Link>
        </div>
    )
}

export default login