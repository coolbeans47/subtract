// SubscriptionCard Component
import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { colors, spacing, radius, typography, categoryColors } from '../theme/tokens';
import { Subscription, BillingCycle } from '../types';

interface Props {
  subscription: Subscription;
  onUsedRecently: (id: string, used: boolean) => void;
  onPress?: (subscription: Subscription) => void;
}

const getBillingCycleLabel = (cycle: BillingCycle): string => {
  switch (cycle) {
    case 'weekly': return '/week';
    case 'biweekly': return '/2 weeks';
    case 'monthly': return '/month';
    case 'quarterly': return '/quarter';
    case 'annual': return '/year';
    default: return '/month';
  }
};

const getCategoryColor = (category: string): string => {
  return categoryColors[category] || colors.textSecondary;
};

export const SubscriptionCard: React.FC<Props> = ({ subscription, onUsedRecently, onPress }) => {
  const categoryColor = getCategoryColor(subscription.category);
  
  return (
    <Pressable
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
      onPress={() => onPress?.(subscription)}
    >
      <View style={styles.header}>
        <View style={styles.merchantRow}>
          {subscription.merchantLogo ? (
            <Image
              source={{ uri: subscription.merchantLogo }}
              style={styles.logo}
            />
          ) : (
            <View style={[styles.logoFallback, { backgroundColor: categoryColor + '30' }]}>
              <Text style={[styles.logoFallbackText, { color: categoryColor }]}>
                {subscription.merchantName.charAt(0)}
              </Text>
            </View>
          )}
          <View style={styles.merchantInfo}>
            <Text style={styles.merchantName} numberOfLines={1}>{subscription.merchantName}</Text>
            <View style={styles.categoryRow}>
              <View style={[styles.categoryDot, { backgroundColor: categoryColor }]} />
              <Text style={styles.category}>{subscription.category}</Text>
            </View>
          </View>
        </View>
        <View style={styles.amountContainer}>
          <Text style={styles.amount}>£{subscription.amount.toFixed(2)}</Text>
          <Text style={styles.cycle}>{getBillingCycleLabel(subscription.billingCycle)}</Text>
        </View>
      </View>
      
      {/* Used Recently Question */}
      {subscription.usedRecently === null && subscription.source === 'auto-detected' && (
        <View style={styles.questionContainer}>
          <Text style={styles.questionText}>Used recently?</Text>
          <View style={styles.buttonRow}>
            <Pressable
              style={({ pressed }) => [
                styles.questionBtn,
                styles.questionBtnYes,
                pressed && styles.questionBtnPressed,
              ]}
              onPress={() => onUsedRecently(subscription.id, true)}
            >
              <Text style={styles.questionBtnTextYes}>Yes</Text>
            </Pressable>
            <Pressable
              style={({ pressed }) => [
                styles.questionBtn,
                styles.questionBtnNo,
                pressed && styles.questionBtnPressed,
              ]}
              onPress={() => onUsedRecently(subscription.id, false)}
            >
              <Text style={styles.questionBtnTextNo}>No</Text>
            </Pressable>
          </View>
        </View>
      )}
      
      {/* Used indicator */}
      {subscription.usedRecently !== null && (
        <View style={styles.statusRow}>
          <View style={[
            styles.statusBadge,
            subscription.usedRecently ? styles.statusActive : styles.statusUnused
          ]}>
            <Text style={[
              styles.statusText,
              subscription.usedRecently ? styles.statusTextActive : styles.statusTextUnused
            ]}>
              {subscription.usedRecently ? '✓ In use' : '✗ Not used'}
            </Text>
          </View>
          {subscription.source === 'manual' && (
            <Text style={styles.sourceLabel}>Manual</Text>
          )}
        </View>
      )}
    </Pressable>
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
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  merchantRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  logo: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: colors.surfaceElevated,
  },
  logoFallback: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoFallbackText: {
    fontSize: 18,
    fontWeight: '700',
  },
  merchantInfo: {
    marginLeft: spacing.sm,
    flex: 1,
  },
  merchantName: {
    ...typography.cardTitle,
    color: colors.textPrimary,
    marginBottom: 2,
  },
  categoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  categoryDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    marginRight: 6,
  },
  category: {
    ...typography.small,
    color: colors.textSecondary,
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    ...typography.cardTitle,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  cycle: {
    ...typography.small,
    color: colors.textSecondary,
  },
  questionContainer: {
    marginTop: spacing.md,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  questionText: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.sm,
    textAlign: 'center',
  },
  buttonRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  questionBtn: {
    flex: 1,
    paddingVertical: spacing.sm,
    borderRadius: radius.button,
    alignItems: 'center',
  },
  questionBtnYes: {
    backgroundColor: colors.primary + '20',
    borderWidth: 1,
    borderColor: colors.primary,
  },
  questionBtnNo: {
    backgroundColor: colors.danger + '20',
    borderWidth: 1,
    borderColor: colors.danger,
  },
  questionBtnPressed: {
    opacity: 0.7,
  },
  questionBtnTextYes: {
    ...typography.bodyMedium,
    color: colors.primary,
  },
  questionBtnTextNo: {
    ...typography.bodyMedium,
    color: colors.danger,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  statusBadge: {
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.chip,
  },
  statusActive: {
    backgroundColor: colors.primary + '20',
  },
  statusUnused: {
    backgroundColor: colors.danger + '20',
  },
  statusText: {
    ...typography.small,
    fontWeight: '600',
  },
  statusTextActive: {
    color: colors.primary,
  },
  statusTextUnused: {
    color: colors.danger,
  },
  sourceLabel: {
    ...typography.small,
    color: colors.textMuted,
    fontStyle: 'italic',
  },
});
