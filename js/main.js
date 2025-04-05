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
        currentSongIndex: 0,
        isPlaying: false,
        songs: [
            {
                title: 'Lofi Study',
                url: 'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1b0292fc04.mp3?filename=lofi-study-112191.mp3'
            },
            {
                title: 'Morning Routine',
                url: 'https://cdn.pixabay.com/download/audio/2022/10/25/audio_946f4e562e.mp3?filename=morning-routine-128222.mp3'
            },
            {
                title: 'Lo-Fi Chill',
                url: 'https://cdn.pixabay.com/download/audio/2022/10/14/audio_4fb759a612.mp3?filename=lo-fi-chill-126348.mp3'
            },
            {
                title: 'Sweet Lofi',
                url: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_7c2a53bd4e.mp3?filename=sweet-lofi-120s-110307.mp3'
            },
            {
                title: 'Slow Lofi',
                url: 'https://cdn.pixabay.com/download/audio/2022/08/03/audio_884fe92c21.mp3?filename=slow-lofi-118548.mp3'
            }
        ],

        init: function() {
            this.loadSong(this.currentSongIndex);
            this.setupEventListeners();
            this.audioPlayer.volume = this.volumeSlider.value;
            
            // Check if user has preferences stored
            const playerOpen = localStorage.getItem('musicPlayerOpen') === 'true';
            const savedVolume = localStorage.getItem('musicPlayerVolume');
            const lastSongIndex = localStorage.getItem('musicPlayerLastSong');
            
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

            // Volume control
            this.volumeSlider.addEventListener('input', () => {
                this.audioPlayer.volume = this.volumeSlider.value;
                localStorage.setItem('musicPlayerVolume', this.volumeSlider.value);
            });

            // Auto-play next song when current one ends
            this.audioPlayer.addEventListener('ended', () => {
                this.currentSongIndex++;
                if (this.currentSongIndex > this.songs.length - 1) {
                    this.currentSongIndex = 0;
                }
                this.loadSong(this.currentSongIndex);
                localStorage.setItem('musicPlayerLastSong', this.currentSongIndex);
                this.playSong();
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
        },

        loadSong: function(index) {
            const song = this.songs[index];
            this.songTitle.textContent = song.title;
            this.audioPlayer.src = song.url;
            
            // Add visual feedback when switching songs
            this.songTitle.classList.add('loading');
            setTimeout(() => {
                this.songTitle.classList.remove('loading');
            }, 800);
        },

        playSong: function() {
            // Remove the fa-play class
            this.playBtn.querySelector('i').classList.remove('fa-play');
            // Add the fa-pause class
            this.playBtn.querySelector('i').classList.add('fa-pause');
            
            this.audioPlayer.play()
                .then(() => {
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
                });
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