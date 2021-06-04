import Client from "../models/Client";

export default {
  render(client: Client) {
    const birthdaySplited = client.birthday.split('-')
    const formatedBirthday = `${birthdaySplited[2]}/${birthdaySplited[1]}/${birthdaySplited[0]}`
    return {
      id: client.id,
      nome: client.name,
      aniversario: formatedBirthday,
      value: client.value,
      email: client.email,
      operador: client.operator
    }
  },
  renderMany(clients: Client[]) {
    return clients.map(client => this.render(client))
  }
}