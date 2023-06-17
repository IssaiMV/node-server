import { ValidationException } from '../exception/validation.exception'
import { User } from '../model/user'
import { EmailValidator } from './email.validator'

export class UserValidator {
    public static validate(user: User): void | ValidationException {
        const fields: Array<string> = []

        // Null validation
        if (!user.getName()) fields.push('Name')
        if (!user.getEmail()) fields.push('Email')

        if (fields.length > 0) {
            throw new ValidationException('Required fields were not provided...',
                'User validation failed: '.concat(fields.join(', ')).concat(' required!'))
        }

        // Email validation
        EmailValidator.validate(user.getEmail())
    }
}

