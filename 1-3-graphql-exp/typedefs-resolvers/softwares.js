const { gql } = require('apollo-server')
const database = require('../database.js')

const typeDefs = gql`
    type Software {
        id: ID!
        used_by: Role,
        developed_by: String,
        description: String
    }
`
const resolvers = {
    Query: {
        softwares: () => database.softwares
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}