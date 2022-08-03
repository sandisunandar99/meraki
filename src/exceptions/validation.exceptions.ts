import { BadRequestException, ValidationError } from "@nestjs/common";


function transform(errors : ValidationError[]) {
    return errors.map(err => {
        return {
            detail : `${err.property} ${err.constraints} validation error`,
            source : { pointer : `data/attribute/${err.property}`},
            meta : err.constraints ? Object.values(err.constraints) : null
        }
    });
}


export default class ValidationsException extends BadRequestException {
    constructor(public validationErrors: ValidationError[]) {
        super({errortype : 'ValidationError', errors : transform(validationErrors)});
    }
}
