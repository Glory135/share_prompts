import mongoose from 'mongoose';

let isConnected = false;

export const connectDB = async () => {
	mongoose.set('strictQuery', true);

	if (isConnected) {
		console.log('mongoDB is connected');
		return;
	}
	try {
		await mongoose.connect(process.env.DB, {
			dbName: 'share_prompts',
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		isConnected = true;
		console.log('mongoDB connected');
	} catch (error) {
		isConnected = false;
        console.log(error);
    }
};
