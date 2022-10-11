export interface DataViewOptions {
  start: Date;
  end: Date;
}

export abstract class DataView<V> {
  abstract get(options: DataViewOptions): Promise<V[]>;
}
