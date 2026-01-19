export const isFlutterWebView = (): boolean => {
  if (typeof window === "undefined") return false;
  return (window as any).isFlutterWebView === true; // Mock check
};
