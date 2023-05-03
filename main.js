setPhoto();
setUsername();

let content = "";

function sendMessage(text) {
  text = text.trim();
  let username = localStorage.getItem("username3");
  let photo = localStorage.getItem("photo");
  let postman = new XMLHttpRequest();
  postman.open(
    "GET",
    "https://circularbasicautocad.ismailmamiedov.repl.co/?text=" + text + "&username=" + username + "&photo=" + photo
  );
  postman.send();
  document.querySelector("#userMessage").value = "";
}

function showMessages() {
  const messagesDiv = document.querySelector(".messages");
  let postman = new XMLHttpRequest();
  postman.open(
    "GET",
    "https://circularbasicautocad.ismailmamiedov.repl.co",
    false
  );
  postman.send();
  if (postman.responseText == content) {
    return;
  }
  content = postman.responseText;
  let data = JSON.parse(postman.responseText);
  messagesDiv.innerHTML = "";

  let textAccamulator = "";
  for (messageNumber in data) {
    textAccamulator += `
              <div style="display: flex; align-items: flex-end;">
                  <div class="avatar" style="background-image: url('${data[messageNumber].photo}')"></div>
                  <div class="message">
                    <div>
                      <b>
                        ${data[messageNumber].username}   
                      </b> 
                    </div>
                    <div>
                      ${data[messageNumber].content}    
                    </div>
                    <div class="message-time">
                      ${data[messageNumber].time}    
                    </div>    
                  </div>
              </div> `;
  }
  messagesDiv.innerHTML = textAccamulator;
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}


function setUsername() {
  let username = prompt('Введи новый юзернейм:');
  if (username !== null && username.trim() !== '') {
    localStorage.setItem('username3', username.trim());
  }
}

function setPhoto() {
  let photo = prompt('Введите новый аватар:');
  if (photo !== null && photo.trim() !== '') {
    localStorage.setItem('photo', photo.trim());
  }
}


setInterval(function () {
  showMessages();
}, 1000);

document.onkeydown = function (e) {
  if (e.keyCode == 13) {
    document.querySelector("#btnSend").click();
  }
}