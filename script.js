document.addEventListener('DOMContentLoaded', function() {
    const timezoneList = document.getElementById('timezone-list');
    const dropdownButton = document.getElementById('dropdownMenuButton');
    const showTimeButton = document.getElementById('show-time-btn');
    const datetimeDisplay = document.querySelector('.datetime-display');
    const dateBox = document.getElementById('date-box');
    const timeBox = document.getElementById('time-box');
    let selectedTimezone = ''; 
  
    
    function toggleDropdown() {
      timezoneList.classList.toggle('show');
    }
  
    
    fetch('http://worldtimeapi.org/api/timezone')
      .then(response => response.json())
      .then(data => {
        data.forEach(timezone => {
          const listItem = document.createElement('li');
          listItem.textContent = timezone;
          listItem.addEventListener('click', function() {
            selectedTimezone = timezone;
            dropdownButton.textContent = timezone;
            toggleDropdown(); 
          });
          timezoneList.appendChild(listItem);
        });
      });
  
    
    dropdownButton.addEventListener('click', toggleDropdown);
  
    
    function updateTime() {
      if (selectedTimezone) {
        fetch(`http://worldtimeapi.org/api/timezone/${selectedTimezone}`)
          .then(response => response.json())
          .then(data => {
            const dateTimeString = data.datetime;
            const timeString = dateTimeString.split('T')[1].split('+')[0];
            let [hours, minutes, seconds] = timeString.split(':');
    
           
            seconds = seconds.split('.')[0];
    
           
            hours = Number(hours);
            minutes = Number(minutes);
    
            const formattedDate = new Date(dateTimeString).toLocaleDateString(undefined, { timeZone: selectedTimezone });
            const formattedTime = `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    
            dateBox.textContent = `Date: ${formattedDate}`;
            timeBox.textContent = `${formattedTime}`;
    
            updateAnalogClock(hours, minutes, seconds);
            datetimeDisplay.style.display = 'flex';
    
          })
          .catch(error => {
            dateBox.textContent = 'Date: Error loading date';
            timeBox.textContent = 'Time: Error loading time';
          });
      }
    }
    
    
    
    let intervalID;

showTimeButton.addEventListener('click', function() {
  clearInterval(intervalID); 
  updateTime(); 
  intervalID = setInterval(updateTime, 1000); 
});

    
    
    function updateAnalogClock(hours, minutes, seconds) {
      
      const hoursAngle = ((hours % 12) + minutes / 60) / 12 * 360;

      const minutesAngle = (minutes / 60) * 360;
      const secondsAngle = (seconds / 60) * 360;
    
    
      
      const hourHand = document.querySelector('.hour');
      const minuteHand = document.querySelector('.min');
      const secondHand = document.querySelector('.sec');
    
      hourHand.style.transform = `rotate(${hoursAngle}deg)`;
      minuteHand.style.transform = `rotate(${minutesAngle}deg)`;
      secondHand.style.transform = `rotate(${secondsAngle}deg)`;
    }
    
    
        
  
    
    window.onclick = function(event) {
      if (!event.target.matches('.dropbtn')) {
        var dropdowns = document.getElementsByClassName('dropdown-content');
        for (var i = 0; i < dropdowns.length; i++) {
          var openDropdown = dropdowns[i];
          if (openDropdown.classList.contains('show')) {
            openDropdown.classList.remove('show');
          }
        }
      }
    };
  });

  document.addEventListener('DOMContentLoaded', function() {
    const restartButton = document.getElementById('restart-btn');
  
    restartButton.addEventListener('click', function() {
      location.reload();
    });
  });

  function clockRunner() {
    const clockDisplay = document.getElementById("clock-display");
    const deg = 6;
    const hour = document.querySelector(".hour2");
    const min = document.querySelector(".min2");
    const sec = document.querySelector(".sec2");
  
    const updateTime = () => {
      const day = new Date();
      const hourValue = day.getHours();
      const minuteValue = day.getMinutes();
      const secondValue = day.getSeconds();
      const displayHour = (hourValue > 12) ? hourValue - 12 : hourValue;
      const formattedHour = displayHour.toString().padStart(2, "0");
      const formattedMinute = minuteValue.toString().padStart(2, "0");
      const formattedSecond = secondValue.toString().padStart(2, "0");
  
      clockDisplay.textContent = `${formattedHour}:${formattedMinute}:${formattedSecond} `;
  
      const hh = hourValue * 30 + minuteValue / 2;
      const mm = minuteValue * deg;
      const ss = secondValue * deg;
  
      hour.style.transform = `rotateZ(${hh}deg)`;
      min.style.transform = `rotateZ(${mm}deg)`;
      sec.style.transform = `rotateZ(${ss}deg)`;
    };
  
    updateTime();
  
    setInterval(updateTime, 1000);
  }
  
  clockRunner();
  