//https://stackoverflow.com/questions/9975810/make-iframe-automatically-adjust-height-according-to-the-contents-without-using
var frameObj
function resizeIframe(obj) {
  frameObj = obj
   obj.style.height = obj.contentWindow.document.body.scrollHeight + 'px';
   obj.style.width = obj.contentWindow.document.body.scrollWidth + 'px';
 }