import * as React from 'react';
import { Component } from 'flumpt';

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
    panel.setState({
      states,
      undoCount,
    });
  });
  app.update(x => x);
};

const undo = () => {
  undoCount = Math.min(undoCount + 1, states.length);
  updatePanels();
};

const redo = () => {
  undoCount = Math.max(undoCount - 1, 0);
  updatePanels();
};

const commit = () => {
  committed = states[states.length - 1 - undoCount] || committed;
  states    = [];
  undoCount = 0;
  updatePanels();
};

export class Viewer extends Component {

  constructor () {
    super();
    panels.push(this);
    this.state = {
      states,
      undoCount,
    };
  }

  renderHeader () {
    return (
      <div>
        <button onClick={undo}>Undo</button>
        <button onClick={redo}>Redo</button>
        <button onClick={commit}>Commit</button>
      </div>
    );
  }

  renderStates () {
    const { states, undoCount } = this.state;
    const renderedStates = states.map((s, i) => {
      const style = {
        color: (i < states.length - undoCount) ? 'white' : 'gray',
      };
      return (
        <li key={i} style={style}>
          {JSON.stringify(s)}
        </li>
      );
    });

    return <ul>{renderedStates}</ul>;
  }

  render () {
    const style = {
      position   : 'fixed',
      width      : '300px',
      height     : '100%',
      top        : 0,
      right      : 0,
      background : '#123',
      color      : 'white',
    };

    return  (
      <div style={style}>
        {this.renderHeader()}
        {this.renderStates()}
      </div>
    );
  }

}
