$('a.back-to-top').click(() => {
  $(document.body).animate({ scrollTop: 0 }, 800);
  return false;
});

function openTab(tabName) {
  let tab;
  const activeTab = document.getElementById(tabName);
  const viewTabs = document.getElementsByClassName('container tab');
  for (tab = 0; tab < viewTabs.length; tab += 1) {
    viewTabs[tab].style.display = 'none';
  }
  activeTab.style.display = 'inline-flex';
  const tabLinks = document.getElementsByClassName('nav-link');
  const activeLink = document.getElementById(`${tabName}-link`);
  for (tab = 0; tab < tabLinks.length; tab += 1) {
    tabLinks[tab].className = tabLinks[tab].className.replace(' active', '');
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
