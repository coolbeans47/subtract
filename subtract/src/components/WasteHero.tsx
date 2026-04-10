// Waste Hero Component - Dashboard Header
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors, spacing, radius, typography } from '../theme/tokens';

interface Props {
  wasteTotal: number;
  unusedCount: number;
  monthlySpend: number;
}

export const WasteHero: React.FC<Props> = ({ wasteTotal, unusedCount, monthlySpend }) => {
  return (
    <View style={styles.container}>
      <View style={styles.mainMetric}>
        <Text style={styles.wasteLabel}>Potential yearly waste</Text>
        <Text style={styles.wasteAmount}>£{wasteTotal.toFixed(0)}</Text>
        <Text style={styles.wasteSubtext}>
          from {unusedCount} unused subscription{unusedCount !== 1 ? 's' : ''}
        </Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.secondaryMetrics}>
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Monthly spend</Text>
          <Text style={styles.metricValue}>£{monthlySpend.toFixed(0)}</Text>
        </View>
        <View style={styles.metricSpacer} />
        <View style={styles.metric}>
          <Text style={styles.metricLabel}>Active subs</Text>
          <Text style={styles.metricValue}>{unusedCount > 0 ? 8 - unusedCount : 8}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  mainMetric: {
    alignItems: 'center',
    paddingVertical: spacing.md,
  },
  wasteLabel: {
    ...typography.caption,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.xs,
  },
  wasteAmount: {
    fontSize: 56,
    fontWeight: '700',
    color: colors.danger,
    letterSpacing: -2,
    lineHeight: 60,
  },
  wasteSubtext: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  secondaryMetrics: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  metric: {
    alignItems: 'center',
    flex: 1,
  },
  metricSpacer: {
    width: 1,
    height: 30,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  metricLabel: {
    ...typography.small,
    color: colors.textMuted,
    marginBottom: 2,
  },
  metricValue: {
    ...typography.cardTitle,
    color: colors.textPrimary,
    fontWeight: '700',
  },
});
