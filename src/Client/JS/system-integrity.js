const showNotification = () => {
    const notification = document.getElementById('customNotification');
    if (notification) {
        notification.style.display = 'block';
    }
};

const hideNotification = () => {
    const notification = document.getElementById('customNotification');
    if (notification) {
        notification.style.display = 'none';
    }
};

const observerCallback = (mutationsList, observer) => {
    mutationsList.forEach(mutation => {
        mutation.addedNodes.forEach(node => {
            if (node.nodeType === 1) {
                // Check if the injected element is intentional
                const isIntentional = node.classList.contains(
                    'self-html-injection'
                ); // Use a class or other attribute you intentionally set

                if (!isIntentional) {
                    // It's not intentional, remove it and show the on-site notification
                    node.parentNode.removeChild(node);
                    showNotification();
                }
            }
        });
    });
};

// Create a new observer with the callback
const observer = new MutationObserver(observerCallback);

// Start observing the entire document for configured mutations
observer.observe(document.documentElement, { childList: true, subtree: true });
