const { gql } = require('apollo-server')
const dbWorks = require('../dbWorks.js')

const typeDefs = gql`
    type Software implements Tool {
        id: ID!
        used_by: Role!
        developed_by: String!
        description: String
    }
`
const resolvers = {
    Query: {
        softwares: (parent, args) => dbWorks.getSoftwares(args),
        software: (parent, args) => dbWorks.getSoftwares(args)[0]
    },
    Mutation: {
        postSoftware: (parent, args) => dbWorks.postSoftware(args),
        editSoftware: (parent, args) => dbWorks.editSoftware(args),
        deleteSoftware: (parent, args) => dbWorks.deleteItem('softwares', args)
    }
}

module.exports = {
    typeDefs: typeDefs,
    resolvers: resolvers
}