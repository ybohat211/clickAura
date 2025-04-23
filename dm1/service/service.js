// contact form js 
const contactBtn = document.getElementById('contactBtn');
const modal = document.getElementById('contactModal');
const closeModal = document.getElementById('closeModal');
const form = document.getElementById('contactForm');
const mobileInput = document.getElementById('mobile');

// Open modal
contactBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'flex';
});

// Close modal
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Close on outside click
window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

// 🔐 Real-time mobile: Only numbers allowed
mobileInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9]/g, '');
});

mobileInput.addEventListener('keydown', function (e) {
    const allowedKeys = ["Backspace", "ArrowLeft", "ArrowRight", "Tab"];
    const isNumber = /^[0-9]$/.test(e.key);
    if (!isNumber && !allowedKeys.includes(e.key)) {
        e.preventDefault();
    }
});

// ✅ Submit validation
form.addEventListener('submit', function (e) {
    const firstName = document.getElementById('firstName').value.trim();
    const lastName = document.getElementById('lastName').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!firstName || !lastName || !mobile || !message) {
        alert("Please fill out all required fields.");
        e.preventDefault();
        return;
    }

    if (!/^\d{10}$/.test(mobile)) {
        alert("Please enter a valid 10-digit mobile number.");
        e.preventDefault();
        return;
    }

    // Optional: You can show success feedback
    alert("Form submitted successfully!");
});