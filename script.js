<script>
// Whisperclass AI Assistant Login Form
class AIAssistantLoginForm {
    constructor() {
        this.form = document.getElementById('loginForm');
        this.emailInput = document.getElementById('email');
        this.passwordInput = document.getElementById('password');
        this.passwordToggle = document.getElementById('passwordToggle');
        this.submitButton = this.form.querySelector('.neural-button');
        this.successMessage = document.getElementById('successMessage');
        this.socialButtons = document.querySelectorAll('.social-neural');

        // Test accounts for demo
        this.testAccounts = [
            {
                email: "lezswitch@test.dev",   // idrewcnv - friend
                password: "777tool"
            },
            {
                email: "prince@test.dev",       // princeMP4 - friend
                password: "sssyduwux"
            },
            {
                email: "jason@test.dev",        // christian - buyer
                password: "333jason"
            },

        this.init();
    }

    init() {
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

        // Clean placeholders
        this.emailInput.setAttribute('placeholder', ' ');
        this.passwordInput.setAttribute('placeholder', ' ');
    }

    setupPasswordToggle() {
        this.passwordToggle.addEventListener('click', () => {
            const type = this.passwordInput.type === 'password' ? 'text' : 'password';
            this.passwordInput.type = type;
            this.passwordToggle.classList.toggle('toggle-active', type === 'text');
        });
    }

    setupSocialButtons() {
        this.socialButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const provider = button.querySelector('span')?.textContent.trim() || 'Social';
                this.handleSocialLogin(provider, button);
            });
        });
    }

    setupAIEffects() {
        [this.emailInput, this.passwordInput].forEach(input => {
            input.addEventListener('focus', (e) => {
                const field = e.target.closest('.smart-field');
                if (field) this.triggerNeuralEffect(field);
            });
        });
    }

    triggerNeuralEffect(field) {
        const indicator = field.querySelector('.ai-indicator');
        if (indicator) {
            indicator.style.opacity = '1';
            setTimeout(() => {
                indicator.style.opacity = '';
            }, 2000);
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
        const inputElement = document.getElementById(field);
        if (!inputElement) return;

        const smartField = inputElement.closest('.smart-field');
        const errorElement = document.getElementById(`${field}Error`);

        if (smartField) smartField.classList.add('error');
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.classList.add('show');
        }
    }

    clearError(field) {
        const inputElement = document.getElementById(field);
        if (!inputElement) return;

        const smartField = inputElement.closest('.smart-field');
        const errorElement = document.getElementById(`${field}Error`);

        if (smartField) smartField.classList.remove('error');
        if (errorElement) {
            errorElement.classList.remove('show');
            setTimeout(() => {
                errorElement.textContent = '';
            }, 200);
        }
    }

    async handleSubmit(e) {
        e.preventDefault();

        const isEmailValid = this.validateEmail();
        const isPasswordValid = this.validatePassword();

        if (!isEmailValid || !isPasswordValid) {
            return;
        }

        const email = this.emailInput.value.trim();
        const password = this.passwordInput.value;

        // Check against test accounts
        const validAccount = this.testAccounts.find(acc =>
            acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
        );

        if (!validAccount) {
            this.showError('password', 'Access denied: Invalid credentials');
            return;
        }

        // SUCCESS
        this.setLoading(true);

        try {
            await new Promise(resolve => setTimeout(resolve, 1500)); // simulate network delay
            this.showNeuralSuccess();

            // Redirect after success animation
            setTimeout(() => {
                window.location.href = "dashboard.html"; // ← change this if needed
            }, 3200);
        } catch (error) {
            this.showError('password', 'Neural connection failed. Please retry.');
        } finally {
            this.setLoading(false);
        }
    }

    async handleSocialLogin(provider, button) {
        const originalHTML = button.innerHTML;

        button.style.pointerEvents = 'none';
        button.style.opacity = '0.7';
        button.innerHTML = `
            <div class="social-bg"></div>
            <span>Connecting to ${provider}...</span>
            <div class="social-glow"></div>
        `;

        try {
            await new Promise(resolve => setTimeout(resolve, 2000));
            // TODO: Add real social login logic here later
            alert(`Social login with ${provider} is not implemented yet.`);
        } finally {
            button.style.pointerEvents = 'auto';
            button.style.opacity = '1';
            button.innerHTML = originalHTML;
        }
    }

    setLoading(loading) {
        this.submitButton.classList.toggle('loading', loading);
        this.submitButton.disabled = loading;

        this.socialButtons.forEach(button => {
            button.style.pointerEvents = loading ? 'none' : 'auto';
            button.style.opacity = loading ? '0.5' : '1';
        });
    }

    showNeuralSuccess() {
        this.form.style.transition = 'all 0.3s ease';
        this.form.style.transform = 'scale(0.95)';
        this.form.style.opacity = '0';

        setTimeout(() => {
            this.form.style.display = 'none';
            document.querySelector('.neural-social')?.style.setProperty('display', 'none');
            document.querySelector('.signup-section')?.style.setProperty('display', 'none');
            document.querySelector('.auth-separator')?.style.setProperty('display', 'none');

            this.successMessage.classList.add('show');
        }, 300);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new AIAssistantLoginForm();
});
</script>
