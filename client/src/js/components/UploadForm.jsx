import React from 'react';

export default props => (
  <div>
    <form
      action='api/form/encodeMp3Audio'
      method='post'
      enctype='multipart/form-data'
    >
      <input type='file' name='mediaUpload' />
      <input type='submit' value='Submit' />
    </form>
  </div>
);
