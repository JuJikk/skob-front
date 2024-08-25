import axios from "axios"

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export const signUp = async (name: string, email: string, password: string, sex: string) => {
  try {
    await axios.post(
      `${BACKEND_URL}/auth/register`,
      {
        name,
        email,
        password,
        sex,
      },
      {
        withCredentials: true,
      }
    )
  } catch (error) {
    throw new Error("Failed to sign up")
  }
}

export const logIn = async (email: string, password: string) => {
  try {
    await axios.post(
      `${BACKEND_URL}/auth/login`,
      {
        email,
        password,
      },
      {
        withCredentials: true,
      }
    )
  } catch (error) {
    throw new Error("Failed to sign in")
  }
}

export const signOut = async () => {
  try {
    await axios.get(`${BACKEND_URL}/auth/logout`,{
      withCredentials: true,
    })
  } catch (error) {
    throw new Error("Failed to sign out")
  }
}