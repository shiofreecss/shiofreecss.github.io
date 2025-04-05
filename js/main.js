// Add pixel stars to the background
function createPixelStars() {
    const body = document.querySelector('body');
    const numberOfStars = 200;
    
    for (let i = 0; i < numberOfStars; i++) {
        const star = document.createElement('div');
        star.classList.add('pixel-star');
        
        // Random position
        const x = Math.floor(Math.random() * window.innerWidth);
        const y = Math.floor(Math.random() * window.innerHeight);
        
        // Random size (1-3px)
        const size = Math.floor(Math.random() * 3) + 1;
        
        // Random opacity
        const opacity = Math.random() * 0.7 + 0.3;
        
        // Random twinkle animation delay
        const animationDelay = Math.random() * 5 + 's';
        
        // Random color (cyan or pink to match our theme)
        const colorChoice = Math.random() > 0.5 ? '#00f0ff' : '#ff00a5';
        
        // Apply styles
        star.style.left = `${x}px`;
        star.style.top = `${y}px`;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.opacity = opacity;
        star.style.backgroundColor = colorChoice;
        star.style.boxShadow = `0 0 8px ${colorChoice}`;
        star.style.animation = `twinkle 5s infinite ${animationDelay}`;
        
        body.appendChild(star);
    }
}

// Add twinkle animation to stylesheet
function addTwinkleAnimation() {
    const stylesheet = document.createElement('style');
    stylesheet.textContent = `
        @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; box-shadow: 0 0 15px currentColor; }
        }
    `;
    document.head.appendChild(stylesheet);
}

// Add pixel effect to section titles
function pixelateHeadings() {
    const sectionTitles = document.querySelectorAll('.section h2');
    
    sectionTitles.forEach(title => {
        // Get the original text
        const originalText = title.textContent;
        
        // Create a container for the pixelated text
        const pixelContainer = document.createElement('div');
        pixelContainer.classList.add('pixel-text-container');
        
        // Add textShadow to make it look more pixelated
        title.style.textShadow = `
            2px 0 0 rgba(255, 0, 165, 0.3),
            -2px 0 0 rgba(255, 0, 165, 0.3),
            0 2px 0 rgba(255, 0, 165, 0.3),
            0 -2px 0 rgba(255, 0, 165, 0.3),
            1px 1px 0 rgba(255, 0, 165, 0.3),
            -1px -1px 0 rgba(255, 0, 165, 0.3),
            1px -1px 0 rgba(255, 0, 165, 0.3),
            -1px 1px 0 rgba(255, 0, 165, 0.3)
        `;
        
        // Add pixel effect to the ::after element
        const afterStyle = document.createElement('style');
        afterStyle.textContent = `
            .section h2::after {
                box-shadow: 3px 3px 0 rgba(0, 0, 0, 0.5);
                transition: all 0.3s;
            }
            
            .section h2:hover::after {
                transform: translateY(2px);
                box-shadow: 1px 1px 0 rgba(0, 0, 0, 0.5);
            }
        `;
        document.head.appendChild(afterStyle);
    });
}

// Add pixel hover effects to buttons and links
function addPixelHoverEffects() {
    // Add pixel hover effect to nav links
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', () => {
            link.style.textShadow = '0 0 8px #00f0ff, 0 0 15px #00f0ff';
            link.style.transform = 'translateY(-2px)';
            link.style.transition = 'all 0.2s ease';
        });
        
        link.addEventListener('mouseleave', () => {
            link.style.textShadow = '';
            link.style.transform = '';
        });
    });
    
    // Add pixel hover effect to about list items
    const aboutItems = document.querySelectorAll('.about-list li');
    aboutItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.style.borderColor = '#00f0ff';
            item.style.boxShadow = '0 0 15px rgba(0, 240, 255, 0.5)';
            item.style.transform = 'translateX(5px)';
            item.style.transition = 'all 0.3s ease';
        });
        
        item.addEventListener('mouseleave', () => {
            item.style.borderColor = '';
            item.style.boxShadow = '';
            item.style.transform = '';
        });
    });
    
    // Add pixel hover effect to social icons
    const socialIcons = document.querySelectorAll('.social-icon');
    socialIcons.forEach(icon => {
        icon.addEventListener('mouseenter', () => {
            icon.style.transform = 'translateY(-5px) scale(1.1)';
            icon.style.textShadow = '0 0 15px #00f0ff, 0 0 25px #00f0ff';
        });
        
        icon.addEventListener('mouseleave', () => {
            icon.style.transform = '';
            icon.style.textShadow = '';
        });
    });
}

// Initialize pixel art
function initPixelArt() {
    addTwinkleAnimation();
    createPixelStars();
    pixelateHeadings();
    addPixelHoverEffects();
    
    // Add pixel font if not already loaded
    if (!document.getElementById('pixel-font')) {
        const fontLink = document.createElement('link');
        fontLink.id = 'pixel-font';
        fontLink.rel = 'stylesheet';
        fontLink.href = 'https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap';
        document.head.appendChild(fontLink);
    }
    
    // Reposition stars on window resize
    window.addEventListener('resize', () => {
        // Remove existing stars
        document.querySelectorAll('.pixel-star').forEach(star => star.remove());
        // Create new stars
        createPixelStars();
    });
}

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize pixel art theme
    initPixelArt();
    
    // Music Player
    const musicPlayer = {
        audioPlayer: document.getElementById('audio-player'),
        playBtn: document.getElementById('play-btn'),
        prevBtn: document.getElementById('prev-btn'),
        nextBtn: document.getElementById('next-btn'),
        volumeSlider: document.getElementById('volume-slider'),
        songTitle: document.getElementById('song-title'),
        playerToggle: document.querySelector('.music-player-toggle'),
        playerContainer: document.querySelector('.player-container'),
        loopBtn: document.getElementById('loop-btn'),
        shuffleBtn: document.getElementById('shuffle-btn'),
        fallbackPlayer: document.getElementById('fallback-player'),
        fallbackAudioPlayer: document.getElementById('fallback-audio-player'),
        currentSongIndex: 0,
        isPlaying: false,
        isLooping: false,
        isShuffling: false,
        useFallbackPlayer: false,
        originalSongs: [],
        songs: [
            {
                title: 'Morning Lofi',
                url: 'music/morning-lofi.mp3'
            },
            {
                title: 'Lofi Background Working',
                url: 'music/lofi-background-working.mp3'
            },
            {
                title: 'Coverless Book Lofi',
                url: 'music/coverless-book-lofi.mp3'
            },
            {
                title: 'Lucky Chesming Lofi',
                url: 'music/lucky-chesming-lofi-1.mp3'
            },
            {
                title: 'Good Night Lofi Cozy Chill',
                url: 'music/good-night-lofi-cozy-chill.mp3'
            },
            {
                title: 'Lofi Background Music',
                url: 'music/lofi-background-music.mp3'
            }
        ],

        init: function() {
            // Store original song order
            this.originalSongs = [...this.songs];
            
            this.loadSong(this.currentSongIndex);
            this.setupEventListeners();
            
            // Set initial volume
            const initialVolume = this.volumeSlider.value;
            this.audioPlayer.volume = initialVolume;
            this.fallbackAudioPlayer.volume = initialVolume;
            
            // Check if user has preferences stored
            const playerOpen = localStorage.getItem('musicPlayerOpen') === 'true';
            const savedVolume = localStorage.getItem('musicPlayerVolume');
            const lastSongIndex = localStorage.getItem('musicPlayerLastSong');
            const loopMode = localStorage.getItem('musicPlayerLoop') === 'true';
            const shuffleMode = localStorage.getItem('musicPlayerShuffle') === 'true';
            
            if (playerOpen) {
                this.playerContainer.classList.add('active');
            }
            
            if (savedVolume) {
                this.volumeSlider.value = savedVolume;
                this.audioPlayer.volume = savedVolume;
                this.fallbackAudioPlayer.volume = savedVolume;
            }
            
            if (lastSongIndex && !isNaN(parseInt(lastSongIndex)) && parseInt(lastSongIndex) < this.songs.length) {
                this.currentSongIndex = parseInt(lastSongIndex);
                this.loadSong(this.currentSongIndex);
            }

            // Set loop state
            if (loopMode) {
                this.isLooping = true;
                this.loopBtn.classList.add('active');
                this.audioPlayer.loop = true;
            }
            
            // Set shuffle state
            if (shuffleMode) {
                this.isShuffling = true;
                this.shuffleBtn.classList.add('active');
                this.shuffleSongs();
            }

            // Add pulse animation to toggle button to indicate music is ready
            this.playerToggle.classList.add('pulse');
        },

        setupEventListeners: function() {
            // Toggle player
            this.playerToggle.addEventListener('click', () => {
                this.playerContainer.classList.toggle('active');
                localStorage.setItem('musicPlayerOpen', this.playerContainer.classList.contains('active'));
                
                // Auto play when opening for the first time
                if (this.playerContainer.classList.contains('active') && !this.isPlaying && !this.hasPlayedBefore) {
                    setTimeout(() => {
                        this.playSong();
                        this.hasPlayedBefore = true;
                    }, 300);
                }
            });

            // Play/Pause
            this.playBtn.addEventListener('click', () => {
                if (this.isPlaying) {
                    this.pauseSong();
                } else {
                    this.playSong();
                }
            });

            // Previous song
            this.prevBtn.addEventListener('click', () => {
                this.currentSongIndex--;
                if (this.currentSongIndex < 0) {
                    this.currentSongIndex = this.songs.length - 1;
                }
                this.loadSong(this.currentSongIndex);
                localStorage.setItem('musicPlayerLastSong', this.currentSongIndex);
                
                if (this.isPlaying) {
                    this.playSong();
                }
            });

            // Next song
            this.nextBtn.addEventListener('click', () => {
                this.currentSongIndex++;
                if (this.currentSongIndex > this.songs.length - 1) {
                    this.currentSongIndex = 0;
                }
                this.loadSong(this.currentSongIndex);
                localStorage.setItem('musicPlayerLastSong', this.currentSongIndex);
                
                if (this.isPlaying) {
                    this.playSong();
                }
            });

            // Loop toggle
            this.loopBtn.addEventListener('click', () => {
                this.isLooping = !this.isLooping;
                
                // Set loop for appropriate player
                if (this.useFallbackPlayer) {
                    this.fallbackAudioPlayer.loop = this.isLooping;
                } else {
                    this.audioPlayer.loop = this.isLooping;
                }
                
                this.loopBtn.classList.toggle('active');
                localStorage.setItem('musicPlayerLoop', this.isLooping);
                
                // Visual feedback
                if (this.isLooping) {
                    this.loopBtn.style.color = 'var(--primary-color)';
                } else {
                    this.loopBtn.style.color = '';
                }
            });
            
            // Shuffle toggle
            this.shuffleBtn.addEventListener('click', () => {
                this.isShuffling = !this.isShuffling;
                this.shuffleBtn.classList.toggle('active');
                localStorage.setItem('musicPlayerShuffle', this.isShuffling);
                
                if (this.isShuffling) {
                    this.shuffleBtn.style.color = 'var(--primary-color)';
                    this.shuffleSongs();
                } else {
                    this.shuffleBtn.style.color = '';
                    // Restore original order
                    const currentSong = this.songs[this.currentSongIndex];
                    this.songs = [...this.originalSongs];
                    // Find current song in original order
                    this.currentSongIndex = this.songs.findIndex(song => song.url === currentSong.url);
                    if (this.currentSongIndex === -1) this.currentSongIndex = 0;
                }
            });

            // Volume control
            this.volumeSlider.addEventListener('input', () => {
                const volume = this.volumeSlider.value;
                this.audioPlayer.volume = volume;
                this.fallbackAudioPlayer.volume = volume;
                localStorage.setItem('musicPlayerVolume', volume);
            });

            // Auto-play next song when current one ends (if not looping a single track)
            this.audioPlayer.addEventListener('ended', () => {
                if (!this.isLooping) {
                    this.currentSongIndex++;
                    if (this.currentSongIndex > this.songs.length - 1) {
                        this.currentSongIndex = 0;
                    }
                    this.loadSong(this.currentSongIndex);
                    localStorage.setItem('musicPlayerLastSong', this.currentSongIndex);
                    this.playSong();
                }
            });

            // Update button state when audio is loaded
            this.audioPlayer.addEventListener('canplay', () => {
                this.playBtn.disabled = false;
            });
            
            // Show loading state
            this.audioPlayer.addEventListener('waiting', () => {
                this.playBtn.disabled = true;
                this.songTitle.textContent = 'Loading...';
            });

            // Add error event listener for audio loading
            this.audioPlayer.addEventListener('error', (e) => {
                console.error('Audio Error:', e);
                
                // Get error details
                const error = e.target.error;
                let errorText = 'Error loading audio';
                
                if (error) {
                    switch (error.code) {
                        case error.MEDIA_ERR_ABORTED:
                            errorText = 'You aborted the audio playback';
                            break;
                        case error.MEDIA_ERR_NETWORK:
                            errorText = 'Network error while loading audio';
                            break;
                        case error.MEDIA_ERR_DECODE:
                            errorText = 'Audio decoding error';
                            break;
                        case error.MEDIA_ERR_SRC_NOT_SUPPORTED:
                            errorText = 'Audio format not supported';
                            break;
                        default:
                            errorText = 'Unknown audio error';
                            break;
                    }
                }
                
                console.error(errorText, this.audioPlayer.src);
                
                // Show error details in player
                this.songTitle.textContent = 'Error loading audio';
                this.songTitle.style.color = 'red';
                
                // Switch to fallback player after multiple errors
                if (!this.useFallbackPlayer) {
                    // Try next song if not looping
                    if (!this.isLooping) {
                        setTimeout(() => {
                            this.nextBtn.click();
                        }, 2000);
                    }
                    
                    // Track error count for this session
                    if (!this.errorCount) this.errorCount = 0;
                    this.errorCount++;
                    
                    // After 2 errors, switch to fallback player
                    if (this.errorCount >= 2) {
                        this.useFallbackPlayer = true;
                        this.fallbackPlayer.style.display = 'block';
                        
                        // Set current song on fallback player
                        const song = this.songs[this.currentSongIndex];
                        this.fallbackAudioPlayer.src = new URL(song.url, window.location.href).href;
                        this.fallbackAudioPlayer.load();
                        
                        // Add message
                        this.songTitle.textContent = 'Using fallback player - ' + song.title;
                        this.songTitle.style.color = '';
                        
                        // Try to play with fallback
                        this.fallbackAudioPlayer.play()
                            .catch(err => console.error('Fallback player error:', err));
                    }
                } else {
                    // Already using fallback player, update it
                    const song = this.songs[this.currentSongIndex];
                    this.fallbackAudioPlayer.src = new URL(song.url, window.location.href).href;
                    this.fallbackAudioPlayer.load();
                    this.songTitle.textContent = 'Using fallback player - ' + song.title;
                    this.songTitle.style.color = '';
                }
            });

            // Add event listeners for fallback player
            this.fallbackAudioPlayer.addEventListener('ended', () => {
                if (!this.isLooping) {
                    this.currentSongIndex++;
                    if (this.currentSongIndex > this.songs.length - 1) {
                        this.currentSongIndex = 0;
                    }
                    this.loadSong(this.currentSongIndex);
                    localStorage.setItem('musicPlayerLastSong', this.currentSongIndex);
                    this.playSong();
                }
            });
        },
        
        shuffleSongs: function() {
            // Save current song
            const currentSong = this.songs[this.currentSongIndex];
            
            // Fisher-Yates shuffle algorithm
            const shuffled = [...this.songs];
            for (let i = shuffled.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
            }
            
            this.songs = shuffled;
            
            // Find current song in new order
            this.currentSongIndex = this.songs.findIndex(song => song.url === currentSong.url);
            if (this.currentSongIndex === -1) this.currentSongIndex = 0;
        },

        loadSong: function(index) {
            try {
                const song = this.songs[index];
                console.log('Loading song:', song);
                
                // Reset any previous error styles
                this.songTitle.style.color = '';
                
                // Construct absolute URL to ensure correct path
                const absoluteUrl = new URL(song.url, window.location.href).href;
                console.log('Absolute URL:', absoluteUrl);
                
                if (this.useFallbackPlayer) {
                    // Update fallback player
                    this.fallbackAudioPlayer.src = absoluteUrl;
                    this.fallbackAudioPlayer.load();
                    this.songTitle.textContent = 'Using fallback player - ' + song.title;
                } else {
                    // Update title for main player
                    this.songTitle.textContent = song.title;
                    
                    // Set the source
                    this.audioPlayer.src = absoluteUrl;
                    
                    // Explicitly load the audio
                    this.audioPlayer.load();
                    
                    // Maintain loop state
                    this.audioPlayer.loop = this.isLooping;
                }
                
                // Add visual feedback when switching songs
                this.songTitle.classList.add('loading');
                setTimeout(() => {
                    this.songTitle.classList.remove('loading');
                }, 800);
            } catch (error) {
                console.error('Error in loadSong:', error);
            }
        },

        playSong: function() {
            try {
                // Remove the fa-play class
                this.playBtn.querySelector('i').classList.remove('fa-play');
                // Add the fa-pause class
                this.playBtn.querySelector('i').classList.add('fa-pause');
                
                // Use appropriate player
                if (this.useFallbackPlayer) {
                    console.log('Using fallback player to play:', this.fallbackAudioPlayer.src);
                    this.fallbackAudioPlayer.play()
                        .then(() => {
                            this.isPlaying = true;
                            // Change toggle icon to show music is playing
                            this.playerToggle.querySelector('i').classList.remove('fa-music');
                            this.playerToggle.querySelector('i').classList.add('fa-volume-up');
                        })
                        .catch(error => {
                            console.error('Fallback player error:', error);
                            this.playBtn.querySelector('i').classList.remove('fa-pause');
                            this.playBtn.querySelector('i').classList.add('fa-play');
                        });
                    return;
                }
                
                console.log('Attempting to play:', this.audioPlayer.src);
                
                // Check if audio is actually loaded
                if (this.audioPlayer.readyState === 0) {
                    console.log('Audio not loaded yet, reloading...');
                    this.audioPlayer.load();
                }
                
                // Play promise with proper error handling
                const playPromise = this.audioPlayer.play();
                
                if (playPromise !== undefined) {
                    playPromise
                        .then(() => {
                            console.log('Playback started successfully');
                            this.isPlaying = true;
                            // Change toggle icon to show music is playing
                            this.playerToggle.querySelector('i').classList.remove('fa-music');
                            this.playerToggle.querySelector('i').classList.add('fa-volume-up');
                        })
                        .catch(error => {
                            console.error('Error playing audio:', error);
                            // Reset to play icon if there was an error
                            this.playBtn.querySelector('i').classList.remove('fa-pause');
                            this.playBtn.querySelector('i').classList.add('fa-play');
                            
                            // More specific error messages
                            if (error.name === 'NotAllowedError') {
                                alert('Playback was blocked. Please interact with the page first to enable audio.');
                            } else if (error.name === 'NotSupportedError') {
                                alert('This audio format is not supported by your browser.');
                            }
                        });
                } else {
                    console.log('Play promise is undefined, older browser?');
                    this.isPlaying = true;
                }
            } catch (error) {
                console.error('Unexpected error in playSong:', error);
            }
        },

        pauseSong: function() {
            // Remove the fa-pause class
            this.playBtn.querySelector('i').classList.remove('fa-pause');
            // Add the fa-play class
            this.playBtn.querySelector('i').classList.add('fa-play');
            
            // Use appropriate player
            if (this.useFallbackPlayer) {
                this.fallbackAudioPlayer.pause();
            } else {
                this.audioPlayer.pause();
            }
            
            this.isPlaying = false;
            
            // Change toggle icon back to music
            this.playerToggle.querySelector('i').classList.remove('fa-volume-up');
            this.playerToggle.querySelector('i').classList.add('fa-music');
        }
    };

    // Initialize music player
    musicPlayer.init();

    // Mobile Navigation Toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
            });
        });
    }

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 60,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Handle image loading errors
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            // If GitHub stats images fail to load, show a message
            if (this.src.includes('github-readme-stats') || 
                this.src.includes('github-readme-activity-graph') ||
                this.src.includes('github-readme-streak-stats')) {
                const parent = this.parentElement;
                if (parent) {
                    const message = document.createElement('p');
                    message.textContent = 'GitHub stats currently unavailable. Please check back later.';
                    message.style.padding = '20px';
                    message.style.color = '#666';
                    parent.replaceChild(message, this);
                }
            }
        });
    });
}); 