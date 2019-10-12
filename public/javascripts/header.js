window.onscroll = function () { myFunction(); };

const header = document.getElementsByClassName('top-bar');
const sticky = header.offsetTop;

function myFunction() {
  if (window.pageYOffset > sticky) {
    header.classList.add('sticky');
  } else {
    header.classList.remove('sticky');
  }
}
