import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView
} from 'react-native';

export default function NoticesScreen() {
  const [selected, setSelected] = useState('All');

  const filters = ['All', 'Emergency', 'Water', 'Power', 'General'];

  const notices = [
    {
      category: 'Emergency',
      badge: '🚨 Emergency',
      badgeColor: '#E53935',
      badgeText: 'white',
      title: 'Gas leak — Block C',
      body: 'Please evacuate Block C immediately. Emergency services have been notified. Gather at the main parking area.',
      time: '8m ago',
      emergency: true,
    },
    {
      category: 'Water',
      badge: '💧 Water Outage',
      badgeColor: '#EBF2FB',
      badgeText: '#1B4F8A',
      title: 'Scheduled water outage',
      body: 'Water will be off Thursday 13 March, 9AM–1PM for maintenance. Please store water in advance.',
      time: '2h ago',
      emergency: false,
    },
    {
      category: 'Power',
      badge: '⚡ Power Outage',
      badgeColor: '#FEF3C7',
      badgeText: '#92400E',
      title: 'Load shedding schedule',
      body: 'Stage 2 load shedding expected this week. Check the Eskom schedule for your area.',
      time: '5h ago',
      emergency: false,
    },
    {
      category: 'General',
      badge: '📋 General',
      badgeColor: '#EBF2FB',
      badgeText: '#1B4F8A',
      title: 'Visitor parking reminder',
      body: 'Visitors must use designated bays only. Unmarked vehicles will be clamped without warning.',
      time: 'Yesterday',
      emergency: false,
    },
    {
      category: 'General',
      badge: '📋 General',
      badgeColor: '#EBF2FB',
      badgeText: '#1B4F8A',
      title: 'Pool area maintenance',
      body: 'The pool area will be closed for cleaning every Monday from 8AM to 12PM.',
      time: '2 days ago',
      emergency: false,
    },
  ];

  const filtered = selected === 'All'
    ? notices
    : notices.filter(n => n.category === selected);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Notices 📢</Text>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>{notices.length}</Text>
        </View>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterRow}
        contentContainerStyle={styles.filterContent}>
        {filters.map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, selected === f && styles.filterBtnActive]}
            onPress={() => setSelected(f)}>
            <Text style={[styles.filterText,
              selected === f && styles.filterTextActive]}>
              {f}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>
        {filtered.map((notice, index) => (
          <View
            key={index}
            style={[styles.noticeCard,
              notice.emergency && styles.noticeCardEmergency]}>
            <View style={styles.noticeHeader}>
              <View style={[styles.noticeBadge,
                { backgroundColor: notice.badgeColor }]}>
                <Text style={[styles.noticeBadgeText,
                  { color: notice.badgeText }]}>
                  {notice.badge}
                </Text>
              </View>
              <Text style={styles.noticeTime}>{notice.time}</Text>
            </View>
            <Text style={[styles.noticeTitle,
              notice.emergency && styles.noticeTitleEmergency]}>
              {notice.title}
            </Text>
            <Text style={[styles.noticeBody,
              notice.emergency && styles.noticeBodyEmergency]}>
              {notice.body}
            </Text>
          </View>
        ))}
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
    backgroundColor: '#1B4F8A',
    borderRadius: 100,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
    color: 'white',
  },
  filterRow: {
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E9F0',
    maxHeight: 52,
  },
  filterContent: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    gap: 8,
    flexDirection: 'row',
  },
  filterBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 100,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E5E9F0',
  },
  filterBtnActive: {
    backgroundColor: '#1B4F8A',
    borderColor: '#1B4F8A',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },
  filterTextActive: {
    color: 'white',
  },
  body: {
    flex: 1,
    padding: 14,
  },
  noticeCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 13,
    borderWidth: 1.5,
    borderColor: '#E5E9F0',
    marginBottom: 10,
  },
  noticeCardEmergency: {
    backgroundColor: '#FDECEC',
    borderColor: '#E53935',
  },
  noticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  noticeBadge: {
    borderRadius: 100,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  noticeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
  noticeTime: {
    fontSize: 10,
    color: '#9CA3AF',
  },
  noticeTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  noticeTitleEmergency: {
    color: '#E53935',
  },
  noticeBody: {
    fontSize: 11,
    color: '#4B5563',
    lineHeight: 16,
  },
  noticeBodyEmergency: {
    color: '#7F1D1D',
  },
});