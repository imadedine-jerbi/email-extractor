/**
 * 
 * @author Imadedine Jerbi
 * @since  1.0
 */

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  
  sendResponse({content: document.documentElement.innerHTML, options: request})
})