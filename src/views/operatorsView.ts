import Operator from "../models/Operator"

export default {
  render(operator: Operator) {
    return {
      id: operator.id,
      nome: operator.name,
    }
  },
  renderMany(operators: Operator[]) {
    return operators.map(operator => this.render(operator))
  }
}