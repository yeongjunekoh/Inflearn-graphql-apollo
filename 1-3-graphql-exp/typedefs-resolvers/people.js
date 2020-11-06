const { gql } = require('apollo-server')
const database = require('../database.js')

const typeDefs = gql`
    type People {
        id: ID!
        first_name: String
        last_name: String
        sex: Sex
        blood_type: BloodType
        serve_years: Int
        role: Role
        team: Int
        from: String,
        equipments: [Equipment],
        softwares: [Software]
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