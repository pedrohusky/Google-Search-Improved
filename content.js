// Initialize a dictionary to keep track of processed groups
var processedGroups = {};

// Function to check if an element is already processed
function isElementProcessed(element) {
    var id = element.getAttribute("data-id");
    return id in processedGroups;
}

// Function to mark an element as processed
function markElementAsProcessed(element, id) {
    element.setAttribute("data-id", id);
    processedGroups[id] = true;
}

function spawnCardInElements(elements) {
    // Loop through the elements
    for (var i = 0; i < elements.length; i++) {
        var element = elements[i];
        // If the element is already processed, skip it
        if (isElementProcessed(element)) continue;

        // If not processed, apply the "cardView" styles
        element.style.borderRadius = '10px';
        element.style.boxShadow = '0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19)';
        element.style.padding = '10px';
        element.style.margin = '15px 0';
        element.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        element.style.transition = 'all 0.3s ease-in-out';  // Ensure smooth transition effects
        element.style.overflow = 'hidden';

        // Mark the element as processed
        markElementAsProcessed(element, i);

        // Mark all child elements as processed
        var childElements = element.getElementsByTagName('*');
        for (var j = 0; j < childElements.length; j++) {
            markElementAsProcessed(childElements[j], `${i}-${j}`);
            // Add the 'no-hover' class to the child elements
            childElements[j].classList.add('no-hover');
        }
    }
}

// Get all elements with class 'g'
var elements = document.getElementsByClassName('g');
var isDarkMode = window.getComputedStyle(document.body).backgroundColor === 'rgb(32, 33, 36)';

// Get the disableTransition value from storage
chrome.storage.sync.get(['disableTransition'], function (result) {
    // Only apply the hover effect if disableTransition is false
    if (result.disableTransition) {
        // Create a style element for the hover effect
        var style = document.createElement('style');
        style.textContent = `
        .g[data-id]:hover {
            transition: all 0.3s ease-in-out;
            transform: scale(1.05);
        }
        .g[data-id] *:hover {
            transition: none;
            transform: none;
        }
        `;
        document.head.append(style);
    }
});

spawnCardInElements(elements)