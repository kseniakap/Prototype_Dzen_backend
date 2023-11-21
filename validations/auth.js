import { body } from "express-validator";

export const registerValidation = [
  body("fullName", "Укажите имя").isLength({ min: 2 }),
  body("email", "Неверный формат почты").isEmail(),
  body("password", "Пароль должен содержать не менее 6-ти символов").isLength({
    min: 6,
  }),
  body("avatarUrl", "Неверная ссылка").optional().isURL(),
];
