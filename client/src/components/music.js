import React from 'react';

class Music extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      muted: this.props.muted,
      playing: false,
      level: 3
    }

    this.updateMuted = this.props.updateMuted;
    this.handleClick = this.handleClick.bind(this);
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.muted !== this.props.muted){
      this.setState({
        muted: nextProps.muted
      });
    }
  }

  backgroundAudio = new Audio(`../../assets/background.mp3`);

  componentDidMount() {
    // this.handleClick();
  }

  handleClick() {
    if (this.state.muted) {
      this.backgroundAudio.volume = 0.1;
      this.backgroundAudio.loop = true;
      this.backgroundAudio.play();
      this.updateMuted();
    } else {
      this.backgroundAudio.pause();
      this.updateMuted();
    }
    console.log('huw handleClick',this.state.muted);
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
