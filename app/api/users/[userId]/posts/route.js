import Prompt from '@models/prompt';
import { connectDB } from '@utils/DB';

export const GET = async (req, {params}) => {
	try {
		await connectDB();

		const data = await Prompt.find({ creator: params.userId }).populate(
			'creator'
		);
		return new Response(JSON.stringify(data), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response('Error Getting Prompts', { status: 500 });
	}
};
