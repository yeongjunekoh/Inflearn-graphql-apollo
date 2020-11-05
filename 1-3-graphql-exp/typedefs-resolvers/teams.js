const { gql } = require('apollo-server')
const database = require('../database.js')

const typeDefs = gql`
    type Team {
        id: ID!
        manager: String
        office: String
        extension_number: String
        mascot: String,
        cleaning_duty: String,
        project: String
        members: [People]
    }
`

const resolvers = {
    Query: {
        teams: () => {
            return database.teams.map((team) => {
                team.members = database.people.filter((person) => {
                    return person.team == team.id
                })
                return team
            })
        }
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}