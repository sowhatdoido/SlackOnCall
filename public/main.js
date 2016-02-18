var randomNumber = function (min, max)
{
    return Math.floor(Math.random()*(max-min+1)+min);
}

var setCallState = function(state){
    //state returns the number of active calls
    //can be used on frontend
    if(state > 0){
        $('body').addClass('active-call');
    } else {
        $('body').removeClass('active-call');
    }
}

var rerollBubble = function($element){
    var $this = $(this);
    if(typeof $element != 'number')
        $this = $element;
        
    var bubbleSize = randomNumber(15, 200) + 'px';
    $this.css({
        left: randomNumber(-15, 100) + '%',
        width: bubbleSize,
        height: bubbleSize,
        opacity: randomNumber(10, 50) * 0.01,
        'animation-delay': randomNumber(1, 5) + 's',
        'animation-duration': randomNumber(15, 55) + 's'
    });
};

$('.bubble')
    .each(rerollBubble);

socket.on('status', function(status){
    setCallState(status);
});