import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, SafeAreaView, ActivityIndicator, Alert
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase/config';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('resident');
  const [loading, setLoading] = useState(false);
  const [tapCount, setTapCount] = useState(0);
  const [showSA, setShowSA] = useState(false);
  const [saCode, setSaCode] = useState('');

  const roles = [
    { key: 'admin', label: 'Admin', icon: '🏢' },
    { key: 'guard', label: 'Guard', icon: '🛡️' },
    { key: 'resident', label: 'Resident', icon: '🏠' },
  ];

  const handleLogoTap = () => {
    const newCount = tapCount + 1;
    setTapCount(newCount);
    if (newCount >= 5) {
      setShowSA(true);
      setTapCount(0);
    }
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter your email and password');
      return;
    }
    setLoading(true);
    try {
      const userCred = await signInWithEmailAndPassword(auth, email, password);
      console.log('Auth success, UID:', userCred.user.uid);

      const userRef = doc(db, 'users', userCred.user.uid);
      console.log('Looking for document at path:', `users/${userCred.user.uid}`);
      const userDoc = await getDoc(userRef);
      console.log('Firestore response:', userDoc.exists(), userDoc.id);
      console.log('Doc data:', JSON.stringify(userDoc.data()));
      console.log('Selected role:', role);

      if (!userDoc.exists()) {
        Alert.alert('Error', 'Account not found. Please contact your admin.');
        return;
      }

      const userData = userDoc.data();

      if (userData.role !== role) {
        Alert.alert('Wrong Role',
          `This account is registered as a ${userData.role}. Please select the correct role.`);
        return;
      }

      Alert.alert('Success!', `Welcome ${userData.name}! Login working! 🎉`);

    } catch (error) {
      console.log('Error code:', error.code);
      console.log('Error message:', error.message);
      if (error.code === 'auth/invalid-credential') {
        Alert.alert('Login Failed', 'Incorrect email or password.');
      } else if (error.code === 'auth/too-many-requests') {
        Alert.alert('Too Many Attempts', 'Account temporarily locked. Try again later.');
      } else {
        Alert.alert('Login Failed', error.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inner}>

        <TouchableOpacity onPress={handleLogoTap} activeOpacity={1}>
          <Text style={styles.logo}>🏢</Text>
        </TouchableOpacity>
        <Text style={styles.title}>ComplexCare</Text>
        <Text style={styles.subtitle}>Smart complex management</Text>

        <Text style={styles.roleLabel}>SIGN IN AS</Text>
        <View style={styles.roleRow}>
          {roles.map(r => (
            <TouchableOpacity
              key={r.key}
              style={[styles.roleBtn, role === r.key && styles.roleBtnActive]}
              onPress={() => setRole(r.key)}>
              <Text style={styles.roleIcon}>{r.icon}</Text>
              <Text style={[styles.roleText,
                role === r.key && styles.roleTextActive]}>
                {r.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TextInput
          style={styles.input}
          placeholder="Email address"
          placeholderTextColor="#9CA3AF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#9CA3AF"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        {showSA && (
          <TextInput
            style={[styles.input, styles.saInput]}
            placeholder="🔒 Super Admin access code"
            placeholderTextColor="rgba(255,215,0,0.4)"
            value={saCode}
            onChangeText={setSaCode}
            secureTextEntry
          />
        )}

        {loading ? (
          <ActivityIndicator size="large" color="#00C27C"
            style={{ marginTop: 16 }} />
        ) : (
          <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
            <Text style={styles.loginBtnText}>Sign In →</Text>
          </TouchableOpacity>
        )}

        <Text style={styles.registerText}>
          Don't have an account?{' '}
          <Text style={styles.registerLink}>Register here</Text>
        </Text>

      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B4F8A',
  },
  inner: {
    flex: 1,
    padding: 28,
    justifyContent: 'center',
  },
  logo: {
    fontSize: 48,
    textAlign: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    color: 'rgba(255,255,255,0.5)',
    textAlign: 'center',
    marginBottom: 32,
  },
  roleLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255,255,255,0.5)',
    letterSpacing: 1,
    marginBottom: 10,
  },
  roleRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  roleBtn: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.12)',
  },
  roleBtnActive: {
    backgroundColor: 'rgba(0,194,124,0.2)',
    borderColor: '#00C27C',
  },
  roleIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  roleText: {
    fontSize: 11,
    fontWeight: '600',
    color: 'rgba(255,255,255,0.6)',
  },
  roleTextActive: {
    color: 'white',
  },
  input: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
    padding: 14,
    color: 'white',
    fontSize: 14,
    marginBottom: 14,
  },
  saInput: {
    borderColor: 'rgba(255,215,0,0.3)',
    backgroundColor: 'rgba(255,215,0,0.08)',
  },
  loginBtn: {
    backgroundColor: '#00C27C',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    marginBottom: 20,
    elevation: 4,
  },
  loginBtnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '700',
  },
  registerText: {
    color: 'rgba(255,255,255,0.4)',
    fontSize: 12,
    textAlign: 'center',
  },
  registerLink: {
    color: '#00C27C',
    fontWeight: '600',
  },
});