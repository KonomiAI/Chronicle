export interface IActivity {
  id?: string;
  name: string;
  price: string;
  isArchived?: boolean;
};

export interface IActivityParams {
  name: string,
  price: number,
}