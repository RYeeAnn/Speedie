import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  Dimensions,
  Image,
} from 'react-native';

interface HomeScreenProps {
  navigation: any;
}

const { width } = Dimensions.get('window');

const features = [
  {
    id: 'warning-lights',
    title: 'Warning Lights',
    subtitle: 'Identify dashboard alerts',
    icon: '🚨',
    color: '#FF6B6B',
    gradientColors: ['#FF6B6B', '#FF8E8E'],
    active: true,
    route: 'WarningLights',
  },
  {
    id: 'ask-speedy',
    title: 'Ask Speedy AI',
    subtitle: 'Coming soon',
    icon: '🧠',
    color: '#A855F7',
    gradientColors: ['#A855F7', '#C084FC'],
    active: false,
    route: null,
  },
  {
    id: 'maintenance',
    title: 'Maintenance Tips',
    subtitle: 'Keep your car healthy',
    icon: '🔧',
    color: '#10B981',
    gradientColors: ['#10B981', '#34D399'],
    active: false,
    route: null,
  },
  {
    id: 'scheduler',
    title: 'Service Scheduler',
    subtitle: 'Coming soon',
    icon: '📅',
    color: '#3B82F6',
    gradientColors: ['#3B82F6', '#60A5FA'],
    active: false,
    route: null,
  },
  {
    id: 'mileage',
    title: 'Mileage Tracker',
    subtitle: 'Track your drives',
    icon: '📊',
    color: '#EC4899',
    gradientColors: ['#EC4899', '#F472B6'],
    active: false,
    route: null,
  },
  {
    id: 'mechanic',
    title: 'Find a Mechanic',
    subtitle: 'Locate nearby services',
    icon: '🔍',
    color: '#F59E0B',
    gradientColors: ['#F59E0B', '#FBBF24'],
    active: false,
    route: null,
  },
];

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const handleFeaturePress = (feature: any) => {
    if (feature.active && feature.route) {
      navigation.navigate(feature.route);
    }
  };

  const renderFeatureCard = (feature: any, index: number) => {
    return (
      <TouchableOpacity
        key={feature.id}
        style={[
          styles.featureCard,
          { opacity: feature.active ? 1 : 0.6 },
          index % 2 === 0 ? styles.leftCard : styles.rightCard,
        ]}
        onPress={() => handleFeaturePress(feature)}
        disabled={!feature.active}
        activeOpacity={0.8}
      >
        <View style={[styles.cardGradient, { backgroundColor: feature.color }]}>
          <View style={styles.cardContent}>
            <Text style={styles.featureIcon}>{feature.icon}</Text>
            <Text style={styles.featureTitle}>{feature.title}</Text>
            <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
            {!feature.active && (
              <View style={styles.comingSoonBadge}>
                <Text style={styles.comingSoonText}>Soon</Text>
              </View>
            )}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8FAFC" />
      
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Image 
              source={require('../../assets/images/subie.jpg')} 
              style={styles.logoImage}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.appTitle}>Speedie</Text>
            <Text style={styles.appSubtitle}>Your Car Care Companion</Text>
          </View>
        </View>
        
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>Welcome back!</Text>
          <Text style={styles.welcomeSubtext}>What would you like to check today?</Text>
        </View>
      </View>

      {/* Features Grid */}
      <ScrollView 
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.featuresContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.featuresGrid}>
            {features.map((feature, index) => renderFeatureCard(feature, index))}
          </View>
        </View>

        {/* Stats Section */}
        <View style={styles.statsSection}>
          <Text style={styles.sectionTitle}>Your Car Health</Text>
          <View style={styles.statsContainer}>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>✅</Text>
              <Text style={styles.statValue}>All Good</Text>
              <Text style={styles.statLabel}>Current Status</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statIcon}>🏁</Text>
              <Text style={styles.statValue}>Ready</Text>
              <Text style={styles.statLabel}>To Drive</Text>
            </View>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Developed by Ryan Yee</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#FEF3C7',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoText: {
    fontSize: 28,
  },
  logoImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  titleContainer: {
    flex: 1,
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#F59E0B',
    marginBottom: 2,
  },
  appSubtitle: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '500',
  },
  welcomeSection: {
    marginBottom: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  welcomeSubtext: {
    fontSize: 16,
    color: '#64748B',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  featuresContainer: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureCard: {
    width: (width - 60) / 2,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  leftCard: {
    marginRight: 8,
  },
  rightCard: {
    marginLeft: 8,
  },
  cardGradient: {
    padding: 20,
    minHeight: 140,
    justifyContent: 'center',
    position: 'relative',
  },
  cardContent: {
    alignItems: 'center',
  },
  featureIcon: {
    fontSize: 32,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFFFFF',
    textAlign: 'center',
    marginBottom: 4,
  },
  featureSubtitle: {
    fontSize: 12,
    color: '#FFFFFF',
    textAlign: 'center',
    opacity: 0.9,
  },
  comingSoonBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 8,
  },
  comingSoonText: {
    fontSize: 10,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  statsSection: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginHorizontal: 6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#64748B',
    textAlign: 'center',
  },
  footer: {
    paddingTop: 40,
    paddingBottom: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#94A3B8',
    fontStyle: 'italic',
  },
}); 
