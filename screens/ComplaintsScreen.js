import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, TextInput, Alert
} from 'react-native';

export default function ComplaintsScreen() {
  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');

  const categories = [
    'Plumbing', 'Electrical', 'Common Areas',
    'Noise', 'Security', 'Parking', 'Other'
  ];

  const priorities = ['Low', 'Medium', 'Urgent'];

  const complaints = [
    {
      id: 1,
      category: 'Plumbing',
      description: 'Burst pipe in bathroom causing flooding.',
      priority: 'Urgent',
      status: 'In Progress',
      date: 'Today',
      statusColor: '#1B4F8A',
      statusBg: '#EBF2FB',
    },
    {
      id: 2,
      category: 'Electrical',
      description: 'Power outlet in kitchen not working.',
      priority: 'Medium',
      status: 'Pending',
      date: 'Yesterday',
      statusColor: '#92400E',
      statusBg: '#FEF3C7',
    },
    {
      id: 3,
      category: 'Noise',
      description: 'Loud music from Unit 12A after 10PM.',
      priority: 'Low',
      status: 'Resolved',
      date: '3 days ago',
      statusColor: '#047857',
      statusBg: '#E6FAF3',
    },
  ];

  const handleSubmit = () => {
    if (!category) {
      Alert.alert('Error', 'Please select a category');
      return;
    }
    if (!description) {
      Alert.alert('Error', 'Please enter a description');
      return;
    }
    Alert.alert(
      'Complaint Submitted ✅',
      'Your complaint has been logged. The building admin has been notified.',
      [{ text: 'OK', onPress: () => { setShowForm(false); setCategory(''); setDescription(''); setPriority('Low'); } }]
    );
  };

  const getPriorityColor = (p) => {
    if (p === 'Urgent') return { color: '#E53935', bg: '#FDECEC' };
    if (p === 'Medium') return { color: '#F59E0B', bg: '#FEF3C7' };
    return { color: '#00C27C', bg: '#E6FAF3' };
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Complaints 🔧</Text>
        <TouchableOpacity
          style={styles.newBtn}
          onPress={() => setShowForm(!showForm)}>
          <Text style={styles.newBtnText}>{showForm ? '✕ Cancel' : '+ New'}</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>

        {showForm && (
          <View style={styles.formCard}>
            <Text style={styles.formTitle}>Log a Complaint</Text>

            <Text style={styles.fieldLabel}>CATEGORY</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}
              style={styles.catRow}>
              {categories.map(cat => (
                <TouchableOpacity
                  key={cat}
                  style={[styles.catBtn, category === cat && styles.catBtnActive]}
                  onPress={() => setCategory(cat)}>
                  <Text style={[styles.catText,
                    category === cat && styles.catTextActive]}>
                    {cat}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <Text style={styles.fieldLabel}>DESCRIPTION</Text>
            <TextInput
              style={styles.descInput}
              placeholder="Describe the issue in detail — be specific about the location and nature of the problem..."
              placeholderTextColor="#9CA3AF"
              value={description}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />

            <Text style={styles.fieldLabel}>PRIORITY</Text>
            <View style={styles.priorityRow}>
              {priorities.map(p => {
                const pc = getPriorityColor(p);
                return (
                  <TouchableOpacity
                    key={p}
                    style={[styles.priorityBtn,
                      priority === p && { backgroundColor: pc.bg, borderColor: pc.color }]}
                    onPress={() => setPriority(p)}>
                    <Text style={[styles.priorityText,
                      priority === p && { color: pc.color }]}>
                      {p}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>

            <View style={styles.warningBox}>
              <Text style={styles.warningText}>
                ⚠️ Complaints cannot be edited after submission. Please make sure your description is accurate.
              </Text>
            </View>

            <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
              <Text style={styles.submitBtnText}>Submit Complaint</Text>
            </TouchableOpacity>
          </View>
        )}

        <View style={styles.statsRow}>
          {[
            { label: 'PENDING', value: '1', color: '#92400E', bg: '#FEF3C7' },
            { label: 'IN PROGRESS', value: '1', color: '#1B4F8A', bg: '#EBF2FB' },
            { label: 'RESOLVED', value: '1', color: '#047857', bg: '#E6FAF3' },
          ].map(s => (
            <View key={s.label} style={[styles.statBox, { backgroundColor: s.bg }]}>
              <Text style={[styles.statVal, { color: s.color }]}>{s.value}</Text>
              <Text style={[styles.statLabel, { color: s.color }]}>{s.label}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionLabel}>MY COMPLAINTS</Text>

        {complaints.map(complaint => (
          <View key={complaint.id} style={styles.complaintCard}>
            <View style={styles.complaintHeader}>
              <View style={styles.categoryBadge}>
                <Text style={styles.categoryBadgeText}>{complaint.category}</Text>
              </View>
              <View style={[styles.statusBadge,
                { backgroundColor: complaint.statusBg }]}>
                <Text style={[styles.statusText,
                  { color: complaint.statusColor }]}>
                  {complaint.status}
                </Text>
              </View>
            </View>
            <Text style={styles.complaintDesc}>{complaint.description}</Text>
            <View style={styles.complaintFooter}>
              <View style={[styles.priorityChip,
                { backgroundColor: getPriorityColor(complaint.priority).bg }]}>
                <Text style={[styles.priorityChipText,
                  { color: getPriorityColor(complaint.priority).color }]}>
                  {complaint.priority}
                </Text>
              </View>
              <Text style={styles.complaintDate}>{complaint.date}</Text>
            </View>
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
  newBtn: {
    backgroundColor: '#1B4F8A',
    borderRadius: 100,
    paddingHorizontal: 14,
    paddingVertical: 6,
  },
  newBtnText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
  },
  body: {
    flex: 1,
    padding: 14,
  },
  formCard: {
    backgroundColor: 'white',
    borderRadius: 13,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E5E9F0',
    marginBottom: 14,
  },
  formTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 14,
  },
  fieldLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 0.6,
    marginBottom: 8,
  },
  catRow: {
    marginBottom: 14,
    maxHeight: 40,
  },
  catBtn: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: 100,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E5E9F0',
    marginRight: 8,
  },
  catBtnActive: {
    backgroundColor: '#EBF2FB',
    borderColor: '#1B4F8A',
  },
  catText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },
  catTextActive: {
    color: '#1B4F8A',
  },
  descInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E5E9F0',
    borderRadius: 10,
    padding: 12,
    fontSize: 13,
    color: '#111827',
    marginBottom: 14,
    minHeight: 100,
  },
  priorityRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  priorityBtn: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E5E9F0',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
  },
  priorityText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#4B5563',
  },
  warningBox: {
    backgroundColor: '#FEF3C7',
    borderRadius: 9,
    padding: 10,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: '#F59E0B',
  },
  warningText: {
    fontSize: 11,
    color: '#92400E',
    lineHeight: 16,
  },
  submitBtn: {
    backgroundColor: '#00C27C',
    borderRadius: 11,
    padding: 14,
    alignItems: 'center',
  },
  submitBtnText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 14,
  },
  statBox: {
    flex: 1,
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  statVal: {
    fontSize: 20,
    fontWeight: '700',
    lineHeight: 24,
  },
  statLabel: {
    fontSize: 8,
    fontWeight: '700',
    marginTop: 2,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 0.6,
    marginBottom: 10,
  },
  complaintCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 13,
    borderWidth: 1.5,
    borderColor: '#E5E9F0',
    marginBottom: 10,
  },
  complaintHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  categoryBadge: {
    backgroundColor: '#EBF2FB',
    borderRadius: 100,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  categoryBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1B4F8A',
  },
  statusBadge: {
    borderRadius: 100,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  statusText: {
    fontSize: 10,
    fontWeight: '700',
  },
  complaintDesc: {
    fontSize: 12,
    color: '#4B5563',
    lineHeight: 17,
    marginBottom: 10,
  },
  complaintFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priorityChip: {
    borderRadius: 100,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  priorityChipText: {
    fontSize: 10,
    fontWeight: '700',
  },
  complaintDate: {
    fontSize: 10,
    color: '#9CA3AF',
  },
});