import React from 'react';

export default props => (
  <div>
    {props.audioList.map(item => (
      <audio key='hello' controls>
        <source src={item} type='audio/wav'></source>
      </audio>
    ))}
  </div>
);
