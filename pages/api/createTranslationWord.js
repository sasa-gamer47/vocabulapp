import { GraphQLClient, gql } from 'graphql-request'

const graphqlAPI = process.env.NEXT_PUBLIC_GRAPHCMS_ENDPOINT

export default async function asynchandler(req, res) {
const graphQLClient = new GraphQLClient(graphqlAPI, {
    headers: {
    authorization: `Bearer ${process.env.GRAPHCMS_TOKEN}`,
    },
})

const query = gql`
    mutation CreateWord(
    $word: String!
    $meaning: String!
    $slug: String!
    $other: String!
    $id: ID!
    $startLang: String!
    $translatedLang: String!,
    $translation: String!
    ) {
    createWord(
        data: {
        word: $word
        meaning: $meaning
        slug: $slug
        isATranslation: true
        userInfo: { connect: { id: $id } }
        other: $other
        startLang: $startLang
        translatedLang: $translatedLang
        translation: $translation
        }
    ) {
        id
    }
    publishWord(where: { slug: $slug }) {
        id
    }
    }
`
console.log('-----------------------\n-----------\n------------')
console.log(req.body)

const { word, meaning, slug, other, id, startLang, translatedLang, translation } = req.body

const result = await graphQLClient.request(query, {
    word,
    meaning,
    slug,
    other,
    id,
    startLang,
    translatedLang,
    translation
})

return res.status(200).send(result)
}
