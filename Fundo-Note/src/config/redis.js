/* eslint-disable prettier/prettier */
import { createClient } from 'redis';

export const client = createClient();

const redis = async () => {
    try {
        await client.connect();
        console.log('Client Connection established.....')
    }
    catch (error) {
        console.log('Error')
    }
}
export default redis;