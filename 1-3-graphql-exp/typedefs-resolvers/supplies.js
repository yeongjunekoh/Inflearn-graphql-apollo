const { gql } = require('apollo-server')
const database = require('../database.js')

const typeDefs = gql`
    type Supply {
        id: ID!
        team: ID!
    }
`
const resolvers = {
    Query: {
        supplies: () => database.supplies
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}