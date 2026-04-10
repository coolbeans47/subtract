// Alerts Screen - View and manage notifications
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { colors, spacing, typography } from '../theme/tokens';
import { useSubtractStore } from '../store/useSubtractStore';
import { AlertCard, EmptyState } from '../components';
import { Alert } from '../types';

interface Props {
  navigation: any;
}

export const AlertsScreen: React.FC<Props> = ({ navigation }) => {
  const { alerts, markAlertRead, dismissAlert } = useSubtractStore();
  
  const handleAlertPress = (alert: Alert) => {
    markAlertRead(alert.id);
    // Could navigate to relevant subscription in future
  };
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headline}>Alerts</Text>
        <Text style={styles.subtitle}>
          Stay informed about your subscriptions
        </Text>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {alerts.length === 0 ? (
          <EmptyState
            title="All caught up"
            message="You'll be notified when we detect new subscriptions or notice anything unusual."
            icon="✅"
          />
        ) : (
          <>
            {/* Unread Section */}
            {alerts.filter(a => !a.read).length > 0 && (
              <>
                <Text style={styles.sectionTitle}>New</Text>
                {alerts
                  .filter(a => !a.read)
                  .map(alert => (
                    <AlertCard
                      key={alert.id}
                      alert={alert}
                      onPress={handleAlertPress}
                      onDismiss={dismissAlert}
                    />
                  ))}
              </>
            )}
            
            {/* Read Section */}
            {alerts.filter(a => a.read).length > 0 && (
              <>
                <Text style={[styles.sectionTitle, { marginTop: spacing.lg }]}>Earlier</Text>
                {alerts
                  .filter(a => a.read)
                  .map(alert => (
                    <AlertCard
                      key={alert.id}
                      alert={alert}
                      onPress={handleAlertPress}
                      onDismiss={dismissAlert}
                    />
                  ))}
              </>
            )}
          </>
        )}
        
        <View style={{ height: 100 }} />
      </ScrollView>
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
  sectionTitle: {
    ...typography.caption,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
  },
});
