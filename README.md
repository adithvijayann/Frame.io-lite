# Frame.io‑lite (React Native)

A simplified Frame.io-style mobile feature built in **React Native (Expo)**, implementing video playback, timestamp-based comments, basic drawing functionality, and local data storage. This project is a standalone front-end app; no backend is required.

---

## Features / Objective

1. **Video Playback**  
   - Users can load/play/pause a sample MP4 video.  

2. **Timestamp-based Comments**  
   - While playing or pausing, users can add comments linked to the current video timestamp.  
   - Comments are displayed in a list showing timestamp + text.  

3. **Basic Drawing Tool**  
   - Freehand drawing overlay on video frames.  
   - Users can select colors for drawing.  

4. **Local Storage**  
   - Comments and drawings are saved locally using `AsyncStorage` to persist data between sessions.  

---

## Design & Technical Choices

- Built with **React Native (Expo)** and **Expo Router** for modular navigation.  
- **Video playback** is implemented using `expo-av`.  
- **Freehand drawing** is implemented using `react-native-svg` with gesture handling.  
- **Data persistence** is handled via `AsyncStorage` for storing comments and drawings locally.  
- The project is structured into separate components for video and drawing to ensure clarity and maintainability.  

---

## Deliverables

1. **APK File** – Installable on Android devices: [https://expo.dev/accounts/adithvijayan/projects/frameio-lite/builds/8ce93e8e-08d9-486f-80f4-ddbbb2bf62a6] 
2. **GitHub Repository** – Full source code: [https://github.com/adithvijayann/Frame.io-lite] 
3. **Short Note** – Design and technical choices are summarized above.  

---




