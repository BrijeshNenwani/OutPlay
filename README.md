# 🔐 AuthMate — Your Offline-First Authentication Playground 🚀

Welcome to **AuthMate** – a modern, scalable, and offline-capable React Native starter kit powered by Expo, Redux Toolkit, and SecureStore. Built for real-world mobile authentication flows, crafted with ♥ by a dev who thinks like a CTO.

---

## 🧠 What’s Inside?

| Feature                          | Description |
|----------------------------------|-------------|
| ✅ **Secure Auth Flow**          | Token-based login & registration with SecureStore |
| 💤 **Offline-First Ready**       | Reads token even without internet — just like magic! |
| 🗺️ **React Navigation 6**        | Seamless screen transitions with auth gating |
| 🧠 **Redux Toolkit Integration** | App-wide state management done right |
| 🔐 **JWT Expiry Check**          | Skips stale tokens, no awkward logins |
| 🧪 **Future-Ready Testing Setup**| Unit and integration testing friendly |
| 💄 **Composable UI**             | Built with reusable, testable components |

---

## 🔥 Demo

![auth flow demo](./assets/demo.gif)  
_Watch how AuthMate protects you from stale tokens and sleepy user sessions._

---

## 📦 Tech Stack

- **React Native** with **Expo SDK**
- **React Navigation 6** (Stack, Tabs)
- **Redux Toolkit** + **TypeScript**
- **Expo SecureStore** for secure local storage
- **JWT** for stateless session management
- Clean folder structure + future CI/CD readiness

---

## 🚀 Getting Started

```bash
git clone https://github.com/your-username/authmate.git
cd authmate
npm install
npx expo start
```

---

## 🧱 Folder Structure

```
src/
├── navigation/     # AppNavigator, AuthNavigator, NavigationContainer setup
├── store/          # Redux slices and store config
├── hooks/          # Custom hooks like useAuth
├── context/        # AuthProvider (if not fully moved to Redux)
├── screens/        # Login, Register, Home, etc.
├── components/     # Reusable UI elements
├── services/       # API and SecureStore helpers
└── utils/          # Helper functions (e.g., token expiry checker)
```

---

## 🤖 Pro-Level Auth Design

✅ Token Expiry Check  
✅ Auth Token Refresh (planned)  
✅ SecureStorage → Redux sync  
✅ Conditional Navigation (`AppNavigator` vs `AuthNavigator`)  
✅ Offline Mode Awareness  
✅ Server-driven invalidation (coming soon)

---

## 🧙‍♂️ Dev Commands

```bash
# Run dev server
npx expo start

# Format code
npm run format

# Run tests
npm test
```

---

## 🌍 Contributing

We welcome issues, PRs, and high fives!  
Fork the repo → create a feature branch → push → open a PR.

---

## 📄 License

MIT License © 2025 — [Your Name](https://github.com/your-username)

---

## 🧡 Built With Developer Empathy

Crafted for devs who care about:
- **Performance**
- **Offline capability**
- **Secure flows**
- **Readable architecture**
- **Scalability**

---

> **PS**: Want backend integration too (JWT issuance, refresh logic, user APIs)? Ping me to generate a full-stack version with Express or Django!
