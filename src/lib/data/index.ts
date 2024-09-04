import axios from "axios"
import { useQuery } from "@tanstack/react-query"

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

export const addUser = async (email: string) => {
  await axios.get(`${BACKEND_URL}/invites/send/${email}`, {
    withCredentials: true,
  })
}

export const markAllProba = async (email: string, probaName: string) => {
  await axios.patch(
    `${BACKEND_URL}/probas/entire/${email}`,
    {
      probaName: probaName,
      value: 1,
    },
    {
      withCredentials: true,
    }
  )
}

export const setUserSex = async (email: string, sex: string) => {
  await axios.patch(
    `${BACKEND_URL}/users/${email}`,
    {
      sex,
    },
    {
      withCredentials: true,
    }
  )
}

export const editUserData = async (
  email: string,
  name: string,
  sex: string
) => {
  await axios.patch(
    `${BACKEND_URL}/users/${email}`,
    {
      name,
      sex,
    },
    {
      withCredentials: true,
    }
  )
}

export const updateProbaStatus = async (
  currentProbaEmail: string,
  probaName: string,
  probaSubName: string,
  probaIndex: number,
  value: number
) => {
  return axios.patch(
    `${BACKEND_URL}/probas/${currentProbaEmail}`,
    {
      probaName,
      probaSubName,
      probaIndex,
      value,
    },
    { withCredentials: true }
  );
};

export const useFindAllData = () => {
  return useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const response = await axios.get(`${BACKEND_URL}/users/scouts/all`, {
        withCredentials: true,
      })
      return response.data
    },
  })
}

export const useFindUserDataByEmail = (email: string) => {
  return useQuery({
    queryKey: ["currentUserData", email],
    queryFn: async () => {
      const response = await axios.get(`${BACKEND_URL}/users/${email}`, {
        withCredentials: true,
      })
      return response.data
    },
    enabled: !!email,
  })
}
