// Action Cable provides the framework to deal with WebSockets in Rails.
// You can generate new channels where WebSocket features live using the `rails generate channel` command.

import { createConsumer } from "@rails/actioncable"

import { scrollChatDown } from "./../application/chat";

createConsumer().subscriptions.create({ channel: "ChatChannel" }, {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    this.appendMessage(data);
  },

  appendMessage(data) {
    const html = this.buildHtml(data)
    const element = document.querySelector(".chat-container")
    element.insertAdjacentHTML("beforeend", html)

    scrollChatDown();
    this.setTimerForNewMessage();
  },

  buildHtml(data) {
    return `
      <div class="chat-message new-chat-message">
        <div class="chat-message__header">${data["created_at"]} | ${data["user_email"]}</div>
        <div class="chat-message__body">${data["content"]}</div>
      </div>
    `
  },

  setTimerForNewMessage() {
    setTimeout(() => {
      const elements = document.querySelectorAll(".chat-message.new-chat-message");

      elements.forEach((element) => { element.classList.remove("new-chat-message") })
    }, 1000)
  }
});
