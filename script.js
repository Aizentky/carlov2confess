<script>
// Whisperclass AI Assistant Login Form - Fixed Redirect
class AIAssistantLoginForm {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.submitButton = this.form ? this.form.querySelector('.neural-button') : null;
        this.successMessage = document.getElementById('successMessage');
        this.socialButtons = document.querySelectorAll('.social-neural');

        this.testAccounts = [
            { email: "lezswitch@test.dev", password: "777tool" },
            { email: "prince@test.dev",    password: "sssyduwux" },
            { email: "jason@test.dev",     password: "333jason" }
        ];

        this.init();
    }

    init() {
        if (!this.form) {
            console.error("Login form (#loginForm) not found!");
            return;
        }
        this.bindEvents();
        this.setupPasswordToggle();
        this.setupSocialButtons();
        this.setupAIEffects();
    }

    bindEvents() {
        this.form.addEventListener('submit', (e) => this.handleSubmit(e));

        this.emailInput.addEventListener('blur', () => this.validateEmail());
        this.passwordInput.addEventListener('blur', () => this.validatePassword());

        this.emailInput.addEventListener('input', () => this.clearError('email'));
        this.passwordInput.addEventListener('input', () => this.clearError('password'));
    }

    setupPasswordToggle() {
        if (!this.passwordToggle) return;
        this.passwordToggle.addEventListener('click', () => {
            const isPassword = this.passwordInput.type === 'password';
            this.passwordInput.type = isPassword ? 'text' : 'password';
            this.passwordToggle.classList.toggle('toggle-active', isPassword);
        });
    }

    setupSocialButtons() {
        this.socialButtons.forEach(button => {
            button.addEventListener('click', () => {
                const provider = button.querySelector('span')?.textContent.trim() || 'Social';
                this.handleSocialLogin(provider, button);
            });
        });
    }

    setupAIEffects() {
        [this.emailInput, this.passwordInput].forEach(input => {
            if (input) {
                input.addEventListener('focus', (e) => {
                    const field = e.target.closest('.smart-field');
                    if (field) this.triggerNeuralEffect(field);
                });
            }
        });
    }

    triggerNeuralEffect(field) {
        const indicator = field.querySelector('.ai-indicator');
        if (indicator) {
            indicator.style.opacity = '1';
            setTimeout(() => indicator.style.opacity = '', 2000);
        }
    }

    validateEmail() {
        const email = this.emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            this.showError('email', 'Neural access requires email address');
            return false;
        }
        if (!emailRegex.test(email)) {
            this.showError('email', 'Invalid email format detected');
            return false;
        }
        this.clearError('email');
        return true;
    }

    validatePassword() {
        const password = this.passwordInput.value;
        if (!password) {
            this.showError('password', 'Security key required for access');
            return false;
        }
        if (password.length < 6) {
            this.showError('password', 'Security key must be at least 6 characters');
            return false;
        }
        this.clearError('password');
        return true;
    }

    showError(field, message) {
        const input = document.getElementById(field);
        if (!input) return;
        const smartField = input.closest('.smart-field');
        const errorEl = document.getElementById(`${field}Error`);

        if (smartField) smartField.classList.add('error');
        if (errorEl) {
            errorEl.textContent = message;
            errorEl.classList.add('show');
        }
    }

    clearError(field) {
        const input = document.getElementById(field);
        if (!input) return;
        const smartField = input.closest('.smart-field');
        const errorEl = document.getElementById(`${field}Error`);

        if (smartField) smartField.classList.remove('error');
        if (errorEl) {
            errorEl.classList.remove('show');
            setTimeout(() => { errorEl.textContent = ''; }, 200);
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateEmail() || !this.validatePassword()) return;

        const email = this.emailInput.value.trim();
        const password = this.passwordInput.value;

        const validAccount = this.testAccounts.find(acc =>
            acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
        );

        if (!validAccount) {
            this.showError('password', 'Access denied: Invalid credentials');
            return;
        }

        // Success path
        this.setLoading(true);

        try {
            await new Promise(r => setTimeout(r, 1500)); // loading simulation

            this.showNeuralSuccess();

            // Stronger redirect with multiple fallbacks + longer delay
            setTimeout(() => {
                this.forceRedirect("dashboard.html");
            }, 2800);   // reduced a bit from 3200

        } catch (err) {
            console.error(err);
            this.showError('password', 'Neural connection failed. Please retry.');
        } finally {
            this.setLoading(false);
        }
    }

    forceRedirect(url) {
        console.log(`Attempting redirect to: ${url}`);

        // Method 1: Standard
        window.location.href = url;

        // Method 2: Backup after 300ms
        setTimeout(() => {
            if (window.location.pathname.endsWith('login') || 
                !window.location.href.includes('dashboard')) {
                window.location.replace(url);   // removes from history
            }
        }, 300);

        // Method 3: Hard fallback
        setTimeout(() => {
            window.location.assign(url);
        }, 800);
    }

    async handleSocialLogin(provider, button) {
        const originalHTML = button.innerHTML;
        button.style.pointerEvents = 'none';
        button.style.opacity = '0.7';
        button.innerHTML = `<span>Connecting to ${provider}...</span>`;

        try {
            await new Promise(r => setTimeout(r, 2000));
            alert(`Social login with ${provider} is not implemented yet.`);
        } finally {
            button.style.pointerEvents = 'auto';
            button.style.opacity = '1';
            button.innerHTML = originalHTML;
        }
    }

    setLoading(loading) {
        if (this.submitButton) {
            this.submitButton.classList.toggle('loading', loading);
            this.submitButton.disabled = loading;
        }

        this.socialButtons.forEach(btn => {
            btn.style.pointerEvents = loading ? 'none' : 'auto';
            btn.style.opacity = loading ? '0.5' : '1';
        });
    }

    showNeuralSuccess() {
        if (!this.form) return;

        this.form.style.transition = 'all 0.4s ease';
        this.form.style.transform = 'scale(0.92)';
        this.form.style.opacity = '0';

        setTimeout(() => {
            this.form.style.display = 'none';

            // Hide other sections safely
            document.querySelectorAll('.neural-social, .signup-section, .auth-separator')
                .forEach(el => {
                    if (el) el.style.display = 'none';
                });

            if (this.successMessage) {
                this.successMessage.classList.add('show');
            }
        }, 350);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new AIAssistantLoginForm();
});
