const INPUT = document.getElementById('name')
const MAIN = document.querySelector('main')
const RESULT = document.getElementById('result')
const FORM = document.querySelector('form')

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
let back = document.getElementById('back')

// carrega informações do octocat na página inicial
window.addEventListener('DOMContentLoaded', () => {
  fetch('https://api.github.com/users/octocat')
    .then(response => {return response.json()})
    .then(data => {
      checagens(data)
    }
    )
})

FORM.addEventListener('submit', (e) => {
  e.preventDefault()
  fetch(`https://api.github.com/users/${INPUT.value}`)
  .then(response => response.json())
  .then(data => {
    console.log(data)
    INPUT.value = ''
    checagens(data)
    // Aqui você pode lidar com os dados retornados pela API
  })
  .catch(error => {
    console.error('Ocorreu um erro:', error);
  });
})

theme.addEventListener('click', (e) => {
  e.preventDefault()
  changeTheme()
})

back.addEventListener('click', (e) => {
  e.preventDefault()
  fetch('https://api.github.com/users/octocat')
    .then(response => {return response.json()})
    .then(data => {
      checagens(data)
    }
    )
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

function checagens(data) {
  let date = new Date(data.created_at)
  let day = date.getDate().toString().padStart(2, '0')
  let month = (date.getMonth()+1).toString()
  let year = date.getFullYear()
  //checa se o usuário existe
  if(data.message === 'Not Found') {
    RESULT.innerHTML = 'No results'
  } else {
    RESULT.innerHTML = ''
    image.src = `${data.avatar_url}`
    user.innerHTML = `${data.name}`
    join.innerHTML = `Joined ${day} ${months[parseInt(month)]} ${year}`
    nickname.innerHTML = `@${data.login}`
    repos.innerHTML = `${data.public_repos}`
    followers.innerHTML = `${data.followers}`
    following.innerHTML = `${data.following}`
  }
  //checa se o usuário tem bio
  if(data.bio === null || data.message === 'Not Found') {
    bio.classList.add('opacity')
    bio.innerHTML = 'This profile has no bio'
  } else {
    bio.innerHTML = `${data.bio}`
  }
  //checa se o usuário tem localização
  if(data.location === null || data.message === 'Not Found') {
    city.classList.add('opacity')
    city.innerHTML = 'Not Available'
  } else {
    city.innerHTML = `${data.location}`
  }
  //checa se o usuário tem site
  if(data.html_url === null || data.message === 'Not Found') {
    site.classList.add('opacity')
    site.innerHTML = 'Not Available'
  } else {
    site.setAttribute('href', `${data.html_url}`)
    site.innerHTML = `${data.html_url}`
  }
  //checa se o usuário tem twitter
  if(data.twitter_username === null || data.message === 'Not Found') {
    twitter.classList.add('opacity')
    twitter.innerHTML = 'Not Available'
  } else {
    twitter.innerHTML = `${data.twitter_username}`
  }
  //checa se o usuário tem companhia
  if(data.company === null || data.message === 'Not Found') {
    company.classList.add('opacity')
    company.innerHTML = 'Not Available'
  } else {
    company.innerHTML = `${data.company}`
  }
}

function changeTheme() {
  main.classList.toggle('dark-theme-main-nav')
  nav.classList.toggle('dark-theme-main-nav')
  body.classList.toggle('dark-theme-body')
  infos.classList.toggle('dark-theme-body')
  nickname.classList.toggle('ligth-theme-login')
  INPUT.classList.toggle('dark-theme-main-nav')
  for(let i = 0; i < letters.length; i++) {
    letters[i].classList.toggle('dark-theme-icons-letter')
  }
  if(theme.innerHTML === 'Ligth') {
    theme.innerText = 'Dark'
  } else if(theme.innerHTML === 'Dark'){
    theme.innerText = 'Ligth'
  }
}
