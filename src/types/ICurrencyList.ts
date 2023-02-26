export interface ICurrencyList {
  success: boolean;
  timestamp: number;
  source: string;
  quotes: Record<string, number>;
}
