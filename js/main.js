// navbar function
function myMenuFunction(){
    var menuBtn=document.getElementById("myNavMenu");

     if(menuBtn.className==='nav_menu'){
        menuBtn.className+=" responsive";
     }else{
        menuBtn.className='nav_menu';
     }
}
// shadown on navigation bar on scrolling 
window.onscroll = function(){headerShadow()};

function headerShadow(){
   const navHeader = document.getElementById("header");

   if(document.body.scrollTop>50 || document.documentElement.scrollTop>50){
      navHeader.style.boxShadow="0 1px 6px rgba(0,0,0,0.1)";
      navHeader.style.height="70px";
      navHeader.style.lineHeight="70px";
   }else{
      navHeader.style.boxShadow="none";
      navHeader.style.height="90px";
      navHeader.style.lineHeight="90px";
   }
}

// typing effect

var typingEffect = new Typed(".typed_text",{
   strings : ["Designer","Developer","Coder"],
   loop : true,
   typeSpeed :100,
   backSpeed : 80,
   backDelay : 2000,
});

//  SCROLL REVEAL ANIMATION
const sr = ScrollReveal({
   origin: 'top',
   distance: '80px',
   duration: 2000,
   reset: true     
})


 /* -- HOME -- */
  sr.reveal('.featured_text_card',{})
  sr.reveal('.featured_name',{delay: 100})
  sr.reveal('.featured_text_info',{delay: 200})
  sr.reveal('.featured_text_btn',{delay: 200})
  sr.reveal('.social_icons',{delay: 200})
  sr.reveal('.featured_image',{delay: 300})

  
  sr.reveal('.top_header',{})
  const srLeft = ScrollReveal({
     origin: 'left',
     distance: '80px',
     duration: 2000,
     reset: true
   })
 
 srLeft.reveal('.about_info',{delay: 100})
 srLeft.reveal('.contact_info',{delay: 100})

 const srRight = ScrollReveal({
   origin: 'right',
   distance: '80px',
   duration: 2000,
   reset: true
 })
 
 srRight.reveal('.skills_box',{delay: 100})
 srRight.reveal('.form_control',{delay: 100})


  const sections = document.querySelectorAll('section[id]')
  function scrollActive() {
    const scrollY = window.scrollY;
    sections.forEach(current =>{
      const sectionHeight = current.offsetHeight,
          sectionTop = current.offsetTop - 50,
        sectionId = current.getAttribute('id')
      if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) { 
          document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.add('active_link')
      }  else {
        document.querySelector('.nav_menu a[href*=' + sectionId + ']').classList.remove('active_link')
      }
    })
  }
  window.addEventListener('scroll', scrollActive)



  document.getElementById("submit_btn").addEventListener("click", function sendEmail(event) {
   event.preventDefault(); // Prevent page reload

   // Capture input values
   const name = document.getElementById("Name").value;
   const email = document.getElementById("Email").value;
   const message = document.getElementById("Message").value;

   // EmailJS parameters
   const emailParams = {
       Name: name,
       Email: email,
       Message: message
   };

   // Send email using EmailJS
   emailjs.send("service_3d7klrn", "template_z0wudpu", emailParams)
   .then(function(response) {
       alert("Message sent successfully!");
   }, function(error) {
       alert("Failed to send message, please try again.");
   });
});



// Initialize Swiper







  

