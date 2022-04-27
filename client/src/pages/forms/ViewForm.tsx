import React from 'react';
import { FormViewer } from '../../components/form-viewer/form-viewer';
import { useGetForm } from '../../data/form';

const ViewForm = () => {
  const { data } = useGetForm('6268d8c1a34ccc522cc5df19');

  if (!data) return <div>404 on Form</div>;

  return <FormViewer form={data} />;
};

export default ViewForm;
