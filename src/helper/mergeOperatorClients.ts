import Operator from "../models/Operator";

type ParsedClients = {
  name: string,
  birthday: string,
  value: number,
  email: string,
  operador_id?: number
}

export function mergeOperatorClients(operators: Operator[], clients: ParsedClients[]) {
  const mergedClients = clients.reduce((amount: any, current) => {
    const { clients } = amount;
    let { operatorCount } = amount;

    const operatorId = operators[operatorCount].id;

    const newClient = { ...current, operator_id: operatorId };
    const newClientsArray = [...clients, newClient];

    operatorCount = (operatorCount < operators.length - 1) ? (operatorCount + 1) : 0;

    amount = { clients: newClientsArray, operatorCount };

    return amount;
  }, { clients: [], operatorCount: 0 })

  return mergedClients;
}