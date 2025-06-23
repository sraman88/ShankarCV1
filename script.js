document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.card');
    const companyBoxes = document.querySelectorAll('.company-box');
    const expertiseBoxes = document.querySelectorAll('.expertise-box');
    const chatbotToggle = document.querySelector('.chatbot-toggle');
    const chatbot = document.querySelector('.chatbot');
    const chatInput = document.querySelector('.chatbot-input');
    const chatOptions = document.querySelectorAll('.chat-option');
    const miniMan = document.querySelector('.mini-man');
    const progressBar = document.querySelector('.progress');
    const profileSpotlight = document.querySelector('.profile-spotlight');
    const cursor = document.querySelector('.cursor');
    let milestones = 0;
    const maxMilestones = 10;

    // Detect mobile
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
        cursor.classList.add('active');
        setTimeout(() => cursor.classList.remove('active'), 100);
    });

    cards.forEach(card => {
        card.addEventListener('click', () => {
            if (!card.classList.contains('active')) {
                card.classList.add('active');
                updateMiniMan(card);
                updateProgress();
                if (isMobile) card.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        });
    });

    companyBoxes.forEach(box => {
        box.addEventListener('click', () => {
            if (!box.classList.contains('active')) {
                box.classList.add('active');
                updateMiniMan(box);
                updateProgress();
                if (isMobile) box.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        });
    });

    expertiseBoxes.forEach(box => {
        box.addEventListener('click', () => {
            if (!box.classList.contains('active')) {
                box.classList.add('active');
                updateMiniMan(box);
                updateProgress();
                if (isMobile) box.scrollIntoView({ behavior: "smooth", block: "center" });
            }
        });
    });

    chatbotToggle.addEventListener('click', () => {
        chatbot.style.display = chatbot.style.display === 'none' ? 'flex' : 'none';
        chatbotToggle.textContent = chatbot.style.display === 'none' ? '✖' : '💬';
    });

    chatOptions.forEach(option => {
        option.addEventListener('click', () => {
            const query = option.getAttribute('data-query');
            addMessage('user', query);
            setTimeout(() => addMessage('bot', getBotResponse(query)), 500);
        });
    });

    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && chatInput.value.trim()) {
            addMessage('user', chatInput.value.trim());
            setTimeout(() => addMessage('bot', getBotResponse(chatInput.value.trim())), 500);
            chatInput.value = '';
        }
    });

    profileSpotlight.addEventListener('click', () => {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        document.body.appendChild(confetti);
        setTimeout(() => confetti.remove(), 1000);
        document.getElementById('objective').classList.add('active');
        updateProgress();
    });

    function updateMiniMan(element) {
        const rect = element.getBoundingClientRect();
        miniMan.style.left = (rect.left + rect.width / 2) + 'px';
        miniMan.style.top = (rect.top + rect.height / 2) + 'px';
    }

    function updateProgress() {
        milestones = document.querySelectorAll('.active').length;
        progressBar.style.width = (milestones / maxMilestones * 100) + '%';
        if (milestones === maxMilestones) {
            confettiEffect();
        }
    }

    function addMessage(type, text) {
        const messages = document.querySelector('.chatbot-messages');
        const message = document.createElement('div');
        message.className = `message ${type}`;
        message.textContent = text;
        messages.appendChild(message);
        messages.scrollTop = messages.scrollHeight;
        if (type === 'bot') {
            document.querySelector('.typing-indicator').style.display = 'none';
        } else {
            document.querySelector('.typing-indicator').style.display = 'flex';
        }
    }

    function getBotResponse(query) {
        const responses = {
            'Tell me about Shankar\'s career journey': 'Shankar Raman has 15 years of experience in tech recruitment, with key roles at OpenText, Out of the Blue.Ai, Target, WNS, and Recruise India.',
            'Describe Shankar\'s recruiting expertise': 'Shankar excels in core recruiting with Gen AI tools, leadership hiring at Target and OpenText, team management, and special projects like diversity hiring and RPO.',
            'What are Shankar\'s special projects?': 'Key projects include leading diversity hiring at WNS (40% diversity), BounceBack at Target, Buddy Program at BrowserStack, and hiring 650 professionals at OpenText.',
            'How can I contact Shankar?': 'Connect with Shankar on LinkedIn (@shankar111) or X (@shankar_raman).',
            'Show Shankar\'s social profiles': 'LinkedIn: @shankar111, X: @shankar_raman, Instagram: @shnkrrmn.',
            'What awards has Shankar won?': 'Shankar earned a $1,000 award for a talent pipeline project at Target and accelerated hiring by 25% at OpenText.'
        };
        return responses[query] || 'I’m here to help! Try asking about Shankar’s journey, recruiting expertise, projects, contact info, socials, or awards.';
    }

    function confettiEffect() {
        for (let i = 0; i < 50; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.animationDuration = Math.random() * 2 + 1 + 's';
            document.body.appendChild(confetti);
            setTimeout(() => confetti.remove(), 2000);
        }
    }
});
