// Nav scroll
const nav = document.querySelector('.nav')
if (nav) {
  const onScroll = () => nav.classList.toggle('scrolled', window.scrollY > 40)
  window.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
}

// Mobile menu
const hamburger = document.querySelector('.nav-hamburger')
const mobileMenu = document.querySelector('.nav-mobile')
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    mobileMenu.classList.toggle('open')
    const spans = hamburger.querySelectorAll('span')
    const open = mobileMenu.classList.contains('open')
    if (spans[0]) spans[0].style.transform = open ? 'translateY(7px) rotate(45deg)' : ''
    if (spans[1]) spans[1].style.opacity = open ? '0' : '1'
    if (spans[2]) spans[2].style.transform = open ? 'translateY(-7px) rotate(-45deg)' : ''
  })
}

// Active nav link
const path = window.location.pathname
document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
  const href = a.getAttribute('href')
  if (href && href !== '/' && path.startsWith(href)) a.classList.add('active')
})

// Gallery: make every 5th item wide
document.querySelectorAll('.gallery-item').forEach((el, i) => {
  if (i % 5 === 0) el.classList.add('wide')
})
