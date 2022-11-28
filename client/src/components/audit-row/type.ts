import { ßwillFixThisTypeLater } from '../../types';

export type AuditData = Record<string, ßwillFixThisTypeLater>;

export interface IResolver {
  (params: AuditData, query: AuditData, payload: AuditData): React.ReactNode;
}
