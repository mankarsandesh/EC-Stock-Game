class Sound {
    audio(name) {
        var audio = new Audio(`/voice/${name}`);
        return audio
    }
    winBet() {
        return this.audio('winbet.mp3').play();
    }
    betTing() {
        return this.audio('bet-chips.mp3').play();
    }

}
export default Sound = new Sound