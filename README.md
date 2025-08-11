# Fair Dice VRF - dcipher Network

A beautiful, modern demonstration of verifiable fair randomness using **dcipher Network's threshold cryptography**. This application showcases how distributed trust eliminates single points of failure in random number generation.

## ✨ Features

- 🎲 **Cryptographically Fair**: Uses dcipher's threshold network for tamper-proof randomness
- ⚖️ **No Modulo Bias**: Implements rejection sampling for perfectly fair dice distribution
- 🔍 **Publicly Verifiable**: Anyone can verify randomness through threshold cryptographic proofs
- 🌐 **Distributed Trust**: No single party can manipulate the outcome
- 💫 **Beautiful UI**: Modern, responsive design with smooth animations
- ⚡ **Real-time**: Live connection to dcipher network

## 🏗️ Architecture

This implementation demonstrates the practical application of threshold cryptography concepts covered in the article "From Polynomials to Distributed Secrets: Understanding the Foundations of dcipher Network with Threshold Cryptography."

### Mathematical Foundation
- **Shamir Secret Sharing**: f(x) = secret + a₁x + a₂x² for distributed secrets
- **BLS Signatures**: Threshold-friendly signature aggregation
- **Lagrange Interpolation**: Reconstructing secrets from threshold shares
- **Rejection Sampling**: Eliminating modulo bias for fair outcomes

### dcipher Integration
- **Threshold Randomness**: Distributed VRF generation across multiple nodes
- **Committee Consensus**: Rotating committees ensure network resilience  
- **Cryptographic Proofs**: BLS threshold signatures provide verifiability
- **No Single Point of Failure**: Mathematical guarantees of fairness

## 🚀 Quick Start

### Prerequisites
- Modern web browser with ES6 module support
- Python 3.x or Node.js (for local server)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd fair-dice-dcipher
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start local server**
   ```bash
   # Option 1: Using npm script
   npm run start
   
   # Option 2: Using Python
   python -m http.server 8000
   
   # Option 3: Using Node.js
   npx http-server -p 8000
   ```

4. **Open in browser**
   ```
   http://localhost:8000
   ```

## 🎯 How It Works

### 1. Threshold Randomness Generation
```javascript
// dcipher network generates randomness through threshold consensus
const randomnessData = await fetchDcipherRandomness();
```

### 2. Fair Dice Conversion
```javascript
// Rejection sampling eliminates modulo bias
const diceResult = avoidModuloBias(randomBytes, 6) + 1;
```

### 3. Cryptographic Verification
```javascript
// Verify threshold proofs and signatures
const isValid = await verify(round, signature, thresholdProof, randomness);
```

## 🔧 Project Structure

```
fair-dice-dcipher/
├── index.html              # Main application interface
├── js/
│   ├── dice.js             # Core dice rolling logic & dcipher integration
│   ├── verify.js           # Threshold cryptography verification
│   └── utils.js            # Helper functions & bias prevention
├── css/
│   └── style.css           # Modern responsive styling
├── package.json            # Dependencies and scripts
└── README.md              # This file
```

## 🎮 Usage

1. **Roll the Dice**: Click "Roll Fair Dice" to generate a cryptographically fair result
2. **View Details**: See the randomness hash, round number, and committee info
3. **Verify Result**: Click "Verify Randomness" to check cryptographic proofs
4. **Review History**: Browse previous rolls in the history section

## 🔐 Security Features

### Threshold Cryptography
- **Distributed Generation**: No single party can bias the outcome
- **Committee Rotation**: Dynamic node selection prevents collusion  
- **Cryptographic Proofs**: BLS signatures provide mathematical verification
- **Rejection Sampling**: Eliminates statistical bias in dice conversion

### Network Properties
- **Byzantine Fault Tolerance**: Continues operating with up to 1/3 malicious nodes
- **Public Verifiability**: Anyone can verify randomness independently
- **Tamper Evidence**: Any manipulation attempt is cryptographically detectable

## 🧮 Mathematical Background

This implementation demonstrates several key concepts:

- **Polynomial Secret Sharing**: How f(x) = s + ax + bx² enables distributed secrets
- **Lagrange Interpolation**: Reconstructing secrets from threshold shares
- **BLS Signatures**: Signature schemes that aggregate naturally
- **Pairing-Based Cryptography**: The mathematical engine behind verification

## 🌐 dcipher Network

dcipher Network is the first generalized threshold network, enabling:

- **Conditional Signing**: Signatures based on distributed agreement
- **Conditional Decryption**: Unlocking data when conditions are met
- **Verifiable Randomness**: Bias-resistant random number generation
- **Plugin Architecture**: Extensible threshold operations

## 📚 Learn More

- **dcipher Network**: [docs.dcipher.network](https://docs.dcipher.network)
- **Randamu**: [randa.mu](https://randa.mu)
- **Threshold Cryptography**: Academic papers and research
- **BLS Signatures**: Boneh-Lynn-Shacham signature specification

## 🤝 Contributing

Contributions are welcome! Please feel free to submit issues, feature requests, or pull requests.

## 📄 License

MIT License - see LICENSE file for details.

---

**Built with ♥ using dcipher Network's threshold cryptography**

*This implementation serves as both a practical application and educational tool for understanding how mathematical concepts like Shamir's Secret Sharing translate into real-world distributed systems.*