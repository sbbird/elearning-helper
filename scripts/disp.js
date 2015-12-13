function injectScript(func) {
  var actualCode = '(' + func + ')();';
  var script = document.createElement('script');
  script.textContent = actualCode;
  (document.head||document.documentElement).appendChild(script);
  script.parentNode.removeChild(script);
}

function disp_answer(){
  function seek_frame(frame) {
    if( typeof frame.disp_correct_CR === "function"){
      /* current frame is the question frame, display answers*/
      frame.disp_correct_CR("");
      frame.disp_correct_TF("");
      frame.disp_correct_PD("");
    } else if (frame.frames.length > 1) {
      seek_frame(frame.frames[1]);
    }
  };

  setInterval(function(){
    seek_frame(window.frames[1]);
  }, 500);
}

injectScript(disp_answer);
