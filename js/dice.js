import { verify } from './verify.js';
import { hexToBytes, avoidModuloBias, formatTimestamp } from './utils.js';

class FairDice {
    constructor() {
        // dcipher Network endpoints (hypothetical based on research)
        this.dcipherEndpoint = 'https://api.dcipher.network/v1/randomness/latest';
        this.dcipherVerifyEndpoint = 'https://api.dcipher.network/v1/verify';
        this.rollHistory = [];
        this.currentRoll = null;
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.getElementById('rollButton').addEventListener('click', () => this.rollDice());
        document.getElementById('verifyButton').addEventListener('click', () => this.verifyLatestRoll());
    }

    async rollDice() {
        try {
            this.showLoading(true);
            this.animateDice();

            // Fetch latest randomness from dcipher network
            const randomnessData = await this.fetchDcipherRandomness();
            
            // Convert to fair dice roll (1-6)
            const diceResult = this.convertToDiceRoll(randomnessData.randomness);
            
            // Create roll record
            const rollRecord = {
                dice: diceResult,
                round: randomnessData.round,
                randomness: randomnessData.randomness,
                signature: randomnessData.signature,
                threshold_proof: randomnessData.threshold_proof, // dcipher specific
                committee_id: randomnessData.committee_id, // dcipher specific
                timestamp: new Date(randomnessData.unix_time * 1000)
            };

            // Update UI
            this.displayRollResult(rollRecord);
            this.addToHistory(rollRecord);
            this.showLoading(false);
            
            return rollRecord;
        } catch (error) {
            console.error('Dice roll failed:', error);
            this.showError('Failed to roll dice. Please try again.');
            this.showLoading(false);
        }
    }

    async fetchDcipherRandomness() {
        try {
            const response = await fetch(this.dcipherEndpoint);
            if (!response.ok) {
                throw new Error(`dcipher API error: ${response.status}`);
            }
            return await response.json();
        } catch (error) {
            // Fallback to simulated dcipher response for demo
            console.warn('Using demo data - dcipher network not available');
            return this.generateDemoRandomness();
        }
    }

    generateDemoRandomness() {
        // Simulated dcipher response for demonstration
        const crypto = window.crypto || window.msCrypto;
        const randomBytes = new Uint8Array(32);
        crypto.getRandomValues(randomBytes);
        const hexString = Array.from(randomBytes).map(b => b.toString(16).padStart(2, '0')).join('');
        
        return {
            round: Math.floor(Date.now() / 1000),
            randomness: hexString,
            signature: 'demo_signature_' + Math.random().toString(36),
            threshold_proof: 'demo_threshold_proof_' + Math.random().toString(36),
            committee_id: 'committee_' + Math.floor(Math.random() * 100),
            unix_time: Math.floor(Date.now() / 1000)
        };
    }

    convertToDiceRoll(randomnessHex) {
        // Convert hex to bytes and use rejection sampling to avoid modulo bias
        const randomBytes = hexToBytes(randomnessHex);
        return avoidModuloBias(randomBytes, 6) + 1; // Convert 0-5 to 1-6
    }

    displayRollResult(rollRecord) {
        // Animate the result display
        const diceDisplay = document.getElementById('diceDisplay');
        diceDisplay.style.transform = 'scale(1.2)';
        setTimeout(() => {
            diceDisplay.textContent = rollRecord.dice;
            diceDisplay.style.transform = 'scale(1)';
        }, 300);

        // Update result details
        document.getElementById('diceResult').textContent = rollRecord.dice;
        document.getElementById('dcipherRound').textContent = rollRecord.round;
        document.getElementById('timestamp').textContent = formatTimestamp(rollRecord.timestamp);
        document.getElementById('randomnessHex').textContent = rollRecord.randomness.substring(0, 32) + '...';

        // Store for verification
        this.currentRoll = rollRecord;

        // Show result section with animation
        const resultSection = document.getElementById('resultSection');
        resultSection.classList.remove('hidden');
        resultSection.style.opacity = '0';
        setTimeout(() => {
            resultSection.style.opacity = '1';
        }, 100);
    }

    async verifyLatestRoll() {
        if (!this.currentRoll) {
            this.showVerificationResult('❌ No roll to verify');
            return;
        }

        try {
            this.showVerificationResult('🔍 Verifying threshold proof...');
            
            const isValid = await verify(
                this.currentRoll.round,
                this.currentRoll.signature,
                this.currentRoll.threshold_proof,
                this.currentRoll.randomness
            );

            const resultMessage = isValid
                ? '✅ Randomness verified! This roll is cryptographically proven fair through threshold consensus.'
                : '❌ Verification failed! This randomness may be invalid.';
                
            this.showVerificationResult(resultMessage);
        } catch (error) {
            console.error('Verification failed:', error);
            this.showVerificationResult('❌ Verification error: ' + error.message);
        }
    }

    addToHistory(rollRecord) {
        this.rollHistory.unshift(rollRecord); // Add to beginning
        if (this.rollHistory.length > 8) {
            this.rollHistory.pop(); // Keep only last 8
        }
        this.updateHistoryDisplay();
    }

    updateHistoryDisplay() {
        const historyDiv = document.getElementById('rollHistory');
        historyDiv.innerHTML = this.rollHistory.map(roll => `
            <div class="history-item">
                <div class="history-dice">${roll.dice}</div>
                <div class="history-details">
                    <div class="history-round">Round: ${roll.round}</div>
                    <div class="history-time">${formatTimestamp(roll.timestamp)}</div>
                    <div class="history-committee">Committee: ${roll.committee_id || 'N/A'}</div>
                </div>
            </div>
        `).join('');
    }

    animateDice() {
        const diceDisplay = document.getElementById('diceDisplay');
        const animation = document.getElementById('diceAnimation');
        
        // Start rolling animation
        let rollCount = 0;
        const rollInterval = setInterval(() => {
            diceDisplay.textContent = Math.floor(Math.random() * 6) + 1;
            rollCount++;
            if (rollCount > 10) {
                clearInterval(rollInterval);
            }
        }, 100);
    }

    showLoading(show) {
        const loading = document.getElementById('loading');
        const button = document.getElementById('rollButton');
        
        loading.classList.toggle('hidden', !show);
        button.disabled = show;
        
        if (show) {
            button.style.opacity = '0.6';
        } else {
            button.style.opacity = '1';
        }
    }

    showError(message) {
        // Simple error display - could be enhanced with a toast notification
        alert(message);
    }

    showVerificationResult(message) {
        const resultDiv = document.getElementById('verificationResult');
        resultDiv.textContent = message;
        resultDiv.style.opacity = '0';
        setTimeout(() => {
            resultDiv.style.opacity = '1';
        }, 100);
    }
}

// Initialize the app
document.addEventListener('DOMContentLoaded', () => {
    new FairDice();
});

export default FairDice;