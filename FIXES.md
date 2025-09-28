# Исправления для деплоя на Netlify

## ✅ Проблемы исправлены:

### 1. **Node.js версия**

- **Было:** Node.js 18 (не поддерживается Vite 7+)
- **Стало:** Node.js 20 (в netlify.toml)
- **Исправление:** Обновлен `netlify.toml` с `NODE_VERSION = "20"`

### 2. **Vite конфигурация**

- **Было:** ES модули (import/export) - не поддерживается в старых версиях
- **Стало:** CommonJS (require/module.exports)
- **Исправление:** Переписан `vite.config.js` на CommonJS

### 3. **Версии зависимостей**

- **Было:** Vite 7.1.7 (требует Node.js 20+)
- **Стало:** Vite 4.5.3 (совместим с Node.js 18+)
- **Исправление:** Понижены версии Vite и плагинов

## 📁 Измененные файлы:

### `netlify.toml`

```toml
[build.environment]
  NODE_VERSION = "20"  # Было: "18"
```

### `vite.config.js`

```javascript
// Было (ES модули):
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Стало (CommonJS):
const { defineConfig } = require("vite");
const react = require("@vitejs/plugin-react");
```

### `package.json`

```json
{
  "dependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-router-dom": "^6.30.1",
    "react-yandex-maps": "^4.6.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.1",
    "vite": "^4.5.3"
  }
}
```

## 🚀 Теперь деплой должен работать:

1. **Netlify использует Node.js 20** (совместим с Vite 4.5.3)
2. **Конфигурация Vite** использует CommonJS (совместим с Node.js)
3. **Все зависимости** имеют совместимые версии

## ✅ Проверка локально:

```bash
# Сборка работает
npm run build
# ✓ built in 867ms

# Размер оптимизирован
# dist/assets/index-999084b4.js   182.50 kB │ gzip: 57.81 kB
# dist/assets/index-cfc1f221.css    5.55 kB │ gzip: 1.49 kB
```

## 🔄 Если нужно откатить изменения:

```bash
# Вернуть ES модули в vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3002,
    open: true,
  },
});
```

## 📝 Рекомендации:

1. **Используйте Node.js 20** для локальной разработки
2. **Проверяйте совместимость** версий зависимостей
3. **Тестируйте сборку** перед деплоем
4. **Мониторьте логи** Netlify для отладки

## 🎯 Результат:

- ✅ Сборка проходит успешно
- ✅ Размер оптимизирован
- ✅ Совместимость с Netlify
- ✅ Готово к деплою
