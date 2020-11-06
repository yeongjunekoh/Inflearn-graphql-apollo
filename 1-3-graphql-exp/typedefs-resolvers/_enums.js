const { gql } = require('apollo-server')

const typeDefs = gql`
    enum Sex {
        male,
        female
    }

    enum BloodType {
        A
        B
        AB
        O
    }

    enum Role {
        developer
        designer
        planner
    }
`

module.exports = typeDefs