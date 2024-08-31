import * as Yup from "yup"

export const validationSexSchema = Yup.object({
  sex: Yup.string()
    .oneOf(["MALE", "FEMALE"], "Виберіть правильну стать")
    .required("Це поле є обов'язковим"),
})