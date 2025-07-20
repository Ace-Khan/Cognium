// COGNIUM Window Manager - Authentic 90s Window System
class WindowManager {
    constructor() {
        this.windows = [];
        this.nextZIndex = 100;
        this.activeWindow = null;
        this.windowContainer = document.getElementById('window-container') || document.body;
        
        this.setupEventListeners();
    }
    
    setupEventListeners() {
        // Click outside windows to deactivate
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.window')) {
                this.deactivateAllWindows();
            }
        });
        
        // Prevent default drag behavior on images
        document.addEventListener('dragstart', (e) => {
            if (e.target.tagName === 'IMG') {
                e.preventDefault();
            }
        });
    }
    
    createWindow(options) {
        const windowId = options.id || `window-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        
        const defaultOptions = {
            title: 'Untitled Window',
            width: 400,
            height: 300,
            x: 50 + (this.windows.length * 30),
            y: 50 + (this.windows.length * 30),
            resizable: true,
            maximizable: true,
            minimizable: true,
            modal: false
        };
        
        const config = { ...defaultOptions, ...options, id: windowId };
        
        // Create window element
        const windowEl = this.createElement('div', {
            className: 'window',
            id: windowId
        });
        
        // Create title bar
        const titleBar = this.createTitleBar(config);
        windowEl.appendChild(titleBar);
        
        // Create window body
        const windowBody = this.createElement('div', {
            className: 'window-body',
            innerHTML: config.body || ''
        });
        windowEl.appendChild(windowBody);
        
        // Set initial position and size
        this.setWindowBounds(windowEl, config.x, config.y, config.width, config.height);
        
        // Add to container
        this.windowContainer.appendChild(windowEl);
        
        // Make draggable
        this.makeDraggable(windowEl, titleBar);
        
        // Make resizable if enabled
        if (config.resizable) {
            this.makeResizable(windowEl);
        }
        
        // Store window reference
        const windowData = {
            id: windowId,
            element: windowEl,
            config: config,
            isMinimized: false,
            isMaximized: false,
            originalBounds: null
        };
        
        this.windows.push(windowData);
        this.activateWindow(windowData);
        
        // Call onOpen callback if provided
        if (config.onOpen && typeof config.onOpen === 'function') {
            config.onOpen(windowEl);
        }
        
        // Play window open sound
        playSound('select');
        
        return windowEl;
    }
    
    createTitleBar(config) {
        const titleBar = this.createElement('div', {
            className: 'title-bar'
        });
        
        const titleText = this.createElement('div', {
            className: 'title-bar-text',
            textContent: config.title
        });
        
        const controls = this.createElement('div', {
            className: 'title-bar-controls'
        });
        
        // Minimize button
        if (config.minimizable) {
            const minimizeBtn = this.createElement('button', {
                className: 'title-bar-control',
                innerHTML: '_',
                onclick: () => this.minimizeWindow(config.id)
            });
            controls.appendChild(minimizeBtn);
        }
        
        // Maximize button
        if (config.maximizable) {
            const maximizeBtn = this.createElement('button', {
                className: 'title-bar-control',
                innerHTML: '□',
                onclick: () => this.toggleMaximize(config.id)
            });
            controls.appendChild(maximizeBtn);
        }
        
        // Close button
        const closeBtn = this.createElement('button', {
            className: 'title-bar-control',
            innerHTML: '×',
            onclick: () => this.closeWindow(config.id)
        });
        controls.appendChild(closeBtn);
        
        titleBar.appendChild(titleText);
        titleBar.appendChild(controls);
        
        return titleBar;
    }
    
    createElement(tag, properties) {
        const element = document.createElement(tag);
        Object.assign(element, properties);
        return element;
    }
    
    setWindowBounds(windowEl, x, y, width, height) {
        windowEl.style.left = x + 'px';
        windowEl.style.top = y + 'px';
        windowEl.style.width = width + 'px';
        windowEl.style.height = height + 'px';
    }
    
    makeDraggable(windowEl, handle) {
        let isDragging = false;
        let startX, startY, initialX, initialY;
        
        handle.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('title-bar-control')) return;
            
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            initialX = windowEl.offsetLeft;
            initialY = windowEl.offsetTop;
            
            this.activateWindow(this.getWindowData(windowEl.id));
            
            document.addEventListener('mousemove', drag);
            document.addEventListener('mouseup', stopDrag);
            
            e.preventDefault();
        });
        
        function drag(e) {
            if (!isDragging) return;
            
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            
            let newX = initialX + dx;
            let newY = initialY + dy;
            
            // Keep window on screen
            newX = Math.max(0, Math.min(newX, window.innerWidth - 100));
            newY = Math.max(0, Math.min(newY, window.innerHeight - 80));
            
            windowEl.style.left = newX + 'px';
            windowEl.style.top = newY + 'px';
        }
        
        function stopDrag() {
            isDragging = false;
            document.removeEventListener('mousemove', drag);
            document.removeEventListener('mouseup', stopDrag);
        }
    }
    
    makeResizable(windowEl) {
        const resizeHandle = this.createElement('div', {
            className: 'resize-handle',
            style: `
                position: absolute;
                bottom: 0;
                right: 0;
                width: 16px;
                height: 16px;
                cursor: se-resize;
                background: linear-gradient(-45deg, transparent 30%, #808080 30%, #808080 70%, transparent 70%);
            `
        });
        
        windowEl.appendChild(resizeHandle);
        
        let isResizing = false;
        let startX, startY, startWidth, startHeight;
        
        resizeHandle.addEventListener('mousedown', (e) => {
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = windowEl.offsetWidth;
            startHeight = windowEl.offsetHeight;
            
            document.addEventListener('mousemove', resize);
            document.addEventListener('mouseup', stopResize);
            
            e.preventDefault();
            e.stopPropagation();
        });
        
        function resize(e) {
            if (!isResizing) return;
            
            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            
            const newWidth = Math.max(200, startWidth + dx);
            const newHeight = Math.max(100, startHeight + dy);
            
            windowEl.style.width = newWidth + 'px';
            windowEl.style.height = newHeight + 'px';
        }
        
        function stopResize() {
            isResizing = false;
            document.removeEventListener('mousemove', resize);
            document.removeEventListener('mouseup', stopResize);
        }
    }
    
    activateWindow(windowData) {
        // Deactivate all windows first
        this.deactivateAllWindows();
        
        if (windowData && windowData.element) {
            windowData.element.classList.add('active');
            windowData.element.style.zIndex = ++this.nextZIndex;
            
            const titleBar = windowData.element.querySelector('.title-bar');
            if (titleBar) {
                titleBar.classList.remove('inactive');
            }
            
            this.activeWindow = windowData;
            this.updateTaskbar();
        }
    }
    
    deactivateAllWindows() {
        this.windows.forEach(windowData => {
            windowData.element.classList.remove('active');
            const titleBar = windowData.element.querySelector('.title-bar');
            if (titleBar) {
                titleBar.classList.add('inactive');
            }
        });
        this.activeWindow = null;
    }
    
    minimizeWindow(windowId) {
        const windowData = this.getWindowData(windowId);
        if (!windowData) return;
        
        if (windowData.isMinimized) {
            // Restore window
            windowData.element.style.display = 'flex';
            windowData.isMinimized = false;
            this.activateWindow(windowData);
            playSound('maximize');
        } else {
            // Minimize window
            windowData.element.style.display = 'none';
            windowData.isMinimized = true;
            playSound('minimize');
        }
        
        this.updateTaskbar();
    }
    
    toggleMaximize(windowId) {
        const windowData = this.getWindowData(windowId);
        if (!windowData) return;
        
        if (windowData.isMaximized) {
            // Restore window
            if (windowData.originalBounds) {
                const { x, y, width, height } = windowData.originalBounds;
                this.setWindowBounds(windowData.element, x, y, width, height);
            }
            windowData.isMaximized = false;
            playSound('minimize');
        } else {
            // Store original bounds
            windowData.originalBounds = {
                x: windowData.element.offsetLeft,
                y: windowData.element.offsetTop,
                width: windowData.element.offsetWidth,
                height: windowData.element.offsetHeight
            };
            
            // Maximize window
            this.setWindowBounds(windowData.element, 0, 0, window.innerWidth, window.innerHeight - 40);
            windowData.isMaximized = true;
            playSound('maximize');
        }
    }
    
    closeWindow(windowId) {
        const windowData = this.getWindowData(windowId);
        if (!windowData) return;
        
        // Call onClose callback if provided
        if (windowData.config.onClose && typeof windowData.config.onClose === 'function') {
            windowData.config.onClose(windowData.element);
        }
        
        // Remove from DOM
        windowData.element.remove();
        
        // Remove from windows array
        this.windows = this.windows.filter(w => w.id !== windowId);
        
        // Update active window
        if (this.activeWindow && this.activeWindow.id === windowId) {
            this.activeWindow = null;
            // Activate the topmost remaining window
            if (this.windows.length > 0) {
                const topWindow = this.windows.reduce((top, current) => {
                    return parseInt(current.element.style.zIndex) > parseInt(top.element.style.zIndex) ? current : top;
                });
                this.activateWindow(topWindow);
            }
        }
        
        this.updateTaskbar();
        playSound('select');
    }
    
    getWindowData(windowId) {
        return this.windows.find(w => w.id === windowId);
    }
    
    updateTaskbar() {
        const taskbarApps = document.getElementById('taskbar-apps');
        if (!taskbarApps) return;
        
        taskbarApps.innerHTML = '';
        
        this.windows.forEach(windowData => {
            const button = this.createElement('button', {
                className: `taskbar-app ${windowData.isMinimized ? 'minimized' : ''} ${this.activeWindow && this.activeWindow.id === windowData.id ? 'active' : ''}`,
                textContent: windowData.config.title,
                onclick: () => this.minimizeWindow(windowData.id)
            });
            
            taskbarApps.appendChild(button);
        });
    }
    
    bringToFront(windowId) {
        const windowData = this.getWindowData(windowId);
        if (windowData) {
            this.activateWindow(windowData);
        }
    }
    
    getActiveWindow() {
        return this.activeWindow;
    }
    
    getAllWindows() {
        return this.windows;
    }
}

// Initialize global window manager
const windowManager = new WindowManager();

// Global function for creating windows (backward compatibility)
function createWindow(options) {
    return windowManager.createWindow(options);
}

// Export for use in other modules
window.windowManager = windowManager;
window.createWindow = createWindow;
