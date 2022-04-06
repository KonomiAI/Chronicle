export interface Ip {
  id: string;
  ip: string;
  description: string;
}

export type AllowlistData = Omit<Ip, 'id'>;
