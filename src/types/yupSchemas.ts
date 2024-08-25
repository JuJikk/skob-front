import * as yup from "yup";


export const registrationSchema = yup.object().shape({
    name: yup.string().required("Необхідно ввести ім'я та прізвище"),
    email: yup.string().email("Введіть валідну пошту").required('Необхідно ввести пошту'),
    password: yup.string()
      .min(8, 'Пароль має містити щонайменше 8 символів')
      .matches(/[A-Z]/, 'Пароль має містити хоча б одну велику літеру')
      .matches(/[a-z]/, 'Пароль має містити хоча б одну малу літеру')
      .matches(/\d/, 'Пароль має містити хоча б одну цифру')
      .required('Пароль є обов’язковим'),
    confirmPassword: yup.string()
      .oneOf([yup.ref('password')], 'Паролі повинні співпадати')
      .required('Підтвердження паролю є обов’язковим'),
    sex: yup.string().uppercase().required("Виберіть стать"),
});