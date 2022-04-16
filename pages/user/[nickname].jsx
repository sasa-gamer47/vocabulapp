import React, { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { AiOutlineLoading3Quarters, AiOutlineEdit, AiOutlineSetting } from 'react-icons/ai'
import { getUserByNickname, getWordBySlug, getFavoriteById, updateUserInfo } from '../../services'
import { useCookies } from 'react-cookie'
import { parseCookies, randomNumberBetween } from '../../helpers/'
import { Navbar, ModalConfirm, SearchedWordsContainer, Word } from '../../components'
// import emailjs from 'emailjs-com'
const UserInfo = ({ data, codes }) => {

  codes = codes && JSON.parse(codes)

  const maxCodes = 8
  const [cookie, setCookie] = useCookies(['user'])
  const [isEditingProfile, setIsEditingProfile] = useState(false)
  const [showBackupCodes, setShowBackupCodes] = useState(false)
    const [words, setWords] = useState([])
    const [user, setUser] = useState(null)
    const [userWords, setUserWords] = useState([])
    const [userTranslations, setUserTranslations] = useState([])
    const [currentUser, setCurrentUser] = useState(null)
    const [showModalConfirm, setShowModalConfirm] = useState(false)
    const [showSearchedWordsContainer, setShowSearchedWordsContainer] = useState(false)
    const [searchedWords, setSearchedWords] = useState([])
    const [showCookieBanner, setShowCookieBanner] = useState(false)
    const [useCookie, setUseCookie] = useState(true)
    const [loading, setLoading] = useState(true)
    const router = useRouter()
    const [favorites, setFavorites] = useState([])
    const buttonOptions = ["favorites", "mywords", "mytranslations"]
    const [selectedButton, setSelectedButton] = useState(buttonOptions[0])
    const { pathname, query: nickname } = useRouter()
    const name = useRef(null)
    const surname = useRef(null)
  const password = useRef(null)
  let starterBackupCodes = [createBackupCode(8), createBackupCode(8), createBackupCode(8), createBackupCode(8), createBackupCode(8), createBackupCode(8), createBackupCode(8), createBackupCode(8)]
  
  function createBackupCode(len) {
    const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"]
    const letters = ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "a", "s", "d", "f", "g", "h", "j", "k", "l", "z", "x", "c", "v", "b", "n", "m"]
    let code = "" 
    
    for (let i = 0; i < len; i++) {
      if (i % 2 === 0) {
        code += numbers[randomNumberBetween(0, numbers.length - 1)]
      } else {
        code += letters[randomNumberBetween(0, letters.length - 1)]
      }
    }

    return code
  }

  useEffect(() => {
        if (user) {
            user.word.map((word) => {
                if (!word.isATranslation) {
                    getWordBySlug(word.slug)
                        .then((result) => {
                            setUserWords((prevState) => [...prevState, result])
                        })
                }
                if (word.isATranslation) {
                    getWordBySlug(word.slug)
                        .then((result) => {
                            setUserTranslations((prevState) => [...prevState, result])
                        })
                }
            })
        }
        if (user?.favorite) {
            getFavoriteById(user.favorite.id).then((res) => {
                // setFavoritesUserNickname(res.favoritesUserNickname)
                if (res.favoritesUserNickname.favorites) {
                    res.favoritesUserNickname.favorites.map((favorite) => {
                        getWordBySlug(favorite).then((result) => {
                        setFavorites((prevState) => [...prevState, result])
                        // console.log(favorites)
                        })
                    })
                }
            })
        }
    }, [user])

    useEffect(() => {
        if (nickname.nickname) {
            getUserByNickname(nickname.nickname)
                .then(user => {
                    setUser(user)
                    setLoading(false)
                })
        }
            
        console.log(starterBackupCodes);
        console.log(starterBackupCodes);
      
      if (!codes) {
        setCookie('backupCodes', starterBackupCodes, {
          path: '/',
          maxAge: 9999999999999,
          sameSite: true,
        })
      }
    }, [nickname])

    useEffect(() => {
        if (!data) {
            setUser(router.query)
            setCookie('user', JSON.parse(router.query), {
                path: '/',
                maxAge: 500000,
                sameSite: true,
            })
        } else {
            if (useCookie) {
                setCurrentUser(JSON.parse(data))
            }
        }
        // router.push('/')

        return () => {}
    }, [])

    useEffect(() => {
    if (router.query?.logout == 'true') {
        setCurrentUser(null)
        setCookie('user', null, {
            path: '/',
            maxAge: 500000,
            sameSite: true,
        })
    }

    setShowSearchedWordsContainer(
        router.query?.showSearchContainer == 'true' ? true : false
    )
    setSearchedWords(router.query.words)
    setShowModalConfirm(router.query?.showModal == 'true' ? true : false)
    }),
    [router.query]

    return (
      <>
        {loading && (
          <div className="mt-10 flex w-full animate-spin items-center justify-center text-4xl font-semibold text-sky-400 drop-shadow-lg">
            <AiOutlineLoading3Quarters />
          </div>
        )}
        {!loading && user && currentUser && (
          <>
            <Navbar user={user} />
            {showModalConfirm && <ModalConfirm user={user} />}
            {showSearchedWordsContainer && (
              <SearchedWordsContainer user={user} words={searchedWords} />
            )}
            <div className="mt-20 flex w-full items-center justify-center text-4xl font-semibold text-sky-400 drop-shadow-lg">
              <div className="ml-4 mt-5">
                <h1 className="font-semibold">{user.nickname}</h1>
                <h2 className="mt-5 font-semibold">
                  {user.name} {user.surname}
                </h2>
              </div>
            </div>
            <div className="mt-20 flex w-full items-center justify-center text-xl font-semibold text-sky-400 drop-shadow-lg">
              <button
                onClick={() => setSelectedButton(buttonOptions[0])}
                className={`${
                  selectedButton === buttonOptions[0]
                    ? 'bg-sky-400 text-white'
                    : ''
                } border-2 border-gray-500 sm:p-5 p-2 shadow-lg transition duration-300 hover:bg-gray-900 text-sm sm:text-xl`}
              >
                Preferiti
              </button>
              <button
                onClick={() => setSelectedButton(buttonOptions[1])}
                className={`${
                  selectedButton === buttonOptions[1]
                    ? 'bg-sky-400 text-white'
                    : ''
                } border-2 border-gray-500 sm:p-5 p-2 shadow-lg transition duration-300 hover:bg-gray-900 text-sm sm:text-xl`}
              >
                Parole create
              </button>
              <button
                onClick={() => setSelectedButton(buttonOptions[2])}
                className={`${
                  selectedButton === buttonOptions[2]
                    ? 'bg-sky-400 text-white'
                    : ''
                } border-2 border-gray-500 sm:p-5 p-2 shadow-lg transition duration-300 hover:bg-gray-900 text-sm sm:text-xl`}
              >
                Traduzioni create
              </button>
            </div>
            <div className="mt-20 grid h-full w-full grid-cols-1 sm:grid-cols-4 bg-sky-700 text-xl font-semibold text-sky-400 drop-shadow-lg">
              {selectedButton === buttonOptions[0] && (
                <div>
                  {favorites &&
                    favorites.map((word) => (
                      <Word
                        key={Math.floor(Math.random() * 100000)}
                        user={currentUser}
                        word={word}
                      />
                    ))}
                </div>
              )}
              {selectedButton === buttonOptions[1] && (
                <div>
                  <div>
                    {userWords &&
                      userWords.map((word) => (
                        <Word
                          key={Math.floor(Math.random() * 100000)}
                          user={currentUser}
                          word={word}
                        />
                      ))}
                  </div>
                </div>
              )}
              {selectedButton === buttonOptions[2] && (
                <div>
                  <div>
                    {userTranslations &&
                      userTranslations.map((word) => (
                        <Word
                          key={Math.floor(Math.random() * 100000)}
                          user={currentUser}
                          word={word}
                        />
                      ))}
                  </div>
                </div>
              )}
            </div>
            {currentUser.id === user.id && (
              <button
                onClick={() => setShowBackupCodes(!showBackupCodes)}
                className="fixed right-3 bottom-20 rounded-lg bg-gray-600 p-2 sm:p-3 text-3xl sm:text-4xl font-semibold text-white transition duration-300 hover:bg-gray-700"
              >
                <AiOutlineSetting />
              </button>
            )}
            {currentUser.id === user.id && (
              <button
                onClick={() => setIsEditingProfile(!isEditingProfile)}
                className="fixed right-3 bottom-3 rounded-lg bg-orange-600 p-2 sm:p-3 text-3xl sm:text-4xl font-semibold text-white transition duration-300 hover:bg-orange-700"
              >
                <AiOutlineEdit />
              </button>
            )}
            {isEditingProfile && (
              <>
                <div className='fixed z-50 inset-0 bg-black opacity-60 flex items-center justify-center'></div>
                <div className="fixed inset-2 sm:inset-20 z-50 flex flex flex-col flex-col items-center items-center justify-center justify-center rounded-lg bg-sky-400 drop-shadow-xl">
                  <div onClick={() => setIsEditingProfile(false)} className='absolute transition duration-300 hover:bg-red-600 right-0 top-0 sm:translate-x-full sm:-translate-y-full text-white cursor-pointer text-xl font-semibold p-2 bg-red-500 rounded-lg w-10 h-10 flex items-center justify-center'>&#10005;</div>
                  <div className="flex w-10/12 sm:w-3/12 flex-col items-center gap-y-3 rounded-lg bg-sky-600 p-4 drop-shadow-lg">
                    <h4>Modifica profilo</h4>
                    <input
                      type="text"
                      ref={name}
                      placeholder="Inserisci nome"
                      className="mt-3 w-full rounded-lg p-3 py-2 text-lg"
                      // value={user.name}
                    />
                    <input
                      type="text"
                      ref={surname}
                      placeholder="Inserisci cognome"
                      className="mt-3 w-full rounded-lg p-3 py-2 text-lg"
                      // value={user.surname}
                    />
                    <button
                      className="mt-3 rounded-lg bg-sky-400 p-3 py-2 text-lg"
                      onClick={() => {
                        updateUserInfo({
                          name: name.current.value !== '' ? name.current.value : user.name,
                          surname: surname.current.value !== '' ? surname.current.value : user.surname,
                          nickname: user.nickname,
                        }).then((res) => console.log(res))
                      }}
                    >
                      Salva modifiche
                    </button>
                  </div>
                </div>
              </>
            )}
            {showBackupCodes && (
              <>
                <div className='fixed z-50 inset-0 bg-black opacity-60 flex items-center justify-center'></div>
                <div className="fixed inset-2 sm:inset-20 z-50 flex flex flex-col flex-col items-center items-center justify-center justify-center rounded-lg bg-sky-400 drop-shadow-xl">
                  <div onClick={() => setShowBackupCodes(false)} className='absolute transition duration-300 hover:bg-red-600 right-0 top-0 sm:translate-x-full sm:-translate-y-full text-white cursor-pointer text-xl font-semibold p-2 bg-red-500 rounded-lg w-10 h-10 flex items-center justify-center'>&#10005;</div>
                  <div className="flex w-10/12 sm:w-8/12 flex-col items-center gap-y-3 rounded-lg bg-sky-600 p-4 drop-shadow-lg">
                    <h3>Codici backup</h3>
                    <p className='text-lg'>Questi codici serviranno qualora tu dimenticassi password o pin, quindi 
                      conservali con cura e <strong>non</strong> condividerli con nessuno.
                    </p>
                    <div className='mt-5 grid gap-3 grid-cols-2 w-11/12'>
                      {!codes && (
                        <>
                          {
                            starterBackupCodes.map((code) => (
                              <>
                                <div className='p-1 sm:p-2 bg-white rounded-lg flex font-semibold text-lg sm:text-xl uppercase items-center justify-center'>{code}</div>
                              </>
                              ))

                          }
                        </>

                      )}
                      {codes && codes.map((code) => (
                        <div className='p-1 sm:p-2 bg-white rounded-lg flex font-semibold text-lg sm:text-xl uppercase items-center justify-center'>{code}</div>
                      ))}
                    </div>
                    <button 
                    onClick={(e) => {
                      e.preventDefault()
                      let backupCodes = []
                        e.target.parentElement.childNodes[2].childNodes.forEach((el) => { 
                          el.innerText = ''
                          const code = createBackupCode(8)
                          el.innerText = code
                          // console.log(code);
                          // console.log('------');
                          console.log(code, el.innerText, el);
                        // setBackupCodes((prev) => [...prev, el.innerText])
                          backupCodes.push(code)
                          // console.log(code);

                          // use innerHTML to set the text of the element
                      })
                        console.log('----------');
                        console.log(backupCodes);

                      setCookie('backupCodes', backupCodes, {
                        path: '/',
                        maxAge: 9999999999999,
                        sameSite: true,
                      })
                        
                        }} className='cursor-pointer text-lg sm:text-xl mt-3 sm:mt-5 font-semibold p-2 sm:p-3 bg-sky-400 drop-shadow-lg rounded-lg'>Genera nuovi codici</button>
                  </div>
                </div>
              </>
            )}
          </>
        )}
      </>
    )
}

UserInfo.getInitialProps = async ({ req }) => {
    const data = parseCookies(req)
    

    return {
        data: data.user && data.user,
        codes: data.backupCodes && data.backupCodes,
    }
}

export default UserInfo