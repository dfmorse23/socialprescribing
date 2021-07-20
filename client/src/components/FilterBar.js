import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

import PropTypes from 'prop-types';
import React from 'react';
import { Toolbar } from '@material-ui/core'
import { alpha } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
  toolbarSecondary: {
    disableGutters: true,
    justifyContent: 'center',
    paddingBottom: theme.spacing(4.5),
  },
  buttonColor: {
    "&.Mui-selected": {
      backgroundColor: alpha(theme.palette.titleColor, .25),
      color: 'inherit'
    },
    "&:hover": {
      backgroundColor: alpha(theme.palette.titleColor, .25),
    },
    "&.Mui-selected:hover": {
      backgroundColor: alpha(theme.palette.titleColor, .25),
    },

    color: 'inherit',
    textTransform: 'none',
  },
  buttonGroup: {
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    border: 'none',
    '&:not(:first-child)': {
      borderRadius: theme.shape.borderRadius,
    },
    '&:first-child': {
      borderRadius: theme.shape.borderRadius,
    },
  },
}));

export default function FilterBar(props) {
  const classes = useStyles();
  const { filters } = props;
  const [selections, setSelections] = useState(() => []);

  const handleSelection = (event, newSelections) => {
    setSelections(newSelections);
  }

  return (
    <Toolbar variant="regular" disableGutters={true} className={classes.toolbarSecondary}>
      <ToggleButtonGroup value={selections} onChange={handleSelection} aria-label="selections" size="medium" classes={{ grouped: classes.buttonGroup }}>
        {filters.map((filter) => (
          <ToggleButton aria-label={filter.title} value={filter.title} className={classes.buttonColor} key={filter.title}>{filter.title}</ToggleButton>
        ))}
      </ToggleButtonGroup>
    </Toolbar >
  );
}

FilterBar.propTypes = {
  filters: PropTypes.array,
};