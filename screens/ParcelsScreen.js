import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, TextInput, Alert
} from 'react-native';

export default function ParcelsScreen() {
  const [otp, setOtp] = useState('');

  const parcels = [
    {
      id: 1,
      courier: 'Courier Guy',
      icon: '📦',
      date: 'Today at 10:24 AM',
      collected: false,
    },
    {
      id: 2,
      courier: 'Aramex Package',
      icon: '📫',
      date: 'Yesterday at 2:15 PM',
      collected: false,
    },
    {
      id: 3,
      courier: 'Takealot Delivery',
      icon: '🛍️',
      date: '3 days ago',
      collected: true,
    },
  ];

  const uncollected = parcels.filter(p => !p.collected);
  const collected = parcels.filter(p => p.collected);

  const handleSaveOtp = () => {
    if (!otp) {
      Alert.alert('Error', 'Please enter your OTP first');
      return;
    }
    Alert.alert('OTP Saved! ✅', 'Your delivery OTP has been saved. The guard will pass it to the courier driver.');
    setOtp('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>My Parcels 📦</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{uncollected.length} waiting</Text>
        </View>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>

        <Text style={styles.sectionLabel}>AWAITING COLLECTION ({uncollected.length})</Text>

        {uncollected.map(parcel => (
          <View key={parcel.id} style={styles.parcelCard}>
            <View style={styles.parcelIcon}>
              <Text style={styles.parcelIconText}>{parcel.icon}</Text>
            </View>
            <View style={styles.parcelInfo}>
              <Text style={styles.parcelName}>{parcel.courier}</Text>
              <Text style={styles.parcelDate}>{parcel.date}</Text>
              <View style={styles.parcelBadge}>
                <Text style={styles.parcelBadgeText}>⏳ Awaiting Collection</Text>
              </View>
            </View>
          </View>
        ))}

        <View style={styles.otpCard}>
          <Text style={styles.otpTitle}>Pre-register Delivery OTP</Text>
          <Text style={styles.otpBody}>
            Got an OTP from your courier? Save it here — the guard will pass it to the driver. No phone calls needed!
          </Text>
          <View style={styles.otpRow}>
            <TextInput
              style={styles.otpInput}
              placeholder="Enter OTP"
              placeholderTextColor="#9CA3AF"
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              maxLength={8}
            />
            <TouchableOpacity style={styles.otpBtn} onPress={handleSaveOtp}>
              <Text style={styles.otpBtnText}>Save</Text>
            </TouchableOpacity>
          </View>
        </View>

        {collected.length > 0 && (
          <>
            <Text style={styles.sectionLabel}>COLLECTED</Text>
            {collected.map(parcel => (
              <View key={parcel.id} style={[styles.parcelCard, styles.parcelCardCollected]}>
                <View style={[styles.parcelIcon, styles.parcelIconCollected]}>
                  <Text style={styles.parcelIconText}>{parcel.icon}</Text>
                </View>
                <View style={styles.parcelInfo}>
                  <Text style={[styles.parcelName, styles.parcelNameCollected]}>
                    {parcel.courier}
                  </Text>
                  <Text style={styles.parcelDate}>{parcel.date}</Text>
                  <View style={[styles.parcelBadge, styles.parcelBadgeCollected]}>
                    <Text style={styles.parcelBadgeTextCollected}>✅ Collected</Text>
                  </View>
                </View>
              </View>
            ))}
          </>
        )}

        <View style={{ height: 20 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topBar: {
    backgroundColor: 'white',
    padding: 16,
    paddingBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E9F0',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  badge: {
    backgroundColor: '#FEF3C7',
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#92400E',
  },
  body: {
    flex: 1,
    padding: 14,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 0.6,
    marginBottom: 10,
    marginTop: 4,
  },
  parcelCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 13,
    borderWidth: 1.5,
    borderColor: '#E5E9F0',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 10,
  },
  parcelCardCollected: {
    opacity: 0.6,
  },
  parcelIcon: {
    width: 50,
    height: 50,
    borderRadius: 10,
    backgroundColor: '#EBF2FB',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  parcelIconCollected: {
    backgroundColor: '#F3F4F6',
  },
  parcelIconText: {
    fontSize: 24,
  },
  parcelInfo: {
    flex: 1,
  },
  parcelName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
  },
  parcelNameCollected: {
    color: '#6B7280',
  },
  parcelDate: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 2,
  },
  parcelBadge: {
    backgroundColor: '#FEF3C7',
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 2,
    alignSelf: 'flex-start',
    marginTop: 5,
  },
  parcelBadgeCollected: {
    backgroundColor: '#E6FAF3',
  },
  parcelBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#92400E',
  },
  parcelBadgeTextCollected: {
    fontSize: 9,
    fontWeight: '700',
    color: '#047857',
  },
  otpCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E5E9F0',
    marginBottom: 16,
    marginTop: 4,
  },
  otpTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 6,
  },
  otpBody: {
    fontSize: 11,
    color: '#4B5563',
    lineHeight: 16,
    marginBottom: 12,
  },
  otpRow: {
    flexDirection: 'row',
    gap: 8,
  },
  otpInput: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E5E9F0',
    borderRadius: 10,
    padding: 11,
    fontSize: 16,
    fontFamily: 'monospace',
    color: '#111827',
    letterSpacing: 4,
    textAlign: 'center',
  },
  otpBtn: {
    backgroundColor: '#1B4F8A',
    borderRadius: 10,
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  otpBtnText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 13,
  },
});