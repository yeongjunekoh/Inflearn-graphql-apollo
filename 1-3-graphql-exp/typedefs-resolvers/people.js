const { gql } = require('apollo-server')
const database = require('../database.js')

const typeDefs = gql`
    type People {
        id: ID!
        first_name: String
        last_name: String
        sex: String
        blood_type: String
        serve_years: Int
        role: String
        team: Int
        from: String
    }
`
const resolvers = {
    Query: {
        people: () => database.people
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}