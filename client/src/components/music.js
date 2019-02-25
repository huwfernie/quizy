import React from 'react';

class Music extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      muted: false,
      playing: false,
      level: 3
    }
  }

  backgroundAudio = new Audio(`../../assets/background.mp3`);

  componentDidMount() {
    this.handleClick();
  }

  handleClick() {

    if (this.state.muted) {
      this.backgroundAudio.volume = 0.3;
      this.backgroundAudio.play();
      this.setState({
        muted: false
      })
    } else {
      this.backgroundAudio.pause();
      this.setState({
        muted: true
      })
    }

  }

  render() {
  return (
    <section className="music">
      <div className={this.state.muted ? 'speaker-icon muted' : 'speaker-icon playing' } onClick={ () => this.handleClick() }>
      </div>
    </section>
    );
  }
};


export default Music;
