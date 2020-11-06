const { ApolloServer } = require('apollo-server')
const _ = require('lodash')

const typeDef = require('./typedefs-resolvers/_typedef')
const enums = require('./typedefs-resolvers/_enums')
const teams = require('./typedefs-resolvers/teams')
const people = require('./typedefs-resolvers/people')
const equipments = require('./typedefs-resolvers/equipments')
const softwares = require('./typedefs-resolvers/softwares')

const typeDefs = [
    typeDef,
    enums,
    teams.typeDefs,
    people.typeDefs,
    equipments.typeDefs,
    softwares.typeDefs
]

const resolvers = _.merge(
    teams.resolvers,
    people.resolvers,
    equipments.resolvers,
    softwares.resolvers
)

const server =  new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`)
})