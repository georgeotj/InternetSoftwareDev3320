$('a.back-to-top').click(() => {
  $(document.body).animate({ scrollTop: 0 }, 800);
  return false;
});

$(document).ready(() => {
  const windowHeight = $(window).height();
  if (windowHeight >= 0.15) {
    $('div.top-btn').css({ display: 'flex' });
  } else {
    $('div.top-btn').css({ display: 'none' });
  }
});
