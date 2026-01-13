import React from 'react';
import { Platform, StatusBar, View, StyleSheet } from 'react-native';
import { Header, Text, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

type Theme = 'light' | 'dark';

type AppHeaderProps = {
  title: string;
  subtitle?: string;
  theme?: Theme;
  showBack?: boolean;
  onBackPress?: () => void;
  rightIconName?: string;
  rightIconType?: string;
  onRightPress?: () => void;
};

export const AppHeader: React.FC<AppHeaderProps> = ({
  title,
  subtitle,
  theme = 'light',
  showBack = false,
  onBackPress,
  rightIconName,
  rightIconType = 'font-awesome',
  onRightPress,
}) => {
  const navigation = useNavigation();
  const isDark = theme === 'dark';

  const backgroundColor = isDark ? '#1a1a1a' : '#ffffff';
  const titleColor = isDark ? '#ffffff' : '#333333';
  const barStyle = isDark ? 'light-content' : 'dark-content';

  const leftComponent = showBack
    ? (
      <Icon
        name="arrow-left"
        type="font-awesome"
        color={titleColor}
        onPress={onBackPress ?? (() => navigation.goBack())}
      />
    )
    : undefined;

  const centerComponent = (
    <View>
      <Text h4 style={[styles.title, isDark ? styles.titleDark : styles.titleLight]}>{title}</Text>
      {subtitle ? <Text style={[styles.subtitle, isDark ? styles.subtitleDark : styles.subtitleLight]}>{subtitle}</Text> : null}
    </View>
  );

  const rightComponent = rightIconName
    ? (
      <Icon
        name={rightIconName}
        type={rightIconType as any}
        color={titleColor}
        onPress={onRightPress}
      />
    )
    : undefined;

  return (
    <>
      <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
      <Header
        containerStyle={[
          styles.container,
          isDark ? styles.containerDark : styles.containerLight,
          Platform.OS === 'android' ? { paddingTop: StatusBar.currentHeight ?? 0 } : null,
        ]}
        backgroundColor={backgroundColor}
        leftComponent={leftComponent}
        centerComponent={centerComponent}
        rightComponent={rightComponent}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 1,
  },
  containerLight: {
    backgroundColor: '#ffffff',
    borderBottomColor: '#e0e0e0',
  },
  containerDark: {
    backgroundColor: '#1a1a1a',
    borderBottomColor: '#333333',
  },
  title: {
    marginBottom: 4,
  },
  titleLight: {
    color: '#333333',
  },
  titleDark: {
    color: '#ffffff',
  },
  subtitle: {},
  subtitleLight: {
    color: '#666666',
  },
  subtitleDark: {
    color: '#cccccc',
  },
});
