import { Editor } from '@/components/ui/editor/Editor';
import Header from '@/components/ui/header';
import React from 'react';

const Document = () => {
  return (
    <div>
      <Header>
        <div className="flex w-fit items-center justify-center gap-2">
          <p className="document-title">this is a fake document title</p>
        </div>
      </Header>
      <Editor />
    </div>
  );
};

export default Document;
