# Calories Tracker App

A mobile application that uses AI to analyze food images and calculate calories.

## Features

- **Food Image Analysis**: Take photos of food or select from gallery
- **AI-Powered Recognition**: Uses Google's Gemini Pro 2.0 to identify food items
- **Calorie Calculation**: Estimates calories for each food item
- **Nutritional Information**: Provides additional nutritional insights
- **User-Friendly Interface**: Clean, intuitive design for easy use

## Technology Stack

- **Frontend**: React Native with Expo
- **AI Model**: Google Gemini Pro 2.0 via OpenRouter API
- **Image Handling**: Expo Image Picker for camera and gallery access

## Getting Started

### Prerequisites

- Node.js (v14 or newer)
- npm or yarn
- Expo CLI

### Installation

1. Clone the repository
```bash
git clone https://github.com/anmol6213/Calories-Tracker.git
cd calories-tracker
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Start the development server
```bash
npx expo start
```

4. Open the app on your device using the Expo Go app or run on an emulator

## How It Works

1. The app allows users to take a photo of their food or select an image from their gallery
2. The image is sent to the OpenRouter API, which uses Google's Gemini Pro 2.0 model
3. The AI analyzes the image to identify food items and estimate their calorie content
4. Results are displayed to the user, showing each food item and its estimated calories

## API Configuration

The app uses OpenRouter to access Google's Gemini Pro 2.0 model. The API key is configured in the `services/CaloriesService.ts` file.

**Note**: In a production environment, API keys should be stored securely and not hardcoded in the source code.

## Privacy

- Food images are sent to the AI service for analysis but are not permanently stored
- The app does not collect or store personal information about eating habits or food choices

## Limitations

- Calorie estimates are approximate and based on standard portion sizes
- Accuracy may vary based on image quality, food visibility, and unique preparation methods
- For precise nutritional tracking, consult with a nutritionist or use a food scale

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Google Gemini Pro 2.0 for the AI model
- OpenRouter for API access
- Expo for the development framework

## App screenshots

<img src="readme IMG-20250313-WA0003.jpg" width="180">   <img src="readme assets/2.png" width="180">   <img src="readme assets/3.png" width="180">   <img src="readme assets/4.png" width="180">
<img src="readme assets/5.png" width="180">
