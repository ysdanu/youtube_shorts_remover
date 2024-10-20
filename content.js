// content.js

// Function to remove YouTube Shorts elements and handle Shorts URLs
function removeYouTubeShorts() {
    // Redirect Shorts URLs to the standard video URL
    if (window.location.pathname.startsWith('/shorts/')) {
        let videoId = window.location.pathname.split('/shorts/')[1];
        if (videoId) {
            // Redirect to the standard watch page
            window.location.replace(`https://www.youtube.com/watch?v=${videoId}`);
            return; // Exit the function to prevent further execution
        }
    }

    // Remove the Shorts button from the sidebar menu
    let shortsSidebarButton = document.querySelector('a[title="Shorts"]');
    if (shortsSidebarButton) {
        shortsSidebarButton.parentElement.style.display = 'none';
    }

    // Remove the Shorts section from the home page and search results
    let shortsSections = document.querySelectorAll('ytd-rich-section-renderer, ytm-rich-shelf-renderer, ytd-reel-shelf-renderer');
    shortsSections.forEach(function (section) {
        let titleElement = section.querySelector('yt-formatted-string#title, span#title, div#title-container #title');
        if (titleElement && titleElement.innerText.includes('Shorts')) {
            section.style.display = 'none';
        }
    });

    // Remove individual Shorts videos from the feed
    let shortsThumbnails = document.querySelectorAll('ytd-thumbnail a[href*="/shorts/"], a[href*="/shorts/"]');
    shortsThumbnails.forEach(function (thumbnail) {
        let parent = thumbnail.closest('ytd-rich-item-renderer, ytd-video-renderer, ytm-compact-video-renderer, ytm-rich-item-renderer, ytm-rich-shelf-renderer, ytm-shorts-lockup-view-model, ytd-reel-item-renderer');
        if (parent) {
            parent.style.display = 'none';
        }
    });

    // Remove Shorts tab from channel pages
    let shortsTab = document.querySelector('yt-tab-shape[tab-title="Shorts"]');
    if (shortsTab) {
        shortsTab.style.display = 'none';
    }

    // Remove Shorts from the channel's videos page
    let shortsBadges = document.querySelectorAll('ytd-badge-supported-renderer[icon="SHORTS"]');
    shortsBadges.forEach(function (badge) {
        let parent = badge.closest('ytd-grid-video-renderer, ytd-video-renderer');
        if (parent) {
            parent.style.display = 'none';
        }
    });

    // Remove mobile-specific Shorts elements
    let mobileShortsElements = document.querySelectorAll('ytm-shorts-lockup-view-model, ytm-shorts-lockup-view-model-v2');
    mobileShortsElements.forEach(function (element) {
        element.style.display = 'none';
    });

    // Remove Shorts filter chip from search results
    let shortsChips = document.querySelectorAll('yt-chip-cloud-chip-renderer');
    shortsChips.forEach(function (chip) {
        let textElement = chip.querySelector('yt-formatted-string#text');
        if (textElement && textElement.innerText.includes('Shorts')) {
            chip.style.display = 'none';
        }
    });
}

// Run the function on page load
removeYouTubeShorts();

// Observe changes in the DOM to catch dynamically loaded content
const observer = new MutationObserver(function (mutations, observer) {
    removeYouTubeShorts();
});

// Start observing the document body
observer.observe(document.body, { childList: true, subtree: true });
