import { renderMessages, createMessage } from "./utils.js";

// string => {} [] [{}, {}]
let messages = JSON.parse(localStorage.getItem("messages")) || [];

const messageForm = document.getElementById("message-form");

renderMessages(messages);

messageForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const _author = messageForm.querySelector("[name=author]").value;
  const _message = messageForm.querySelector("[name=message]").value;

  if (_author === "" || _message === "") {
    alert("Заполнены не все поля!");
    return;
  }

  const _tagsInput = messageForm.querySelector("[name=tags]").value;
  let tags = _tagsInput.split(" "); // array

  let _now = new Date();
  let newMessage = createMessage(_author, _message, _now, ...tags);

  messages.push(newMessage);

  localStorage.setItem("messages", JSON.stringify(messages));

  renderMessages(messages);

  messageForm.reset();
});

document.querySelector("#start-filter").addEventListener("click", () => {
  messages = messages.filter((item) => {
    let _tags = item.tags;

    let spamTagsCount = _tags.reduce((acc, tag) => {
      if (tag == "spam" || tag == "js" || tag == "mat") acc++;
      return acc;
    }, 0);

    return spamTagsCount == 0;
  });

  localStorage.setItem("messages", JSON.stringify(messages));
  renderMessages(messages);
});
