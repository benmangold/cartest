import React from 'react';

import AudioList from './components/AudioList.jsx';
import UploadForm from './components/UploadForm.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      audioList: [],
    };
    this.getAudioList = this.getAudioList.bind(this);
  }

  componentDidMount() {
    this.getAudioList();
    setInterval(this.getAudioList, 6000);
  }

  getAudioList() {
    fetch('127.0.0.1:81/api/audioLinks')
      .then(response => response.json())
      .then(audioList => this.setState({ audioList: audioList }),
        err => console.log(JSON.stringify(err))
      );
  }

  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <UploadForm/>
        <AudioList audioList={this.state.audioList}/>
      </div>
    );
  }
}

export default App;
