//Валидация для записей
import { body } from "express-validator";

export const postCreateNotesValidation = [
  body("title", "Введите заголовок").isLength({ min: 2 }).isString(),
  body("text", "Введите описание").isLength({ min: 10 }).isString(),
  body("tags", "Неверный формат тэга").optional().isString(),
  body("imageUrl", "Неверная ссылка на изображение").optional().isString(),
];
