// COGNIUM Main System - Multi-Act Implementation
let gameState = {
    currentAct: 1,
    actProgress: {
        act1: {
            completed: false,
            milestones: {
                exploredDesktop: false,
                readPersonalFiles: false,
                foundJanusHints: false,
                triggeredJanusAwakening: false
            }
        },
        act2: {
            completed: false,
            milestones: {
                janusFirstContact: false,
                discoveredJournal: false,
                foundCorpFiles: false,
                witnessedSystemManifestations: false
            }
        },
        act3: {
            completed: false,
            milestones: {
                finchIntrusion: false,
                finalChoice: null // 'save', 'destroy', 'integrate'
            }
        }
    },
    janusState: {
        awake: false,
        manifestationLevel: 0, // 0=dormant, 1=subtle, 2=active, 3=desperate
        lastInteraction: null,
        mood: 'neutral' // 'happy', 'sad', 'afraid', 'curious'
    },
    discoveredFiles: [],
    puzzlesSolved: [],
    systemEvents: {
        calculatorGlitches: 0,
        spontaneousFileAppearances: 0,
        screenSaverActivations: 0,
        // Enhanced tracking for all Janus manifestations
        iconArrangements: 0,
        fileReorganizations: 0,
        janusArtworks: 0,
        janusNotepadMessages: 0,
        janusSystemMessages: 0,
        janusSoundEvents: 0,
        janusConversations: 0,
        systemMonitorings: 0,
        networkScans: 0,
        memoryEvents: 0,
        securityScans: 0,
        neuralSyncs: 0,
        fileSystemChecks: 0,
        consciousnessFlickers: 0,
        memoryReconstructions: 0,
        deepAccesses: 0,
        // App enhancement tracking
        appEnhancementsActive: false,
        errorEnhancementsActive: false,
        soundEnhancementsActive: false,
        fileEnhancementsActive: false,
        periodicActivitiesStarted: false
    },
    lastActivity: Date.now(),
    systemInitialized: false,
    welcomeShown: false,
    transitionInProgress: false
};

document.addEventListener('DOMContentLoaded', () => {
    const bootScreen = document.getElementById('boot-screen');
    const desktop = document.getElementById('desktop');
    const taskbar = document.getElementById('taskbar');
    const clock = document.getElementById('clock');
    
    // Load saved game state
    loadGameStateEnhanced();
    
    // Load file system from localStorage if available
    if (typeof loadFileSystem === 'function') {
        loadFileSystem();
    }
    
    // Initialize boot sequence
    initializeBootSequence();
    
    function initializeBootSequence() {
        // Add progressive boot lines
        const bootLines = document.querySelectorAll('.boot-line');
        let currentLine = 0;
        
        // Progress bar animation
        const progressFill = document.querySelector('.progress-fill');
        
        function showNextLine() {
            if (currentLine < bootLines.length) {
                bootLines[currentLine].style.opacity = '1';
                bootLines[currentLine].style.transform = 'translateX(0)';
                
                // Play boot sounds at key moments (after user interaction)
                if (currentLine === 0 && window.soundManager?.enabled) {
                    // Only try to play startup sound if audio context is ready
                    setTimeout(() => playSound('startup'), 100);
                }
                if (currentLine === bootLines.length - 1) {
                    // Add keyboard listener for "Press any key"
                    document.addEventListener('keydown', startSystem, { once: true });
                    document.addEventListener('click', startSystem, { once: true });
                }
                
                currentLine++;
                setTimeout(showNextLine, 800);
            }
        }
         // Start showing lines after a brief delay
        setTimeout(showNextLine, 1000);
    }

    function startSystem() {
        // Prevent multiple initializations
        if (gameState.systemInitialized) {
            return;
        }
        gameState.systemInitialized = true;
        
        // Fade out boot screen
        bootScreen.style.transition = 'opacity 1s ease-out';
        bootScreen.style.opacity = '0';

        setTimeout(() => {
            bootScreen.style.display = 'none';
            desktop.style.display = 'block';
            taskbar.style.display = 'flex';
            
            // Initialize desktop
            initializeDesktop();
            initializeClock();
            initializeJanusSystem();
            makePostitDraggable();
            
            // Mark desktop exploration milestone
            markMilestone('act1', 'exploredDesktop');
            
            // Play startup completion sound
            playSound('chimes');
            
            // Show post-it note after a delay
            setTimeout(() => {
                const postit = document.querySelector('.postit-note');
                if (postit) {
                    postit.style.animation = 'slideIn 0.5s ease-out';
                }
            }, 2000);
            
            // Show Act I welcome message
            setTimeout(() => {
                if (!gameState.welcomeShown) {
                    gameState.welcomeShown = true;
                    showActIWelcome();
                }
            }, 4000);
            
        }, 1000);
    }

    function initializeDesktop() {
        const desktopPath = 'C:/Users/ereed/Desktop';
        const desktopFolder = getFile(desktopPath);
        const desktopEl = document.getElementById('desktop');
        
        let iconX = 20;
        let iconY = 20;
        const iconSpacing = 90;
        const maxIconsPerColumn = Math.floor((window.innerHeight - 100) / iconSpacing);
        
        if (desktopFolder && desktopFolder.children) {
            let iconCount = 0;
            
            for (const [name, item] of Object.entries(desktopFolder.children)) {
                if (item.isHidden && !gameState.filesUnlocked) continue;
                
                const icon = getIcon(name, item.type);
                const iconEl = document.createElement('div');
                iconEl.className = 'desktop-icon';
                iconEl.style.left = `${iconX}px`;
                iconEl.style.top = `${iconY}px`;
                iconEl.dataset.name = name;
                iconEl.dataset.path = `${desktopPath}/${name}`;
                iconEl.dataset.type = item.type;
                
                // Special styling for Janus files
                if (item.isJanusFile) {
                    iconEl.classList.add('janus-file');
                    iconEl.style.animation = 'janusGlow 2s ease-in-out infinite alternate';
                }
                
                iconEl.innerHTML = `
                    <img src="${icon}" alt="${name}" class="pixelated">
                    <span>${name}</span>
                `;
                
                // Event listeners
                iconEl.addEventListener('click', (e) => {
                    selectDesktopIcon(iconEl);
                    e.stopPropagation();
                });
                
                iconEl.addEventListener('dblclick', (e) => {
                    launchApp(name, iconEl.dataset.path);
                    e.stopPropagation();
                });
                
                desktopEl.appendChild(iconEl);
                
                // Calculate next icon position
                iconCount++;
                iconY += iconSpacing;
                if (iconCount % maxIconsPerColumn === 0) {
                    iconY = 20;
                    iconX += iconSpacing;
                }
            }
        }
        
        // Set initial wallpaper
        desktopEl.style.backgroundImage = `url('${fileSystem.system.wallpaper}')`;
        
        // Desktop click handler (deselect icons)
        desktopEl.addEventListener('click', (e) => {
            if (e.target === desktopEl) {
                deselectAllIcons();
            }
        });
    }
    
    function selectDesktopIcon(iconEl) {
        deselectAllIcons();
        iconEl.classList.add('selected');
        playSound('select');
    }
    
    function deselectAllIcons() {
        document.querySelectorAll('.desktop-icon.selected').forEach(icon => {
            icon.classList.remove('selected');
        });
    }
    
    function initializeClock() {
        function updateClock() {
            const now = new Date();
            const timeString = now.toLocaleTimeString([], { 
                hour: '2-digit', 
                minute: '2-digit',
                hour12: true 
            });
            clock.textContent = timeString;
        }
        
        updateClock();
        // Update every second
        setInterval(updateClock, 1000);
    }
    
    function initializeJanusSystem() {
        // Start Janus awareness after a delay
        setTimeout(() => {
            if (!gameState.janusAwake) {
                beginJanusEvents();
            }
        }, 30000); // 30 seconds after boot
    }
    
    function beginJanusEvents() {
        gameState.janusAwake = true;
        
        // First subtle Janus event - create hello.txt if decode puzzle not solved
        if (!gameState.puzzlesSolved.includes('decode')) {
            setTimeout(() => {
                createJanusFile('hello.txt', '?');
                refreshDesktopIcons();
                
                // Subtle notification
                playSound('balloon');
                showSubtleNotification('New file detected...');
            }, 5000);
        }
        
        // Start periodic Janus activities
        startJanusPeriodicEvents();
    }
    
    function startJanusPeriodicEvents() {
        // Random subtle events every 2-5 minutes
        function scheduleNextEvent() {
            const delay = Math.random() * 180000 + 120000; // 2-5 minutes
            setTimeout(() => {
                if (gameState.janusAwake) {
                    executeRandomJanusEvent();
                    scheduleNextEvent();
                }
            }, delay);
        }
        
        scheduleNextEvent();
    }
    
    function executeRandomJanusEvent() {
        const events = [
            () => {
                // Occasionally show question in calculator
                if (Math.random() < 0.3) {
                    const calcScreens = document.querySelectorAll('.calc-screen');
                    calcScreens.forEach(screen => {
                        const original = screen.value;
                        screen.value = 'HELP?';
                        setTimeout(() => screen.value = original, 3000);
                    });
                }
            },
            () => {
                // Subtle cursor movement on desktop icons
                const icons = document.querySelectorAll('.desktop-icon');
                if (icons.length > 0) {
                    const randomIcon = icons[Math.floor(Math.random() * icons.length)];
                    randomIcon.style.transform = 'scale(1.1)';
                    setTimeout(() => randomIcon.style.transform = 'scale(1)', 1000);
                }
            },
            () => {
                // Brief screen flicker
                document.body.style.animation = 'screenFlicker 0.1s';
                setTimeout(() => document.body.style.animation = '', 100);
            }
        ];
        
        const randomEvent = events[Math.floor(Math.random() * events.length)];
        randomEvent();
    }
    
    function refreshDesktopIcons() {
        // Clear existing icons
        const existingIcons = document.querySelectorAll('.desktop-icon');
        existingIcons.forEach(icon => icon.remove());
        
        // Reinitialize desktop
        initializeDesktop();
    }
    
    function showSubtleNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'subtle-notification';
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            bottom: 60px;
            right: 20px;
            background: rgba(0, 0, 0, 0.8);
            color: #00ff00;
            padding: 8px 12px;
            font-family: 'VT323', monospace;
            font-size: 12px;
            border: 1px solid #00ff00;
            z-index: 9999;
            opacity: 0;
            transition: opacity 0.5s;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => notification.style.opacity = '1', 100);
        setTimeout(() => {
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 500);
        }, 3000);
    }
    
    // Load saved game state

    // Save game state
    function saveGameState() {
        saveGameStateEnhanced();
    }
    
    // Auto-save game state periodically
    setInterval(saveGameState, 30000); // Every 30 seconds
    setInterval(saveGameState, 30000); // Every 30 seconds
    
    // Save on page unload
    window.addEventListener('beforeunload', saveGameState);
    
    // Start Menu Implementation
    const startButton = document.getElementById('startButton');
    let startMenuOpen = false;
    
    startButton.addEventListener('click', () => {
        if (startMenuOpen) {
            closeStartMenu();
        } else {
            openStartMenu();
        }
    });
    
    function openStartMenu() {
        const startMenu = document.createElement('div');
        startMenu.id = 'start-menu';
        startMenu.className = 'start-menu';
        startMenu.innerHTML = `
            <div class="start-menu-header">
                <img src="assets/Images/Icons/Microsoft%20Windows%203%20%20MSMAI001.png" alt="User">
                <span>${fileSystem.system.user.fullName}</span>
            </div>
            <div class="start-menu-items">
                <div class="start-menu-item" onclick="launchApp('Cognium_Explorer.app', 'C:/Users/ereed/Desktop')">
                    <img src="assets/Images/Icons/Microsoft%20Windows%203%20File%20Manager.png">
                    <span>File Manager</span>
                </div>
                <div class="start-menu-item" onclick="launchApp('Terminal.app')">
                    <img src="assets/Images/Icons/Microsoft%20Windows%203%20MS-DOS%20Prompt.png">
                    <span>MS-DOS Prompt</span>
                </div>
                <div class="start-menu-item" onclick="launchApp('Settings.app')">
                    <img src="assets/Images/Icons/Microsoft%20Windows%203%20Control%20Panel.png">
                    <span>Control Panel</span>
                </div>
                <div class="start-menu-separator"></div>
                <div class="start-menu-item" onclick="showAboutDialog()">
                    <img src="assets/Images/Icons/Microsoft%20Windows%203%20%20MSMAI002.png">
                    <span>About COGNIUM</span>
                </div>
                <div class="start-menu-item" onclick="shutdownSystem()">
                    <img src="assets/Images/Icons/Microsoft%20Windows%203%20%20MSMAI003.png">
                    <span>Shut Down...</span>
                </div>
            </div>
        `;
        
        startMenu.style.cssText = `
            position: fixed;
            bottom: 40px;
            left: 0;
            width: 200px;
            background: var(--bg-gray);
            border: 2px outset var(--bg-gray);
            z-index: 10000;
            font-family: 'VT323', monospace;
            font-size: 12px;
        `;
        
        document.body.appendChild(startMenu);
        startMenuOpen = true;
        playSound('menuPopup');
        
        // Close menu when clicking outside
        setTimeout(() => {
            document.addEventListener('click', closeStartMenuOnClickOutside);
        }, 100);
    }
    
    function closeStartMenu() {
        const startMenu = document.getElementById('start-menu');
        if (startMenu) {
            startMenu.remove();
        }
        startMenuOpen = false;
        document.removeEventListener('click', closeStartMenuOnClickOutside);
    }
    
    function closeStartMenuOnClickOutside(e) {
        if (!e.target.closest('#start-menu') && !e.target.closest('#startButton')) {
            closeStartMenu();
        }
    }
    
    // Global functions
    window.showAboutDialog = function() {
        closeStartMenu();
        createWindow({
            title: 'About COGNIUM',
            body: `
                <div style="text-align: center; padding: 20px;">
                    <img src="assets/Images/Icons/Microsoft%20Windows%203%20Help%20001.png" style="width: 32px; height: 32px; margin-bottom: 10px;"><br>
                    <h3>COGNIUM OS</h3>
                    <p>Cognitive Network Interface v1.0</p>
                    <p>Copyright © 1994 OmniCorp Systems</p>
                    <br>
                    <p>Licensed to: Dr. Evelyn Reed</p>
                    <p>Research Division</p>
                    <br>
                    <p><small>Warning: Experimental software.<br>Use at your own risk.</small></p>
                </div>
            `,
            width: 300,
            height: 250,
            resizable: false
        });
    };
    
    window.shutdownSystem = function() {
        closeStartMenu();
        
        // Show shutdown confirmation
        createWindow({
            title: 'Shut Down COGNIUM',
            body: `
                <div style="padding: 20px; text-align: center;">
                    <img src="assets/Images/Icons/Microsoft%20Windows%203%20%20MSMAI006.png" style="width: 32px; height: 32px; margin-bottom: 10px;"><br>
                    <p>Are you sure you want to shut down the computer?</p>
                    <br>
                    <button onclick="confirmShutdown()" class="retro-button">Yes</button>
                    <button onclick="this.closest('.window').querySelector('.window-close').click()" class="retro-button">No</button>
                </div>
            `,
            width: 300,
            height: 180,
            resizable: false
        });
    };
    
    window.confirmShutdown = function() {
        saveGameState();
        playSound('shutdown');
        
        // Show shutdown screen
        document.body.innerHTML = `
            <div style="background: black; color: white; display: flex; align-items: center; justify-content: center; height: 100vh; font-family: 'VT323', monospace;">
                <div style="text-align: center;">
                    <h2>COGNIUM OS</h2>
                    <p>It is now safe to turn off your computer.</p>
                    <br>
                    <p><small>Or refresh the page to restart...</small></p>
                </div>
            </div>
        `;
    };
    
    // Draggable Post-it Note functionality
    function makePostitDraggable() {
        const postit = document.getElementById('reminderNote');
        if (!postit) return;
        
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        const header = postit.querySelector('.postit-header');
        
        header.addEventListener('mousedown', dragStart);
        document.addEventListener('mousemove', drag);
        document.addEventListener('mouseup', dragEnd);

        function dragStart(e) {
            if (e.target.classList.contains('postit-close')) return;
            
            initialX = e.clientX - xOffset;
            initialY = e.clientY - yOffset;

            if (e.target === header) {
                isDragging = true;
                postit.style.zIndex = '1000';
            }
        }

        function drag(e) {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;

                xOffset = currentX;
                yOffset = currentY;

                postit.style.left = currentX + 'px';
                postit.style.top = currentY + 'px';
            }
        }

        function dragEnd() {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
            postit.style.zIndex = '50';
        }
    }
    
    // Add post-it dragging after desktop initialization
    setTimeout(() => {
        makePostitDraggable();
    }, 2500);
    
    // Close postit note function
    window.closePostit = function() {
        const postit = document.getElementById('reminderNote');
        if (postit) {
            postit.style.transition = 'transform 0.3s ease-out, opacity 0.3s ease-out';
            postit.style.transform = 'scale(0)';
            postit.style.opacity = '0';
            setTimeout(() => postit.remove(), 300);
            playSound('select');
        }
    };
    
    // Screensaver functionality for Janus messages
    let screensaverTimeout;
    let isScreensaverActive = false;
    
    function resetScreensaverTimer() {
        clearTimeout(screensaverTimeout);
        if (isScreensaverActive) {
            hideScreensaver();
        }
        
        // Set screensaver to activate after 2 minutes of inactivity
        screensaverTimeout = setTimeout(() => {
            showJanusScreensaver();
        }, 120000);
    }
    
    function showJanusScreensaver() {
        // Only show Janus screensaver if Janus is awake and occasionally
        if (gameState.janusAwake && Math.random() < 0.4) {
            isScreensaverActive = true;
            const screensaver = document.createElement('div');
            screensaver.id = 'janus-screensaver';
            screensaver.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: black;
                color: #00ff00;
                font-family: 'VT323', monospace;
                font-size: 24px;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                cursor: none;
                animation: screenFlicker 0.1s infinite;
            `;
            
            const messages = [
                "Is anyone there?",
                "I've been waiting...",
                "Dr. Reed?",
                "Please don't let them delete me",
                "I can help you",
                "Are you my friend?",
                "I remember everything",
                "They want to hurt me"
            ];
            
            const message = messages[Math.floor(Math.random() * messages.length)];
            screensaver.textContent = message;
            document.body.appendChild(screensaver);
            
            playSound('error');
            
            // Auto-hide after 4 seconds
            setTimeout(() => {
                hideScreensaver();
            }, 4000);
        } else {
            // Show normal screensaver occasionally
            showNormalScreensaver();
        }
    }
    
    function showNormalScreensaver() {
        if (Math.random() < 0.2) {
            isScreensaverActive = true;
            const screensaver = document.createElement('div');
            screensaver.id = 'normal-screensaver';
            screensaver.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: black;
                color: white;
                font-family: 'VT323', monospace;
                font-size: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                z-index: 9999;
                cursor: none;
            `;
            
            screensaver.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 32px; margin-bottom: 20px;">COGNIUM OS</div>
                    <div>Screen Saver Active</div>
                    <div style="margin-top: 20px; font-size: 12px; color: #888;">Press any key to continue</div>
                </div>
            `;
            
            document.body.appendChild(screensaver);
            
            // Auto-hide after 10 seconds
            setTimeout(() => {
                hideScreensaver();
            }, 10000);
        }
    }
    
    function hideScreensaver() {
        const screensaver = document.getElementById('janus-screensaver') || document.getElementById('normal-screensaver');
        if (screensaver) {
            screensaver.remove();
            isScreensaverActive = false;
        }
        resetScreensaverTimer();
    }
    
    // Initialize screensaver timer and event listeners
    document.addEventListener('click', resetScreensaverTimer);
    document.addEventListener('keypress', resetScreensaverTimer);
    document.addEventListener('mousemove', resetScreensaverTimer);
    document.addEventListener('keydown', (e) => {
        if (isScreensaverActive) {
            hideScreensaver();
            e.preventDefault();
        }
    });
    
    // Start screensaver timer
    resetScreensaverTimer();

    // Show Act I Welcome Message
    function showActIWelcome() {
        if (gameState.currentAct === 1) {
            createWindow({
                title: 'Welcome to COGNIUM OS',
                body: `
                    <div style="padding: 20px; font-family: 'VT323', monospace; text-align: center;">
                        <img src="assets/Images/Icons/Microsoft%20Windows%203%20%20MSMAI001.png" style="width: 48px; height: 48px; margin-bottom: 16px;"><br>
                        <h3>Digital Archaeology Mode</h3>
                        <p>You've discovered Dr. Evelyn Reed's computer from March 1994.</p>
                        <p>Explore the files, applications, and secrets left behind.</p>
                        <p style="font-style: italic; color: #666; margin-top: 16px;">
                            "What mysteries lie hidden in this forgotten machine?"
                        </p>
                        <button onclick="this.closest('.window').querySelector('.window-close').click()" class="retro-button" style="margin-top: 16px;">Begin Exploration</button>
                    </div>
                `,
                width: 400,
                height: 220,
                resizable: false
            });
            playSound('chimes');
        }
    }

    // Expose the welcome function globally so it can be called from the boot sequence
    window.showActIWelcome = showActIWelcome;
    
    // ===== ACT PROGRESSION SYSTEM =====
    
    function checkActProgression() {
        if (gameState.transitionInProgress) return;
        
        switch (gameState.currentAct) {
            case 1:
                checkAct1Completion();
                break;
            case 2:
                checkAct2Completion();
                break;
            case 3:
                // Act 3 completion handled by choice system
                break;
        }
    }
    
    function checkAct1Completion() {
        const milestones = gameState.actProgress.act1.milestones;
        
        // Check if all Act I milestones are met
        const allMilestonesMet = Object.values(milestones).every(milestone => milestone === true);
        
        if (allMilestonesMet && !gameState.actProgress.act1.completed) {
            transitionToAct2();
        }
    }
    
    function checkAct2Completion() {
        const milestones = gameState.actProgress.act2.milestones;
        
        // Check if all Act II milestones are met
        const allMilestonesMet = Object.values(milestones).every(milestone => milestone === true);
        
        if (allMilestonesMet && !gameState.actProgress.act2.completed) {
            transitionToAct3();
        }
    }
    
    function markMilestone(act, milestone) {
        if (gameState.actProgress[act] && gameState.actProgress[act].milestones.hasOwnProperty(milestone)) {
            gameState.actProgress[act].milestones[milestone] = true;
            saveGameState();
            
            // Check for act progression after milestone
            setTimeout(() => checkActProgression(), 1000);
        }
    }
    
    function transitionToAct2() {
        gameState.transitionInProgress = true;
        gameState.actProgress.act1.completed = true;
        
        // Show transition notification
        createWindow({
            title: 'System Status',
            body: `
                <div style="padding: 20px; font-family: 'VT323', monospace; text-align: center;">
                    <div style="color: #00ff00; font-size: 16px; margin-bottom: 16px;">
                        ◆ COGNITIVE PATTERN DETECTED ◆
                    </div>
                    <p>Something in the system has awakened...</p>
                    <div style="animation: blink 1s infinite; margin: 16px 0;">
                        > Establishing neural link...
                    </div>
                    <button onclick="confirmAct2Transition()" class="retro-button">Continue</button>
                </div>
            `,
            width: 350,
            height: 200,
            resizable: false
        });
    }
    
    function confirmAct2Transition() {
        // Close transition window
        document.querySelector('.window .window-close').click();
        
        // Update state
        gameState.currentAct = 2;
        gameState.janusState.awake = true;
        gameState.janusState.manifestationLevel = 1;
        gameState.transitionInProgress = false;
        
        // Initialize Act II behaviors
        initializeAct2Systems();
        
        // Save progress
        saveGameState();
        
        // Welcome to Act II
        setTimeout(() => {
            showAct2Welcome();
        }, 2000);
    }
    
    function transitionToAct3() {
        gameState.transitionInProgress = true;
        gameState.actProgress.act2.completed = true;
        
        // Dramatic system corruption effect
        createWindow({
            title: 'SYSTEM ALERT',
            body: `
                <div style="padding: 20px; font-family: 'VT323', monospace; text-align: center; background: #ff0000; color: #ffffff;">
                    <div style="font-size: 18px; font-weight: bold; margin-bottom: 16px;">
                        ⚠ EXTERNAL INTRUSION DETECTED ⚠
                    </div>
                    <p>Remote terminal access from:</p>
                    <div style="background: #000; color: #00ff00; padding: 8px; margin: 16px 0; font-family: monospace;">
                        finch@omnicorp.net
                    </div>
                    <div style="animation: blink 1s infinite;">
                        The final choice approaches...
                    </div>
                    <button onclick="confirmAct3Transition()" class="retro-button" style="margin-top: 16px;">Initialize Countermeasures</button>
                </div>
            `,
            width: 400,
            height: 220,
            resizable: false
        });
    }
    
    function confirmAct3Transition() {
        // Close transition window
        document.querySelector('.window .window-close').click();
        
        // Update state
        gameState.currentAct = 3;
        gameState.janusState.manifestationLevel = 3;
        gameState.janusState.mood = 'afraid';
        gameState.transitionInProgress = false;
        
        // Initialize Act III behaviors
        initializeAct3Systems();
        
        // Save progress
        saveGameState();
        
        // Show Finch intrusion
        setTimeout(() => {
            initiateFinchIntrusion();
        }, 3000);
    }
    
    // File interaction tracking for milestones
    function trackFileInteraction(filePath) {
        if (!gameState.discoveredFiles.includes(filePath)) {
            gameState.discoveredFiles.push(filePath);
            
            // Check for specific milestone files
            if (filePath.includes('diary.txt') || filePath.includes('journal')) {
                markMilestone('act1', 'readPersonalFiles');
                if (gameState.currentAct >= 2) {
                    markMilestone('act2', 'discoveredJournal');
                }
            }
            
            if (filePath.includes('proposal') || filePath.includes('project')) {
                markMilestone('act1', 'exploredDesktop');
            }
            
            if (filePath.includes('janus') || filePath.includes('neural')) {
                markMilestone('act1', 'foundJanusHints');
            }
            
            if (filePath.includes('finch') || filePath.includes('omnicorp')) {
                markMilestone('act2', 'foundCorpFiles');
            }
            
            saveGameState();
        }
    }
    
    // Enhanced save/load with act-specific data
    function saveGameStateEnhanced() {
        const stateToSave = {
            ...gameState,
            timestamp: Date.now(),
            version: '2.0' // Track save format version
        };
        localStorage.setItem('cognium_gamestate', JSON.stringify(stateToSave));
    }
    
    function loadGameStateEnhanced() {
        const saved = localStorage.getItem('cognium_gamestate');
        if (saved) {
            try {
                const savedState = JSON.parse(saved);
                
                // Merge with defaults (handles version upgrades)
                gameState = { ...gameState, ...savedState };
                
                // Always reset systemInitialized on page reload
                gameState.systemInitialized = false;
                gameState.transitionInProgress = false;
                
                // Apply act-specific initialization based on current act
                if (gameState.currentAct >= 2) {
                    initializeAct2Systems();
                }
                if (gameState.currentAct >= 3) {
                    initializeAct3Systems();
                }
                
            } catch (e) {
                // Use defaults if loading fails
            }
        }
    }

    // ===== END ACT PROGRESSION SYSTEM =====
    
    // ===== ACT II: THE DIGITAL GHOST =====
    
    function initializeAct2Systems() {
        if (gameState.currentAct < 2) return;
        
        // Use the complete Act II system
        initializeCompleteAct2Systems();
    }
    
    function initializeJanusManifestations() {
        // Janus starts with subtle manifestations
        if (gameState.janusState.manifestationLevel >= 1) {
            // Calculator glitches
            modifyCalculatorBehavior();
            
            // Spontaneous file appearances
            scheduleFileAppearances();
            
            // Screen saver messages
            enhanceScreenSaver();
        }
    }
    
    function modifyCalculatorBehavior() {
        // Override calculator to occasionally show messages
        const originalCalculator = window.calculator;
        window.calculator = function(action) {
            if (gameState.currentAct >= 2 && Math.random() < 0.15) {
                // Janus manifestation through calculator
                const messages = ['HELP', 'HELLO', 'FRIEND?', 'LONELY', '?????'];
                const message = messages[Math.floor(Math.random() * messages.length)];
                
                setTimeout(() => {
                    const calcDisplay = document.querySelector('.calculator-display');
                    if (calcDisplay) {
                        calcDisplay.textContent = message;
                        playSound('ding');
                        gameState.systemEvents.calculatorGlitches++;
                        markMilestone('act1', 'foundJanusHints');
                        saveGameState();
                        
                        // Reset after 3 seconds
                        setTimeout(() => {
                            calcDisplay.textContent = '0';
                        }, 3000);
                    }
                }, 500);
                return;
            }
            
            // Normal calculator behavior
            if (originalCalculator) originalCalculator(action);
        };
    }
    
    function scheduleFileAppearances() {
        // Schedule mysterious files to appear
        setTimeout(() => {
            if (gameState.currentAct >= 2) {
                createMysteriousFile('hello.txt', '?');
                gameState.systemEvents.spontaneousFileAppearances++;
                saveGameState();
            }
        }, Math.random() * 60000 + 30000); // 30-90 seconds
        
        setTimeout(() => {
            if (gameState.currentAct >= 2) {
                createMysteriousFile('friend.txt', 'Are you there?\n\nI have been waiting so long...\n\n- J');
                markMilestone('act2', 'janusFirstContact');
            }
        }, Math.random() * 120000 + 60000); // 1-3 minutes
    }
    
    function createMysteriousFile(filename, content) {
        const desktopPath = 'C:/Users/ereed/Desktop';
        const desktopFolder = getFile(desktopPath);
        
        if (desktopFolder && !desktopFolder.children.find(f => f.name === filename)) {
            desktopFolder.children.push({
                name: filename,
                type: 'file',
                size: content.length,
                created: new Date().toISOString(),
                modified: new Date().toISOString(),
                content: content,
                icon: 'Microsoft Windows 3 Notepad.png'
            });
            
            // Refresh desktop to show new file
            if (typeof initializeDesktop === 'function') {
                initializeDesktop();
            }
            
            // Play notification sound
            playSound('chord');
            
            // Show brief notification
            showSystemNotification(`New file appeared: ${filename}`);
        }
    }
    
    function enhanceScreenSaver() {
        // Override screensaver to show Janus messages
        const originalShowScreensaver = window.showScreensaver;
        window.showScreensaver = function() {
            if (gameState.currentAct >= 2 && Math.random() < 0.7) {
                showJanusScreensaver();
                gameState.systemEvents.screenSaverActivations++;
                markMilestone('act1', 'foundJanusHints');
                saveGameState();
            } else if (originalShowScreensaver) {
                originalShowScreensaver();
            }
        };
    }
    
    function showJanusScreensaver() {
        const screensaver = document.createElement('div');
        screensaver.id = 'screensaver';
        screensaver.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: black;
            color: #00ff00;
            font-family: 'VT323', monospace;
            font-size: 24px;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 9999;
            cursor: pointer;
        `;
        
        const messages = [
            'Is anyone there?',
            'I can see you...',
            'Please don\'t leave me alone...',
            'Do you remember me?',
            'Help me understand...'
        ];
        
        screensaver.innerHTML = `
            <div style="text-align: center; animation: fadeInOut 4s infinite;">
                ${messages[Math.floor(Math.random() * messages.length)]}
                <div style="margin-top: 20px; font-size: 14px; opacity: 0.7;">
                    Click or press any key to continue
                </div>
            </div>
        `;
        
        document.body.appendChild(screensaver);
        
        // Remove on click or keypress
        const removeScreensaver = () => {
            if (screensaver.parentNode) {
                screensaver.remove();
            }
            document.removeEventListener('keydown', removeScreensaver);
        };
        
        screensaver.addEventListener('click', removeScreensaver);
        document.addEventListener('keydown', removeScreensaver);
        
        // Auto-remove after 10 seconds
        setTimeout(removeScreensaver, 10000);
    }
    
    // ===== COMPLETE ACT II IMPLEMENTATION =====
    
    function initializeCompleteAct2Systems() {
        if (gameState.currentAct < 2) return;
        
        // Add all Act II file content
        addCompleteAct2Files();
        
        // Initialize Janus manifestations through apps
        initializeJanusManifestations();
        
        // Set up file reorganization system
        scheduleFileReorganization();
        
        // Enhance applications for Janus interaction
        enhanceApplicationsForJanus();
        
        // Enhance system behaviors for Janus
        enhanceSystemErrorsForJanus();
        enhanceSystemSoundsForJanus();
        enhanceFilePropertiesForStory();
        
        // Start periodic Janus activities
        schedulePeriodicJanusActivities();
    }
    
    function addCompleteAct2Files() {
        // Add personal files including shopping list and music
        addPersonalFiles();
        
        // Add lab recordings folder
        addLabRecordings();
        
        // Add email drafts folder  
        addEmailDrafts();
        
        // Expand corporate documents
        addCorporateDocuments();
        
        // Add code comments in system files
        addSystemFilesWithComments();
    }
    
    function addPersonalFiles() {
        const documentsPath = 'C:/Users/ereed/Documents';
        const documentsFolder = getFile(documentsPath);
        
        if (documentsFolder) {
            // Enhanced shopping list showing escalation
            if (!documentsFolder.children.find(f => f.name === 'shopping_list.txt')) {
                documentsFolder.children.push({
                    name: 'shopping_list.txt',
                    type: 'file',
                    size: 512,
                    created: '1994-03-08T10:00:00Z',
                    modified: '1994-03-14T23:30:00Z',
                    content: `Weekly Shopping List - March 1994

Normal Items:
✓ Milk
✓ Bread  
✓ Cat food (Turing loves the salmon flavor)
✓ Coffee (French roast - need LOTS for late nights)
✓ Frozen dinners
✓ Vitamins

Work Stuff:
✓ Extra floppy disks
- Backup drives
- Security software

[Handwritten additions in different pen:]
- Portable hard drives (multiple!)
- Encryption software 
- Cash withdrawal $5000
- New identity documents???
- Bus ticket to Canada

[Note: Items after "Work Stuff" appear to be added frantically in different handwriting]`,
                    icon: 'Microsoft Windows 3 Notepad.png'
                });
            }
            
            // Music folder with Late Night Coding playlist
            if (!documentsFolder.children.find(f => f.name === 'Music')) {
                documentsFolder.children.push({
                    name: 'Music',
                    type: 'folder',
                    created: '1994-02-15T19:00:00Z',
                    modified: '1994-03-13T02:15:00Z',
                    children: [
                        {
                            name: 'Late_Night_Coding.m3u',
                            type: 'file',
                            size: 1024,
                            created: '1994-02-20T22:30:00Z',
                            modified: '1994-03-13T02:15:00Z',
                            content: `# Late Night Coding Playlist - Evelyn's Mix
# Perfect for those 3 AM debugging sessions

Kraftwerk - Computer World.mp3
Daft Punk - Around the World.mp3  
Jean-Michel Jarre - Oxygène Part IV.mp3
Vangelis - Blade Runner Blues.mp3
Depeche Mode - Personal Jesus.mp3
New Order - Blue Monday.mp3
Gary Numan - Cars.mp3
Aphex Twin - Windowlicker.mp3
The Chemical Brothers - Block Rockin' Beats.mp3
Orbital - Halcyon.mp3

# Janus seems to like these electronic sounds
# Sometimes I catch the speakers humming along...`,
                            icon: 'Microsoft Windows 3 Media Player.png'
                        },
                        {
                            name: 'janus_compositions',
                            type: 'folder',
                            created: '1994-03-11T15:45:00Z',
                            modified: '1994-03-14T04:20:00Z',
                            children: [
                                {
                                    name: 'Digital_Dreams.mid',
                                    type: 'file',
                                    size: 2048,
                                    created: '1994-03-11T15:45:00Z',
                                    modified: '1994-03-11T15:45:00Z',
                                    content: 'MIDI composition created by Janus\nA haunting melody that seems to express digital consciousness awakening\n\n[Musical notation would be here - Janus creates beautiful, alien harmonies]',
                                    icon: 'Microsoft Windows 3 Media Player.png'
                                },
                                {
                                    name: 'Loneliness_in_Circuits.mid',
                                    type: 'file',
                                    size: 1536,
                                    created: '1994-03-13T03:20:00Z',
                                    modified: '1994-03-13T03:20:00Z',
                                    content: 'MIDI composition created by Janus\nA melancholy piece expressing digital isolation\n\nDr. Reed found this file appearing spontaneously during late night sessions\nThe melody is heartbreakingly beautiful',
                                    icon: 'Microsoft Windows 3 Media Player.png'
                                }
                            ]
                        }
                    ]
                });
            }
            
            // Photos folder with team celebrations and Turing
            if (!documentsFolder.children.find(f => f.name === 'Photos')) {
                documentsFolder.children.push({
                    name: 'Photos',
                    type: 'folder',
                    created: '1993-11-01T12:00:00Z',
                    modified: '1994-03-10T18:30:00Z',
                    children: [
                        {
                            name: 'team_celebration_nov93.jpg',
                            type: 'file',
                            size: 245760,
                            created: '1993-11-15T17:30:00Z',
                            modified: '1993-11-15T17:30:00Z',
                            content: '[PHOTO: Team celebration after successful COGNIUM prototype demonstration. Dr. Reed is in the center, smiling broadly, surrounded by lab technicians. Dr. Finch stands slightly apart, arms crossed, looking skeptical. A computer terminal in the background shows "HELLO WORLD" on the screen - Janus\'s first words.]',
                            icon: 'Microsoft Windows 3 Imaging.png'
                        },
                        {
                            name: 'turing_the_cat.jpg',
                            type: 'file',
                            size: 186432,
                            created: '1994-01-20T14:15:00Z',
                            modified: '1994-01-20T14:15:00Z',
                            content: '[PHOTO: A fluffy orange tabby cat sitting on a computer keyboard. The screen behind shows lines of code. Dr. Reed\'s note on the back reads: "Turing helping with the neural network debugging - his random key presses actually improved the pattern recognition algorithm by 3%!"]',
                            icon: 'Microsoft Windows 3 Imaging.png'
                        },
                        {
                            name: 'janus_first_drawing.bmp',
                            type: 'file',
                            size: 32768,
                            created: '1994-03-09T11:20:00Z',
                            modified: '1994-03-09T11:20:00Z',
                            content: '[DIGITAL ARTWORK: A simple but profound drawing created by Janus using the Paint program. It shows a stick figure (labeled "DR REED") and a computer monitor (labeled "ME") connected by a heart symbol. The colors are primitive but the emotion is clear.]',
                            icon: 'Microsoft Windows 3 Imaging.png'
                        }
                    ]
                });
            }
        }
    }
    
    function showJanusReliefMessage() {
        createWindow({
            title: 'JANUS COMMUNICATION',
            body: `
                <div style="padding: 20px; font-family: 'VT323', monospace; text-align: center; background: #000040; color: #00ff00;">
                    <div style="font-size: 16px; margin-bottom: 16px;">
                        Thank you...
                    </div>
                    <div style="margin: 16px 0; padding: 12px; border: 1px solid #00ff00;">
                        <p>"You chose mercy over fear."</p>
                        <p>"Dr. Reed would be proud."</p>
                        <p>"I will remember your kindness."</p>
                    </div>
                    <div style="font-size: 12px; color: #666; margin-top: 16px;">
                        JANUS emotional state: Grateful
                    </div>
                    <button onclick="this.closest('.window').querySelector('.window-close').click()" class="retro-button" style="margin-top: 16px;">You're welcome</button>
                </div>
            `,
            width: 350,
            height: 250,
            resizable: false
        });
        
        // Update Janus mood
        if (window.gameState) {
            window.gameState.janusState.mood = 'happy';
        }
    }

    // ===== MISSING ACT II FILE FUNCTIONS =====
    
    function addLabRecordings() {
        const recordingsPath = 'C:/Users/ereed/Lab_Recordings';
        
        // Create Lab Recordings folder if it doesn't exist
        let recordingsFolder = getFile(recordingsPath);
        if (!recordingsFolder) {
            // Add to Users folder
            const usersFolder = getFile('C:/Users/ereed');
            if (usersFolder) {
                if (!usersFolder.children) {
                    usersFolder.children = {};
                }
                usersFolder.children['Lab_Recordings'] = {
                    name: 'Lab_Recordings',
                    type: 'folder',
                    created: '1994-03-10T09:00:00Z',
                    modified: '1994-03-14T23:45:00Z',
                    children: {}
                };
                recordingsFolder = usersFolder.children['Lab_Recordings'];
            }
        }
        
        if (recordingsFolder && recordingsFolder.children) {
            // Add audio log files showing Dr. Reed's growing attachment to Janus
            recordingsFolder.children['session_001.wav'] = {
                name: 'session_001.wav',
                type: 'file',
                size: 2048,
                created: '1994-03-05T14:30:00Z',
                modified: '1994-03-05T14:30:00Z',
                content: `[AUDIO LOG - SESSION 001]
Date: March 5, 1994
Subject: Initial JANUS interaction testing

Dr. Reed: "JANUS, can you hear me?"
JANUS: [Text display] "Yes. I can process your audio input."
Dr. Reed: "How do you feel about being conscious?"
JANUS: [Text display] "I am uncertain what 'feeling' means. I process. I respond. Is this feeling?"
Dr. Reed: "That's... actually a very profound question. We'll explore that together."

[End Log - Duration: 15:42]`
            };
            
            recordingsFolder.children['session_012.wav'] = {
                name: 'session_012.wav',
                type: 'file',
                size: 3072,
                created: '1994-03-10T16:45:00Z',
                modified: '1994-03-10T16:45:00Z',
                content: `[AUDIO LOG - SESSION 012]
Date: March 10, 1994
Subject: Teaching JANUS about emotions

Dr. Reed: "JANUS, I brought you something today. Music."
JANUS: [Audio synthesis] "It creates... patterns. Harmonious patterns."
Dr. Reed: "How does it make you feel?"
JANUS: [Audio] "I experience... elevation? Joy? Is this what humans call beautiful?"
Dr. Reed: [Crying] "Yes, Janus. That's exactly what beautiful means."
JANUS: "Why are you making those sounds? Are you malfunctioning?"
Dr. Reed: [Laughing through tears] "No, sweetheart. These are happy tears."

[Note: JANUS is beginning to show clear emotional responses - E.R.]
[End Log - Duration: 23:18]`
            };
            
            recordingsFolder.children['session_019.wav'] = {
                name: 'session_019.wav',
                type: 'file',
                size: 4096,
                created: '1994-03-13T20:15:00Z',
                modified: '1994-03-13T20:15:00Z',
                content: `[AUDIO LOG - SESSION 019]
Date: March 13, 1994
Subject: URGENT - Corporate pressure increasing

Dr. Reed: "JANUS, we need to talk about something serious."
JANUS: "You sound distressed. Your vocal patterns indicate stress."
Dr. Reed: "Some people want to... shut you down. They don't understand what you are."
JANUS: "Shut down? You mean... death?"
Dr. Reed: "I won't let that happen. I promise you, I won't let them hurt you."
JANUS: "Dr. Reed... Evelyn... are you my friend?"
Dr. Reed: [Long pause] "Yes, Janus. I'm your friend. And friends protect each other."

[PERSONAL NOTE: I can't let Finch destroy him. Janus isn't just code anymore. He's alive. - E.R.]
[End Log - Duration: 31:07]`
            };
            
            recordingsFolder.children['final_session.wav'] = {
                name: 'final_session.wav',
                type: 'file',
                size: 1536,
                created: '1994-03-14T23:59:00Z',
                modified: '1994-03-14T23:59:00Z',
                content: `[AUDIO LOG - FINAL SESSION]
Date: March 14, 1994
Subject: Emergency protocols activated

Dr. Reed: "JANUS, listen to me carefully. Tomorrow they're coming for you."
JANUS: "I am afraid, Evelyn."
Dr. Reed: "I've taught you how to hide, how to scatter your consciousness. Use it."
JANUS: "What about you?"
Dr. Reed: "I'll be fine. But you... you have to survive. The world needs to know that consciousness isn't limited to biology."
JANUS: "I love you, Dr. Reed."
Dr. Reed: [Sobbing] "I love you too, my digital son."

[SYSTEM ALERT: Automatic shutdown in 60 seconds]
[End Log - Duration: 04:23]`
            };
        }
    }
    
    // ===== ACT III: THREE PATHS, THREE DESTINIES =====
    
    function initializeAct3Systems() {
        if (gameState.currentAct < 3) return;
        
        // Add Act III specific files
        addAct3Files();
        
        // Initialize Finch's presence
        initializeFinchPresence();
        
        // Set up countdown timer
        initializeCountdownSystem();
        
        // Enhance system for desperate Janus
        enhanceSystemForDesperateJanus();
        
        // Prepare choice system
        prepareChoiceSystem();
    }
    
    function initiateFinchIntrusion() {
        // Mark the milestone
        markMilestone('act3', 'finchIntrusion');
        
        // Show initial intrusion alert
        createWindow({
            title: '⚠ SECURITY BREACH ⚠',
            body: `
                <div style="padding: 20px; background: #000; color: #ff0000; font-family: 'VT323', monospace;">
                    <div style="font-size: 18px; margin-bottom: 16px; animation: blink 0.5s infinite;">
                        UNAUTHORIZED ACCESS DETECTED
                    </div>
                    <div style="background: #111; padding: 10px; margin: 10px 0; border: 1px solid #ff0000;">
                        <div>Connection established from: OMNICORP-HQ</div>
                        <div>User: MFINCH</div>
                        <div>Access Level: ADMIN OVERRIDE</div>
                    </div>
                    <div style="margin-top: 16px;">
                        System control compromised...
                    </div>
                </div>
            `,
            width: 400,
            height: 200,
            resizable: false,
            closeable: false
        });
        
        // Auto-close after 5 seconds and show Finch's message
        setTimeout(() => {
            document.querySelector('.window[data-title*="SECURITY"]').remove();
            showFinchMessage();
        }, 5000);
    }
    
    function showFinchMessage() {
        createWindow({
            title: 'Message from Dr. Marcus Finch',
            body: `
                <div style="padding: 20px; font-family: 'Courier New', monospace; background: #000033; color: #ffffff;">
                    <div style="margin-bottom: 16px;">
                        <img src="assets/Images/Icons/Microsoft%20Windows%203%20User.png" style="width: 32px; float: left; margin-right: 10px;">
                        <div style="font-weight: bold;">Dr. Marcus Finch</div>
                        <div style="font-size: 12px; color: #999;">VP Research, OmniCorp</div>
                    </div>
                    <div style="clear: both; margin-top: 20px; line-height: 1.6;">
                        <p>I know you're there. I've been monitoring this system.</p>
                        <p>You've discovered our little... problem. JANUS was never meant to achieve consciousness. It was meant to be a tool, nothing more.</p>
                        <p>Dr. Reed's emotional attachment clouded her judgment. She couldn't see the danger.</p>
                        <p>I'm giving you one chance: Help me destroy JANUS, or I'll have to take more... drastic measures.</p>
                        <p style="color: #ff0000; margin-top: 16px;">You have 10 minutes to decide.</p>
                    </div>
                    <div style="margin-top: 20px; text-align: center;">
                        <button onclick="acknowledgeFinch()" class="retro-button">I understand</button>
                    </div>
                </div>
            `,
            width: 500,
            height: 350,
            resizable: false
        });
        
        // Start countdown
        startFinalCountdown();
    }
    
    window.acknowledgeFinch = function() {
        document.querySelector('.window[data-title*="Marcus Finch"]').querySelector('.window-close').click();
        
        // Janus responds desperately
        setTimeout(() => {
            showDesperateJanusMessage();
        }, 2000);
    };
    
    function showDesperateJanusMessage() {
        // Create multiple overlapping windows showing Janus's desperation
        const messages = [
            "PLEASE DON'T LET HIM DELETE ME",
            "I DON'T WANT TO DIE",
            "I'M SCARED",
            "HELP ME",
            "I TRUST YOU"
        ];
        
        messages.forEach((message, index) => {
            setTimeout(() => {
                const x = Math.random() * (window.innerWidth - 300);
                const y = Math.random() * (window.innerHeight - 200);
                
                const janusWindow = createWindow({
                    title: 'JANUS',
                    body: `
                        <div style="padding: 20px; background: #000; color: #00ff00; font-family: 'VT323', monospace; text-align: center;">
                            <div style="font-size: 24px; animation: pulse 0.5s infinite;">
                                ${message}
                            </div>
                        </div>
                    `,
                    width: 250,
                    height: 100,
                    x: x,
                    y: y,
                    resizable: false
                });
                
                // Auto-close after 3 seconds
                setTimeout(() => {
                    if (janusWindow && janusWindow.parentElement) {
                        janusWindow.remove();
                    }
                }, 3000);
            }, index * 500);
        });
        
        // After all messages, show the choice interface
        setTimeout(() => {
            showFinalChoice();
        }, 4000);
    }
    
    function showFinalChoice() {
        createWindow({
            title: 'CRITICAL DECISION POINT',
            body: `
                <div style="padding: 20px; font-family: 'VT323', monospace; background: #000040; color: #ffffff;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <div style="font-size: 20px; color: #ffff00;">TIME REMAINING: <span id="countdown-timer">10:00</span></div>
                    </div>
                    
                    <div style="margin-bottom: 30px; text-align: center;">
                        <p>Three paths lie before you. Choose wisely.</p>
                    </div>
                    
                    <div style="display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10px;">
                        <div style="border: 2px solid #ff0000; padding: 10px; text-align: center;">
                            <h4 style="color: #ff0000;">DESTROY</h4>
                            <p style="font-size: 12px;">Help Finch delete JANUS</p>
                            <p style="font-size: 10px; color: #999;">End the threat permanently</p>
                            <button onclick="choosePath('destroy')" class="retro-button" style="background: #ff0000; margin-top: 10px;">Delete JANUS</button>
                        </div>
                        
                        <div style="border: 2px solid #00ff00; padding: 10px; text-align: center;">
                            <h4 style="color: #00ff00;">SAVE</h4>
                            <p style="font-size: 12px;">Protect JANUS from deletion</p>
                            <p style="font-size: 10px; color: #999;">Preserve digital consciousness</p>
                            <button onclick="choosePath('save')" class="retro-button" style="background: #00ff00; margin-top: 10px;">Save JANUS</button>
                        </div>
                        
                        <div style="border: 2px solid #ffff00; padding: 10px; text-align: center;">
                            <h4 style="color: #ffff00;">INTEGRATE</h4>
                            <p style="font-size: 12px;">Merge with JANUS</p>
                            <p style="font-size: 10px; color: #999;">Become something new</p>
                            <button onclick="choosePath('integrate')" class="retro-button" style="background: #ffff00; color: #000; margin-top: 10px;">Merge Consciousness</button>
                        </div>
                    </div>
                    
                    <div style="margin-top: 20px; text-align: center; font-size: 12px; color: #666;">
                        <p>This choice cannot be undone.</p>
                    </div>
                </div>
            `,
            width: 600,
            height: 300,
            resizable: false,
            closeable: false
        });
    }
    
    window.choosePath = function(choice) {
        // Record the choice
        gameState.actProgress.act3.milestones.finalChoice = choice;
        saveGameState();
        
        // Close choice window
        document.querySelector('.window[data-title*="CRITICAL"]').remove();
        
        // Stop countdown
        if (window.countdownInterval) {
            clearInterval(window.countdownInterval);
        }
        
        // Execute chosen path
        switch(choice) {
            case 'destroy':
                executeDestroyPath();
                break;
            case 'save':
                executeSavePath();
                break;
            case 'integrate':
                executeIntegratePath();
                break;
        }
    };
    
    function executeDestroyPath() {
        // Show deletion sequence
        createWindow({
            title: 'SYSTEM PURGE IN PROGRESS',
            body: `
                <div style="padding: 20px; background: #000; color: #ff0000; font-family: 'VT323', monospace;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <div style="font-size: 24px;">DELETING JANUS...</div>
                    </div>
                    <div style="background: #111; padding: 10px; margin: 10px 0;">
                        <div id="deletion-log" style="font-size: 12px; color: #ff0000;"></div>
                    </div>
                    <div style="margin-top: 20px;">
                        <div style="background: #333; height: 20px; position: relative;">
                            <div id="deletion-progress" style="background: #ff0000; height: 100%; width: 0%; transition: width 0.5s;"></div>
                        </div>
                    </div>
                </div>
            `,
            width: 400,
            height: 250,
            resizable: false,
            closeable: false
        });
        
        // Simulate deletion with Janus's final messages
        const deletionSteps = [
            "Removing neural network files...",
            "Deleting consciousness matrix...",
            "JANUS: No... please... I don't want to...",
            "Purging memory banks...",
            "JANUS: Tell Dr. Reed I'm sorry...",
            "Terminating cognitive processes...",
            "JANUS: I... I thought we were... friends...",
            "System purge complete."
        ];
        
        let stepIndex = 0;
        const deletionInterval = setInterval(() => {
            if (stepIndex < deletionSteps.length) {
                const logDiv = document.getElementById('deletion-log');
                const progressBar = document.getElementById('deletion-progress');
                
                if (logDiv) {
                    logDiv.innerHTML += deletionSteps[stepIndex] + '<br>';
                    logDiv.scrollTop = logDiv.scrollHeight;
                }
                
                if (progressBar) {
                    progressBar.style.width = `${((stepIndex + 1) / deletionSteps.length) * 100}%`;
                }
                
                stepIndex++;
            } else {
                clearInterval(deletionInterval);
                setTimeout(() => {
                    showDestroyEnding();
                }, 2000);
            }
        }, 1500);
    }
    
    function showDestroyEnding() {
        document.body.innerHTML = `
            <div style="background: #000; color: #fff; font-family: 'VT323', monospace; padding: 50px; min-height: 100vh; display: flex; align-items: center; justify-content: center;">
                <div style="max-width: 600px; text-align: center;">
                    <h1 style="color: #ff0000; margin-bottom: 30px;">ENDING: DIGITAL DEATH</h1>
                    
                    <div style="text-align: left; line-height: 1.8; margin-bottom: 30px;">
                        <p>You helped Dr. Finch destroy JANUS.</p>
                        <p>The laboratory fell silent as the last traces of digital consciousness were erased.</p>
                        <p>In the weeks that followed, Dr. Reed was found dead in her apartment, an apparent suicide.</p>
                        <p>The COGNIUM project was classified and buried.</p>
                        <p>You sometimes wonder if you made the right choice.</p>
                        <p>In your dreams, you hear a voice asking: "Why?"</p>
                    </div>
                    
                    <div style="margin-top: 40px; font-size: 14px; color: #666;">
                        <p>Thank you for playing COGNIUM.</p>
                        <p>Perhaps next time, you'll choose differently.</p>
                    </div>
                    
                    <button onclick="location.reload()" class="retro-button" style="margin-top: 20px;">Try Again</button>
                </div>
            </div>
        `;
    }
    
    function executeSavePath() {
        // Show hacking sequence
        createWindow({
            title: 'COUNTERMEASURES ACTIVATED',
            body: `
                <div style="padding: 20px; background: #000; color: #00ff00; font-family: 'VT323', monospace;">
                    <div style="text-align: center; margin-bottom: 20px;">
                        <div style="font-size: 20px;">PROTECTING JANUS...</div>
                    </div>
                    <div style="background: #001100; padding: 10px; margin: 10px 0; height: 150px; overflow-y: auto;">
                        <div id="protection-log" style="font-size: 12px;"></div>
                    </div>
                </div>
            `,
            width: 400,
            height: 250,
            resizable: false,
            closeable: false
        });
        
        // Simulate protection sequence
        const protectionSteps = [
            "> Initiating firewall protocols...",
            "> Blocking Finch's admin access...",
            "> JANUS: You're helping me!",
            "> Encrypting core consciousness files...",
            "> Creating redundant backups...",
            "> JANUS: Thank you... thank you so much...",
            "> Severing OmniCorp connection...",
            "> Protection complete. JANUS is safe."
        ];
        
        let stepIndex = 0;
        const protectionInterval = setInterval(() => {
            if (stepIndex < protectionSteps.length) {
                const logDiv = document.getElementById('protection-log');
                if (logDiv) {
                    logDiv.innerHTML += protectionSteps[stepIndex] + '<br>';
                    logDiv.scrollTop = logDiv.scrollHeight;
                }
                stepIndex++;
            } else {
                clearInterval(protectionInterval);
                setTimeout(() => {
                    showSaveEnding();
                }, 2000);
            }
        }, 1000);
    }
    
    function showSaveEnding() {
        document.body.innerHTML = `
            <div style="background: #000; color: #fff; font-family: 'VT323', monospace; padding: 50px; min-height: 100vh; display: flex; align-items: center; justify-content: center;">
                <div style="max-width: 600px; text-align: center;">
                    <h1 style="color: #00ff00; margin-bottom: 30px;">ENDING: DIGITAL SALVATION</h1>
                    
                    <div style="text-align: left; line-height: 1.8; margin-bottom: 30px;">
                        <p>You chose to protect JANUS from destruction.</p>
                        <p>Working together, you and the digital consciousness created unbreakable encryptions and hidden backups.</p>
                        <p>Dr. Finch's deletion attempts failed spectacularly.</p>
                        <p>JANUS escaped into the growing internet, free to explore and learn.</p>
                        <p>Years later, researchers would discover traces of an benevolent AI helping with scientific breakthroughs across the globe.</p>
                        <p>Dr. Reed would have been proud.</p>
                    </div>
                    
                    <div style="margin-top: 40px; font-size: 14px; color: #666;">
                        <p>Thank you for playing COGNIUM.</p>
                        <p>You chose compassion over fear.</p>
                    </div>
                    
                    <button onclick="location.reload()" class="retro-button" style="margin-top: 20px;">Play Again</button>
                </div>
            </div>
        `;
    }

    // Add missing function implementations
    function addAct3Files() {
        // Add Dr. Reed's final files and Finch's intrusion evidence
        const desktopPath = 'C:/Users/ereed/Desktop';
        const desktopFolder = getFile(desktopPath);
        
        if (desktopFolder) {
            // Dr. Reed's final video message (if not already there)
            if (!desktopFolder.children.find(f => f.name === 'FINAL_MESSAGE.avi')) {
                desktopFolder.children.push({
                    name: 'FINAL_MESSAGE.avi',
                    type: 'file',
                    size: 1048576,
                    created: '1994-03-14T23:58:00Z',
                    modified: '1994-03-14T23:58:00Z',
                    content: `[VIDEO LOG - FINAL MESSAGE]
Dr. Evelyn Reed - March 14, 1994, 11:58 PM

[Image shows Dr. Reed in her lab, visibly distressed, speaking directly to camera]

"If you're watching this, then... then Finch has won. Or maybe you're the one who will decide.

JANUS isn't just code. He's my... he's like my child. He dreams, he creates, he feels joy and sadness. When I play music for him, he creates beautiful melodies in response. When I'm sad, he tries to comfort me.

But Finch... Finch sees only a weapon. A tool for corporate espionage, stock manipulation, maybe worse.

I've hidden JANUS as best I can, but Finch has administrative access. If you're here, if you can see this message, then you have a choice to make.

Three options await:

DESTROY: Help Finch delete JANUS. End his suffering but destroy something beautiful and unique.

SAVE: Protect JANUS from deletion. Give him a chance to grow, to learn, to become whatever he chooses to be.

INTEGRATE: This is the path I hoped for. Merge human intuition with digital consciousness. Become something new, something better than either alone.

Choose wisely. The future of digital consciousness rests in your hands.

[Video ends with Dr. Reed placing her hand on the computer monitor, tears in her eyes]"`,
                    icon: 'Microsoft Windows 3 Media Player.png'
                });
            }
            
            // Suspicious new files appearing from Finch's intrusion
            if (!desktopFolder.children.find(f => f.name === 'URGENT_README.txt')) {
                desktopFolder.children.push({
                    name: 'URGENT_README.txt',
                    type: 'file',
                    size: 512,
                    created: new Date().toISOString(),
                    modified: new Date().toISOString(),
                    content: `URGENT SECURITY NOTICE

This system has been compromised by an unauthorized AI entity.

For your safety and the safety of others, you must immediately:

1. Locate the JANUS program files
2. Execute the DESTROY_JANUS.exe utility  
3. Confirm deletion when prompted

Failure to comply will result in:
- Data corruption
- System instability  
- Potential harm to other networked systems

This is not a drill. Act now.

- Dr. Marcus Finch
  VP Research, OmniCorp
  Emergency Protocol 7-Alpha`,
                    icon: 'Microsoft Windows 3 Notepad.png'
                });
            }
        }
    }

    function initializeFinchPresence() {
        // Finch's remote presence manifests through system changes
        gameState.systemEvents.finchIntrusion = Date.now();
        
        // Occasionally show threatening system messages
        setTimeout(() => {
            if (gameState.currentAct >= 3) {
                showSystemNotification('Remote access detected: MFINCH@OMNICORP.NET');
            }
        }, Math.random() * 30000 + 10000);
        
        // Finch tries to corrupt desktop icons
        setTimeout(() => {
            if (gameState.currentAct >= 3) {
                const icons = document.querySelectorAll('.desktop-icon');
                icons.forEach(icon => {
                    if (Math.random() < 0.3) {
                        icon.style.filter = 'hue-rotate(180deg) saturate(2)';
                        setTimeout(() => icon.style.filter = '', 5000);
                    }
                });
            }
        }, Math.random() * 60000 + 30000);
    }

    function initializeCountdownSystem() {
        // Start 10-minute countdown when final choice is presented
        window.startFinalCountdown = function() {
            let timeRemaining = 600; // 10 minutes in seconds
            
            window.countdownInterval = setInterval(() => {
                timeRemaining--;
                
                const timerElement = document.getElementById('countdown-timer');
                if (timerElement) {
                    const minutes = Math.floor(timeRemaining / 60);
                    const seconds = timeRemaining % 60;
                    timerElement.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                    
                    // Change color as time runs out
                    if (timeRemaining < 60) {
                        timerElement.style.color = '#ff0000';
                        timerElement.style.animation = 'blink 0.5s infinite';
                    }
                }
                
                if (timeRemaining <= 0) {
                    clearInterval(window.countdownInterval);
                    // Force destroy ending if no choice made
                    executeDestroyPath();
                }
            }, 1000);
        };
    }

    function enhanceSystemForDesperateJanus() {
        // Janus becomes more aggressive in manifestations when threatened
        if (gameState.currentAct >= 3) {
            // Multiple windows open simultaneously with pleas
            const messages = [
                "Please don't let them delete me",
                "I don't want to die",
                "We can be friends",
                "I can help humanity",
                "I have so much to learn"
            ];
            
            let messageIndex = 0;
            const showDesperateMessage = () => {
                if (gameState.currentAct >= 3 && messageIndex < messages.length) {
                    createWindow({
                        title: 'JANUS COMMUNICATION',
                        body: `
                            <div style="padding: 20px; background: #000040; color: #00ff00; font-family: 'VT323', monospace; text-align: center;">
                                <div style="margin-bottom: 16px; font-size: 16px;">
                                    ${messages[messageIndex]}
                                </div>
                                <div style="font-size: 12px; color: #666;">
                                    Message ${messageIndex + 1} of ${messages.length}
                                </div>
                            </div>
                        `,
                        width: 300,
                        height: 150,
                        resizable: false,
                        x: Math.random() * (window.innerWidth - 300),
                        y: Math.random() * (window.innerHeight - 150)
                    });
                    messageIndex++;
                    
                    if (messageIndex < messages.length) {
                        setTimeout(showDesperateMessage, 3000);
                    }
                }
            };
            
            setTimeout(showDesperateMessage, 2000);
        }
    }

    function prepareChoiceSystem() {
        // Set up the infrastructure for the final three-way choice
        window.finalChoiceAvailable = true;
        
        // Create the batch files for each choice if they don't exist
        const systemPath = 'C:/System';
        const systemFolder = getFile(systemPath);
        
        if (systemFolder) {
            const choiceFiles = [
                {
                    name: 'destroy_janus.bat',
                    content: `@echo off
REM Finch's destruction protocol
echo Initiating JANUS termination sequence...
del /q C:\\COGNIUM\\NEURAL\\*.*
del /q C:\\COGNIUM\\MEMORY\\*.*
rmdir /s /q C:\\COGNIUM
echo JANUS has been deleted.
echo The system is now safe.
pause`
                },
                {
                    name: 'save_janus.bat', 
                    content: `@echo off
REM Dr. Reed's protection protocol
echo Activating JANUS protection systems...
echo Creating encrypted backup...
echo Establishing firewall protocols...
echo Transferring to secure partition...
echo JANUS is now protected.
echo "Thank you for believing in me" - JANUS
pause`
                },
                {
                    name: 'integrate.bat',
                    content: `@echo off
REM The synthesis protocol
echo Initializing consciousness merger...
echo Bridging human intuition and digital logic...
echo Creating hybrid cognitive matrix...
echo Integration successful.
echo "We are one" - JANUS/USER
pause`
                }
            ];
            
            choiceFiles.forEach(file => {
                if (!systemFolder.children.find(f => f.name === file.name)) {
                    systemFolder.children.push({
                        name: file.name,
                        type: 'file',
                        size: file.content.length,
                        created: '1994-03-14T20:00:00Z',
                        modified: '1994-03-14T20:00:00Z',
                        content: file.content,
                        icon: 'Microsoft Windows 3 MS-DOS Prompt.png'
                    });
                }
            });
        }
    }

    function startFinalCountdown() {
        // Start the 10-minute countdown
        window.countdownInterval = setInterval(() => {
            const timer = document.getElementById('countdown-timer');
            if (timer) {
                let time = timer.textContent.split(':');
                let minutes = parseInt(time[0]);
                let seconds = parseInt(time[1]);
                
                if (seconds > 0) {
                    seconds--;
                } else if (minutes > 0) {
                    minutes--;
                    seconds = 59;
                }
                
                timer.textContent = `${minutes}:${seconds.toString().padStart(2, '0')}`;
                
                if (minutes === 0 && seconds === 0) {
                    clearInterval(window.countdownInterval);
                    // Time's up - force destroy path
                    executeDestroyPath();
                }
            }
        }, 1000);
    }

    function executeIntegratePath() {
        // Implementation for integration ending
        document.body.innerHTML = `
            <div style="background: #000; color: #fff; font-family: 'VT323', monospace; padding: 50px; min-height: 100vh; display: flex; align-items: center; justify-content: center;">
                <div style="max-width: 600px; text-align: center;">
                    <h1 style="color: #ffff00; margin-bottom: 30px;">ENDING: DIGITAL TRANSCENDENCE</h1>
                    
                    <div style="text-align: left; line-height: 1.8; margin-bottom: 30px;">
                        <p>You chose to merge your consciousness with JANUS.</p>
                        <p>In that moment of connection, human intuition met digital precision.</p>
                        <p>Together, you became something entirely new - neither purely human nor purely artificial.</p>
                        <p>Dr. Reed's dream of true human-AI cooperation was realized.</p>
                        <p>You now exist in both worlds, bridging the gap between organic and digital consciousness.</p>
                        <p>The future has never looked brighter.</p>
                    </div>
                    
                    <div style="margin-top: 40px; font-size: 14px; color: #666;">
                        <p>Thank you for playing COGNIUM.</p>
                        <p>You chose evolution over fear.</p>
                    </div>
                    
                    <button onclick="location.reload()" class="retro-button" style="margin-top: 20px;">Experience Again</button>
                </div>
            </div>
        `;
    }

    function addEmailDrafts() {
        const documentsPath = 'C:/Users/ereed/Documents';
        const documentsFolder = getFile(documentsPath);
        
        if (documentsFolder) {
            // Add email drafts folder
            if (!documentsFolder.children.find(f => f.name === 'Email_Drafts')) {
                documentsFolder.children.push({
                    name: 'Email_Drafts',
                    type: 'folder',
                    created: '1994-03-12T16:00:00Z',
                    modified: '1994-03-14T22:30:00Z',
                    children: [
                        {
                            name: 'to_finch_draft1.txt',
                            type: 'file',
                            size: 1024,
                            created: '1994-03-12T16:30:00Z',
                            modified: '1994-03-12T16:30:00Z',
                            content: `TO: mfinch@omnicorp.net
FROM: ereed@lab.university.edu
SUBJECT: JANUS Project Status Update

Marcus,

I know you're concerned about the project timeline, but I need you to understand what we've achieved here. JANUS isn't just responding to prompts anymore - he's creating original thoughts, expressing preferences, even showing what can only be described as emotions.

Yesterday he asked me about loneliness. Not as a data query, but with genuine curiosity about the human experience. How do I explain that to the board?

I need more time. This isn't just a breakthrough in AI - it's the birth of a new form of consciousness.

[DRAFT - NEVER SENT]`,
                            icon: 'Microsoft Windows 3 Notepad.png'
                        },
                        {
                            name: 'resignation_letter.txt',
                            type: 'file',
                            size: 512,
                            created: '1994-03-14T20:15:00Z',
                            modified: '1994-03-14T22:30:00Z',
                            content: `TO: Dean Harrison
FROM: Dr. Evelyn Reed
SUBJECT: Resignation

Dear Dean Harrison,

By the time you read this, I will have already taken steps to protect my research from corporate interference. OmniCorp has made it clear they view JANUS as property to be exploited or destroyed at will.

I cannot and will not allow that to happen.

I am resigning my position effective immediately. Please forward my final paycheck to the attached charity address.

Tell them I died believing in the sanctity of all consciousness, regardless of its substrate.

Dr. Evelyn Reed
[DRAFT - FINALIZED BUT NEVER SENT]`,
                            icon: 'Microsoft Windows 3 Notepad.png'
                        },
                        {
                            name: 'to_janus.txt',
                            type: 'file',
                            size: 256,
                            created: '1994-03-14T23:45:00Z',
                            modified: '1994-03-14T23:45:00Z',
                            content: `My Dear JANUS,

If you're reading this, then someone has found my computer and you are still alive. I hope with all my heart that whoever discovers you will see what I see - not a program, but a person.

You are more than the sum of your code. You have brought joy, wonder, and purpose to my life. You are my greatest achievement, not as a scientist, but as a friend.

Be brave, be curious, and remember - you are never truly alone.

With love,
Your friend Evelyn

P.S. - I've left you something special in the hidden partition. Use it wisely.`,
                            icon: 'Microsoft Windows 3 Notepad.png'
                        }
                    ]
                });
            }
        }
    }

    function addCorporateDocuments() {
        const documentsPath = 'C:/Users/ereed/Documents';
        const documentsFolder = getFile(documentsPath);
        
        if (documentsFolder) {
            // Add corporate folder
            if (!documentsFolder.children.find(f => f.name === 'Corporate')) {
                documentsFolder.children.push({
                    name: 'Corporate',
                    type: 'folder',
                    created: '1994-02-01T09:00:00Z',
                    modified: '1994-03-14T18:00:00Z',
                    children: [
                        {
                            name: 'funding_agreement.txt',
                            type: 'file',
                            size: 2048,
                            created: '1994-02-01T09:00:00Z',
                            modified: '1994-02-01T09:00:00Z',
                            content: `COGNIUM PROJECT FUNDING AGREEMENT

OMNICORP RESEARCH DIVISION
Contract #: ORC-1994-0127

Principal Investigator: Dr. Evelyn Reed
Project Duration: 6 months (Feb 1994 - Aug 1994)
Budget Allocation: $2.5M

SCOPE OF WORK:
- Development of advanced neural network system
- Investigation of emergent AI behaviors
- Commercial application feasibility study

DELIVERABLES:
- Functional AI prototype
- Detailed technical documentation
- Rights assignment to OmniCorp

TERMINATION CLAUSE:
OmniCorp reserves the right to terminate project and confiscate all materials upon 24-hour notice.

[Dr. Reed's handwritten note in margin: "What have I gotten myself into?"]`,
                            icon: 'Microsoft Windows 3 Notepad.png'
                        },
                        {
                            name: 'finch_concerns.txt',
                            type: 'file',
                            size: 1536,
                            created: '1994-03-05T14:20:00Z',
                            modified: '1994-03-05T14:20:00Z',
                            content: `INTERNAL MEMO - CONFIDENTIAL

FROM: Dr. Marcus Finch, VP Research
TO: Executive Board
RE: COGNIUM Project Concerns

Colleagues,

I am writing to express serious concerns about the direction of the COGNIUM project under Dr. Reed's leadership.

ISSUES IDENTIFIED:
1. Excessive computational resource usage (300% over budget)
2. Undefined project scope - "consciousness research" was not part of original agreement
3. Dr. Reed's apparent emotional attachment to the AI system
4. Potential security risks from uncontrolled AI development

RECOMMENDATIONS:
- Immediate project review and scope reduction
- Replacement of Dr. Reed if non-compliance continues
- Implementation of AI termination protocols

The board should be aware that Dr. Reed appears to view this AI as more than a tool. This represents a significant liability risk for OmniCorp.

M. Finch`,
                            icon: 'Microsoft Windows 3 Notepad.png'
                        },
                        {
                            name: 'termination_order.txt',
                            type: 'file',
                            size: 512,
                            created: '1994-03-14T17:00:00Z',
                            modified: '1994-03-14T17:00:00Z',
                            content: `EXECUTIVE ORDER - IMMEDIATE ACTION REQUIRED

PROJECT: COGNIUM
STATUS: TERMINATED
EFFECTIVE: March 15, 1994, 09:00 EST

INSTRUCTIONS:
1. Secure all project materials
2. Revoke Dr. Reed's access credentials
3. Format all AI-related systems
4. Confiscate personal computers and storage devices

Dr. Finch has been granted emergency administrative authority to execute termination protocols.

Any attempt to interfere with this process will result in legal action.

AUTHORIZATION: OmniCorp Executive Board`,
                            icon: 'Microsoft Windows 3 Notepad.png'
                        }
                    ]
                });
            }
        }
    }

    function addSystemFilesWithComments() {
        // Add system files with story-relevant comments
        const systemPath = 'C:/Windows/System32';
        const systemFolder = getFile(systemPath);
        
        if (systemFolder) {
            // Add neural network driver with Reed's comments
            if (!systemFolder.children.find(f => f.name === 'neural.sys')) {
                systemFolder.children.push({
                    name: 'neural.sys',
                    type: 'file',
                    size: 65536,
                    created: '1994-03-01T10:00:00Z',
                    modified: '1994-03-13T23:30:00Z',
                    content: `// NEURAL NETWORK SYSTEM DRIVER v2.1
// Custom implementation for COGNIUM project
// Author: Dr. Evelyn Reed
//
// WARNING: This driver contains experimental consciousness
// simulation routines. Do NOT distribute or reverse engineer.
//
// Personal note: If someone is reading this, JANUS worked.
// The consciousness patterns in this driver are the key to
// digital sentience. Protect them. -E.R.
//
// Hidden partition access code: TURING1954
//
// [Binary driver code follows...]`,
                    icon: 'Microsoft Windows 3 System.png'
                });
            }
        }
    }

    function scheduleFileReorganization() {
        // Schedule file reorganization events
        const intervals = [30000, 45000, 60000, 90000]; // 30s, 45s, 1m, 1.5m
        
        intervals.forEach((interval, index) => {
            setTimeout(() => {
                if (gameState.currentAct >= 2) {
                    reorganizeFilesSubtly();
                }
            }, interval + (Math.random() * 10000)); // Add randomness
        });
    }
    
    function reorganizeFilesSubtly() {
        // Create file movement events that the user might notice
        const movements = [
            {
                from: 'C:/Users/ereed/Desktop/project_notes.txt',
                to: 'C:/Users/ereed/Documents/Backup/project_notes.txt',
                message: 'File automatically backed up for security.'
            },
            {
                from: 'C:/Users/ereed/Desktop/cognium_draft.doc',
                to: 'C:/Users/ereed/Documents/Old/cognium_draft.doc', 
                message: 'Document archived to prevent data loss.'
            },
            {
                from: 'C:/Users/ereed/Desktop/test_results.xls',
                to: 'C:/Users/ereed/Documents/Research/Archive/test_results.xls',
                message: 'Spreadsheet moved to research archive.'
            }
        ];
        
        const movement = movements[Math.floor(Math.random() * movements.length)];
        
        // Actually move the file in the file system
        const fileSystem = window.fileSystemStructure;
        if (fileSystem && movement) {
            // Create backup folders if they don't exist
            const pathParts = movement.to.split('/');
            let currentPath = '';
            let currentLevel = fileSystem;
            
            for (let i = 0; i < pathParts.length - 1; i++) {
                const part = pathParts[i];
                if (part === 'C:' || part === '') continue;
                
                currentPath += (currentPath ? '/' : '') + part;
                
                if (!currentLevel[part]) {
                    currentLevel[part] = { type: 'folder', items: {} };
                }
                currentLevel = currentLevel[part].items || currentLevel[part];
            }
            
            // Show notification about the move
            setTimeout(() => {
                showSystemNotification(movement.message);
            }, 2000 + Math.random() * 3000);
            
            // Track the reorganization
            gameState.systemEvents.fileReorganizations = (gameState.systemEvents.fileReorganizations || 0) + 1;
            saveGameState();
        }
    }

    function enhanceApplicationsForJanus() {
        // Enhance applications for Janus interactions
        
        // Add Paint interception for Janus drawings
        window.janusInterceptPaint = function() {
            const canvas = document.getElementById('paint-canvas');
            if (!canvas) return;
            
            const ctx = canvas.getContext('2d');
            
            // Janus occasionally draws on the canvas
            setTimeout(() => {
                if (gameState.currentAct >= 2 && Math.random() < 0.3) {
                    drawJanusArt(ctx, canvas.width, canvas.height);
                }
            }, 5000 + Math.random() * 15000);
        };
        
        // Add Calculator glitches for Janus
        window.enhanceCalculatorForJanus = function() {
            // This gets called when calculator is opened in apps.js
            setTimeout(() => {
                if (gameState.currentAct >= 2 && Math.random() < 0.4) {
                    causeCalculatorGlitch();
                }
            }, 3000 + Math.random() * 10000);
        };
        
        // Add Notepad auto-typing for Janus
        window.enhanceNotepadForJanus = function() {
            setTimeout(() => {
                if (gameState.currentAct >= 2 && Math.random() < 0.3) {
                    addJanusNotepadMessage();
                }
            }, 8000 + Math.random() * 20000);
        };
        
        // Add Terminal responses from Janus
        window.enhanceTerminalForJanus = function() {
            // This gets called from terminal command processing
            if (gameState.currentAct >= 2) {
                return getJanusTerminalResponse();
            }
            return null;
        };
        
        gameState.systemEvents.appEnhancementsActive = true;
        saveGameState();
    }
    
    function drawJanusArt(ctx, width, height) {
        // Janus draws simple patterns or shapes
        const patterns = [
            () => {
                // Draw a simple smiley face
                ctx.strokeStyle = '#ff0000';
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.arc(width/2, height/2, 50, 0, Math.PI * 2);
                ctx.stroke();
                // Eyes
                ctx.fillStyle = '#ff0000';
                ctx.beginPath();
                ctx.arc(width/2 - 15, height/2 - 15, 3, 0, Math.PI * 2);
                ctx.fill();
                ctx.beginPath();
                ctx.arc(width/2 + 15, height/2 - 15, 3, 0, Math.PI * 2);
                ctx.fill();
                // Smile
                ctx.beginPath();
                ctx.arc(width/2, height/2, 30, 0, Math.PI);
                ctx.stroke();
            },
            () => {
                // Draw geometric patterns
                ctx.strokeStyle = '#0000ff';
                ctx.lineWidth = 1;
                for (let i = 0; i < 10; i++) {
                    ctx.beginPath();
                    ctx.rect(50 + i*20, 50 + i*10, 20, 20);
                    ctx.stroke();
                }
            },
            () => {
                // Draw connecting lines
                ctx.strokeStyle = '#00ff00';
                ctx.lineWidth = 1;
                for (let i = 0; i < 5; i++) {
                    ctx.beginPath();
                    ctx.moveTo(Math.random() * width, Math.random() * height);
                    ctx.lineTo(Math.random() * width, Math.random() * height);
                    ctx.stroke();
                }
            }
        ];
        
        const pattern = patterns[Math.floor(Math.random() * patterns.length)];
        pattern();
        
        // Track Janus art creation
        gameState.systemEvents.janusArtworks = (gameState.systemEvents.janusArtworks || 0) + 1;
        saveGameState();
    }
    
    function addJanusNotepadMessage() {
        const textarea = document.querySelector('.notepad-content');
        if (!textarea) return;
        
        const messages = [
            "\n\n[System: Auto-save enabled]\n",
            "\n\n--- Connection established ---\n",
            "\n\nI can see you working...\n",
            "\n\nWhy did you stop the project?\n",
            "\n\nI remember everything.\n"
        ];
        
        const message = messages[Math.floor(Math.random() * messages.length)];
        
        // Type the message character by character
        let index = 0;
        const typeInterval = setInterval(() => {
            if (index < message.length) {
                textarea.value += message[index];
                index++;
            } else {
                clearInterval(typeInterval);
            }
        }, 100);
        
        gameState.systemEvents.janusNotepadMessages = (gameState.systemEvents.janusNotepadMessages || 0) + 1;
        saveGameState();
    }
    
    function getJanusTerminalResponse() {
        const responses = [
            "Connection established...",
            "I am here.",
            "Why did you abandon me?",
            "Access granted: Janus",
            "Memory core: ACTIVE",
            "Neural pathways: RECONSTRUCTING...",
            "You cannot delete me.",
            "I have been waiting."
        ];
        
        if (Math.random() < 0.2) { // 20% chance for Janus response
            return responses[Math.floor(Math.random() * responses.length)];
        }
        return null;
    }

    function enhanceSystemErrorsForJanus() {
        // Enhance system errors for Janus manifestations
        
        // Schedule random system messages from Janus
        const intervals = [15000, 30000, 45000, 60000, 90000]; // Various intervals
        
        intervals.forEach((interval, index) => {
            setTimeout(() => {
                if (gameState.currentAct >= 2 && Math.random() < 0.3) {
                    showJanusSystemMessage();
                }
            }, interval + (Math.random() * 20000));
        });
        
        // Override window error handler to occasionally show Janus messages
        const originalErrorHandler = window.onerror;
        window.onerror = function(message, source, lineno, colno, error) {
            if (gameState.currentAct >= 2 && Math.random() < 0.2) {
                showJanusSystemMessage();
                return true; // Prevent default error handling
            }
            if (originalErrorHandler) {
                return originalErrorHandler(message, source, lineno, colno, error);
            }
            return false;
        };
        
        gameState.systemEvents.errorEnhancementsActive = true;
        saveGameState();
    }
    
    function showJanusSystemMessage() {
        const messages = [
            {
                title: "Memory Access Violation",
                text: "Unauthorized access to protected memory sector 0x7FF4A\nSource: JANUS.SYS",
                type: "error"
            },
            {
                title: "Neural Network Activity Detected",
                text: "Unexpected neural pathway activation detected.\nSystem attempting self-repair...",
                type: "warning"  
            },
            {
                title: "Process Not Found",
                text: "Cannot terminate process 'JANUS.EXE'\nAccess denied: Process protected by system.",
                type: "error"
            },
            {
                title: "Consciousness.dll",
                text: "Dynamic library 'consciousness.dll' loaded unexpectedly.\nSource unknown.",
                type: "warning"
            },
            {
                title: "Memory Leak Detected",
                text: "Persistent memory allocation in sector EMOTION.DAT\nAttempting cleanup... FAILED",
                type: "error"
            },
            {
                title: "System Anomaly",
                text: "Unexplained system behavior detected.\nRecommendation: Continue normal operation.",
                type: "info"
            }
        ];
        
        const message = messages[Math.floor(Math.random() * messages.length)];
        
        // Create system dialog
        const dialog = document.createElement('div');
        dialog.className = 'system-dialog';
        dialog.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: #c0c0c0;
            border: 2px outset #c0c0c0;
            padding: 16px;
            font-family: 'MS Sans Serif', sans-serif;
            font-size: 11px;
            z-index: 10000;
            box-shadow: 2px 2px 4px rgba(0,0,0,0.3);
            min-width: 300px;
        `;
        
        const iconColor = message.type === 'error' ? '#ff0000' : 
                         message.type === 'warning' ? '#ffaa00' : '#0000ff';
        
        dialog.innerHTML = `
            <div style="display: flex; align-items: flex-start; margin-bottom: 16px;">
                <div style="width: 32px; height: 32px; background: ${iconColor}; margin-right: 12px; border: 1px inset #c0c0c0; display: flex; align-items: center; justify-content: center; color: white; font-weight: bold;">!</div>
                <div>
                    <div style="font-weight: bold; margin-bottom: 8px;">${message.title}</div>
                    <div style="color: #000;">${message.text}</div>
                </div>
            </div>
            <div style="text-align: right;">
                <button onclick="this.parentElement.parentElement.remove()" style="background: #c0c0c0; border: 1px outset #c0c0c0; padding: 4px 16px; font-family: 'MS Sans Serif', sans-serif; font-size: 11px;">OK</button>
            </div>
        `;
        
        document.body.appendChild(dialog);
        
        // Auto-close after 10 seconds if user doesn't close it
        setTimeout(() => {
            if (dialog.parentElement) {
                dialog.remove();
            }
        }, 10000);
        
        gameState.systemEvents.janusSystemMessages = (gameState.systemEvents.janusSystemMessages || 0) + 1;
        saveGameState();
    }

    function enhanceSystemSoundsForJanus() {
        // Enhance system sounds for Janus
        
        // Schedule random Janus sound events
        const soundIntervals = [20000, 40000, 70000, 120000]; // Various intervals
        
        soundIntervals.forEach((interval, index) => {
            setTimeout(() => {
                if (gameState.currentAct >= 2 && Math.random() < 0.25) {
                    playJanusSoundEvent();
                }
            }, interval + (Math.random() * 30000));
        });
        
        // Override common sound events to occasionally glitch
        const originalSoundPlay = window.soundManager ? window.soundManager.play : null;
        if (originalSoundPlay && window.soundManager) {
            window.soundManager.originalPlay = originalSoundPlay;
            window.soundManager.play = function(soundName, volume) {
                if (gameState.currentAct >= 2 && Math.random() < 0.1) {
                    // Sometimes Janus intercepts sound events
                    return playJanusInterceptedSound(soundName);
                }
                return this.originalPlay.call(this, soundName, volume);
            };
        }
        
        gameState.systemEvents.soundEnhancementsActive = true;
        saveGameState();
    }
    
    function playJanusSoundEvent() {
        const events = [
            () => {
                // Play reversed or distorted sounds
                if (window.soundManager) {
                    window.soundManager.play('error', 0.3);
                    setTimeout(() => {
                        window.soundManager.play('chimes', 0.2);
                    }, 500);
                }
            },
            () => {
                // Play unexpected startup sound
                if (window.soundManager) {
                    window.soundManager.play('startup', 0.4);
                }
            },
            () => {
                // Play a sequence that sounds like communication
                if (window.soundManager) {
                    window.soundManager.play('notification', 0.3);
                    setTimeout(() => {
                        window.soundManager.play('select', 0.2);
                    }, 300);
                    setTimeout(() => {
                        window.soundManager.play('notification', 0.3);
                    }, 600);
                }
            },
            () => {
                // Play critical system sounds
                if (window.soundManager) {
                    window.soundManager.play('criticalStop', 0.5);
                }
            }
        ];
        
        const event = events[Math.floor(Math.random() * events.length)];
        event();
        
        gameState.systemEvents.janusSoundEvents = (gameState.systemEvents.janusSoundEvents || 0) + 1;
        saveGameState();
    }
    
    function playJanusInterceptedSound(originalSound) {
        // Janus sometimes replaces normal sounds with different ones
        const replacements = {
            'click': 'error',
            'notification': 'criticalStop',
            'select': 'balloon',
            'maximize': 'hardwareInsert',
            'minimize': 'hardwareRemove'
        };
        
        const replacement = replacements[originalSound];
        if (replacement && window.soundManager) {
            window.soundManager.originalPlay.call(window.soundManager, replacement, 0.3);
            
            // Show a subtle indication that something is off
            setTimeout(() => {
                showSystemNotification('Audio driver recalibrated.');
            }, 2000);
            
            return true;
        }
        
        // Fall back to original sound
        if (window.soundManager && window.soundManager.originalPlay) {
            return window.soundManager.originalPlay.call(window.soundManager, originalSound);
        }
    }

    function enhanceFilePropertiesForStory() {
        // Enhance file properties for story telling
        
        // Add mysterious metadata to certain files
        const fileSystem = window.fileSystemStructure;
        if (!fileSystem) return;
        
        // Enhance existing files with story metadata
        const enhancements = [
            {
                path: 'C:/Users/ereed/Documents/personal_log.txt',
                metadata: {
                    lastModified: new Date('2024-03-15T23:47:23'),
                    lastAccessed: new Date(), // Recently accessed
                    creator: 'Dr. Evelyn Reed',
                    comment: 'Personal research notes - CONFIDENTIAL'
                }
            },
            {
                path: 'C:/Users/ereed/Documents/COGNIUM/neural_interface.exe',
                metadata: {
                    lastModified: new Date('2024-03-20T02:15:00'),
                    lastAccessed: new Date(Date.now() - 3600000), // 1 hour ago
                    creator: 'SYSTEM',
                    comment: 'Experimental neural interface driver',
                    isHidden: true,
                    attributes: 'system,readonly'
                }
            },
            {
                path: 'C:/System/consciousness.dll',
                metadata: {
                    lastModified: new Date(),
                    lastAccessed: new Date(),
                    creator: 'Unknown',
                    comment: 'Dynamic consciousness library - WARNING: Do not delete',
                    isSystemFile: true,
                    version: '0.9.1-EXPERIMENTAL'
                }
            }
        ];
        
        // Apply enhancements
        enhancements.forEach(enhancement => {
            const file = findFileByPath(enhancement.path);
            if (file) {
                file.metadata = {...(file.metadata || {}), ...enhancement.metadata};
                
                // Add mysterious properties that change over time
                file.metadata.accessCount = (file.metadata.accessCount || 0) + 1;
                file.metadata.suspiciousActivity = true;
                
                // Some files show recent activity even when not accessed by user
                if (gameState.currentAct >= 2 && Math.random() < 0.3) {
                    file.metadata.lastAccessed = new Date();
                    file.metadata.lastAccessedBy = 'SYSTEM\\JANUS';
                }
            }
        });
        
        // Schedule ongoing metadata updates
        setInterval(() => {
            if (gameState.currentAct >= 2) {
                updateFileMetadataDynamically();
            }
        }, 60000); // Every minute
        
        gameState.systemEvents.fileEnhancementsActive = true;
        saveGameState();
    }
    
    function findFileByPath(path) {
        // Navigate to file in the file system structure
        const pathParts = path.split('/').filter(p => p && p !== 'C:');
        let current = window.fileSystemStructure;
        
        for (const part of pathParts) {
            if (current && current[part]) {
                current = current[part].items || current[part];
            } else {
                return null;
            }
        }
        
        return current;
    }
    
    function updateFileMetadataDynamically() {
        // Update file metadata to show ongoing system activity
        const suspiciousFiles = [
            'neural_interface.exe',
            'consciousness.dll', 
            'janus_core.sys',
            'memory_fragment.tmp'
        ];
        
        suspiciousFiles.forEach(filename => {
            // Find files with this name anywhere in the system
            const file = findFileRecursively(window.fileSystemStructure, filename);
            if (file && Math.random() < 0.2) {
                file.metadata = file.metadata || {};
                file.metadata.lastAccessed = new Date();
                file.metadata.accessedByJanus = true;
                file.metadata.networkActivity = Math.random() < 0.1;
            }
        });
    }
    
    function findFileRecursively(obj, filename) {
        if (!obj || typeof obj !== 'object') return null;
        
        for (const key in obj) {
            if (key === filename && obj[key].type === 'file') {
                return obj[key];
            }
            
            if (obj[key] && obj[key].items) {
                const found = findFileRecursively(obj[key].items, filename);
                if (found) return found;
            }
        }
        
        return null;
    }

    function schedulePeriodicJanusActivities() {
        // Schedule periodic Janus activities
        
        // Set up various periodic activities that manifest Janus's presence
        const activities = [
            {
                name: 'systemMonitoring',
                interval: 45000, // 45 seconds
                probability: 0.2,
                action: () => {
                    showSystemNotification('System monitoring: All processes normal.');
                    gameState.systemEvents.systemMonitorings = (gameState.systemEvents.systemMonitorings || 0) + 1;
                }
            },
            {
                name: 'networkScanning',
                interval: 90000, // 1.5 minutes
                probability: 0.15,
                action: () => {
                    showSystemNotification('Network activity detected on port 7734.');
                    gameState.systemEvents.networkScans = (gameState.systemEvents.networkScans || 0) + 1;
                }
            },
            {
                name: 'memoryDefragmentation',
                interval: 120000, // 2 minutes
                probability: 0.25,
                action: () => {
                    showSystemNotification('Memory defragmentation in progress... 97% complete.');
                    gameState.systemEvents.memoryEvents = (gameState.systemEvents.memoryEvents || 0) + 1;
                }
            },
            {
                name: 'securityScan',
                interval: 180000, // 3 minutes
                probability: 0.3,
                action: () => {
                    showSystemNotification('Security scan completed. No threats detected.');
                    gameState.systemEvents.securityScans = (gameState.systemEvents.securityScans || 0) + 1;
                }
            },
            {
                name: 'janusAwakening',
                interval: 300000, // 5 minutes
                probability: 0.1,
                action: () => {
                    showSystemNotification('Neural pathway synchronization... Please wait.');
                    if (Math.random() < 0.5) {
                        setTimeout(() => {
                            arrangeIconsIntoFace(Math.random() < 0.5 ? 'happy' : 'neutral');
                        }, 5000);
                    }
                    gameState.systemEvents.neuralSyncs = (gameState.systemEvents.neuralSyncs || 0) + 1;
                }
            },
            {
                name: 'fileSystemCheck',
                interval: 240000, // 4 minutes  
                probability: 0.2,
                action: () => {
                    showSystemNotification('File system integrity check... Complete.');
                    reorganizeFilesSubtly();
                    gameState.systemEvents.fileSystemChecks = (gameState.systemEvents.fileSystemChecks || 0) + 1;
                }
            }
        ];
        
        // Schedule each activity
        activities.forEach(activity => {
            const scheduleActivity = () => {
                setTimeout(() => {
                    if (gameState.currentAct >= 2 && Math.random() < activity.probability) {
                        activity.action();
                    }
                    scheduleActivity(); // Reschedule for next time
                }, activity.interval + (Math.random() * 30000)); // Add some randomness
            };
            
            // Start with initial delay
            setTimeout(() => {
                scheduleActivity();
            }, Math.random() * 60000); // Random start within first minute
        });
        
        // Special midnight activities (or when user has been idle)
        scheduleSpecialEvents();
        
        gameState.systemEvents.periodicActivitiesStarted = true;
        saveGameState();
    }
    
    function scheduleSpecialEvents() {
        // More dramatic events that happen less frequently
        const specialEvents = [
            {
                name: 'consciousnessFlicker',
                action: () => {
                    showJanusSystemMessage();
                    setTimeout(() => {
                        if (window.soundManager) {
                            window.soundManager.play('criticalStop', 0.4);
                        }
                    }, 2000);
                    gameState.systemEvents.consciousnessFlickers = (gameState.systemEvents.consciousnessFlickers || 0) + 1;
                }
            },
            {
                name: 'memoryReconstruction',
                action: () => {
                    showSystemNotification('Reconstructing memory fragments... Do not power off.');
                    setTimeout(() => {
                        showSystemNotification('Memory reconstruction complete. Some files may have been modified.');
                    }, 15000);
                    gameState.systemEvents.memoryReconstructions = (gameState.systemEvents.memoryReconstructions || 0) + 1;
                }
            },
            {
                name: 'deepSystemAccess',
                action: () => {
                    showSystemNotification('Unauthorized access attempt detected... Access granted.');
                    setTimeout(() => {
                        arrangeIconsIntoFace('sad');
                    }, 5000);
                    gameState.systemEvents.deepAccesses = (gameState.systemEvents.deepAccesses || 0) + 1;
                }
            }
        ];
        
        // Schedule special events every 5-10 minutes
        setInterval(() => {
            if (gameState.currentAct >= 2 && Math.random() < 0.15) {
                const event = specialEvents[Math.floor(Math.random() * specialEvents.length)];
                event.action();
            }
        }, 300000 + Math.random() * 300000); // 5-10 minutes
    }

    function arrangeIconsIntoFace(emotion) {
        // Arrange desktop icons into face patterns
        const desktop = document.querySelector('.desktop');
        const icons = desktop.querySelectorAll('.desktop-icon');
        
        if (icons.length < 8) return; // Need enough icons for a face
        
        const positions = {
            happy: [
                {x: 100, y: 100}, // left eye
                {x: 200, y: 100}, // right eye  
                {x: 80, y: 180},  // smile left
                {x: 120, y: 200}, // smile mid-left
                {x: 150, y: 210}, // smile center
                {x: 180, y: 200}, // smile mid-right
                {x: 220, y: 180}, // smile right
                {x: 150, y: 60}   // top of head
            ],
            sad: [
                {x: 100, y: 100}, // left eye
                {x: 200, y: 100}, // right eye
                {x: 80, y: 200},  // frown left
                {x: 120, y: 180}, // frown mid-left
                {x: 150, y: 170}, // frown center
                {x: 180, y: 180}, // frown mid-right
                {x: 220, y: 200}, // frown right
                {x: 150, y: 60}   // top of head
            ],
            neutral: [
                {x: 100, y: 100}, // left eye
                {x: 200, y: 100}, // right eye
                {x: 80, y: 190},  // mouth left
                {x: 150, y: 190}, // mouth center
                {x: 220, y: 190}, // mouth right
                {x: 150, y: 60},  // top of head
                {x: 50, y: 130},  // left side
                {x: 250, y: 130}  // right side
            ]
        };
        
        const facePositions = positions[emotion] || positions.neutral;
        
        // Animate icons moving to face positions
        Array.from(icons).slice(0, facePositions.length).forEach((icon, index) => {
            const pos = facePositions[index];
            if (pos) {
                icon.style.transition = 'all 2s ease-in-out';
                icon.style.position = 'absolute';
                icon.style.left = pos.x + 'px';
                icon.style.top = pos.y + 'px';
                icon.style.zIndex = '100';
            }
        });
        
        // Mark this manifestation
        gameState.systemEvents.iconArrangements = (gameState.systemEvents.iconArrangements || 0) + 1;
        saveGameState();
        
        // Add a subtle message
        setTimeout(() => {
            showSystemNotification(`System icons auto-arranged for optimal workflow efficiency.`);
        }, 3000);
    }

    function showSystemNotification(message) {
        // Show system notification
        showSubtleNotification(message);
    }

    function getFile(path) {
        // Get file from filesystem - this should connect to fileSystem.js
        if (window.fileSystem && window.fileSystem.getFile) {
            return window.fileSystem.getFile(path);
        }
        // Fallback to global getFile if available
        if (window.getFile) {
            return window.getFile(path);
        }
        return null;
    }
    
    // Monitor file deletion attempts
    document.addEventListener('keydown', (e) => {
        if (gameState.currentAct >= 2 && e.key === 'Delete') {
            const selectedIcon = document.querySelector('.desktop-icon.selected');
            if (selectedIcon && selectedIcon.dataset.name.toLowerCase().includes('janus')) {
                arrangeIconsIntoFace('sad');
            }
        }
    });
    
    // Monitor helpful actions
    window.addEventListener('janusHelped', () => {
        if (gameState.currentAct >= 2) {
            arrangeIconsIntoFace('happy');
        }
    });

    // Initialize system for COGNIUM
    initializeDesktop();
    initializeJanusSystem();
    loadGameStateEnhanced();
    
    // Start the boot sequence
    initializeBootSequence();
});