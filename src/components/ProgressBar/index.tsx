import { View } from 'react-native';

import { useEffect } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { styles } from './styles';

interface Props {
  total: number;
  current: number;
}

export function ProgressBar({ total, current }: Props) {
  const percentage = Math.round((current / total) * 100);

  const sharedProgressBar = useSharedValue(percentage) 
  const stylesAnimatedProgress = useAnimatedStyle(() => {
    return {
      width: `${sharedProgressBar.value}%`
    }
  })
  useEffect(() => {
    sharedProgressBar.value = withTiming(percentage, { duration: 500})
  }, [current])
  return (
    <View style={styles.track}>
      <Animated.View style={[styles.progress, stylesAnimatedProgress]} />
    </View>
  );
}