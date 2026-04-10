// Bank Card Component
import React from 'react';
import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import { colors, spacing, radius, typography } from '../theme/tokens';
import { BankAccount } from '../types';

interface Props {
  bank: BankAccount;
  onDisconnect: (bankId: string) => void;
}

export const ConnectedBankCard: React.FC<Props> = ({ bank, onDisconnect }) => {
  const formatLastSync = (date?: string) => {
    if (!date) return 'Never';
    const d = new Date(date);
    const now = new Date();
    const diff = now.getTime() - d.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    if (hours < 1) return 'Just now';
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        {bank.institutionLogo ? (
          <Image source={{ uri: bank.institutionLogo }} style={styles.logo} />
        ) : (
          <View style={styles.logoFallback}>
            <Text style={styles.logoText}>{bank.institutionName.charAt(0)}</Text>
          </View>
        )}
        <View style={styles.info}>
          <Text style={styles.name}>{bank.institutionName}</Text>
          <Text style={styles.mask}>••••{bank.accountMask}</Text>
        </View>
        <View style={styles.statusBadge}>
          <View style={[styles.statusDot, bank.status === 'connected' && styles.statusConnected]} />
          <Text style={styles.statusText}>
            {bank.status === 'connected' ? 'Connected' : 'Disconnected'}
          </Text>
        </View>
      </View>
      
      <View style={styles.footer}>
        <Text style={styles.syncText}>
          Last synced: {formatLastSync(bank.lastSynced)}
        </Text>
        {bank.balance !== undefined && (
          <Text style={styles.balanceText}>
            Balance: £{bank.balance.toFixed(2)}
          </Text>
        )}
      </View>
      
      {bank.status === 'connected' && (
        <Pressable
          style={({ pressed }) => [
            styles.disconnectBtn,
            pressed && styles.disconnectBtnPressed,
          ]}
          onPress={() => onDisconnect(bank.id)}
        >
          <Text style={styles.disconnectText}>Disconnect</Text>
        </Pressable>
      )}
    </View>
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
    backgroundColor: colors.primary + '20',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoText: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.primary,
  },
  info: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  name: {
    ...typography.cardTitle,
    color: colors.textPrimary,
  },
  mask: {
    ...typography.small,
    color: colors.textSecondary,
    marginTop: 2,
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surfaceElevated,
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
    borderRadius: radius.chip,
  },
  statusDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.textMuted,
    marginRight: 6,
  },
  statusConnected: {
    backgroundColor: colors.success,
  },
  statusText: {
    ...typography.small,
    color: colors.textSecondary,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: spacing.sm,
    paddingTop: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  syncText: {
    ...typography.small,
    color: colors.textMuted,
  },
  balanceText: {
    ...typography.small,
    color: colors.textSecondary,
  },
  disconnectBtn: {
    marginTop: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: colors.danger,
    alignItems: 'center',
  },
  disconnectBtnPressed: {
    backgroundColor: colors.danger + '10',
  },
  disconnectText: {
    ...typography.bodyMedium,
    color: colors.danger,
  },
});
