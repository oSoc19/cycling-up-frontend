import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/lab/Slider';
import { callbackify } from 'util';

const useStyles = makeStyles(theme => ({
  root: {
    width: "30vw",
    position: "absolute",
    bottom: "20px",
    left: "calc((50vw - 30vw) / 2.5) "
  },

  thumb: {
    width: "15px",
    height: "15px",
  }
}));

const marks = [
  {
    value: 1980,
    label: '1980',
  },
  {
    value: 1990,
    label: '1990',
  },
  {
    value: 2000,
    label: '2000',
  },
  {
    value: 2010,
    label: '2010',
  },
];

const valuetext = value => {
  return `${value}°C`;
}

const valueLabelFormat = value => {
  return marks.findIndex(mark => mark.value === value) + 1;
}

export default function DiscreteSlider() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Slider
        defaultValue={2019}
        getAriaValueText={valuetext}
        aria-labelledby="discrete-slider-always"
        step={1}
        marks={marks}
        valueLabelDisplay="on"
        max = {2019}
        min = {1980}
      />
    </div>
  );
}
