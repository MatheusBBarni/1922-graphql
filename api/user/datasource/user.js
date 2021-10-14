const { RESTDataSource } = require('apollo-datasource-rest')

class UsersAPI extends RESTDataSource {
  constructor() {
    super()
    this.baseURL = 'http://localhost:3000'
  }
  async getUsers() {
    const users = await this.get('/users')
    return users.map(async user => ({
      id: user.id,
      nome: user.nome,
      email: user.email,
      ativo: user.ativo,
      role: await this.get(`/roles/${user.role}`)
    }))
  }

  async getUserById(id) {
    const user = await this.get(`/users/${id}`)
    return ({
      id: user.id,
      nome: user.nome,
      email: user.email,
      ativo: user.ativo,
      role: await this.get(`/roles/${user.role}`)
    })
  }

  async adicionaUser(user) {
    const users = await this.getUsers()
    const role = await this.get(`/roles?type=${user.role}`)
    user.id = users.length + 1;

    await this.post('/users', {
      ...user,
      role: role[0].id
    })

    return ({
      ...user,
      role: role[0]
    })
  }

  async atualizaUser(novoUser) {
    const role = await this.get(`/roles?type=${novoUser.role}`)
    await this.put(`users/${novoUser.id}`, {
      ...novoUser,
      role: role[0].id
    })

    return ({
      ...novoUser,
      role: role[0]
    })
  }

  async deletaUser(id) {
    await this.delete(`users/${id}`)
    return id
  }
}

module.exports = UsersAPI