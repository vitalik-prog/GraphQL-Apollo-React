const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const cors = require('cors')
const schema = require('./schema')
const users = [{id: 1, username: 'Vasya', age: 25}]

const app = express()
app.use(cors())

const resolver = {
  getAllUsers: () => {
    return users
  },
  getUser: ({id}) => {
    return users.find(user => user.id === id)
  },
  createUser: ({input}) => {
    const id = Date.now()
    const user = { id, ...input }
    users.push(user)
    return user
  }
}

app.use('/graphql', graphqlHTTP({
  graphiql: true,
  schema,
  rootValue: resolver
}))

app.listen(5000, () => console.log('server has been started on port 5000'))
