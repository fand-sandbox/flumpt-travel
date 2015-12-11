import * as React    from 'react';
import { Component } from 'flumpt';

import { undo, redo, commit, registerPanel, getState } from './traveler';

export class DebugPanel extends Component {

  constructor () {
    super();
    registerPanel(this);
    this.state = getState();
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

export default DebugPanel;
