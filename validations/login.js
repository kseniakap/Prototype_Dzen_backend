import { body } from "express-validator";

export const loginValidation = [
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен содержать не менее 6-ти символов").isLength({
    min: 6,
  }),
];
