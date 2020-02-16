/**
 * This JavaScript adds a "min-width" attribute to the viewport meta tag. If
 * the device's width is less than the min-width, we will scale the viewport
 * to the min-width; otherwise we will leave the meta tag alone.
 *
 * This script must be added *after* the viewport meta tag, since it relies on
 * that tag already being available in the DOM.
 *
 * Implementation note: The reason we remove the old tag and insert a new one
 *                      is that Firefox doesn't pick up changes to the viewport
 *                      meta tag.
 *
 * Author: Brendan Long <self@brendanlong.com> & August Zellmer
 * License: Public Domain - http://unlicense.org/
 * See: https://github.com/brendanlong/viewport-min-width-polyfill
 */
 
var initialViewport = null;
var minWidth = null;

initMinViewportWidth();

function initMinViewportWidth(){
	initialViewport = document.querySelector("meta[name=viewport]");
	if (!initialViewport) {
		console.warn("No meta[name=viewport] element found. Minimum viewport width cannot be set. Please ensure that the meta[name=viewport] element has been loaded before function updateMetaViewport() is called.");
		return;
	}
	
	try{
		minWidth = getMinWidth(initialViewport);
	}
	catch(const s){
		console.warn(s);
		return;
	}
}
 
function updateMetaViewport() {
	if(!initialViewport || !minWidth){
		console.warn("Function initMinViewportWidth() has not been called. Minimum viewport width cannot be set. Please ensure that function initMinViewportWidth() is called before function updateMetaViewport().");
	}
	
	if (screen.width < minWidth) {
		const newViewport = initialViewport;
		
		const content = initialViewport.getAttribute("content");
		content = replaceWidth(content, minWidth);
		newViewport.setAttribute("content", content);
		
		document.head.removeChild(initialViewport);
		document.head.appendChild(newViewport);
	}
}

function getMinWidth(initialViewport){
	const content = initialViewport.getAttribute("content");
	const parts = content.split(",");
	for (var i = 0; i < parts.length; ++i) {
		const part = parts[i].trim();
		const pair = part.split("=");
		if (pair[0] === "min-width") {
			const minWidth parseInt(pair[1]);
			if(!isNaN(minWidth){
				return minWidth;
			}
			throw "Minimum viewport width cannot be set to a non-numeric value.";
		}
	}
	throw "No min-width property found in the content of the meta[name=viewport] element. Minimum viewport width cannot be set.";
}

function replaceWidth(content, minWidth){
	const regex = /width *= *.*?,/;
	const newWidth = "width=".concat(minWidth);
	const newContent = content.replace(regex, newWidth);
	return newContent;
}
	
	
	
