// Alert Card Component
import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { colors, spacing, radius, typography } from '../theme/tokens';
import { Alert } from '../types';

interface Props {
  alert: Alert;
  onPress: (alert: Alert) => void;
  onDismiss: (alertId: string) => void;
}

const getAlertIcon = (type: Alert['type']): string => {
  switch (type) {
    case 'new_subscription': return '🔔';
    case 'price_increase': return '📈';
    case 'trial_ending': return '⏰';
    default: return '💡';
  }
};

const getAlertColor = (type: Alert['type']): string => {
  switch (type) {
    case 'new_subscription': return colors.primary;
    case 'price_increase': return colors.warning;
    case 'trial_ending': return colors.accent;
    default: return colors.textSecondary;
  }
};

export const AlertCard: React.FC<Props> = ({ alert, onPress, onDismiss }) => {
  const icon = getAlertIcon(alert.type);
  const color = getAlertColor(alert.type);
  
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        !alert.read && styles.containerUnread,
        pressed && styles.pressed,
      ]}
      onPress={() => onPress(alert)}
    >
      {!alert.read && <View style={[styles.unreadDot, { backgroundColor: color }]} />}
      <View style={[styles.iconContainer, { backgroundColor: color + '20' }]}>
        <Text style={styles.icon}>{icon}</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{alert.title}</Text>
        <Text style={styles.message} numberOfLines={2}>{alert.message}</Text>
      </View>
      <Pressable
        style={styles.dismissBtn}
        onPress={() => onDismiss(alert.id)}
        hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
      >
        <Text style={styles.dismissText}>✕</Text>
      </Pressable>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  containerUnread: {
    borderColor: colors.primary + '40',
    backgroundColor: colors.primary + '08',
  },
  pressed: {
    opacity: 0.8,
  },
  unreadDot: {
    position: 'absolute',
    top: spacing.md,
    left: spacing.md,
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.lg,
  },
  icon: {
    fontSize: 18,
  },
  content: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  title: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  message: {
    ...typography.small,
    color: colors.textSecondary,
    lineHeight: 18,
  },
  dismissBtn: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: spacing.sm,
  },
  dismissText: {
    fontSize: 12,
    color: colors.textMuted,
  },
});
