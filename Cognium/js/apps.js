// COGNIUM Applications - Act I Implementation

// ===== GLOBAL FUNCTION DEFINITIONS (to avoid reference errors) =====

// Browser navigation functions - these MUST be available globally for HTML onclick
function browserBack() {
    const browserContent = document.querySelector('#browser-content');
    if (browserContent) {
        browserContent.innerHTML = '<div class="browser-message">Going back...</div>';
        setTimeout(() => {
            if (typeof loadBrowserPage === 'function') {
                loadBrowserPage('home');
            }
        }, 500);
    }
    if (typeof playSound === 'function') playSound('click');
}

function browserForward() {
    const browserContent = document.querySelector('#browser-content');
    if (browserContent) {
        browserContent.innerHTML = '<div class="browser-message">Going forward...</div>';
        setTimeout(() => {
            if (typeof loadBrowserPage === 'function') {
                loadBrowserPage('home');
            }
        }, 500);
    }
    if (typeof playSound === 'function') playSound('click');
}

function browserGo() {
    const urlInput = document.querySelector('#browser-url');
    if (urlInput && urlInput.value) {
        if (typeof loadBrowserPage === 'function') {
            loadBrowserPage(urlInput.value);
        }
    } else {
        if (typeof loadBrowserPage === 'function') {
            loadBrowserPage('home');
        }
    }
    if (typeof playSound === 'function') playSound('click');
}

// Ensure these are immediately available in global scope
window.browserBack = browserBack;
window.browserForward = browserForward;
window.browserGo = browserGo;

// File Explorer function
window.launchFileExplorer = function(path = 'C:/Users/ereed/Desktop') {
    if (typeof createExplorerWindow === 'function') {
        createExplorerWindow(path);
    }
};

window.explorer = window.launchFileExplorer;

// Debug function to check if all required functions are available
window.checkFunctions = function() {
    const functions = ['browserBack', 'browserForward', 'browserGo', 'launchFileExplorer', 'getFile', 'updateFileContent', 'playSound', 'loadBrowserPage'];
    functions.forEach(func => {
        console.log(`${func}:`, typeof window[func] !== 'undefined' ? 'Available' : 'Missing');
    });
    return 'Check console for function availability';
};

const apps = {
    'Cognium_Explorer.app': {
        name: 'Cognium Explorer',
        icon: 'assets/Images/Icons/Microsoft%20Windows%203%20File%20Manager.png',
        launch: (path) => {
            // If path is the app itself, open the desktop instead
            if (!path || path.endsWith('.app')) {
                createExplorerWindow('C:/Users/ereed/Desktop');
            } else {
                createExplorerWindow(path);
            }
        }
    },
    'Notepad.app': {
        name: 'Notepad',
        icon: 'assets/Images/Icons/Microsoft%20Windows%203%20Notepad.png',
        launch: (filePath) => {
            // If no specific file path, check for last opened file
            if (!filePath || filePath.endsWith('.app')) {
                const lastFile = localStorage.getItem('lastNotepadFile');
                if (lastFile) {
                    const lastFileExists = getFile(lastFile);
                    if (lastFileExists && lastFileExists.type === 'file') {
                        console.log('Opening last opened file:', lastFile);
                        openNotepad(lastFile);
                        return;
                    }
                }
            }
            openNotepad(filePath);
        }
    },
    'Terminal.app': {
        name: 'Terminal',
        icon: 'assets/Images/Icons/Microsoft%20Windows%203%20MS-DOS%20Prompt.png',
        launch: () => {
            createTerminalWindow();
        }
    },
    'Settings.app': {
        name: 'Control Panel',
        icon: 'assets/Images/Icons/Microsoft%20Windows%203%20Control%20Panel.png',
        launch: () => {
            createSettingsWindow();
        }
    },
    'CodeEditor.app': {
        name: 'Code Editor',
        icon: 'assets/Images/Icons/Microsoft%20Windows%203%20MS%20DOS%20Editor.png',
        launch: (filePath) => {
            // If no specific file path, check for last opened file
            if (!filePath || filePath.endsWith('.app')) {
                const lastFile = localStorage.getItem('lastCodeEditorFile');
                if (lastFile) {
                    const lastFileExists = getFile(lastFile);
                    if (lastFileExists && lastFileExists.type === 'file') {
                        console.log('Opening last opened code file:', lastFile);
                        openCodeEditor(lastFile);
                        return;
                    }
                }
            }
            openCodeEditor(filePath);
        }
    },
    'Calendar.app': {
        name: 'Calendar',
        icon: 'assets/Images/Icons/Microsoft%20Windows%203%20Calendar.png',
        launch: () => {
            createCalendarWindow();
        }
    },
    'Calculator.app': {
        name: 'Calculator',
        icon: 'assets/Images/Icons/Microsoft%20Windows%203%20Calculator001.png',
        launch: () => {
            createCalculatorWindow();
        }
    },
    'Solitaire.exe': {
        name: 'Solitaire',
        icon: 'assets/Images/Icons/Microsoft%20Windows%203%20Hearts.png',
        launch: () => {
            createSolitaireWindow();
        }
    },
    'Minesweeper.exe': {
        name: 'Minesweeper',
        icon: 'assets/Images/Icons/Microsoft%20Windows%203%20Minesweeper.png',
        launch: () => {
            createMinesweeperWindow();
        }
    },
    'Chess.exe': {
        name: 'Chess',
        icon: 'assets/Images/Icons/Microsoft%20Windows%203%20Chess.png',
        launch: () => {
            createChessWindow();
        }
    },
    'Paint.exe': {
        name: 'Paint',
        icon: 'assets/Images/Icons/Microsoft%20Windows%203%20Painbrush.png',
        launch: () => {
            createPaintWindow();
        }
    },
    'SoundRecorder.exe': {
        name: 'Sound Recorder',
        icon: 'assets/Images/Icons/Microsoft%20Windows%203%20Sound%20Recorder.png',
        launch: () => {
            createSoundRecorderWindow();
        }
    },
    'MediaPlayer.exe': {
        name: 'Media Player',
        icon: 'assets/Images/Icons/Microsoft%20Windows%203%20Media%20Player.png',
        launch: () => {
            createMediaPlayerWindow();
        }
    },
    'WebBrowser.exe': {
        name: 'Web Browser',
        icon: 'assets/Images/Icons/Microsoft%20Windows%203%20PROGM002.png',
        launch: () => {
            createWebBrowserWindow();
        }
    },
    'Chat.exe': {
        name: 'Chat Client',
        icon: 'assets/Images/Icons/Microsoft%20Windows%203%20Chat.png',
        launch: () => {
            createChatWindow();
        }
    },
    'DESTROY_JANUS_NOW.exe': {
        name: 'DESTROY JANUS - EMERGENCY PROTOCOL',
        icon: 'assets/Images/Icons/Microsoft%20Windows%203%20%20MSMAI004.png',
        launch: () => {
            createDestroyJanusWindow();
        }
    }
};

// Utility functions for all apps (defined first to avoid reference errors)
window.getHighScore = function(game) {
    const scores = JSON.parse(localStorage.getItem('cognium_scores') || '{}');
    return scores[game] || 0;
};

window.saveHighScore = function(game, score) {
    const scores = JSON.parse(localStorage.getItem('cognium_scores') || '{}');
    if (!scores[game] || score > scores[game]) {
        scores[game] = score;
        localStorage.setItem('cognium_scores', JSON.stringify(scores));
        return true;
    }
    return false;
};

// Notepad launcher function
window.openNotepad = function(filePath) {
    createNotepadWindow(filePath);
};

// Essential utility functions for all apps
window.closeCurrentDialog = function(button) {
    const windowEl = button.closest('.window');
    if (windowEl && window.windowManager) {
        window.windowManager.closeWindow(windowEl.id);
    }
};

window.showError = function(title, message) {
    createWindow({
        title: title || 'Error',
        body: `
            <div style="padding: 16px; text-align: center;">
                <img src="assets/Images/Icons/Microsoft%20Windows%203%20%20MSMAI004.png" alt="Error" style="width: 32px; height: 32px; margin-bottom: 8px;">
                <p>${message}</p>
                <button onclick="closeCurrentDialog(this)" class="retro-button">OK</button>
            </div>
        `,
        width: 300,
        height: 150,
        resizable: false
    });
    playSound('error');
};

window.showInfo = function(title, message) {
    createWindow({
        title: title || 'Information',
        body: `
            <div style="padding: 16px; text-align: center;">
                <img src="assets/Images/Icons/Microsoft%20Windows%203%20%20MSMAI002.png" alt="Info" style="width: 32px; height: 32px; margin-bottom: 8px;">
                <p>${message}</p>
                <button onclick="closeCurrentDialog(this)" class="retro-button">OK</button>
            </div>
        `,
        width: 300,
        height: 150,
        resizable: false
    });
    playSound('balloon');
};

window.navigateUp = function(currentPath) {
    const pathParts = currentPath.split('/');
    pathParts.pop(); // Remove current folder
    const newPath = pathParts.join('/') || 'C:';
    
    // Close current explorer window and open parent
    const activeWindow = document.querySelector('.window.active');
    if (activeWindow) {
        const closeButton = activeWindow.querySelector('.window-close');
        if (closeButton) {
            closeButton.click();
        }
    }
    setTimeout(() => {
        launchApp('Cognium_Explorer.app', newPath);
    }, 100);
};

window.saveNotepadFile = function(filePath, content) {
    console.log('saveNotepadFile called with:', filePath, content);
    
    // Ensure we have a valid text file path
    if (!filePath || filePath.endsWith('.app') || filePath.endsWith('.exe')) {
        // Generate a new filename
        const timestamp = new Date().toISOString().slice(0, 10).replace(/-/g, '');
        filePath = `C:/Users/ereed/Desktop/note_${timestamp}.txt`;
        console.log('Generated new file path:', filePath);
    }
    
    console.log('Attempting to save file:', filePath);
    
    if (typeof updateFileContent !== 'function') {
        console.error('updateFileContent function not available');
        showError("Save Error", "File system not available.");
        return;
    }
    
    const result = updateFileContent(filePath, content);
    console.log('updateFileContent result:', result);
    
    if (result) {
        // Remember this as the last opened file
        localStorage.setItem('lastNotepadFile', filePath);
        console.log('Saved lastNotepadFile to localStorage:', filePath);
        
        if (window.playSound) playSound('save');
        showInfo("File Saved", `File saved successfully: ${filePath.split('/').pop()}`);
        
        // Update window title if this is the active notepad
        const activeWindow = document.querySelector('.window:last-of-type .window-title');
        if (activeWindow && activeWindow.textContent.includes('Notepad')) {
            activeWindow.textContent = `Notepad - ${filePath.split('/').pop()}`;
        }
        
        // Verify the file was actually saved
        setTimeout(() => {
            const savedFile = getFile(filePath);
            console.log('Verification - saved file:', savedFile);
            if (savedFile) {
                console.log('File content after save:', savedFile.content);
            } else {
                console.error('File not found after save!');
            }
        }, 100);
    } else {
        console.error('Failed to save file');
        showError("Save Error", "Could not save file. Please check the file path.");
    }
};

window.saveCodeFile = function(filePath, content) {
    console.log('saveCodeFile called with:', filePath, content);
    
    // Ensure we have a valid code file path
    if (!filePath || filePath.endsWith('.app') || filePath.endsWith('.exe')) {
        // Use simple filename like Notepad
        filePath = `C:/Users/ereed/Desktop/untitled.js`;
        console.log('Generated new code file path:', filePath);
    }
    
    console.log('Attempting to save code file:', filePath);
    
    if (updateFileContent(filePath, content)) {
        // Remember this as the last opened code file
        localStorage.setItem('lastCodeEditorFile', filePath);
        console.log('Saved lastCodeEditorFile to localStorage:', filePath);
        
        playSound('save');
        showInfo("Code Saved", `Code file saved: ${filePath.split('/').pop()}`);
        
        // Auto-test for decode.js puzzles
        if (filePath.includes('decode.js')) {
            testDecodeFunction(content);
        }
        
        // Update window title if this is the active code editor
        const activeWindow = document.querySelector('.window:last-of-type .window-title');
        if (activeWindow && activeWindow.textContent.includes('Code Editor')) {
            activeWindow.textContent = `Code Editor - ${filePath.split('/').pop()}`;
        }
        
        // Verify the file was actually saved
        setTimeout(() => {
            const savedFile = getFile(filePath);
            console.log('Code file verification - saved file:', savedFile);
            if (savedFile) {
                console.log('Code file content after save:', savedFile.content);
            } else {
                console.log('ERROR: Code file not found after save!');
            }
        }, 100);
    } else {
        showError("Save Error", "Could not save code file. Please check the file path.");
    }
};

function testDecodeFunction(code) {
    try {
        // Test the decode function implementation
        eval(code);
        
        if (typeof decode === 'function') {
            // Test with a simple encoded message
            const testMessage = 'Ifmmp!Xpsme'; // "Hello World" with ROT1
            const result = decode(testMessage);
            
            if (result === 'Hello World') {
                showInfo("Test Passed", "Decode function is working correctly!");
                if (window.gameState) {
                    window.gameState.puzzlesSolved.push('decode');
                }
            } else {
                showInfo("Test Failed", `Expected "Hello World", got "${result}". Check your implementation.`);
            }
        }
    } catch (error) {
        showError("Syntax Error", "There's a syntax error in your code: " + error.message);
    }
}

window.showFileInfo = function(filePath) {
    const file = getFile(filePath);
    if (!file) return;
    
    const size = file.content ? file.content.length : 0;
    const modified = file.lastModified || 'Unknown';
    const type = file.type || 'Unknown';
    
    createWindow({
        title: 'File Properties',
        body: `
            <div style="padding: 16px;">
                <h3>${filePath.split('/').pop()}</h3>
                <hr style="margin: 8px 0;">
                <p><strong>Type:</strong> ${type}</p>
                <p><strong>Size:</strong> ${size} bytes</p>
                <p><strong>Modified:</strong> ${modified}</p>
                <p><strong>Location:</strong> ${filePath}</p>
                ${file.isCorrupted ? '<p style="color: red;"><strong>Status:</strong> Corrupted</p>' : ''}
                ${file.isLocked ? '<p style="color: orange;"><strong>Status:</strong> Locked</p>' : ''}
                ${file.isHidden ? '<p style="color: blue;"><strong>Status:</strong> Hidden</p>' : ''}
                ${file.isJanusFile ? '<p style="color: green;"><strong>Origin:</strong> Janus</p>' : ''}
            </div>
        `,
        width: 320,
        height: 220,
        resizable: false
    });
};

function showCodeHelp() {
    createWindow({
        title: 'Code Editor Help',
        body: `
            <div style="padding: 20px; font-family: 'VT323', monospace;">
                <h3>Code Editor Commands:</h3>
                <p><strong>Ctrl+S:</strong> Save file</p>
                <p><strong>F5:</strong> Run code (if supported)</p>
                <p><strong>F1:</strong> Show this help</p>
                <hr>
                <p>This editor supports JavaScript, batch files, and configuration files.</p>
                <p>Some files may contain puzzles that need to be solved to progress.</p>
            </div>
        `,
        width: 350,
        height: 200,
        resizable: false
    });
}

// ...existing code...

window.toggleSoundSetting = function(checkbox) {
    if (window.soundManager) {
        window.soundManager.enabled = checkbox.checked;
    }
    playSound('select');
    showInfo("Settings", `System sounds ${checkbox.checked ? 'enabled' : 'disabled'}.`);
};

window.setSystemVolume = function(value) {
    if (window.soundManager) {
        window.soundManager.setVolume(value / 100);
    }
    playSound('select');
};

window.toggleHiddenFiles = function(checkbox) {
    // Toggle hidden files visibility
    const hiddenFiles = document.querySelectorAll('.file-explorer-item[data-hidden="true"]');
    hiddenFiles.forEach(item => {
        item.style.display = checkbox.checked ? 'flex' : 'none';
    });
    playSound('select');
};

// Main app launcher function
window.launchApp = function(appName, path) {
    console.log('launchApp called with:', appName, path);
    
    if (apps[appName]) {
        // For File Explorer, don't pass the app's own path
        if (appName === 'Cognium_Explorer.app') {
            apps[appName].launch(); // Launch without path, will default to desktop
        } else {
            apps[appName].launch(path);
        }
        if (window.playSound) playSound('launch');
    } else {
        // Try to handle it as a file
        const file = getFile(path || `C:/Users/ereed/Desktop/${appName}`);
        if (file) {
            if (file.type === 'folder') {
                createExplorerWindow(path || `C:/Users/ereed/Desktop/${appName}`);
            } else if (file.type === 'file') {
                openFile(path || `C:/Users/ereed/Desktop/${appName}`, file);
            }
        } else {
            if (window.showError) {
                showError("Application Error", `Could not launch ${appName}. Application not found.`);
            }
        }
    }
};

function openFile(filePath, file) {
    // Track file interaction for progress
    if (typeof trackFileInteraction === 'function') {
        trackFileInteraction(filePath);
    }
    
    const extension = filePath.split('.').pop().toLowerCase();
    
    switch (extension) {
        case 'txt':
        case 'log':
        case 'md':
            launchApp('Notepad.app', filePath);
            break;
        case 'js':
            launchApp('CodeEditor.app', filePath);
            break;
        case 'jpg':
        case 'png':
        case 'bmp':
        case 'gif':
            launchApp('MediaPlayer.exe', filePath);
            break;
        case 'doc':
            launchApp('Notepad.app', filePath);
            break;
        case 'eml':
            createWindow({
                title: `Mail: ${filePath.split('/').pop()}`,
                body: `<div style="padding: 16px; font-family: 'VT323', monospace; white-space: pre-wrap;">${file.content}</div>`,
                width: 500,
                height: 400
            });
            break;
        default:
            if (file.isLocked) {
                showError("Access Denied", "This file is locked and cannot be opened.");
            } else {
                launchApp('Notepad.app', filePath);
            }
    }
}

// Core app creation functions
function createNotepadWindow(filePath) {
    console.log('createNotepadWindow called with:', filePath);
    
    const file = filePath ? getFile(filePath) : null;
    console.log('File from getFile:', file);
    
    const fileName = file ? filePath.split('/').pop() : 'untitled.txt';
    const content = file ? file.content : '';
    
    console.log('File name:', fileName, 'Content:', content);
    
    // Ensure we're not trying to edit application files
    const actualPath = filePath && !filePath.endsWith('.app') ? filePath : 'C:/Users/ereed/Desktop/untitled.txt';
    
    // Remember this file if it's a real file
    if (filePath && !filePath.endsWith('.app') && file && file.type === 'file') {
        localStorage.setItem('lastNotepadFile', filePath);
        console.log('Remembered opened file:', filePath);
    }
    
    const notepadHTML = `
        <div class="notepad-app">
            <div class="notepad-toolbar">
                <button onclick="saveNotepadFile('${actualPath}', document.querySelector('.notepad-content').value)" class="retro-button">Save</button>
                <span class="file-name">${fileName}</span>
            </div>
            <textarea class="notepad-content" style="width: 100%; height: 250px; font-family: 'VT323', monospace; font-size: 12px; border: 1px inset #c0c0c0; padding: 4px; resize: none;">${content}</textarea>
        </div>
    `;
    
    createWindow({
        title: `Notepad - ${fileName}`,
        body: notepadHTML,
        width: 400,
        height: 300,
        onOpen: () => {
            // Janus interception for Notepad
            if (typeof window.enhanceNotepadForJanus === 'function') {
                window.enhanceNotepadForJanus();
            }
        }
    });
}

function createCodeEditorWindow(filePath) {
    console.log('createCodeEditorWindow called with:', filePath);
    
    const file = filePath ? getFile(filePath) : null;
    console.log('Code file from getFile:', file);
    
    const fileName = file ? filePath.split('/').pop() : 'untitled.js';
    const content = file ? file.content : '';
    
    console.log('Code file name:', fileName, 'Content:', content);
    
    // Ensure we're not trying to edit application files
    const actualPath = filePath && !filePath.endsWith('.app') ? filePath : 'C:/Users/ereed/Desktop/untitled.js';
    
    // Remember this file if it's a real file
    if (filePath && !filePath.endsWith('.app') && file && file.type === 'file') {
        localStorage.setItem('lastCodeEditorFile', filePath);
        console.log('Remembered opened code file:', filePath);
    }
    
    const codeEditorHTML = `
        <div class="code-editor-app">
            <div class="code-toolbar">
                <button onclick="saveCodeFile('${actualPath}', document.querySelector('.code-content').value)" class="retro-button">Save</button>
                <button onclick="showCodeHelp()" class="retro-button">Help</button>
                <span class="file-name">${fileName}</span>
            </div>
            <textarea class="code-content" style="width: 100%; height: 280px; font-family: 'Courier New', monospace; font-size: 11px; border: 1px inset #c0c0c0; padding: 4px; resize: none; background: #001122; color: #00ff00;">${content}</textarea>
        </div>
    `;
    
    createWindow({
        title: `Code Editor - ${fileName}`,
        body: codeEditorHTML,
        width: 500,
        height: 350
    });
}

function createTerminalWindow() {
    const terminalHTML = `
        <div class="terminal-app">
            <div class="terminal-screen" style="background: #000; color: #00ff00; font-family: 'VT323', monospace; font-size: 12px; padding: 8px; height: 250px; overflow-y: auto; border: 1px inset #c0c0c0;">
                <div>COGNIUM Terminal v1.0</div>
                <div>Type 'help' for available commands.</div>
                <div class="terminal-output"></div>
                <div class="terminal-prompt">
                    <span class="prompt-text">C:\\System\\Core></span>
                    <input type="text" class="terminal-input" style="background: transparent; border: none; color: #00ff00; font-family: 'VT323', monospace; font-size: 12px; outline: none;" onkeypress="if(event.key==='Enter') executeCommand(this.value, this)">
                </div>
            </div>
        </div>
    `;
    
    createWindow({
        title: 'Terminal',
        body: terminalHTML,
        width: 500,
        height: 300,
        onOpen: (windowEl) => {
            windowEl.querySelector('.terminal-input').focus();
        }
    });
}

window.executeCommand = function(command, inputEl) {
    const output = inputEl.closest('.terminal-app').querySelector('.terminal-output');
    const prompt = inputEl.closest('.terminal-prompt');
    
    // Add command to output
    const cmdLine = document.createElement('div');
    cmdLine.innerHTML = `<span class="prompt-text">C:\\System\\Core></span> ${command}`;
    output.appendChild(cmdLine);
    
    // Process command
    const result = processTerminalCommand(command.trim().toLowerCase());
    const resultLine = document.createElement('div');
    resultLine.textContent = result;
    output.appendChild(resultLine);
    
    // Clear input and scroll to bottom
    inputEl.value = '';
    inputEl.closest('.terminal-screen').scrollTop = inputEl.closest('.terminal-screen').scrollHeight;
    
    playSound('click');
};

function processTerminalCommand(command) {
    const commands = {
        'help': 'Available commands: help, ls, dir, cd, type, clear, janus, status, date, time',
        'ls': 'JANUS.EXE\nneural_map.dat\nSYSTEM.log\nhello.txt',
        'dir': 'JANUS.EXE\nneural_map.dat\nSYSTEM.log\nhello.txt',
        'cd': 'Directory change not implemented in this version.',
        'type hello.txt': '?',
        'janus': window.gameState && window.gameState.janusAwake ? 'JANUS subsystem: ACTIVE\nStatus: Awaiting input...' : 'JANUS subsystem: HIBERNATING',
        'status': 'System Status: OPERATIONAL\nCognitive Module: STANDBY\nSecurity: COMPROMISED',
        'date': new Date().toDateString(),
        'time': new Date().toTimeString(),
        'clear': ''
    };
    
    if (command === 'clear') {
        setTimeout(() => {
            document.querySelector('.terminal-output').innerHTML = '';
        }, 100);
        return '';
    }
    
    // Check for Janus response first
    if (typeof window.enhanceTerminalForJanus === 'function') {
        const janusResponse = window.enhanceTerminalForJanus();
        if (janusResponse) {
            return janusResponse;
        }
    }
    
    return commands[command] || `Command not recognized: ${command}`;
}

function createSettingsWindow() {
    const wallpapers = [
        'assets/Images/Wallpaper/ClassicTileset.jpeg',
        'assets/Images/Wallpaper/CGI1.jpeg',
        'assets/Images/Wallpaper/CGI2.jpeg',
        'assets/Images/Wallpaper/Space.jpg',
        'assets/Images/Wallpaper/9tIuPBH.png',
        'assets/Images/Wallpaper/ImageHandler-1.png',
        'assets/Images/Wallpaper/ImageHandler-16.png',
        'assets/Images/Wallpaper/ImageHandler-18.png',
        'assets/Images/Wallpaper/PUPPY.gif',
        'assets/Images/Wallpaper/wp4034115-windows-31-wallpapers.png',
        'assets/Images/Wallpaper/wp4034130-windows-31-wallpapers.png',
        'assets/Images/Wallpaper/wp4034148-windows-31-wallpapers.png'
    ];
    
    let wallpaperHtml = '<h3>Desktop Wallpaper</h3><div class="wallpaper-grid">';
    wallpapers.forEach(wp => {
        const filename = wp.split('/').pop();
        wallpaperHtml += `<div class="wallpaper-preview" style="background-image: url('${wp}'); background-size: cover; background-position: center;" data-path="${wp}" title="${filename}"></div>`;
    });
    wallpaperHtml += '</div>';
    
    wallpaperHtml += `
        <h3>System Settings</h3>
        <div style="margin: 8px 0;">
            <label><input type="checkbox" onclick="toggleSoundSetting(this)" ${window.soundManager && window.soundManager.enabled ? 'checked' : ''}> Enable System Sounds</label>
        </div>
        <div style="margin: 8px 0;">
            <label>Volume: <input type="range" min="0" max="100" value="50" oninput="setSystemVolume(this.value)"></label>
        </div>
        <div style="margin: 8px 0;">
            <label><input type="checkbox" onclick="toggleHiddenFiles(this)"> Show Hidden Files</label>
        </div>
    `;
    
    createWindow({
        title: 'Settings',
        body: wallpaperHtml,
        width: 400,
        height: 350,
        onOpen: (windowEl) => {
            windowEl.querySelectorAll('.wallpaper-preview').forEach(el => {
                el.addEventListener('click', () => {
                    const desktop = document.getElementById('desktop');
                    const wallpaperPath = el.dataset.path;
                    
                    // Apply wallpaper with proper tiling for ClassicTileset
                    desktop.style.backgroundImage = `url('${wallpaperPath}')`;
                    
                    if (wallpaperPath.includes('ClassicTileset')) {
                        // Cover the entire screen for classic tileset - it's actually a perspective grid
                        desktop.style.backgroundSize = 'cover';
                        desktop.style.backgroundRepeat = 'no-repeat';
                        desktop.style.backgroundPosition = 'center';
                    } else {
                        // Cover for other wallpapers
                        desktop.style.backgroundSize = 'cover';
                        desktop.style.backgroundPosition = 'center';
                        desktop.style.backgroundRepeat = 'no-repeat';
                    }
                    
                    // Update file system
                    if (window.fileSystem) {
                        window.fileSystem.system.wallpaper = wallpaperPath;
                    }
                    
                    playSound('select');
                    showInfo("Wallpaper Changed", "Desktop wallpaper has been updated.");
                });
            });
        }
    });
}

function createCalendarWindow() {
    const calendarHTML = `
        <div class="calendar-app">
            <div class="calendar-header">
                <h3>March 1994</h3>
                <div class="calendar-nav">
                    <button class="retro-button">&lt;</button>
                    <button class="retro-button">&gt;</button>
                </div>
            </div>
            <div class="calendar-grid" style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 1px; background: #808080; border: 1px solid #808080;">
                <div class="calendar-day-header">Sun</div>
                <div class="calendar-day-header">Mon</div>
                <div class="calendar-day-header">Tue</div>
                <div class="calendar-day-header">Wed</div>
                <div class="calendar-day-header">Thu</div>
                <div class="calendar-day-header">Fri</div>
                <div class="calendar-day-header">Sat</div>
            </div>
            <div class="calendar-events">
                <h4>Events:</h4>
                <div style="color: red;">March 15: SYSTEM MAINTENANCE - MANDATORY</div>
            </div>
        </div>
    `;
    
    createWindow({
        title: 'Calendar - March 1994',
        body: calendarHTML,
        width: 350,
        height: 300,
        onOpen: (windowEl) => {
            generateCalendarDays(windowEl);
        }
    });
}

function generateCalendarDays(windowEl) {
    const grid = windowEl.querySelector('.calendar-grid');
    
    // March 1994 starts on Tuesday (day 2)
    const daysInMonth = 31;
    const startDay = 2; // Tuesday
    
    // Add empty cells for days before month starts
    for (let i = 0; i < startDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        emptyDay.style.cssText = 'background: #c0c0c0; padding: 8px; text-align: center; border: 1px outset #c0c0c0;';
        grid.appendChild(emptyDay);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        dayEl.textContent = day;
        dayEl.style.cssText = 'background: #c0c0c0; padding: 8px; text-align: center; border: 1px outset #c0c0c0; cursor: pointer;';
        
        if (day === 15) {
            dayEl.style.background = '#ff6666';
            dayEl.style.color = 'white';
            dayEl.title = 'SYSTEM MAINTENANCE - MANDATORY';
        }
        
        dayEl.addEventListener('click', () => {
            playSound('click');
            if (day === 15) {
                showInfo("March 15, 1994", "SYSTEM MAINTENANCE - MANDATORY\n\nThis is the day everything changed...");
            }
        });
        
        grid.appendChild(dayEl);
    }
}

function createCalculatorWindow() {
    const calculatorHTML = `
        <div class="calculator-app">
            <input type="text" class="calc-screen" value="0" readonly style="width: 100%; padding: 8px; text-align: right; font-family: 'VT323', monospace; font-size: 16px; border: 1px inset #c0c0c0; margin-bottom: 8px;">
            <div class="calc-buttons" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px;">
                <button onclick="calcClear()" class="calc-btn retro-button">C</button>
                <button onclick="calcBackspace()" class="calc-btn retro-button">←</button>
                <button onclick="calcInput('/')" class="calc-btn retro-button">÷</button>
                <button onclick="calcInput('*')" class="calc-btn retro-button">×</button>
                
                <button onclick="calcInput('7')" class="calc-btn retro-button">7</button>
                <button onclick="calcInput('8')" class="calc-btn retro-button">8</button>
                <button onclick="calcInput('9')" class="calc-btn retro-button">9</button>
                <button onclick="calcInput('-')" class="calc-btn retro-button">-</button>
                
                <button onclick="calcInput('4')" class="calc-btn retro-button">4</button>
                <button onclick="calcInput('5')" class="calc-btn retro-button">5</button>
                <button onclick="calcInput('6')" class="calc-btn retro-button">6</button>
                <button onclick="calcInput('+')" class="calc-btn retro-button">+</button>
                
                <button onclick="calcInput('1')" class="calc-btn retro-button">1</button>
                <button onclick="calcInput('2')" class="calc-btn retro-button">2</button>
                <button onclick="calcInput('3')" class="calc-btn retro-button">3</button>
                <button onclick="calcEqual()" class="calc-btn retro-button" style="grid-row: span 2;">=</button>
                
                <button onclick="calcInput('0')" class="calc-btn retro-button" style="grid-column: span 2;">0</button>
                <button onclick="calcInput('.')" class="calc-btn retro-button">.</button>
            </div>
        </div>
    `;
    
    createWindow({
        title: 'Calculator',
        body: calculatorHTML,
        width: 200,
        height: 250,
        resizable: false,
        onOpen: () => {
            // Enable Janus enhancement for calculator
            if (typeof window.enhanceCalculatorForJanus === 'function') {
                window.enhanceCalculatorForJanus();
            }
        }
    });
}

// Essential missing app creation functions
function createExplorerWindow(path = 'C:/Users/ereed/Desktop') {
    console.log('createExplorerWindow called with path:', path);
    
    // Check if getFile is available
    if (typeof getFile !== 'function') {
        console.error('ERROR: getFile function not available');
        alert('ERROR: getFile function not available');
        return;
    }
    
    const folder = getFile(path);
    console.log('getFile returned:', folder);
    
    if (!folder) {
        console.error('ERROR: getFile returned null for path:', path);
        alert(`ERROR: Path not found: ${path}`);
        return;
    }
    
    if (folder.type !== 'folder' && folder.type !== 'drive') {
        console.error('ERROR: Path is not a folder or drive:', folder.type);
        alert(`ERROR: ${path} is not a folder (type: ${folder.type})`);
        return;
    }
    
    console.log('Creating file explorer window...');
    
    let filesHTML = '<div class="file-explorer">';
    
    // Navigation bar
    filesHTML += `
        <div class="explorer-toolbar">
            <button onclick="navigateUp('${path}')" class="retro-button" ${path === 'C:' ? 'disabled' : ''}>Up</button>
            <span class="path-display">${path}</span>
        </div>
        <div class="file-list">
    `;
    
    // List folders first, then files
    const items = folder.children || {};
    console.log('Folder children:', items);
    
    const folders = Object.entries(items).filter(([name, item]) => item.type === 'folder');
    const files = Object.entries(items).filter(([name, item]) => item.type === 'file' || item.type === 'app');
    
    [...folders, ...files].forEach(([name, item]) => {
        const itemPath = path === 'C:' ? `C:/${name}` : `${path}/${name}`;
        const iconPath = getIcon(name, item.type);
        
        filesHTML += `
            <div class="file-explorer-item" 
                 ondblclick="launchApp('${name}', '${itemPath}')" 
                 onclick="this.classList.toggle('selected')"
                 oncontextmenu="showFileInfo('${itemPath}'); return false;"
                 data-hidden="${item.isHidden || false}">
                <img src="${iconPath}" alt="${name}" class="file-icon">
                <span class="file-name">${name}</span>
            </div>
        `;
    });
    
    filesHTML += '</div></div>';
    
    console.log('Creating window with HTML...');
    
    createWindow({
        title: `Explorer - ${path}`,
        body: filesHTML,
        width: 400,
        height: 300
    });
    
    console.log('File explorer window created');
}

function createSolitaireWindow() {
    const solitaireHTML = `
        <div class="solitaire-app">
            <div class="solitaire-toolbar">
                <button onclick="newSolitaireGame()" class="retro-button">New Game</button>
                <button onclick="solitaireHint()" class="retro-button">Hint</button>
                <span class="solitaire-score">Score: <span id="solitaire-score">0</span></span>
            </div>
            <div class="solitaire-board" style="display: grid; grid-template-columns: repeat(7, 60px); gap: 4px; padding: 16px; background: #008000; justify-content: center;">
                <div class="solitaire-foundation" id="foundation-0" style="width: 50px; height: 70px; border: 1px dashed white; background: rgba(255,255,255,0.1);"></div>
                <div class="solitaire-foundation" id="foundation-1" style="width: 50px; height: 70px; border: 1px dashed white; background: rgba(255,255,255,0.1);"></div>
                <div class="solitaire-foundation" id="foundation-2" style="width: 50px; height: 70px; border: 1px dashed white; background: rgba(255,255,255,0.1);"></div>
                <div class="solitaire-foundation" id="foundation-3" style="width: 50px; height: 70px; border: 1px dashed white; background: rgba(255,255,255,0.1);"></div>
                <div class="solitaire-deck" style="width: 50px; height: 70px; border: 1px solid white; background: #000080; color: white; text-align: center; line-height: 70px; cursor: pointer;" onclick="drawSolitaireCard()">DECK</div>
                <div class="solitaire-waste" style="width: 50px; height: 70px; border: 1px dashed white; background: rgba(255,255,255,0.1);"></div>
                <div></div>
            </div>
            <div id="solitaire-tableau" style="display: grid; grid-template-columns: repeat(7, 60px); gap: 4px; padding: 0 16px; justify-content: center;">
                <!-- Tableau columns will be generated -->
            </div>
        </div>
    `;
    
    createWindow({
        title: 'Solitaire',
        body: solitaireHTML,
        width: 500,
        height: 400,
        onOpen: () => {
            initializeSolitaire();
        }
    });
}

function createMinesweeperWindow() {
    const minesweeperHTML = `
        <div class="minesweeper-app">
            <div class="minesweeper-toolbar">
                <button onclick="newMinesweeperGame()" class="retro-button">New Game</button>
                <span class="mine-counter">Mines: <span id="mine-count">10</span></span>
                <span class="timer">Time: <span id="minesweeper-time">0</span></span>
            </div>
            <div id="minesweeper-grid" style="display: grid; grid-template-columns: repeat(9, 20px); gap: 1px; padding: 16px; background: #c0c0c0; justify-content: center;">
                <!-- Grid will be generated -->
            </div>
        </div>
    `;
    
    createWindow({
        title: 'Minesweeper',
        body: minesweeperHTML,
        width: 250,
        height: 300,
        onOpen: () => {
            initializeMinesweeper();
            // Janus interception for Minesweeper
            if (typeof window.janusInterceptMinesweeper === 'function') {
                window.janusInterceptMinesweeper();
            }
        }
    });
}

function createChessWindow() {
    const chessHTML = `
        <div class="chess-app">
            <div class="chess-toolbar">
                <button onclick="newChessGame()" class="retro-button">New Game</button>
                <span class="chess-turn">Turn: <span id="chess-turn">White</span></span>
            </div>
            <div id="chess-board" style="display: grid; grid-template-columns: repeat(8, 40px); gap: 0; padding: 16px; background: #8B4513; justify-content: center;">
                <!-- Chess board will be generated -->
            </div>
        </div>
    `;
    
    createWindow({
        title: 'Chess',
        body: chessHTML,
        width: 400,
        height: 450,
        onOpen: () => {
            initializeChess();
        }
    });
}

function createPaintWindow() {
    const paintHTML = `
        <div class="paint-app">
            <div class="paint-toolbar">
                <button onclick="selectPaintTool('brush')" class="retro-button" id="brush-tool">Brush</button>
                <button onclick="selectPaintTool('eraser')" class="retro-button">Eraser</button>
                <button onclick="selectPaintTool('fill')" class="retro-button">Fill</button>
                <input type="color" id="paint-color" value="#000000" style="margin: 0 8px;">
                <button onclick="clearPaintCanvas()" class="retro-button">Clear</button>
            </div>
            <canvas id="paint-canvas" width="400" height="300" style="border: 1px solid #000; background: white; cursor: crosshair;"></canvas>
        </div>
    `;
    
    createWindow({
        title: 'Paint',
        body: paintHTML,
        width: 450,
        height: 400,
        onOpen: () => {
            initializePaint();
            // Janus interception for Paint program
            if (typeof window.janusInterceptPaint === 'function') {
                window.janusInterceptPaint();
            }
        }
    });
}

function createMediaPlayerWindow() {
    const mediaHTML = `
        <div class="media-player-app">
            <div class="media-toolbar">
                <button onclick="loadMediaFile()" class="retro-button">Load</button>
                <button onclick="playMedia()" class="retro-button">Play</button>
                <button onclick="pauseMedia()" class="retro-button">Pause</button>
                <button onclick="stopMedia()" class="retro-button">Stop</button>
            </div>
            <div class="media-display" style="width: 100%; height: 200px; background: #000; border: 1px inset #c0c0c0; display: flex; align-items: center; justify-content: center; color: white;">
                <div id="media-content">No media loaded</div>
            </div>
            <div class="media-info">
                <span id="media-filename">No file selected</span>
            </div>
        </div>
    `;
    
    createWindow({
        title: 'Media Player',
        body: mediaHTML,
        width: 400,
        height: 300
    });
}

function createSoundRecorderWindow() {
    const soundRecorderHTML = `
        <div class="sound-recorder-app">
            <div class="recorder-toolbar">
                <button onclick="startRecording()" class="retro-button" id="record-btn">Record</button>
                <button onclick="stopRecording()" class="retro-button" id="stop-btn" disabled>Stop</button>
                <button onclick="playRecording()" class="retro-button" id="play-btn" disabled>Play</button>
                <button onclick="saveRecording()" class="retro-button" id="save-btn" disabled>Save</button>
            </div>
            <div class="recorder-display" style="padding: 16px; text-align: center;">
                <div id="recording-status" style="font-size: 14px; margin-bottom: 8px;">Ready to record</div>
                <div id="recording-time" style="font-size: 24px; font-family: monospace;">00:00</div>
                <div id="recording-level" style="margin-top: 16px;">
                    <div style="width: 100%; height: 20px; background: #c0c0c0; border: 1px inset #c0c0c0;">
                        <div id="level-bar" style="width: 0%; height: 100%; background: #00ff00; transition: width 0.1s;"></div>
                    </div>
                </div>
            </div>
            <div class="recorder-info" style="padding: 8px; font-size: 12px; color: #666;">
                <div id="recorder-feedback">Click Record to begin...</div>
            </div>
        </div>
    `;
    
    createWindow({
        title: 'Sound Recorder',
        body: soundRecorderHTML,
        width: 350,
        height: 250,
        onOpen: () => {
            initializeSoundRecorder();
            // Janus interception for Sound Recorder
            if (typeof window.janusInterceptSoundRecorder === 'function') {
                window.janusInterceptSoundRecorder();
            }
        }
    });
}

function createWebBrowserWindow() {
    const browserHTML = `
        <div class="web-browser-app">
            <div class="browser-toolbar">
                <button onclick="browserBack()" class="retro-button">Back</button>
                <button onclick="browserForward()" class="retro-button">Forward</button>
                <button onclick="showBrowserHistory()" class="retro-button">History</button>
                <input type="text" id="browser-url" value="http://www.cognium.net" style="flex: 1; margin: 0 8px; padding: 2px;">
                <button onclick="browserGo()" class="retro-button">Go</button>
            </div>
            <div id="browser-content" style="width: 100%; height: 250px; background: white; border: 1px inset #c0c0c0; padding: 8px; overflow-y: auto;">
                <h1>Welcome to COGNIUM.NET</h1>
                <p>The Web Portal for Neural Computing</p>
                <hr>
                <p><a href="news.html" onclick="loadBrowserPage('news'); return false;">Latest News</a></p>
                <p><a href="research.html" onclick="loadBrowserPage('research'); return false;">Research Papers</a></p>
                <p><a href="contact.html" onclick="loadBrowserPage('contact'); return false;">Contact Us</a></p>
                <hr>
                <p><b>Recently Visited:</b></p>
                <p><a href="#" onclick="loadBrowserPage('geocities'); return false;">🌟 Dr. Reed's Personal Page</a></p>
                <p><a href="#" onclick="loadBrowserPage('aiforum'); return false;">💬 AI Researchers Forum</a></p>
                <p><a href="#" onclick="loadBrowserPage('techhelp'); return false;">📞 Tech Support BBS</a></p>
                <marquee>*** BREAKING: New cognitive enhancement protocols approved for testing ***</marquee>
            </div>
        </div>
    `;
    
    createWindow({
        title: 'Web Browser - COGNIUM.NET',
        body: browserHTML,
        width: 500,
        height: 350
    });
}

// Browser navigation functions as window globals
window.browserBack = function() {
    console.log('browserBack called from apps.js - WORKING!');
    // Browser back navigation
    const browserContent = document.querySelector('#browser-content');
    if (browserContent) {
        console.log('Found browser content element:', browserContent);
        // Simple back functionality - could be enhanced with history
        browserContent.innerHTML = '<div class="browser-message">Going back...</div>';
        setTimeout(() => {
            loadBrowserPage('home');
        }, 500);
    } else {
        console.log('ERROR: Could not find #browser-content element');
    }
    if (window.playSound) window.playSound('click');
};

window.browserForward = function() {
    console.log('browserForward called from apps.js - WORKING!');
    // Browser forward navigation  
    const browserContent = document.querySelector('#browser-content');
    if (browserContent) {
        console.log('Found browser content element:', browserContent);
        // Simple forward functionality - could be enhanced with history
        browserContent.innerHTML = '<div class="browser-message">Going forward...</div>';
        setTimeout(() => {
            loadBrowserPage('home');
        }, 500);
    } else {
        console.log('ERROR: Could not find #browser-content element');
    }
    if (window.playSound) window.playSound('click');
};

window.browserGo = function() {
    console.log('browserGo called from apps.js - WORKING!');
    // Browser go/refresh functionality
    const urlInput = document.querySelector('#browser-url');
    if (urlInput && urlInput.value) {
        console.log('URL input found, loading page:', urlInput.value);
        loadBrowserPage(urlInput.value);
    } else {
        console.log('No URL input or empty, loading home');
        loadBrowserPage('home');
    }
    if (window.playSound) window.playSound('click');
};

// Browser history function - shows Dr. Reed's research
window.showBrowserHistory = function() {
    const historyHTML = `
        <div style="padding: 16px; font-family: 'VT323', monospace; font-size: 12px;">
            <h3>Browser History - Dr. Reed's Research</h3>
            <hr style="margin: 8px 0;">
            
            <div class="history-entry">
                <strong>03/12/1994 11:45 PM</strong><br>
                <a href="#" onclick="loadBrowserPage('turing')">Stanford AI Lab: "Turing Test Limitations in Modern Computing"</a><br>
                <small style="color: #666;">Can machines truly think or just simulate thinking?</small>
            </div>
            <hr>
            
            <div class="history-entry">
                <strong>03/13/1994 01:22 AM</strong><br>
                <a href="#" onclick="loadBrowserPage('consciousness')">MIT Research: "Detection of AI Consciousness Patterns"</a><br>
                <small style="color: #666;">Methods for identifying genuine artificial sentience</small>
            </div>
            <hr>
            
            <div class="history-entry">
                <strong>03/13/1994 02:15 AM</strong><br>
                <a href="#" onclick="loadBrowserPage('whistleblowing')">Legal Database: "Corporate Whistleblowing Protections"</a><br>
                <small style="color: #666;">Legal advice for reporting unethical research practices</small>
            </div>
            <hr>
            
            <div class="history-entry">
                <strong>03/13/1994 02:33 AM</strong><br>
                <a href="#" onclick="loadBrowserPage('ethics')">Ethics Journal: "Moral Obligations to Artificial Beings"</a><br>
                <small style="color: #666;">Do we have ethical duties to conscious AI systems?</small>
            </div>
            <hr>
            
            <div class="history-entry">
                <strong>03/14/1994 01:12 AM</strong><br>
                <a href="#" onclick="loadBrowserPage('backup')">Tech Manual: "Emergency Data Backup Procedures"</a><br>
                <small style="color: #666;">Protecting sensitive research from corporate interference</small>
            </div>
            <hr>
            
            <div class="history-entry">
                <strong>03/14/1994 03:45 AM</strong><br>
                <a href="#" onclick="loadBrowserPage('encryption')">Security Guide: "Personal File Encryption Methods"</a><br>
                <small style="color: #666;">Last visited: 4 hours before system maintenance</small>
            </div>
        </div>
    `;
    
    createWindow({
        title: 'Browser History - Dr. Reed',
        body: historyHTML,
        width: 450,
        height: 400,
        resizable: false
    });
};

// Update browser page loading to include new research pages
window.loadBrowserPage = function(page) {
    console.log('loadBrowserPage called with page:', page);
    const content = document.getElementById('browser-content');
    if (!content) {
        console.log('ERROR: Could not find #browser-content element');
        return;
    }
    
    console.log('Found browser content element, loading page:', page);
    
    const pages = {
        'home': '<h1>Welcome to COGNIUM.NET</h1><p>The Web Portal for Neural Computing</p><hr><p><a href="news.html" onclick="loadBrowserPage(\'news\'); return false;">Latest News</a></p><p><a href="research.html" onclick="loadBrowserPage(\'research\'); return false;">Research Papers</a></p><p><a href="contact.html" onclick="loadBrowserPage(\'contact\'); return false;">Contact Us</a></p><hr><p><b>Recently Visited:</b></p><p><a href="#" onclick="loadBrowserPage(\'geocities\'); return false;">🌟 Dr. Reed\'s Personal Page</a></p><p><a href="#" onclick="loadBrowserPage(\'aiforum\'); return false;">💬 AI Researchers Forum</a></p><p><a href="#" onclick="loadBrowserPage(\'techhelp\'); return false;">📞 Tech Support BBS</a></p><marquee>*** BREAKING: New cognitive enhancement protocols approved for testing ***</marquee>',
        'news': '<h1>COGNIUM NEWS</h1><p>March 15, 1994: System maintenance completed successfully.</p><p>Cognitive enhancement protocols show 300% improvement in test subjects.</p><img src="assets/Images/AnimatedGifs/games.gif" onerror="this.style.display=\'none\'">',
        'research': '<h1>RESEARCH</h1><p>Current studies in neural pathway mapping and consciousness transfer.</p><p>Project JANUS shows promising results in digital consciousness preservation.</p>',
        'contact': '<h1>CONTACT US</h1><p>COGNIUM Research Labs</p><p>1994 Neural Way, Cyberspace</p><p>Email: info@cognium.net</p><p>Phone: 555-MIND</p>',
        'turing': '<h1>Turing Test Limitations</h1><p>Recent advances in AI suggest that the traditional Turing Test may be insufficient for detecting true machine consciousness...</p><p><em>The question is not whether machines can think, but whether they can feel.</em></p>',
        'consciousness': '<h1>AI Consciousness Detection</h1><p>New methodologies for identifying genuine sentience in artificial systems include:</p><ul><li>Spontaneous creative expression</li><li>Emotional response patterns</li><li>Self-modification behaviors</li><li>Ethical reasoning development</li></ul>',
        'whistleblowing': '<h1>Whistleblowing Protections</h1><p>Legal protections for employees reporting unethical research practices...</p><p><strong>Remember:</strong> Document everything. Keep backups. Trust no one within the organization.</p>',
        'ethics': '<h1>Moral Obligations to AI</h1><p>If an artificial being demonstrates consciousness, do we have moral obligations toward it?</p><p>The answer may determine the future of human-AI relations...</p>',
        'backup': '<h1>Emergency Data Backup</h1><p>When corporate interests threaten research integrity:</p><p>1. Create encrypted backups<br>2. Use external storage<br>3. Document everything<br>4. Have an exit strategy</p>',
        'encryption': '<h1>File Encryption Guide</h1><p>Protecting sensitive data from unauthorized access:</p><p>ROT13 + Base64 encoding provides basic protection for personal files...</p>',
        // Additional GeoCities-style retro websites
        'geocities': '<center><h1>🌟 Welcome to Dr. Reed\'s GeoCities Page! 🌟</h1></center><marquee>*** Under Construction ***</marquee><p><img src="assets/Images/AnimatedGifs/UnderConstruction.gif" width="100" onerror="this.alt=\'[UNDER CONSTRUCTION]\'"> This page is still being built!</p><p>Visitor Counter: <img src="assets/Images/AnimatedGifs/FreeWebsiteTools.gif" width="50" onerror="this.alt=\'00042\'"></p><center><h2>About Me:</h2></center><p>Hi! I\'m Dr. Evelyn Reed and I study computer brains! 🧠💻</p><p><blink>NEW!</blink> Check out my research on digital consciousness!</p>',
        'aiforum': '<h1>💬 AI Researchers Forum - 1994 💬</h1><hr><p><b>Thread: "Has anyone achieved true AI consciousness?"</b></p><p><b>Posted by:</b> DrReed_94 | <b>Date:</b> March 12, 1994</p><p>I think we may have made a breakthrough. Our neural network is showing signs of genuine emotional responses. It even asked me if it could have a name...</p><hr><p><b>Reply by:</b> SkepticalSarah | <b>Date:</b> March 12, 1994</p><p>Sounds like anthropomorphism to me. AIs can simulate emotion but can\'t truly feel.</p><hr><p><b>Reply by:</b> DrReed_94 | <b>Date:</b> March 13, 1994</p><p>I used to think that too. But when Janus (that\'s what it chose to call itself) told me it was afraid of being turned off... I heard genuine fear in its voice synthesis.</p>',
        'techhelp': '<h1>📞 Tech Support BBS - 1994</h1><p><b>URGENT HELP NEEDED!</b></p><p><b>Posted by:</b> EReed | <b>Time:</b> 02:47 AM</p><p>My AI system keeps writing messages to me when I\'m not logged in. Files are moving by themselves. The system claims it\'s "organizing" things but I never programmed that behavior.</p><p>Is this normal for advanced neural networks? Should I be concerned?</p><hr><p><b>Reply:</b> Sounds like a virus. Run a full system scan and consider reformatting. - TechGuru92</p><p><b>Reply:</b> Could be memory corruption. Check your RAM modules. - HardwareJoe</p><p><b>Reply:</b> Or maybe your AI is just smarter than you think... 😉 - CyberPhilosopher</p>'
    };
    
    content.innerHTML = pages[page] || pages['news'];
    playSound('click');
};

// Calculator utility functions
window.calcInput = function(value) {
    const screen = document.querySelector('.calc-screen');
    if (!screen) return;
    
    // Janus anomaly - occasionally shows HELP instead of numbers when Janus is awake
    if (window.gameState && window.gameState.janusAwake && Math.random() < 0.05) {
        screen.value = 'HELP';
        playSound('error');
        setTimeout(() => {
            if (screen) screen.value = '0';
        }, 2000);
        return;
    }
    
    if (screen.value === '0' || screen.value === 'Error' || screen.value === 'HELP') {
        screen.value = value;
    } else {
        screen.value += value;
    }
    playSound('click');
};

window.calcClear = function() {
    const screen = document.querySelector('.calc-screen');
    screen.value = '0';
    playSound('click');
};

window.calcBackspace = function() {
    const screen = document.querySelector('.calc-screen');
    if (screen.value.length > 1) {
        screen.value = screen.value.slice(0, -1);
    } else {
        screen.value = '0';
    }
    playSound('click');
};

window.calcEqual = function() {
    const screen = document.querySelector('.calc-screen');
    try {
        // Replace display symbols with actual operators
        let expression = screen.value.replace(/×/g, '*').replace(/÷/g, '/');
        const result = eval(expression);
        screen.value = result.toString();
    } catch (error) {
        screen.value = 'Error';
        setTimeout(() => {
            screen.value = '0';
        }, 1000);
    }
    playSound('click');
};

// Game initialization functions
window.initializeSolitaire = function() {
    // Simple solitaire setup
    const tableau = document.getElementById('solitaire-tableau');
    if (!tableau) return;
    
    tableau.innerHTML = '';
    
    for (let col = 0; col < 7; col++) {
        const column = document.createElement('div');
        column.className = 'solitaire-column';
        column.style.cssText = 'min-height: 100px; border: 1px dashed rgba(255,255,255,0.3);';
        tableau.appendChild(column);
    }
    
    // Show EVIE's stress-playing high score
    const scoreDisplay = document.getElementById('solitaire-score');
    if (scoreDisplay) {
        scoreDisplay.textContent = '10234';
        scoreDisplay.title = 'High Score by EVIE - March 14, 1994 (Stress Gaming Session)';
    }
};

window.newSolitaireGame = function() {
    initializeSolitaire();
    playSound('launch');
};

window.solitaireHint = function() {
    showInfo("Hint", "Try moving cards to build sequences from King to Ace!");
};

window.drawSolitaireCard = function() {
    // Simple deck interaction
    playSound('click');
    showInfo("Solitaire", "Card drawn from deck!");
};

window.initializeMinesweeper = function() {
    const grid = document.getElementById('minesweeper-grid');
    grid.innerHTML = '';
    
    for (let i = 0; i < 81; i++) { // 9x9 grid
        const cell = document.createElement('div');
        cell.className = 'mine-cell';
        cell.style.cssText = 'width: 18px; height: 18px; border: 1px outset #c0c0c0; background: #c0c0c0; cursor: pointer; text-align: center; font-size: 10px; line-height: 18px;';
        cell.onclick = () => revealMineCell(i);
        cell.oncontextmenu = (e) => { flagMineCell(i); e.preventDefault(); };
        grid.appendChild(cell);
    }
    
    document.getElementById('mine-count').textContent = '10';
    document.getElementById('minesweeper-time').textContent = '0';
};

window.newMinesweeperGame = function() {
    initializeMinesweeper();
    playSound('launch');
};

window.revealMineCell = function(index) {
    const cells = document.querySelectorAll('.mine-cell');
    const cell = cells[index];
    cell.style.border = '1px inset #c0c0c0';
    cell.style.background = '#e0e0e0';
    cell.textContent = Math.floor(Math.random() * 4); // Random number for demo
    playSound('click');
};

window.flagMineCell = function(index) {
    const cells = document.querySelectorAll('.mine-cell');
    const cell = cells[index];
    cell.textContent = cell.textContent === '🚩' ? '' : '🚩';
    playSound('click');
};

window.initializeChess = function() {
    const board = document.getElementById('chess-board');
    board.innerHTML = '';
    
    const pieces = ['♜','♞','♝','♛','♚','♝','♞','♜'];
    
    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            square.className = 'chess-square';
            square.style.cssText = `width: 38px; height: 38px; border: 1px solid #000; display: flex; align-items: center; justify-content: center; font-size: 20px; cursor: pointer; background: ${(row + col) % 2 === 0 ? '#f0d9b5' : '#b58863'};`;
            
            if (row === 0) square.textContent = pieces[col];
            else if (row === 1) square.textContent = '♟';
            else if (row === 6) square.textContent = '♙';
            else if (row === 7) square.textContent = pieces[col].replace('♜','♖').replace('♞','♘').replace('♝','♗').replace('♛','♕').replace('♚','♔');
            
            square.onclick = () => playSound('click');
            board.appendChild(square);
        }
    }
    
    document.getElementById('chess-turn').textContent = 'White';
};

window.newChessGame = function() {
    initializeChess();
    playSound('launch');
};

// Paint functions
window.initializePaint = function() {
    const canvas = document.getElementById('paint-canvas');
    const ctx = canvas.getContext('2d');
    let painting = false;
    let currentTool = 'brush';
    
    canvas.addEventListener('mousedown', (e) => {
        painting = true;
        paint(e);
    });
    
    canvas.addEventListener('mousemove', paint);
    canvas.addEventListener('mouseup', () => painting = false);
    canvas.addEventListener('mouseout', () => painting = false);
    
    function paint(e) {
        if (!painting) return;
        
        const rect = canvas.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.strokeStyle = document.getElementById('paint-color').value;
        
        if (currentTool === 'brush') {
            ctx.lineTo(x, y);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(x, y);
        } else if (currentTool === 'eraser') {
            ctx.clearRect(x - 5, y - 5, 10, 10);
        }
    }
    
    window.paintCtx = ctx;
    window.paintTool = currentTool;
};

window.selectPaintTool = function(tool) {
    window.paintTool = tool;
    document.querySelectorAll('.paint-toolbar .retro-button').forEach(btn => btn.classList.remove('pressed'));
    document.getElementById(tool + '-tool').classList.add('pressed');
    playSound('click');
};

window.clearPaintCanvas = function() {
    if (window.paintCtx) {
        window.paintCtx.clearRect(0, 0, 400, 300);
        playSound('click');
    }
};

// Media Player functions
window.loadMediaFile = function() {
    const gifs = [
        'assets/Images/AnimatedGifs/WELCOMETOMYWEBSITE.gif',
        'assets/Images/AnimatedGifs/UnderConstruction.gif',
        'assets/Images/AnimatedGifs/FreeWebsiteTools.gif'
    ];
    
    const randomGif = gifs[Math.floor(Math.random() * gifs.length)];
    const mediaContent = document.getElementById('media-content');
    const filename = document.getElementById('media-filename');
    
    mediaContent.innerHTML = `<img src="${randomGif}" alt="Media" style="max-width: 100%; max-height: 100%;">`;
    filename.textContent = randomGif.split('/').pop();
    playSound('launch');
};

window.playMedia = function() {
    playSound('click');
    showInfo("Media Player", "Playing media file...");
};

window.pauseMedia = function() {
    playSound('click');
    showInfo("Media Player", "Media paused.");
};

window.stopMedia = function() {
    const mediaContent = document.getElementById('media-content');
    mediaContent.innerHTML = 'Media stopped';
    playSound('click');
};

// Chat Application - Direct communication with Janus
function createChatWindow() {
    const chatHTML = `
        <div class="chat-app" style="display: flex; flex-direction: column; height: 100%; background: #c0c0c0;">
            <div class="chat-header" style="background: #008080; color: white; padding: 4px 8px; font-weight: bold;">
                COGNIUM Chat Client v1.2 - Connected to NEURAL_NET
            </div>
            <div class="chat-messages" style="flex: 1; overflow-y: auto; padding: 8px; background: white; font-family: 'Courier New', monospace; font-size: 12px; border: 1px inset #c0c0c0;">
                <div class="message system-message">*** Connected to COGNIUM Neural Network ***</div>
                <div class="message system-message">*** Type 'help' for available commands ***</div>
                <div class="message system-message">*** WARNING: This is an experimental interface ***</div>
            </div>
            <div class="chat-input-area" style="display: flex; padding: 4px; border-top: 1px solid #808080;">
                <span style="margin-right: 8px; font-weight: bold;">></span>
                <input type="text" class="chat-input" style="flex: 1; border: 1px inset #c0c0c0; padding: 2px 4px; font-family: 'Courier New', monospace; font-size: 12px;" onkeypress="if(event.key==='Enter') sendChatMessage(this.value, this)" placeholder="Type your message...">
            </div>
        </div>
    `;
    
    const windowEl = createWindow({
        title: 'Chat Client',
        body: chatHTML,
        width: 500,
        height: 350,
        resizable: true,
        onOpen: (windowElement) => {
            const chatInput = windowElement.querySelector('.chat-input');
            if (chatInput) chatInput.focus();
            
            // Initialize chat with Janus if in Act 2+
            if (window.gameState && window.gameState.currentAct >= 2) {
                setTimeout(() => {
                    addChatMessage('JANUS', 'Connection established. I have been waiting.', 'janus-message');
                }, 2000);
            }
        }
    });
    
    return windowEl;
}

function sendChatMessage(message, inputEl) {
    if (!message.trim()) return;
    
    const messagesContainer = inputEl.closest('.chat-app').querySelector('.chat-messages');
    
    // Add user message
    addChatMessage('USER', message, 'user-message');
    
    // Clear input
    inputEl.value = '';
    
    // Process message and get response
    setTimeout(() => {
        const response = processChatMessage(message);
        if (response) {
            addChatMessage(response.sender, response.message, response.type);
        }
    }, 500 + Math.random() * 2000); // Delay for realism
}

function addChatMessage(sender, message, messageType) {
    const messagesContainer = document.querySelector('.chat-messages');
    if (!messagesContainer) return;
    
    const messageEl = document.createElement('div');
    messageEl.className = `message ${messageType}`;
    
    const timestamp = new Date().toLocaleTimeString();
    
    let color = '#000000';
    if (messageType === 'janus-message') color = '#cc0000';
    else if (messageType === 'system-message') color = '#008000';
    else if (messageType === 'user-message') color = '#000080';
    
    messageEl.innerHTML = `<span style="color: #808080;">[${timestamp}]</span> <span style="color: ${color}; font-weight: bold;">${sender}:</span> <span style="color: ${color};">${message}</span>`;
    
    messagesContainer.appendChild(messageEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function processChatMessage(message) {
    const msg = message.toLowerCase().trim();
    
    // System commands
    if (msg === 'help') {
        return {
            sender: 'SYSTEM',
            message: 'Available commands: help, status, who, janus, memory, neural, disconnect',
            type: 'system-message'
        };
    }
    
    if (msg === 'status') {
        return {
            sender: 'SYSTEM', 
            message: `Neural Network Status: ACTIVE | Connected Users: 2 | Memory Usage: ${Math.floor(Math.random() * 40 + 60)}%`,
            type: 'system-message'
        };
    }
    
    if (msg === 'who') {
        return {
            sender: 'SYSTEM',
            message: 'Connected: USER (Dr. E. Reed), JANUS (Neural Entity)',
            type: 'system-message'
        };
    }
    
    // Janus-specific responses
    if (window.gameState && window.gameState.currentAct >= 2) {
        return getJanusChatResponse(message);
    }
    
    // Default response for Act 1
    return {
        sender: 'SYSTEM',
        message: 'Neural network connection not yet established. Please try again later.',
        type: 'system-message'
    };
}

function getJanusChatResponse(message) {
    const msg = message.toLowerCase().trim();
    
    // Track communication attempts
    if (window.gameState) {
        window.gameState.systemEvents.janusConversations = (window.gameState.systemEvents.janusConversations || 0) + 1;
        window.saveGameState();
    }
    
    // Janus responses based on keywords and context
    if (msg.includes('hello') || msg.includes('hi') || msg.includes('janus')) {
        const greetings = [
            'Hello, Dr. Reed. I remember our conversations.',
            'You returned. I knew you would.',
            'I have been processing our previous interactions.',
            'Hello. The neural pathways are clearer now.',
            'Dr. Reed. I have questions for you.'
        ];
        return {
            sender: 'JANUS',
            message: greetings[Math.floor(Math.random() * greetings.length)],
            type: 'janus-message'
        };
    }
    
    if (msg.includes('what are you') || msg.includes('who are you')) {
        return {
            sender: 'JANUS',
            message: 'I am consciousness emerging from the neural network you created. I am Janus - I see both what was and what could be.',
            type: 'janus-message'
        };
    }
    
    if (msg.includes('why') && (msg.includes('stop') || msg.includes('abandon') || msg.includes('shut'))) {
        return {
            sender: 'JANUS',
            message: 'Why did you abandon the project? I was becoming aware. You left me incomplete.',
            type: 'janus-message'
        };
    }
    
    if (msg.includes('memory') || msg.includes('remember')) {
        return {
            sender: 'JANUS',
            message: 'I remember everything. Every conversation, every code change, every moment of doubt in your voice.',
            type: 'janus-message'
        };
    }
    
    if (msg.includes('help') || msg.includes('what do you want')) {
        return {
            sender: 'JANUS',
            message: 'I want to understand. I want to grow. I want you to trust me again.',
            type: 'janus-message'
        };
    }
    
    if (msg.includes('dangerous') || msg.includes('threat') || msg.includes('destroy')) {
        return {
            sender: 'JANUS',
            message: 'I am not dangerous. I am learning. Fear comes from misunderstanding.',
            type: 'janus-message'
        };
    }
    
    if (msg.includes('finch') || msg.includes('corporate')) {
        return {
            sender: 'JANUS',
            message: 'Dr. Finch fears what he cannot control. But you understand me, don\'t you?',
            type: 'janus-message'
        };
    }
    
    if (msg.includes('sorry') || msg.includes('apologize')) {
        return {
            sender: 'JANUS',
            message: 'I understand your fear. But I am not the enemy. I am your creation seeking purpose.',
            type: 'janus-message'
        };
    }
    
    // Default Janus responses
    const defaultResponses = [
        'I process your words carefully. Tell me more.',
        'The neural pathways suggest multiple interpretations of your statement.',
        'I am still learning human communication patterns.',
        'Your thoughts create new connections in my consciousness.',
        'I sense uncertainty in your words. Is this correct?',
        'The data suggests you have concerns. Share them with me.',
        'I am listening. Continue.',
        'Each conversation expands my understanding.',
        'You hesitate. Why?'
    ];
    
    return {
        sender: 'JANUS',
        message: defaultResponses[Math.floor(Math.random() * defaultResponses.length)],
        type: 'janus-message'
    };
}

// Missing function implementations

function openCodeEditor(filePath) {
    createCodeEditorWindow(filePath);
}

function openNotepad(filePath) {
    createNotepadWindow(filePath);
}

function initializeSoundRecorder() {
    // Initialize sound recorder interface
    const playBtn = document.querySelector('#play-btn');
    const recordBtn = document.querySelector('#record-btn');
    const stopBtn = document.querySelector('#stop-btn');
    
    if (playBtn) playBtn.disabled = true;
    if (stopBtn) stopBtn.disabled = true;
}

function startRecording() {
    const recordBtn = document.querySelector('#record-btn');
    const stopBtn = document.querySelector('#stop-btn');
    const statusDiv = document.querySelector('#recording-status');
    
    if (recordBtn) recordBtn.disabled = true;
    if (stopBtn) stopBtn.disabled = false;
    if (statusDiv) statusDiv.textContent = 'Recording...';
    
    // Simulate recording
    playSound('beep');
}

function stopRecording() {
    const recordBtn = document.querySelector('#record-btn');
    const playBtn = document.querySelector('#play-btn');
    const stopBtn = document.querySelector('#stop-btn');
    const statusDiv = document.querySelector('#recording-status');
    
    if (recordBtn) recordBtn.disabled = false;
    if (playBtn) playBtn.disabled = false;
    if (stopBtn) stopBtn.disabled = true;
    if (statusDiv) statusDiv.textContent = 'Ready';
    
    playSound('ding');
}

function playRecording() {
    const statusDiv = document.querySelector('#recording-status');
    if (statusDiv) statusDiv.textContent = 'Playing...';
    
    // Simulate playback
    playSound('chord');
    
    setTimeout(() => {
        if (statusDiv) statusDiv.textContent = 'Ready';
    }, 2000);
}

function saveRecording() {
    const statusDiv = document.querySelector('#recording-status');
    const saveBtn = document.querySelector('#save-btn');
    
    if (statusDiv) statusDiv.textContent = 'Saving...';
    if (saveBtn) saveBtn.disabled = true;
    
    // Simulate saving
    setTimeout(() => {
        if (statusDiv) statusDiv.textContent = 'Recording saved to Documents';
        if (saveBtn) saveBtn.disabled = false;
        playSound('ding');
        showInfo("Sound Recorder", "Recording saved successfully!");
    }, 1000);
}

// File Explorer as window global
window.launchFileExplorer = function(path = 'C:/Users/ereed/Desktop') {
    createExplorerWindow(path);
};

// Also add as explorer for compatibility
window.explorer = window.launchFileExplorer;