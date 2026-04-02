# 📱 Licorería Guayabal – App móvil

Aplicación React Native (CLI) con arquitectura **MVVM**. Incluye registro e inicio de sesión, persistencia de token y vistas protegidas que consumen una **API REST**.

---

## 🧰 Tecnologías
- React Native CLI + TypeScript
- MVVM (Model–View–ViewModel)
- Axios, AsyncStorage
- API REST
- Git / GitHub

---

## 🗂️ Estructura
```
src/
├── model/
├── navigation/
├── presentation/
│   ├── screens/
│   ├── styles/
│   └── theme/
├── services/
├── shared/
│   └── storage/
└── viewmodel/
```

---

## ⚙️ Requisitos
- Node.js v20+
- npm o yarn
- React Native CLI
- Android Studio + JDK 11+
- Emulador Android o dispositivo físico

---

## 🚀 Instalación y ejecución

1. Clonar el repo
```bash
git clone https://github.com/USUARIO/licoreria-guayabal.git
cd licoreria-guayabal
```

2. Instalar dependencias
```bash
npm install
# o
yarn install
```

3. Configurar URL de API
- Por defecto la app usa:
  - Android Emulator: `http://10.0.2.2:8000/`
  - iOS: `http://localhost:8000/`
- Si quieres cambiarla, edita `src/services/api.ts`.

4. Ejecutar la app en Android
```bash
npx react-native run-android
```

Si Metro no arranca automáticamente:
```bash
npx react-native start
```

---

## ✨ Funcionalidades
- Registro e inicio de sesión
- Persistencia de sesión (token)
- Vistas protegidas y cierre de sesión
- Flujo de onboarding
- Diseño consistente y separación por MVVM

---

## 📸 Evidencias
- Pantalla de Login
- Pantalla de Registro
- Pantalla Home (vista protegida)
