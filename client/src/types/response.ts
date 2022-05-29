import { FormVersionWithForm } from './form';

export type ResponseBody = Record<string, string | number | string[]>;

export interface FormResponse {
  id: string;
  createdAt: string;
  updatedAt: string;
  latestResponseVersionId?: string;
  latestResponseVersion: {
    body: ResponseBody;
    formVersion: FormVersionWithForm;
    formVersionId: string;
    id: string;
    respondent: {
      firstName: string;
      lastName: string;
    };
    responseId: string;
    staffId: string;
    version: string;
  };
}

export type SimpleResponse = Omit<FormResponse, 'latestResponseVersion'>;

export interface ResponsePostBody {
  formVersionId: string;
  body: ResponseBody;
}
