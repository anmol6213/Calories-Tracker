import Constants from 'expo-constants';

// Define the API key - in a real app, this should be stored securely
const OPENROUTER_API_KEY = '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';

// Define the types for the API response
interface FoodAnalysisResult {
  foodItems: FoodItem[];
  totalCalories: number;
  nutritionalSummary?: string;
  error?: string;
}

interface FoodItem {
  name: string;
  calories: number;
  quantity?: string;
  unit?: string;
}

/**
 * Analyzes a food image using Gemini Pro 2.0 via OpenRouter
 * @param base64Image Base64 encoded image data
 * @returns Analysis result with food items and calories
 */
export async function analyzeFoodImage(base64Image: string): Promise<FoodAnalysisResult> {
  try {
    // Ensure the base64 string has the correct format for the API
    const formattedBase64 = base64Image.startsWith('data:image')
      ? base64Image
      : `data:image/jpeg;base64,${base64Image}`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${OPENROUTER_API_KEY}`,
        "HTTP-Referer": "expo-calories-tracker", // Replace with your app's URL in production
        "X-Title": "Calories Tracker App",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        "model": "google/gemini-2.0-pro-exp-02-05:free",
        "messages": [
          {
            "role": "system",
            "content": "You are a nutrition expert that analyzes food images. Identify all food items in the image, estimate their calories, and provide a total calorie count. Return the response in a structured format with food items, individual calories, and total calories. Be as accurate as possible."
          },
          {
            "role": "user",
            "content": [
              {
                "type": "text",
                "text": "Analyze this food image. Identify all food items, estimate calories for each item, and provide a total calorie count. Format your response as a JSON object with the following structure: { foodItems: [{ name: string, calories: number, quantity?: string, unit?: string }], totalCalories: number, nutritionalSummary: string }"
              },
              {
                "type": "image_url",
                "image_url": {
                  "url": formattedBase64
                }
              }
            ]
          }
        ]
      })
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('API Error:', errorData);
      return { 
        foodItems: [], 
        totalCalories: 0, 
        error: `API Error: ${response.status} ${response.statusText}` 
      };
    }

    const data = await response.json();
    
    // Extract the content from the response
    const content = data.choices[0]?.message?.content;
    
    if (!content) {
      return { 
        foodItems: [], 
        totalCalories: 0, 
        error: 'No content in API response' 
      };
    }

    // Try to parse the JSON from the response
    try {
      // Find JSON in the response (it might be embedded in markdown)
      const jsonMatch = content.match(/```json\n([\s\S]*?)\n```/) || 
                        content.match(/{[\s\S]*}/);
      
      const jsonString = jsonMatch 
        ? jsonMatch[1] || jsonMatch[0]
        : content;
      
      const parsedResult = JSON.parse(jsonString);
      
      // Ensure the result has the expected structure
      if (!parsedResult.foodItems || !Array.isArray(parsedResult.foodItems)) {
        throw new Error('Invalid response format');
      }
      
      return {
        foodItems: parsedResult.foodItems,
        totalCalories: parsedResult.totalCalories || 
          parsedResult.foodItems.reduce((sum: number, item: FoodItem) => sum + item.calories, 0),
        nutritionalSummary: parsedResult.nutritionalSummary || ''
      };
    } catch (parseError) {
      console.error('Error parsing API response:', parseError);
      
      // Fallback: Try to extract information from text
      return {
        foodItems: [],
        totalCalories: 0,
        error: 'Could not parse the analysis result',
        nutritionalSummary: content
      };
    }
  } catch (error) {
    console.error('Error analyzing food image:', error);
    return {
      foodItems: [],
      totalCalories: 0,
      error: error instanceof Error ? error.message : 'Unknown error'
    };
  }
} 