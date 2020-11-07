const { gql } = require('apollo-server')
const database = require('../database.js')

const typeDefs = gql`
    type Role {
        id: ID!,
        job: String,
        requirement: String
    }
`
const resolvers = {
    Query: {
        roles: () => database.roles
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}