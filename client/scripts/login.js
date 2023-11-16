import { loadCap } from './recaptcha.js'
import { createCookie } from './cookies.js'
import { InvalidCredentialsError } from './errors.js'

const loginModal = new bootstrap.Modal('#loginModal')

const { code } = loadCap()

const form = document.querySelector('form')

form.addEventListener('submit', async e => {
  document.querySelector('.recaptcha').classList.remove('error')
  e.preventDefault()

  const button = document.querySelector('button')
  button.classList.add('loading')
  button.innerHTML = '<i class="ph-bold ph-circle-notch now_loading"></i>'
  
  const formData = new FormData(form)
  
  const recaptchaResponse = formData.get('captchaResponse')
  if (recaptchaResponse.toUpperCase() !== code) {
    document.querySelector('.recaptcha').classList.add('error')

    loginModal.show()
    document.getElementById('loginModalTitle').innerHTML = "Erro: recaptcha Inválido!"
    document.getElementById('loginModalContent').innerHTML = `O código do recaptcha informado é diferente de ${code}! Tente novamente.`
  }
  else{
    const url = "http://localhost:1313/session"
    const body = {
      rm: Number(formData.get('rm')),
      password: formData.get('password')
    }
    const request = {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(body),
    }; 
    try {
      const response = await fetch(url, request)
      const data = await response.json()

      if (!response.ok && response.status === 401) {
        throw new InvalidCredentialsError()
      }

      const { token, actype } = data
  
      const expiresIn = 60 * 60 * 24 * 30 // 1 month
      createCookie('@sm-1.1.0/token', token, expiresIn)
      createCookie('@sm-1.1.0/user', actype, expiresIn)
      window.location.href = '/pages/calendar'
  
    } catch (error) {      
      loginModal.show()
      
      if (error instanceof InvalidCredentialsError) {
        document.getElementById('loginModalTitle').innerHTML = `Erro: ${error.message}!`
        document.getElementById('loginModalContent').innerHTML = "Suas credenciais de login estão erradas! Sua senha ou seu email podem estar incorretos"        
      }

    }
  }
  button.innerHTML = 'Entrar'
  document.querySelector('button').classList.remove('loading')
})