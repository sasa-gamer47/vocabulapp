import { request, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export const getSearchedWords = async (searchQuery) => {
    const query = gql`
        query GetSearchedWords($searchQuery: String!) {
            words(where: { word_contains: $searchQuery }) {
                id
                slug
                word
                meaning
                other
                isATranslation
                createdAt
            }
        }
    `
    
    const result = await request(graphqlAPI, query, {searchQuery})

    return result.words
}

export const getAllWords = async () => {
    const query = gql`
        query GetAllWords() {
            words {
                id
                slug
                word
                meaning
                other
                isATranslation
                createdAt
                startLang
                translatedLang
                translation
                userInfo {
                    id
                    nickname
                }
            }
        }
    `
    
    const result = await request(graphqlAPI, query)

    return result.words
}

export const createUser = async (obj) => {
    const result = await fetch('/api/createUser', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    })

    return result.json()
}

export const loginQuery = async (email, password) => {
    const query = gql`
        query Login($email: String!, $password: String!) {
            userInfos(where: { email: $email, AND: { password: $password } }) {
                id
                name
                surname
                nickname
                email
                password
                pin
                favorite {
                    id
                }
                word {
                    id
                    slug
                    isATranslation
                }
            }
        }
    `

const result = await request(graphqlAPI, query, { email, password })

    return result.userInfos[0]
}

export const createWord = async (obj) => {
    const result = await fetch('/api/createWord', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    })

    return result.json()
}

export const createTranslationWord = async (obj) => {
    const result = await fetch('/api/createTranslationWord', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    })

    return result.json()
}

export const getWordBySlug = async (slug) => {
    const query = gql`
        query GetSearchedWords($slug: String!) {
            word(where: { slug: $slug }) {
                id
                slug
                word
                meaning
                other
                isATranslation
                createdAt
                startLang
                translatedLang
                translation
                userInfo {
                    id
                    nickname
                }
            }
        }
    `

    const result = await request(graphqlAPI, query, { slug })

    return result.word
}

export const getUserByEmail = async (email) => {
    const query = gql`
        query Login($email: String!) {
            userInfos(where: { email: $email}) {
                id
                name
                surname
                nickname
                email
                password
                pin
                favorite {
                    id
                }
                word {
                    id
                    slug
                    isATranslation
                }
            }
        }
    `

const result = await request(graphqlAPI, query, { email })

    return result.userInfos[0]
}

export const getUserByNickname = async (nickname) => {
    const query = gql`
        query Login($nickname: String!) {
            userInfos(where: { nickname: $nickname}) {
                id
                name
                surname
                nickname
                email
                password
                pin
                favorite {
                    id
                }
                word {
                    id
                    slug
                    isATranslation
                }
            }
        }
    `

    const result = await request(graphqlAPI, query, { nickname })

    return result.userInfos[0]
}

export const updateFavorite = async (obj) => {
    const result = await fetch('/api/updateFavorite', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    })

    return result.json()
}

export const getFavoriteById = async (id) => {
    const query = gql`
        query getFavorites($id: ID!) {
            favorite(where: {id: $id}) {
                id
                nickname
                words {
                    id
                }
                favoritesUserNickname
            }
            
        }
    `

    const result = await request(graphqlAPI, query, { id })

    return result.favorite
}
    
export const updateFavoriteDel = async (obj) => {
    const result = await fetch('/api/updateFavoriteDel', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    })

    return result.json()
}
    
export const createFavorite = async (obj) => {
    const result = await fetch('/api/createFavorite', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    })

    return result.json()
}
    
export const updateUserInfo = async (obj) => {
    const result = await fetch('/api/updateUser', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    })

    return result.json()
}

export const getAllUserInfos = async () => {
    const query = gql`
        query AllUsers {
            userInfos {
                id
                name
                surname
                nickname
                email
                password
                pin
                favorite {
                    id
                }
                word {
                    id
                    slug
                    isATranslation
                }
            }
        }
    `

const result = await request(graphqlAPI, query)

return result.userInfos
}

export const updatePassword = async (obj) => {
    const result = await fetch('/api/updatePassword', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(obj),
    })

    return result.json()
}