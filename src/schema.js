const { gql } = require('apollo-server')
const { v4: uuidv4 } = require('uuid')
const { prisma } = require('./db')

const typeDefs = gql`
  type Cedille {
    user: ID!
    id: ID!
    parent: ID
    content: String
  }

  type Query {
    q(id: String, user: String, parent: String, content: String): [Cedille!]!
  }

  type Mutation {
    create(content: String, parent: String): Cedille!
  }
`

const resolvers = {
    Query: {
        q: (_, args) => {
            return prisma.cedille.findMany({
                where: {
                    id: args.id || undefined,
                    user: args.user || undefined,
                    parent: args.parent || undefined,
                    content: { contains: args.content || undefined }
                }
            });
        }
    },
    Mutation: {
        create: (_, args) => {
            return prisma.cedille.create({
                data: {
                    id: uuidv4(),
                    parent: args.parent,
                    content: args.content,
                    user: uuidv4() //FIXME - RH - get current user
                }
            })
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