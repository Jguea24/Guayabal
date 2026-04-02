# 📱 Licorería Guayabal – App móvil

Aplicación React Native (CLI) con arquitectura **MVVM**. Incluye onboarding, autenticación, catálogo de productos, perfil de usuario y consumo de una **API REST**.

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

## ✅ Implementación (UI y flujo)
- Onboarding con pantallas: Welcome, Benefits, Permissions, Access
- Registro e inicio de sesión con validaciones y mensajes
- Persistencia de sesión y navegación protegida
- Home con banners, categorías, búsqueda y listado de productos
- Detalle de producto con imagen, precio, stock, rating y agregar al carrito
- Perfil con datos del usuario, resumen, preferencias y cierre de sesión

---

## ✅ Implementación (sesión y almacenamiento)
- Tokens guardados en AsyncStorage
- Refresh token automático en el interceptor de Axios
- Perfil cacheado y preferencias persistidas
- Flag de onboarding guardado localmente

---

## ✅ Implementación (servicios/API listos)
- Auth: login, registro y refresh token
- Productos: listado y detalle
- Categorías y banners
- Carrito: agregar, listar, actualizar y eliminar
- Perfil: obtener y actualizar, cambio de contraseña
- Direcciones: CRUD
- Órdenes: crear y listar
- Geolocalización: autocomplete y geocode
- Solicitud de roles: driver / provider

---

## ✅ Pruebas
- Tests unitarios para authLogic, authStorage, productService, profileLogic y App

---

## 📸 Evidencias
- Pantalla de Login
- Pantalla de Registro
- Pantalla Home (vista protegida)
