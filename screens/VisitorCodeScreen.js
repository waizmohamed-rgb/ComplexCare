import React, { useState } from 'react';
import {
  View, Text, StyleSheet, ScrollView,
  TouchableOpacity, SafeAreaView, TextInput, Alert, Share
} from 'react-native';

export default function VisitorCodeScreen() {
  const [codeType, setCodeType] = useState('oneTime');
  const [visitorName, setVisitorName] = useState('');
  const [generatedCode, setGeneratedCode] = useState(null);

  const codeTypes = [
    { key: 'oneTime', icon: '🔢', label: 'One-Time', desc: 'Single entry only' },
    { key: 'timed', icon: '⏱️', label: 'Timed', desc: 'Set hours' },
    { key: 'dateRange', icon: '📅', label: 'Date Range', desc: 'Between dates' },
    { key: 'qr', icon: '📱', label: 'QR Code', desc: 'Scannable pass' },
  ];

  const activeCode = {
    code: '7X4K9M',
    visitor: 'John Smith',
    type: 'One-Time',
    created: 'Today at 9:30 AM',
    active: true,
  };

  const generateCode = () => {
    if (!visitorName) {
      Alert.alert('Error', 'Please enter the visitor name first');
      return;
    }
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 6; i++) {
      code += chars[Math.floor(Math.random() * chars.length)];
    }
    setGeneratedCode(code);
  };

  const handleShare = async (method) => {
    if (!generatedCode) return;
    try {
      await Share.share({
        message: `Your ComplexCare visitor code is: ${generatedCode}\n\nShow this to the guard at the gate. Valid for ${codeType === 'oneTime' ? 'one entry only' : 'set duration'}.`,
      });
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  const handleCancel = () => {
    Alert.alert(
      'Cancel Code',
      'Are you sure you want to cancel this active code?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Yes Cancel', style: 'destructive', onPress: () => Alert.alert('Code Cancelled', 'The visitor code has been cancelled.') }
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Visitor Access 🎫</Text>
      </View>

      <ScrollView style={styles.body} showsVerticalScrollIndicator={false}>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>CHOOSE CODE TYPE</Text>
          <View style={styles.codeTypeGrid}>
            {codeTypes.map(ct => (
              <TouchableOpacity
                key={ct.key}
                style={[styles.ctBtn, codeType === ct.key && styles.ctBtnActive]}
                onPress={() => setCodeType(ct.key)}>
                <Text style={styles.ctIcon}>{ct.icon}</Text>
                <Text style={[styles.ctLabel,
                  codeType === ct.key && styles.ctLabelActive]}>
                  {ct.label}
                </Text>
                <Text style={styles.ctDesc}>{ct.desc}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>VISITOR NAME</Text>
          <TextInput
            style={styles.nameInput}
            placeholder="Enter visitor's full name"
            placeholderTextColor="#9CA3AF"
            value={visitorName}
            onChangeText={setVisitorName}
          />
        </View>

        {generatedCode ? (
          <>
            <View style={styles.codeCard}>
              <Text style={styles.codeLabel}>ACCESS CODE</Text>
              <Text style={styles.codeText}>{generatedCode}</Text>
              <Text style={styles.codeExp}>
                {codeType === 'oneTime' ? '⏱ Valid for 1 entry only' :
                  codeType === 'timed' ? '⏱ Valid for set hours' :
                    codeType === 'dateRange' ? '📅 Valid for date range' :
                      '📱 QR Code pass'}
              </Text>
            </View>

            <View style={styles.shareRow}>
              <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
                <Text style={styles.shareBtnText}>💬 WhatsApp</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
                <Text style={styles.shareBtnText}>✉️ Email</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.shareBtn} onPress={handleShare}>
                <Text style={styles.shareBtnText}>📋 Copy</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity
              style={styles.generateBtn}
              onPress={generateCode}>
              <Text style={styles.generateBtnText}>Generate New Code</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity style={styles.generateBtn} onPress={generateCode}>
            <Text style={styles.generateBtnText}>Generate Code →</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.sectionLabel}>ACTIVE CODES</Text>
        <View style={styles.activeCodeCard}>
          <View style={styles.acHeader}>
            <View style={styles.acBadge}>
              <Text style={styles.acBadgeText}>{activeCode.type}</Text>
            </View>
            <View style={styles.acActiveBadge}>
              <Text style={styles.acActiveText}>● Active</Text>
            </View>
          </View>
          <Text style={styles.acCode}>{activeCode.code}</Text>
          <Text style={styles.acVisitor}>👤 {activeCode.visitor}</Text>
          <Text style={styles.acDate}>Created {activeCode.created}</Text>
          <TouchableOpacity style={styles.cancelBtn} onPress={handleCancel}>
            <Text style={styles.cancelBtnText}>Cancel Code</Text>
          </TouchableOpacity>
        </View>

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
    borderBottomWidth: 1,
    borderBottomColor: '#E5E9F0',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  body: {
    flex: 1,
    padding: 14,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 13,
    padding: 13,
    borderWidth: 1,
    borderColor: '#E5E9F0',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 0.6,
    marginBottom: 10,
  },
  codeTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  ctBtn: {
    width: '47%',
    backgroundColor: '#F8FAFC',
    borderRadius: 11,
    padding: 11,
    borderWidth: 2,
    borderColor: '#E5E9F0',
  },
  ctBtnActive: {
    borderColor: '#1B4F8A',
    backgroundColor: '#EBF2FB',
  },
  ctIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  ctLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#111827',
  },
  ctLabelActive: {
    color: '#1B4F8A',
  },
  ctDesc: {
    fontSize: 10,
    color: '#9CA3AF',
    marginTop: 2,
    lineHeight: 14,
  },
  nameInput: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E5E9F0',
    borderRadius: 10,
    padding: 12,
    fontSize: 14,
    color: '#111827',
  },
  codeCard: {
    backgroundColor: '#1B4F8A',
    borderRadius: 14,
    padding: 20,
    alignItems: 'center',
    marginBottom: 10,
    gap: 6,
  },
  codeLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.5)',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  codeText: {
    fontSize: 36,
    fontWeight: '700',
    color: 'white',
    letterSpacing: 8,
    fontFamily: 'monospace',
  },
  codeExp: {
    fontSize: 11,
    color: 'rgba(255,255,255,0.5)',
  },
  shareRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 10,
  },
  shareBtn: {
    flex: 1,
    padding: 11,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#E5E9F0',
    backgroundColor: 'white',
    alignItems: 'center',
  },
  shareBtnText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#111827',
  },
  generateBtn: {
    backgroundColor: '#00C27C',
    borderRadius: 12,
    padding: 14,
    alignItems: 'center',
    marginBottom: 16,
  },
  generateBtnText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  sectionLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#9CA3AF',
    letterSpacing: 0.6,
    marginBottom: 10,
  },
  activeCodeCard: {
    backgroundColor: 'white',
    borderRadius: 13,
    padding: 14,
    borderWidth: 1.5,
    borderColor: '#E5E9F0',
  },
  acHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  acBadge: {
    backgroundColor: '#EBF2FB',
    borderRadius: 100,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  acBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#1B4F8A',
  },
  acActiveBadge: {
    backgroundColor: '#E6FAF3',
    borderRadius: 100,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  acActiveText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#047857',
  },
  acCode: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
    letterSpacing: 6,
    fontFamily: 'monospace',
    marginBottom: 8,
  },
  acVisitor: {
    fontSize: 13,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  acDate: {
    fontSize: 11,
    color: '#9CA3AF',
    marginBottom: 12,
  },
  cancelBtn: {
    backgroundColor: '#FDECEC',
    borderRadius: 9,
    padding: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  cancelBtnText: {
    color: '#E53935',
    fontWeight: '700',
    fontSize: 12,
  },
});