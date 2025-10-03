import React from 'react';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { WarningLight } from '../types/WarningLight';

interface WarningLightDetailScreenProps {
  route: any;
  navigation: any;
}

const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'critical':
      return '#FF4444';
    case 'warning':
      return '#FF8800';
    case 'info':
      return '#4CAF50';
    default:
      return '#757575';
  }
};

const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'critical':
      return '🔴';
    case 'warning':
      return '🟡';
    case 'info':
      return '🔵';
    default:
      return '⚪';
  }
};

export default function WarningLightDetailScreen({ route, navigation }: WarningLightDetailScreenProps) {
  const { warningLight }: { warningLight: WarningLight } = route.params;

  const getImageSource = () => {
    try {
      switch (warningLight.image) {
        case 'ABS-light.png':
          return require('../../assets/images/ABS-light.png');
        case 'airbag-indicator.png':
          return require('../../assets/images/airbag-indicator.png');
        case 'battery-alert.png':
          return require('../../assets/images/battery-alert.png');
        case 'brake-warning.png':
          return require('../../assets/images/brake-warning.png');
        case 'check-engine-light.png':
          return require('../../assets/images/check-engine-light.png');
        case 'engine-temperature.png':
          return require('../../assets/images/engine-temperature.png');
        case 'low-fuel.png':
          return require('../../assets/images/low-fuel.png');
        case 'oil-pressure-light.png':
          return require('../../assets/images/oil-pressure-light.png');
        case 'tire-pressure-light.png':
          return require('../../assets/images/tire-pressure-light.png');
        case 'seat-belt.png':
          return require('../../assets/images/seat-belt.png');
        case 'traction-control.png':
          return require('../../assets/images/traction-control.png');
        case 'lane-departure.png':
          return require('../../assets/images/lane-departure.png');
        case 'fog-lamp.png':
          return require('../../assets/images/fog-lamp.png');
        case 'security-indicator.png':
          return require('../../assets/images/security-indicator.png');
        case 'transmission-temperature.png':
          return require('../../assets/images/transmission-temperature.png');
        case 'washer-fluid.png':
          return require('../../assets/images/washer-fluid.png');
        case 'power-steering.png':
          return require('../../assets/images/power-steering.png');
        case 'parking-brake.png':
          return require('../../assets/images/parking-brake.png');
        case 'cruise-control.png':
          return require('../../assets/images/cruise-control.png');
        case 'door-ajar.png':
          return require('../../assets/images/door-ajar.png');
        default:
          return require('../../assets/images/check-engine-light.png');
      }
    } catch (error) {
      return require('../../assets/images/check-engine-light.png');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Back</Text>
        </TouchableOpacity>
        <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(warningLight.severity) }]}>
          <Text style={styles.severityText}>
            {getSeverityIcon(warningLight.severity)} {warningLight.severity.toUpperCase()}
          </Text>
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Warning Light Image and Name */}
        <View style={styles.imageSection}>
          <View style={styles.imageContainer}>
            <Image source={getImageSource()} style={styles.warningLightImage} />
          </View>
          <Text style={styles.warningLightName}>{warningLight.name}</Text>
        </View>

        {/* Description Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What does this mean?</Text>
          <View style={styles.card}>
            <Text style={styles.descriptionText}>{warningLight.description}</Text>
          </View>
        </View>

        {/* Urgency Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>How urgent is this?</Text>
          <View style={[styles.card, styles.urgencyCard]}>
            <View style={styles.urgencyIndicator}>
              <Text style={styles.urgencyIcon}>{getSeverityIcon(warningLight.severity)}</Text>
            </View>
            <Text style={styles.urgencyText}>{warningLight.urgency}</Text>
          </View>
        </View>

        {/* Fix Information Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What should I do?</Text>
          <View style={styles.card}>
            <Text style={styles.fixInfoText}>{warningLight.fixInfo}</Text>
          </View>
        </View>

        {/* Safety Notice */}
        {warningLight.severity === 'critical' && (
          <View style={styles.section}>
            <View style={[styles.card, styles.warningCard]}>
              <Text style={styles.warningTitle}>⚠️ Safety Warning</Text>
              <Text style={styles.warningText}>
                This is a critical warning light. Please take immediate action as directed above.
                Continuing to drive may result in damage to your vehicle or pose safety risks.
              </Text>
            </View>
          </View>
        )}

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#007bff',
    fontWeight: '500',
  },
  severityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  severityText: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  imageSection: {
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  imageContainer: {
    backgroundColor: '#f8f9fa',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },
  warningLightImage: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
  },
  warningLightName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
  },
  section: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 12,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  descriptionText: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 24,
  },
  urgencyCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  urgencyIndicator: {
    marginRight: 12,
    marginTop: 2,
  },
  urgencyIcon: {
    fontSize: 24,
  },
  urgencyText: {
    fontSize: 16,
    color: '#e74c3c',
    fontWeight: '500',
    flex: 1,
    lineHeight: 24,
  },
  fixInfoText: {
    fontSize: 16,
    color: '#495057',
    lineHeight: 24,
  },
  warningCard: {
    backgroundColor: '#fff3cd',
    borderLeftWidth: 4,
    borderLeftColor: '#ffc107',
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#856404',
    marginBottom: 8,
  },
  warningText: {
    fontSize: 14,
    color: '#856404',
    lineHeight: 20,
  },
  bottomSpacer: {
    height: 32,
  },
}); 
