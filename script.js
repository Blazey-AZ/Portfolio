var tablinks = document.getElementsByClassName("tab-links")
var tabcontents  = document.getElementsByClassName("tab-contents")

function opentab(tabname){
    for(tablink of tablinks){
        tablink.classList.remove("active-links");
    }
    for(tabcontent of tabcontents){
        tabcontent.classList.remove("active-tab");
    }
event.currentTarget.classList.add("active-links");
document.getElementById(tabname).classList.add("active-tab");
}

// Slider
let items = document.querySelectorAll('.slider1 .item1');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
    
let active = 3;
function loadShow(){
    let stt = 0;
    items[active].style.transform = `none`;
    items[active].style.zIndex = 1;
    items[active].style.filter = 'none';
    items[active].style.opacity = 1;
    for(var i = active + 1; i < items.length; i++){
         stt++;
         items[i].style.transform = `translateX(${120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(-1deg)`;
         items[i].style.zIndex = -stt;
         items[i].style.filter = 'blur(5px)';
         items[i].style.opacity = stt > 2 ? 0 : 0.6;
        }
    stt = 0;
    for(var i = active - 1; i >= 0; i--){
         stt++;
         items[i].style.transform = `translateX(${-120*stt}px) scale(${1 - 0.2*stt}) perspective(16px) rotateY(1deg)`;
         items[i].style.zIndex = -stt;
         items[i].style.filter = 'blur(5px)';
         items[i].style.opacity = stt > 2 ? 0 : 0.6;
    }
}
loadShow();
next.onclick = function(){
    active = active + 1 < items.length ? active + 1 : active;
    loadShow();
}
prev.onclick = function(){
    active = active - 1 >= 0 ? active - 1 : active;
    loadShow();
}

// Sidemenu
var sidemenu = document.getElementById("sidemenu");

function openmenu(){
    sidemenu.style.right = "0";
}
function closemenu(){
    sidemenu.style.right = "-200px"
}
//Form Submitting
const scriptURL = 'https://script.google.com/macros/s/AKfycbwiclfm0M2kTNEovcPZXrHO0B8WcY--TC2YN6ba8LgqpF9yZTwtLhIobWJaJpVbsQVdtA/exec'
  const form = document.forms['submit-to-google-sheet']
  const msg = document.getElementById("msg")
  const dateInput = document.getElementById("currentDate");

  const setCurrentDate = () => {
      const now = new Date();
      const formattedDate = now.toLocaleString('en-US', { timeZone: 'IST' }); // Format as MM/DD/YYYY, HH:MM:SS AM/PM
      dateInput.value = formattedDate;
  };
  
  form.addEventListener('submit', e => {
      e.preventDefault();
      setCurrentDate(); 
      msg.innerHTML = "Submitting...";
      fetch(scriptURL, { method: 'POST', body: new FormData(form) })
          .then(response => {
              msg.innerHTML = "Message sent successfully!";
              setTimeout(() => {
                  msg.innerHTML = "";
              }, 2000);
              form.reset();
          })
          .catch(error => {
              console.error('Error!', error.message);
          });
  });

// Scroll To Top
const scrollToTopButton = document.getElementById("scrollToTop");

window.addEventListener("scroll", () => {
    if (window.scrollY > 100) {
        scrollToTopButton.style.display = "block";
    } else {
        scrollToTopButton.style.display = "none";
    }
});

scrollToTopButton.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});