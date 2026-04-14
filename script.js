// =============================================
// Whisperclass AI Assistant Login Form - FIXED
// =============================================

class AIAssistantLoginForm {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.submitButton = this.form ? this.form.querySelector('.neural-button') : null;
        this.successMessage = document.getElementById('successMessage');
        this.socialButtons = document.querySelectorAll('.social-neural');

        // Test accounts (you can add more later)
        this.testAccounts = [
            { email: "777@test.dev", password: "777tool" },
            { email: "prince@test.dev",    password: "sssyduwux" },
            { email: "jason@test.dev",     password: "333jason" }
        ];

        this.init();
    }

    init() {
        if (!this.form) {
            console.error("❌ Login form (#loginForm) not found!");
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
            const isHidden = this.passwordInput.type === 'password';
            this.passwordInput.type = isHidden ? 'text' : 'password';
            this.passwordToggle.classList.toggle('toggle-active', isHidden);
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
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (!email) {
            this.showError('email', 'Neural access requires email address');
            return false;
        }
        if (!regex.test(email)) {
            this.showError('email', 'Invalid email format detected');
            return false;
        }
        this.clearError('email');
        return true;
    }

    validatePassword() {
        const pass = this.passwordInput.value;
        if (!pass) {
            this.showError('password', 'Security key required for access');
            return false;
        }
        if (pass.length < 6) {
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
            setTimeout(() => errorEl.textContent = '', 200);
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        if (!this.validateEmail() || !this.validatePassword()) return;

        const email = this.emailInput.value.trim();
        const password = this.passwordInput.value;

        const valid = this.testAccounts.find(acc =>
            acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
        );

        if (!valid) {
            this.showError('password', 'Access denied: Invalid credentials');
            return;
        }

        // Success
        this.setLoading(true);

        try {
            await new Promise(r => setTimeout(r, 1400)); // loading feel
            this.showNeuralSuccess();

            // Strong redirect
            setTimeout(() => this.forceRedirect('dashboard.html'), 2600);

        } catch (err) {
            console.error(err);
            this.showError('password', 'Neural connection failed. Please retry.');
        } finally {
            this.setLoading(false);
        }
    }

    forceRedirect(url) {
        console.log(`🔄 Redirecting to ${url}...`);

        window.location.href = url;

        // Extra safety
        setTimeout(() => window.location.replace(url), 400);
        setTimeout(() => window.location.assign(url), 800);
    }

    async handleSocialLogin(provider, button) {
        const original = button.innerHTML;
        button.style.pointerEvents = 'none';
        button.style.opacity = '0.7';
        button.innerHTML = `<span>Connecting to ${provider}...</span>`;

        await new Promise(r => setTimeout(r, 1800));
        alert(`Social login with ${provider} is not connected yet.`);

        button.style.pointerEvents = 'auto';
        button.style.opacity = '1';
        button.innerHTML = original;
    }

    setLoading(isLoading) {
        if (this.submitButton) {
            this.submitButton.classList.toggle('loading', isLoading);
            this.submitButton.disabled = isLoading;
        }

        this.socialButtons.forEach(btn => {
            btn.style.pointerEvents = isLoading ? 'none' : 'auto';
            btn.style.opacity = isLoading ? '0.5' : '1';
        });
    }

    showNeuralSuccess() {
        if (!this.form) return;

        this.form.style.transition = 'all 0.35s ease';
        this.form.style.transform = 'scale(0.94)';
        this.form.style.opacity = '0';

        setTimeout(() => {
            this.form.style.display = 'none';

            // Hide other login elements safely
            document.querySelectorAll('.neural-social, .signup-section, .auth-separator')
                .forEach(el => { if (el) el.style.display = 'none'; });

            if (this.successMessage) this.successMessage.classList.add('show');
        }, 320);
    }
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    new AIAssistantLoginForm();
});
