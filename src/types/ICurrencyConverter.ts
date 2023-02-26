export interface ICurrencyConverter {
  success: string;
  info: ICurrencyConverterInfo;
  query: ICurrencyConverterQuery;
  result: number;
}
export interface ICurrencyConverterInfo {
  timestamp: number;
  quote: number;
}
export interface ICurrencyConverterQuery {
  from: string;
  to: string;
  amount: number;
}
