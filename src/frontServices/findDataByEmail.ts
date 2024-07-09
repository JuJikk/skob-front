import axios from "axios";

export default async function findDataByEmail(email: string) {
    try {
        const response = await axios({
            method: "get",
            url: `/api/getUserByEmail?email=${email}`,
            responseType: "json", // Change to 'json' for JSON responses
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
    }
}
