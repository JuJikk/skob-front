import axios from "axios";
import { useQuery } from "@tanstack/react-query"

interface CreateFormParams {
    name: string;
    email: string;
    ownerEmail: string;
}

export const createForm = async ({ name, email, ownerEmail }: CreateFormParams) => {
    const response = await axios.post("/api/users", {
        name,
        email,
        ownerEmail,
    });
    return response.data;
};

export const useFindDataByEmail = (email: string) => {
    return useQuery({
        queryKey: ["userData", email],
        queryFn: async () => {
            const response = await axios.get(`/api/users?email=${email}`);
            return response.data;
        },
        enabled: !!email,
    });
};