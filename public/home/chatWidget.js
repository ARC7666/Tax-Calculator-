document.addEventListener('DOMContentLoaded', () => {
    // Inject Chatbot HTML
    const chatHTML = `
        <div id="chatbot-container">
            <div id="chat-window">
                <div id="chat-header">
                    <h3>✨ TaxBuddy AI</h3>
                    <button id="chat-close">×</button>
                </div>
                <div id="chat-messages">
                    <div class="message bot-message">Hi! I'm TaxBuddy AI. How can I help you with your Indian taxes today?</div>
                </div>
                <div id="chat-input-area">
                    <input type="text" id="chat-input" placeholder="Ask a tax question..." autocomplete="off">
                    <button id="chat-send">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                            <line x1="22" y1="2" x2="11" y2="13"></line>
                            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                    </button>
                </div>
            </div>
            <button id="chat-toggle">
                💬
            </button>
        </div>
    `;

    document.body.insertAdjacentHTML('beforeend', chatHTML);

    const chatToggle = document.getElementById('chat-toggle');
    const chatWindow = document.getElementById('chat-window');
    const chatClose = document.getElementById('chat-close');
    const chatInput = document.getElementById('chat-input');
    const chatSend = document.getElementById('chat-send');
    const chatMessages = document.getElementById('chat-messages');

    let history = []; // Keep track of conversation history

    // Toggle Chat Window
    const toggleChat = () => chatWindow.classList.toggle('active');
    chatToggle.addEventListener('click', toggleChat);
    chatClose.addEventListener('click', () => chatWindow.classList.remove('active'));

    const addMessage = (text, sender) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${sender}-message`;
        msgDiv.innerHTML = text.replace(/\\n/g, '<br>');
        chatMessages.appendChild(msgDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const addTypingIndicator = () => {
        const typingDiv = document.createElement('div');
        typingDiv.className = 'typing-indicator';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = '<span></span><span></span><span></span>';
        chatMessages.appendChild(typingDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    };

    const removeTypingIndicator = () => {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) indicator.remove();
    };

    const sendMessage = async () => {
        const message = chatInput.value.trim();
        if (!message) return;

        // Display User Message
        addMessage(message, 'user');
        chatInput.value = '';

        // Add to history
        history.push({ role: "user", parts: [{ text: message }] });

        addTypingIndicator();

        try {
            const res = await fetch('/submit/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message, history })
            });
            const data = await res.json();
            
            removeTypingIndicator();
            if (data.response) {
                addMessage(data.response, 'bot');
                history.push({ role: "model", parts: [{ text: data.response }] });
            } else {
                addMessage("Oops! Something went wrong.", 'bot');
            }
        } catch (error) {
            removeTypingIndicator();
            addMessage("Error connecting to server. Please try again later.", 'bot');
            console.error(error);
        }
    };

    chatSend.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendMessage();
    });
});
