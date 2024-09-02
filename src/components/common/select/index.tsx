import { useSelectStore } from "../../../lib/contex/selectButton.tsx"
import { useFindDataByEmail } from "../../../lib/data"
import { Select, SelectItem } from "@nextui-org/react"
import React from "react"

const UserSelect: React.FC = () => {
  const { currentUserEmail, setCurrentUserEmail } = useSelectStore();
  const { data: userData } = useFindDataByEmail();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setCurrentUserEmail(event.target.value);
  };

  return (
    <Select
      label={currentUserEmail}
      onChange={handleSelectChange}
      className="p-2 max-w-60 rounded-md"
      size="sm"
      aria-label="Select user"
    >
      {userData?.map((user: {email: string, name: string}) => (
        <SelectItem key={user.email}>
          {user.name}
        </SelectItem>
      ))}
    </Select>
  );
};

export default UserSelect;
