import {useState} from 'react';
import styled from 'styled-components';

const EditorContainer = styled.div`
  display: inline-block;
  position: relative;
  width: 50%;
  vertical-align:top;
  height: 400px;
`

const CutButton = styled.button`
  position: absolute;
  bottom: 0px;
`

const PostButton = styled.button`
  position: absolute;
  bottom: 30px;
`

const CutTimeSpan = styled.td`
`

export const outputCutTimes = (cutTimesData) => {
  let table = (
    <table>
      <thead>
        <tr>
          <th>Start Time</th><th>End Time</th>
        </tr>
      </thead>
      <tbody>
      {cutTimesData.map((times, index) => (
        <tr key={index}>
          <CutTimeSpan key={times[0]}>{times[0]}</CutTimeSpan>
          <CutTimeSpan key={times[1]}>{times[1]}</CutTimeSpan>
        </tr>
      ))}
      </tbody>
    </table>
  );
  return table;
};


const Editor = (props) => {

  const clipsHandler = () => {
    let cutData = props.cutTimes;
    // let playerCurrentTime = props.player.getCurrentTime();
    let currentTime = props.player.getCurrentTime()
    switch (props.startCut){
      case true:
        cutData[cutData.length] = []
        cutData[cutData.length-1][0] = props.player.getCurrentTime()
        props.setCutState(false);
        break;
      default:
        let currentStart = cutData[cutData.length - 1][0]
        if (currentTime < currentStart){
          cutData[cutData.length - 1][1] = currentStart
          cutData[cutData.length - 1][0] = currentTime
        } else {
          cutData[cutData.length - 1][1] = props.player.getCurrentTime()
        }
        props.setCutState(true);
    }
    props.setCutTimes(cutData);
  }

  const postHandler = () => {
    let cutTimes = {
      'cuttimes': props.cutTimes
    }

    fetch('http://localhost:3000/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
      },
      body: JSON.stringify(cutTimes),
    })
    .then(response => response.json())
    .then(data => {console.log(data)})
    .catch((error) => {
      console.error('Error: ', error);
    });
  }

  return (
    <EditorContainer>
      <div
        role="cuttimes"
      >
        Here are the cut times:
        {outputCutTimes(props.cutTimes)}
      </div>
      <CutButton onClick={clipsHandler}> Cut Time </CutButton>
      <PostButton onClick={postHandler}> test post BOOYAKASHA </PostButton>
    </EditorContainer>
  )

}

export default Editor;
