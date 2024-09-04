import * as Yup from "yup"

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const validationEditScoutSchema = Yup.object({
    sex: Yup.string()
      .oneOf(["MALE", "FEMALE"], "Виберіть правильну стать")
      .required("Це поле є обов'язковим"),
    name: Yup.string().required("Це поле є обов'язковим"),
})

export const validationGenderModalSchema = Yup.object({
    sex: Yup.string()
      .oneOf(["MALE", "FEMALE"], "Виберіть правильну стать")
      .required("Це поле є обов'язковим"),
})

export const validationSchemaAddUser = Yup.object({
    email: Yup.string()
      .matches(emailRegex, "Неправильний формат електронної пошти")
      .required("Електронна пошта обов'язкова"),
});