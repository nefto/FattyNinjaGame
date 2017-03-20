function regulateSound(){

    let soundButton = document.getElementById('soundBtn');
    let audioElement = document.getElementById('music');

    soundButton.addEventListener('click', function(){
        if(!audioElement.muted){
            audioElement.muted = true;
        }
        else{
            audioElement.muted = false;
        }
    });
}