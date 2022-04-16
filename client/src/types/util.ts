/* eslint-disable @typescript-eslint/no-explicit-any */

export type ßwillFixThisTypeLater = any;

/**
 * Properties on Chronicle entities that are automatically managed
 * by the database or are just used by the back end.
 *
 * Used to remove properties from interfaces
 */
export type EntityMetaProperties =
  | 'id'
  | 'createdAt'
  | 'updatedAt'
  | 'isDeleted';
