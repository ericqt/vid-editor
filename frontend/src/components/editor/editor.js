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
  console.log(cutTimesData);
  // let data = [];
  let table = (
    <table>
      <thead>
        <tr>
          <th>Start Time</th><th>End Time</th>
        </tr>
      </thead>
      <tbody>
      {cutTimesData.map((times) => (
        <tr key={times[0]+times[1]}>
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
    console.log(props.player)
    // let playerCurrentTime = props.player.getCurrentTime();
    console.log('cutTimes data: ', props.cutTimes);
    console.log('the cut state is: ', props.startCut);
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
  }

  const postHandler = () => {
    console.log('inside the posthandler')
    let cutTimes = {
      'cuttimes': [[1,2], [5,7]]
    }

    fetch('http://localhost:3000/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json',
      },
      body: JSON.stringify(cutTimes),
    })
    .then(data => data )
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
      <CutButton onClick={clipsHandler}> oh wow </CutButton>
      <PostButton onClick={postHandler}> test post </PostButton>
    </EditorContainer>
  )

}

export default Editor;
