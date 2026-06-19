import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { listChildren, getSettings, setSettings as dbSetSettings } from '../data/repo';
import { seedIfEmpty } from '../data/seed';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [currentChildId, setCurrentChildId] = useState(null);
  const [childList, setChildList] = useState([]);
  const [settings, setSettingsState] = useState({
    calmMode: false, sound: false, tts: false, highContrast: false, parentGate: true, capabilityCheck: true,
  });
  const [view, setView] = useState('board'); // 'board' | 'tasks' | 'rewards' | 'child' | 'settings' | 'guide'
  const [parentUnlocked, setParentUnlocked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    async function init() {
      await seedIfEmpty();
      const [kids, s] = await Promise.all([listChildren(), getSettings()]);
      setChildList(kids);
      setSettingsState(s);
      if (kids.length > 0) setCurrentChildId(kids[0].id);
      setLoading(false);
    }
    init();
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    html.dataset.calm = settings.calmMode ? 'true' : 'false';
    html.dataset.contrast = settings.highContrast ? 'high' : 'normal';
  }, [settings.calmMode, settings.highContrast]);

  const updateSettings = useCallback(async (patch) => {
    await dbSetSettings(patch);
    setSettingsState(prev => ({ ...prev, ...patch }));
  }, []);

  const refresh = useCallback(() => setRefreshKey(k => k + 1), []);

  const refreshChildren = useCallback(async () => {
    const kids = await listChildren();
    setChildList(kids);
  }, []);

  return (
    <AppContext.Provider value={{
      currentChildId, setCurrentChildId,
      childList, refreshChildren,
      settings, updateSettings,
      view, setView,
      parentUnlocked, setParentUnlocked,
      loading,
      refreshKey, refresh,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
}
