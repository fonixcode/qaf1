const scrollChatDown = () => {
  const chatContainer = document.querySelector(".chat-container");
  chatContainer.scrollTop = chatContainer.scrollHeight;
}

window.onload = () => {
  scrollChatDown();
  
  document.querySelector('.chat-new-message-form form').onsubmit = e => {
     e.target.submit();
     e.target.reset();
     return false;
  };
}

export { scrollChatDown };
