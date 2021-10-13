const { ApolloServer } = require('apollo-server')
const { mergeTypeDefs } = require('@graphql-tools/merge')

const userSchema = require('./user/schema/user.graphql')
const userResolvers = require('./user/resolvers/userResolvers')
const UsersAPI = require('./user/datasource/user')

const typeDefs = mergeTypeDefs([
  userSchema
])

const resolvers = [
  userResolvers
]

const dataSources = () => {
  return {
    usersAPI: new UsersAPI()
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources
})

server.listen().then(({ url }) => {
  console.log(`Server is running on ${url}`)
})