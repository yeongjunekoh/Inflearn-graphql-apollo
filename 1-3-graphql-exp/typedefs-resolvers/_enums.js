const { gql } = require('apollo-server')

const typeDefs = gql`
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

    enum NewOrUsed {
        new
        used
    }
`

module.exports = typeDefs