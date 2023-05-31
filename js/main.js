const INPUT = document.getElementById('name')
const MAIN = document.querySelector('main')
const RESULT = document.getElementById('result')

let image = document.getElementById('image')
let join = document.getElementById('join')
let bio = document.getElementById('bio')
let user = document.getElementById('user')
let nickname = document.getElementById('nick')
let repos = document.getElementById('repos')
let followers = document.getElementById('followers')
let following = document.getElementById('following')
let city = document.getElementById('city')
let site = document.getElementById('site')
let twitter = document.getElementById('twitter')
let company = document.getElementById('company')
let body = document.querySelector('body')
let infos = document.querySelector('.infos_field')
let letters = document.querySelectorAll('.letter-icon')
let main = document.querySelector('main')
let nav = document.querySelector('nav')
let theme = document.getElementById('theme')

theme.addEventListener('click', (e) => {
  e.preventDefault()
  main.classList.toggle('dark-theme-main-nav')
  nav.classList.toggle('dark-theme-main-nav')
  body.classList.toggle('dark-theme-body')
  INPUT.classList.toggle('dark-theme-main-nav')
  infos.classList.toggle('dark-theme-body')
  nickname.classList.toggle('ligth-theme-login')
  for(let i = 0; i < letters.length; i++) {
    letters[i].classList.toggle('dark-theme-icons-letter')
  }
  if(theme.innerHTML === 'Ligth') {
    theme.innerText = 'Dark'
  } else if(theme.innerHTML === 'Dark'){
    theme.innerText = 'Ligth'
  }
})

let months = {
  1: 'Jan',
  2: 'Feb',
  3: 'Mar',
  4: 'Apr',
  5: 'May',
  6: 'June',
  7: 'July',
  8: 'Aug',
  9: 'Sept',
  10: 'Oct',
  11: 'Nov',
  12: 'Dec'
}

const FORM = document.querySelector('form').addEventListener('submit', (e) => {
  e.preventDefault()
  fetch(`https://api.github.com/users/${INPUT.value}`)
  .then(response => response.json())
  .then(data => {
    let date = new Date(data.created_at)
    let day = date.getDate().toString().padStart(2, '0')
    let month = (date.getMonth()+1).toString()
    let year = date.getFullYear()
    
    if(data.message === 'Not Found') {
      RESULT.innerHTML = 'No results'
    } else {
      RESULT.innerHTML = ''
      image.src = `${data.avatar_url}`
      user.innerHTML = `${data.name}`
      join.innerHTML = `Joined ${day} ${months[parseInt(month)]} ${year}`
      nickname.innerHTML = `@${data.login}`
      if(data.bio === null) {
        bio.classList.add('opacity')
        bio.innerHTML = 'This profile has no bio'
      } else {
        bio.innerHTML = `${data.bio}`
      }
      repos.innerHTML = `${data.public_repos}`
      followers.innerHTML = `${data.followers}`
      following.innerHTML = `${data.following}`
      if(data.location === null) {
        city.classList.add('opacity')
        city.innerHTML = 'Not Available'
      } else {
        city.innerHTML = `${data.location}`
      }
      if(data.html_url === null) {
        site.classList.add('opacity')
        site.innerHTML = 'Not Available'
      } else {
        site.setAttribute('href', `${data.html_url}`)
        site.innerHTML = `${data.html_url}`
      }
      if(data.twitter_username === null) {
        twitter.classList.add('opacity')
        twitter.innerHTML = 'Not Available'
      } else {
        twitter.innerHTML = `${data.twitter_username}`
      }
      if(data.company === null) {
        company.classList.add('opacity')
        company.innerHTML = 'Not Available'
      } else {
        company.innerHTML = `${data.company}`
      }
    }
    // Aqui você pode lidar com os dados retornados pela API
  })
  .catch(error => {
    console.error('Ocorreu um erro:', error);
  });
})