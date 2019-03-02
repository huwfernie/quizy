import React from 'react';

class Star extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      key: this.props.key
    }
  }

  componentDidMount() {
    const me = document.querySelector('.star-box');
    const mine = document.querySelector('.star');
    const mePos = this.getCoords(me);
    const you = document.querySelector('.score');
    const youPos = this.getCoords(you);
    const DeltaX = youPos.left - mePos.left;
    const DeltaY = youPos.top - mePos.top;

    setTimeout(()=> {
      me.style.transform = `translate(${DeltaX}px, ${DeltaY}px)`;
      mine.style.height = '24px';
      mine.style.width = '24px';
      setTimeout(()=> {
        mine.style.opacity = '0';
      },1500);
    },500);
  }

  getCoords(elem) { // crossbrowser version
    var box = elem.getBoundingClientRect();

    var body = document.body;
    var docEl = document.documentElement;

    var scrollTop = window.pageYOffset || docEl.scrollTop || body.scrollTop;
    var scrollLeft = window.pageXOffset || docEl.scrollLeft || body.scrollLeft;

    var clientTop = docEl.clientTop || body.clientTop || 0;
    var clientLeft = docEl.clientLeft || body.clientLeft || 0;

    var top  = box.top +  scrollTop - clientTop;
    var left = box.left + scrollLeft - clientLeft;

    return { top: Math.round(top), left: Math.round(left) };
  }

  render() {
  return (
    <div className="star-box">
      <span className="star"></span>
    </div>
    );
  }
};


export default Star;
