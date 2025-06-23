document.addEventListener('DOMContentLoaded', () => {
  const ribbonButtons = document.querySelectorAll('.ribbon-button');
  const expertiseDetails = document.querySelectorAll('.expertise-detail');
  const chatbotToggle = document.querySelector('.chatbot-toggle');
  const chatbot = document.querySelector('.chatbot');
  const chatbotInput = document.querySelector('.chatbot-input');
  const chatbotMessages = document.querySelector('.chatbot-messages');
  const sendButton = document.querySelector('.send-button');
  const cards = document.querySelectorAll('.card');
  const miniMan = document.querySelector('.mini-man');
  const progressBar = document.querySelector('.progress');

  let milestones = 0;
  const maxMilestones = 10;

  // Toggle expertise details
  ribbonButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.getAttribute('data-target');
      expertiseDetails.forEach(detail => {
        if (detail.getAttribute('data-id') === target) {
          detail.classList.toggle('active');
        } else {
          detail.classList.remove('active');
        }
      });
    });
  });

  // Toggle chatbot
  chatbotToggle.addEventListener('click', () => {
    chatbot.style.display = chatbot.style.display === 'flex' ? 'none' : 'flex';
  });

  // Send message
  function addMessage(type, text) {
    const message = document.createElement('div');
    message.className = `message ${type}`;
    message.textContent = text;
    chatbotMessages.appendChild(message);
    chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
  }

  function getBotResponse(input) {
    const responses = {
      'hi': "Hello! I'm ShankarBot – Ask me about experience, expertise or projects!",
      'experience': '15+ years in TA: OpenText, Target, Browserstack, WNS, Recruise, Out of the Blue.',
      'genai': 'I implemented GenAI tools that reduced TAT by 20% at OpenText.',
      'leadership': 'I hired senior engineering and GTM leaders at OpenText and Target.',
      'mentoring': 'I’ve led TA teams, coached them using 9-box grids and succession planning.',
      'default': "Try asking: 'experience', 'GenAI', 'mentoring', or 'leadership'."
    };
    const key = input.toLowerCase().trim();
    return responses[key] || responses['default'];
  }

  function handleSend() {
    const input = chatbotInput.value.trim();
    if (!input) return;
    addMessage('user', input);
    setTimeout(() => {
      addMessage('bot', getBotResponse(input));
    }, 600);
    chatbotInput.value = '';
  }

  chatbotInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  });

  sendButton.addEventListener('click', handleSend);

  // Mini-man tracker + progress
  cards.forEach(card => {
    card.addEventListener('click', () => {
      card.classList.toggle('active');
      updateMiniMan(card);
      updateProgress();
    });
  });

  function updateMiniMan(element) {
    const rect = element.getBoundingClientRect();
    miniMan.style.top = `${rect.top + window.scrollY - 20}px`;
  }

  function updateProgress() {
    milestones = document.querySelectorAll('.card.active').length;
    progressBar.style.width = `${(milestones / maxMilestones) * 100}%`;
  }
});
