const { gql } = require('apollo-server')

const typeDefs = gql`
    type Mutation {
        postTeam(input: postTeamInput!): Team!,
        editTeam(
            id: ID!,
            input: postTeamInput!
        ): Team!

        postPerson(input: postPersonInput): People!,
        editPerson(
            id: ID!,
            input: postPersonInput!
        ): People!

        postRole(
            id: ID!,
            job: String!,
            requirement: String
        ): Role!
        editRole(
            id: ID!,
            job: String!,
            requirement: String
        ): Role!

        postEquipment(
            id: ID!,
            used_by: Role!,
            count: Int,
            new_or_used: NewOrUsed!
        ): Equipment!
        editEquipment(
            id: ID!,
            used_by: Role!,
            count: Int,
            new_or_used: NewOrUsed!
        ): Equipment!
        increaseEquipment(
            id: ID!,
            increase: Int!
        ): Equipment!

        postSoftware(
            id: ID!,
            used_by: Role!,
            developed_by: String!,
            description: String
        ): Software!
        editSoftware(
            id: ID!,
            used_by: Role!,
            developed_by: String!,
            description: String
        ): Software!

        postSupply(id: ID!, team: ID!): Supply!,
        editSupply(id: ID!, team: ID!): Supply!
    }
`

module.exports = typeDefs