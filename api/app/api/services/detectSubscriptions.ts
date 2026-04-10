// Recurring Charge Detection Service
// Mock implementation for Phase 1 MVP
// In production: Would use pattern matching, ML, and Finexer API

interface Transaction {
  id: string;
  merchant: string;
  amount: number;
  date: string;
  category?: string;
}

interface DetectedSubscription {
  merchantName: string;
  amount: number;
  billingCycle: 'weekly' | 'biweekly' | 'monthly' | 'quarterly' | 'annual';
  confidence: number;
  transactions: Transaction[];
}

export function detectRecurringCharges(
  transactions: Transaction[],
  confidenceThreshold = 80
): DetectedSubscription[] {
  // Group transactions by merchant
  const merchantGroups: Record<string, Transaction[]> = {};
  
  transactions.forEach(txn => {
    const key = txn.merchant.toLowerCase();
    if (!merchantGroups[key]) {
      merchantGroups[key] = [];
    }
    merchantGroups[key].push(txn);
  });
  
  const detected: DetectedSubscription[] = [];
  
  // Analyze each merchant's transactions for recurring patterns
  Object.entries(merchantGroups).forEach(([merchant, txns]) => {
    if (txns.length < 2) return; // Need at least 2 transactions to detect pattern
    
    // Sort by date
    const sorted = txns.sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    // Calculate intervals between transactions
    const intervals: number[] = [];
    for (let i = 1; i < sorted.length; i++) {
      const diff = new Date(sorted[i].date).getTime() - new Date(sorted[i-1].date).getTime();
      const days = diff / (1000 * 60 * 60 * 24);
      intervals.push(days);
    }
    
    // Check if intervals are consistent (within 20% variance)
    const avgInterval = intervals.reduce((a, b) => a + b, 0) / intervals.length;
    const variance = intervals.reduce((sum, interval) => 
      sum + Math.abs(interval - avgInterval), 0
    ) / intervals.length;
    
    const isConsistent = variance / avgInterval < 0.2;
    
    if (!isConsistent) return;
    
    // Determine billing cycle based on average interval
    let billingCycle: DetectedSubscription['billingCycle'];
    let confidence = 80; // Base confidence
    
    if (avgInterval >= 6 && avgInterval <= 8) {
      billingCycle = 'weekly';
      confidence += 10;
    } else if (avgInterval >= 12 && avgInterval <= 18) {
      billingCycle = 'biweekly';
      confidence += 10;
    } else if (avgInterval >= 26 && avgInterval <= 35) {
      billingCycle = 'monthly';
      confidence += 15;
    } else if (avgInterval >= 80 && avgInterval <= 100) {
      billingCycle = 'quarterly';
      confidence += 5;
    } else if (avgInterval >= 350 && avgInterval <= 380) {
      billingCycle = 'annual';
      confidence += 5;
    } else {
      // Irregular but might still be subscription
      confidence -= 20;
      if (confidence < confidenceThreshold) return;
    }
    
    // Check if amounts are consistent
    const amounts = txns.map(t => Math.abs(t.amount));
    const avgAmount = amounts.reduce((a, b) => a + b, 0) / amounts.length;
    const amountVariance = amounts.some(a => Math.abs(a - avgAmount) / avgAmount > 0.05);
    
    if (amountVariance) {
      confidence -= 10;
    }
    
    // Only include if confidence meets threshold
    if (confidence >= confidenceThreshold) {
      detected.push({
        merchantName: txns[0].merchant,
        amount: avgAmount,
        billingCycle,
        confidence,
        transactions: txns,
      });
    }
  });
  
  // Sort by confidence
  return detected.sort((a, b) => b.confidence - a.confidence);
}

// Mock version for immediate Phase 1 demo
export function getMockDetectedSubscriptions(): DetectedSubscription[] {
  return [
    {
      merchantName: 'NETFLIX',
      amount: 15.99,
      billingCycle: 'monthly',
      confidence: 95,
      transactions: [],
    },
    {
      merchantName: 'SPOTIFY',
      amount: 10.99,
      billingCycle: 'monthly',
      confidence: 92,
      transactions: [],
    },
    {
      merchantName: 'PUREGYM',
      amount: 24.99,
      billingCycle: 'monthly',
      confidence: 85,
      transactions: [],
    },
    {
      merchantName: 'DISNEY+',
      amount: 7.99,
      billingCycle: 'monthly',
      confidence: 91,
      transactions: [],
    },
  ];
}
