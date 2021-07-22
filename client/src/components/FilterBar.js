import { Divider, Toolbar } from '@material-ui/core'
import { ToggleButton, ToggleButtonGroup } from '@material-ui/lab';

import PropTypes from 'prop-types';
import React from 'react';
import { alpha } from '@material-ui/core/styles';
import { makeStyles } from '@material-ui/core/styles';

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
  divider: {
    margin: theme.spacing(0.5, 1.5),
  },

}));

export default function FilterBar(props) {
  const classes = useStyles();
  const { filterBarSections, filterSelections, handleSelection } = props;

  return (
    <Toolbar variant="regular" disableGutters={true} className={classes.toolbarSecondary}>
      <ToggleButtonGroup
        value={filterSelections}
        onChange={handleSelection}
        aria-label="filterSelections"
        size="medium"
        classes={{ grouped: classes.buttonGroup }}
      >
        <ToggleButton
          aria-label={filterBarSections.all}
          value={filterBarSections.all}
          className={classes.buttonColor}
          key={filterBarSections.all}
        >
          {filterBarSections.all}
        </ToggleButton>
        <Divider flexItem orientation="vertical" className={classes.divider} />
        {filterBarSections.filters.map((filter) => (
          <ToggleButton
            aria-label={filter}
            value={filter}
            className={classes.buttonColor}
            key={filter}>
            {filter}
          </ToggleButton>
        ))}
        <Divider flexItem orientation="vertical" className={classes.divider} />
        <ToggleButton
          aria-label={filterBarSections.favorites}
          value={filterBarSections.favorites}
          className={classes.buttonColor}
          key={filterBarSections.favorites}
        >
          {filterBarSections.favorites}
        </ToggleButton>
      </ToggleButtonGroup>
    </Toolbar >
  );
}

FilterBar.propTypes = {
  filterBarSections: PropTypes.object,
  filterSelections: PropTypes.arrayOf(PropTypes.string),
  handleSelection: PropTypes.func
};