# 🚀 Быстрый старт: GitHub Pages

## За 5 минут ваш сайт будет онлайн!

### 1️⃣ Создайте репозиторий на GitHub

- Зайдите на [github.com](https://github.com)
- Нажмите "New repository"
- Название: `map-brif` (или любое другое)
- **Обязательно:** Публичный репозиторий
- НЕ добавляйте README, .gitignore, лицензию

### 2️⃣ Загрузите код

```bash
# В папке проекта
git init
git remote add origin https://github.com/ВАШ_USERNAME/map-brif.git
git add .
git commit -m "Initial commit"
git push -u origin main
```

### 3️⃣ Настройте GitHub Pages

- Перейдите в **Settings** → **Pages**
- **Source:** "GitHub Actions"
- Сохраните

### 4️⃣ Обновите base URL

В файле `vite.config.js` замените `map-brif` на название вашего репозитория:

```javascript
base: "/ВАШ_РЕПОЗИТОРИЙ/",
```

### 5️⃣ Задеплойте

```bash
git add .
git commit -m "Update base URL"
git push origin main
```

## 🎉 Готово!

Ваш сайт будет доступен по адресу:
**`https://ВАШ_USERNAME.github.io/ВАШ_РЕПОЗИТОРИЙ/`**

## ✅ Что получите:

- 🆓 **Бесплатный хостинг**
- 🔄 **Автоматические обновления**
- 🔒 **HTTPS** включен
- ⚡ **Быстрая загрузка**
- 📱 **Работает на всех устройствах**

## 🔧 Если что-то не работает:

1. Проверьте **GitHub Actions** в репозитории
2. Убедитесь, что **base URL** правильный
3. Проверьте, что репозиторий **публичный**

**Подробная инструкция:** `GITHUB_PAGES.md`
