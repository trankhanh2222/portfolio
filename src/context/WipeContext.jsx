import { createContext, useCallback, useContext, useMemo, useState } from "react";

// Tach trang thai cutscene doi ngon ngu ra context rieng. Chi LanguageWipe va
// ParticlesField tieu thu, nen bat/tat overlay khong keo theo re-render toan app.
const WipeContext = createContext(null);

export function WipeProvider({ children }) {
  const [wiping, setWiping] = useState(false);
  const startWipe = useCallback(() => setWiping(true), []);
  const endWipe = useCallback(() => setWiping(false), []);

  const value = useMemo(() => ({ wiping, startWipe, endWipe }), [wiping, startWipe, endWipe]);

  return <WipeContext.Provider value={value}>{children}</WipeContext.Provider>;
}

export function useWipe() {
  const ctx = useContext(WipeContext);
  if (!ctx) throw new Error("useWipe must be used within WipeProvider");
  return ctx;
}