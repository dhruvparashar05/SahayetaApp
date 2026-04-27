import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, Text, View, TouchableOpacity, ActivityIndicator, 
  ScrollView, Modal, TextInput, FlatList, Alert 
} from 'react-native';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createEmergencyAlert } from './firebase';
import { 
  Power, Plus, Users, PhoneCall, Edit3, 
  Info, BookOpen, Trash2, X, ChevronRight 
} from 'lucide-react-native';

const STORAGE_KEY = '@sahayeta_contacts';

export default function App() {
  const [status, setStatus] = useState('idle'); // idle, loading, success
  const [contacts, setContacts] = useState([]);
  const [modalVisible, setModalVisible] = useState(null); // 'add', 'contacts', 'helpline', 'message', 'guidelines'
  
  // Add Contact Form State
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [customMessage, setCustomMessage] = useState('I am in danger! Please help me immediately. My location is attached.');

  const hardcodedHelplines = [
    { name: 'Police', number: '100' },
    { name: 'Fire Fighter', number: '101' },
    { name: 'Ambulance / Hospital', number: '102 / 108' },
    { name: 'Women Safety', number: '1091' },
    { name: 'Disaster Management', number: '112' },
  ];

  useEffect(() => {
    loadContacts();
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.warn('Permission to access location was denied');
      }
    })();
  }, []);

  const loadContacts = async () => {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEY);
      if (stored) {
        setContacts(JSON.parse(stored));
      }
    } catch (e) {
      console.error('Failed to load contacts', e);
    }
  };

  const saveContacts = async (newContacts) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(newContacts));
      setContacts(newContacts);
    } catch (e) {
      console.error('Failed to save contacts', e);
    }
  };

  const handleAddContact = () => {
    if (!newName || !newPhone) {
      Alert.alert('Error', 'Please enter both name and phone number.');
      return;
    }
    if (contacts.length >= 5) {
      Alert.alert('Limit Reached', 'You can only add up to 5 contacts.');
      return;
    }
    
    const updated = [...contacts, { id: Date.now().toString(), name: newName, phone: newPhone }];
    saveContacts(updated);
    setNewName('');
    setNewPhone('');
    setModalVisible(null);
    Alert.alert('Success', 'Contact added successfully.');
  };

  const handleDeleteContact = (id) => {
    const updated = contacts.filter(c => c.id !== id);
    saveContacts(updated);
  };

  const handleSOS = async () => {
    try {
      setStatus('loading');
      
      let lat = 37.7749;
      let lng = -122.4194;

      try {
        let loc = await Location.getCurrentPositionAsync({ timeout: 5000 });
        lat = loc.coords.latitude;
        lng = loc.coords.longitude;
      } catch (locationError) {
        console.warn('Location unavailable, using fallback coordinates.', locationError);
      }

      const alertData = {
        type: 'Emergency',
        coordinates: { lat, lng },
        room: 'Mobile User', 
        status: 'Active',
        priority: 'High',
        timestamp: Date.now()
      };

      await createEmergencyAlert(alertData);
      
      setStatus('success');
      Alert.alert('SOS Sent', 'Your emergency alert has been broadcasted successfully.');
      
      setTimeout(() => setStatus('idle'), 3000);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to send alert. Check your connection.');
      setStatus('idle');
    }
  };

  // UI Components
  const renderHeader = () => (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>SahayetaApp</Text>
    </View>
  );

  const renderSOSButton = () => (
    <TouchableOpacity 
      style={styles.sosContainer} 
      activeOpacity={0.8}
      onPress={handleSOS}
      disabled={status === 'loading'}
    >
      <View style={styles.sosTextWrapper}>
        <Text style={styles.sosTitle}>{status === 'loading' ? 'Sending...' : status === 'success' ? 'Alert Sent!' : 'Emergency Mode'}</Text>
        <Text style={styles.sosSubtitle}>Send instant SOS with location</Text>
      </View>
      <View style={styles.sosIconWrapper}>
        {status === 'loading' ? (
          <ActivityIndicator color="#5c191a" size="small" />
        ) : (
          <Power color="#5c191a" size={24} />
        )}
      </View>
    </TouchableOpacity>
  );

  const renderQuickActions = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Quick Actions</Text>
      <View style={styles.grid}>
        
        <TouchableOpacity style={[styles.gridCard, { backgroundColor: '#0e4b75' }]} onPress={() => setModalVisible('add')}>
          <Plus color="#fff" size={28} />
          <Text style={styles.cardText}>Add Contact</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.gridCard, { backgroundColor: '#373f4d' }]} onPress={() => setModalVisible('contacts')}>
          <Users color="#fff" size={28} />
          <Text style={styles.cardText}>Contacts</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.gridCard, { backgroundColor: '#5c3a6b' }]} onPress={() => setModalVisible('helpline')}>
          <PhoneCall color="#fff" size={28} />
          <Text style={styles.cardText}>Helpline</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.gridCard, { backgroundColor: '#373f4d' }]} onPress={() => setModalVisible('message')}>
          <Edit3 color="#fff" size={28} />
          <Text style={styles.cardText}>Edit Message</Text>
        </TouchableOpacity>

      </View>
    </View>
  );

  const renderSafetyResources = () => (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>Safety Resources</Text>
      
      <TouchableOpacity style={styles.listItem} onPress={() => setModalVisible('guidelines')}>
        <View style={styles.listIconWrapper}>
          <Info color="#5ea8ff" size={20} />
        </View>
        <View style={styles.listTextWrapper}>
          <Text style={styles.listTitle}>Safety Instructions</Text>
          <Text style={styles.listSubtitle}>Learn essential safety tips</Text>
        </View>
        <ChevronRight color="#8a95a5" size={20} />
      </TouchableOpacity>

      <TouchableOpacity style={styles.listItem}>
        <View style={styles.listIconWrapper}>
          <BookOpen color="#5ea8ff" size={20} />
        </View>
        <View style={styles.listTextWrapper}>
          <Text style={styles.listTitle}>SOS Guides</Text>
          <Text style={styles.listSubtitle}>Emergency response procedures</Text>
        </View>
        <ChevronRight color="#8a95a5" size={20} />
      </TouchableOpacity>
    </View>
  );

  // Modals
  const renderModals = () => (
    <Modal visible={!!modalVisible} animationType="slide" transparent={true}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <TouchableOpacity style={styles.closeBtn} onPress={() => setModalVisible(null)}>
            <X color="#fff" size={24} />
          </TouchableOpacity>

          {/* ADD CONTACT MODAL */}
          {modalVisible === 'add' && (
            <View style={styles.modalBody}>
              <Text style={styles.modalTitle}>Add Emergency Contact</Text>
              <Text style={styles.modalSubtitle}>{contacts.length}/5 Contacts Added</Text>
              <TextInput 
                style={styles.input} 
                placeholder="Name" 
                placeholderTextColor="#666"
                value={newName}
                onChangeText={setNewName}
              />
              <TextInput 
                style={styles.input} 
                placeholder="Phone Number" 
                placeholderTextColor="#666"
                keyboardType="phone-pad"
                value={newPhone}
                onChangeText={setNewPhone}
              />
              <TouchableOpacity style={styles.saveBtn} onPress={handleAddContact}>
                <Text style={styles.saveBtnText}>Save Contact</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* CONTACTS LIST MODAL */}
          {modalVisible === 'contacts' && (
            <View style={styles.modalBody}>
              <Text style={styles.modalTitle}>Emergency Contacts</Text>
              {contacts.length === 0 ? (
                <Text style={styles.emptyText}>No contacts added yet.</Text>
              ) : (
                <FlatList
                  data={contacts}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    <View style={styles.contactRow}>
                      <View>
                        <Text style={styles.contactName}>{item.name}</Text>
                        <Text style={styles.contactPhone}>{item.phone}</Text>
                      </View>
                      <TouchableOpacity onPress={() => handleDeleteContact(item.id)}>
                        <Trash2 color="#ff4d5a" size={20} />
                      </TouchableOpacity>
                    </View>
                  )}
                />
              )}
            </View>
          )}

          {/* HELPLINE MODAL */}
          {modalVisible === 'helpline' && (
            <View style={styles.modalBody}>
              <Text style={styles.modalTitle}>Important Helplines</Text>
              {hardcodedHelplines.map((h, i) => (
                <View key={i} style={styles.contactRow}>
                  <Text style={styles.contactName}>{h.name}</Text>
                  <Text style={styles.contactPhone}>{h.number}</Text>
                </View>
              ))}
            </View>
          )}

          {/* EDIT MESSAGE MODAL */}
          {modalVisible === 'message' && (
            <View style={styles.modalBody}>
              <Text style={styles.modalTitle}>SOS Message</Text>
              <Text style={styles.modalSubtitle}>This message will be sent to your contacts along with your location.</Text>
              <TextInput 
                style={[styles.input, { height: 100, textAlignVertical: 'top' }]} 
                multiline
                placeholder="Emergency message..." 
                placeholderTextColor="#666"
                value={customMessage}
                onChangeText={setCustomMessage}
              />
              <TouchableOpacity style={styles.saveBtn} onPress={() => {
                Alert.alert('Saved', 'Custom message saved.');
                setModalVisible(null);
              }}>
                <Text style={styles.saveBtnText}>Save Message</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* GUIDELINES MODAL */}
          {modalVisible === 'guidelines' && (
            <View style={styles.modalBody}>
              <Text style={styles.modalTitle}>Safety Guidelines</Text>
              <ScrollView style={{ marginTop: 10 }}>
                <Text style={styles.guidelineText}>1. Stay Calm: Try to remain as calm as possible to assess the situation.</Text>
                <Text style={styles.guidelineText}>2. Find Safe Location: Move away from immediate danger if it is safe to do so.</Text>
                <Text style={styles.guidelineText}>3. Press SOS: Use the Emergency Mode button at the top to instantly alert authorities and contacts.</Text>
                <Text style={styles.guidelineText}>4. Wait for Help: Do not confront attackers or put yourself in further risk.</Text>
                <Text style={styles.guidelineText}>5. Keep Phone On: Ensure your phone stays powered on and the app has location access.</Text>
              </ScrollView>
            </View>
          )}

        </View>
      </View>
    </Modal>
  );

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {renderHeader()}
      {renderSOSButton()}
      {renderQuickActions()}
      {renderSafetyResources()}
      {renderModals()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#16181f',
  },
  scrollContent: {
    padding: 20,
    paddingTop: 50,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  // Emergency Button
  sosContainer: {
    backgroundColor: '#f2b8b5',
    borderRadius: 20,
    padding: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 30,
    shadowColor: '#f2b8b5',
    shadowOpacity: 0.3,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5,
  },
  sosTextWrapper: {
    flex: 1,
  },
  sosTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#5c191a',
    marginBottom: 4,
  },
  sosSubtitle: {
    fontSize: 14,
    color: '#8c4345',
    fontWeight: '500',
  },
  sosIconWrapper: {
    backgroundColor: 'rgba(255,255,255,0.4)',
    padding: 12,
    borderRadius: 50,
  },
  // Sections
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  // Grid
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  gridCard: {
    width: '48%',
    aspectRatio: 1,
    borderRadius: 20,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  cardText: {
    color: '#fff',
    fontWeight: '600',
    marginTop: 12,
    fontSize: 15,
  },
  // Lists
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#222631',
    padding: 16,
    borderRadius: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#303645',
  },
  listIconWrapper: {
    backgroundColor: '#16181f',
    padding: 10,
    borderRadius: 50,
    marginRight: 15,
  },
  listTextWrapper: {
    flex: 1,
  },
  listTitle: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 16,
    marginBottom: 2,
  },
  listSubtitle: {
    color: '#8a95a5',
    fontSize: 13,
  },
  // Modals
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.7)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#222631',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    minHeight: '50%',
  },
  closeBtn: {
    alignSelf: 'flex-end',
    padding: 5,
  },
  modalBody: {
    flex: 1,
  },
  modalTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  modalSubtitle: {
    color: '#8a95a5',
    fontSize: 14,
    marginBottom: 20,
  },
  input: {
    backgroundColor: '#16181f',
    borderWidth: 1,
    borderColor: '#303645',
    color: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 15,
    fontSize: 16,
  },
  saveBtn: {
    backgroundColor: '#0e4b75',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 10,
  },
  saveBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  contactRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#16181f',
    padding: 16,
    borderRadius: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#303645',
  },
  contactName: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  contactPhone: {
    color: '#8a95a5',
    fontSize: 14,
    marginTop: 4,
  },
  emptyText: {
    color: '#8a95a5',
    textAlign: 'center',
    marginTop: 20,
  },
  guidelineText: {
    color: '#d1d5db',
    fontSize: 15,
    marginBottom: 15,
    lineHeight: 22,
  }
});
