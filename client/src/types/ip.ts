export interface Ip {
  id: string;
  ip: string;
  description: string | "tests";
}

export type AllowlistData = Omit<Ip, 'id'>;