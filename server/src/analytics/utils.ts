export const parseAggregateCols = (aggregateCols: string) => {
  const res: Record<string, boolean> = {};

  aggregateCols.split(',').forEach((col) => {
    res[col] = true;
  });
  return res;
};
