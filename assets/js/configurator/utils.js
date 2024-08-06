import { frames, houseFronts, catalogs, glasses, windowFrames } from './api.js';

export const handleLoad = (e) => {
    if(e.target.complete){
         e.target.classList.add('loaded')
         e.target.parentElement.classList.add('loaded')
    }
  }

  window.handleLoad = handleLoad;

