(function() {
    'use strict';

    // --- Helper: Element Deletion/Styling Functions ---
    function applyStylesToElement(element, styles) {
        if (element && styles) {
            for (const prop in styles) {
                if (Object.prototype.hasOwnProperty.call(styles, prop)) {
                    element.style[prop] = styles[prop];
                }
            }
        }
    }

    function deleteElement(selector, all = false, parentNode = document) {
        try {
            if (all) {
                const elements = parentNode.querySelectorAll(selector);
                elements.forEach(el => el.remove());
                if (elements.length > 0) return true;
            } else {
                const element = parentNode.querySelector(selector);
                if (element) {
                    element.remove();
                    return true;
                }
            }
        } catch (e) { /* console.error(`Error removing ${selector}:`, e); */ }
        return false;
    }

    function deleteElementsByMultipleClasses(spaceSeparatedClassNames) {
        if (!spaceSeparatedClassNames || typeof spaceSeparatedClassNames !== 'string' || spaceSeparatedClassNames.trim() === '') { return; }
        const selector = '.' + spaceSeparatedClassNames.trim().split(/\s+/).filter(cn => cn.length > 0).join('.');
        if (selector === '.') { return; }
        deleteElement(selector);
    }

    // --- Initial Deletion Calls (Static Elements) ---
    console.log("Performing initial cleanup of static elements...");
    deleteElementsByMultipleClasses("gb_Fa gb_Jd gb_2d gb_H gb_Lc gb_e gb_2a gb_Fd");
    deleteElementsByMultipleClasses("gb_Cd gb_Zd gb_xd");
    deleteElementsByMultipleClasses("o3j99 LLD4me LS8OJ");
    deleteElementsByMultipleClasses("FPdoLc lJ9FBc"); // Static buttons
    deleteElementsByMultipleClasses("vcVZ7d");
    deleteElementsByMultipleClasses("c93Gbe");
    deleteElementsByMultipleClasses("KxwPGc AghGtd");
    deleteElementsByMultipleClasses("KxwPGc PrDSKc");
    deleteElementsByMultipleClasses("lnXdpd");
    deleteElementsByMultipleClasses("k1zIA");
    deleteElement("img[alt='Google']");
    deleteElement("#prm-pt");
    deleteElement(".qarstb");
    console.log("Initial static element removal process complete.");

    // --- Configuration for Custom Styles ---
    const customStylesConfig = {
        backgroundImageUrl: 'https://source.unsplash.com/random/1920x1080/?abstract,dark',
        fallbackBackgroundColor: '#1a1a1d',
        customText: "OnlyGoogle!",
        customTextStyles: {
            color: '#c3073f',
            fontSize: '3.5em',
            fontFamily: "'Orbitron', sans-serif",
            fontWeight: '700',
            textAlign: 'center',
            textShadow: '1px 1px 2px #000000, 0 0 25px #c3073f, 0 0 5px #6f2232',
            marginTop: '8vh',
            marginBottom: '4vh',
            letterSpacing: '2px'
        },
        searchBarContainerSelector: 'div.SDkEP',
        searchBarStyles: {
            backgroundColor: '#303134',
            padding: '16px 20px',
            borderRadius: '28px',
            boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.30)',
            width: '700px',
            maxWidth: '700px',
            marginBottom: '0px', // Remove bottom margin if suggestions appear directly below
            boxSizing: 'border-box',
            border: '1px solid #3c4043',
            position: 'relative', // For correct positioning of suggestions panel
            zIndex: '999'         // Ensure it's above the suggestions panel's potential default z-index
        },
        // NEW: Styles for the suggestions panel
        suggestionsPanelSelector: '.UUbT9', // Common selector for suggestions panel, or .OBMEnb
        suggestionsPanelStyles: {
            backgroundColor: '#303134', // Match search bar
            // borderRadius: '0 0 28px 28px', // Round bottom corners if directly attached
                                            // Or full '28px' if it's a separate floating panel
            borderRadius: '28px',
            boxShadow: '0px 8px 20px rgba(0, 0, 0, 0.35)', // Similar shadow
            border: '1px solid #3c4043',
            borderTop: 'none', // If directly attached and search bar has bottom border
            padding: '8px 0 16px 0', // Adjust padding as needed for suggestion items
            boxSizing: 'border-box',
            overflow: 'hidden' // To respect rounded corners for children
        },
        // Selectors for items INSIDE the suggestions panel to HIDE
        elementsToHideInsideSuggestions: [
            '.FPdoLc',           // Buttons container inside suggestions
            'div[jsname="MUxGbd"]' // "Report search predictions" link
        ],
        // Other dynamic popups to completely remove
        unwantedDynamicPopups: [
            '.MUFPAc', // Voice search popup
            // Add other selectors for unwanted dynamic elements here
        ]
    };

    // --- Google Font Loader ---
    function addGoogleFont(fontFamily) {
        // ... (font loader code remains the same) ...
        const fontName = fontFamily.split(',')[0].trim().replace(/'|"/g, '');
        if (fontName && !document.querySelector(`link[href*="${fontName.replace(/\s/g, '+')}"]`)) {
            const link = document.createElement('link');
            link.href = `https://fonts.googleapis.com/css2?family=${fontName.replace(/\s/g, '+')}:wght@400;700&display=swap`;
            link.rel = 'stylesheet';
            document.head.appendChild(link);
            console.log(`Added Google Font: ${fontName}`);
        }
    }
    if (customStylesConfig.customTextStyles.fontFamily.toLowerCase().includes('orbitron')) {
        addGoogleFont(customStylesConfig.customTextStyles.fontFamily);
    }

    // --- Apply Custom Branding Function ---
    function applyCustomBranding(config, isInitialCall = true) {
        if(isInitialCall) console.log("Applying initial custom branding...");
        document.documentElement.style.height = '100%';
        document.documentElement.style.backgroundColor = config.fallbackBackgroundColor;
        document.body.style.backgroundImage = config.backgroundImageUrl ? `url('${config.backgroundImageUrl}')` : 'none';
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundPosition = 'center center';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundColor = config.fallbackBackgroundColor;
        document.body.style.minHeight = '100vh';
        document.body.style.margin = '0';
        document.body.style.padding = '0';
        document.body.style.display = 'flex';
        document.body.style.flexDirection = 'column';
        document.body.style.alignItems = 'center';
        document.body.style.justifyContent = 'center';

        let customTextElement = document.getElementById('customHeaderText');
        if (!customTextElement && config.customText && config.customText.trim() !== '') {
            customTextElement = document.createElement('div');
            customTextElement.id = 'customHeaderText';
        }
        if (customTextElement && config.customText && config.customText.trim() !== '') {
            customTextElement.textContent = config.customText;
            applyStylesToElement(customTextElement, config.customTextStyles);
        }

        const searchBarContainer = document.querySelector(config.searchBarContainerSelector);
        let layoutParent = document.body;

        if (searchBarContainer) {
            if (searchBarContainer.parentNode && searchBarContainer.parentNode !== document.body) {
                layoutParent = searchBarContainer.parentNode;
                applyStylesToElement(layoutParent, {
                    background: 'transparent', backgroundColor: 'transparent', border: 'none',
                    boxShadow: 'none', padding: '0', display: 'flex',
                    flexDirection: 'column', alignItems: 'center'
                });
            }
            if (customTextElement && customTextElement.parentNode !== layoutParent) {
                layoutParent.insertBefore(customTextElement, searchBarContainer);
            } else if (customTextElement) { // Ensure order if already child
                 layoutParent.insertBefore(customTextElement, searchBarContainer);
            }
            applyStylesToElement(searchBarContainer, config.searchBarStyles);

            const searchTextArea = searchBarContainer.querySelector('textarea.gLFyf');
            if (searchTextArea) { searchTextArea.style.color = '#e8eaed'; }
        } else {
            if (customTextElement && customTextElement.parentNode !== document.body) {
                 document.body.insertBefore(customTextElement, document.body.firstChild);
            }
            if(isInitialCall) console.warn(`Search bar ("${config.searchBarContainerSelector}") not found for styling.`);
        }
        if(isInitialCall) console.log("Initial custom branding application complete.");
    }

    // --- Run initial styling ---
    applyCustomBranding(customStylesConfig);


    // --- MutationObserver to Style/Remove Dynamic Elements ---
    const observerCallback = function(mutationsList, observer) {
        let processedNode = false;
        for (const mutation of mutationsList) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) { // Check if it's an Element
                        // 1. Style the main suggestions panel
                        if (node.matches && node.matches(customStylesConfig.suggestionsPanelSelector)) {
                            console.log(`MutationObserver: Styling added suggestions panel:`, node);
                            processedNode = true;
                            applyStylesToElement(node, customStylesConfig.suggestionsPanelStyles);

                            const searchBarContainer = document.querySelector(customStylesConfig.searchBarContainerSelector);
                            if (searchBarContainer) {
                                const sbRect = searchBarContainer.getBoundingClientRect();
                                // We need to account for scroll position for absolute positioning
                                node.style.position = 'absolute';
                                node.style.top = `${window.scrollY + sbRect.bottom}px`; // Use sbRect.bottom directly if no gap
                                node.style.left = `${window.scrollX + sbRect.left}px`;
                                node.style.width = `${sbRect.width}px`;
                                node.style.zIndex = '1000';
                                node.style.marginTop = '0px'; // Override any default margin from Google
                            }

                            // Hide specified elements INSIDE this newly styled suggestions panel
                            customStylesConfig.elementsToHideInsideSuggestions.forEach(hideSelector => {
                                deleteElement(hideSelector, true, node); // Delete all matches inside the panel
                            });

                            // Style suggestion items for better visibility (example)
                            const suggestionItems = node.querySelectorAll('ul[role="listbox"] li, div[role="listbox"] div[role="option"]');
                            suggestionItems.forEach(item => {
                                item.style.color = '#e0e0e0'; // Lighter text for suggestions
                                item.style.padding = '8px 20px'; // Consistent padding
                            });

                        } else {
                            // 2. Remove other unwanted dynamic popups if the added node wasn't the main suggestions panel
                            if (!processedNode) { // Only proceed if we haven't already processed this node as a suggestions panel
                                for (const selector of customStylesConfig.unwantedDynamicPopups) {
                                    if (node.matches && node.matches(selector)) {
                                        console.log(`MutationObserver: Removing added node matching: ${selector}`);
                                        node.remove();
                                        break;
                                    }
                                    const childMatch = node.querySelector ? node.querySelector(selector) : null;
                                    if (childMatch) {
                                        console.log(`MutationObserver: Removing descendant matching: ${selector}`);
                                        childMatch.remove();
                                    }
                                }
                            }
                        }
                    }
                });
            }
        }
        // Re-apply main branding if significant changes happened, to ensure layout integrity.
        // This is a bit heavy-handed, might need refinement if causing issues.
        // if (processedNode) {
        //     applyCustomBranding(customStylesConfig, false);
        // }
    };

    const observer = new MutationObserver(observerCallback);
    const observerConfig = { childList: true, subtree: true };

    // Start observing after a brief delay to ensure initial setup is done.
    setTimeout(() => {
        observer.observe(document.body, observerConfig);
        console.log("MutationObserver set up to watch for dynamic elements.");
    }, 500);


})();
