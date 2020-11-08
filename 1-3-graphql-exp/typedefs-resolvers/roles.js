const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks.js')

const typeDefs = gql`
    type Role {
        id: ID!
        job: String!
        requirement: String
    }
`
const resolvers = {
    Query: {
        roles: (parent, args) => dbWorks.getRoles(args)
    },
    Mutation: {
        postRole: (parent, args) => dbWorks.postRole(args)
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}