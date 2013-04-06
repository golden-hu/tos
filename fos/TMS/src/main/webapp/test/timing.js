var TimeCountDown = function(initTime){
    var day = 0;
    var hour = 0;
    var minute = 0;
    var second = 0;
    var timerId = 0;
    var self = this;
    var fixInitTime = function(){
        initTime = parseInt(initTime);
        if ( isNaN(initTime) || initTime < 0 ){
            initTime = 0;
        }
    };
    var fixZero = function(num){
        return num < 10 ? ('0'+num) : num;
    };
    var calc = function(){
        showCallback.call(self, [fixZero(day), fixZero(hour), fixZero(minute), fixZero(second)]);
        if ( day === 0 && hour === 0 && minute === 0 && second === 0){
            self.stop();
        } else {
            if (hour === 0 && day > 0){
                hour = 24;
                day--;
            }
            if (minute === 0 && hour > 0){
                minute = 60;
                hour--;
            }
            if (second === 0 && minute > 0){
                second = 59;
                minute--;
            } else {
                second--;
            }
            timerId = window.setTimeout(function(){
                calc();
            }, 1000);
        }
    };
    var showCallback = function(){
        alert('Please set show callback functions!');
    };
    var init = function(){
        fixInitTime();
        if ( initTime > 0 ){
            day = Math.floor( (initTime / (24*60*60)) );
            initTime -= day * 24*60*60;
            hour = Math.floor( initTime / (60*60) );
            initTime -= hour * 60*60;
            minute = Math.floor( initTime / 60 );
            second = initTime - minute * 60;
        }
    };
    this.start = function(){
        calc();
    };
    this.stop = function(){
        timerId && window.clearTimeout(timerId);
    };
    this.setShowCallback = function(fn){
        typeof(fn) == 'function' ? (showCallback = fn) : '';
    };
    init();
};