const { request } = require("express");

const Joi = require("@hapi/joi");

const CreateContactSchema = Joi.object({
  name: Joi.string().min(2).max(20).alphanum().required(),

  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ["com", "ru", "ua", "net"] },
    })
    .required(),

  phone: Joi.string().min(12).max(13).required(),
});

const UpdateContactSchema = Joi.object({
  name: Joi.string().min(2).max(20).alphanum(),

  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "ru", "ua", "net"] },
  }),

  phone: Joi.string().min(12).max(13),
});

const validate = async (schema, data) => {
  const { error } = await schema.validate(data);
  if (error) {
    const message = error.details.reduce((message, item) => {
      if (message) return `${message}, ${item.message}`;
      return `${item.message}`;
    }, "");
    throw new Error(message);
  }
};

const validateCreateContactMiddleware = async (req, res, next) => {
  try {
    await validate(CreateContactSchema, req.body);
    next();
  } catch (e) {
    res.status(400).send(e.message);
    res.end();
    return;
  }
};

const validateUpdateContactMiddleware = async (req, res, next) => {
  try {
    await validate(UpdateContactSchema, req.body);
    next();
  } catch (e) {
    res.status(400).send(e.message);
    res.end();
    return;
  }
};

module.exports = {
  validateCreateContactMiddleware,
  validateUpdateContactMiddleware,
};
