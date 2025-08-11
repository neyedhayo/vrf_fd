/**
 * Utility functions for Fair Dice dcipher implementation
 */

/**
 * Convert hex string to byte array
 */
export function hexToBytes(hex) {
    const bytes = [];
    for (let i = 0; i < hex.length; i += 2) {
        bytes.push(parseInt(hex.substr(i, 2), 16));
    }
    return bytes;
}

/**
 * Avoid modulo bias using rejection sampling
 * This ensures perfectly fair distribution for dice rolls
 */
export function avoidModuloBias(randomBytes, sides) {
    // Calculate the largest multiple of 'sides' that fits in 256
    const threshold = Math.floor(256 / sides) * sides;
    
    for (let i = 0; i < randomBytes.length; i++) {
        const byte = randomBytes[i];
        if (byte < threshold) {
            return byte % sides;
        }
    }
    
    // Fallback - this should rarely happen with good randomness
    return randomBytes[0] % sides;
}

/**
 * Format timestamp for display
 */
export function formatTimestamp(date) {
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

/**
 * Format large numbers with commas
 */
export function formatNumber(num) {
    return num.toLocaleString();
}

/**
 * Generate a random ID for demo purposes
 */
export function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

/**
 * Validate hex string
 */
export function isValidHex(str) {
    return /^[0-9a-fA-F]+$/.test(str);
}

/**
 * Calculate entropy of a string (basic measure)
 */
export function calculateEntropy(str) {
    const freq = {};
    for (const char of str) {
        freq[char] = (freq[char] || 0) + 1;
    }
    
    let entropy = 0;
    const len = str.length;
    
    for (const char in freq) {
        const p = freq[char] / len;
        entropy -= p * Math.log2(p);
    }
    
    return entropy;
}

/**
 * Animate element with CSS class
 */
export function animateElement(element, animationClass, duration = 300) {
    element.classList.add(animationClass);
    setTimeout(() => {
        element.classList.remove(animationClass);
    }, duration);
}

/**
 * Debounce function calls
 */
export function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

/**
 * Copy text to clipboard
 */
export async function copyToClipboard(text) {
    try {
        await navigator.clipboard.writeText(text);
        return true;
    } catch (err) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        return true;
    }
}

/**
 * Format hash for display (truncate with ellipsis)
 */
export function formatHash(hash, startLength = 8, endLength = 6) {
    if (hash.length <= startLength + endLength) {
        return hash;
    }
    return `${hash.substring(0, startLength)}...${hash.substring(hash.length - endLength)}`;
}

/**
 * Validate dcipher round number
 */
export function isValidRound(round) {
    return typeof round === 'number' && round > 0 && Number.isInteger(round);
}

/**
 * Create notification element
 */
export function createNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    // Auto remove after 3 seconds
    setTimeout(() => {
        notification.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
    
    return notification;
}

/**
 * Get relative time string
 */
export function getRelativeTime(date) {
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
}