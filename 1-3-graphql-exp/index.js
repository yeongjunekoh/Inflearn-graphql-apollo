const { ApolloServer } = require('apollo-server')
const _ = require('lodash')

const queries = require('./typedefs-resolvers/_queries')
const enums = require('./typedefs-resolvers/_enums')
const teams = require('./typedefs-resolvers/teams')
const people = require('./typedefs-resolvers/people')
const equipments = require('./typedefs-resolvers/equipments')
const softwares = require('./typedefs-resolvers/softwares')
const supplies = require('./typedefs-resolvers/supplies')
const tools = require('./typedefs-resolvers/tools')
const givens = require('./typedefs-resolvers/givens')

const typeDefs = [
    queries,
    enums,
    teams.typeDefs,
    people.typeDefs,
    equipments.typeDefs,
    softwares.typeDefs,
    supplies.typeDefs,
    tools.typeDefs,
    givens.typeDefs
]

const resolvers = _.merge(
    teams.resolvers,
    people.resolvers,
    equipments.resolvers,
    softwares.resolvers,
    supplies.resolvers,
    tools.resolvers,
    givens.resolvers
)

const server =  new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`)
})
