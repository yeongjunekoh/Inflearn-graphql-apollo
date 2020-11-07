const { gql } = require('apollo-server')

const typeDefs = gql`
    type Query {
        teams: [Team]
        people: [People]
        tools: [Tool]
        equipments: [Equipment]
        softwares: [Software]
        supplies: [Supply]
        givens: [Given]
    }
`

module.exports = typeDefs