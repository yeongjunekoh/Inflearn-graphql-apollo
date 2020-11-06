const { gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        teams: [Team]
        people: [People]
        equipments: [Equipment]
        softwares: [Software]
    }
`

module.exports = typeDefs