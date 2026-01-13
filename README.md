# WebView Video App

A React Native CLI application that demonstrates WebView integration, local notifications, and HLS video streaming with custom controls.

## 🎯 Features

### 1. WebView Page
- ✅ Embeds a website (React Native official website) inside the app
- ✅ Displays loading state while the website loads
- ✅ Two distinct notification buttons with delayed triggers (2-4 seconds)
- ✅ Automatic notification when WebView finishes loading
- ✅ Attractive UI with React Native Elements components

### 2. Video Player Page
- ✅ HLS video streaming using the test URL: `https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8`
- ✅ Custom video controls (Play/Pause, Seek -10s/+10s, Mute/Unmute, Fullscreen)
- ✅ Time display showing current time and duration
- ✅ Professional dark theme design
- ✅ Navigation between WebView and Video Player pages

### 3. Notifications
- ✅ Two distinct notification types: Info and Success
- ✅ Delayed notifications (2-5 seconds)
- ✅ WebView loading completion notification
- ✅ Cross-platform support (iOS and Android)
- ✅ Custom notification channel setup

### 4. Bonus Features Implemented
- ✅ Notification when WebView finishes loading
- ✅ Professional UI with React Native Elements
- ✅ Custom video controls (seek, skip, mute)
- ✅ Stream information display
- ✅ Error handling for both WebView and Video Player

## 🛠 Technical Implementation

### Dependencies Used
- `@react-navigation/native` & `@react-navigation/native-stack` - Navigation
- `react-native-webview` - WebView integration
- `react-native-video` - Video playback with HLS support
- `@notifee/react-native` - Local notifications
- `react-native-elements` - UI components
- `react-native-vector-icons` - Icon library

### Architecture
- **TypeScript** - Type-safe development
- **Service Layer** - NotificationService for centralized notification handling
- **Screen Components** - Separate screens for WebView and Video Player
- **Navigation** - Stack-based navigation between screens

### File Structure
```
src/
├── types/
│   └── navigation.ts          # Navigation type definitions
├── services/
│   └── NotificationService.ts # Notification handling service
└── screens/
    ├── WebViewScreen.tsx      # WebView page with notifications
    └── VideoPlayerScreen.tsx  # Video player with HLS streaming
```

## 🚀 Getting Started

### Prerequisites
- Node.js >= 20
- React Native development environment
- Android Studio (for Android) / Xcode (for iOS)

### Installation

1. **Clone and navigate to the project:**
   ```bash
   cd WebViewVideoApp
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **iOS setup (for macOS users):**
   ```bash
   cd ios && pod install && cd ..
   ```

4. **Run the app:**
   ```bash
   # For Android
   npm run android
   
   # For iOS
   npm run ios
   ```

### Development Scripts
- `npm start` - Start React Native Metro bundler
- `npm run android` - Run on Android device/emulator
- `npm run ios` - Run on iOS device/simulator
- `npm run lint` - Run ESLint

## 📱 App Usage

### WebView Screen
1. The app starts with the WebView screen showing the React Native official website
2. While loading, you'll see a loading indicator
3. When the website finishes loading, you'll receive a notification
4. Use the two buttons to trigger different types of notifications with delays
5. Tap "Go to Video Player" to navigate to the video screen

### Video Player Screen
1. The video player automatically loads the HLS test stream
2. Use the custom controls:
   - **Play/Pause button** (center) - Start or pause playback
   - **Seek buttons** (-10s / +10s) - Skip backward or forward
   - **Mute button** (top-left) - Toggle audio on/off
   - **Fullscreen button** (top-right) - Toggle fullscreen mode
3. View stream information below the video
4. Use "Back to WebView" to return to the main screen

## 🎨 UI/UX Design Choices

### WebView Screen
- **Light theme** with clean, modern design
- **Card-based layout** for the WebView container
- **Color-coded buttons** for different notification types
- **Loading states** for better user experience
- **React Native Elements** components for professional appearance

### Video Player Screen
- **Dark theme** optimized for video viewing
- **Overlay controls** that appear over the video
- **Professional control layout** with intuitive button placement
- **Time display** showing playback progress
- **Stream information card** with technical details

## 🔧 Technical Details

### Notification System
- Uses `@notifee/react-native` for cross-platform notifications
- Implements notification channels for Android
- Supports both immediate and delayed notifications
- Handles notification permissions automatically

### Video Streaming
- HLS (HTTP Live Streaming) support via `react-native-video`
- Custom controls implementation with state management
- Error handling for network issues
- Progress tracking and time formatting

### WebView Integration
- Secure WebView implementation with proper configuration
- Loading state management
- Error handling for network failures
- JavaScript and DOM storage enabled for full website functionality

## 🧪 Testing

The app has been tested with:
- ✅ Local development environment
- ✅ Android emulator and physical devices
- ✅ iOS simulator and physical devices
- ✅ Various network conditions
- ✅ Different notification scenarios

## 📋 Requirements Compliance

### ✅ Core Requirements
- [x] WebView with website embedding
- [x] Two notification buttons with different messages
- [x] Delayed notifications (2-5 seconds)
- [x] HLS video player with controls
- [x] Navigation between pages
- [x] Professional UI components

### ✅ Bonus Features
- [x] WebView loading notification
- [x] Custom video controls (seek, skip, mute)
- [x] Stream information display
- [x] Error handling and loading states
- [x] Cross-platform compatibility

## 📝 Notes

- The app uses TypeScript for type safety
- All components follow React Native best practices
- UI is responsive and works on different screen sizes
- Notifications work in both foreground and background states
- Video streaming is optimized for mobile networks

## 🔗 Useful Links

- [React Native Documentation](https://reactnative.dev/)
- [React Native Video](https://github.com/react-native-video/react-native-video)
- [React Native WebView](https://github.com/react-native-webview/react-native-webview)
- [Notifee Documentation](https://notifee.app/react-native/docs)

---

**Made with ❤️ using React Native CLI**# WebView
