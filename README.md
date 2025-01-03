# Vardabit E-commerce


![image](https://github.com/user-attachments/assets/63518619-e4d0-49fe-b49b-fb7c796cd714)



Modern bir e-ticaret uygulaması. React, TypeScript, Redux Toolkit ve Tailwind CSS ile geliştirilmiştir.

## 🚀 Demo

[Live Demo](https://case-app-oguzhanakca.vercel.app/)

## ✨ Özellikler

- 🛍️ Ürün listeleme ve detay sayfaları
- 🔍 Arama ve filtreleme
- 🛒 Sepet yönetimi
- 💾 LocalStorage persistence
- 📱 Responsive tasarım
- ⚡ Hızlı yükleme performansı

## 🛠️ Teknolojiler

- React 18
- TypeScript
- Redux Toolkit
- Tailwind CSS
- Vite
- Jest & React Testing Library

## 🚀 Kurulum

```bash
# Repoyu klonlayın
git clone https://github.com/yourusername/case-app.git

# Proje dizinine gidin
cd case-app

# Bağımlılıkları yükleyin
npm install

# Geliştirme sunucusunu başlatın
npm run dev
```

## 📝 Testler

```bash
# Tüm testleri çalıştırın
npm test

# Test coverage raporu
npm test -- --coverage
```

## 📦 Build

```bash
# Production build oluşturun
npm run build
```

## 🌟 Özellikler

- Ürün listeleme ve filtreleme
- Detaylı ürün sayfaları
- Sepet yönetimi
- Arama fonksiyonu
- Responsive tasarım
- Unit testler
- LocalStorage entegrasyonu
- API entegrasyonu

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

MIT License - daha fazla detay için [LICENSE.md](LICENSE.md) dosyasına bakın.




# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
