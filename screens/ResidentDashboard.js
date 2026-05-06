import React from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView
} from 'react-native';

export default function ResidentDashboard() {
  const quickActions = [
    { icon: '🎫', label: 'Visitor Code' },
    { icon: '⭐', label: 'VIP List' },
    { icon: '📦', label: 'My Parcels' },
    { icon: '📢', label: 'Notices' },
    { icon: '🔧', label: 'Complaint' },
    { icon: '🚨', label: 'Panic', danger: true },
  ];

  const activity = [
    { icon: '✅', label: 'Visitor approved', sub: 'Mark T. entered Gate 1', time: '10m', bg: '#E6FAF3' },
    { icon: '📦', label: 'Parcel arrived', sub: 'Courier Guy delivery waiting', time: '2h', bg: '#FEF3C7' },
    { icon: '🔵', label: 'Complaint updated', sub: 'Plumbing → In Progress', time: '1d', bg: '#EBF2FB' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <View>
          <Text style={styles.greeting}>Good morning 👋</Text>
          <Text style={styles.sub}>Oakwood Estate • Unit 14B</Text>
        </View>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>SJ</Text>
        </View>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>

        <View style={styles.greetCard}>
          <Text style={styles.greetLabel}>Welcome back</Text>
          <Text style={styles.greetName}>Sarah Johnson</Text>
          <Text style={styles.greetUnit}>Unit 14B • Oakwood Estate</Text>
          <View style={styles.statusBadge}>
            <View style={styles.statusDot} />
            <Text style={styles.statusText}>Account Active</Text>
          </View>
        </View>

        <View style={styles.qaGrid}>
          {quickActions.map((action, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.qaBtn, action.danger && styles.qaBtnDanger]}>
              <Text style={styles.qaIcon}>{action.icon}</Text>
              <Text style={[styles.qaLabel,
                action.danger && styles.qaLabelDanger]}>
                {action.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>RECENT ACTIVITY</Text>
          {activity.map((item, index) => (
            <View key={index} style={[
              styles.actItem,
              index === activity.length - 1 && styles.actItemLast
            ]}>
              <View style={[styles.actIcon, { backgroundColor: item.bg }]}>
                <Text style={styles.actIconText}>{item.icon}</Text>
              </View>
              <View style={styles.actContent}>
                <Text style={styles.actTitle}>{item.label}</Text>
                <Text style={styles.actSub}>{item.sub}</Text>
              </View>
              <Text style={styles.actTime}>{item.time}</Text>
            </View>
          ))}
        </View>

        <View style={{ height: 20 }} />
      </ScrollView>

      <View style={styles.bottomNav}>
        {[
          { icon: '🏠', label: 'Home', active: true },
          { icon: '🎫', label: 'Visitors' },
          { icon: '📦', label: 'Parcels' },
          { icon: '🔧', label: 'Complaints' },
          { icon: '👤', label: 'Profile' },
        ].map((item, index) => (
          <TouchableOpacity key={index} style={styles.bnItem}>
            <Text style={styles.bnIcon}>{item.icon}</Text>
            <Text style={[styles.bnLabel, item.active && styles.bnLabelActive]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
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
  greeting: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
  },
  sub: {
    fontSize: 11,
    color: '#9CA3AF',
    marginTop: 2,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#EBF2FB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1B4F8A',
  },
  body: {
    flex: 1,
    padding: 14,
  },
  greetCard: {
    backgroundColor: '#1B4F8A',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
  },
  greetLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 2,
  },
  greetName: {
    fontSize: 18,
    fontWeight: '700',
    color: 'white',
    marginBottom: 2,
  },
  greetUnit: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.65)',
  },
  statusBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(0,194,124,0.2)',
    borderWidth: 1,
    borderColor: 'rgba(0,194,124,0.35)',
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 3,
    alignSelf: 'flex-start',
    marginTop: 10,
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#00C27C',
  },
  statusText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#7FFFD4',
  },
  qaGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 12,
  },
  qaBtn: {
    width: '47%',
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    gap: 6,
    borderWidth: 1.5,
    borderColor: '#E5E9F0',
  },
  qaBtnDanger: {
    borderColor: '#FECACA',
    backgroundColor: '#FFF5F5',
  },
  qaIcon: {
    fontSize: 22,
  },
  qaLabel: {
    fontSize: 11,
    fontWeight: '600',
    color: '#111827',
  },
  qaLabelDanger: {
    color: '#E53935',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 13,
    padding: 13,
    borderWidth: 1,
    borderColor: '#E5E9F0',
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 0.6,
    marginBottom: 10,
  },
  actItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 9,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E9F0',
  },
  actItemLast: {
    borderBottomWidth: 0,
    paddingBottom: 0,
  },
  actIcon: {
    width: 32,
    height: 32,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actIconText: {
    fontSize: 14,
  },
  actContent: {
    flex: 1,
  },
  actTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
  },
  actSub: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 1,
  },
  actTime: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  bottomNav: {
    backgroundColor: 'white',
    borderTopWidth: 1,
    borderTopColor: '#E5E9F0',
    flexDirection: 'row',
    paddingTop: 9,
    paddingBottom: 16,
  },
  bnItem: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
  },
  bnIcon: {
    fontSize: 18,
  },
  bnLabel: {
    fontSize: 9,
    fontWeight: '600',
    color: '#9CA3AF',
  },
  bnLabelActive: {
    color: '#1B4F8A',
  },
});