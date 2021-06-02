 
import { ErrorRequestHandler } from 'express';
import { ValidationError } from 'yup'

interface ValidationErrors {
    [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (error, req, res, next) => {
    console.error(error);
    if(error instanceof ValidationError){
        let errors: ValidationErrors = {}

        error.inner.forEach(err => {
            errors[String(err.path)] = err.errors;
        })

        return res.status(400).json({message: 'validation fails', errors});
    }

    return res.status(500).json({ message: 'internal server error'})
}

export default errorHandler;
