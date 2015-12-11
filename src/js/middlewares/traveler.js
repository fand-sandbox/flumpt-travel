import * as React from 'react';

let committed = null;
let current   = null;
let states    = [];
let undoCount = 0;
let lastState = null;
const panels  = [];

let app = null;
export const bindApp = (_app) => {
  app = _app;
};

let isTraveling = false;


export const traveler = (state) => {
  if (isTraveling) {
    isTraveling = false;
  }
  else {
    // Remove undoed states
    if (undoCount !== 0) {
      states.splice(- undoCount);
    }

    lastState = state;
    undoCount = 0;

    if (committed === null) {
      committed = state;
    }
    else {
      states.push(state);
    }
  }

  current = states[states.length - 1 - undoCount] || committed;
  return current;

};

const updatePanels = () => {
  isTraveling = true;
  panels.forEach((panel) => {
    panel.setState(getState());
  });
  app.update(x => x);
};

export const undo = () => {
  undoCount = Math.min(undoCount + 1, states.length);
  updatePanels();
};

export const redo = () => {
  undoCount = Math.max(undoCount - 1, 0);
  updatePanels();
};

export const commit = () => {
  committed = states[states.length - 1 - undoCount] || committed;
  states    = [];
  undoCount = 0;
  updatePanels();
};

export const registerPanel = (panel) => {
  panels.push(panel);
};

export const getState = () => {
  return {
    states,
    undoCount,
    committed,
  };
};
