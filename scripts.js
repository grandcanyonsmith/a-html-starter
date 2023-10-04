var conversation_history = [];
function addMessage(user, message) {
    var user = user || document.getElementById('userSelect').value;
    var message = message || document.getElementById('messageInput').value;
    conversation_history.push({'role': user, 'content': message});
    updateChat();
    document.getElementById('messageInput').value = '';
}
function updateChat() {
    var chatContainer = document.getElementById('chatContainer');
    chatContainer.innerHTML = '';
    conversation_history.forEach(function(message) {
        var messageElement = document.createElement('div');
        messageElement.classList.add('message', message.role === 'user' ? 'user' : 'assistant');
        messageElement.innerHTML = '<strong>' + message.role + ':</strong> ' + message.content;
        chatContainer.appendChild(messageElement);
    });
}
function send() {
    var user = document.getElementById('userSelect').value;
    var message = document.getElementById('messageInput').value;
    axios.post('https://lftoi5cib2sgykubshzpqfvwaa0skgkb.lambda-url.us-west-2.on.aws/', {
        conversation_history: conversation_history
    })
    .then(function (response) {
        if(response.data.action === 'REPLY') {
            addMessage('assistant', response.data.message);
        }
        var responseData = JSON.parse(response.data);
        document.getElementById('messageInput').value = responseData.messageContent;
        document.getElementById('userSelect').value = 'assistant';
        addMessage();
        updateChat();
    })
    .catch(function (error) {
        alert("Failed to send message");
        console.log(error);
    });
}
function clearMessages() {
    conversation_history = [];
    updateChat();
}
function eraseLastMessage() {
    conversation_history.pop();
    updateChat();
}
function openModal() {
    document.getElementById('myModal').style.display = "block";
}
document.getElementsByClassName("close")[0].onclick = function() {
    document.getElementById('myModal').style.display = "none";
}
window.onclick = function(event) {
    if (event.target == document.getElementById('myModal')) {
        document.getElementById('myModal').style.display = "none";
    }
}
