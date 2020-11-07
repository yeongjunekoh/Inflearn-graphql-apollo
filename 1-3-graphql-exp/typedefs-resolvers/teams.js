const { gql } = require('apollo-server')
const database = require('../database.js')
const supplies = require('./supplies.js')

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
                }).map((member) => {
                    member.tools = [
                        ...database.equipments, ...database.softwares
                    ].filter((tool) => {
                        return member.role === tool.used_by
                    })
                    member.givens = [
                        ...database.equipments.filter((equipment) => {
                            return member.role === equipment.used_by
                        }),
                        ...database.supplies.filter((supply) => {
                            return member.team === supply.team
                        })
                    ]
                    return member
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