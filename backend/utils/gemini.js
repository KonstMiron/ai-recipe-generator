import dotenv from 'dotenv';
import { GoogleGenAI} from '@google/genai';

dotenv.config();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

if (!process.env.GEMINI_API_KEY) {
  console.warn('Warning: GEMINI_API_KEY is not set. Gemini API calls will fail.');
}

export const generateRecipe = async ({ ingredients, dietaryPreferences = [], cuisineType = 'any', servings = 4, cookingTime = 'medium' }) => {
    const dietaryInfo = dietaryPreferences.length > 0 ?
     `Dietary restrictions: ${dietaryPreferences.join(', ')}.` 
     : 'No dietary restrictions.';

     const timeGuide = {
        quick: 'under 30 minutes',
        medium: '30-60 minutes',
        long: 'over 60 minutes'
     };

    const prompt = `Generate a detailed recipe with the following requirements:
    Ingredients available: ${ingredients.join(', ')}.
    ${dietaryInfo}.
    Cuisines: ${cuisineType}.
    Servings: ${servings}.
    Cooking time: ${timeGuide}.

    Please provide a complete recipe in the following JSON format ( return ONLY valid JSON, no markdown):
    {
        "name": "Recipe Name",
        "description": "Brief description of the dish",
        "cuisineType": "${cuisineType}",
        "difficulty": "easy|medium|hard",
        "prepTime": number (in minutes),
        "cookTime": number (in minutes),
        "servings": ${servings},
        "ingredients": [
            {"name": "Ingredient Name", "quantity": number, "unit": "unit of measurement"}
        ],
        "instructions": [
            "Step 1 description",
            "Step 2 description",
        ],
        "dietaryTags": ["vegan", "gluten-free", etc.]
        "nutrition": {
            "calories": number,
            "protein": number (in grams),
            "carbs": number (in grams),
            "fat": number (in grams),
            "fiber": number (in grams)
        },
        "cookingTips": ["Tip 1", "Tip 2"]
    }
Make sure recipe is creative, delicious, and uses the provided ingredients effectively.`;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
        });

        const generatedText = response.text.trim();

        // Remove markdown code blocks if present
        const jsonText = generatedText;
        if (jsonText.startsWith('```json')) {
            jsonText = jsonText.replace(/```json\n?/g, '').replace(/```\n?$/g, '');
        } else if (jsonText.startsWith('```')) {
            jsonText = jsonText.replace(/```\n?/g, '');
        }

        const recipe = JSON.parse(jsonText);
        return recipe;
    } catch (error) {
        console.error('Error generating recipe:', error);
        throw new Error('Failed to generate recipe. Please try again.');
    }
}; 