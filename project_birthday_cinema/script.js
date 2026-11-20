// Tombol musik
const musicToggle = document.createElement("button");

musicToggle.id = "musicToggle";
musicToggle.innerHTML = "♫ Music On";

document.body.appendChild(musicToggle);

// Tombol mute / unmute
musicToggle.addEventListener("click", function () {
  if (bgMusic.paused) {
    bgMusic.play();
    musicToggle.innerHTML = "♫ Music On";
  } else {
    bgMusic.pause();
    musicToggle.innerHTML = "♫ Music Off";
  }
});

/* =========================================
   CINEMA — MIDNIGHT ROMANCE
========================================= */

/* =========================================
   CINEMA — CUSTOMER CONFIGURATION
========================================= */

const orderConfig = {
  // Nama orang yang berulang tahun
  name: "Kylie Jenner",

  // Tulisan kecil di atas Happy Birthday
  birthdayEyebrow: "A MOMENT MADE JUST FOR YOU",

  // Deskripsi di Birthday Scene
  birthdayDescription:
    "Today is not just another day.\nToday, the world celebrates you.",

  // Tanggal / tulisan kecil di surat
  letterDate: "A SPECIAL DAY · JUST FOR YOU",

  // Isi surat ulang tahun
  letterParagraphs: [
    "Happy Birthday to someone who makes life a little more beautiful.",

    "I hope this new chapter brings you endless happiness, beautiful memories, and all the love your heart deserves.",

    "No matter where life takes you, may you always remember how special you are.",

    "Today, tomorrow, and always, you deserve the very best.",
  ],

  // Penutup surat
  letterSignature: "With love, always.",

  // Ucapan kecil di Grand Finale
  finaleWish: "You deserve every beautiful thing in this world.",

  // Pesan utama Grand Finale
  finaleMessage:
    "May your days be filled with endless happiness,\nyour heart with beautiful memories,\nand your life with love that never fades.",

  musicPath: "music/Taylor Swift – august (Official Instrumental).mp3",

  backgroundPath: "images/background couple.jpg",
};

// Jangan hapus baris ini
const birthdayName = orderConfig.name;
/* =========================================
   CINEMA — ROMANTIC BACKGROUND MUSIC
========================================= */

const bgMusic = new Audio(orderConfig.musicPath);

bgMusic.loop = true;
bgMusic.volume = 0.35;

const intro = document.getElementById("intro");
const beginBtn = document.getElementById("beginBtn");

/* =========================================
   CINEMA — BIRTHDAY PASSCODE
========================================= */

// GANTI dengan tanggal lahir asli format DDMMYYYY
const correctPasscode = "03062003";

let enteredPasscode = "";
let passcodeUnlocked = false;

const passcodeOverlay = document.getElementById("passcodeOverlay");
const passcodeModal = document.querySelector(".passcode-modal");
const passcodeDots = document.querySelectorAll(".passcode-dot");
const passcodeMessage = document.getElementById("passcodeMessage");
const passcodeKeypad = document.getElementById("passcodeKeypad");
const passcodeDelete = document.getElementById("passcodeDelete");
const passcodeCancel = document.getElementById("passcodeCancel");

const wrongPasscodeMessages = [
  "Masa tanggal lahir sendiri aja lupa? 😭",
  "Yakin kenal sama orang ini?",
  "Waduh, bukan itu jawabannya bestie.",
  "Coba inget-inget lagi, jangan asal pencet wkwk.",
  "Dikit lagi... atau emang nggak tau? 🤨",
  "Access denied. Coba pake otak dikit 😌",
];

function updatePasscodeDots() {
  passcodeDots.forEach(function (dot, index) {
    dot.classList.toggle("filled", index < enteredPasscode.length);
  });
}

function resetPasscode() {
  enteredPasscode = "";
  updatePasscodeDots();
}

function checkPasscode() {
  if (enteredPasscode === correctPasscode) {
    passcodeUnlocked = true;

    passcodeMessage.textContent = "Access granted. Welcome ♡";

    // Cinematic unlock transition
    passcodeOverlay.classList.add("unlocking");
    passcodeModal.classList.add("unlocking");

    setTimeout(function () {
      passcodeOverlay.classList.remove("active");
      passcodeOverlay.classList.remove("unlocking");
      passcodeModal.classList.remove("unlocking");

      beginBtn.click();
    }, 850);
  } else {
    const randomMessage =
      wrongPasscodeMessages[
        Math.floor(Math.random() * wrongPasscodeMessages.length)
      ];

    passcodeMessage.textContent = randomMessage;

    passcodeModal.classList.remove("shake");
    void passcodeModal.offsetWidth;
    passcodeModal.classList.add("shake");

    resetPasscode();
  }
}

// Tombol angka
passcodeKeypad.addEventListener("click", function (event) {
  const key = event.target.closest("[data-key]");

  if (!key || enteredPasscode.length >= 8) return;

  enteredPasscode += key.dataset.key;

  updatePasscodeDots();

  if (enteredPasscode.length === 8) {
    setTimeout(checkPasscode, 250);
  }
});

// Tombol hapus angka
passcodeDelete.addEventListener("click", function () {
  enteredPasscode = enteredPasscode.slice(0, -1);

  updatePasscodeDots();
});

// Tombol cancel
passcodeCancel.addEventListener("click", function () {
  passcodeOverlay.classList.remove("active");

  resetPasscode();

  passcodeMessage.textContent = "Enter your birthday ♡";
});

beginBtn.addEventListener("click", function () {
  // Jika password belum benar, buka lock screen
  if (!passcodeUnlocked) {
    passcodeOverlay.classList.add("active");
    passcodeMessage.textContent = "Enter your birthday ♡";
    resetPasscode();
    return;
  }

  beginBtn.disabled = true;

  // Mulai background music
  bgMusic.play().catch(function (error) {
    console.log("Music playback blocked:", error);
  });

  // Fade out opening
  intro.style.transition = "opacity 1.2s ease";
  intro.style.opacity = "0";

  setTimeout(function () {
    // Hilangkan opening
    intro.style.display = "none";

    // Izinkan halaman terlihat
    document.body.style.overflow = "auto";

    // Buat scene kedua
    const nextScene = document.createElement("section");

    nextScene.className = "birthday-scene";

    nextScene.innerHTML = `
            <div class="scene-content">

               <p class="scene-eyebrow">
    ${orderConfig.birthdayEyebrow}
</p>

                <h2>
                    Happy Birthday,
                    <span>${birthdayName}</span>
                </h2>

                
<div class="scene-ornament">♡</div>

<p class="scene-description">
    ${orderConfig.birthdayDescription}
</p>

<div class="scroll-indicator">
    <span>SCROLL TO EXPLORE</span>
    <div class="scroll-arrow">↓</div>
</div>


            </div>
        `;

    document.body.appendChild(nextScene);

    /* =========================================
   CINEMA — SLOW CINEMATIC BIRTHDAY REVEAL
========================================= */

    const sceneEyebrow = nextScene.querySelector(".scene-eyebrow");
    const sceneTitle = nextScene.querySelector("h2");
    const sceneDescription = nextScene.querySelector(".scene-description");
    const sceneOrnament = nextScene.querySelector(".scene-ornament");
    const scrollIndicator = nextScene.querySelector(".scroll-indicator");

    const birthdayText = birthdayName;

    const descriptionText = orderConfig.birthdayDescription;

    // Initial state
    sceneEyebrow.textContent = "";
    sceneTitle.innerHTML = "";
    sceneDescription.textContent = "";

    sceneEyebrow.style.opacity = "0";
    sceneTitle.style.opacity = "0";
    sceneDescription.style.opacity = "0";
    sceneOrnament.style.opacity = "0";
    scrollIndicator.style.opacity = "0";

    // Typing function with controlled speed
    function cinematicTyping(element, text, speed, callback) {
      let index = 0;

      element.textContent = "";
      element.classList.add("typing-cursor");

      function typeNextCharacter() {
        if (index < text.length) {
          element.textContent += text.charAt(index);
          index++;

          setTimeout(typeNextCharacter, speed);
        } else {
          element.classList.remove("typing-cursor");

          if (callback) {
            setTimeout(callback, 900);
          }
        }
      }

      typeNextCharacter();
    }

    // Start cinematic sequence
    setTimeout(function () {
      // 1. Eyebrow reveal
      sceneEyebrow.style.transition = "opacity 1.5s ease";
      sceneEyebrow.style.opacity = "1";

      cinematicTyping(
        sceneEyebrow,
        orderConfig.birthdayEyebrow,
        90,
        function () {
          // 2. Happy Birthday reveal
          sceneTitle.style.transition = "opacity 1.5s ease";
          sceneTitle.style.opacity = "1";

          sceneTitle.innerHTML = "Happy Birthday, ";

          const nameSpan = document.createElement("span");
          sceneTitle.appendChild(nameSpan);

          cinematicTyping(nameSpan, birthdayText, 140, function () {
            // 3. Heart ornament reveal
            sceneOrnament.style.transition =
              "opacity 1.5s ease, transform 1.5s ease";

            sceneOrnament.style.opacity = "1";
            sceneOrnament.style.transform = "scale(1)";

            // 4. Description reveal
            setTimeout(function () {
              sceneDescription.style.transition = "opacity 1.5s ease";

              sceneDescription.style.opacity = "1";

              cinematicTyping(
                sceneDescription,
                descriptionText,
                65,
                function () {
                  // 5. Scroll indicator reveal
                  setTimeout(function () {
                    scrollIndicator.style.transition = "opacity 2s ease";

                    scrollIndicator.style.opacity = "1";
                  }, 1000);
                },
              );
            }, 1200);
          });
        },
      );
    }, 1800);

    // =====================================
    // CINEMATIC MEMORY GALLERY
    // =====================================

    const gallery = document.createElement("section");

    gallery.className = "memory-gallery";

    gallery.innerHTML = `
            <div class="gallery-header">

                <p class="gallery-eyebrow">
                    A COLLECTION OF MOMENTS
                </p>

                <h2>
                    Little Moments,<br>
                    <span>Beautiful Memories.</span>
                </h2>

                <p class="gallery-description">
                    Every picture holds a story.
                    <br>
                    Every memory holds a piece of you.
                </p>

            </div>

            <div class="gallery-grid">

                <div class="memory-card">
                    <div class="memory-image">
                        <img src="images/download.jpg"
                             alt="Memory One">
                    </div>

                    <p class="memory-number">01 — THE BEGINNING</p>

                    <p class="memory-caption">
                        A moment I wish could last forever.
                    </p>
                </div>

                <div class="memory-card">
                    <div class="memory-image">
                        <img src="images/download (1).jpg"
                             alt="Memory Two">
                    </div>

                    <p class="memory-number">02 — THE LITTLE THINGS</p>

                    <p class="memory-caption">
                        The simplest moments become the most beautiful.
                    </p>
                </div>

                <div class="memory-card">
                    <div class="memory-image">
                        <img src="images/download (2).jpg"
                             alt="Memory Three">
                    </div>

                    <p class="memory-number">03 — A MEMORY TO KEEP</p>

                    <p class="memory-caption">
                        Some memories will always have a special place.
                    </p>
                </div>

            </div>

            <div class="gallery-ending">
                <span>TO BE CONTINUED...</span>
                <div class="ending-heart">♡</div>
            </div>
        `;

    document.body.appendChild(gallery);

    // =====================================
    // CINEMATIC BIRTHDAY LETTER
    // =====================================

    const letterSection = document.createElement("section");

    letterSection.className = "birthday-letter";

    letterSection.innerHTML = `
            <div class="letter-container">

                <p class="letter-eyebrow">
                    A LETTER FROM THE HEART
                </p>

                <h2>
                    Words I <span>Never Want</span><br>
                    You to Forget.
                </h2>

                <div class="envelope-wrapper" id="envelopeWrapper">

    <div class="envelope">

        <!-- BACK ENVELOPE -->
        <div class="envelope-back"></div>

        <!-- LETTER INSIDE ENVELOPE -->
        <div class="letter-paper">

            <p class="letter-date">
                ${orderConfig.letterDate}
            </p>

            <h3>
                Dear ${birthdayName},
            </h3>

            
<div class="letter-message">
    ${orderConfig.letterParagraphs
      .map((paragraph) => `<p>${paragraph}</p>`)
      .join("")}
</div>


            
<div class="letter-signature">
    ${orderConfig.letterSignature}
    <span>♡</span>
</div>


        </div>

        <!-- FRONT ENVELOPE -->
        <div class="envelope-front"></div>

        <!-- ENVELOPE FLAP -->
        <div class="envelope-flap"></div>

    </div>

</div>

                <button class="letter-btn" id="letterBtn">
                    Open Your Letter ♡
                </button>

                <p class="letter-hint">
                    A little message, made with love.
                </p>

            </div>
        `;

    document.body.appendChild(letterSection);

    // LETTER OPENING INTERACTION

    const letterBtn = letterSection.querySelector("#letterBtn");
    const envelopeWrapper = letterSection.querySelector("#envelopeWrapper");
    const letterPaper = letterSection.querySelector(".letter-paper");

    /* =========================================
   CINEMA — DIRECT LETTER SCROLL
========================================= */

    letterPaper.addEventListener(
      "wheel",
      function (event) {
        if (!envelopeWrapper.classList.contains("opened")) {
          return;
        }

        const maxScroll = letterPaper.scrollHeight - letterPaper.clientHeight;

        if (maxScroll <= 0) {
          return;
        }

        event.preventDefault();
        event.stopPropagation();

        const scrollAmount = event.deltaY;

        letterPaper.scrollTop = Math.max(
          0,
          Math.min(maxScroll, letterPaper.scrollTop + scrollAmount),
        );
      },
      { passive: false },
    );

    letterBtn.addEventListener("click", function () {
      const isOpened = envelopeWrapper.classList.toggle("opened");

      if (isOpened) {
        letterBtn.textContent = "Close Letter ×";

        letterSection.classList.add("letter-active");
      } else {
        letterBtn.textContent = "Open Your Letter ♡";

        letterSection.classList.remove("letter-active");
      }
    });

    /* =========================================
   OUR MEMORIES IN MOTION — VIDEO SCENE
========================================= */

    const videoSection = document.createElement("section");
    videoSection.className = "memory-video-scene";

    videoSection.innerHTML = `
    <div class="memory-video-content">

        <p class="video-eyebrow">OUR MEMORIES IN MOTION</p>

        <h2>A Little Journey of Us ♡</h2>

        <p class="video-description">
            Some moments are too beautiful to be forgotten.
            Here's a little piece of our memories.
        </p>

        <div class="video-frame">
            <video id="memoryVideo" controls playsinline>
                <source src="videos/Aesthetic couple video.mp4" type="video/mp4">
                Your browser does not support video playback.
            </video>
        </div>

        <p id="videoEndingMessage" class="video-ending-message">
            Take your time. Let every memory play. ♡
        </p>

        <button id="continueFinaleBtn" disabled>
            Watch the Video First ♡
        </button>

    </div>
`;

    document.body.appendChild(videoSection);

    const memoryVideo = videoSection.querySelector("#memoryVideo");
    const continueFinaleBtn = videoSection.querySelector("#continueFinaleBtn");
    const videoEndingMessage = videoSection.querySelector(
      "#videoEndingMessage",
    );

    /* =========================================
   CINEMA — MIDNIGHT ROMANCE GRAND FINALE
========================================= */

    const finale = document.createElement("section");

    finale.className = "grand-finale";

    finale.innerHTML = `
    <div class="finale-stars"></div>

    <div class="finale-content">

        <p class="finale-eyebrow">
            AND FINALLY...
        </p>

        <div class="finale-heart">
            ♡
        </div>

        <h2>
            A Beautiful Soul,<br>
            <span>A Beautiful Life.</span>
        </h2>

        
<p class="finale-message">
    ${orderConfig.finaleMessage.replace(/\n/g, "<br>")}
</p>


        <div class="finale-divider">
            <span></span>
            ♡
            <span></span>
        </div>

        <p class="finale-wish">
            Happy Birthday, ${birthdayName}.
        </p>

        <p class="finale-small">
            ${orderConfig.finaleWish}
        </p>

        <button class="finale-btn" id="finaleBtn">
            One Last Moment ♡
        </button>

       
<p class="finale-last-message" id="finaleLastMessage">
    Some people make the world more beautiful
    just by being in it.
    <br><br>
    And you are one of them.
    <span>♡</span>
</p>

<!-- CINEMA — SURPRISE GIFT REVEAL -->
<div class="surprise-gift" id="surpriseGift">

    <p class="gift-eyebrow">
        A LITTLE SURPRISE FOR YOU
    </p>

    <button class="gift-box" id="giftBox" aria-label="Open your surprise gift">
        <div class="gift-lid">
            <div class="gift-bow"></div>
        </div>

        <div class="gift-base">
            <div class="gift-ribbon"></div>
        </div>
    </button>

    <p class="gift-instruction" id="giftInstruction">
        There's one last gift waiting for you ♡
    </p>

    <div class="gift-message" id="giftMessage">

        <div class="gift-message-heart">♡</div>

        <h3>
            A Little Something<br>
            Just For You.
        </h3>

        <p>
            If I could give you one thing in this world,
            it would be the ability to see yourself through my eyes.
        </p>

        <p>
            Because then you would understand how truly special you are. ♡
        </p>

    </div>

</div>

<div class="finale-footer">
    - Guntara Prihendana -
</div>

`;

    document.body.appendChild(finale);
    // Grand Finale disembunyikan sampai video selesai
    finale.style.visibility = "hidden";
    finale.style.opacity = "0";
    finale.style.pointerEvents = "none";

    /* =========================================
   VIDEO FINISHED — UNLOCK GRAND FINALE
========================================= */

    /* BGM pause saat video dimulai */
    memoryVideo.addEventListener("play", function () {
      bgMusic.pause();
    });

    /* BGM lanjut setelah video selesai */
    memoryVideo.addEventListener("ended", function () {
      bgMusic.play().catch(function () {
        console.log("Music playback blocked");
      });
    });

    memoryVideo.addEventListener("ended", function () {
      continueFinaleBtn.disabled = false;
      continueFinaleBtn.textContent = "Enter the Grand Finale ♡";

      videoEndingMessage.textContent =
        "And now, one last little surprise awaits you. ♡";
    });

    continueFinaleBtn.addEventListener("click", function () {
      if (memoryVideo.ended) {
        videoSection.style.display = "none";

        finale.style.visibility = "visible";
        finale.style.opacity = "1";
        finale.style.pointerEvents = "auto";

        // Aktifkan cinematic reveal
        finale.classList.remove("finale-enter");

        void finale.offsetWidth;

        finale.classList.add("finale-enter");

        finale.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });

    // Finale button interaction

    const finaleBtn = finale.querySelector("#finaleBtn");
    const finaleLastMessage = finale.querySelector("#finaleLastMessage");

    /* =========================================
   CINEMA — GIFT BOX OPENING
========================================= */

    const surpriseGift = finale.querySelector("#surpriseGift");
    const giftBox = finale.querySelector("#giftBox");
    const giftInstruction = finale.querySelector("#giftInstruction");

    giftBox.addEventListener("click", function () {
      const isOpened = surpriseGift.classList.toggle("gift-open");

      if (isOpened) {
        giftInstruction.textContent = "Your playlist is waiting for you ♡";
      } else {
        giftInstruction.textContent = "There's one last gift waiting for you ♡";
      }
    });

    /* =========================================
   CINEMA — SURPRISE PLAYLIST PLAYER
========================================= */

    const playlistTracks = [
      {
        title: "Yellow",
        artist: "Coldplay",
        src: "playlist/@coldplay - Yellow (Lyrics).mp3",
      },
      {
        title: "Perfect",
        artist: "Ed Sheeran",
        src: "playlist/Ed Sheeran - Perfect.mp3",
      },
      {
        title: "Heaven",
        artist: "Bryan Adams",
        src: "playlist/Heaven by Bryan Adams acoustic cover by Jada Facer & Dave Winkler.mp3",
      },
      {
        title: "All of Me",
        artist: "John Legend",
        src: "playlist/John Legend - All of Me (Lyrics).mp3",
      },
      {
        title: "Lover",
        artist: "Taylor Swift",
        src: "playlist/Taylor Swift - Lover.mp3",
      },
    ];

    let currentTrackIndex = 0;

    const playlistAudio = new Audio();
    playlistAudio.volume = 0.7;

    const playlistPlayer = document.createElement("div");
    playlistPlayer.className = "playlist-player";

    playlistPlayer.innerHTML = `
  <div class="playlist-cover">
    <img src="images/playlist-cover.jpg" alt="Playlist Cover">
  </div>

  <p class="playlist-label">A PLAYLIST MADE FOR YOU</p>

  <h3 id="playlistTitle">Song One</h3>

  <p id="playlistArtist">Artist One</p>

  <div class="playlist-controls">
    <button id="playlistPrev">⏮</button>
    <button id="playlistPlay">▶</button>
    <button id="playlistNext">⏭</button>
  </div>

  <div class="playlist-progress">
    <span id="playlistCurrentTime">0:00</span>

    <input
      type="range"
      id="playlistSeek"
      min="0"
      max="100"
      value="0"
    >

    <span id="playlistDuration">0:00</span>
  </div>
`;

    const giftMessage = finale.querySelector("#giftMessage");

    if (giftMessage) {
      giftMessage.appendChild(playlistPlayer);
    } else {
      console.error("Elemen #giftMessage tidak ditemukan!");
    }

    const playlistTitle = playlistPlayer.querySelector("#playlistTitle");
    const playlistArtist = playlistPlayer.querySelector("#playlistArtist");

    const playlistPlay = playlistPlayer.querySelector("#playlistPlay");
    const playlistPrev = playlistPlayer.querySelector("#playlistPrev");
    const playlistNext = playlistPlayer.querySelector("#playlistNext");

    const playlistSeek = playlistPlayer.querySelector("#playlistSeek");

    const playlistCurrentTime = playlistPlayer.querySelector(
      "#playlistCurrentTime",
    );

    const playlistDuration = playlistPlayer.querySelector("#playlistDuration");

    function formatPlaylistTime(seconds) {
      if (!Number.isFinite(seconds)) return "0:00";

      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);

      return `${minutes}:${String(remainingSeconds).padStart(2, "0")}`;
    }

    function loadPlaylistTrack(index) {
      currentTrackIndex =
        (index + playlistTracks.length) % playlistTracks.length;

      const track = playlistTracks[currentTrackIndex];

      playlistAudio.src = track.src;

      playlistTitle.textContent = track.title;
      playlistArtist.textContent = track.artist;

      playlistSeek.value = 0;
      playlistCurrentTime.textContent = "0:00";
      playlistDuration.textContent = "0:00";

      playlistPlay.textContent = "▶";
    }

    function playPlaylistTrack() {
      // Hentikan background music website
      bgMusic.pause();

      // Update tombol background music
      musicToggle.innerHTML = "♫ Music Off";

      playlistAudio
        .play()
        .then(function () {
          playlistPlay.textContent = "❚❚";
        })
        .catch(function (error) {
          console.log("Playlist playback error:", error);
        });
    }

    playlistPlay.addEventListener("click", function () {
      if (playlistAudio.paused) {
        playPlaylistTrack();
      } else {
        playlistAudio.pause();
        playlistPlay.textContent = "▶";

        // Lanjutkan background music website
        bgMusic
          .play()
          .then(function () {
            musicToggle.innerHTML = "♫ Music On";
          })
          .catch(function () {
            console.log("Background music playback blocked");
          });
      }
    });

    playlistNext.addEventListener("click", function () {
      loadPlaylistTrack(currentTrackIndex + 1);
      playPlaylistTrack();
    });

    playlistPrev.addEventListener("click", function () {
      if (playlistAudio.currentTime > 3) {
        playlistAudio.currentTime = 0;
      } else {
        loadPlaylistTrack(currentTrackIndex - 1);
        playPlaylistTrack();
      }
    });

    playlistAudio.addEventListener("loadedmetadata", function () {
      playlistDuration.textContent = formatPlaylistTime(playlistAudio.duration);
    });

    playlistAudio.addEventListener("timeupdate", function () {
      if (!playlistAudio.duration) return;

      playlistSeek.value =
        (playlistAudio.currentTime / playlistAudio.duration) * 100;

      playlistCurrentTime.textContent = formatPlaylistTime(
        playlistAudio.currentTime,
      );
    });

    playlistSeek.addEventListener("input", function () {
      if (!playlistAudio.duration) return;

      playlistAudio.currentTime =
        (playlistSeek.value / 100) * playlistAudio.duration;
    });

    playlistAudio.addEventListener("ended", function () {
      loadPlaylistTrack(currentTrackIndex + 1);
      playPlaylistTrack();
    });

    loadPlaylistTrack(0);

    finaleBtn.addEventListener("click", function () {
      const isRevealed = finale.classList.toggle("finale-revealed");

      if (isRevealed) {
        finaleBtn.textContent = "A Moment to Remember ♡";
      } else {
        finaleBtn.textContent = "One Last Moment ♡";
      }
    });

    // Animasi muncul
    requestAnimationFrame(function () {
      nextScene.classList.add("visible");
    });
  }, 1200);
});

/* =========================================
   CINEMA — FLOATING CHAMPAGNE PARTICLES
========================================= */

const particleCanvas = document.createElement("canvas");

particleCanvas.id = "cinemaParticles";

document.body.appendChild(particleCanvas);

const particleCtx = particleCanvas.getContext("2d");

let champagneParticles = [];

function resizeParticleCanvas() {
  particleCanvas.width = window.innerWidth;
  particleCanvas.height = window.innerHeight;

  const particleCount = window.innerWidth < 600 ? 35 : 65;

  champagneParticles = [];

  for (let i = 0; i < particleCount; i++) {
    champagneParticles.push({
      x: Math.random() * particleCanvas.width,
      y: Math.random() * particleCanvas.height,

      size: Math.random() * 2 + 0.5,

      speedY: Math.random() * 0.4 + 0.15,
      speedX: (Math.random() - 0.5) * 0.3,

      opacity: Math.random() * 0.6 + 0.2,

      twinkle: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2,
    });
  }
}

function animateChampagneParticles() {
  particleCtx.clearRect(0, 0, particleCanvas.width, particleCanvas.height);

  champagneParticles.forEach(function (particle) {
    particle.x += particle.speedX;
    particle.y -= particle.speedY;

    particle.phase += particle.twinkle;

    const glowOpacity =
      particle.opacity * (0.6 + Math.sin(particle.phase) * 0.4);

    particleCtx.beginPath();

    particleCtx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);

    particleCtx.fillStyle = `rgba(201, 154, 131, ${glowOpacity})`;

    particleCtx.shadowBlur = 8;

    particleCtx.shadowColor = "rgba(201, 154, 131, 0.5)";

    particleCtx.fill();

    particleCtx.shadowBlur = 0;

    // Jika partikel keluar layar, munculkan kembali
    if (particle.y < -10) {
      particle.y = particleCanvas.height + 10;

      particle.x = Math.random() * particleCanvas.width;
    }

    if (particle.x < -10) {
      particle.x = particleCanvas.width + 10;
    }

    if (particle.x > particleCanvas.width + 10) {
      particle.x = -10;
    }
  });

  requestAnimationFrame(animateChampagneParticles);
}

resizeParticleCanvas();

window.addEventListener("resize", resizeParticleCanvas);

animateChampagneParticles();
