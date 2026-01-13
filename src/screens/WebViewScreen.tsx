import React, { useRef } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Alert,
  Pressable,
  Animated,
  Platform,
} from 'react-native';
import { WebView } from 'react-native-webview';
import { Button, Text, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { notificationService } from '../services/NotificationService';
import { AppHeader } from '../components/AppHeader';

type WebViewScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'WebView'>;

const WEBVIEW_URL = 'https://reactnative.dev/';

export const WebViewScreen = () => {
  const navigation = useNavigation<WebViewScreenNavigationProp>();
  const webViewRef = useRef<WebView>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const infoScale = React.useRef(new Animated.Value(1)).current;
  const successScale = React.useRef(new Animated.Value(1)).current;

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

  const animateIn = (val: Animated.Value) => {
    Animated.spring(val, { toValue: 0.97, useNativeDriver: true, speed: 20, bounciness: 6 }).start();
  };

  const animateOut = (val: Animated.Value) => {
    Animated.spring(val, { toValue: 1, useNativeDriver: true, speed: 20, bounciness: 6 }).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        title="WebView Demo"
        subtitle="Embedded Website with Notifications"
        theme="light"
      />

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
        <Pressable
          android_ripple={{ color: 'rgba(255,255,255,0.25)' }}
          onPress={handleInfoNotification}
          onPressIn={() => animateIn(infoScale)}
          onPressOut={() => animateOut(infoScale)}
          style={styles.button}
        >
          <Animated.View style={[styles.rippleButton, styles.infoButton, { transform: [{ scale: infoScale }] }]}>
            <View style={styles.buttonContent}>
              <Icon name="info-circle" type="font-awesome" color="white" />
              <Text style={styles.buttonText}>Send Info Notification</Text>
            </View>
          </Animated.View>
        </Pressable>
        
        <Pressable
          android_ripple={{ color: 'rgba(255,255,255,0.25)' }}
          onPress={handleSuccessNotification}
          onPressIn={() => animateIn(successScale)}
          onPressOut={() => animateOut(successScale)}
          style={styles.button}
        >
          <Animated.View style={[styles.rippleButton, styles.successButton, { transform: [{ scale: successScale }] }]}>
            <View style={styles.buttonContent}>
              <Icon name="check-circle" type="font-awesome" color="white" />
              <Text style={styles.buttonText}>Send Success Notification</Text>
            </View>
          </Animated.View>
        </Pressable>

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
  rippleButton: {
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
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
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 8,
    fontWeight: '600',
  },
});
