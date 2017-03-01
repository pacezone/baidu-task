/**
 * 
 * @authors Your Name (you@example.org)
 * @date    2017-02-23 14:02:30
 * @version $Id$
 */
var addEvent = (function () {
	if (window.addEventListener) {
		return function(el,event,fn,capture) {
			el.addEventListener(event,fn,false)
		}
	} else if (window.attatchEvent) {
		return function(el,event,fn) {
			el.attatchEvent('on'+event,fn)
		}
	} else {
		return function(el,event,fn) {
			el['on'+event] = fn;
		}
			
	}
})()

