import React, {Dispatch, Fragment, ReactElement, SetStateAction, useEffect, useState} from 'react';
import './styles.css';
import {createCountdownTimeUnits, TimeUnitCounts} from "./DateConverter";

const testTargetDate: Date = new Date(2022, 9, 31, 23, 59, 23);

export function App(): ReactElement {
  return (
      <div className='App'>
        <CountdownTimer targetDate={testTargetDate} />
      </div>
  );
}

type CountdownTimerProps = {
  targetDate: Date;
};

export function CountdownTimer(props: CountdownTimerProps): ReactElement {
  const { targetDate } : CountdownTimerProps = props;
  const target: string = formatTargetDate(targetDate);

  return (
      <div>
        <header>{`Time until: ${target}`}</header>
        <Countdown targetDate={targetDate} />
      </div>
  );
}

function formatTargetDate(date: Date): string {
  const format: Intl.DateTimeFormatOptions = {
    dateStyle: 'long',
    timeStyle: 'short'
  };

  const dateTimeFormat: string = new Intl.DateTimeFormat('en-us', format).format(date);
  const [newDate, newTime]: string[] = dateTimeFormat.split('at');

  return `${newTime}, ${newDate}`;
}

type CountdownProps = {
  targetDate: Date;
};

function Countdown(props: CountdownProps): ReactElement {
  const { targetDate }: CountdownProps = props;

  const [timeUnits, setTimeUnits]:  [TimeUnitCounts, Dispatch<SetStateAction<TimeUnitCounts>>] = useState(
      createCountdownTimeUnits(targetDate)
  );

  const {days, hours, minutes, seconds}: TimeUnitCounts = timeUnits;

  useEffect((): () => void => {
    const timeoutID: number = window.setTimeout((): void => {
      setTimeUnits(createCountdownTimeUnits(targetDate));
    }, 1000);

    return (): void => {
      clearTimeout(timeoutID);
    };
  });

  return (
    <div className='Countdown'>
      {days > 0 && (
        <Fragment>
          <CountdownTimeSegment label="Days" value={days}/>
          <Divider />
        </Fragment>
      )}
      <CountdownTimeSegment label="Hours" value={hours} />
      <Divider />
      <CountdownTimeSegment label="Minutes" value={minutes} />
      {days === 0 && (
        <Fragment>
          <Divider/>
          <CountdownTimeSegment label="Seconds" value={seconds} />
        </Fragment>
      )}
    </div>
  );
}

type CountdownTimeSegmentProps = {
  value: number;
  label: string;
}

function CountdownTimeSegment(props: CountdownTimeSegmentProps): ReactElement {
  const { value, label }: CountdownTimeSegmentProps = props;

  return (
      <div className='CountdownTimeSegment'>
        <div className='CountdownTimeSegmentValue'>{value}</div>
        <div className='CountdownTimeSegmentLabel'>{label}</div>
      </div>
  );
}

function Divider(): ReactElement {
  return <div className='Divider'/>;
}
