# 🎵 SonicCast

### Offline Acoustic Communication Using Smartphones

## 👥 Team Members

- **Selvamuthukumaran K**
- **Salma A R**


SonicCast is an **offline, device-to-device communication system** that uses the speakers and microphones of Android smartphones to transmit data acoustically. It does not depend on the Internet, Wi-Fi, Bluetooth, GPS, a backend server, a database, or any external hardware.

The project combines a **React frontend** with a **Capacitor Android application** and a **Kotlin-based native audio layer**. Messages are converted into packets, protected using CRC-16, modulated using **4-FSK**, transmitted through the phone speaker, and recovered by another phone through its microphone.

---

## ✨ Key Features

- 📡 Completely offline communication
- 🔊 Uses smartphone speakers for transmission
- 🎙️ Uses smartphone microphones for reception
- 📱 Supports phone-to-phone acoustic communication
- 🔢 4-FSK digital modulation
- 🧩 Packet-based message transmission
- 🛡️ CRC-16 error detection
- 🔄 Retransmission for reliability
- 🧠 Optional Forward Error Correction (FEC)
- ✅ Acoustic acknowledgement (ACK)
- 🆔 Temporary local receiver IDs
- ⚛️ React-based user interface
- 🤖 Kotlin native Android audio layer
- 📦 Capacitor Android packaging
- 🌐 No Internet, backend, or database required

---

## 🏗️ Architecture

```text
                         ANDROID PHONE A
                             SENDER
                                │
                                ▼
                    ┌─────────────────────┐
                    │   React Frontend    │
                    │ JavaScript + CSS    │
                    └──────────┬──────────┘
                               │
                               ▼
                         Packet Encoder
                               │
                               ▼
                             CRC-16
                               │
                               ▼
                             4-FSK
                               │
                               ▼
                          AudioTrack
                               │
                               ▼
                            SPEAKER
                               │
                         SOUND WAVES
              ┌────────────────┼────────────────┐
              ▼                ▼                ▼
           PHONE B          PHONE C          PHONE D
          RECEIVER         RECEIVER         RECEIVER
              │                │                │
         Microphone       Microphone       Microphone
              │                │                │
         AudioRecord      AudioRecord      AudioRecord
              │                │                │
           4-FSK            4-FSK            4-FSK
          Decoder          Decoder          Decoder
              │                │                │
            CRC              CRC              CRC
              │                │                │
           Message          Message          Message
              │                │                │
             ACK              ACK              ACK
              └────────────────┼────────────────┘
                               ▼
                    Sender receives ACKs
```

**There is no server in this architecture.**

---

## 🛠️ Technology Stack

| Component | Technology |
|---|---|
| Frontend | **React** |
| UI Logic | **JavaScript** |
| Styling | **CSS** |
| Android Packaging | **Capacitor** |
| Native Android Layer | **Kotlin** |
| Speaker Output | Android `AudioTrack` |
| Microphone Input | Android `AudioRecord` |
| Modulation | **4-FSK** |
| Synchronization | Preamble + Sync Detection |
| Error Detection | **CRC-16** |
| Error Recovery | Retransmission + Optional FEC |
| Receiver Confirmation | Acoustic ACK |
| Database | **None** |
| Backend | **None** |
| Internet | **Not Required** |
| Wi-Fi | **Not Required** |
| Bluetooth | **Not Required** |
| GPS / Location | **Not Required** |
| External Hardware | **Not Required** |

---

## 🔄 How SonicCast Works

### Sender

```text
User enters message
        ↓
React UI
        ↓
JavaScript
        ↓
Packet creation
        ↓
CRC-16
        ↓
4-FSK modulation
        ↓
Kotlin native audio layer
        ↓
AudioTrack
        ↓
Phone speaker
        ↓
Acoustic signal
```

### Receiver

```text
Acoustic signal
        ↓
Phone microphone
        ↓
AudioRecord
        ↓
Signal detection
        ↓
Preamble + synchronization
        ↓
4-FSK demodulation
        ↓
Packet reconstruction
        ↓
CRC-16 verification
        ↓
Message recovery
        ↓
ACK transmission
        ↓
Message displayed in React UI
```

---

## 📦 Packet Structure

A message is converted into a structured packet before acoustic transmission.

```text
┌──────────┬──────────┬──────────┬──────────┬───────────┐
│ Preamble │   Sync   │  Header  │  Length  │  Payload  │
└──────────┴──────────┴──────────┴──────────┴───────────┘
                                                   │
                                                   ▼
                                              ┌────────┐
                                              │ CRC-16 │
                                              └────────┘
```

The packet can contain:

- Preamble for signal detection
- Synchronization sequence
- Packet/header information
- Message length
- Sequence number
- Payload/message data
- CRC-16 checksum

---

## 📻 4-FSK Modulation

SonicCast uses **4-FSK (Four-level Frequency Shift Keying)** for acoustic data transmission.

Each symbol represents one of four possible frequencies:

```text
Symbol 00 → Frequency F1
Symbol 01 → Frequency F2
Symbol 10 → Frequency F3
Symbol 11 → Frequency F4
```

This allows two bits to be represented by each symbol.

The receiver analyzes the incoming audio signal and determines which frequency was transmitted for each symbol.

---

## 🔐 Error Detection and Recovery

Acoustic communication can be affected by:

- Background noise
- Distance between phones
- Room acoustics
- Speaker characteristics
- Microphone characteristics
- Interference

To improve reliability, SonicCast uses **CRC-16** to detect corrupted packets.

```text
Sender
  │
  ▼
Packet + CRC-16
  │
  ▼
Acoustic Transmission
  │
  ▼
Receiver
  │
  ▼
CRC Verification
  │
  ├── Valid ──────→ Accept Message
  │
  └── Invalid ────→ Request/perform Retransmission
```

Optional **Forward Error Correction (FEC)** can be added to improve recovery from noisy transmissions.

---

## ✅ Acoustic ACK

After successfully receiving and validating a message, the receiver sends an acoustic acknowledgement.

```text
Sender                         Receiver
  │                               │
  │──── Data Packet ─────────────>│
  │                               │
  │                         CRC Check
  │                               │
  │                         Message OK
  │                               │
  │<──────── ACK ─────────────────│
  │                               │
  ▼                               ▼
Success                       Display Message
```

This allows the sender to know which receivers successfully received the transmission.

---

## 🆔 Receiver Identification

SonicCast does not require a server or central database to identify receivers.

Each application installation can generate a temporary local identifier, for example:

```text
Receiver ID: R-4721
Receiver ID: R-8193
Receiver ID: R-2645
```

The sender can display acknowledgement status:

```text
Successfully received by:

✓ R-4721
✓ R-8193
✓ R-2645
```

For a basic implementation, the ID can exist only during the current application session. Optional Android/Capacitor local storage can be used to preserve the ID and settings.

---

## 📱 Application Screens

### Home Screen

```text
┌─────────────────────────────┐
│        SONICCAST            │
│                             │
│  Offline Acoustic           │
│  Communication              │
│                             │
│  ┌───────────────────────┐  │
│  │      📢 SENDER        │  │
│  └───────────────────────┘  │
│                             │
│  ┌───────────────────────┐  │
│  │     🎙 RECEIVER       │  │
│  └───────────────────────┘  │
│                             │
│  Internet: NOT REQUIRED     │
└─────────────────────────────┘
```

### Sender Screen

```text
┌─────────────────────────────┐
│       SEND MESSAGE          │
│                             │
│ ┌─────────────────────────┐ │
│ │ Enter message / URL     │ │
│ └─────────────────────────┘ │
│                             │
│       [ BROADCAST ]         │
│                             │
│ Status: Broadcasting...     │
│                             │
│ RECEIVERS                   │
│ ✓ R-4721                    │
│ ✓ R-8193                    │
│ ⏳ R-2645                   │
└─────────────────────────────┘
```

### Receiver Screen

```text
┌─────────────────────────────┐
│      RECEIVE MESSAGE        │
│                             │
│            🎙️              │
│                             │
│        Listening...         │
│                             │
│          [ STOP ]           │
│                             │
│ Received Message            │
│ ┌─────────────────────────┐ │
│ │ Exam starts at 10 AM    │ │
│ └─────────────────────────┘ │
│                             │
│ CRC: ✓ VERIFIED             │
│ ACK: ✓ SENT                 │
└─────────────────────────────┘
```

---

## 📂 Suggested Project Structure

```text
SonicCast/
│
├── src/
│   ├── App.jsx
│   │
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── Sender.jsx
│   │   └── Receiver.jsx
│   │
│   ├── components/
│   │   ├── MessageBox.jsx
│   │   ├── StatusCard.jsx
│   │   └── ReceiverList.jsx
│   │
│   ├── services/
│   │   ├── acousticService.js
│   │   ├── packetService.js
│   │   └── crcService.js
│   │
│   └── styles/
│       ├── App.css
│       ├── Sender.css
│       └── Receiver.css
│
├── android/
│   └── app/
│       └── src/
│           └── main/
│               └── java/
│                   └── .../
│                       └── SonicCast/
│                           └── AcousticAudioPlugin.kt
│
├── public/
├── capacitor.config.*
├── package.json
└── README.md
```

> The exact native package path and filenames may change as implementation progresses.

---

## 💻 Requirements

### Development Computer

The following tools are recommended:

1. **VS Code**
   - React development
   - JavaScript
   - CSS

2. **Node.js**
   - npm
   - React development tools

3. **Android Studio**
   - Android SDK
   - Kotlin
   - Gradle
   - Android device testing
   - APK generation

4. **JDK 17**

### Android Devices

At least **two Android smartphones** are recommended for testing:

- Phone A → Sender
- Phone B → Receiver

Additional phones can be used to demonstrate one-to-many broadcast communication.

---

## 🚫 What SonicCast Does Not Require

SonicCast is intentionally designed without conventional network infrastructure.

```text
❌ Supabase
❌ Firebase
❌ MySQL
❌ PostgreSQL
❌ PHP backend
❌ Node.js backend server
❌ Internet server
❌ Wi-Fi router
❌ Bluetooth
❌ GPS/location services
❌ External communication hardware
```

---

## 🔒 Privacy

SonicCast is designed around local, offline communication.

- No cloud server is required.
- No central database is required.
- Messages do not need to be uploaded to the Internet.
- Communication occurs through acoustic signals between nearby devices.
- Receiver IDs can be temporary and locally generated.

---

## 🚀 Development Roadmap

### Stage 1 — React UI

Build the core screens:

```text
Home
Sender
Receiver
```

Implement the interface using React, JavaScript, and CSS.

### Stage 2 — Packet Encoder

Implement:

```text
Message
   ↓
Bytes
   ↓
Header
   ↓
Length
   ↓
Sequence Number
   ↓
CRC-16
   ↓
Packet
```

### Stage 3 — Acoustic Transmitter

Implement:

```text
Packet
   ↓
4-FSK
   ↓
Audio Samples
   ↓
AudioTrack
   ↓
Speaker
```

### Stage 4 — Acoustic Receiver

Implement:

```text
Microphone
   ↓
AudioRecord
   ↓
Signal Detection
   ↓
Preamble Detection
   ↓
Synchronization
   ↓
4-FSK Demodulation
   ↓
Packet
   ↓
CRC-16
   ↓
Message
```

### Stage 5 — Reliability

Add:

```text
CRC-16
   +
Retransmission
   +
Optional FEC
```

### Stage 6 — Acoustic ACK

Implement:

```text
Receiver
   ↓
ACK Packet
   ↓
4-FSK
   ↓
Speaker
   ↓
Sender Microphone
   ↓
ACK Detection
```

### Stage 7 — Android APK

Package the application using:

```text
React
   +
Capacitor
   +
Kotlin
       ↓
Android Studio
       ↓
APK
```

---

## 🧪 Testing

SonicCast should be tested under different acoustic conditions.

### Basic Test

```text
Phone A → "Hello SonicCast" → Phone B
```

Expected result:

```text
Phone B:
✓ Message received
✓ CRC verified
✓ ACK sent
```

### Multi-Receiver Test

```text
                 ┌──→ Phone B
Phone A ─────────┼──→ Phone C
                 └──→ Phone D
```

The sender should track acknowledgement status from each receiver.

### Offline Test

Disable:

```text
Wi-Fi       OFF
Mobile Data OFF
Bluetooth   OFF
Location    OFF
```

Then verify that communication continues through sound.

---

## 🎯 Use Cases

SonicCast can demonstrate communication in situations where conventional network connectivity is unavailable or undesirable, such as:

- Offline classroom communication
- Local announcements
- Device-to-device data transfer
- Emergency/off-grid communication experiments
- Indoor proximity communication
- Hackathon demonstrations
- Acoustic networking research and prototyping

---

## ⚠️ Limitations

Because SonicCast uses sound as its communication medium, performance can depend on:

- Distance between devices
- Ambient noise
- Phone speaker volume
- Microphone sensitivity
- Room acoustics
- Frequency response of individual devices
- Transmission speed
- Interference from other sounds

The system is intended for **short-range acoustic communication and experimentation**, rather than replacing high-speed network technologies.

---

## 🌟 Why SonicCast?

Traditional mobile applications usually depend on:

```text
Device
  ↓
Internet / Wi-Fi
  ↓
Server
  ↓
Other Device
```

SonicCast takes a different approach:

```text
Device A
   🔊
   │
   │ Sound
   ▼
Device B
   🎙️
```

This makes the project a practical demonstration of how smartphones can communicate using their existing audio hardware without relying on conventional networking infrastructure.

---

## 📌 Project Summary

**Project Name:** SonicCast

**Team Members:** Selvamuthukumaran K, Salma A R

**SonicCast** is a React + Capacitor Android application that enables **offline acoustic communication between smartphones**.

Its core communication pipeline is:

```text
React
  ↓
JavaScript
  ↓
Capacitor Bridge
  ↓
Kotlin
  ↓
Packet Encoding
  ↓
CRC-16
  ↓
4-FSK
  ↓
AudioTrack
  ↓
Speaker
  ↓
Acoustic Channel
  ↓
AudioRecord
  ↓
4-FSK Demodulation
  ↓
CRC-16
  ↓
Message
  ↓
Acoustic ACK
```

> **SonicCast: Communication without the Internet — using sound.**

---

## 📄 License

This project is intended for educational, research, and hackathon purposes. Add the appropriate open-source license here if the project is released publicly.
