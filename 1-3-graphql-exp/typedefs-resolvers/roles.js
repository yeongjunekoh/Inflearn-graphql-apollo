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
        roles: (parent, args) => dbWorks.getRoles(args),
        role: (parent, args) => dbWorks.getRoles(args)[0]
    },
    Mutation: {
        postRole: (parent, args) => dbWorks.postRole(args),
        editRole: (parent, args) => dbWorks.editRole(args),
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}