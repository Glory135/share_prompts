import Prompt from '@models/prompt';
import { connectDB } from '@utils/DB';

// GET
export const GET = async (req, { params }) => {
	try {
		await connectDB();

		const data = await Prompt.findById(params.id);
		if (!data) {
			return new Response('Prompt not found', { status: 404 });
		}
		return new Response(JSON.stringify(data), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response('Error Getting Prompts', { status: 500 });
	}
};

// PATCH

export const PATCH = async (req, { params }) => {
	const { prompt, tag } = await req.json();

	try {
		await connectDB();
		const existingPrompt = await Prompt.findById(params.id);
		if (!existingPrompt) {
			return new Response('Prompt not found', { status: 404 });
		}
		existingPrompt.prompt = prompt;
		existingPrompt.tag = tag;

		await existingPrompt.save();
		return new Response(JSON.stringify(existingPrompt), { status: 200 });
	} catch (error) {
		console.log(error);
		return new Response('Error Updating Prompts', { status: 500 });
	}
};

// DELETE
export const DELETE = async(req, {params})=>{
try {
    await connectDB();
    await Prompt.findByIdAndRemove(params.id);
    return new Response('prompt deleted successfully', { status: 200 });
} catch (error) {
    console.log(error);
    return new Response('Error Deleting Prompts', { status: 500 });
}
}