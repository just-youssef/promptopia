import Prompt from "models/prompt";
import { connectToDB } from "utils/database";

export const GET = async (request) => {
    try {
        await connectToDB()

        const prompts = await Prompt.find({ creator: '6520db950133ee3ecc756fae' }).populate('creator')

        return new Response(JSON.stringify(prompts), { status: 200 })
    } catch (error) {
        return new Response("Failed to fetch all prompts", { status: 500 })
    }
} 