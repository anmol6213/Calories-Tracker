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

<p align="center">
  <img src="https://github.com/user-attachments/assets/459ee355-2aef-4882-aac3-70d80999a595" width="200">
  <img src="https://github.com/user-attachments/assets/87494658-eee8-444f-98ba-c2b44de6ccf0" width="200">
  <img src="https://github.com/user-attachments/assets/9d0df095-8872-4637-8113-852759d65776" width="200">
  <img src="https://github.com/user-attachments/assets/481f2643-d7e3-46ce-978d-36afe9d526b6" width="200">
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/a9d8a9b4-5476-4e65-b962-a58127b38191" width="200">
  <img src="https://github.com/user-attachments/assets/35adfb09-5586-4acc-8e97-ccefbc32f424" width="200">
  <img src="https://github.com/user-attachments/assets/28cf63f8-3b23-4688-b4a9-54a2ec4f6b1a" width="200">
  <img src="https://github.com/user-attachments/assets/cad2ad58-9d07-4e6b-9f15-8a4ec6bb289d" width="200">
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/7058a9f6-66f5-4e34-aee9-6e641379cac2" width="200">
  <img src="https://github.com/user-attachments/assets/a5215fb6-f3b5-4fa6-8939-fbdbe069877b" width="200">
  <img src="https://github.com/user-attachments/assets/660d569c-f5c2-4e6e-8040-77798ba82b9e" width="200">
</p>
