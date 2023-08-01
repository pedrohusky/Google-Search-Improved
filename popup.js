window.addEventListener('DOMContentLoaded', (event) => {
    const checkbox = document.getElementById('disable-transition');

    // load the saved checkbox value from storage
    chrome.storage.sync.get(['disableTransition'], function (result) {
        checkbox.checked = result.disableTransition || false;
    });

    // save the checkbox value to storage whenever it changes
    checkbox.addEventListener('change', (event) => {
        chrome.storage.sync.set({ disableTransition: checkbox.checked }, function () {
            console.log('Transition disable value is set to ' + checkbox.checked);
        });
    });
});
