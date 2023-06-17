import HttpStatus from 'http-status-codes'
import { Exception } from "../../application/domain/exception/exception"
import { ValidationException } from "../../application/domain/exception/validation.exception"
import { ApiException } from "./api.exception"
import { RepositoryException } from '../../application/domain/exception/repository.exception'
import { ConflictException } from '../../application/domain/exception/conflict.exception'
import { BadRequestException } from '../../application/domain/exception/bad.request.exception'
import { ForbiddenException } from '../../application/domain/exception/forbidden.exception'
import { InternalServerErrorException } from '../../application/domain/exception/internal.server.error.exception'
import { NotFoundException } from '../../application/domain/exception/not.found.exception'
import { NotImplementedException } from '../../application/domain/exception/not.implemented.exception'
import { UnauthorizedException } from '../../application/domain/exception/unauthorized.exception'

/**
 * Treats the exception types of the application and converts
 * to api exception which should be returned in json format for the client.
 *
 * @abstract
 */
export abstract class ApiExceptionManager {

    /**
     * Constructs instance of ApiException.
     *
     * @param err
     */
    public static build(err: Exception): ApiException {
        let apiException: ApiException

        if (err instanceof ValidationException || err instanceof BadRequestException) {
            apiException = new ApiException(HttpStatus.BAD_REQUEST, err.message, err.description)
        } else if (err instanceof ConflictException) {
            apiException = new ApiException(HttpStatus.CONFLICT, err.message, err.description)
        } else if (err instanceof ForbiddenException) {
            apiException = new ApiException(HttpStatus.FORBIDDEN, err.message, err.description)
        } else if (err instanceof RepositoryException || err instanceof InternalServerErrorException) {
            apiException = new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err.description)
        } else if (err instanceof NotFoundException) {
            apiException = new ApiException(HttpStatus.NOT_FOUND, err.message, err.description)
        } else if (err instanceof NotImplementedException) {
            apiException = new ApiException(HttpStatus.NOT_IMPLEMENTED, err.message, err.description)
        } else if (err instanceof UnauthorizedException) {
            apiException = new ApiException(HttpStatus.UNAUTHORIZED, err.message, err.description)
        } else {
            apiException = new ApiException(HttpStatus.INTERNAL_SERVER_ERROR, err.message, err.description)
        }

        return apiException
    }
}

