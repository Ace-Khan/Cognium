// COGNIUM Global Functions - Load First to Ensure Availability

console.log('Loading globals.js - essential functions first');

// Test function to verify browser functions work
function testBrowserFunctions() {
    console.log('Testing browser functions...');
    console.log('browserBack available:', typeof window.browserBack);
    console.log('browserForward available:', typeof window.browserForward); 
    console.log('browserGo available:', typeof window.browserGo);
    console.log('loadBrowserPage available:', typeof window.loadBrowserPage);
}

// Make test function globally available
window.testBrowserFunctions = testBrowserFunctions;

// Browser page loading function
window.loadBrowserPage = function(page) {
    console.log('loadBrowserPage called with:', page);
    const content = document.getElementById('browser-content');
    if (!content) {
        console.log('No browser-content element found');
        return;
    }
    
    const pages = {
        'home': '<h1>Welcome to COGNIUM.NET</h1><p>The Web Portal for Neural Computing</p><hr><p><a href="news.html" onclick="loadBrowserPage(\'news\'); return false;">Latest News</a></p>',
        'news': '<h1>COGNIUM NEWS</h1><p>March 15, 1994: System maintenance completed successfully.</p>',
        'research': '<h1>RESEARCH</h1><p>Current studies in neural pathway mapping and consciousness transfer.</p>'
    };
    
    content.innerHTML = pages[page] || pages['home'];
    if (window.playSound) window.playSound('click');
};

// Debug function
window.testBrowserFunctions = function() {
    console.log('=== TESTING BROWSER FUNCTIONS ===');
    console.log('browserBack available:', typeof window.browserBack === 'function');
    console.log('browserForward available:', typeof window.browserForward === 'function');
    console.log('browserGo available:', typeof window.browserGo === 'function');
    console.log('loadBrowserPage available:', typeof window.loadBrowserPage === 'function');
    
    // Test calling them
    try {
        browserBack();
        console.log('✅ browserBack called successfully');
    } catch (e) {
        console.error('❌ browserBack error:', e);
    }
    
    try {
        browserForward();
        console.log('✅ browserForward called successfully');
    } catch (e) {
        console.error('❌ browserForward error:', e);
    }
    
    try {
        browserGo();
        console.log('✅ browserGo called successfully');
    } catch (e) {
        console.error('❌ browserGo error:', e);
    }
    
    return 'Browser function test complete - check console above';
};

// File system debug function
window.testFileSystem = function() {
    console.log('Testing file system:');
    console.log('getFile available:', typeof window.getFile === 'function');
    console.log('updateFileContent available:', typeof window.updateFileContent === 'function');
    
    if (window.getFile) {
        const desktop = window.getFile('C:/Users/ereed/Desktop');
        console.log('Desktop folder:', desktop);
        if (desktop) {
            console.log('Desktop children:', Object.keys(desktop.children || {}));
        }
    }
};

console.log('globals.js loaded - functions should be available');
