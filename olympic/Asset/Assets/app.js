
window.onscroll = function() {
    if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0 ) {
        document.getElementById('navbar').classList.add('scrolled');
    } else {
        document.getElementById('navbar').classList.remove('scrolled');
    }
}

// AOS
$(document).on('ready', function () {
    // initialization of aos
    AOS.init({
      duration: 650,
      once: true
    });
  });