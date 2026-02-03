const chatBox = document.getElementById('chatBox');
const userInput = document.getElementById('userInput');
const sendBtn = document.getElementById('sendBtn');

async function sendMessage() {
  const msg = userInput.value.trim();
  if (!msg) return;

  // show user message
  const userP = document.createElement('p');
  userP.classList.add('user-msg');
  userP.textContent = msg;
  chatBox.appendChild(userP);

  try {
    const res = await fetch("http://localhost:3000/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: msg })
    });

    const data = await res.json();
    const replyP = document.createElement('p');
    replyP.classList.add('ai-msg');
    replyP.textContent = data.reply || "SleepShield: No response received.";
    chatBox.appendChild(replyP);
    chatBox.scrollTop = chatBox.scrollHeight;

  } catch (err) {
    const errorP = document.createElement('p');
    errorP.classList.add('ai-msg');
    errorP.textContent = "SleepShield: Something went wrong.";
    chatBox.appendChild(errorP);
  }

  userInput.value = '';
}

sendBtn.addEventListener('click', sendMessage);
userInput.addEventListener('keypress', e => { if (e.key === 'Enter') sendMessage(); });
