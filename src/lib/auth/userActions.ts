import axios from "axios";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL as string;

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
