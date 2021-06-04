import { Router } from 'express';
import clientsController from './controllers/clientsController';
import operatorsController from './controllers/operatorsController';

import path from 'path'

import multer from 'multer'

var upload = multer({
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, '../', 'uploads/'),
    filename: (req, file, cb) => {
      cb(null, 'file.csv')
    }
  })
})

const routes = Router();

routes.get('/operators', operatorsController.index);
routes.post('/operators', operatorsController.create);

routes.get('/clients', clientsController.index);
routes.post('/clients', upload.single('file'), clientsController.create);

routes.patch('/operators/:id', operatorsController.edit);
routes.delete('/operators/:id', operatorsController.delete);

export default routes;
