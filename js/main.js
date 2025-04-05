// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
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
            this.audioPlayer.volume = this.volumeSlider.value;
            
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
                this.audioPlayer.loop = this.isLooping;
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
                this.audioPlayer.volume = this.volumeSlider.value;
                localStorage.setItem('musicPlayerVolume', this.volumeSlider.value);
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
                const errorMessage = document.createElement('div');
                errorMessage.style.color = 'red';
                errorMessage.style.padding = '10px';
                errorMessage.style.marginTop = '10px';
                errorMessage.style.textAlign = 'center';
                errorMessage.style.fontSize = '0.8rem';
                
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
                
                errorMessage.textContent = errorText + ' - URL: ' + this.audioPlayer.src;
                console.error(errorText, this.audioPlayer.src);
                
                // Show error details in player
                this.songTitle.textContent = 'Error loading audio';
                this.songTitle.style.color = 'red';
                
                // Try next song if not looping
                if (!this.isLooping) {
                    setTimeout(() => {
                        this.nextBtn.click();
                    }, 2000);
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
                
                // Update title
                this.songTitle.textContent = song.title;
                
                // Construct absolute URL to ensure correct path
                const absoluteUrl = new URL(song.url, window.location.href).href;
                console.log('Absolute URL:', absoluteUrl);
                
                // Set the source
                this.audioPlayer.src = absoluteUrl;
                
                // Explicitly load the audio
                this.audioPlayer.load();
                
                // Maintain loop state
                this.audioPlayer.loop = this.isLooping;
                
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
            
            this.audioPlayer.pause();
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