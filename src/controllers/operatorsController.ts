import { Request, Response } from 'express'
import { getManager } from 'typeorm';
import Operator from '../models/Operator';

import * as yup from 'yup'
import operatorsView from '../views/operatorsView';

export default {
  async index(req: Request, res: Response) {
    const entityManager = getManager();
    const operators = await entityManager.find(Operator, { order: { id: 1 } })

    return res.status(200).json(operatorsView.renderMany(operators));
  },

  async create(req: Request, res: Response) {
    const operator = req.body;
    const { name } = operator;

    const operatorSchema = yup.object().shape({
      name: yup.string().required()
    })
    await operatorSchema.validate(operator, { abortEarly: false })

    const entityManager = getManager();
    const operatorModel = entityManager.create(Operator, {
      name,
    })
    await entityManager.save(operatorModel);
    const operators = await entityManager.find(Operator, { order: { id: 1 } });

    return res.status(203).json(operatorsView.renderMany(operators));

  },

  async edit(req: Request, res: Response) {
    const { id } = req.params;
    const { name } = req.body;

    const entityManager = getManager();
    await entityManager.update(Operator, id, { name });
    const operators = await entityManager.find(Operator, { order: { id: 1 } });

    res.status(203).json(operatorsView.renderMany(operators));
  },

  async delete(req: Request, res: Response) {
    const { id } = req.params;

    const entityManager = getManager();
    await entityManager.delete(Operator, id)
    const operators = await entityManager.find(Operator, { order: { id: 1 } });

    res.status(203).json(operatorsView.renderMany(operators));
  }
}
