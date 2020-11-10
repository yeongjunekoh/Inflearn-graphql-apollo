const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks.js')

const typeDefs = gql`
    type Supply {
        id: ID!
        team: ID!
    }
`
const resolvers = {
    Query: {
        supplies: (parent, args) => dbWorks.getSupplies(args),
        supply: (parent, args) => dbWorks.getSupplies(args)[0]
    },
    Mutation: {
        postSupply: (parent, args) => dbWorks.postSupply(args),
        editSupply: (parent, args) => dbWorks.editSupply(args),
        deleteSupply: (parent, args) => dbWorks.deleteItem('supplies', args)
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}