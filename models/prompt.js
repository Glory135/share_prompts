const { Schema, model, models, default: mongoose } = require('mongoose');

const PromptSchema = new Schema(
	{
		creator: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
		prompt: {
			type: String,
			required: [true, 'Prompt is required'],
		},
		tag: {
			type: String,
            required: [true, 'tag is required'],
		},
	},
	{ timestamps: true }
);

const Prompt = models.Prompt || model('Prompt', PromptSchema);

export default Prompt;
