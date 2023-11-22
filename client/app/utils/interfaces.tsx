export interface entryType {
  _id: string;
  date: string;
  description: string;
  category: string;
  income?: number;
  debits?: number;
}

export interface modalEntryType {
  userID?: number;
  date: string;
  description: string;
  category: string;
  income?: number;
  debits?: number;
}

export interface globalType {
  selectedMonth: number;
  selectedYear: number;
}
