import { GraphQLClient, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export default async function asynchandler(req, res) {
const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
    authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
})

const query = gql`
    mutation MyMutation(
    $favorites: Json!
    $userId: ID!
    $wordId: ID!
    $nickname: String!
    ) {
    updateFavorite(
        data: {
        favoritesUserNickname: $favorites
        userInfo: { connect: { id: $userId } }
        words: { disconnect: { id: $wordId } }
        }
        where: { nickname: $nickname }
    ) {
        id
    }
    publishFavorite(where: { nickname: $nickname }) {
        id
    }
    }
`
console.log('-----------------------\n-----------\n------------')
console.log(req.body)

const { favorites, userId, wordId, nickname } = req.body

const result = await graphQLClient.request(query, {
    favorites,
    userId,
    wordId,
    nickname,
})

return res.status(200).send(result)
}
