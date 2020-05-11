class Sound {

    // handle the sound, by name of the sound 
    audio(name) {
        var audio = new Audio(`/voice/${name}`);
        return audio
    }

    // win user win bet use this sound for play 
    winBet() {
        return this.audio('winbet.mp3').play();
    }

    // the sound for user hitting the bet
    betTing() {
        return this.audio('betChips.mp3').play();
    }

}
export default Sound = new Sound


