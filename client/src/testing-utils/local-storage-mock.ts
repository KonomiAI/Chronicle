export class LocalStorageMock implements Storage {
  store: Record<string, string>;

  get length(): number {
    return Object.keys(this.store).length;
  }

  constructor() {
    this.store = {};
  }

  key(index: number) {
    return Object.keys(this.store)[index] || null;
  }

  clear() {
    this.store = {};
  }

  getItem(key: string) {
    return this.store[key] || null;
  }

  setItem(key: string, value: string) {
    this.store[key] = value.toString();
  }

  removeItem(key: string) {
    delete this.store[key];
  }
}
