// Bank Selector Component for connecting new banks
import React from 'react';
import { View, Text, StyleSheet, Pressable, Image, ScrollView, ActivityIndicator } from 'react-native';
import { colors, spacing, radius, typography } from '../theme/tokens';
import { AVAILABLE_BANKS } from '../data/mockBanks';

interface Props {
  onSelectBank: (bankId: string) => void;
  isConnecting: boolean;
  connectedBankIds: string[];
}

export const BankSelector: React.FC<Props> = ({ onSelectBank, isConnecting, connectedBankIds }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select your bank</Text>
      <Text style={styles.subtitle}>
        We use Open Banking to securely read your transactions. We never make payments.
      </Text>
      
      <View style={styles.securityBadge}>
        <Text style={styles.securityIcon}>🔒</Text>
        <Text style={styles.securityText}>Read-only access • FCA compliant • Your data is encrypted</Text>
      </View>
      
      <ScrollView style={styles.bankList} showsVerticalScrollIndicator={false}>
        {AVAILABLE_BANKS.map(bank => {
          const isConnected = connectedBankIds.some(id => id.includes(bank.id));
          return (
            <Pressable
              key={bank.id}
              style={({ pressed }) => [
                styles.bankItem,
                isConnected && styles.bankItemConnected,
                pressed && !isConnected && styles.bankItemPressed,
              ]}
              onPress={() => !isConnected && !isConnecting && onSelectBank(bank.id)}
              disabled={isConnected || isConnecting}
            >
              <View style={[styles.bankLogo, { backgroundColor: bank.color + '20' }]}>
                {bank.logo ? (
                  <Image source={{ uri: bank.logo }} style={styles.logoImage} />
                ) : (
                  <Text style={styles.logoText}>{bank.name.charAt(0)}</Text>
                )}
              </View>
              <Text style={[
                styles.bankName,
                isConnected && styles.bankNameConnected,
              ]}>
                {bank.name}
              </Text>
              {isConnected && (
                <View style={styles.connectedBadge}>
                  <Text style={styles.connectedText}>Connected</Text>
                </View>
              )}
              {isConnecting && (
                <ActivityIndicator size="small" color={colors.primary} style={styles.loader} />
              )}
            </Pressable>
          );
        })}
      </ScrollView>
      
      <View style={styles.disclaimer}>
        <Text style={styles.disclaimerText}>
          Subtract is not a bank and is not authorised by the FCA under Part 4A of the Financial Services and Markets Act 2000. We use TrueLayer to access Open Banking data on your behalf.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.md,
  },
  title: {
    ...typography.screenHeadline,
    color: colors.textPrimary,
    marginBottom: spacing.xs,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
    lineHeight: 22,
  },
  securityBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.primary + '15',
    borderRadius: radius.button,
    padding: spacing.md,
    marginBottom: spacing.lg,
    borderWidth: 1,
    borderColor: colors.primary + '30',
  },
  securityIcon: {
    fontSize: 20,
    marginRight: spacing.sm,
  },
  securityText: {
    ...typography.caption,
    color: colors.primary,
    flex: 1,
  },
  bankList: {
    flex: 1,
  },
  bankItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  bankItemConnected: {
    opacity: 0.6,
  },
  bankItemPressed: {
    borderColor: colors.primary,
    backgroundColor: colors.primary + '10',
  },
  bankLogo: {
    width: 44,
    height: 44,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: spacing.md,
  },
  logoImage: {
    width: 28,
    height: 28,
    borderRadius: 6,
  },
  logoText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  bankName: {
    ...typography.cardTitle,
    color: colors.textPrimary,
    flex: 1,
  },
  bankNameConnected: {
    color: colors.textMuted,
  },
  connectedBadge: {
    backgroundColor: colors.surfaceElevated,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.chip,
  },
  connectedText: {
    ...typography.small,
    color: colors.textSecondary,
  },
  loader: {
    marginLeft: spacing.sm,
  },
  disclaimer: {
    marginTop: spacing.lg,
    paddingTop: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  disclaimerText: {
    ...typography.small,
    color: colors.textMuted,
    lineHeight: 18,
  },
});
