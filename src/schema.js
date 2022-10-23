const { gql } = require('apollo-server')
const { v4: uuidv4 } = require('uuid')

const typeDefs = gql`
  type Cedille {
    user: ID!
    id: ID!
    parent: ID
    content: String
  }

  type Query {
    q: [Cedille!]!
  }

  type Mutation {
    create(content: String, parent: String): Cedille!
  }
`
const cedilles = [
    {
        id: 'dd8e86c3-1028-4415-a94d-d415c29d4a00',
        parent: null,
        content: 'oh boy',
        user: 'ed7efc98-8fb8-431a-a1c9-90273192e736'
    },
    {
        id: '3d229536-4ed3-47d8-b39c-d5c88d197ce0',
        parent: 'dd8e86c3-1028-4415-a94d-d415c29d4a00',
        content: 'what',
        user: 'ca864a7f-2c7d-455e-98a7-7f50a611fab0'
    },
    {
        id: 'b7d4d9e8-656b-4ddd-bb14-1b106e311873',
        parent: 'dd8e86c3-1028-4415-a94d-d415c29d4a00',
        content: 'oh deary me',
        user: 'ed7efc98-8fb8-431a-a1c9-90273192e736'
    },
]

const resolvers = {
    Query: {
        q: (_, args) => {
            return cedilles;
        }
    },
    Mutation: {
        create: (_, args) => {
            cedilles.push({
                id: uuidv4(),
                parent: args.parent,
                content: args.content,
                user: uuidv4() //FIXME - RH - get current user
            })
            return cedilles[cedilles.length - 1]
        }
    },
    Cedille: {
        id: (parent) => parent.id,
        parent: (parent) => parent.parent,
        content: (parent) => parent.content,
        user: (parent) => parent.user
    },
}


module.exports = {
    resolvers,
    typeDefs,
}