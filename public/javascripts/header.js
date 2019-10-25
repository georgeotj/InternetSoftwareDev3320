$('a.back-to-top').click(() => {
  $(document.body).animate({ scrollTop: 0 }, 800);
  return false;
});

function openTab(tabName) {
  let i;
  const activeTab = document.getElementById(tabName);
  const x = document.getElementsByClassName('container tab');
  for (i = 0; i < x.length; i++) {
    x[i].style.display = 'none';
  }
  activeTab.style.display = 'inline-flex';
  const tabLinks = document.getElementsByClassName('nav-link');
  const activeLink = document.getElementById(`${tabName}-link`);
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].className = tabLinks[i].className.replace(' active', '');
  }
  activeLink.className += ' active';
}

// $(document).ready(() => {
//   const windowHeight = $(window).height();
//   if (windowHeight >= 0.15) {
//     $('div.top-btn').css({ display: 'flex' });
//   } else {
//     $('div.top-btn').css({ display: 'none' });
//   }
// });
