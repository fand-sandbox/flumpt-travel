import * as React from 'react';
import { Flux }   from 'flumpt';
import Clicker    from './Clicker';
import DebugPanel from '../middlewares/DebugPanel';

class App extends Flux {

  subscribe () {
    this.on('increment', () => {
      this.update(({ count, button }) => {
        return new Promise((resolve) => {
          setTimeout(() => {
            resolve({
              count : count + 1,
              button,
            });
          }, 600);
        });
      });
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
