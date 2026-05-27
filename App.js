import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    ScrollView,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
    useColorScheme,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const TABS = [
    { key: 'HOME', label: 'DASHBOARD', icon: 'grid' },
    { key: 'ABOUT', label: "COS'È", icon: 'layers' },
    { key: 'ENERGY', label: 'CONSUMI', icon: 'activity' },
    { key: 'PROFILE', label: 'PROFILO', icon: 'user' },
];

const THEME_MODES = [
    { key: 'system', label: 'Dispositivo', icon: 'smartphone' },
    { key: 'dark', label: 'Scuro', icon: 'moon' },
    { key: 'light', label: 'Chiaro', icon: 'sun' },
];

const HOME_HIGHLIGHTS = [
    { icon: 'activity', label: 'Temp. pelle', value: '36.6°C' },
    { icon: 'wind', label: 'Comfort stanza', value: '22.0°C' },
    { icon: 'droplet', label: 'Umidità', value: '48%' },
];

const PROBLEM_POINTS = [
    {
        icon: 'smartphone',
        title: 'Seconda pelle attiva',
        text: 'SymbioSkin si indossa, legge i tuoi segnali biometrici e trasforma il comfort termico in un’esperienza personale.',
    },
    {
        icon: 'cpu',
        title: 'Lettura continua',
        text: 'Sensori e AI monitorano temperatura, sudorazione e risposta corporea per capire come stai in questo momento.',
    },
    {
        icon: 'wind',
        title: 'Reazione adattiva',
        text: 'L’app mostra i parametri attuali e sincronizza il sistema per mantenere il comfort senza sprechi energetici.',
    },
];

const TECH_CARDS = [
    {
        icon: 'cpu',
        title: 'Biosensori epidermici',
        text: 'Rilevazione continua di temperatura cutanea, sudorazione, battito e segnali di stress termico.',
        bullets: ['Temperatura cutanea', 'Sudorazione real-time', 'Frequenza cardiaca + HRV'],
    },
    {
        icon: 'trending-up',
        title: 'AI predittiva',
        text: 'Modella la firma termica personale e anticipa il discomfort prima che venga percepito.',
        bullets: ['Previsione discomfort', 'Sync con HVAC', 'Ottimizzazione personalizzata'],
    },
    {
        icon: 'zap',
        title: 'Energy harvesting',
        text: 'Il calore corporeo e il movimento supportano l’autonomia del layer intelligente.',
        bullets: ['Auto-alimentazione', 'Bassa manutenzione', 'Impronta ridotta'],
    },
];

const ENERGY_METRICS = [
    { label: 'Energia risparmiata', value: '2.4 kWh', detail: 'Risparmio stimato sulle ultime 24 ore.' },
    { label: 'Comfort score', value: '92%', detail: 'Indice sintetico di benessere termico attuale.' },
    { label: 'CO₂ evitata', value: '1.8 kg', detail: 'Emissioni non generate grazie all’ottimizzazione.' },
    { label: 'Layer attivi', value: '3/3', detail: 'Sensori, AI e sincronizzazione risultano operativi.' },
];

const USAGE_LOGS = [
    { time: 'Oggi, 14:30', zone: 'Zona giorno', saved: '0.4 kWh' },
    { time: 'Oggi, 11:15', zone: 'Studio', saved: '0.8 kWh' },
    { time: 'Ieri, 16:45', zone: 'Camera', saved: '0.2 kWh' },
];

const DEVICE_MODULES = [
    {
        icon: 'package',
        title: 'Stato del dispositivo',
        bullets: ['Patch indossata', 'Batteria OK', 'Sincronizzazione attiva', 'Sensori stabili'],
    },
    {
        icon: 'users',
        title: 'Aree attive',
        bullets: ['Casa', 'Ufficio', 'Area relax', 'Modalità notturna'],
    },
    {
        icon: 'award',
        title: 'Supporto cliente',
        bullets: ['Guida rapida', 'Assistenza remota', 'Aggiornamenti software', 'Profilo utente'],
    },
];

const VALUE_PILLARS = [
    'Comfort biometrico personalizzato',
    'Parametri chiari in tempo reale',
    'Consumi sotto controllo',
    'Sincronizzazione con l’ambiente',
    'Design premium e semplice da usare',
];

const COMFORT_PRESETS = [
    { label: 'Riscalda', delta: 0.5, intensity: -10, icon: 'sun' },
    { label: 'Raffredda', delta: -0.5, intensity: 10, icon: 'wind' },
];

const createTheme = (mode) => {
    const isDark = mode === 'dark';

    if (isDark) {
        return {
            mode,
            background: '#06070a',
            backgroundSoft: '#0b0f15',
            surface: 'rgba(13, 15, 20, 0.84)',
            surfaceStrong: 'rgba(17, 20, 28, 0.95)',
            surfaceMuted: 'rgba(255, 255, 255, 0.04)',
            text: '#f2f4f8',
            textSecondary: '#c3c8d2',
            textMuted: '#8e96a3',
            primary: '#00ccff',
            primarySoft: 'rgba(0, 204, 255, 0.16)',
            secondary: '#ff4d6d',
            secondarySoft: 'rgba(255, 77, 109, 0.12)',
            warning: '#ffb74d',
            success: '#43f49a',
            border: 'rgba(255, 255, 255, 0.08)',
            borderStrong: 'rgba(0, 204, 255, 0.24)',
            glow: 'rgba(0, 204, 255, 0.24)',
            shadowColor: '#000',
            tabBar: 'rgba(6, 7, 10, 0.88)',
            cardTint: 'rgba(0, 204, 255, 0.04)',
        };
    }

    return {
        mode,
        background: '#f4f6f8',
        backgroundSoft: '#ffffff',
        surface: 'rgba(255, 255, 255, 0.82)',
        surfaceStrong: 'rgba(255, 255, 255, 0.96)',
        surfaceMuted: 'rgba(15, 16, 22, 0.04)',
        text: '#0f1016',
        textSecondary: '#31313a',
        textMuted: '#69707d',
        primary: '#0a8fb0',
        primarySoft: 'rgba(10, 143, 176, 0.12)',
        secondary: '#c91f3b',
        secondarySoft: 'rgba(201, 31, 59, 0.10)',
        warning: '#b77812',
        success: '#167f54',
        border: 'rgba(15, 16, 22, 0.08)',
        borderStrong: 'rgba(10, 143, 176, 0.18)',
        glow: 'rgba(10, 143, 176, 0.14)',
        shadowColor: '#000',
        tabBar: 'rgba(244, 246, 248, 0.92)',
        cardTint: 'rgba(10, 143, 176, 0.04)',
    };
};

const createStyles = (colors, compact) =>
    StyleSheet.create({
        container: {
            flex: 1,
            backgroundColor: colors.background,
        },
        backgroundLayer: {
            ...StyleSheet.absoluteFillObject,
        },
        orb: {
            position: 'absolute',
            borderRadius: 999,
            opacity: 0.7,
        },
        orbPrimary: {
            width: 180,
            height: 180,
            backgroundColor: colors.primarySoft,
            top: -30,
            right: -30,
        },
        orbSecondary: {
            width: 220,
            height: 220,
            backgroundColor: colors.secondarySoft,
            bottom: 160,
            left: -80,
        },
        shimmerLine: {
            position: 'absolute',
            left: 16,
            right: 16,
            top: 0,
            height: 1,
            backgroundColor: colors.borderStrong,
        },
        content: {
            flex: 1,
        },
        scrollContent: {
            paddingHorizontal: 16,
            paddingTop: 30,
            paddingBottom: 30,
        },
        headerRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12,
            marginTop: 4,
        },
        brandWrap: {
            flex: 1,
            paddingRight: 10,
            maxWidth: '70%',
        },
        brand: {
            fontSize: compact ? 20 : 26,
            fontWeight: '800',
            color: colors.text,
            letterSpacing: 1.2,
            lineHeight: compact ? 22 : 28,
        },
        brandTag: {
            marginTop: 6,
            fontSize: 10,
            fontWeight: '700',
            color: colors.primary,
            letterSpacing: 1.4,
            textTransform: 'uppercase',
        },
        headerActions: {
            flexDirection: 'row',
            alignItems: 'center',
        },
        iconButton: {
            width: 42,
            height: 42,
            borderRadius: 21,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            marginLeft: 10,
            shadowColor: colors.shadowColor,
            shadowOpacity: 0.08,
            shadowRadius: 14,
            shadowOffset: { width: 0, height: 8 },
            elevation: 4,
        },
        syncButton: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 12,
            height: 42,
            borderRadius: 21,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            marginLeft: 10,
        },
        syncText: {
            marginLeft: 8,
            fontSize: 9,
            fontWeight: '800',
            letterSpacing: 1.1,
            color: colors.primary,
        },
        syncTextMuted: {
            color: colors.textMuted,
        },
        tabBar: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingTop: 10,
            paddingBottom: 16,
            paddingHorizontal: 8,
            backgroundColor: colors.tabBar,
            borderTopWidth: 1,
            borderTopColor: colors.border,
        },
        tabItem: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 8,
        },
        tabText: {
            marginTop: 4,
            fontSize: 9,
            fontWeight: '700',
            letterSpacing: 1.1,
            color: colors.textMuted,
        },
        tabTextActive: {
            color: colors.primary,
        },
        card: {
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 24,
            padding: 18,
            marginBottom: 16,
            overflow: 'hidden',
            shadowColor: colors.shadowColor,
            shadowOpacity: isDarkShadow(colors) ? 0.28 : 0.08,
            shadowRadius: 20,
            shadowOffset: { width: 0, height: 12 },
            elevation: 6,
        },
        cardStrong: {
            backgroundColor: colors.surfaceStrong,
        },
        heroCard: {
            padding: compact ? 14 : 18,
            borderColor: colors.borderStrong,
            backgroundColor: colors.surfaceStrong,
        },
        badge: {
            alignSelf: 'flex-start',
            paddingHorizontal: 14,
            paddingVertical: 7,
            borderRadius: 999,
            backgroundColor: colors.primarySoft,
            borderWidth: 1,
            borderColor: colors.borderStrong,
            marginBottom: 14,
        },
        badgeText: {
            fontSize: 10,
            fontWeight: '800',
            color: colors.primary,
            textTransform: 'uppercase',
            letterSpacing: 1.4,
        },
        heroTitle: {
            fontSize: compact ? 22 : 29,
            fontWeight: '800',
            lineHeight: compact ? 26 : 34,
            color: colors.text,
            letterSpacing: -0.6,
        },
        heroTitleAccent: {
            color: colors.primary,
        },
        heroDesc: {
            marginTop: 12,
            color: colors.textSecondary,
            fontSize: 13,
            lineHeight: 19,
        },
        heroActions: {
            flexDirection: 'row',
            marginTop: 14,
        },
        heroBtn: {
            flex: 1,
            minHeight: 42,
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 10,
            paddingHorizontal: 12,
        },
        heroBtnPrimary: {
            backgroundColor: colors.primary,
            shadowColor: colors.primary,
            shadowOpacity: 0.32,
            shadowRadius: 14,
            shadowOffset: { width: 0, height: 10 },
            elevation: 5,
        },
        heroBtnSecondary: {
            backgroundColor: colors.surfaceMuted,
            borderWidth: 1,
            borderColor: colors.border,
            marginRight: 0,
        },
        heroBtnText: {
            fontSize: 11,
            fontWeight: '800',
            letterSpacing: 1,
        },
        heroBtnTextPrimary: {
            color: colors.mode === 'dark' ? '#061016' : '#ffffff',
        },
        heroBtnTextSecondary: {
            color: colors.text,
        },
        chipRow: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 12,
        },
        chip: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 9,
            paddingVertical: 7,
            borderRadius: 999,
            backgroundColor: colors.surfaceMuted,
            borderWidth: 1,
            borderColor: colors.border,
            marginRight: 7,
            marginBottom: 7,
        },
        chipText: {
            marginLeft: 6,
            color: colors.textSecondary,
            fontSize: 9,
            fontWeight: '700',
        },
        sectionHeader: {
            marginTop: 8,
            marginBottom: 14,
        },
        sectionTag: {
            fontSize: 10,
            fontWeight: '800',
            letterSpacing: 1.5,
            color: colors.primary,
            textTransform: 'uppercase',
            marginBottom: 8,
        },
        sectionTitle: {
            fontSize: 24,
            lineHeight: 29,
            fontWeight: '800',
            color: colors.text,
            letterSpacing: -0.3,
        },
        sectionDesc: {
            marginTop: 8,
            color: colors.textSecondary,
            fontSize: 14,
            lineHeight: 20,
        },
        highlightGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        highlightCard: {
            width: '32%',
            minWidth: 96,
            flexGrow: 1,
            marginBottom: 10,
            padding: 14,
            borderRadius: 18,
            backgroundColor: colors.cardTint,
            borderWidth: 1,
            borderColor: colors.border,
            marginRight: 8,
        },
        highlightIcon: {
            width: 34,
            height: 34,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primarySoft,
            marginBottom: 10,
        },
        highlightLabel: {
            fontSize: 10,
            color: colors.textMuted,
            fontWeight: '700',
            textTransform: 'uppercase',
            letterSpacing: 1,
            marginBottom: 4,
        },
        highlightValue: {
            fontSize: 16,
            fontWeight: '800',
            color: colors.text,
        },
        comfortCard: {
            marginTop: 4,
        },
        comfortTopRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 14,
        },
        comfortHeading: {
            flex: 1,
            paddingRight: 10,
        },
        comfortTitle: {
            color: colors.text,
            fontSize: 16,
            fontWeight: '800',
            marginBottom: 4,
        },
        comfortSubtitle: {
            color: colors.textMuted,
            fontSize: 12,
            textTransform: 'uppercase',
            letterSpacing: 1.2,
            fontWeight: '700',
        },
        syncPill: {
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            paddingVertical: 8,
            borderRadius: 999,
            borderWidth: 1,
        },
        syncPillText: {
            marginLeft: 6,
            fontSize: 10,
            fontWeight: '800',
            letterSpacing: 1.1,
        },
        sliderTrack: {
            height: 10,
            borderRadius: 999,
            backgroundColor: colors.surfaceMuted,
            borderWidth: 1,
            borderColor: colors.border,
            overflow: 'hidden',
            marginTop: 10,
        },
        sliderFill: {
            height: '100%',
            borderRadius: 999,
            backgroundColor: colors.primary,
        },
        comfortMetaRow: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
        },
        comfortMetaText: {
            fontSize: 11,
            fontWeight: '700',
            color: colors.textMuted,
            textTransform: 'uppercase',
            letterSpacing: 1,
        },
        comfortButtons: {
            flexDirection: 'row',
            marginTop: 16,
        },
        comfortButton: {
            flex: 1,
            minHeight: 46,
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            flexDirection: 'row',
            marginRight: 10,
            borderWidth: 1,
        },
        comfortButtonLast: {
            marginRight: 0,
        },
        comfortButtonPrimary: {
            backgroundColor: colors.primary,
            borderColor: colors.primary,
        },
        comfortButtonSecondary: {
            backgroundColor: colors.surfaceMuted,
            borderColor: colors.border,
        },
        comfortButtonText: {
            marginLeft: 8,
            fontSize: 12,
            fontWeight: '800',
            letterSpacing: 1,
        },
        comfortButtonTextPrimary: {
            color: colors.mode === 'dark' ? '#061016' : '#ffffff',
        },
        comfortButtonTextSecondary: {
            color: colors.text,
        },
        metricGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
        },
        metricCard: {
            width: '48%',
            borderRadius: 20,
            backgroundColor: colors.surface,
            borderWidth: 1,
            borderColor: colors.border,
            padding: 16,
            marginBottom: 12,
        },
        metricHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 10,
        },
        metricLabel: {
            color: colors.textMuted,
            fontSize: 11,
            fontWeight: '800',
            letterSpacing: 1,
            textTransform: 'uppercase',
            flex: 1,
            paddingRight: 8,
        },
        metricValue: {
            color: colors.primary,
            fontSize: 24,
            fontWeight: '800',
            letterSpacing: -0.5,
        },
        metricDetail: {
            color: colors.textSecondary,
            fontSize: 12,
            lineHeight: 17,
            marginTop: 4,
        },
        listCard: {
            paddingVertical: 4,
        },
        listRow: {
            flexDirection: 'row',
            alignItems: 'flex-start',
            paddingVertical: 14,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
        },
        listIcon: {
            width: 42,
            height: 42,
            borderRadius: 14,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
            backgroundColor: colors.primarySoft,
            borderWidth: 1,
            borderColor: colors.borderStrong,
        },
        listBody: {
            flex: 1,
            paddingRight: 6,
        },
        listTitle: {
            color: colors.text,
            fontSize: 14,
            fontWeight: '800',
            marginBottom: 4,
        },
        listText: {
            color: colors.textSecondary,
            fontSize: 12,
            lineHeight: 18,
        },
        listRight: {
            color: colors.primary,
            fontSize: 12,
            fontWeight: '800',
            textAlign: 'right',
        },
        pillGrid: {
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginTop: 10,
        },
        pill: {
            paddingHorizontal: 12,
            paddingVertical: 9,
            borderRadius: 999,
            backgroundColor: colors.surfaceMuted,
            borderWidth: 1,
            borderColor: colors.border,
            marginRight: 8,
            marginBottom: 8,
        },
        pillText: {
            color: colors.textSecondary,
            fontSize: 11,
            fontWeight: '700',
        },
        pillActive: {
            backgroundColor: colors.primarySoft,
            borderColor: colors.borderStrong,
        },
        pillTextActive: {
            color: colors.primary,
        },
        segmentRow: {
            flexDirection: 'row',
            backgroundColor: colors.surfaceMuted,
            borderWidth: 1,
            borderColor: colors.border,
            borderRadius: 18,
            padding: 4,
            marginBottom: 14,
        },
        segmentItem: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingVertical: 11,
            borderRadius: 14,
        },
        segmentItemActive: {
            backgroundColor: colors.surfaceStrong,
            borderWidth: 1,
            borderColor: colors.borderStrong,
        },
        segmentText: {
            fontSize: 12,
            fontWeight: '800',
            color: colors.textMuted,
        },
        segmentTextActive: {
            color: colors.primary,
        },
        progressBlock: {
            marginTop: 8,
        },
        progressHeader: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 10,
        },
        progressTitle: {
            color: colors.text,
            fontSize: 14,
            fontWeight: '800',
        },
        progressValue: {
            color: colors.primary,
            fontSize: 14,
            fontWeight: '800',
        },
        progressBar: {
            height: 10,
            borderRadius: 999,
            backgroundColor: colors.surfaceMuted,
            borderWidth: 1,
            borderColor: colors.border,
            overflow: 'hidden',
        },
        progressFill: {
            height: '100%',
            borderRadius: 999,
            backgroundColor: colors.primary,
        },
        progressCaption: {
            marginTop: 10,
            color: colors.textSecondary,
            fontSize: 12,
            lineHeight: 18,
        },
        roadmapCard: {
            paddingVertical: 4,
        },
        roadmapRow: {
            flexDirection: 'row',
            paddingVertical: 14,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
            alignItems: 'center',
        },
        roadmapBadge: {
            width: 62,
            marginRight: 12,
            paddingVertical: 10,
            borderRadius: 16,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: colors.primarySoft,
            borderWidth: 1,
            borderColor: colors.borderStrong,
        },
        roadmapBadgeText: {
            color: colors.primary,
            fontSize: 11,
            fontWeight: '800',
            letterSpacing: 0.8,
        },
        roadmapBody: {
            flex: 1,
        },
        roadmapTop: {
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginBottom: 3,
        },
        roadmapYear: {
            color: colors.text,
            fontSize: 14,
            fontWeight: '800',
        },
        roadmapRevenue: {
            color: colors.primary,
            fontSize: 13,
            fontWeight: '800',
        },
        roadmapMilestone: {
            color: colors.textSecondary,
            fontSize: 12,
            lineHeight: 17,
        },
        profileHeader: {
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 18,
        },
        avatar: {
            width: 70,
            height: 70,
            borderRadius: 24,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 14,
            backgroundColor: colors.primarySoft,
            borderWidth: 1,
            borderColor: colors.borderStrong,
        },
        avatarText: {
            color: colors.primary,
            fontSize: 22,
            fontWeight: '900',
            letterSpacing: 1,
        },
        profileName: {
            color: colors.text,
            fontSize: 23,
            fontWeight: '800',
            marginBottom: 4,
        },
        profileMeta: {
            color: colors.textMuted,
            fontSize: 12,
            fontWeight: '700',
            letterSpacing: 1.1,
            textTransform: 'uppercase',
        },
        settingRow: {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingVertical: 14,
        },
        settingText: {
            flex: 1,
            paddingRight: 16,
        },
        settingTitle: {
            color: colors.text,
            fontSize: 14,
            fontWeight: '800',
            marginBottom: 4,
        },
        settingSub: {
            color: colors.textSecondary,
            fontSize: 12,
            lineHeight: 17,
        },
        divider: {
            height: 1,
            backgroundColor: colors.border,
        },
        contactCard: {
            backgroundColor: colors.surfaceStrong,
        },
        contactLine: {
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 14,
        },
        contactIcon: {
            width: 40,
            height: 40,
            borderRadius: 14,
            alignItems: 'center',
            justifyContent: 'center',
            marginRight: 12,
            backgroundColor: colors.surfaceMuted,
            borderWidth: 1,
            borderColor: colors.border,
        },
        contactLabel: {
            color: colors.textMuted,
            fontSize: 10,
            fontWeight: '800',
            letterSpacing: 1.1,
            textTransform: 'uppercase',
            marginBottom: 3,
        },
        contactValue: {
            color: colors.text,
            fontSize: 14,
            fontWeight: '700',
        },
        footerNote: {
            marginTop: 6,
            color: colors.textMuted,
            fontSize: 11,
            lineHeight: 17,
        },
        glowLine: {
            height: 1,
            backgroundColor: colors.borderStrong,
            marginTop: 2,
            marginBottom: 12,
        },
    });

function isDarkShadow(colors) {
    return colors.mode === 'dark';
}

export function App() {
    const [activeTab, setActiveTab] = useState('HOME');
    const [isSynced, setIsSynced] = useState(true);
    const [targetTemp, setTargetTemp] = useState(23.5);
    const [coolingIntensity, setCoolingIntensity] = useState(40);
    const [autoSync, setAutoSync] = useState(true);
    const [shareData, setShareData] = useState(false);
    const [pushNotif, setPushNotif] = useState(true);
    const [themeMode, setThemeMode] = useState('system');
    const [timeframe, setTimeframe] = useState('month');

    const systemScheme = useColorScheme();
    const resolvedScheme = themeMode === 'system' ? (systemScheme || 'dark') : themeMode;
    const colors = useMemo(() => createTheme(resolvedScheme), [resolvedScheme]);
    const styles = useMemo(() => createStyles(colors, SCREEN_WIDTH < 380), [colors]);

    const introAnim = useRef(new Animated.Value(0)).current;
    const orbAnim1 = useRef(new Animated.Value(0)).current;
    const orbAnim2 = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        Animated.parallel([
            Animated.timing(introAnim, {
                toValue: 1,
                duration: 700,
                useNativeDriver: true,
            }),
            Animated.loop(
                Animated.sequence([
                    Animated.timing(orbAnim1, {
                        toValue: 1,
                        duration: 5000,
                        useNativeDriver: true,
                    }),
                    Animated.timing(orbAnim1, {
                        toValue: 0,
                        duration: 5000,
                        useNativeDriver: true,
                    }),
                ])
            ),
            Animated.loop(
                Animated.sequence([
                    Animated.timing(orbAnim2, {
                        toValue: 1,
                        duration: 6200,
                        useNativeDriver: true,
                    }),
                    Animated.timing(orbAnim2, {
                        toValue: 0,
                        duration: 6200,
                        useNativeDriver: true,
                    }),
                ])
            ),
        ]).start();
    }, [introAnim, orbAnim1, orbAnim2]);

    const toggleThemeMode = () => {
        setThemeMode((current) => {
            if (current === 'system') return 'dark';
            if (current === 'dark') return 'light';
            return 'system';
        });
    };

    const handleCooling = () => {
        setTargetTemp((prev) => Math.max(18, parseFloat((prev - 0.5).toFixed(1))));
        setCoolingIntensity((prev) => Math.min(prev + 10, 100));
    };

    const handleHeating = () => {
        setTargetTemp((prev) => Math.min(27, parseFloat((prev + 0.5).toFixed(1))));
        setCoolingIntensity((prev) => Math.max(prev - 10, 0));
    };

    const themeMeta = THEME_MODES.find((item) => item.key === themeMode) || THEME_MODES[0];
    const syncLabel = isSynced ? 'Sistema sincronizzato' : 'Sistema disconnesso';
    const syncColor = isSynced ? colors.primary : colors.textMuted;
    const syncBg = isSynced ? colors.primarySoft : colors.surfaceMuted;

    const heroTranslate = introAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [18, 0],
    });

    const orbTranslate1 = orbAnim1.interpolate({
        inputRange: [0, 1],
        outputRange: [0, -18],
    });
    const orbScale1 = orbAnim1.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.08],
    });

    const orbTranslate2 = orbAnim2.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 22],
    });
    const orbScale2 = orbAnim2.interpolate({
        inputRange: [0, 1],
        outputRange: [1, 1.05],
    });

    const renderHome = () => (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <Animated.View style={{ opacity: introAnim, transform: [{ translateY: heroTranslate }] }}>
                <View style={[styles.card, styles.heroCard]}>
                    <View style={styles.badge}>
                        <Text style={styles.badgeText}>Dashboard Cliente</Text>
                    </View>
                    <Text style={styles.heroTitle}>
                        Controlla SymbioSkin in un solo <Text style={styles.heroTitleAccent}>sguardo</Text>
                    </Text>
                    <Text style={styles.heroDesc}>
                        La tua schermata principale per vedere subito parametri attuali, consumi e stato del dispositivo.
                    </Text>
                    <View style={styles.heroActions}>
                        <TouchableOpacity style={[styles.heroBtn, styles.heroBtnPrimary]} onPress={() => setActiveTab('ABOUT')}>
                            <Text style={[styles.heroBtnText, styles.heroBtnTextPrimary]}>COS&apos;È SYMBIOSKIN</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={[styles.heroBtn, styles.heroBtnSecondary]} onPress={() => setActiveTab('ENERGY')}>
                            <Text style={[styles.heroBtnText, styles.heroBtnTextSecondary]}>VEDI I CONSUMI</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.chipRow}>
                        {HOME_HIGHLIGHTS.map((item) => (
                            <View key={item.label} style={styles.chip}>
                                <Feather name={item.icon} size={12} color={colors.primary} />
                                <Text style={styles.chipText}>{item.label}: {item.value}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            </Animated.View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTag}>Dashboard</Text>
                <Text style={styles.sectionTitle}>Parametri attuali e stato del sistema</Text>
                <Text style={styles.sectionDesc}>
                    Una lettura rapida dei segnali fondamentali, pensata per chi usa SymbioSkin ogni giorno.
                </Text>
            </View>

            <View style={styles.highlightGrid}>
                {HOME_HIGHLIGHTS.map((item) => (
                    <View key={item.label} style={styles.highlightCard}>
                        <View style={styles.highlightIcon}>
                            <Feather name={item.icon} size={16} color={colors.primary} />
                        </View>
                        <Text style={styles.highlightLabel}>{item.label}</Text>
                        <Text style={styles.highlightValue}>{item.value}</Text>
                    </View>
                ))}
            </View>

            <View style={[styles.card, styles.comfortCard]}>
                <View style={styles.comfortTopRow}>
                    <View style={styles.comfortHeading}>
                        <Text style={styles.comfortTitle}>Gestione comfort: {targetTemp.toFixed(1)}°C</Text>
                        <Text style={styles.comfortSubtitle}>Layer biometrico attivo</Text>
                    </View>
                    <TouchableOpacity
                        style={[
                            styles.syncPill,
                            {
                                backgroundColor: syncBg,
                                borderColor: isSynced ? colors.borderStrong : colors.border,
                            },
                        ]}
                        onPress={() => setIsSynced((prev) => !prev)}
                    >
                        <Feather name={isSynced ? 'check-circle' : 'x-circle'} size={14} color={syncColor} />
                        <Text style={[styles.syncPillText, { color: syncColor }]}>{syncLabel.toUpperCase()}</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.sliderTrack}>
                    <View style={[styles.sliderFill, { width: `${coolingIntensity}%` }]} />
                </View>

                <View style={styles.comfortMetaRow}>
                    <Text style={styles.comfortMetaText}>Intensità attuale</Text>
                    <Text style={styles.comfortMetaText}>{coolingIntensity}%</Text>
                </View>

                <View style={styles.comfortButtons}>
                    {COMFORT_PRESETS.map((preset, index) => (
                        <TouchableOpacity
                            key={preset.label}
                            style={[
                                styles.comfortButton,
                                index === 1 && styles.comfortButtonLast,
                                index === 0 ? styles.comfortButtonSecondary : styles.comfortButtonPrimary,
                            ]}
                            onPress={index === 0 ? handleHeating : handleCooling}
                        >
                            <Feather
                                name={preset.icon}
                                size={16}
                                color={index === 0 ? colors.text : colors.mode === 'dark' ? '#061016' : '#ffffff'}
                            />
                            <Text
                                style={[
                                    styles.comfortButtonText,
                                    index === 0 ? styles.comfortButtonTextSecondary : styles.comfortButtonTextPrimary,
                                ]}
                            >
                                {preset.label.toUpperCase()}
                            </Text>
                        </TouchableOpacity>
                    ))}
                </View>
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTag}>Stato in tempo reale</Text>
                <Text style={styles.sectionTitle}>Comfort, consumi e sincronizzazione</Text>
            </View>

            <View style={[styles.card, styles.cardStrong]}>
                <View style={styles.listRow}>
                    <View style={styles.listIcon}>
                        <Feather name="globe" size={16} color={colors.primary} />
                    </View>
                    <View style={styles.listBody}>
                        <Text style={styles.listTitle}>Risparmio energetico</Text>
                        <Text style={styles.listText}>
                            Il sistema riduce i consumi quando il comfort è già ottimale, senza interventi manuali.
                        </Text>
                    </View>
                    <Text style={styles.listRight}>-2.4 kWh</Text>
                </View>
                <View style={styles.listRow}>
                    <View style={styles.listIcon}>
                        <Feather name="layers" size={16} color={colors.primary} />
                    </View>
                    <View style={styles.listBody}>
                        <Text style={styles.listTitle}>Sistema sincronizzato</Text>
                        <Text style={styles.listText}>
                            App, sensori e layer lavorano insieme per mantenere il comfort della persona.
                        </Text>
                    </View>
                    <Text style={styles.listRight}>OK</Text>
                </View>
                <View style={styles.listRow}>
                    <View style={styles.listIcon}>
                        <Feather name="award" size={16} color={colors.primary} />
                    </View>
                    <View style={styles.listBody}>
                        <Text style={styles.listTitle}>Esperienza premium</Text>
                        <Text style={styles.listText}>
                            Trasparenze, bordi luminosi e micro-animazioni per una percezione più esclusiva.
                        </Text>
                    </View>
                    <Text style={styles.listRight}>GLASS</Text>
                </View>
            </View>
        </ScrollView>
    );

    const renderAbout = () => (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTag}>Cos&apos;è SymbioSkin</Text>
                <Text style={styles.sectionTitle}>La seconda pelle intelligente che ti accompagna ogni giorno</Text>
                <Text style={styles.sectionDesc}>
                    SymbioSkin è il wearable che connette i parametri del tuo corpo con la risposta dell’ambiente per offrirti un comfort più naturale.
                </Text>
            </View>

            <View style={styles.card}>
                <View style={styles.glowLine} />
                {PROBLEM_POINTS.map((point, index) => (
                    <View key={point.title} style={[styles.listRow, index === PROBLEM_POINTS.length - 1 && { borderBottomWidth: 0, paddingBottom: 0 }]}>
                        <View style={styles.listIcon}>
                            <Feather name={point.icon} size={16} color={colors.primary} />
                        </View>
                        <View style={styles.listBody}>
                            <Text style={styles.listTitle}>{point.title}</Text>
                            <Text style={styles.listText}>{point.text}</Text>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTag}>Cosa misura</Text>
                <Text style={styles.sectionTitle}>I tre moduli principali del sistema</Text>
            </View>

            {TECH_CARDS.map((card) => (
                <View key={card.title} style={styles.card}>
                    <View style={styles.metricHeader}>
                        <Text style={styles.metricLabel}>{card.title}</Text>
                        <Feather name={card.icon} size={18} color={colors.primary} />
                    </View>
                    <Text style={styles.sectionDesc}>{card.text}</Text>
                    <View style={styles.pillGrid}>
                        {card.bullets.map((bullet) => (
                            <View key={bullet} style={[styles.pill, styles.pillActive]}>
                                <Text style={[styles.pillText, styles.pillTextActive]}>{bullet}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            ))}

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTag}>Flow operativo</Text>
                <Text style={styles.sectionTitle}>In 6 passi, dalla pelle al comfort</Text>
            </View>

            <View style={styles.card}>
                {[
                    'Rilevazione biometrica della persona',
                    'Lettura della firma termica individuale',
                    'Predizione del discomfort prima del picco',
                    'Sync intelligente con HVAC e ambiente',
                    'Ottimizzazione di comfort e consumi',
                    'Feedback continuo per migliorare il modello',
                ].map((step, index) => (
                    <View key={step} style={[styles.listRow, index === 5 && { borderBottomWidth: 0, paddingBottom: 0 }]}>
                        <View style={styles.listIcon}>
                            <Feather name="chevron-right" size={16} color={colors.primary} />
                        </View>
                        <View style={styles.listBody}>
                            <Text style={styles.listTitle}>{`0${index + 1}`.slice(-2)} — {step}</Text>
                            <Text style={styles.listText}>
                                Vedi i dati, capisci lo stato del comfort e agisci in pochi tocchi.
                            </Text>
                        </View>
                    </View>
                ))}
            </View>
        </ScrollView>
    );

    const renderEnergy = () => (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTag}>Consumi</Text>
                <Text style={styles.sectionTitle}>Andamento energetico e risparmio stimato</Text>
                <Text style={styles.sectionDesc}>
                    Guarda i consumi attuali, il comfort e il vantaggio ottenuto rispetto a una climatizzazione tradizionale.
                </Text>
            </View>

            <View style={styles.segmentRow}>
                <TouchableOpacity
                    style={[styles.segmentItem, timeframe === 'month' && styles.segmentItemActive]}
                    onPress={() => setTimeframe('month')}
                >
                    <Text style={[styles.segmentText, timeframe === 'month' && styles.segmentTextActive]}>Oggi</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.segmentItem, timeframe === 'year' && styles.segmentItemActive]}
                    onPress={() => setTimeframe('year')}
                >
                    <Text style={[styles.segmentText, timeframe === 'year' && styles.segmentTextActive]}>7 giorni</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.card, styles.cardStrong]}>
                <View style={styles.progressHeader}>
                    <Text style={styles.progressTitle}>Consumo stimato {timeframe === 'month' ? 'oggi' : 'questa settimana'}</Text>
                    <Text style={styles.progressValue}>{timeframe === 'month' ? '1.8 kWh' : '12.4 kWh'}</Text>
                </View>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: timeframe === 'month' ? '36%' : '64%' }]} />
                </View>
                <Text style={styles.progressCaption}>
                    {timeframe === 'month'
                        ? 'Sintesi delle ultime ore: comfort stabile e consumi sotto controllo.'
                        : 'Andamento degli ultimi 7 giorni con una lettura più ampia del comportamento del sistema.'}
                </Text>
            </View>

            <View style={styles.metricGrid}>
                {ENERGY_METRICS.map((metric) => (
                    <View key={metric.label} style={styles.metricCard}>
                        <View style={styles.metricHeader}>
                            <Text style={styles.metricLabel}>{metric.label}</Text>
                            <Feather name="trending-up" size={16} color={colors.primary} />
                        </View>
                        <Text style={styles.metricValue}>{metric.value}</Text>
                        <Text style={styles.metricDetail}>{metric.detail}</Text>
                    </View>
                ))}
            </View>

            <View style={[styles.card, styles.progressBlock]}>
                <View style={styles.progressHeader}>
                    <Text style={styles.progressTitle}>Stato comfort</Text>
                    <Text style={styles.progressValue}>45%</Text>
                </View>
                <View style={styles.progressBar}>
                    <View style={[styles.progressFill, { width: '45%' }]} />
                </View>
                <Text style={styles.progressCaption}>
                    La soglia attuale indica un comfort buono e stabile, con margine di ottimizzazione automatico.
                </Text>
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTag}>Attività recenti</Text>
                <Text style={styles.sectionTitle}>Le ultime zone ottimizzate</Text>
            </View>

            <View style={[styles.card, styles.roadmapCard]}>
                {USAGE_LOGS.map((item) => (
                    <View key={item.time} style={styles.roadmapRow}>
                        <View style={styles.roadmapBadge}>
                            <Text style={styles.roadmapBadgeText}>{item.time}</Text>
                        </View>
                        <View style={styles.roadmapBody}>
                            <View style={styles.roadmapTop}>
                                <Text style={styles.roadmapYear}>{item.zone}</Text>
                                <Text style={styles.roadmapRevenue}>{item.saved}</Text>
                            </View>
                            <Text style={styles.roadmapMilestone}>Ottimizzazione completata con comfort stabile.</Text>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTag}>Cosa trovi nell’app</Text>
                <Text style={styles.sectionTitle}>Moduli principali del dispositivo</Text>
            </View>

            {DEVICE_MODULES.map((block) => (
                <View key={block.title} style={styles.card}>
                    <View style={styles.metricHeader}>
                        <Text style={styles.metricLabel}>{block.title}</Text>
                        <Feather name={block.icon} size={18} color={colors.primary} />
                    </View>
                    <View style={styles.pillGrid}>
                        {block.bullets.map((bullet) => (
                            <View key={bullet} style={styles.pill}>
                                <Text style={styles.pillText}>{bullet}</Text>
                            </View>
                        ))}
                    </View>
                </View>
            ))}

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTag}>Value delivery</Text>
                <Text style={styles.sectionTitle}>5 pilastri dell’esperienza utente</Text>
            </View>

            <View style={[styles.card, styles.cardStrong]}>
                {VALUE_PILLARS.map((pillar, index) => (
                    <View key={pillar} style={[styles.listRow, index === VALUE_PILLARS.length - 1 && { borderBottomWidth: 0, paddingBottom: 0 }]}>
                        <View style={styles.listIcon}>
                            <Text style={{ color: colors.primary, fontWeight: '900' }}>{index + 1}</Text>
                        </View>
                        <View style={styles.listBody}>
                            <Text style={styles.listTitle}>{pillar}</Text>
                            <Text style={styles.listText}>
                                Trasforma comfort, efficienza e sostenibilità in un&apos;unica esperienza premium.
                            </Text>
                        </View>
                    </View>
                ))}
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTag}>Supporto</Text>
                <Text style={styles.sectionTitle}>Guida rapida e assistenza</Text>
            </View>

            <View style={styles.card}>
                <View style={styles.pillGrid}>
                    {['Manuale rapido', 'Supporto remoto', 'Aggiornamenti OTA', 'Profilo personale'].map((item) => (
                        <View key={item} style={styles.pill}>
                            <Text style={styles.pillText}>{item}</Text>
                        </View>
                    ))}
                </View>
                <Text style={styles.progressCaption}>
                    Tutto quello che serve per iniziare subito con SymbioSkin, direttamente dal telefono.
                </Text>
            </View>
        </ScrollView>
    );

    const renderProfile = () => (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTag}>Profilo</Text>
                <Text style={styles.sectionTitle}>Impostazioni utente, dispositivo e supporto</Text>
                <Text style={styles.sectionDesc}>
                    Il tema può seguire il dispositivo oppure essere forzato manualmente, come richiesto.
                </Text>
            </View>

            <View style={[styles.card, styles.contactCard]}>
                <View style={styles.profileHeader}>
                    <View style={styles.avatar}>
                        <Text style={styles.avatarText}>PO</Text>
                    </View>
                    <View style={{ flex: 1 }}>
                        <Text style={styles.profileName}>Pietro Orciuolo</Text>
                        <Text style={styles.profileMeta}>ID: SYM-4892-XT • Trieste, Italia</Text>
                    </View>
                </View>
                <View style={styles.listRow}>
                    <View style={styles.listIcon}>
                        <Feather name="smartphone" size={16} color={colors.primary} />
                    </View>
                    <View style={styles.listBody}>
                        <Text style={styles.listTitle}>Tema attivo</Text>
                        <Text style={styles.listText}>
                            {themeMeta.label} {themeMode === 'system' ? '— segue il dispositivo' : '— override manuale'}
                        </Text>
                    </View>
                </View>
                <View style={[styles.listRow, { borderBottomWidth: 0, paddingBottom: 0 }]}>
                    <View style={styles.listIcon}>
                        <Feather name="wifi" size={16} color={colors.primary} />
                    </View>
                    <View style={styles.listBody}>
                        <Text style={styles.listTitle}>Stato sincronizzazione</Text>
                        <Text style={styles.listText}>{isSynced ? 'Dispositivo connesso al cluster' : 'Connessione momentaneamente sospesa'}</Text>
                    </View>
                </View>
            </View>

            <View style={styles.card}>
                <Text style={styles.metricLabel}>Modalità tema</Text>
                <View style={styles.segmentRow}>
                    {THEME_MODES.map((mode) => {
                        const active = mode.key === themeMode;
                        return (
                            <TouchableOpacity
                                key={mode.key}
                                style={[styles.segmentItem, active && styles.segmentItemActive]}
                                onPress={() => setThemeMode(mode.key)}
                            >
                                <Feather name={mode.icon} size={15} color={active ? colors.primary : colors.textMuted} />
                                <Text style={[styles.segmentText, active && styles.segmentTextActive]}>{mode.label}</Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>
                <Text style={styles.progressCaption}>
                    Scegli “Dispositivo” per adattarti automaticamente a chiaro/scuro in base alle preferenze OS.
                </Text>
            </View>

            <View style={styles.card}>
                <Text style={styles.metricLabel}>Preferenze di sistema</Text>
                <View style={styles.settingRow}>
                    <View style={styles.settingText}>
                        <Text style={styles.settingTitle}>Sincronizzazione automatica</Text>
                        <Text style={styles.settingSub}>Connessione ai building vicini e ai profili attivi.</Text>
                    </View>
                    <Switch
                        value={autoSync}
                        onValueChange={setAutoSync}
                        trackColor={{ false: colors.border, true: colors.primarySoft }}
                        thumbColor={autoSync ? colors.primary : '#f4f4f4'}
                    />
                </View>
                <View style={styles.divider} />
                <View style={styles.settingRow}>
                    <View style={styles.settingText}>
                        <Text style={styles.settingTitle}>Notifiche push</Text>
                        <Text style={styles.settingSub}>Avvisi su comfort, risparmi e nuove milestone.</Text>
                    </View>
                    <Switch
                        value={pushNotif}
                        onValueChange={setPushNotif}
                        trackColor={{ false: colors.border, true: colors.primarySoft }}
                        thumbColor={pushNotif ? colors.primary : '#f4f4f4'}
                    />
                </View>
                <View style={styles.divider} />
                <View style={styles.settingRow}>
                    <View style={styles.settingText}>
                        <Text style={styles.settingTitle}>Condivisione dati anonimi</Text>
                        <Text style={styles.settingSub}>Contribuisce al miglioramento globale dell&apos;algoritmo.</Text>
                    </View>
                    <Switch
                        value={shareData}
                        onValueChange={setShareData}
                        trackColor={{ false: colors.border, true: colors.primarySoft }}
                        thumbColor={shareData ? colors.primary : '#f4f4f4'}
                    />
                </View>
            </View>

            <View style={[styles.card, styles.cardStrong]}>
                <Text style={styles.metricLabel}>Contatti e assistenza</Text>
                <View style={styles.contactLine}>
                    <View style={styles.contactIcon}>
                        <Feather name="mail" size={16} color={colors.primary} />
                    </View>
                    <View>
                        <Text style={styles.contactLabel}>Assistenza</Text>
                        <Text style={styles.contactValue}>support@symbioskin.io</Text>
                    </View>
                </View>
                <View style={styles.contactLine}>
                    <View style={styles.contactIcon}>
                        <Feather name="map-pin" size={16} color={colors.primary} />
                    </View>
                    <View>
                        <Text style={styles.contactLabel}>HQ</Text>
                        <Text style={styles.contactValue}>Trieste, Italia</Text>
                    </View>
                </View>
                <Text style={styles.footerNote}>
                    Un unico spazio mobile per monitorare SymbioSkin, leggere i parametri e chiedere supporto.
                </Text>
            </View>
        </ScrollView>
    );

    const renderActiveView = () => {
        switch (activeTab) {
            case 'ABOUT':
                return renderAbout();
            case 'ENERGY':
                return renderEnergy();
            case 'PROFILE':
                return renderProfile();
            case 'HOME':
            default:
                return renderHome();
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle={resolvedScheme === 'dark' ? 'light-content' : 'dark-content'}
                backgroundColor={colors.background}
            />
            <View style={styles.backgroundLayer} pointerEvents="none">
                <Animated.View
                    style={[
                        styles.orb,
                        styles.orbPrimary,
                        {
                            transform: [{ translateY: orbTranslate1 }, { scale: orbScale1 }],
                        },
                    ]}
                />
                <Animated.View
                    style={[
                        styles.orb,
                        styles.orbSecondary,
                        {
                            transform: [{ translateY: orbTranslate2 }, { scale: orbScale2 }],
                        },
                    ]}
                />
            </View>

            <View style={styles.content}>
                <View style={styles.shimmerLine} />
                <View style={styles.scrollContent}>
                    <View style={styles.headerRow}>
                        <View style={styles.brandWrap}>
                            <Text style={styles.brand}>SYMBIOSKIN</Text>
                            <Text style={styles.brandTag}>Mobile comfort control</Text>
                        </View>
                        <View style={styles.headerActions}>
                            <TouchableOpacity style={styles.iconButton} onPress={toggleThemeMode}>
                                <Feather name={themeMeta.icon} size={18} color={colors.primary} />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.syncButton} onPress={() => setIsSynced((prev) => !prev)}>
                                <Feather name={isSynced ? 'check-circle' : 'x-circle'} size={16} color={syncColor} />
                                <Text style={[styles.syncText, !isSynced && styles.syncTextMuted]}>{themeMeta.label}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>

                {renderActiveView()}
            </View>

            <View style={styles.tabBar}>
                {TABS.map((tab) => {
                    const active = activeTab === tab.key;
                    return (
                        <TouchableOpacity key={tab.key} style={styles.tabItem} onPress={() => setActiveTab(tab.key)}>
                            <Feather name={tab.icon} size={21} color={active ? colors.primary : colors.textMuted} />
                            <Text style={[styles.tabText, active && styles.tabTextActive]}>{tab.label}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
        </SafeAreaView>
    );
}

