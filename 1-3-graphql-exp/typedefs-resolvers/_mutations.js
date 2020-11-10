const { gql } = require('apollo-server')

const typeDefs = gql`
    type Mutation {
        postTeam(input: postTeamInput!): Team!,
        editTeam(
            id: ID!,
            input: postTeamInput!
        ): Team!
        deleteTeam(id: ID!): Team!

        postPerson(input: postPersonInput): People!,
        editPerson(
            id: ID!,
            input: postPersonInput!
        ): People!
        deletePerson(id: ID!): People!

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
        deleteRole(id: ID!): Role!

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
        deleteEquipment(id: ID!): Equipment!

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
        deleteSoftware(id: ID!): Software!

        postSupply(id: ID!, team: ID!): Supply!,
        editSupply(id: ID!, team: ID!): Supply!
        deleteSupply(id: ID!): Supply!
    }
`

module.exports = typeDefs