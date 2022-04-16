import React, { useState, useEffect, useLayoutEffect } from 'react'
import { parseCookies } from "../helpers/"
import type { NextPage } from 'next'
import { useCookies } from "react-cookie"
import Link from 'next/link'
import { useRouter } from 'next/router'
import { Navbar, Word, ModalConfirm, SearchedWordsContainer, CookiesBanner } from '../components/'
import { getAllWords } from '../services'

function Home({ data }: { data: any} ) {
  // "My words will have section, as "difficult", "translations"...
  const [cookie, setCookie] = useCookies(["user"])
  const [words, setWords] = useState([])
  const [user, setUser] = useState(null)
  const [showModalConfirm, setShowModalConfirm] = useState(false)
  const [showSearchedWordsContainer, setShowSearchedWordsContainer] = useState(false)
  const [searchedWords, setSearchedWords] = useState([])
  const [showCookieBanner, setShowCookieBanner] = useState(false)
  const [useCookie, setUseCookie] = useState(true)
  const router: any = useRouter()


  useEffect(() => {
    console.log('useCookies: ' + useCookie)
    getAllWords()
      .then((res) => setWords(res))
    if (!data) {
      setUser(router.query)

      setCookie("user", JSON.parse(router.query), {
        path: "/",
        maxAge: 500000,
        sameSite: true,
      })
    } else {
      if (useCookie) {
        setUser(JSON.parse(data))
      }
    }
    router.push('/')

    return () => {
    }
  }, [])

  useEffect(() => {
    if (router.query?.logout == "true") {
      setUser(null)
      setCookie("user", null, {
        path: "/",
        maxAge: 500000,
        sameSite: true,
      })
    }

    setShowSearchedWordsContainer(router.query?.showSearchContainer == "true" ? true : false)
    setSearchedWords(router.query.words)
    setShowModalConfirm(router.query?.showModal == "true" ? true : false)
  }), [router.query]

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (window.localStorage.getItem('useCookies') !== "true" && window.localStorage.getItem('useCookies') !== "false") {
        setTimeout(() => {
          setShowCookieBanner(true)
        }, 2000)
      } else {
        window.localStorage.getItem('useCookies') === "true" ? setUseCookie(true) : setUseCookie(false)
      }
    }
  }, [])

  return (
    <div>
      <Navbar user={user} />
      {showModalConfirm && <ModalConfirm user={user} />}
      {showSearchedWordsContainer && <SearchedWordsContainer user={user} words={searchedWords} />}
      <div className='relative mt-20 container w-full'>
        <div className='container translate-y-5 w-full px-10'>
          <div className='mt-10 grid grid-cols-1 sm:grid-cols-4 justify-center w-full gap-4'>
            {words.length > 0 && words.map((word) => <Word key={Math.round(Math.random() * 1000000)} word={word} user={user} />)}


          </div>
        </div>

      </div>
      <CookiesBanner show={showCookieBanner} />
    </div>
  )
}

Home.getInitialProps = async ({ req }: {req: any}) => {
  const data = parseCookies(req)
  

  return {
    data: data.user && data.user,
  }
}

export default Home
