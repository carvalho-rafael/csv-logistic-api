import Operator from "../models/Operator"
import clientsView from "./clientsView"

export default {
  render(operator: Operator) {
    return {
      id: operator.id,
      nome: operator.name,
      clients: clientsView.renderMany(operator.clients)
    }
  },
  renderMany(operators: Operator[]) {
    return operators.map(operator => this.render(operator))
  }
}