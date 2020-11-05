const { gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        teams: [Team]
        people: [People]
    }
`

module.exports = typeDefs