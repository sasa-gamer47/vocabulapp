// import emailjs from 'emailjs-com'
import { parseCookies, randomNumberBetween } from '../helpers'
import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { getAllUserInfos, updatePassword } from '../services'
import { useCookies } from 'react-cookie'

//once you've used a code, they will be 7 and so on, (till you generate new ones)
// import { STMPClient } from 'emailjs'

const resetpassword = ({ codes }) => {
  codes = JSON.parse(codes)
  
  const pin = useRef(null)
  const codeRef = useRef(null)
  const form = useRef(null)
  const nickname = useRef(null)
  const email = useRef(null)
  const password = useRef(null)
  const repeatPassword = useRef(null)
  const [user, setUser] = useState(null)
  const [users, setUsers] = useState([])
  const [changingPassword, setChangingPassword] = useState(false)
  const [isPasswordConfirmed, setIsPasswordConfirmed] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [hasExpired, setHasExpired] = useState(false)
  const methods = ['pin', 'code']
  const [chosenResetMethod, setChosenResetMethod] = useState(methods[0])
  const router = useRouter()
  const { pathname, query } = router
  const [error, setError] = useState(false)


  async function sendEmail(e) {
    e.preventDefault()


    const formData = {}


    Array.from(e.currentTarget.elements).forEach((field) => {
      if (!field.name) return
      formData[field.name] = field.value
    })

    console.log(formData);
    await fetch('/api/sendEmail', {
      method: 'POST',
      body: JSON.stringify(formData),
    })
  }

  useEffect(() => {   // check if the reset token has expired
    if (query.token) {
      setTimeout(() => setHasExpired(true), 3000000)

      getAllUserInfos().then((res) => setUsers(res))
    }
  }, [query.token])
  
  
  if (hasExpired) {
    setTimeout(() => {
      router.push('/login')
    }, 5000)
  }
    return (
      <div className="absolute inset-0 flex flex-col items-center justify-center bg-sky-500">
        {!hasExpired && chosenResetMethod === methods[0] && (
          <form onSubmit={(e) => {
            e.preventDefault()
            if (!changingPassword) {
              users.map((user) => {
  
                if (!changingPassword && (user.email === email.current.value && user.pin === pin.current.value) || (user.nickname === nickname.current.value && user.pin === pin.current.value)) {
                  setUser(user)
                  setChangingPassword(true)
                } else {
                  setError(true)
                  setTimeout((() => setError(false)), 5000)
                }
              })
              
            } else {
              if (password.current.value === repeatPassword.current.value) {
                // setUser({ ...user, password: password.current.value })
                updatePassword({ nickname: user.nickname, password: password.current.value }).then((res) => console.log(res))
                // setChangingPassword(false)
                setTimeout(() => {
                  router.push('/login')
                }, 5000)

                // console.log(user);
              } else {
                setIsPasswordConfirmed(false)
                setTimeout((() => setIsPasswordConfirmed(true)), 5000)

              }
            }
            
          }} method='post' ref={form} className='p-4 rounded-lg bg-sky-600 flex flex-col gap-y-3 items-center drop-shadow-lg'>
            {!changingPassword && (
              <>
                <h4>Recupera password</h4>
                <p>Inserisci anche o l'email o il nickname o entrambe</p>
                <input name='email' type="email" placeholder="Inserisci l'email" ref={email} className='mt-3 p-3 py-2 text-lg rounded-lg' />
                <input name='text' type="text" placeholder="Inserisci il nickname" ref={nickname} className='mt-3 p-3 py-2 text-lg rounded-lg' />
                <input name='pin' type="password" placeholder='Inserisci il pin' ref={pin} className='mt-3 p-3 py-2 text-lg rounded-lg' />
                {error && <p className='text-lg text-red-500'>Uno dei campi non è corretti</p>}
              </>
            )}
            {changingPassword && (
              <>
                <h4>Crea nuova password</h4>
                <input ref={password} type={showPassword ? "text" : "password"} placeholder="Crea password" className='p-3 w-full py-2 text-lg rounded-lg' />
                <input ref={repeatPassword} type={showPassword ? "text" : "password"} placeholder="Conferma password" className='p-3 w-full py-2 text-lg rounded-lg' />
                {!isPasswordConfirmed && <p className='text-lg text-red-500'>Le password non sono uguali</p>}
                <label htmlFor="showPassword" className='flex items-center text-lg cursor-pointer' ><input htmlFor='showPassword' type="checkbox" className='mr-3' onInput={() => setShowPassword(!showPassword)} />mostra password</label>
              </>
            )}
            <input type="submit" className='cursor-pointer mt-3 p-3 py-2 rounded-lg text-lg bg-sky-400' value="Reimposta password" />
            <p className='mt-10 text-white cursor-pointer' onClick={() => setChosenResetMethod(methods[1])}>Non ricordi il pin? Usa un codice backup</p>
          </form>
        )}
        {!hasExpired && chosenResetMethod === methods[1] && (
          <form onSubmit={(e) => {
            e.preventDefault()
            if (!changingPassword) {
              codes.map((code) => {
                if (!changingPassword && codeRef.current.value === code) {
                  console.log(code);
                  setUser(user)
                  setChangingPassword(true)
                } else {
                  setError(true)
                  setTimeout((() => setError(false)), 5000)
                }
              })
            } else {
              if (password.current.value === repeatPassword.current.value) {
                // setUser({ ...user, password: password.current.value })
                updatePassword({ nickname: user.nickname, password: password.current.value }).then((res) => console.log(res))
                // setChangingPassword(false)
                setTimeout(() => {
                  router.push('/login')
                }, 5000)

                // console.log(user);
              } else {
                setIsPasswordConfirmed(false)
                setTimeout((() => setIsPasswordConfirmed(true)), 5000)

              }
            }
          }} method='post' ref={form} className='p-4 rounded-lg bg-sky-600 flex flex-col gap-y-3 items-center drop-shadow-lg'>
            {!changingPassword && (
              <div>
                <h4>Recupera password</h4>
                <input name='code' ref={codeRef} type="text" placeholder='Inserisci un codice backup' className='mt-3 p-3 py-2 text-lg rounded-lg' />
                <p className='mt-10 text-white cursor-pointer' onClick={() => setChosenResetMethod(methods[0])}>Non hai un codice backup? Utilizza il pin</p>
              </div>
            )}
                {changingPassword && (
                  <>
                <h4>Crea nuova password</h4>
                <input ref={password} type={showPassword ? "text" : "password"} placeholder="Crea password" className='p-3 w-full py-2 text-lg rounded-lg' />
                <input ref={repeatPassword} type={showPassword ? "text" : "password"} placeholder="Conferma password" className='p-3 w-full py-2 text-lg rounded-lg' />
                {!isPasswordConfirmed && <p className='text-lg text-red-500'>Le password non sono uguali</p>}
                <label htmlFor="showPassword" className='flex items-center text-lg cursor-pointer' ><input htmlFor='showPassword' type="checkbox" className='mr-3' onInput={() => setShowPassword(!showPassword)} />mostra password</label>
              </>
            )}
            <input type="submit" className='cursor-pointer mt-3 p-3 py-2 rounded-lg text-lg bg-sky-400' value="Reimposta password" />
          </form>
        )}
        {hasExpired && <h3 className='font-semibold text-red-500'>Il collegamento alla pagina è scaduto, ricarica e riprova</h3>}
        <p className='mt-10 text-white cursor-pointer' onClick={() => router.push('/login')}>Ricordi la password? Accedi</p>
      </div>
    )
}

resetpassword.getInitialProps = async ({ req }) => {
    const data = parseCookies(req)
    

    return {
        codes: data.backupCodes && data.backupCodes,
    }
}

export default resetpassword