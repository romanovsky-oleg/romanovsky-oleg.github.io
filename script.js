'use strict'

const app = document.querySelector('#app')
const lightbox = document.querySelector('#lightbox')
const lightboxImg = document.createElement('img')
lightbox.querySelector('p').appendChild(lightboxImg);
const images = []
const pagefile = '/pages/' + (location.search.slice(1) || 'home') + '.md'

const xhr = new XMLHttpRequest()
xhr.open('GET', pagefile)
xhr.onload = () => {
  app.innerHTML = marked.parse(xhr.response, { gfm: true, breaks: true  })
  app.querySelectorAll('img').forEach(img => {
		images.push(img.src)
		img.addEventListener('click', toggleLightbox)
  })
  document.querySelector('hr')?.scrollIntoView()
}
xhr.send()

function toggleLightbox(...args) {
  console.log(this,...args)
  lightbox.style.display = null
  lightboxImg.src = this.src
}
lightbox.onclick = () => lightbox.style.display = 'none'
window.addEventListener('keyup', e => { console.log(e.key); switch (e.key) {
  case 'Escape':
    lightbox.style.display = 'none'
    break
  case 'ArrowRight':
    if (!lightbox.style.display) {
      console.log(
        images.indexOf(lightboxImg.src),
        (images.indexOf(lightboxImg.src) + 1) % images.length,
        images[(images.indexOf(lightboxImg.src) + 1) % images.length])
      lightboxImg.src = images[(images.indexOf(lightboxImg.src) + 1) % images.length]
    } break
  case 'ArrowLeft':
    if (!lightbox.style.display) {
      console.log(
        images.indexOf(lightboxImg.src),
        (images.indexOf(lightboxImg.src) + images.length - 1) % images.length,
        images[(images.indexOf(lightboxImg.src) + images.length - 1) % images.length])
      lightboxImg.src = images[(images.indexOf(lightboxImg.src) + images.length - 1) % images.length]
    } break
}})


document.querySelectorAll('nav > *').forEach(a => {
  if (a.href === String(location)) {
    a.classList.add('active')
    document.title += ' | ' + a.textContent
  }
})