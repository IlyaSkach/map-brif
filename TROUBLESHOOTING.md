# 🔧 Устранение проблем с GitHub Pages

## ✅ Что исправлено:

### 1. **Обновлен GitHub Actions workflow**

- Использован **официальный GitHub Pages action** вместо стороннего
- Добавлены **правильные permissions** для деплоя
- Настроен **environment** для GitHub Pages
- Добавлен **workflow_dispatch** для ручного запуска

### 2. **Новая конфигурация workflow:**

```yaml
permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    # Сборка проекта
  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
```

## 🚀 Что делать сейчас:

### 1. **Проверьте GitHub Actions**

1. Зайдите в ваш репозиторий: [https://github.com/IlyaSkach/map-brif/actions](https://github.com/IlyaSkach/map-brif/actions)
2. Должен появиться **новый workflow run** с исправлениями
3. **Дождитесь завершения** (обычно 2-3 минуты)

### 2. **Если workflow все еще падает:**

1. **Нажмите на failed workflow**
2. **Посмотрите логи** - какая именно ошибка
3. **Проверьте, что GitHub Pages настроен** в Settings → Pages

### 3. **Настройте GitHub Pages (если еще не сделано):**

1. **Settings** → **Pages**
2. **Source:** "GitHub Actions"
3. **Сохраните**

## 🐛 Возможные проблемы и решения:

### Проблема: "Permission denied"

**Решение:** Убедитесь, что GitHub Pages настроен в Settings → Pages

### Проблема: "Build failed"

**Решение:**

1. Проверьте логи в GitHub Actions
2. Убедитесь, что все файлы загружены в репозиторий

### Проблема: "No such file or directory"

**Решение:**

1. Проверьте, что папка `src/` есть в репозитории
2. Убедитесь, что `package.json` и `package-lock.json` загружены

### Проблема: "npm ci failed"

**Решение:**

1. Проверьте, что `package-lock.json` есть в репозитории
2. Убедитесь, что все зависимости указаны в `package.json`

## 🔍 Проверка репозитория:

Убедитесь, что в репозитории есть все файлы:

- ✅ `src/` папка с кодом
- ✅ `package.json`
- ✅ `package-lock.json`
- ✅ `vite.config.js`
- ✅ `.github/workflows/deploy.yml`

## 📱 После успешного деплоя:

Ваш сайт будет доступен по адресу:
**`https://ilyaskach.github.io/map-brif/`**

## 🆘 Если ничего не помогает:

### Вариант 1: Ручной деплой

```bash
# Соберите проект локально
npm run build

# Загрузите папку dist/ в репозиторий
git add dist/
git commit -m "Add built files"
git push origin main
```

### Вариант 2: Используйте Netlify

1. Зайдите на [netlify.com](https://netlify.com)
2. Подключите ваш GitHub репозиторий
3. Настройки: Build command: `npm run build`, Publish: `dist`

### Вариант 3: Используйте Vercel

1. Зайдите на [vercel.com](https://vercel.com)
2. Подключите ваш GitHub репозиторий
3. Автоматически определит настройки

## 📞 Поддержка:

Если проблемы сохраняются:

1. **Проверьте логи** в GitHub Actions
2. **Убедитесь**, что все файлы загружены
3. **Попробуйте** другой хостинг (Netlify, Vercel)
4. **Обратитесь** к документации GitHub Pages

## 🎯 Ожидаемый результат:

После исправления workflow должен:

- ✅ **Собрать проект** без ошибок
- ✅ **Задеплоить** на GitHub Pages
- ✅ **Сделать сайт доступным** по адресу `https://ilyaskach.github.io/map-brif/`

**Проверьте GitHub Actions сейчас!** 🚀
