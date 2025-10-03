import React, { useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  TextInput,
  StyleSheet,
  SafeAreaView,
  Alert,
  StatusBar,
} from 'react-native';
import { allWarningLights } from '../data/warningLights';
import { WarningLight } from '../types/WarningLight';

interface WarningLightsScreenProps {
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

export default function WarningLightsScreen({ navigation }: WarningLightsScreenProps) {
  const [searchText, setSearchText] = useState('');
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);

  const filteredLights = useMemo(() => {
    return allWarningLights.filter((light) => {
      const matchesSearch = 
        light.name.toLowerCase().includes(searchText.toLowerCase()) ||
        light.description.toLowerCase().includes(searchText.toLowerCase());
      
      const matchesSeverity = selectedSeverity ? light.severity === selectedSeverity : true;
      
      return matchesSearch && matchesSeverity;
    });
  }, [searchText, selectedSeverity]);

  const renderWarningLight = ({ item }: { item: WarningLight }) => {
    const getImageSource = () => {
      try {
        // In React Native, we need to use require for local images
        switch (item.image) {
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
            return require('../../assets/images/check-engine-light.png'); // fallback
        }
      } catch (error) {
        return require('../../assets/images/check-engine-light.png'); // fallback
      }
    };

    return (
      <TouchableOpacity
        style={styles.warningLightItem}
        onPress={() => navigation.navigate('WarningLightDetail', { warningLight: item })}
      >
        <View style={styles.imageContainer}>
          <Image source={getImageSource()} style={styles.warningLightImage} />
        </View>
        <View style={styles.contentContainer}>
          <View style={styles.headerContainer}>
            <Text style={styles.warningLightName}>{item.name}</Text>
            <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(item.severity) }]}>
              <Text style={styles.severityText}>{getSeverityIcon(item.severity)} {item.severity.toUpperCase()}</Text>
            </View>
          </View>
          <Text style={styles.warningLightDescription} numberOfLines={2}>
            {item.description}
          </Text>
          <Text style={styles.urgencyText} numberOfLines={1}>
            {item.urgency}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderSeverityFilter = () => {
    const severities = ['info', 'warning', 'critical'];
    
    return (
      <View style={styles.filterContainer}>
        <TouchableOpacity
          style={[styles.filterButton, selectedSeverity === null && styles.filterButtonActive]}
          onPress={() => setSelectedSeverity(null)}
        >
          <Text style={[styles.filterButtonText, selectedSeverity === null && styles.filterButtonTextActive]}>
            All
          </Text>
        </TouchableOpacity>
        {severities.map((severity) => (
          <TouchableOpacity
            key={severity}
            style={[styles.filterButton, selectedSeverity === severity && styles.filterButtonActive]}
            onPress={() => setSelectedSeverity(severity)}
          >
            <Text style={[styles.filterButtonText, selectedSeverity === severity && styles.filterButtonTextActive]}>
              {getSeverityIcon(severity)} {severity.charAt(0).toUpperCase() + severity.slice(1)}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8f9fa" />
      <View style={styles.header}>
        <Text style={styles.title}>Warning Lights</Text>
        <Text style={styles.subtitle}>Identify your car's warning lights</Text>
      </View>
      
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search warning lights..."
          value={searchText}
          onChangeText={setSearchText}
          placeholderTextColor="#999"
        />
      </View>

      {renderSeverityFilter()}

      <View style={styles.resultsContainer}>
        <Text style={styles.resultsText}>
          {filteredLights.length} warning light{filteredLights.length !== 1 ? 's' : ''} found
        </Text>
      </View>

      <FlatList
        data={filteredLights}
        keyExtractor={(item) => item.id}
        renderItem={renderWarningLight}
        style={styles.list}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#7f8c8d',
  },
  searchContainer: {
    padding: 16,
    backgroundColor: '#fff',
  },
  searchInput: {
    height: 48,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    backgroundColor: '#f8f9fa',
  },
  filterContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e1e5e9',
  },
  filterButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
  },
  filterButtonActive: {
    backgroundColor: '#007bff',
    borderColor: '#007bff',
  },
  filterButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  filterButtonTextActive: {
    color: '#fff',
  },
  resultsContainer: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#fff',
  },
  resultsText: {
    fontSize: 14,
    color: '#666',
  },
  list: {
    flex: 1,
  },
  listContent: {
    padding: 16,
  },
  warningLightItem: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
  },
  imageContainer: {
    marginRight: 16,
  },
  warningLightImage: {
    width: 60,
    height: 60,
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  warningLightName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    flex: 1,
    marginRight: 8,
  },
  severityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#fff',
  },
  warningLightDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
    lineHeight: 20,
  },
  urgencyText: {
    fontSize: 12,
    color: '#e74c3c',
    fontWeight: '500',
  },
}); 
