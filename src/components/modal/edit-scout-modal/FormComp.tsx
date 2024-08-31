import { Field, Form } from "formik"
import { Button, Input, Select, SelectItem } from "@nextui-org/react"

interface FormCompProps {
  values: {
    name: string
    sex: string
  }
  setFieldValue: (field: string, value: string, shouldValidate?: boolean) => void
  onOpenChange: () => void
  setCurrentUserEmail: React.Dispatch<React.SetStateAction<string>>
}

const FormComp: React.FC<FormCompProps> = ({
  values,
  setFieldValue,
  onOpenChange,
  setCurrentUserEmail,
}) => {
  return (
    <Form className="space-y-4 w-full">
      <Field
        as={Input}
        id="name"
        name="name"
        label="Введіть прізвище та ім'я"
        required
      />
      <Select
        id="sex"
        name="sex"
        selectedKeys={[values.sex]}
        label="Виберіть свою стать"
        onChange={(e) => setFieldValue("sex", e.target.value)}
        required
      >
        <SelectItem key="MALE" value="MALE">
          Чоловіча
        </SelectItem>
        <SelectItem key="FEMALE" value="FEMALE">
          Жіноча
        </SelectItem>
      </Select>
      <div className="flex flex-col md:flex-row gap-4">
        <Button
          type="submit"
          className="bg-gray-900 font-bold !w-full h-12 md:w-fit text-base text-white px-8 rounded-xl"
        >
          Змінити
        </Button>
        <Button
          variant="bordered"
          className="bg-white text-gray-900 !w-full h-12 md:w-fit text-base font-bold border-gray-900 rounded-xl"
          onPress={() => {
            setCurrentUserEmail("")
            onOpenChange()
          }}
        >
          Скасувати
        </Button>
      </div>
    </Form>
  )
}

export default FormComp
