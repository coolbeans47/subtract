// Skeleton Subscription Card for Loading States
import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { colors, spacing, radius } from '../theme/tokens';

interface Props {
  count?: number;
}

export const SkeletonSubscriptionCard: React.FC<Props> = ({ count = 3 }) => {
  const shimmerAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    );
    animation.start();
    return () => animation.stop();
  }, []);
  
  const opacity = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.3, 0.7],
  });
  
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <Animated.View key={index} style={[styles.container, { opacity }]}>
          <View style={styles.row}>
            <View style={styles.logoSkeleton} />
            <View style={styles.infoSkeleton}>
              <View style={styles.nameSkeleton} />
              <View style={styles.categorySkeleton} />
            </View>
            <View style={styles.amountSkeleton} />
          </View>
        </Animated.View>
      ))}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoSkeleton: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.border,
  },
  infoSkeleton: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  nameSkeleton: {
    width: '60%',
    height: 16,
    borderRadius: 4,
    backgroundColor: colors.border,
    marginBottom: 6,
  },
  categorySkeleton: {
    width: '40%',
    height: 12,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  amountSkeleton: {
    width: 60,
    height: 20,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
});
