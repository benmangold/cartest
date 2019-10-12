import React from 'react';

import AudioList from './components/AudioList.jsx';
import UploadForm from './components/UploadForm.jsx';

import Dropzone from 'react-dropzone';

import API_URL from '../config.js';

let REFRESH_INTERVAL = null;
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { audioList: [] };
    this.getAudioList = this.getAudioList.bind(this);
  }

  componentDidMount() {
    this.getAudioList();
    REFRESH_INTERVAL = setInterval(this.getAudioList, 6000);
  }

  componentDidUnmount() {
    clearInterval(REFRESH_INTERVAL);
  }

  getAudioList() {
    fetch(`${API_URL}/api/audioLinks`)
      .then(response => response.json())
      .then(
        audioList => this.setState({ audioList: audioList }),
        err => console.log(JSON.stringify(err))
      );
  }

  render() {
    return (
      <div>
        <h1>{this.props.name}</h1>
        <UploadForm />
        <AudioList audioList={this.state.audioList} />

        <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
          {({ getRootProps, getInputProps }) => (
            <section>
              <div {...getRootProps()}>
                <input {...getInputProps()} />
                <p>Drag 'n' drop some files here, or click to select files</p>
              </div>
            </section>
          )}
        </Dropzone>
      </div>
    );
  }
}

export default App;
