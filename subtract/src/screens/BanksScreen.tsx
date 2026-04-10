// Banks Screen - Manage Connected Bank Accounts
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
} from 'react-native';
import { colors, spacing, typography } from '../theme/tokens';
import { useSubtractStore } from '../store/useSubtractStore';
import { ConnectedBankCard, BankSelector, EmptyState } from '../components';

interface Props {
  navigation: any;
}

export const BanksScreen: React.FC<Props> = ({ navigation }) => {
  const {
    connectedBanks,
    isConnectingBank,
    connectBank,
    disconnectBank,
    loadSubscriptions,
    isRefreshing,
    refreshSubscriptions,
  } = useSubtractStore();
  
  const [showBankSelector, setShowBankSelector] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  
  const activeBanks = connectedBanks.filter(b => b.status === 'connected');
  
  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshSubscriptions();
    setRefreshing(false);
  };
  
  const handleConnectBank = async (bankId: string) => {
    await connectBank(bankId);
    setShowBankSelector(false);
    // Reload subscriptions after connecting a new bank
    await loadSubscriptions();
  };
  
  const handleDisconnectBank = async (bankId: string) => {
    await disconnectBank(bankId);
  };
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headline}>Connected Banks</Text>
        <Text style={styles.subtitle}>
          Securely access your transactions via Open Banking
        </Text>
      </View>
      
      {!showBankSelector ? (
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={colors.primary}
              colors={[colors.primary]}
            />
          }
          showsVerticalScrollIndicator={false}
        >
          {/* Trust Indicators */}
          <View style={styles.trustSection}>
            <View style={styles.trustItem}>
              <Text style={styles.trustIcon}>🔐</Text>
              <View style={styles.trustContent}>
                <Text style={styles.trustTitle}>256-bit Encryption</Text>
                <Text style={styles.trustText}>Your data is protected</Text>
              </View>
            </View>
            <View style={styles.trustItem}>
              <Text style={styles.trustIcon}>📖</Text>
              <View style={styles.trustContent}>
                <Text style={styles.trustTitle}>Read-Only Access</Text>
                <Text style={styles.trustText}>We never move your money</Text>
              </View>
            </View>
            <View style={styles.trustItem}>
              <Text style={styles.trustIcon}>🗑️</Text>
              <View style={styles.trustContent}>
                <Text style={styles.trustTitle}>GDPR Compliant</Text>
                <Text style={styles.trustText}>Delete your data anytime</Text>
              </View>
            </View>
          </View>
          
          {/* Connected Banks */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>
              Your Accounts ({activeBanks.length})
            </Text>
          </View>
          
          {activeBanks.length === 0 ? (
            <EmptyState
              title="No banks connected"
              message="Connect your bank account to automatically detect subscriptions and track your spending."
              actionLabel="Connect a Bank"
              onAction={() => setShowBankSelector(true)}
              icon="🏦"
            />
          ) : (
            activeBanks.map(bank => (
              <ConnectedBankCard
                key={bank.id}
                bank={bank}
                onDisconnect={handleDisconnectBank}
              />
            ))
          )}
          
          {/* Add Bank Button */}
          <View style={styles.addBankSection}>
            <Text style={styles.addBankTitle}>Add another account</Text>
            <View style={styles.bankQuickAdd}>
              {['monzo', 'starling', 'revolut'].slice(0, 3 - activeBanks.length).map(bankId => (
                <View key={bankId} style={styles.quickBankBtn}>
                  <Text style={styles.quickBankText}>
                    {bankId.charAt(0).toUpperCase() + bankId.slice(1)}
                  </Text>
                </View>
              ))}
            </View>
            <Text
              style={styles.connectMoreText}
              onPress={() => setShowBankSelector(true)}
            >
              + Connect another bank
            </Text>
          </View>
          
          <View style={{ height: 100 }} />
        </ScrollView>
      ) : (
        <BankSelector
          onSelectBank={handleConnectBank}
          isConnecting={isConnectingBank}
          connectedBankIds={connectedBanks.map(b => b.id)}
        />
      )}
      
      {/* Back/Close Button */}
      {showBankSelector && (
        <View style={styles.backSection}>
          <Text
            style={styles.backText}
            onPress={() => setShowBankSelector(false)}
          >
            ← Back to accounts
          </Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  headline: {
    ...typography.screenHeadline,
    color: colors.textPrimary,
  },
  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
  },
  trustSection: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginBottom: spacing.lg,
  },
  trustItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
  },
  trustIcon: {
    fontSize: 24,
    marginRight: spacing.md,
  },
  trustContent: {
    flex: 1,
  },
  trustTitle: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  trustText: {
    ...typography.small,
    color: colors.textSecondary,
    marginTop: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  sectionTitle: {
    ...typography.sectionHeader,
    color: colors.textPrimary,
  },
  addBankSection: {
    marginTop: spacing.xl,
    alignItems: 'center',
  },
  addBankTitle: {
    ...typography.bodyMedium,
    color: colors.textSecondary,
    marginBottom: spacing.md,
  },
  bankQuickAdd: {
    flexDirection: 'row',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  quickBankBtn: {
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  quickBankText: {
    ...typography.bodyMedium,
    color: colors.textPrimary,
  },
  connectMoreText: {
    ...typography.bodyMedium,
    color: colors.primary,
    fontWeight: '600',
  },
  backSection: {
    padding: spacing.md,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  backText: {
    ...typography.bodyMedium,
    color: colors.primary,
    textAlign: 'center',
  },
});
