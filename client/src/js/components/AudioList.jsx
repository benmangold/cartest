import React from 'react';

export default props => (
  <div>
    {props.audioList.map((item, index, array) => (
      <audio key={index} controls>
        <source src={item} type='audio/wav'></source>
      </audio>
    ))}
  </div>
);
