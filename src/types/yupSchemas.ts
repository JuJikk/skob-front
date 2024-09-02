import * as Yup from "yup"

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
      .email("Неправильний формат електронної пошти")
      .required("Електронна пошта обов'язкова"),
})