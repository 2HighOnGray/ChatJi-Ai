// Get the elements
const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');

// Function to display messages in the chat box
function displayMessage(sender, message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add(sender.toLowerCase());
    messageElement.textContent = `${sender}: ${message}`;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to the bottom
}

// Function to send user message to the backend and get response
async function sendMessage() {
    const userMessage = userInput.value.trim();
    if (userMessage === '') return;

    displayMessage('You', userMessage);  // Display user's message
    userInput.value = '';  // Clear input field

    try {
        const response = await fetch('/api/chat', {  // This will be your backend endpoint
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ message: userMessage }),
        });

        const data = await response.json();
        displayMessage('Bot', data.message);  // Display bot's response

    } catch (error) {
        console.error('Error:', error);
        displayMessage('Bot', 'Oops, something went wrong. Please try again later.'); // Show error message
    }
}
