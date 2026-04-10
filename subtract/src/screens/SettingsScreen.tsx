// Settings Screen - User preferences and account management
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
  Switch,
  Alert,
} from 'react-native';
import { colors, spacing, radius, typography } from '../theme/tokens';
import { useSubtractStore } from '../store/useSubtractStore';

interface Props {
  navigation: any;
}

export const SettingsScreen: React.FC<Props> = ({ navigation }) => {
  const {
    user,
    logout,
    updateNotificationPreferences,
  } = useSubtractStore();
  
  const prefs = user?.notificationPreferences;
  
  const handleToggle = (key: keyof typeof prefs, value: boolean) => {
    updateNotificationPreferences({ [key]: value });
  };
  
  const handleLogout = () => {
    Alert.alert(
      'Sign Out',
      'Are you sure you want to sign out? You can reconnect your banks anytime.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign Out', style: 'destructive', onPress: logout },
      ]
    );
  };
  
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headline}>Settings</Text>
      </View>
      
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Account Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account</Text>
          <View style={styles.card}>
            <View style={styles.row}>
              <Text style={styles.rowLabel}>Email</Text>
              <Text style={styles.rowValue}>{user?.email || 'demo@subtract.app'}</Text>
            </View>
            <View style={[styles.row, styles.rowLast]}>
              <Text style={styles.rowLabel}>Member since</Text>
              <Text style={styles.rowValue}>
                {user?.createdAt ? new Date(user.createdAt).toLocaleDateString('en-GB', {
                  month: 'long',
                  year: 'numeric',
                }) : 'March 2026'}
              </Text>
            </View>
          </View>
        </View>
        
        {/* Notifications Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          <View style={styles.card}>
            <View style={styles.switchRow}>
              <View style={styles.switchContent}>
                <Text style={styles.switchLabel}>New subscription alerts</Text>
                <Text style={styles.switchDescription}>
                  Get notified when we detect a new subscription
                </Text>
              </View>
              <Switch
                value={prefs?.newSubscriptionAlert ?? true}
                onValueChange={(v) => handleToggle('newSubscriptionAlert', v)}
                trackColor={{ false: colors.border, true: colors.primary + '60' }}
                thumbColor={prefs?.newSubscriptionAlert ? colors.primary : colors.textMuted}
              />
            </View>
            <View style={[styles.row, styles.rowLast]}>
              <View style={styles.switchContent}>
                <Text style={styles.switchLabel}>Weekly digest</Text>
                <Text style={styles.switchDescription}>
                  Summary of your subscription activity
                </Text>
              </View>
              <Switch
                value={prefs?.weeklyDigest ?? false}
                onValueChange={(v) => handleToggle('weeklyDigest', v)}
                trackColor={{ false: colors.border, true: colors.primary + '60' }}
                thumbColor={prefs?.weeklyDigest ? colors.primary : colors.textMuted}
              />
            </View>
          </View>
        </View>
        
        {/* Security Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          <View style={styles.card}>
            <Pressable style={styles.row}>
              <Text style={styles.rowLabel}>Privacy Policy</Text>
              <Text style={styles.rowAction}>View →</Text>
            </Pressable>
            <Pressable style={styles.row}>
              <Text style={styles.rowLabel}>Terms of Service</Text>
              <Text style={styles.rowAction}>View →</Text>
            </Pressable>
            <Pressable style={[styles.row, styles.rowLast]}>
              <Text style={styles.rowLabel}>Open Banking Permissions</Text>
              <Text style={styles.rowAction}>Manage →</Text>
            </Pressable>
          </View>
        </View>
        
        {/* Data Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Data</Text>
          <View style={styles.card}>
            <Pressable style={styles.row}>
              <Text style={styles.rowLabel}>Export my data</Text>
              <Text style={styles.rowAction}>Download →</Text>
            </Pressable>
            <Pressable style={[styles.row, styles.rowLast]}>
              <Text style={[styles.rowLabel, { color: colors.danger }]}>Delete all data</Text>
              <Text style={[styles.rowAction, { color: colors.danger }]}>Request →</Text>
            </Pressable>
          </View>
        </View>
        
        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appName}>Subtract</Text>
          <Text style={styles.appVersion}>Version 1.0.0 (Phase 1 MVP)</Text>
          <Text style={styles.disclaimer}>
            Subtract uses TrueLayer for Open Banking access. We are not authorised by the FCA and this app is for demonstration purposes only.
          </Text>
        </View>
        
        {/* Sign Out */}
        <Pressable
          style={({ pressed }) => [
            styles.signOutBtn,
            pressed && styles.signOutBtnPressed,
          ]}
          onPress={handleLogout}
        >
          <Text style={styles.signOutText}>Sign Out</Text>
        </Pressable>
        
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
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
  },
  section: {
    marginBottom: spacing.lg,
  },
  sectionTitle: {
    ...typography.caption,
    color: colors.textSecondary,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: spacing.sm,
    marginLeft: spacing.xs,
  },
  card: {
    backgroundColor: colors.surface,
    borderRadius: radius.card,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  rowLast: {
    borderBottomWidth: 0,
  },
  rowLabel: {
    ...typography.body,
    color: colors.textPrimary,
  },
  rowValue: {
    ...typography.body,
    color: colors.textSecondary,
  },
  rowAction: {
    ...typography.bodyMedium,
    color: colors.primary,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  switchContent: {
    flex: 1,
    marginRight: spacing.md,
  },
  switchLabel: {
    ...typography.body,
    color: colors.textPrimary,
  },
  switchDescription: {
    ...typography.small,
    color: colors.textSecondary,
    marginTop: 2,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  appName: {
    ...typography.sectionHeader,
    color: colors.textPrimary,
    fontWeight: '700',
  },
  appVersion: {
    ...typography.small,
    color: colors.textMuted,
    marginTop: spacing.xs,
  },
  disclaimer: {
    ...typography.small,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.md,
    paddingHorizontal: spacing.lg,
    lineHeight: 18,
  },
  signOutBtn: {
    backgroundColor: colors.surface,
    borderRadius: radius.button,
    borderWidth: 1,
    borderColor: colors.danger,
    paddingVertical: spacing.md,
    alignItems: 'center',
    marginTop: spacing.md,
  },
  signOutBtnPressed: {
    backgroundColor: colors.danger + '10',
  },
  signOutText: {
    ...typography.bodyMedium,
    color: colors.danger,
  },
});
