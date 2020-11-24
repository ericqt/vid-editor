import {useState} from 'react';

const Editor = (props) => {

  const clipsHandler = () => {
    let cutData = props.cutTimes;
    let playerCurrentTime = props.player.getCurrentTime();
    console.log('cutTimes data: ', props.cutTimes);
    console.log('video current time is: ', playerCurrentTime);
    switch (props.startCut){
      case true:
        cutData[cutData.length - 1][0] = props.player.getCurrentTime()
        props.setCutState(false);
        break;
      default:
        cutData[cutData.length - 1][1] = props.player.getCurrentTime()
        cutData[cutData.length] = [];
        props.setCutState(true);
    }
    props.setCutTimes(cutData);

    console.log(cutData);
  }

  return (
    <div>
      <button> oh wow </button>
    </div>
  )

}
