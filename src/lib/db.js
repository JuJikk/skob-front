import { MongoClient } from 'mongodb';

const uri = process.env.NEXT_PUBLIC_MONGODB_URL;
const client = new MongoClient(uri);

export async function updateProbaDataInDatabase(email, probaType, probaSubType, index, value) {
    try {
        await client.connect();
        const database = client.db('test');
        const collection = database.collection('users');
        console.log(probaType, probaSubType, probaSubType);

        const updateField = `${probaType}.${probaSubType}.${index}`;
        const update = { $set: { [updateField]: value } };

        await collection.updateOne(
            { email },
            update
        );
    } finally {
        await client.close();
    }
}
