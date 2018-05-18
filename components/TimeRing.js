import { h, Component } from 'preact';
import styled from 'styled-components';
import { differenceInMinutes, subDays } from 'date-fns';
import { mapRange, convertMinsToHrsMins } from '../utils';

const Container = styled.div`
  display: flex;
  justify-content: center;

  text-align: center;

  h1 {
    font-size: 62px;
    letter-spacing: -0.0158432em;
    line-height: 62px;
    font-weight: 800;
  }

  h2 {
    font-weight: 800;
  }

  h4 {
    font-weight: 600;
    color: var(--grey);
  }
`;

const Ring = styled.div`
  position: relative;

  div {
    position: absolute;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    top: 30%;
  }

  .progress-ring__circle {
    transition: 0.35s stroke-dashoffset;
    // axis compensation
    transform: rotate(-90deg);
    transform-origin: 50% 50%;
    stroke-linecap: round;
  }
`;

export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      currentProgress: this.calculateProgress()
    };

    this.gradients = {
      red: ['#FF8315', '#F63333'],
      green: ['#99E65B', '#7DBC4B']
    };
  }

  timeLeft() {
    const diffInMins = this.props.fastHasStarted
      ? differenceInMinutes(this.props.endTime, this.props.currentDateAndTime)
      : differenceInMinutes(
          this.props.startTime,
          this.props.currentDateAndTime
        );

    return convertMinsToHrsMins(diffInMins);
  }

  calculateProgress() {
    // Used to offset the progress ring so it doesn't look like
    // it is 100% complete with > 10 mins still to go
    const BUFFER = 20;

    if (this.props.fastHasStarted) {
      const totalTime = differenceInMinutes(
        this.props.endTime,
        this.props.startTime
      );
      const endTimeDifference = differenceInMinutes(
        this.props.endTime,
        this.props.currentDateAndTime
      );

      return mapRange({
        value: totalTime - endTimeDifference - BUFFER,
        currentLowerBound: 0,
        currentUpperBound: totalTime,
        targetLowerBound: 0,
        targetUpperBound: 100
      });
    }

    // Difference between yesterday's end time and the next start time
    // (using subDays method instead of using the actual time for yesterday
    // because accuracy isn't too important here - it will only be
    // a few mins in difference)
    const prevEndStartDifference = differenceInMinutes(
      this.props.startTime,
      subDays(this.props.endTime, 1)
    );

    const currentStartDifference = differenceInMinutes(
      this.props.startTime,
      this.props.currentDateAndTime
    );

    return mapRange({
      value: currentStartDifference - BUFFER,
      currentLowerBound: prevEndStartDifference,
      currentUpperBound: 0,
      targetLowerBound: 0,
      targetUpperBound: 100
    });
  }

  updateProgressBar(percent) {
    const offset = this.circumference - percent / 100 * this.circumference;
    this.circle.style.strokeDashoffset = offset;
  }

  componentWillReceiveProps() {
    // Recalculate progress on receiving new props
    this.setState({
      currentProgress: this.calculateProgress()
    });
  }

  componentDidMount() {
    this.circle = document.querySelector('.progress-ring__circle');
    this.radius = this.circle.r.baseVal.value;
    this.circumference = this.radius * 2 * Math.PI;

    this.circle.style.strokeDasharray = `${this.circumference} ${
      this.circumference
    }`;

    this.circle.style.strokeDashoffset = `${this.circumference}`;

    this.updateProgressBar(this.state.currentProgress);
  }

  componentDidUpdate() {
    this.updateProgressBar(this.state.currentProgress);
  }

  render() {
    const text = this.props.fastHasStarted
      ? 'Till Fast Ends'
      : 'Till Fast Starts';

    return (
      <Container>
        <Ring>
          <svg class="progress-ring" width="300" height="300">
            <circle
              class="base-ring__circle"
              stroke="#eaedef"
              stroke-width="10"
              fill="transparent"
              r="120"
              cx="150"
              cy="150"
            />
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="0%"
                  style={`stop-color:${
                    this.props.fastHasStarted
                      ? this.gradients.red[0]
                      : this.gradients.green[0]
                  };stop-opacity:1`}
                />
                <stop
                  offset="100%"
                  style={`stop-color:${
                    this.props.fastHasStarted
                      ? this.gradients.red[1]
                      : this.gradients.green[1]
                  };stop-opacity:1`}
                />
              </linearGradient>
            </defs>
            <circle
              class="progress-ring__circle"
              stroke="url(#grad1)"
              stroke-width="20"
              fill="transparent"
              r="120"
              cx="150"
              cy="150"
            />this.
          </svg>

          <div>
            <h1>{this.timeLeft()}</h1>
            <h2>HOURS LEFT</h2>
            <h4>{text}</h4>
          </div>
        </Ring>
      </Container>
    );
  }
}
