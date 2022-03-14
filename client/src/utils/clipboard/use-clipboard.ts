export const useClipboard = () => (text: string) =>
  navigator.clipboard.writeText(text);
