import * as React from 'react';
import { Flux }   from 'flumpt';
import Clicker    from './Clicker';
import DebugPanel from '../middlewares/DebugPanel';

class App extends Flux {

  subscribe () {
    this.on('increment', () => {
      this.update(({ count, button }) => ({
        count : count + 1,
        button,
      }));
    });
  }

  render (state) {
    return (
      <div>
        <Clicker {...state}/>
        <DebugPanel />
      </div>
    );

  }

}

export default App;
