// Centralized Dark Mode Manager
// This file handles dark mode synchronization across all pages

const DarkMode = {
    init() {
        // Check localStorage for saved preference
        const isDark = localStorage.getItem('sasoDarkMode') === 'enabled';
        
        if (isDark) {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
        
        this.updateToggleButton();
    },
    
    toggle() {
        const isDark = document.body.classList.toggle('dark');
        
        if (isDark) {
            localStorage.setItem('sasoDarkMode', 'enabled');
        } else {
            localStorage.setItem('sasoDarkMode', 'disabled');
        }
        
        this.updateToggleButton();
        
        // Dispatch event para sa ibang components kung kinakailangan
        window.dispatchEvent(new CustomEvent('darkModeChanged', { detail: { dark: isDark } }));
    },
    
    updateToggleButton() {
        const toggleBtn = document.getElementById('darkModeToggle');
        if (toggleBtn) {
            const icon = toggleBtn.querySelector('i');
            const isDark = document.body.classList.contains('dark');
            
            if (isDark) {
                icon.classList.remove('fa-moon');
                icon.classList.add('fa-sun');
            } else {
                icon.classList.remove('fa-sun');
                icon.classList.add('fa-moon');
            }
        }
    },
    
    // Para sa mga page na may dynamic content
    applyToElement(element) {
        if (!element) return;
        const isDark = document.body.classList.contains('dark');
        if (isDark) {
            element.classList.add('dark');
        } else {
            element.classList.remove('dark');
        }
    }
};

// Auto-initialize kapag na-load ang DOM
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => DarkMode.init());
} else {
    DarkMode.init();
}

// Expose sa window para magamit ng inline onclick
window.toggleDarkMode = () => DarkMode.toggle();
window.DarkMode = DarkMode;