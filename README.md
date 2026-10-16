# 🍽️ Calories Tracker

![React Native](https://img.shields.io/badge/React%20Native-Expo-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

A mobile app that uses AI to analyze food photos and estimate calories in seconds.

## 📱 Screenshots

<p align="center">
  <img src="https://github.com/user-attachments/assets/459ee355-2aef-4882-aac3-70d80999a595" width="180">
  <img src="https://github.com/user-attachments/assets/87494658-eee8-444f-98ba-c2b44de6ccf0" width="180">
  <img src="https://github.com/user-attachments/assets/9d0df095-8872-4637-8113-852759d65776" width="180">
  <img src="https://github.com/user-attachments/assets/481f2643-d7e3-46ce-978d-36afe9d526b6" width="180">
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/a9d8a9b4-5476-4e65-b962-a58127b38191" width="180">
  <img src="https://github.com/user-attachments/assets/35adfb09-5586-4acc-8e97-ccefbc32f424" width="180">
  <img src="https://github.com/user-attachments/assets/28cf63f8-3b23-4688-b4a9-54a2ec4f6b1a" width="180">
  <img src="https://github.com/user-attachments/assets/cad2ad58-9d07-4e6b-9f15-8a4ec6bb289d" width="180">
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/7058a9f6-66f5-4e34-aee9-6e641379cac2" width="180">
  <img src="https://github.com/user-attachments/assets/a5215fb6-f3b5-4fa6-8939-fbdbe069877b" width="180">
  <img src="https://github.com/user-attachments/assets/660d569c-f5c2-4e6e-8040-77798ba82b9e" width="180">
</p>

## ✨ Features

- 📷 **Food image analysis**: take a photo or pick one from the gallery
- 🤖 **AI recognition**: identifies food items using Google Gemini via OpenRouter
- 🔢 **Calorie estimates** for each detected item
- 🥗 **Nutritional insights** beyond calories
- 🔐 **Login / signup** flow with a clean, modern UI

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| App | React Native + Expo |
| Language | TypeScript |
| AI model | Google Gemini via OpenRouter API |
| Media | Expo Image Picker |

## 🚀 Getting Started

### Prerequisites

- Node.js (v18 or newer recommended)
- npm or yarn
- Expo Go app on your phone, or an emulator

### Installation

```bash
git clone https://github.com/anmol6213/Calories-Tracker.git
cd Calories-Tracker
npm install
```

### Configure the API key

1. Get a key from [OpenRouter](https://openrouter.ai/).
2. Create a `.env` file in the project root:

```env
EXPO_PUBLIC_OPENROUTER_API_KEY=your_api_key_here
```

3. Make sure `.env` is listed in `.gitignore` so it is never committed.

> ⚠️ Variables starting with `EXPO_PUBLIC_` are bundled into the app. For a production release, route AI requests through your own backend instead.

### Run the app

```bash
npx expo start
```

Scan the QR code with Expo Go, or press `a` (Android) / `i` (iOS) to open an emulator.

## ⚙️ How It Works

1. The user takes or selects a photo of their meal.
2. The image is sent to the Gemini model through OpenRouter.
3. The AI identifies the food items and estimates calories.
4. Results are shown item by item in the app.

## 🔒 Privacy

- Images are sent to the AI service for analysis and are not stored by this app.
- No personal eating data is collected or stored.

## ⚠️ Limitations

- Estimates are approximate and based on standard portion sizes.
- Accuracy depends on image quality and how visible the food is.
- For precise tracking, consult a nutritionist or use a food scale.

## 🗺️ Roadmap

- [ ] Meal history and daily calorie goals
- [ ] Manual edit of detected items
- [ ] Weekly nutrition summary
- [ ] Secure backend for API calls

## 🤝 Contributing

Issues and pull requests are welcome. Fork the repo, create a branch, and open a PR.

## 📄 License

Licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini for the AI model
- OpenRouter for API access
- Expo for the development framework

---

Built by [Anmol Patil](https://github.com/anmol6213)
