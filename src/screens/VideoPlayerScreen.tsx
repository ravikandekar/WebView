import React, { useRef, useState } from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Alert,
  BackHandler,
} from 'react-native';
import { Platform } from 'react-native';
import Video, { VideoRef } from 'react-native-video';
import { Button, Text, Icon, Slider } from 'react-native-elements';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../types/navigation';
import { notificationService } from '../services/NotificationService';
import { AppHeader } from '../components/AppHeader';

type VideoPlayerScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'VideoPlayer'>;

const HLS_STREAM_URL = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';

export const VideoPlayerScreen = () => {
  const navigation = useNavigation<VideoPlayerScreenNavigationProp>();
  const videoRef = useRef<VideoRef>(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMuted, setIsMuted] = useState(false);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleFullscreen = () => {
    const next = !isFullscreen;
    setIsFullscreen(next);
    if (Platform.OS === 'ios') {
      if (next) {
        videoRef.current?.presentFullscreenPlayer?.();
      } else {
        videoRef.current?.dismissFullscreenPlayer?.();
      }
    }
  };

  const handleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleSeek = (seconds: number) => {
    if (videoRef.current) {
      const newTime = currentTime + seconds;
      videoRef.current.seek(newTime);
    }
  };

  const handleVideoLoad = (data: any) => {
    setIsLoading(false);
    setDuration(data.duration);
    setIsPlaying(true);
    notificationService.displayVideoNotification();
  };

  const handleVideoError = (error: any) => {
    setIsLoading(false);
    Alert.alert('Error', 'Failed to load the video stream. Please try again.');
    console.error('Video error:', error);
  };

  const handleProgress = (data: any) => {
    setCurrentTime(data.currentTime);
  };

  useFocusEffect(
    React.useCallback(() => {
      const onBackPress = () => {
        setIsPlaying(false);
        if (Platform.OS === 'ios' && isFullscreen) {
          videoRef.current?.dismissFullscreenPlayer?.();
          setIsFullscreen(false);
          return true;
        }
        navigation.navigate('WebView');
        return true;
      };
      const sub = BackHandler.addEventListener('hardwareBackPress', onBackPress);
      return () => sub.remove();
    }, [isFullscreen, navigation])
  );

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {!isFullscreen && (
        <AppHeader
          title="Video Player"
          subtitle="HLS Stream Playback"
          theme="dark"
          showBack
          onBackPress={() => navigation.navigate('WebView')}
        />
      )}

      <View style={[styles.videoContainer, isFullscreen ? styles.videoContainerFullscreen : null]}>
        {isLoading && (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading video...</Text>
          </View>
        )}
        
        <Video
          ref={videoRef}
          source={{ uri: HLS_STREAM_URL }}
          style={styles.video}
          controls={false}
          paused={!isPlaying}
          resizeMode="contain"
          onLoad={handleVideoLoad}
          onError={handleVideoError}
          onProgress={handleProgress}
          volume={isMuted ? 0 : 1.0}
          repeat={false}
        />

        <View style={styles.controlsOverlay}>
          <View style={styles.topControls}>
            <TouchableOpacity style={styles.iconButton} onPress={handleMute}>
              <Icon name={isMuted ? 'volume-off' : 'volume-up'} type="font-awesome" color="#ffffff" size={24} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconButton} onPress={handleFullscreen}>
              <Icon name={isFullscreen ? 'compress' : 'expand'} type="font-awesome" color="#ffffff" size={24} />
            </TouchableOpacity>
          </View>

          <View style={styles.centerControls}>
            <TouchableOpacity style={styles.seekButton} onPress={() => handleSeek(-10)}>
              <Icon name="backward" type="font-awesome" color="#ffffff" size={20} />
              <Text style={styles.seekLabel}>-10s</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.playPauseButton} onPress={handlePlayPause}>
              <Icon name={isPlaying ? 'pause' : 'play'} type="font-awesome" color="#ffffff" size={26} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.seekButton} onPress={() => handleSeek(10)}>
              <Text style={styles.seekLabel}>+10s</Text>
              <Icon name="forward" type="font-awesome" color="#ffffff" size={20} />
            </TouchableOpacity>
          </View>

          <View style={styles.bottomControls}>
            <Slider
              value={currentTime}
              minimumValue={0}
              maximumValue={duration || 0}
              step={1}
              onSlidingComplete={(val: number) => videoRef.current?.seek(val)}
              minimumTrackTintColor="#2196F3"
              maximumTrackTintColor="rgba(255,255,255,0.3)"
              thumbTintColor="#ffffff"
              thumbStyle={styles.sliderThumb}
              trackStyle={styles.sliderTrack}
            />
            <Text style={styles.timeText}>
              {formatTime(currentTime)} / {formatTime(duration)}
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>Stream Information</Text>
          <Text style={styles.infoText}>Format: HLS (HTTP Live Streaming)</Text>
          <Text style={styles.infoText}>URL: test-streams.mux.dev</Text>
          <Text style={styles.infoText}>Status: {isPlaying ? 'Playing' : 'Paused'}</Text>
        </View>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Back to WebView"
          onPress={() => navigation.navigate('WebView')}
          buttonStyle={styles.backButton}
          containerStyle={styles.button}
          icon={{ name: 'arrow-left', type: 'font-awesome', color: 'white' }}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  videoContainer: {
    height: 250,
    backgroundColor: '#000000',
    position: 'relative',
  },
  videoContainerFullscreen: {
    height: undefined,
    flex: 1,
  },
  video: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000',
    zIndex: 1,
  },
  loadingText: {
    fontSize: 16,
    color: '#ffffff',
  },
  controlsOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'space-between',
    padding: 10,
  },
  topControls: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  centerControls: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 16,
  },
  bottomControls: {
    alignItems: 'center',
    paddingHorizontal: 10,
    gap: 6,
  },
  iconButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 20,
    padding: 8,
  },
  playPauseButton: {
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderRadius: 30,
    padding: 15,
    marginHorizontal: 20,
  },
  seekButton: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  seekLabel: {
    fontSize: 14,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  timeText: {
    fontSize: 14,
    color: '#ffffff',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  sliderThumb: {
    width: 14,
    height: 14,
  },
  sliderTrack: {
    height: 3,
    borderRadius: 2,
  },
  infoContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  infoCard: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    borderWidth: 0,
    margin: 0,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 14,
    color: '#cccccc',
    marginBottom: 5,
  },
  buttonContainer: {
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  button: {
    marginVertical: 8,
  },
  backButton: {
    backgroundColor: '#2196F3',
    borderRadius: 8,
    paddingVertical: 12,
  },
});
