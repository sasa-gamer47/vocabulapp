import { GraphQLClient, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export default async function asynchandler(req, res) {
const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
    authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
})
    

const query = gql`
    mutation CreateUserInfo($name: String!, $surname: String!, $nickname: String!, $email: String!, $password: String!, $pin: String!) {
        createUserInfo(data: {name: $name, surname: $surname, nickname: $nickname, email: $email, password: $password, pin: $pin}) {                                                                                                                                                                                                    
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


const { name, surname, nickname, email, password, pin } = req.body

const result = await graphQLClient.request(query, {
    name,
    surname,
    nickname,
    email,
    password,
    pin,
})

return res.status(200).send(result)
}
