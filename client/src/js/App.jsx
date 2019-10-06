import React from 'react';

import AudioList from './components/AudioList.jsx';
import UploadForm from './components/UploadForm.jsx';

import API_URL from '../config.js'



console.log(`API URL: ${JSON.stringify(API_URL)}`)
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
    fetch(`${API_URL}/api/audioLinks`)
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
