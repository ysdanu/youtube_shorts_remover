// content.js

// Function to remove YouTube Shorts elements
function removeYouTubeShorts() {
    // Remove the Shorts button from the sidebar menu
    // The sidebar menu items are 'a' elements with a title attribute
    let shortsSidebarButton = document.querySelector('a[title="Shorts"]');
    if (shortsSidebarButton) {
        // Hide the parent element to remove it from the sidebar
        shortsSidebarButton.parentElement.style.display = 'none';
    }

    // Remove the Shorts section from the home page
    // Find all sections that could be Shorts sections
    let shortsSections = document.querySelectorAll('ytd-rich-section-renderer, ytm-rich-shelf-renderer');
    shortsSections.forEach(function(section) {
        // Get the title of the section (works for both desktop and mobile)
        let titleElement = section.querySelector('yt-formatted-string#title, span#title');
        if (titleElement && titleElement.innerText.includes('Shorts')) {
            // Hide the Shorts section
            section.style.display = 'none';
        }
    });

    // Remove individual Shorts videos from the feed
    // Shorts videos have thumbnails that link to URLs containing '/shorts/'
    let shortsThumbnails = document.querySelectorAll('ytd-thumbnail a[href*="/shorts/"], a[href*="/shorts/"]');
    shortsThumbnails.forEach(function(thumbnail) {
        // Find the parent element representing the video item (covers desktop and mobile)
        let parent = thumbnail.closest('ytd-rich-item-renderer, ytd-video-renderer, ytm-compact-video-renderer, ytm-rich-item-renderer, ytm-rich-shelf-renderer, ytm-shorts-lockup-view-model');
        if (parent) {
            // Hide the entire video item
            parent.style.display = 'none';
        }
    });

    // Remove Shorts tab from channel pages
    // The Shorts tab is now a 'yt-tab-shape' element with a 'tab-title' of 'Shorts'
    let shortsTab = document.querySelector('yt-tab-shape[tab-title="Shorts"]');
    if (shortsTab) {
        // Hide the Shorts tab
        shortsTab.style.display = 'none';
    }

    // Remove Shorts from the channel's videos page
    // On the videos page, Shorts might appear with a badge indicating 'Shorts'
    let shortsBadges = document.querySelectorAll('ytd-badge-supported-renderer[icon="SHORTS"]');
    shortsBadges.forEach(function(badge) {
        // Hide the entire video item containing the Shorts badge
        let parent = badge.closest('ytd-grid-video-renderer, ytd-video-renderer');
        if (parent) {
            parent.style.display = 'none';
        }
    });

    // Remove any 'ytm-shorts-lockup-view-model' elements (specific to mobile)
    let mobileShortsElements = document.querySelectorAll('ytm-shorts-lockup-view-model');
    mobileShortsElements.forEach(function(element) {
        // Hide the Shorts lockup elements on mobile
        element.style.display = 'none';
    });
}

// Run the function on page load
removeYouTubeShorts();

// Since YouTube dynamically loads content, we need to observe changes in the DOM
// Create a MutationObserver to watch for changes and run our function again
const observer = new MutationObserver(function(mutations, observer) {
    // Run our function to remove Shorts elements whenever the DOM changes
    removeYouTubeShorts();
});

// Start observing the document body for added or removed child elements
observer.observe(document.body, { childList: true, subtree: true });
