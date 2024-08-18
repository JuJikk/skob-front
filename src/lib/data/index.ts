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
            responseType: "json", // Change to 'json' for JSON responses
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}
