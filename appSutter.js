import React, { useState } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ScrollView, SafeAreaView, Switch, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';

export default function App() {
  const [activeTab, setActiveTab] = useState('HOME');
  const [isSynced, setIsSynced] = useState(true);

  // Stati interattivi per simulare una vera app
  const [targetTemp, setTargetTemp] = useState(23.5);
  const [coolingIntensity, setCoolingIntensity] = useState(40);

  // Stati per le impostazioni del profilo
  const [autoSync, setAutoSync] = useState(true);
  const [shareData, setShareData] = useState(false);
  const [pushNotif, setPushNotif] = useState(true);

  // --- FUNZIONI INTERATTIVE ---
  const handleCooling = () => {
    setTargetTemp(prev => parseFloat((prev - 0.5).toFixed(1)));
    setCoolingIntensity(prev => Math.min(prev + 10, 100));
  };

  const handleHeating = () => {
    setTargetTemp(prev => parseFloat((prev + 0.5).toFixed(1)));
    setCoolingIntensity(prev => Math.max(prev - 10, 0));
  };

  // --- COMPONENTI UI ---

  const HubView = () => (
    <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.headerRow}>
        <View>
          <Text style={styles.title}>Symbio<Text style={{color: '#00ff80', fontWeight: '800'}}>Skin</Text></Text>
          <Text style={styles.subtitle}>CLUSTER BIOMETRICO ATTIVO</Text>
        </View>
        <TouchableOpacity style={styles.notificationBtn}>
          <Feather name="bell" size={20} color="#00ff80" />
          <View style={styles.badge} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={[
          styles.syncButton,
          {
            borderColor: isSynced ? '#00ff80' : '#ff4757',
            backgroundColor: isSynced ? 'rgba(0, 255, 128, 0.05)' : 'rgba(255, 71, 87, 0.05)'
          }
        ]}
        onPress={() => setIsSynced(!isSynced)}>
        <Feather name={isSynced ? "check-circle" : "alert-circle"} size={16} color={isSynced ? '#00ff80' : '#ff4757'} style={{marginRight: 8}}/>
        <Text style={[styles.syncText, { color: isSynced ? '#00ff80' : '#ff4757' }]}>
          {isSynced ? 'SISTEMA SINCRONIZZATO' : 'DISPOSITIVO DISCONNESSO'}
        </Text>
      </TouchableOpacity>

      <View style={styles.braccioCard}>
        <View style={styles.braccioGridOverlay}>
          {/* Decorative sci-fi lines */}
          <View style={[styles.gridLine, {top: '30%', width: '100%'}, styles.dashed]} />
          <View style={[styles.gridLine, {top: '60%', width: '100%'}, styles.dashed]} />
          <View style={[styles.gridLine, {left: '33%', height: '100%'}, styles.dashed]} />
          <View style={[styles.gridLine, {left: '66%', height: '100%'}, styles.dashed]} />
        </View>
        <View style={styles.braccioImagePlaceholder}>
          <Feather name="activity" size={40} color="#00ff80" style={styles.glowIcon} />
          <Text style={{color: '#00ff80', fontFamily: 'Outfit', fontWeight: 'bold', fontSize: 13, marginTop: 8, letterSpacing: 1}}>INTERACTIVE 3D LAYER</Text>
          <Text style={{color: '#979ba8', fontSize: 9, marginTop: 4, letterSpacing: 1}}>BIOMETRIC COMFORT LINKED</Text>
        </View>
        <View style={styles.braccioOverlay}>
           <Text style={styles.braccioText}>SYMBIOSKIN MODEL V1.0</Text>
        </View>
      </View>

      <View style={styles.cardGrid}>
        <View style={[styles.card, styles.gridCard]}>
          <View style={styles.cardHeaderSmall}>
            <Feather name="thermometer" size={16} color="#00ccff" />
            <Text style={styles.cardTitle}>Pelle</Text>
          </View>
          <Text style={styles.gridValue}>36.4°C</Text>
          <Text style={styles.statusTextGreen}>Ottimale</Text>
        </View>

        <View style={[styles.card, styles.gridCard]}>
          <View style={styles.cardHeaderSmall}>
            <Feather name="heart" size={16} color="#ff4757" />
            <Text style={styles.cardTitle}>Battito</Text>
          </View>
          <Text style={styles.gridValue}>72 <Text style={{fontSize: 12, color: '#979ba8'}}>bpm</Text></Text>
          <Text style={styles.statusTextNeutral}>A riposo</Text>
        </View>

        <View style={[styles.card, styles.gridCard]}>
          <View style={styles.cardHeaderSmall}>
            <Feather name="droplet" size={16} color="#00ff80" />
            <Text style={styles.cardTitle}>Sudore</Text>
          </View>
          <Text style={styles.gridValue}>0.12 <Text style={{fontSize: 12, color: '#979ba8'}}>mg</Text></Text>
          <Text style={styles.statusTextGreen}>Bilanciato</Text>
        </View>

        <View style={[styles.card, styles.gridCard]}>
          <View style={styles.cardHeaderSmall}>
            <Feather name="map-pin" size={16} color="#ffa502" />
            <Text style={styles.cardTitle}>Stanza</Text>
          </View>
          <Text style={styles.gridValue}>Ufficio 4</Text>
          <Text style={styles.statusTextOrange}>Cluster Attivo</Text>
        </View>
      </View>

      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Feather name="sliders" size={18} color="#00ff80" />
          <Text style={[styles.cardHeaderTitle, {marginLeft: 8}]}>Comfort Termico: {targetTemp}°C</Text>
        </View>
        <View style={styles.comfortControls}>
          <View style={styles.sliderWrapper}>
            <View style={styles.sliderLabelRow}>
              <Text style={styles.comfortLabel}>INTENSITÀ FLUSSO LOCALIZZATO</Text>
              <Text style={[styles.comfortLabel, {color: '#00ff80', fontWeight: 'bold'}]}>{coolingIntensity}%</Text>
            </View>
            <View style={styles.sliderBackground}>
                <View style={[styles.sliderFill, { width: `${coolingIntensity}%` }]} />
            </View>
          </View>
          <View style={styles.comfortButtons}>
            <TouchableOpacity style={styles.comfortBtnOutline} onPress={handleHeating}>
              <Feather name="sun" size={16} color="#ffa502" style={{marginRight: 6}} />
              <Text style={styles.comfortBtnTextDark}>RISCALDA</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.comfortBtn} onPress={handleCooling}>
              <Feather name="wind" size={16} color="#06070a" style={{marginRight: 6}} />
              <Text style={styles.comfortBtnText}>RAFFREDDA</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={{height: 20}}/>
    </ScrollView>
  );

  const ImpactView = () => (
    <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Impatto</Text>
        <Text style={styles.subtitle}>Efficienza Energetica Globale</Text>
      </View>

      <View style={[styles.card, styles.highlightCard]}>
        <View style={styles.highlightHeader}>
          <Feather name="globe" size={24} color="#06070a" />
          <Text style={styles.highlightTitle}>Eco Balance</Text>
        </View>
        <Text style={styles.highlightLarge}>+ 5 Alberi</Text>
        <Text style={styles.highlightSub}>Equivalente di CO2 risparmiata questo mese rispetto ad aria condizionata standard dell'edificio.</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitleSection}>LOG ATTIVAZIONI RECENTI</Text>
        {[
          { time: 'Oggi, 14:30', zone: 'Sala Riunioni A', saved: '0.4 kWh' },
          { time: 'Oggi, 11:15', zone: 'Ufficio 4', saved: '0.8 kWh' },
          { time: 'Ieri, 16:45', zone: 'Area Relax', saved: '0.2 kWh' },
        ].map((log, i) => (
          <View key={i} style={styles.listRow}>
             <View style={styles.listIconBg}><Feather name="zap" size={14} color="#00ff80" /></View>
             <View style={styles.listText}>
               <Text style={styles.listTitle}>{log.zone}</Text>
               <Text style={styles.listSubtitle}>{log.time}</Text>
             </View>
             <Text style={styles.listAction}>-{log.saved}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );

  const SavingsView = () => {
    const [timeframe, setTimeframe] = useState('month');

    return (
      <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.title}>Risparmi</Text>
          <Text style={styles.subtitle}>Resoconto Economico</Text>
        </View>

        {/* Selettore Temporale */}
        <View style={styles.segmentControl}>
           <TouchableOpacity
              style={timeframe === 'month' ? styles.segmentActive : styles.segmentInactive}
              onPress={() => setTimeframe('month')}>
              <Text style={timeframe === 'month' ? styles.segmentTextActive : styles.segmentTextInactive}>Mensile</Text>
           </TouchableOpacity>
           <TouchableOpacity
              style={timeframe === 'year' ? styles.segmentActive : styles.segmentInactive}
              onPress={() => setTimeframe('year')}>
              <Text style={timeframe === 'year' ? styles.segmentTextActive : styles.segmentTextInactive}>Annuale</Text>
           </TouchableOpacity>
        </View>

        {/* Proiezione Principale */}
        <View style={styles.card}>
            <View style={styles.cardHeaderRow}>
               <Text style={styles.cardTitle}>PROIEZIONE {timeframe === 'month' ? 'MENSILE' : 'ANNUALE'}</Text>
               <Feather name="trending-down" size={18} color="#00ff80" />
            </View>
            <Text style={styles.statLargeValue}>{timeframe === 'month' ? '€ 38.50' : '€ 415.20'}</Text>
            <Text style={styles.statusTextGreen}>+12% efficienza vs mese precedente</Text>
        </View>

        {/* Breakdown dei risparmi */}
        <View style={styles.row}>
           <View style={[styles.card, styles.halfCard]}>
              <Feather name="wind" size={18} color="#00ccff" style={{marginBottom: 8}}/>
              <Text style={styles.cardTitle}>Raffreddamento</Text>
              <Text style={styles.gridValueSmall}>{timeframe === 'month' ? '€ 22.10' : '€ 245.00'}</Text>
           </View>
           <View style={[styles.card, styles.halfCard]}>
              <Feather name="sun" size={18} color="#ffa502" style={{marginBottom: 8}}/>
              <Text style={styles.cardTitle}>Riscaldamento</Text>
              <Text style={styles.gridValueSmall}>{timeframe === 'month' ? '€ 16.40' : '€ 170.20'}</Text>
           </View>
        </View>

        {/* Grafico Consumi Arricchito */}
        <View style={styles.card}>
          <Text style={styles.cardTitleSection}>CONFRONTO CONSUMI (KWH)</Text>
          <Text style={styles.settingSub}>Il tuo cluster vs. Sistema HVAC tradizionale</Text>
          <View style={styles.chartContainer}>
            {[
              { label: 'HVAC STD', val: 110, color: '#161922', text: '#979ba8', display: timeframe === 'month' ? '210' : '2300' },
              { label: 'SYMBIOSKIN', val: 45, color: '#00ff80', text: '#00ff80', display: timeframe === 'month' ? '65' : '820' }
            ].map((bar, index) => (
               <View key={index} style={styles.barWrapper}>
                <Text style={[styles.barValueTop, {color: bar.text}]}>{bar.display}</Text>
                <View style={[styles.bar, { height: bar.val, backgroundColor: bar.color, width: 45 }]} />
                <Text style={[styles.barLabel, {color: bar.text, fontWeight: 'bold'}]}>{bar.label}</Text>
               </View>
            ))}
          </View>
          <View style={styles.savingsBadge}>
              <Feather name="award" size={16} color="#00ff80" style={{marginRight: 6}}/>
              <Text style={styles.savingsBadgeText}>Costi operativi ridotti del 69%</Text>
          </View>
        </View>

        {/* Gamification / ROI dell'hardware */}
        <View style={styles.card}>
           <Text style={styles.cardTitleSection}>HARDWARE PAYBACK</Text>
           <View style={styles.progressHeader}>
              <Text style={styles.progressText}>Ammortamento SymbioSkin</Text>
              <Text style={styles.progressPercent}>45%</Text>
           </View>
           <View style={styles.progressBarBg}>
              <View style={[styles.progressBarFill, {width: '45%'}]} />
           </View>
           <Text style={styles.settingSub}>Ancora € 115 di risparmio per ammortizzare totalmente il costo del layer.</Text>
        </View>

        <View style={{height: 30}}/>
      </ScrollView>
    );
  };

  const ProfileView = () => (
    <ScrollView style={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Profilo</Text>
        <Text style={styles.subtitle}>Impostazioni Utente</Text>
      </View>

      <View style={styles.profileHeader}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>PO</Text>
        </View>
        <View style={styles.profileInfo}>
          <Text style={styles.mainValueProfile}>Pietro Orciuolo</Text>
          <Text style={styles.statusTextGreen}>ID: SYM-4892-XT</Text>
        </View>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitleSection}>PREFERENZE DI SISTEMA</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>Sincronizzazione Automatica</Text>
            <Text style={styles.settingSub}>Connetti automaticamente ai building vicini</Text>
          </View>
          <Switch value={autoSync} onValueChange={setAutoSync} trackColor={{ false: "#1d222e", true: "#00ff80" }} thumbColor={autoSync ? "#06070a" : "#979ba8"} />
        </View>
        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>Notifiche Push</Text>
            <Text style={styles.settingSub}>Avvisi su risparmi e comfort</Text>
          </View>
          <Switch value={pushNotif} onValueChange={setPushNotif} trackColor={{ false: "#1d222e", true: "#00ff80" }} thumbColor={pushNotif ? "#06070a" : "#979ba8"} />
        </View>
        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <View style={styles.settingTextContainer}>
            <Text style={styles.settingTitle}>Condivisione Dati Anonimi</Text>
            <Text style={styles.settingSub}>Aiuta a migliorare l'algoritmo globale</Text>
          </View>
          <Switch value={shareData} onValueChange={setShareData} trackColor={{ false: "#1d222e", true: "#00ff80" }} thumbColor={shareData ? "#06070a" : "#979ba8"} />
        </View>
      </View>

      <TouchableOpacity style={styles.logoutBtn}>
        <Feather name="log-out" size={16} color="#ff4757" style={{marginRight: 8}} />
        <Text style={styles.logoutText}>Disconnetti Dispositivo</Text>
      </TouchableOpacity>
      <View style={{height: 40}}/>
    </ScrollView>
  );

  const getIconName = (tabName) => {
    switch(tabName) {
      case 'HOME': return 'cpu';
      case 'Impact': return 'activity';
      case 'Savings': return 'trending-down';
      case 'Profile': return 'user';
      default: return 'circle';
    }
  };

  const renderActiveView = () => {
    switch (activeTab) {
      case 'HOME': return <HubView />;
      case 'Impact': return <ImpactView />;
      case 'Savings': return <SavingsView />;
      case 'Profile': return <ProfileView />;
      default: return <HubView />;
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#06070a" />
      {renderActiveView()}

      <View style={styles.tabBar}>
        {['HOME', 'Impact', 'Savings', 'Profile'].map(tab => (
          <TouchableOpacity key={tab} style={styles.tabItem} onPress={() => setActiveTab(tab)}>
            <Feather
              name={getIconName(tab)}
              size={20}
              color={activeTab === tab ? '#00ff80' : '#979ba8'}
              style={activeTab === tab ? styles.activeTabIcon : {marginBottom: 4}}
            />
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab === 'HOME' ? 'PRODOTTO' : tab.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

// --- STILI MODERNI SCIFI / DARK ---
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#06070a' },
  scrollContent: { padding: 20, paddingTop: 20 },
  headerRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 25 },
  header: { marginBottom: 25 },
  title: { fontSize: 28, fontWeight: '800', color: '#f1f2f6', letterSpacing: 2 },
  subtitle: { fontSize: 10, color: '#00ff80', textTransform: 'uppercase', letterSpacing: 2, marginTop: 4, fontWeight: '700' },

  notificationBtn: { padding: 10, backgroundColor: '#11131a', borderRadius: 20, position: 'relative', borderWidth: 1, borderColor: '#1d222e' },
  badge: { position: 'absolute', top: 8, right: 10, width: 8, height: 8, backgroundColor: '#ff4757', borderRadius: 4, borderWidth: 1, borderColor: '#06070a' },

  syncButton: { flexDirection: 'row', borderWidth: 1, padding: 14, borderRadius: 30, alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  syncText: { fontSize: 11, fontWeight: 'bold', letterSpacing: 1.5 },

  card: { backgroundColor: '#11131a', padding: 20, borderRadius: 18, marginBottom: 15, borderWidth: 1, borderColor: '#1d222e', shadowColor: '#000', shadowOpacity: 0.1, shadowRadius: 10, elevation: 4 },
  cardGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', marginBottom: 5 },
  gridCard: { width: '48%', padding: 16, marginBottom: 15 },

  braccioCard: { backgroundColor: '#11131a', borderRadius: 18, marginBottom: 20, borderWidth: 1, borderColor: '#1d222e', overflow: 'hidden', height: 180, position: 'relative', alignItems: 'center', justifyContent: 'center' },
  braccioGridOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.15 },
  gridLine: { position: 'absolute', backgroundColor: '#00ff80' },
  dashed: { borderWidth: 0.5, borderStyle: 'dashed', borderColor: '#00ff80' },
  braccioImagePlaceholder: { alignItems: 'center' },
  glowIcon: { shadowColor: '#00ff80', shadowOpacity: 0.5, shadowRadius: 10, elevation: 5 },
  braccioOverlay: { position: 'absolute', bottom: 0, left: 0, right: 0, backgroundColor: 'rgba(6, 7, 10, 0.85)', padding: 10, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#1d222e' },
  braccioText: { fontSize: 10, color: '#00ff80', textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 'bold' },

  cardHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  cardHeaderSmall: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  cardHeaderRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  cardTitle: { fontSize: 11, color: '#979ba8', textTransform: 'uppercase', letterSpacing: 1 },
  cardTitleSection: { fontSize: 11, color: '#00ff80', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 15, fontWeight: '700' },
  cardHeaderTitle: { fontSize: 14, color: '#f1f2f6', fontWeight: 'bold' },
  gridValue: { fontSize: 22, fontWeight: '700', color: '#f1f2f6' },
  gridValueSmall: { fontSize: 18, fontWeight: '700', color: '#f1f2f6', marginTop: 4 },
  statLargeValue: { fontSize: 44, fontWeight: '800', color: '#00ff80', marginVertical: 10 },
  statusTextGreen: { fontSize: 11, color: '#00ff80', marginTop: 6, fontWeight: '600' },
  statusTextAzure: { fontSize: 11, color: '#00ccff', marginTop: 6, fontWeight: '600' },
  statusTextOrange: { fontSize: 11, color: '#ffa502', marginTop: 6, fontWeight: '600' },
  statusTextNeutral: { fontSize: 11, color: '#979ba8', marginTop: 6 },

  comfortControls: { marginTop: 5 },
  sliderWrapper: { marginBottom: 20 },
  sliderLabelRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 8 },
  comfortLabel: { fontSize: 10, color: '#979ba8', textTransform: 'uppercase', letterSpacing: 1 },
  sliderBackground: { height: 6, backgroundColor: '#1d222e', borderRadius: 3, overflow: 'hidden' },
  sliderFill: { height: '100%', backgroundColor: '#00ff80', borderRadius: 3 },
  comfortButtons: { flexDirection: 'row', justifyContent: 'space-between' },
  comfortBtn: { flexDirection: 'row', padding: 12, backgroundColor: '#00ff80', borderRadius: 12, width: '48%', alignItems: 'center', justifyContent: 'center', shadowColor: '#00ff80', shadowOpacity: 0.2, shadowRadius: 5 },
  comfortBtnOutline: { flexDirection: 'row', padding: 12, backgroundColor: 'transparent', borderWidth: 1, borderColor: '#1d222e', borderRadius: 12, width: '48%', alignItems: 'center', justifyContent: 'center' },
  comfortBtnText: { color: '#06070a', fontSize: 12, fontWeight: 'bold' },
  comfortBtnTextDark: { color: '#ffa502', fontSize: 12, fontWeight: 'bold' },

  highlightCard: { backgroundColor: '#00ff80', borderColor: '#00ff80', shadowColor: '#00ff80', shadowOpacity: 0.2 },
  highlightHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 },
  highlightTitle: { color: '#06070a', fontSize: 11, textTransform: 'uppercase', letterSpacing: 1.5, fontWeight: 'bold' },
  highlightLarge: { color: '#06070a', fontSize: 38, fontWeight: '800', marginVertical: 5 },
  highlightSub: { color: '#06070a', fontSize: 12, lineHeight: 18, opacity: 0.8 },

  listRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, borderBottomWidth: 1, borderBottomColor: '#1d222e' },
  listIconBg: { padding: 8, backgroundColor: 'rgba(0, 255, 128, 0.08)', borderRadius: 10, marginRight: 15 },
  listText: { flex: 1 },
  listTitle: { fontSize: 14, fontWeight: '700', color: '#f1f2f6' },
  listSubtitle: { fontSize: 12, color: '#979ba8', marginTop: 2 },
  listAction: { fontSize: 14, fontWeight: 'bold', color: '#ff4757' },

  chartContainer: { flexDirection: 'row', justifyContent: 'space-around', alignItems: 'flex-end', height: 160, marginTop: 20, paddingBottom: 10 },
  barWrapper: { alignItems: 'center', width: '40%' },
  bar: { width: '100%', borderRadius: 8, minHeight: 10 },
  barLabel: { fontSize: 11, marginTop: 10, letterSpacing: 0.5 },

  profileHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 30, paddingHorizontal: 5 },
  avatar: { width: 62, height: 62, borderRadius: 31, backgroundColor: 'rgba(0, 255, 128, 0.08)', borderWidth: 1.5, borderColor: '#00ff80', alignItems: 'center', justifyContent: 'center', marginRight: 20 },
  avatarText: { fontSize: 20, color: '#00ff80', fontWeight: 'bold', letterSpacing: 1 },
  mainValueProfile: { fontSize: 24, fontWeight: '700', color: '#f1f2f6' },

  settingRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 18 },
  settingTextContainer: { flex: 1, paddingRight: 20 },
  settingTitle: { fontSize: 14, fontWeight: '700', color: '#f1f2f6' },
  settingSub: { fontSize: 12, color: '#979ba8', marginTop: 4 },
  divider: { height: 1, backgroundColor: '#1d222e' },

  logoutBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 15, borderRadius: 14, backgroundColor: 'rgba(255, 71, 87, 0.05)', borderWidth: 1, borderColor: '#ff4757', marginHorizontal: 5, marginTop: 20 },
  logoutText: { color: '#ff4757', fontWeight: 'bold', fontSize: 14 },

  tabBar: { flexDirection: 'row', backgroundColor: '#06070a', borderTopWidth: 1, borderColor: '#1d222e', paddingBottom: 25, paddingTop: 10 },
  tabItem: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  activeTabIcon: { textShadowColor: '#00ff80', textShadowRadius: 10, shadowOpacity: 0.5, marginBottom: 4 },
  tabText: { color: '#979ba8', fontSize: 9, letterSpacing: 1, marginTop: 2 },
  tabTextActive: { color: '#00ff80', fontWeight: 'bold' },

  segmentControl: { flexDirection: 'row', backgroundColor: '#11131a', borderRadius: 12, padding: 4, marginBottom: 25, borderWidth: 1, borderColor: '#1d222e' },
  segmentActive: { flex: 1, backgroundColor: '#06070a', paddingVertical: 10, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#1d222e' },
  segmentInactive: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: 'center', backgroundColor: 'transparent' },
  segmentTextActive: { color: '#00ff80', fontSize: 13, fontWeight: 'bold' },
  segmentTextInactive: { color: '#979ba8', fontSize: 13, fontWeight: '500' },

  barValueTop: { fontSize: 15, fontWeight: 'bold', marginBottom: 8 },
  savingsBadge: { flexDirection: 'row', backgroundColor: 'rgba(0, 255, 128, 0.05)', padding: 12, borderRadius: 12, alignItems: 'center', justifyContent: 'center', marginTop: 15, borderWidth: 1, borderColor: 'rgba(0, 255, 128, 0.1)' },
  savingsBadgeText: { color: '#00ff80', fontWeight: 'bold', fontSize: 12, letterSpacing: 0.5 },

  progressHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10, marginTop: 5 },
  progressText: { fontSize: 13, color: '#f1f2f6', fontWeight: '600' },
  progressPercent: { fontSize: 13, color: '#00ff80', fontWeight: 'bold' },
  progressBarBg: { height: 8, backgroundColor: '#1d222e', borderRadius: 4, overflow: 'hidden', marginBottom: 10 },
  progressBarFill: { height: '100%', backgroundColor: '#00ff80', borderRadius: 4 },

  row: { flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' },
  halfCard: { width: '48%' }
});