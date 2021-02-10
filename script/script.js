class Video {
    constructor(obj) {
        this.videoContainer = document.querySelector(obj.video);
        this.video = this.videoContainer.querySelector('.video');
        this.controls = this.videoContainer.querySelector('.video_controls');
        this.playBtn = this.controls.querySelector('.play_btn');
        this.bottomPlayBtn = this.controls.querySelector('.bottom__play_btn');
        this.playBar = this.controls.querySelector('.play_bar__input');
        this.timer = this.controls.querySelector('.bottom__timer');
        this.volume = this.controls.querySelectorAll('.volume_icons span');
        this.volumeInput = this.controls.querySelector('.volume_input');
        this.video.volume = 0.5;
        this.playBtn.addEventListener('click', () => {
            this.videoPlay();

        })

        this.bottomPlayBtn.addEventListener('click', () => {
            this.videoPlay();
        })
        this.playBar.addEventListener('input', () => {
            this.videoChange(this.playBar.value);
        })
        this.video.addEventListener('timeupdate', () => {
            this.playBar.value = this.video.currentTime / this.video.duration * 100;
            this.timerChange();
            if (this.video.currentTime == this.video.duration) {
                document.querySelectorAll('.pause_icon')[0].classList.remove('active');
                document.querySelectorAll('.play_icon')[0].classList.add('active');
                document.querySelectorAll('.pause_icon')[1].classList.remove('active');
                document.querySelectorAll('.play_icon')[1].classList.add('active');
            }
        })
        for (let j = 0; j < this.volume.length; j++) {
            this.volume[j].addEventListener('click', () => {
                this.volumeChange();

            })
        }

        this.volumeInput.addEventListener('input', () => {
            this.volumeInputChange(this.volumeInput.value);
        })

    }

    videoPlay() {
        if (this.video.paused) {
            this.video.play();
            document.querySelectorAll('.play_icon')[0].classList.remove('active');
            document.querySelectorAll('.pause_icon')[0].classList.add('active');
            document.querySelectorAll('.play_icon')[1].classList.remove('active');
            document.querySelectorAll('.pause_icon')[1].classList.add('active');
        }
        else {
            this.video.pause();
            document.querySelectorAll('.pause_icon')[0].classList.remove('active');
            document.querySelectorAll('.play_icon')[0].classList.add('active');
            document.querySelectorAll('.pause_icon')[1].classList.remove('active');
            document.querySelectorAll('.play_icon')[1].classList.add('active');
        }
    }
    videoChange(value) {
        this.video.currentTime = value * this.video.duration / 100;
    }
    timerChange() {
        var duration = this.video.duration;
        var current = this.video.currentTime;
        var format = this.timeFormat(current) + ' / ' + this.timeFormat(duration);
        this.timer.innerHTML = format;
    }
    timeFormat(time) {
        var hour = Math.floor(time / 3600);
        if (hour < 10) {
            hour = '0' + hour;
        }
        var min = Math.floor((time % 3600) / 60);
        if (min < 10) {
            min = '0' + min;
        }
        var sec = Math.floor(time % 3600 % 60);
        if (sec < 10) {
            sec = '0' + sec;
        }
        return hour + ':' + min + ':' + sec
    }
    volumeChange() {
        if (this.video.volume == 0) {
            this.video.volume = 0.5;
            this.volumeInput.value = 50;
            for (let i = 0; i < this.volume.length; i++) {
                this.volume[i].classList.remove('active');
            }
            this.volume[1].classList.add('active');
        }
        else {
            this.video.volume = 0;
            this.volumeInput.value = 0;
            for (let i = 0; i < this.volume.length; i++) {
                this.volume[i].classList.remove('active');
            }
            this.volume[2].classList.add('active');

        }
    }
    volumeInputChange(value) {
        this.video.volume = value / 100;
        if (this.video.volume == 0) {
            for (let i = 0; i < this.volume.length; i++) {
                this.volume[i].classList.remove('active');
            }
            this.volume[2].classList.add('active');

        }
        else if (this.video.volume == 1) {
            for (let i = 0; i < this.volume.length; i++) {
                this.volume[i].classList.remove('active');
            }
            this.volume[0].classList.add('active');

        }
        else {
            for (let i = 0; i < this.volume.length; i++) {
                this.volume[i].classList.remove('active');
            }
            this.volume[1].classList.add('active');
        }
    }

};

var video1 = new Video({
    video: '.video_container',

})

// document.addEventListener('keydown', (e) => {
//     console.log(e.code);
//     if (e.code == 'Space') {
//         if (document.querySelector('.video').paused) {
//             document.querySelector('.video').play()
//             document.querySelector('.video_controls').style.display = 'none';
//         }
//         else {
//             document.querySelector('.video').pause()
//             document.querySelector('.video_controls').style.display = 'flex';
//         }
//     }
// })