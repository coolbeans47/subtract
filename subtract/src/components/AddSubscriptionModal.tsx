// Add Subscription Modal Component
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  TextInput,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { colors, spacing, radius, typography } from '../theme/tokens';
import { BillingCycle } from '../types';

interface Props {
  visible: boolean;
  onClose: () => void;
  onAdd: (subscription: {
    merchantName: string;
    amount: number;
    billingCycle: BillingCycle;
    category: string;
  }) => void;
}

const CATEGORIES = ['Streaming', 'Music', 'Software', 'Fitness', 'Gaming', 'News & Magazines', 'Cloud Storage', 'Utilities', 'Other'];
const BILLING_CYCLES: { value: BillingCycle; label: string }[] = [
  { value: 'weekly', label: 'Weekly' },
  { value: 'biweekly', label: 'Every 2 weeks' },
  { value: 'monthly', label: 'Monthly' },
  { value: 'quarterly', label: 'Quarterly' },
  { value: 'annual', label: 'Yearly' },
];

export const AddSubscriptionModal: React.FC<Props> = ({ visible, onClose, onAdd }) => {
  const [merchantName, setMerchantName] = useState('');
  const [amount, setAmount] = useState('');
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');
  const [category, setCategory] = useState('Streaming');
  
  const handleAdd = () => {
    if (!merchantName.trim() || !amount) return;
    onAdd({
      merchantName: merchantName.trim(),
      amount: parseFloat(amount),
      billingCycle,
      category,
    });
    setMerchantName('');
    setAmount('');
    setBillingCycle('monthly');
    setCategory('Streaming');
    onClose();
  };
  
  const isValid = merchantName.trim().length > 0 && parseFloat(amount) > 0;
  
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <KeyboardAvoidingView
        style={styles.overlay}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <Pressable style={styles.backdrop} onPress={onClose} />
        <View style={styles.container}>
          <View style={styles.handle} />
          
          <View style={styles.header}>
            <Text style={styles.title}>Add Subscription</Text>
            <Pressable onPress={onClose} style={styles.closeBtn}>
              <Text style={styles.closeText}>✕</Text>
            </Pressable>
          </View>
          
          <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
            <Text style={styles.label}>Service name</Text>
            <TextInput
              style={styles.input}
              value={merchantName}
              onChangeText={setMerchantName}
              placeholder="Netflix, Spotify, etc."
              placeholderTextColor={colors.textMuted}
            />
            
            <Text style={styles.label}>Amount (£)</Text>
            <TextInput
              style={styles.input}
              value={amount}
              onChangeText={setAmount}
              placeholder="9.99"
              placeholderTextColor={colors.textMuted}
              keyboardType="decimal-pad"
            />
            
            <Text style={styles.label}>Billing cycle</Text>
            <View style={styles.chipRow}>
              {BILLING_CYCLES.map(cycle => (
                <Pressable
                  key={cycle.value}
                  style={[
                    styles.chip,
                    billingCycle === cycle.value && styles.chipSelected,
                  ]}
                  onPress={() => setBillingCycle(cycle.value)}
                >
                  <Text style={[
                    styles.chipText,
                    billingCycle === cycle.value && styles.chipTextSelected,
                  ]}>
                    {cycle.label}
                  </Text>
                </Pressable>
              ))}
            </View>
            
            <Text style={styles.label}>Category</Text>
            <View style={styles.chipRow}>
              {CATEGORIES.map(cat => (
                <Pressable
                  key={cat}
                  style={[
                    styles.chip,
                    category === cat && styles.chipSelected,
                  ]}
                  onPress={() => setCategory(cat)}
                >
                  <Text style={[
                    styles.chipText,
                    category === cat && styles.chipTextSelected,
                  ]}>
                    {cat}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
          
          <View style={styles.footer}>
            <Pressable
              style={[
                styles.addButton,
                !isValid && styles.addButtonDisabled,
              ]}
              onPress={handleAdd}
              disabled={!isValid}
            >
              <Text style={styles.addButtonText}>Add Subscription</Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  container: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: radius.card * 2,
    borderTopRightRadius: radius.card * 2,
    maxHeight: '85%',
  },
  handle: {
    width: 36,
    height: 4,
    backgroundColor: colors.border,
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: spacing.sm,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  title: {
    ...typography.sectionHeader,
    color: colors.textPrimary,
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceElevated,
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeText: {
    fontSize: 16,
    color: colors.textSecondary,
  },
  content: {
    padding: spacing.md,
  },
  label: {
    ...typography.caption,
    color: colors.textSecondary,
    marginBottom: spacing.xs,
    marginTop: spacing.md,
  },
  input: {
    backgroundColor: colors.background,
    borderRadius: radius.input,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    ...typography.body,
    color: colors.textPrimary,
  },
  chipRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.xs,
  },
  chip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radius.chip,
    backgroundColor: colors.background,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: colors.primary + '20',
    borderColor: colors.primary,
  },
  chipText: {
    ...typography.small,
    color: colors.textSecondary,
  },
  chipTextSelected: {
    color: colors.primary,
    fontWeight: '600',
  },
  footer: {
    padding: spacing.md,
    paddingBottom: spacing.xl,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  addButton: {
    backgroundColor: colors.primary,
    borderRadius: radius.button,
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  addButtonDisabled: {
    opacity: 0.5,
  },
  addButtonText: {
    ...typography.bodyMedium,
    color: '#FFFFFF',
    fontWeight: '600',
  },
});
