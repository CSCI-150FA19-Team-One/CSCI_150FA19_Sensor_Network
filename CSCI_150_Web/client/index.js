import React from 'react';
import ReactDOM from 'react-dom';

import './styles.css';

import Tabs from './tabsman';
require('./styles.css')

//Testing tabs of different graphs
function Graph() {
    return (
      <div>
        <h1>Tabs Demo</h1>
        <Tabs>
            <div label="graphOne">
                Data goes here!
            </div>
            <div label="graphTwo">
                Data also goes here!
            </div>
            <div label="graphThree">
                Guess what goes here...That's right, data!
            </div>
            </Tabs>
      </div>
    );
  }
  
  const container = document.createElement('div');
  document.body.appendChild(container);
  render(<App />, container);