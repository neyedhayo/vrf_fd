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
    
    return randomBytes[0] % sides;
}

export function formatTimestamp(date) {
    return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });
}

export function formatNumber(num) {
    return num.toLocaleString();
}

export function generateId() {
    return Math.random().toString(36).substr(2, 9);
}

export function isValidHex(str) {
    return /^[0-9a-fA-F]+$/.test(str);
}

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

export function animateElement(element, animationClass, duration = 300) {
    element.classList.add(animationClass);
    setTimeout(() => {
        element.classList.remove(animationClass);
    }, duration);
}


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

export function formatHash(hash, startLength = 8, endLength = 6) {
    if (hash.length <= startLength + endLength) {
        return hash;
    }
    return `${hash.substring(0, startLength)}...${hash.substring(hash.length - endLength)}`;
}

export function isValidRound(round) {
    return typeof round === 'number' && round > 0 && Number.isInteger(round);
}

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

export function getRelativeTime(date) {
    const now = new Date();
    const diff = now - date;
    const seconds = Math.floor(diff / 1000);
    
    if (seconds < 60) return 'Just now';
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
    return `${Math.floor(seconds / 86400)}d ago`;
}