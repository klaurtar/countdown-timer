//Start countdown script
const countDownVideo = (() => {


    //Save end date to a variable to be converted to UTC
    const end = new Date("April 22, 2020 10:30:00 -0500");
    

    //Save seconds per day, hour & minutes to variables for further calculations
    const secondsPerDay = 86400,
        secondsPerHour = 3600,
        secondsPerMinute = 60;


    //Save elements to be manipulated to variables
    const $countdown = document.getElementById("countdown"),
          $tileContainer = document.getElementById("tiles"),
          $eventWillBeginMessage = document.getElementById('videoBeginMessage'),
          $videoPlayer = document.getElementById('videoPlayer');
          


    //Create a flag to make a lesser scope for videos so they're not rerendered by timer
    let demoVideoDisplayed = 0;


    //Convert end date to UTC 
    let unixEnd = end.getTime();
    console.log("End Time video: " + unixEnd);
  

    //Initialize a timer variable
    var timer;


    //Create a function that does one thing if time is before the end date, and if it is past end date
    function showRemaining() {


        //Every second save the UTC value of right now to a variable
        let unixNow = new Date().getTime();


        //If our current time is the same time, or past the end date do this... 
        if (unixNow >= unixEnd) {
            

            //Stop the timer
            clearInterval(timer);


            //Set the "Event will start in" message's display to none to stop showing it
            $eventWillBeginMessage.style.display = "none";


            //Stop showing the countdown
            $countdown.style.display = "none";

            //Render the final playing video
            renderVideo($videoPlayer, "https://player.vimeo.com/video/213910349?autoplay=1");


            //console that time is over
            console.log("Time is over");
        } else {
            let remainTime = calcRemainTime(unixNow);
      

            //Show the countdown
            renderCountdown($tileContainer, remainTime);
            
      
            //If demo video is not on the page, add it to the page and add 1 to the flag so it is not constantly rerendered due to timer
            if (demoVideoDisplayed < 1) {

                renderVideo($videoPlayer, "https://player.vimeo.com/video/407743707");
                
                demoVideoDisplayed++;
            }
        }
    }


    //Run this code once every second
    timer = setInterval(showRemaining, 1000);


    //Create a function to show remaining time until end date
    function calcRemainTime(timeNow){

        //Difference between time now and time of end date in seconds
        let timeDifference = parseInt((unixEnd - timeNow) / 1000);
        // let timeDifferenceArr = [86400, 3600, 60];

        //Calculate the amount of days left until end date with remainder
        let howManyDays = Math.floor(timeDifference / secondsPerDay); // 9 days

        //Shave whole days off and work with hours remainder
        let remainHours = timeDifference - howManyDays * secondsPerDay;
        let howManyHours = Math.floor(remainHours / secondsPerHour); // 13 hours

        //Shave whole hours off and work with hours remainder
        let remainMinutes = remainHours - howManyHours * secondsPerHour; //18 min
        let howManyMinutes = Math.floor(remainMinutes / secondsPerMinute);

        let remainSeconds = remainMinutes - howManyMinutes * secondsPerMinute;

        return {
            days: howManyDays,
            hours: howManyHours,
            minutes: howManyMinutes,
            seconds: remainSeconds
        }
    }


    //Render video to the page
    function renderVideo(elem, url){
        return elem.innerHTML = `<div style="padding:56.25% 0 0 0;position:relative;"><iframe src=${url} frameborder="0" allow="autoplay; fullscreen" allowfullscreen style="position:absolute;top:0;left:0;width:100%;height:100%;"></iframe></div>`;
    }

    
    //Render a countdown timer to the page
    function renderCountdown(elem, remainTime){
        return elem.innerHTML = "<span>" + remainTime.days + "</span><span>" + remainTime.hours + "</span><span>" + remainTime.minutes + "</span><span>" + remainTime.seconds + "</span>"; 
    }


})();

