const { validationResult } = require('express-validator');

const validate = (validations) => {
    return async (req, res, next) => {
        // Run all validations
        await Promise.all(validations.map(validation => validation.run(req)));

        const errors = validationResult(req);
        if (errors.isEmpty()) {
            return next();
        }

        // Format errors
        const formattedErrors = {};
        errors.array().forEach(error => {
            if (!formattedErrors[error.param]) {
                formattedErrors[error.param] = [];
            }
            formattedErrors[error.param].push(error.msg);
        });

        return res.status(400).json({
            message: 'Validation failed',
            errors: formattedErrors
        });
    };
};

module.exports = validate; 