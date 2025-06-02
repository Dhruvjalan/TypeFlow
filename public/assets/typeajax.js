$(document).ready(function(){

    $('form').on('submit', function(){
        console.log("Form Submitted")
        var levelSelection = 'form select[id="level"]'
        var timeSelection = 'form select[id="time"]'
        var keysSelection = 'form select[id="keys"]'
        var emphasisSelection = 'form select[id="emphasis"]'
        var randomSelection = 'form select[id="random"]'
        var selection= {
            "level": levelSelection.val(),
            "time":timeSelection.val() ,
            "keys":keysSelection.val() ,
            "emphasis":emphasisSelection.val() ,
            "random": randomSelection.val()
        }

        $.ajax({
        type: 'POST',
        url: '/typetest',
        data: selection,
        success: function(data){
          console.log(data);
          location.reload();
        }
      });

    })
    
    
    function submitTypeTest() {
        var item1 = $('#TypeInput')
        var resultObject = {"TypedText": item1.val()}

        window.location.href = '/typetest/result?TypedText=' + encodeURIComponent(resultObject.TypedText)
    }

    let timeLeft = 2 // change to 60
    let timerElement = document.getElementById('timer')
    let timer

    function startTimer() {
        timeLeft = 2 //change to 60
        timerElement.textContent = timeLeft
        clearInterval(timer)
        timer = setInterval(() => {
            timeLeft--
            timerElement.textContent = timeLeft
            if (timeLeft === 0) {
                clearInterval(timer)
                submitTypeTest()
            }

        }, 1000)
    
        
    }


    $('#startButton').on('click', startTimer)

})
