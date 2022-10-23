const { gql } = require('apollo-server')
const { v4: uuidv4 } = require('uuid')
const { prisma } = require('./db')
const { authenticate } = require('./auth')
const { GraphQLError } = require('graphql')

const typeDefs = gql`
  type Cedille {
    user: ID!
    id: ID!
    parent: ID
    content: String
    time: String!
  }

  type Query {
    q(id: String, user: String, parent: String, content: String): [Cedille!]!
  }

  type Mutation {
    create(token: String!, content: String, parent: String): Cedille!
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
            claims = authenticate(args.token);
            if (!claims) {
                throw new GraphQLError('You are not authorized to perform this action.', {
                    extensions: {
                        code: 'UNAUTHORIZED',
                    },
                });
            }
            return prisma.cedille.create({
                data: {
                    id: uuidv4(),
                    parent: args.parent,
                    content: args.content,
                    user: claims.user,
                    time: new Date()
                }
            });
        }
    },
    Cedille: {
        id: (parent) => parent.id,
        parent: (parent) => parent.parent,
        content: (parent) => parent.content,
        user: (parent) => parent.user,
        time: (parent) => parent.time
    },
}


module.exports = {
    resolvers,
    typeDefs,
}