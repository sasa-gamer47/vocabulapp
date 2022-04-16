import { GraphQLClient, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export default async function asynchandler(req, res) {
const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
    authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
})

const query = gql`
    mutation CreateUserInfo(
    $name: String!
    $surname: String!
    $nickname: String!
    ) {
    updateUserInfo(
        data: {
        name: $name
        surname: $surname
        }
        where: {nickname: $nickname}
    ) {
        id
        nickname
    }
    publishUserInfo(where: { nickname: $nickname }) {
        id
    }
    }
`
console.log('-----------------------\n-----------\n------------')
console.log(req.body)

const { name, surname, nickname } = req.body

const result = await graphQLClient.request(query, {
    name,
    surname,
    nickname
})

return res.status(200).send(result)
}
