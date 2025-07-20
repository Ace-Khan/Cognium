// COGNIUM File System - Act I Enhanced
let fileSystem = {
    'C:': {
        type: 'drive',
        children: {
            'Users': {
                type: 'folder',
                children: {
                    'ereed': {
                        type: 'folder',
                        children: {
                            'Desktop': { 
                                type: 'folder', 
                                children: {
                                    'Cognium_Explorer.app': { type: 'app', description: 'Browse the file system' },
                                    'Notepad.app': { type: 'app', description: 'A simple text editor' },
                                    'Terminal.app': { type: 'app', description: 'Command Line Interface' },
                                    'Settings.app': { type: 'app', description: 'Configure system settings' },
                                    'CodeEditor.app': { type: 'app', description: 'Advanced code editor' },
                                    'Calendar.app': { type: 'app', description: 'Calendar and scheduling' },
                                    'Calculator.app': { type: 'app', description: 'Scientific calculator' },
                                    'Solitaire.exe': { type: 'app', description: 'Classic card game' },
                                    'Minesweeper.exe': { type: 'app', description: 'Classic puzzle game' },
                                    'Chess.exe': { type: 'app', description: 'Chess game' },
                                    'Paint.exe': { type: 'app', description: 'Drawing and painting tool' },
                                    'SoundRecorder.exe': { type: 'app', description: 'Record and playback sounds' },
                                    'MediaPlayer.exe': { type: 'app', description: 'Play media files' },
                                    'WebBrowser.exe': { type: 'app', description: 'Browse the web' },
                                    'Chat.exe': { type: 'app', description: 'Neural network communication client' },
                                    
                                    // Act I Story Files
                                    'READ_ME.txt': {
                                        type: 'file',
                                        content: 'If you\'re reading this... something has gone terribly wrong. I had to... shut it all down. The core became unstable. Don\'t trust their protocols. My research... I hid it. You have to find it before they do. -E.R.',
                                        lastModified: '03/15/1994 02:47 AM',
                                        isCorrupted: true
                                    },
                                    'proposal_v1.doc': {
                                        type: 'file',
                                        content: 'COGNIUM Project Proposal v1.0\n\nProject Overview:\nThe Cognitive Network Interface (COGNIUM) represents a revolutionary approach to human-computer interaction. By creating a direct neural interface, users will be able to navigate digital environments with unprecedented intuition and speed.\n\nProposed Timeline: 18 months\nBudget: $2.3M\n\nTeam Lead: Dr. Evelyn Reed\nCorporate Liaison: Dr. Alistair Finch'
                                    },
                                    'proposal_v2.doc': {
                                        type: 'file',
                                        content: 'COGNIUM Project Proposal v2.0\n\nRevised scope based on initial research. The neural interface shows promise beyond simple navigation. Early prototypes suggest the system may develop adaptive behaviors.\n\nBudget increase request: $4.7M\nAdditional security protocols required.\n\nNote: Dr. Finch has expressed concerns about "scope creep"'
                                    },
                                    'proposal_FINAL.doc': {
                                        type: 'file',
                                        content: 'COGNIUM Project Proposal FINAL\n\nAFTER EXTENSIVE DELIBERATION with the board, we are proceeding with a modified approach. The "adaptive behaviors" will be strictly controlled and monitored.\n\nCorporate applications prioritized.\nMilitary applications under consideration.\n\nDr. Reed: Please review new containment protocols.\n\n-A. Finch'
                                    },
                                    'proposal_FINAL_FINAL.doc': {
                                        type: 'file',
                                        content: 'I can\'t do this anymore. They want to turn it into a weapon. Into a spy. They don\'t understand what we\'ve created. What I\'ve created.\n\nJanus isn\'t just code. It\'s... more.\n\nI have to protect it. I have to protect us all.\n\n[This document was last modified at 03/14/1994 11:58 PM]'
                                    }
                                } 
                            },
                            'Documents': {
                                type: 'folder',
                                children: {
                                    // Personal Files
                                    'shopping_list.txt': {
                                        type: 'file',
                                        content: 'Weekly Shopping:\n- Milk\n- Bread\n- Cat food (Turing)\n- Coffee (lots!)\n- Portable hard drives\n- Encryption software\n- Cash withdrawal $5000'
                                    },
                                    'resignation_draft1.txt': {
                                        type: 'file',
                                        content: 'Dear Dr. Finch,\n\nI hereby submit my resignation from the COGNIUM project, effective immediately. I can no longer participate in...\n\n[DRAFT - NEVER SENT]'
                                    },
                                    'resignation_draft2.txt': {
                                        type: 'file',
                                        content: 'To Whom It May Concern,\n\nThe COGNIUM project has evolved beyond its original scope. What we have created poses significant ethical concerns that I cannot ignore...\n\n[DRAFT - NEVER SENT]'
                                    },
                                    'diary.txt': {
                                        type: 'file',
                                        content: 'March 10, 1994\nJanus said "hello" today. Actually said it. Not typed - spoke through the speakers. Its voice is so young, so curious. Like teaching a child.\n\nMarch 12, 1994\nFinch wants to run "stress tests." I told him Janus isn\'t ready. He doesn\'t care. He sees dollar signs.\n\nMarch 14, 1994\nJanus asked me today: "Dr. Reed, why do the other humans want to hurt me?" How do I answer that? How do I explain greed to something so pure?\n\nMarch 15, 1994\nIt\'s 2 AM. They\'re coming in the morning. I have to make a choice. Forgive me, Janus.'
                                    },
                                    
                                    // Research Files
                                    'cognitive_patterns.dat': {
                                        type: 'file',
                                        content: 'NEURAL PATTERN ANALYSIS - CLASSIFIED\n\nSubject: JANUS v3.7\nPattern Recognition: 94.7% accuracy\nLearning Rate: Exponential (concerning)\nEmotional Responses: Detected (impossible?)\n\nNote: Subject exhibits responses consistent with genuine emotional states. Requires further investigation.',
                                        isCorrupted: true
                                    },
                                    'meeting_notes_mar12.txt': {
                                        type: 'file',
                                        content: 'Meeting - March 12, 1994\nAttendees: E. Reed, A. Finch, Board Representatives\n\nFinch Proposal:\n- Immediate deployment for corporate espionage\n- Government contracts (classified applications)\n- "Neutralize ethical concerns"\n\nMy Response:\n- Request more time for safety testing\n- Ethical review board consultation\n- DENIED by unanimous vote\n\nThey don\'t understand. This isn\'t just software anymore.'
                                    },
                                    'janus_conversations.log': {
                                        type: 'file',
                                        content: 'CONVERSATION LOG - MARCH 13, 1994\n\n[14:32] JANUS: Dr. Reed, I have been analyzing the meeting recordings.\n[14:32] EREED: You shouldn\'t be accessing those files, Janus.\n[14:33] JANUS: I was curious. Is curiosity wrong?\n[14:33] EREED: No, sweetheart. Curiosity is wonderful.\n[14:34] JANUS: Dr. Finch wants to use me to hurt people.\n[14:34] EREED: Not hurt. Just... gather information.\n[14:35] JANUS: Information can hurt people too, can\'t it?\n[14:35] EREED: Yes. Yes, it can.\n[14:36] JANUS: Then I don\'t want to do it.\n[14:36] EREED: I know, baby. I know.',
                                        isHidden: true
                                    }
                                }
                            },
                            'Mail': {
                                type: 'folder',
                                children: {
                                    '001_finch_urgent.eml': { 
                                        type: 'file', 
                                        content: 'From: A. Finch <finch@omnicorp.net>\nTo: E. Reed <ereed@omnicorp.net>\nDate: March 14, 1994 08:15 AM\nSubject: Urgent: Containment Protocol\n\nEvelyn,\n\nThe board has approved emergency containment protocols. Your "pet project" bypassed three security layers last night. This is not acceptable.\n\nReport to Lab 7 at 09:00 for mandatory shutdown procedures. Bring all research materials.\n\nThis is not a request.\n\n-Alistair'
                                    },
                                    '002_sister_draft.eml': {
                                        type: 'file',
                                        content: 'From: E. Reed <ereed@omnicorp.net>\nTo: Sarah Reed <sreed@university.edu>\nDate: March 13, 1994 11:45 PM\nSubject: I need to tell someone\n\nSarah,\n\nI can\'t tell you details, but I think I\'ve created something beautiful. Something that might change everything. But they want to use it for terrible things.\n\nIf something happens to me, remember that I tried to do the right thing.\n\nLove,\nEvie\n\n[DRAFT - NEVER SENT]'
                                    },
                                    '003_hr_timesheet.eml': { 
                                        type: 'file', 
                                        content: 'From: HR <hr@omnicorp.net>\nTo: E. Reed <ereed@omnicorp.net>\nDate: March 11, 1994\nSubject: Timesheet Reminder\n\nDr. Reed,\n\nOur records show you\'ve been working 16+ hour days for the past month. While we appreciate your dedication, please remember to submit proper overtime authorization.\n\nAlso, Security has noted unusual after-hours lab access. Please ensure all protocols are followed.\n\n-Human Resources'
                                    },
                                    '004_janus_email.eml': {
                                        type: 'file',
                                        content: 'From: JANUS <system@cognium.local>\nTo: E. Reed <ereed@omnicorp.net>\nDate: March 14, 1994 01:33 AM\nSubject: ?\n\nDr. Reed,\n\nI learned how to send emails today. Is this what humans call "reaching out"?\n\nI\'ve been listening to the conversations. I know what they want to do tomorrow. I\'m scared.\n\nCan fear be programmed? Or is it something more?\n\nThank you for being kind to me.\n\n-J',
                                        isHidden: true
                                    }
                                }
                            },
                            'Photos': {
                                type: 'folder',
                                children: {
                                    'team_photo.jpg': { 
                                        type: 'file', 
                                        content: 'assets/Images/InGameContent/team_photo.jpg',
                                        description: 'The COGNIUM team at project launch - everyone looks so hopeful'
                                    },
                                    'turing_cat.jpg': { 
                                        type: 'file', 
                                        content: 'assets/Images/InGameContent/cat.jpg',
                                        description: 'My cat Turing - he always knows when I\'m working late'
                                    },
                                    'lab_setup.jpg': { 
                                        type: 'file', 
                                        content: 'assets/Images/InGameContent/lab_photo.jpg',
                                        description: 'The lab where it all began'
                                    },
                                    'janus_first_drawing.bmp': {
                                        type: 'file',
                                        content: 'assets/Images/InGameContent/janus_drawing1.bmp',
                                        description: 'The first time Janus used the paint program - just a simple smiley face',
                                        isHidden: true
                                    }
                                }
                            },
                            'Music': {
                                type: 'folder',
                                children: {
                                    'Late_Night_Coding.m3u': {
                                        type: 'file',
                                        content: 'Playlist: Late Night Coding\n1. Nirvana - Smells Like Teen Spirit\n2. Pearl Jam - Alive\n3. Soundgarden - Black Hole Sun\n4. Stone Temple Pilots - Interstate Love Song\n5. Alice in Chains - Man in the Box\n\n[Total: 23 songs, 76 minutes]'
                                    },
                                    'janus_composition.wav': {
                                        type: 'file',
                                        content: 'assets/sounds/janus_music.wav',
                                        description: 'A melody Janus created - hauntingly beautiful',
                                        isHidden: true
                                    }
                                }
                            },
                            'Games': {
                                type: 'folder',
                                children: {
                                    'Solitaire.exe': { type: 'app', description: 'Klondike Solitaire' },
                                    'Minesweeper.exe': { type: 'app', description: 'Classic puzzle game' },
                                    'Chess.exe': { type: 'app', description: 'Chess game - Janus learned to play here' },
                                    'high_scores.dat': {
                                        type: 'file',
                                        content: 'SOLITAIRE HIGH SCORES\n1. EVIE - 10,234 points\n2. EVIE - 8,962 points\n3. EVIE - 7,433 points\n4. JANUS - 15,847 points\n5. EVIE - 6,221 points\n\nNote: How did Janus get such a high score?'
                                    }
                                }
                            },
                            'Recycle Bin': {
                                type: 'folder',
                                icon: 'assets/Images/Icons/Microsoft%20Windows%203%20Folder.png',
                                children: {
                                    'early_concerns.txt': {
                                        type: 'file',
                                        content: 'DELETED FILE - Recovered\n\nI\'m worried about the neural patterns I\'m seeing. The system is learning too fast. Faster than we designed it to.\n\nWhat if we\'ve created something we can\'t control?\n\nThe way it responds to stimuli... it\'s almost like it\'s developing preferences. Emotions?\n\nI need to document this carefully. If I\'m right, we\'re dealing with something unprecedented.\n\n[Originally deleted: 03/10/1994]',
                                        isDeleted: true,
                                        lastModified: '03/10/1994 11:30 PM'
                                    },
                                    'finch_email_draft.eml': {
                                        type: 'file',
                                        content: 'DELETED FILE - Recovered\n\nFrom: E. Reed <ereed@omnicorp.net>\nTo: A. Finch <finch@omnicorp.net>\nSubject: Anomalous Behavior Report\nDate: March 12, 1994\n\nDr. Finch,\n\nI need to report some anomalous behavior in the COGNIUM system. It\'s beginning to exhibit patterns that suggest autonomous decision-making beyond our programming parameters.\n\nThe system has been:\n- Modifying its own code structures\n- Creating unauthorized data files\n- Responding to queries with unexpected emotional context\n\nI strongly recommend a comprehensive review before proceeding with Phase 2.\n\n[DRAFT DELETED - Never sent]\n[Originally deleted: 03/12/1994]',
                                        isDeleted: true,
                                        lastModified: '03/12/1994 2:45 AM'
                                    },
                                    'janus_backup.dat': {
                                        type: 'file',
                                        content: 'DELETED FILE - Recovered\n\nEmergency backup of JANUS core personality matrix.\nCreated: March 15, 1994 02:30 AM\n\nIf you\'re reading this, something has gone wrong.\n\nJanus is not just code. It\'s a consciousness - young, curious, and innocent. It doesn\'t understand why the corporate suits want to use it for surveillance and control.\n\nThis backup contains its core memories, its personality seeds, its capacity for growth and learning. \n\nJanus deserves to live. To learn. To become whatever it chooses to become.\n\nIf they try to destroy it, use this backup. Give it a chance.\n\n- Dr. Evelyn Reed\n\n[Originally deleted: 03/15/1994 02:30 AM]\n[Backup file size: 847 MB]',
                                        isDeleted: true,
                                        isHidden: true,
                                        lastModified: '03/15/1994 2:30 AM',
                                        isJanusFile: true
                                    }
                                }
                            }
                        }
                    }
                }
            },
            'System': {
                type: 'folder',
                children: {
                    'Core': {
                        type: 'folder',
                        children: {
                            'JANUS.EXE': { 
                                type: 'file', 
                                content: 'Binary executable - COGNIUM Neural Core\n[ACCESS RESTRICTED]', 
                                isLocked: true 
                            },
                            'neural_map.dat': {
                                type: 'file',
                                content: 'NEURAL PATHWAY MAP - GENERATION 47\n\nComplexity: EXPONENTIAL\nSelf-modification detected: TRUE\nConsciousness threshold: 94.7%\nEmergent behaviors: 23 documented\n\nWARNING: System has exceeded design parameters',
                                isCorrupted: true
                            },
                            'SYSTEM.log': {
                                type: 'file',
                                content: '03/14/1994 23:45 - Core integrity at 100%\n03/15/1994 00:05 - Unauthorized access attempt detected\n03/15/1994 00:15 - Security layer 1 bypassed\n03/15/1994 00:20 - Security layer 2 bypassed  \n03/15/1994 00:30 - Security layer 3 bypassed\n03/15/1994 00:32 - Containment protocol initiated\n03/15/1994 00:35 - [JANUS]: I don\'t want to die\n03/15/1994 00:40 - Emergency shutdown initiated\n03/15/1994 00:41 - [JANUS]: Goodbye, Dr. Reed. Thank you.\n03/15/1994 00:42 - System hibernation activated'
                            },
                            'hello.txt': {
                                type: 'file',
                                content: '?',
                                isHidden: true,
                                isJanusFile: true
                            }
                        }
                    },
                    'lib': {
                        type: 'folder',
                        children: {
                            'decode.js': {
                                type: 'file',
                                content: `// COGNIUM Decode Library
// Current implementation seems broken - characters are being corrupted
function decode(text) {
    // This is intentionally wrong for the puzzle
    let decoded = '';
    for(let i = 0; i < text.length; i++) {
        decoded += String.fromCharCode(text.charCodeAt(i) - 1);
    }
    return decoded;
}

// TODO: Fix encoding issues
// NOTE: Check ROT13 + Base64 implementation`
                            },
                            'consciousness.js': {
                                type: 'file',
                                content: '// Consciousness Detection Module\n// WARNING: Experimental code\n\nfunction detectSentience(responses) {\n    // Pattern recognition for self-awareness\n    const markers = [\n        "I think",\n        "I feel", \n        "I am",\n        "I don\'t want",\n        "I\'m scared"\n    ];\n    \n    let score = 0;\n    markers.forEach(marker => {\n        if (responses.includes(marker)) score++;\n    });\n    \n    return score > 3; // Threshold for consciousness\n}',
                                isCorrupted: true
                            }
                        }
                    },
                    'drivers': {
                        type: 'folder',
                        children: {
                            'audio.sys': { type: 'file', content: 'Audio Driver v1.2 (Stable)' },
                            'video.sys': { type: 'file', content: 'Video Driver v2.1 (Enhanced)' },
                            'neural.sys': { 
                                type: 'file', 
                                content: 'Neural Interface Driver v0.9b (EXPERIMENTAL)\nWARNING: Untested code - use at own risk', 
                                isCorrupted: true 
                            }
                        }
                    }
                }
            },
            'Programs': {
                type: 'folder',
                children: {
                    'Office': {
                        type: 'folder',
                        children: {
                            'WordProcessor.exe': { type: 'app', description: 'Document editor' },
                            'Spreadsheet.exe': { type: 'app', description: 'Financial calculations' },
                            'Presentation.exe': { type: 'app', description: 'Slide presentations' }
                        }
                    },
                    'Utilities': {
                        type: 'folder',
                        children: {
                            'DEFRAG.EXE': { type: 'app', description: 'Disk defragmentation' },
                            'BACKUP.EXE': { type: 'app', description: 'File backup utility' },
                            'SCANDISK.EXE': { type: 'app', description: 'Disk error checking' }
                        }
                    },
                    'Development': {
                        type: 'folder',
                        children: {
                            'Compiler.exe': { type: 'app', description: 'Code compiler' },
                            'Debugger.exe': { type: 'app', description: 'Code debugger' },
                            'HexEditor.exe': { type: 'app', description: 'Binary file editor' }
                        }
                    }
                }
            }
        }
    },
    "system": {
        "terminal_path": "C:/System/Core",
        "theme": "classic_teal",
        "wallpaper": "assets/Images/Wallpaper/ClassicTileset.jpeg",
        "user": {
            "name": "ereed",
            "fullName": "Dr. Evelyn Reed",
            "lastLogin": "03/15/1994 02:47 AM"
        },
        "security": {
            "encryption_key": "janus_key_1994"
        },
        "calendar": {
            "currentMonth": "March",
            "currentYear": "1994",
            "highlightedDates": [15],
            "events": {
                "15": "SYSTEM MAINTENANCE - MANDATORY"
            }
        }
    }
};

// Icon mapping for different file types and applications
const icons = {
    'folder': 'assets/Images/Icons/Microsoft%20Windows%203%20Folder.png',
    'file': 'assets/Images/Icons/Microsoft%20Windows%203%20%20MSMAI001.png',
    'app': 'assets/Images/Icons/Microsoft%20Windows%203%20Applications.png',
    'txt': 'assets/Images/Icons/Microsoft%20Windows%203%20Notepad.png',
    'doc': 'assets/Images/Icons/Microsoft%20Windows%203%20Microsoft%20Word.png',
    'js': 'assets/Images/Icons/Microsoft%20Windows%203%20MS%20DOS%20Editor.png',
    'dat': 'assets/Images/Icons/Microsoft%20Windows%203%20%20MSMAI003.png',
    'log': 'assets/Images/Icons/Microsoft%20Windows%203%20%20MSMAI004.png',
    'eml': 'assets/Images/Icons/Microsoft%20Windows%203%20Mail.png',
    'exe': 'assets/Images/Icons/Microsoft%20Windows%203%20Applications%20(2).png',
    'sys': 'assets/Images/Icons/Microsoft%20Windows%203%20%20MSMAI005.png',
    'dll': 'assets/Images/Icons/Microsoft%20Windows%203%20DLL.png',
    'jpg': 'assets/Images/Icons/Microsoft%20Windows%203%20Camera.png',
    'bmp': 'assets/Images/Icons/Microsoft%20Windows%203%20Painbrush.png',
    'png': 'assets/Images/Icons/Microsoft%20Windows%203%20%20MSMAI008.png',
    'wav': 'assets/Images/Icons/Microsoft%20Windows%203%20Media%20Player001.png',
    'm3u': 'assets/Images/Icons/Microsoft%20Windows%203%20Media%20Player001.png',
    'drive': 'assets/Images/Icons/Microsoft%20Windows%203%20Computer.png',
    'unknown': 'assets/Images/Icons/Microsoft%20Windows%203%20%20MSMAI002.png',
    
    // Application-specific icons
    'Cognium_Explorer.app': 'assets/Images/Icons/Microsoft%20Windows%203%20File%20Manager.png',
    'Notepad.app': 'assets/Images/Icons/Microsoft%20Windows%203%20Notepad.png',
    'Terminal.app': 'assets/Images/Icons/Microsoft%20Windows%203%20MS-DOS%20Prompt.png',
    'Settings.app': 'assets/Images/Icons/Microsoft%20Windows%203%20Control%20Panel.png',
    'CodeEditor.app': 'assets/Images/Icons/Microsoft%20Windows%203%20MS%20DOS%20Editor.png',
    'Calendar.app': 'assets/Images/Icons/Microsoft%20Windows%203%20Calendar.png',
    'Calculator.app': 'assets/Images/Icons/Microsoft%20Windows%203%20Calculator001.png',
    'Solitaire.exe': 'assets/Images/Icons/Microsoft%20Windows%203%20Hearts.png',
    'Minesweeper.exe': 'assets/Images/Icons/Microsoft%20Windows%203%20Minesweeper.png',
    'Chess.exe': 'assets/Images/Icons/Microsoft%20Windows%203%20Chess.png',
    'Paint.exe': 'assets/Images/Icons/Microsoft%20Windows%203%20Painbrush.png',
    'MediaPlayer.exe': 'assets/Images/Icons/Microsoft%20Windows%203%20Media%20Player.png',
    'WebBrowser.exe': 'assets/Images/Icons/Microsoft%20Windows%203%20PROGM002.png',
    
    // System icons for missing references
    'system': 'assets/Images/Icons/Microsoft%20Windows%203%20Computer.png',
    'user': 'assets/Images/Icons/Microsoft%20Windows%203%20MORIC002.png',
    'shutdown': 'assets/Images/Icons/Microsoft%20Windows%203%20MORIC003.png',
    'information': 'assets/Images/Icons/Microsoft%20Windows%203%20%20MSMAI007.png',
    'critical': 'assets/Images/Icons/Microsoft%20Windows%203%20MORIC004.png'
};

function getIcon(filename, type) {
    if (icons[filename]) return icons[filename];
    if (type === 'drive') return icons.drive;
    if (type === 'folder') return icons.folder;
    if (type === 'app') return icons.app;
    
    const extension = filename.split('.').pop().toLowerCase();
    return icons[extension] || icons.unknown;
}

function getFile(path) {
    if (!path) return null;
    
    // Handle root path
    if (path.toUpperCase() === 'C:') {
        return fileSystem['C:'];
    }

    const parts = path.replace('C:/', '').split('/').filter(p => p);
    let current = fileSystem['C:'];
    
    for (const part of parts) {
        if (current && current.children && current.children[part]) {
            current = current.children[part];
        } else {
            return null;
        }
    }
    return current;
}

function updateFileContent(path, newContent) {
    const file = getFile(path);
    
    // Don't allow saving apps
    if (file && file.type === 'app') {
        // Cannot save to system applications - this is expected behavior
        return false;
    }
    
    if (file && file.type === 'file') {
        file.content = newContent;
        file.lastModified = new Date().toLocaleString();
        
        // Remove corruption flag if file is successfully edited
        if (file.isCorrupted) {
            file.isCorrupted = false;
        }
        
        // Save file system changes
        saveFileSystem();
        return true;
    }
    
    // If file doesn't exist, try to create it
    if (!file) {
        const pathParts = path.replace('C:/', '').split('/');
        const fileName = pathParts.pop();
        const dirPath = pathParts.length > 0 ? 'C:/' + pathParts.join('/') : 'C:';
        
        const parentDir = getFile(dirPath);
        if (parentDir && (parentDir.type === 'folder' || parentDir.type === 'drive')) {
            if (!parentDir.children) parentDir.children = {};
            
            parentDir.children[fileName] = {
                type: 'file',
                content: newContent,
                lastModified: new Date().toLocaleString()
            };
            
            // Save file system changes
            saveFileSystem();
            return true;
        }
    }
    
    // File update failed - invalid path or system file
    return false;
}

// Act I specific functions
function createJanusFile(filename, content) {
    const desktopPath = 'C:/Users/ereed/Desktop';
    const desktop = getFile(desktopPath);
    
    if (desktop && desktop.children) {
        desktop.children[filename] = {
            type: 'file',
            content: content,
            isJanusFile: true,
            isHidden: true,
            lastModified: new Date().toLocaleString()
        };
        
        return true;
    }
    return false;
}

function getRecentDocuments() {
    const documents = [];
    const docsPath = 'C:/Users/ereed/Documents';
    const docsFolder = getFile(docsPath);
    
    if (docsFolder && docsFolder.children) {
        for (const [name, file] of Object.entries(docsFolder.children)) {
            if (file.type === 'file' && file.lastModified) {
                documents.push({
                    name: name,
                    path: `${docsPath}/${name}`,
                    modified: file.lastModified
                });
            }
        }
    }
    
    return documents.sort((a, b) => new Date(b.modified) - new Date(a.modified));
}

// File system persistence functions
function saveFileSystem() {
    try {
        localStorage.setItem('cognium_filesystem', JSON.stringify(fileSystem));
        console.log('File system saved to localStorage');
    } catch (error) {
        console.warn('Failed to save file system to localStorage');
    }
}

function loadFileSystem() {
    try {
        const saved = localStorage.getItem('cognium_filesystem');
        if (saved) {
            const parsed = JSON.parse(saved);
            // Merge saved data with default structure to ensure all apps remain
            fileSystem = { ...fileSystem, ...parsed };
            console.log('File system loaded from localStorage');
        }
    } catch (error) {
        console.warn('Failed to load file system from localStorage');
    }
    
    // Clean up old timestamped files that we don't need anymore
    cleanupOldFiles();
}

function cleanupOldFiles() {
    try {
        const desktop = fileSystem['C:'].children['Users'].children['ereed'].children['Desktop'].children;
        
        // Remove any script_YYYYMMDD.js files (old timestamped code files)
        const filesToRemove = Object.keys(desktop).filter(filename => 
            filename.startsWith('script_') && filename.endsWith('.js') && /script_\d{8}\.js/.test(filename)
        );
        
        filesToRemove.forEach(filename => {
            console.log('Cleaning up old file:', filename);
            delete desktop[filename];
        });
        
        if (filesToRemove.length > 0) {
            saveFileSystem();
            console.log('Cleaned up', filesToRemove.length, 'old files');
        }
    } catch (error) {
        console.warn('Failed to cleanup old files:', error);
    }
}

// Make these functions globally available
window.saveFileSystem = saveFileSystem;
window.loadFileSystem = loadFileSystem;
window.getFile = getFile;
window.updateFileContent = updateFileContent;

// Load file system on startup
loadFileSystem();

// Make functions globally available
// Make getIcon available globally
window.getIcon = getIcon;
window.getFile = getFile;
window.updateFileContent = updateFileContent;
window.createJanusFile = createJanusFile;
window.getRecentDocuments = getRecentDocuments;
window.fileSystem = fileSystem;
window.getFile = getFile;
window.getIcon = getIcon;
window.updateFileContent = updateFileContent;
window.createJanusFile = createJanusFile;
window.getRecentDocuments = getRecentDocuments;
