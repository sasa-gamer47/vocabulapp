import { GraphQLClient, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export default async function asynchandler(req, res) {
const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
    authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
})

const query = gql`
    mutation CreateFavorite($favorites: Json!, $nickname: String!, $userId: ID!, $wordId: ID!) {
        createFavorite(
            data: {favoritesUserNickname: $favorites, nickname: $nickname, userInfo: { connect: { id: $userId } }, words: { connect: { id: $wordId } } }
        ) {
            id
            nickname
        }
        publishFavorite(where: { nickname: $nickname }) { id }
    }
`
console.log('-----------------------\n-----------\n------------')
console.log(req.body)

const {favorites, userId, nickname, wordId } = req.body

const result = await graphQLClient.request(query, {
    favorites,
    userId,
    nickname,
    wordId,
})

return res.status(200).send(result)
}
