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

type UserType = {
  _id: string;
  email: string;
  googleId: string;
  name: string;
  picture: string;
};

export interface globalType {
  selectedMonth: number;
  selectedYear: number;
  authorized: boolean;
  user: UserType;
  itemsPerPage: number;
}
