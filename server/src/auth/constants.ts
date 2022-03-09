//TODO: load secret from environment
export const jwtConstants = {
  secret: 'someSecretKey',
};

export enum Features {
  Inventory = 'Inventory',
  Security = 'Security',
  Entry = 'Entry',
  Customer = 'Customer',
  Form = 'Form',
}

export enum Actions {
  READ,
  WRITE,
}
