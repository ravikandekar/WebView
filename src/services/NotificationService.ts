import notifee, { AndroidImportance, AndroidVisibility } from '@notifee/react-native';

export class NotificationService {
  private static instance: NotificationService;

  static getInstance(): NotificationService {
    if (!NotificationService.instance) {
      NotificationService.instance = new NotificationService();
    }
    return NotificationService.instance;
  }

  async createChannel() {
    await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
      importance: AndroidImportance.HIGH,
      visibility: AndroidVisibility.PUBLIC,
    });
  }

  async displayNotification(title: string, body: string, delay: number = 0, pressActionId: string = 'default') {
    try {
      await notifee.requestPermission();
      await this.createChannel();
  
      const show = async () => {
        try {
          await notifee.displayNotification({
            title,
            body,
            android: {
              channelId: 'default',
              importance: AndroidImportance.HIGH,
              visibility: AndroidVisibility.PUBLIC,
              smallIcon: 'ic_launcher',
              pressAction: {
                id: pressActionId,
              },
            },
            ios: {
              foregroundPresentationOptions: {
                alert: true,
                badge: true,
                sound: true,
              },
            },
          });
        } catch (err) {
          console.error('Notification display error', err);
        }
      };
  
      if (delay > 0) {
        setTimeout(show, delay * 1000);
      } else {
        await show();
      }
    } catch (e) {
      console.error('Notification permission/channel error', e);
    }
  }

  async displayWebViewLoadedNotification() {
    await this.displayNotification(
      'WebView Loaded! 🎉',
      'The website has finished loading successfully.',
      0
    );
  }

  async displayButtonNotification(type: 'info' | 'success') {
    const notifications = {
      info: {
        title: 'Info Notification ℹ️',
        body: 'This is an informational message with a 2-second delay.',
        delay: 2,
      },
      success: {
        title: 'Success Notification ✅',
        body: 'This is a success message with a 4-second delay.',
        delay: 4,
      },
    };

    const notification = notifications[type];
    await this.displayNotification(
      notification.title,
      notification.body,
      notification.delay
    );
  }

  async displayVideoNotification() {
    await this.displayNotification(
      'Video Player Ready! 🎬',
      'Tap to open the video player and watch the HLS stream.',
      3,
      'open_video'
    );
  }
}

export const notificationService = NotificationService.getInstance();
