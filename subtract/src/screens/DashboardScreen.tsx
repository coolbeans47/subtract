// Dashboard Screen - Main Subscription View
import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  RefreshControl,
  Pressable,
  Alert,
} from 'react-native';
import { colors, spacing, typography } from '../theme/tokens';
import { useSubtractStore } from '../store/useSubtractStore';
import {
  SubscriptionCard,
  SkeletonSubscriptionCard,
  WasteHero,
  EmptyState,
  AddSubscriptionModal,
} from '../components';
import { Subscription, BillingCycle } from '../types';

interface Props {
  navigation: any;
}

export const DashboardScreen: React.FC<Props> = ({ navigation }) => {
  const {
    subscriptions,
    isLoadingSubscriptions,
    isRefreshing,
    loadSubscriptions,
    refreshSubscriptions,
    updateUsedRecently,
    addManualSubscription,
    getWasteTotal,
    getUnusedSubscriptions,
    getMonthlySpend,
  } = useSubtractStore();
  
  const [showAddModal, setShowAddModal] = useState(false);
  
  useEffect(() => {
    loadSubscriptions();
  }, []);
  
  const handleAddSubscription = (data: {
    merchantName: string;
    amount: number;
    billingCycle: BillingCycle;
    category: string;
  }) => {
    addManualSubscription({
      merchantName: data.merchantName,
      amount: data.amount,
      billingCycle: data.billingCycle,
      category: data.category,
      firstChargeDate: new Date().toISOString(),
      status: 'active',
      usedRecently: true,
      source: 'manual',
      confidence: 100,
    });
  };
  
  const unusedCount = getUnusedSubscriptions().length;
  const monthlySpend = getMonthlySpend();
  const wasteTotal = getWasteTotal();
  const activeSubscriptions = subscriptions.filter(sub => sub.status === 'active');
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back</Text>
          <Text style={styles.headline}>Your Subscriptions</Text>
        </View>
        <Pressable
          style={styles.alertBtn}
          onPress={() => navigation.navigate('Alerts')}
        >
          <Text style={styles.alertIcon}>🔔</Text>
        </Pressable>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl
            refreshing={isRefreshing}
            onRefresh={refreshSubscriptions}
            tintColor={colors.primary}
            colors={[colors.primary]}
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Waste Hero */}
        {isLoadingSubscriptions ? (
          <View style={styles.heroSkeleton}>
            <View style={styles.heroSkeletonBox} />
          </View>
        ) : (
          <WasteHero
            wasteTotal={wasteTotal}
            unusedCount={unusedCount}
            monthlySpend={monthlySpend}
          />
        )}
        
        {/* Section Header */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Active ({activeSubscriptions.length})
          </Text>
          <Pressable onPress={() => setShowAddModal(true)}>
            <Text style={styles.addText}>+ Add</Text>
          </Pressable>
        </View>
        
        {/* Subscription List */}
        {isLoadingSubscriptions ? (
          <SkeletonSubscriptionCard count={4} />
        ) : activeSubscriptions.length === 0 ? (
          <EmptyState
            title="No subscriptions yet"
            message="Connect a bank account to automatically detect your subscriptions, or add them manually."
            actionLabel="Connect Bank"
            onAction={() => navigation.navigate('Banks')}
            icon="💳"
          />
        ) : (
          activeSubscriptions.map(subscription => (
            <SubscriptionCard
              key={subscription.id}
              subscription={subscription}
              onUsedRecently={updateUsedRecently}
              onPress={(sub) => {
                // Could navigate to detail view in future
              }}
            />
          ))
        )}
        
        {/* Cancelled Section */}
        {subscriptions.filter(s => s.status === 'cancelled').length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                Cancelled ({subscriptions.filter(s => s.status === 'cancelled').length})
              </Text>
            </View>
            {subscriptions
              .filter(s => s.status === 'cancelled')
              .map(subscription => (
                <SubscriptionCard
                  key={subscription.id}
                  subscription={subscription}
                  onUsedRecently={updateUsedRecently}
                />
              ))}
          </>
        )}
        
        <View style={{ height: 100 }} />
      </ScrollView>
      
      {/* FAB */}
      <Pressable
        style={({ pressed }) => [
          styles.fab,
          pressed && styles.fabPressed,
        ]}
        onPress={() => setShowAddModal(true)}
      >
        <Text style={styles.fabText}>+</Text>
      </Pressable>
      
      {/* Add Modal */}
      <AddSubscriptionModal
        visible={showAddModal}
        onClose={() => setShowAddModal(false)}
        onAdd={handleAddSubscription}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
  },
  greeting: {
    ...typography.caption,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  headline: {
    ...typography.screenHeadline,
    color: colors.textPrimary,
    marginTop: 2,
  },
  alertBtn: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  alertIcon: {
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
  },
  heroSkeleton: {
    marginBottom: spacing.lg,
  },
  heroSkeletonBox: {
    height: 180,
    backgroundColor: colors.surface,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    marginTop: spacing.md,
  },
  sectionTitle: {
    ...typography.sectionHeader,
    color: colors.textPrimary,
  },
  addText: {
    ...typography.bodyMedium,
    color: colors.primary,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    bottom: spacing.xl,
    right: spacing.md,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 8,
  },
  fabPressed: {
    opacity: 0.8,
    transform: [{ scale: 0.95 }],
  },
  fabText: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: '400',
    lineHeight: 32,
  },
});
