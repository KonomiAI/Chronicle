import React from 'react';
import { FormViewer } from '../../components/form-viewer/form-viewer';
import { useGetForm } from '../../data/form';

const ViewForm = () => {
  const formId = '' // Add testing form id here
  const { data } = useGetForm(`${formId}`);

  if (!data) return <div>404 on Form</div>;

  return <FormViewer form={data} />;
};

export default ViewForm;
