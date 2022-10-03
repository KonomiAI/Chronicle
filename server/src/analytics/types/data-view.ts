export interface DataViewOptions {
  start: string;
  end: string;
}

export abstract class DataView<V> {
  abstract get(options: DataViewOptions): Promise<V[]>;
}
