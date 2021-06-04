import { Request, Response } from 'express'
import { getManager } from 'typeorm';
import Client from '../models/Client';
import Operator from '../models/Operator';
import operatorClientsView from '../views/operatorClientsView';

import { promises as fs } from 'fs'
import path from 'path'
import * as yup from 'yup'
import { mergeOperatorClients } from '../helper/mergeOperatorClients';

type ParsedClients = {
  name: string,
  birthday: string,
  value: number,
  email: string
}

export default {
  async index(req: Request, res: Response) {
    const entityManager = getManager();

    const clients = await entityManager.find(Operator, {
      relations: ['clients'],
      order: { id: 1 }
    })
    res.status(200).json(operatorClientsView.renderMany(clients));
  },

  async create(req: Request, res: Response) {
    const file = await fs.readFile(
      path.join(__dirname, '..', '..', 'uploads', 'file.csv'),
      { encoding: 'utf-8' }
    )
    const csvLine = file.split(/\n/);

    const parsedClients: ParsedClients[] = csvLine
      .slice(1, csvLine.length - 1)
      .map((client: string, index) => {
        const rawClient = client.split(',')
        let [rawName, rawBirthday, rawValue, rawEmail] = rawClient
        const name = rawName.trim()

        //normalize to postgres/mysql date type
        const rawBirthdaySplited = rawBirthday.trim().split('/')
        const birthday = `${rawBirthdaySplited[2]}/${rawBirthdaySplited[1]}/${rawBirthdaySplited[0]}`

        const value = Number(rawValue.trim())
        const email = rawEmail.trim()

        return ({
          name,
          birthday,
          value,
          email
        })
      })

    //validate before save to database
    const clientsSchema = yup.array().of(yup.object().shape({
      name: yup.string().required(),
      birthday: yup.date().required(),
      value: yup.number().required(),
      email: yup.string().required()
    }))
    await clientsSchema.validate(parsedClients, { abortEarly: false })

    const entityManager = getManager();
    const operators = await entityManager.find(Operator)

    const mergedClients = mergeOperatorClients(operators, parsedClients)

    const clientModel = entityManager.create(Client, mergedClients.clients)

    await entityManager.save(clientModel)

    const clients = await entityManager.find(Operator, {
      relations: ['clients'],
      order: { id: 1 }
    })
    res.status(200).json(operatorClientsView.renderMany(clients));
  },
}