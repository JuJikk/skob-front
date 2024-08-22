import axios from "axios";

export async function createForm(name: string, email: string, ownerEmail: string) {
    axios({
        method: "post",
        url: "/api/users",
        data: {
            name,
            email,
            ownerEmail,
        },
    });
}

export async function findDataByEmail(email: string) {
    try {
        const response = await axios({
            method: "get",
            url: `/api/users?email=${email}`,
            responseType: "json",
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}

export const updateCheckedStatus = async (email: string, probaType: string, probaSubType: string, index: number, value: number) => {
    try {
        await axios.post("/api/proba", {
            email,
            probaType,
            probaSubType,
            index,
            value,
        });
    } catch (error) {
        console.error("Error updating checked status:", error);
        throw error;
    }
};