import connectDB from './utils/database.js';

const testConnection = async () => {
    await connectDB();
    console.log('Connection test finished.');
};

testConnection().then(() => {
    console.log('Test connection successful.');
}).catch((error) => {
    console.error('Test connection failed:', error.message);
});
