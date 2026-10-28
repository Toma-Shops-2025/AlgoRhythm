type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
  type?: string;
};

function getConnection(): NetworkInformation | undefined {
  if (typeof navigator === "undefined") return undefined;
  return (navigator as Navigator & { connection?: NetworkInformation }).connection;
}

/** True when we should avoid heavy media preload. */
export function shouldConserveData(dataSaverEnabled: boolean): boolean {
  const conn = getConnection();
  if (conn?.saveData) return true;
  if (!dataSaverEnabled) return false;
  if (conn?.type === "cellular") return true;
  const et = conn?.effectiveType;
  return et === "slow-2g" || et === "2g" || et === "3g";
}
