import axios from "axios";

export default async function CreateForm(name: string, email: string, ownerEmail: string) {
  axios({
    method: "post",
    url: "/api/createUser",
    data: {
      name,
      email,
      ownerEmail,
    },
  });
}