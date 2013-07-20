window.onload = () ->
  salsa = document.getElementById('salsa')
  loadSalsa = () ->
    script = document.createElement('script')
    script.setAttribute('src', SERVER_NAME + '/edit?organization_id=' + ORGANIZATION_ID)
    document.getElementsByTagName('head')[0].appendChild(script)
    salsa.removeEventListener('click', loadSalsa, false)

  salsa.addEventListener('click', loadSalsa, false)

