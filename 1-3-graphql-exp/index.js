const { ApolloServer } = require('apollo-server')
const _ = require('lodash')

const typeDef = require('./typedefs-resolvers/_typedef')
const teams = require('./typedefs-resolvers/teams')
const people = require('./typedefs-resolvers/people')

const typeDefs = [
    typeDef,
    teams.typeDefs,
    people.typeDefs
]

const resolvers = _.merge(
    teams.resolvers,
    people.resolvers
)

console.log(typeDefs)
console.log(resolvers)

const server =  new ApolloServer({typeDefs, resolvers})

server.listen().then(({url}) => {
    console.log(`🚀  Server ready at ${url}`)
})