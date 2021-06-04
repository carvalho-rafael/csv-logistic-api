import Operator from "../models/Operator";

type Client = {
  name: string,
  birthday: string,
  value: number,
  email: string,
  operador_id?: number
}

export function distributeClients(operators: Operator[], clients: Client[]) {
  const distributedClients = clients.reduce((amount: any, current) => {
    const { clients } = amount;
    let { operatorCount } = amount;

    const operatorId = operators[operatorCount].id;

    const newClient = { ...current, operator_id: operatorId };
    const newClientsArray = [...clients, newClient];

    operatorCount = (operatorCount < operators.length - 1) ? (operatorCount + 1) : 0;

    amount = { clients: newClientsArray, operatorCount };

    return amount;
  }, { clients: [], operatorCount: 0 })

  return distributedClients;
}