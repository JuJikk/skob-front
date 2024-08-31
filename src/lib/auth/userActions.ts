import axios from "axios";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL as string;

export const signUp = async (name: string, email: string, password: string, sex: string): Promise<void> => {
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
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to sign up: ${error.message}`);
    } else {
      throw new Error("Failed to sign up");
    }
  }
};

export const logIn = async (email: string, password: string): Promise<void> => {
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
    );
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to sign in: ${error.message}`);
    } else {
      throw new Error("Failed to sign in");
    }
  }
};

export const signOut = async (): Promise<void> => {
  location.reload();
  try {
    await axios.get(`${BACKEND_URL}/auth/logout`, {
      withCredentials: true,
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error(`Failed to sign out: ${error.message}`);
    } else {
      throw new Error("Failed to sign out");
    }
  }
};
