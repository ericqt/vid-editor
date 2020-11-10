import { Slider, Direction } from 'react-player-controls'

const WHITE_SMOKE = '#eee'
const GRAY = '#878c88'
const GREEN = '#72d687'
const HORIZONTAL_BAR_WIDTH = 400

const SliderBar = ({ direction, style }) => (
  <div
    style={Object.assign({}, {
      position: 'absolute',
      background: GRAY,
      borderRadius: 4,
    }, direction === Direction.HORIZONTAL ? {
      top: 0,
      bottom: 0,
      left: 0,
      width: `${100}%`,
    } : {}, style)}
  />
)

// A handle to indicate the current value
const SliderHandle = ({ direction, value, style }) => {
  console.log('inside sliderhandle');
  return (
    <div
      style={Object.assign({}, {
        position: 'absolute',
        width: 16,
        height: 16,
        background: GREEN,
        borderRadius: '100%',
        transform: 'scale(1)',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.3)',
        }
      }, direction === Direction.HORIZONTAL ? {
        top: 0,
        left: `${value * 100}%`,
        marginTop: -4,
        marginLeft: -8,
      } : {}, style)}
    />
  )
}

// A composite progress bar component
export const SeekBar = (props) => {
  return (
    <Slider
      isEnabled={true}
      direction={Direction.HORIZONTAL}
      onChange={props.sliderValueSetter}
      style={{
        width: HORIZONTAL_BAR_WIDTH,
        height: 8,
        transition: 'width 0.1s',
        cursor: 'pointer',
      }}
    >
      <SliderBar direction={Direction.HORIZONTAL} value={props.sliderValue} style={{ background: GREEN }} />
      <SliderHandle
        direction={Direction.HORIZONTAL}
        value={props.sliderValue}
        style={{ background:GREEN }}
      />
    </Slider>
  )
}

export default SeekBar;
