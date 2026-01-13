import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Alert,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Button, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { notificationService } from '../services/NotificationService';

type WebViewScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'WebView'>;

const WEBVIEW_URL = 'https://reactnative.dev/';

export const WebViewScreen = () => {
  const navigation = useNavigation<WebViewScreenNavigationProp>();
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const handleWebViewLoad = () => {
    setIsLoading(false);
    notificationService.displayWebViewLoadedNotification();
  };

  const handleWebViewError = (error: any) => {
    setIsLoading(false);
    Alert.alert('Error', 'Failed to load the website. Please check your connection.');
    console.error('WebView error:', error);
  };

  const handleInfoNotification = () => {
    notificationService.displayButtonNotification('info');
  };

  const handleSuccessNotification = () => {
    notificationService.displayButtonNotification('success');
  };

  const handleNavigateToVideo = () => {
    navigation.navigate('VideoPlayer');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#ffffff" />
      
      <View style={styles.header}>
        <Text h3 style={styles.title}>WebView Demo</Text>
        <Text style={styles.subtitle}>Embedded Website with Notifications</Text>
      </View>

      <View style={styles.webViewCard}>
        <View style={styles.webViewContainer}>
          {isLoading && (
            <View style={styles.loadingContainer}>
              <Text style={styles.loadingText}>Loading website...</Text>
            </View>
          )}
          <WebView
            ref={webViewRef}
            source={{ uri: WEBVIEW_URL }}
            style={styles.webView}
            onLoad={handleWebViewLoad}
            onError={handleWebViewError}
            startInLoadingState={true}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            scalesPageToFit={true}
          />
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Send Info Notification"
          onPress={handleInfoNotification}
          buttonStyle={styles.infoButton}
          containerStyle={styles.button}
          icon={{ name: 'info-circle', type: 'font-awesome', color: 'white' }}
        />
        
        <Button
          title="Send Success Notification"
          onPress={handleSuccessNotification}
          buttonStyle={styles.successButton}
          containerStyle={styles.button}
          icon={{ name: 'check-circle', type: 'font-awesome', color: 'white' }}
        />

        <Button
          title="Go to Video Player"
          onPress={handleNavigateToVideo}
          buttonStyle={styles.videoButton}
          containerStyle={styles.button}
          icon={{ name: 'video', type: 'font-awesome', color: 'white' }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    color: '#333',
    marginBottom: 5,
  },
  subtitle: {
    color: '#666',
    fontSize: 16,
  },
  webViewCard: {
    margin: 15,
    padding: 0,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  webViewContainer: {
    height: 400,
    borderRadius: 12,
    overflow: 'hidden',
  },
  webView: {
    flex: 1,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    zIndex: 1,
  },
  loadingText: {
    fontSize: 16,
    color: '#666',
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  button: {
    marginVertical: 8,
  },
  infoButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 12,
  },
  successButton: {
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    paddingVertical: 12,
  },
  videoButton: {
    backgroundColor: '#FF9800',
    borderRadius: 8,
    paddingVertical: 12,
  },
});