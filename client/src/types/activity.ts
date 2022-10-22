export interface Activity {
  id: string;
  name: string;
  price: number;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
  inUseByActivityEntry?: boolean;
}

export interface PostActivityBody {
  name: string;
  price: number;
}

export interface PutActivityBody {
  name: string;
  price: number;
  isArchived?: boolean;
}
