const { gql } = require('apollo-server')

const typeDefs = gql`
    type Mutation {
        postTeam(input: postTeamInput!): Team!,

        postRole(
            id: ID!,
            job: String!,
            requirement: String,
        ): Role!

        postEquipment(
            id: ID!,
            used_by: Role!,
            count: Int,
            new_or_used: NewOrUsed!
        ): Equipment!

        postSoftware(
            id: ID!,
            used_by: Role!,
            developed_by: String!,
            description: String
        ): Software!

        postSupply(id: ID!, team: ID!): Supply!
    }
`

module.exports = typeDefs