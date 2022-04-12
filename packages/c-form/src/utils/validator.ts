import Ajv from 'ajv';
import { LatestFormSchema } from '../templates';

const ajv = new Ajv();
export const validateWithLatest = ajv.compile(LatestFormSchema);
