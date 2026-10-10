# Сайт-визитка команды мастеров

Статический сайт на Vite + React + TypeScript. Подходит для Cloudflare Pages без backend и базы данных.

## Запуск локально

```bash
npm install
npm run dev
```

## Где менять контакты

Все контактные данные лежат в `src/config/site.ts`:

- название команды;
- телефон и отображаемый телефон;
- Telegram;
- WhatsApp;
- город / регион;
- email и соцсети на будущее.

## Как добавить новую работу

Портфолио редактируется в `src/data/projects.ts`. Добавьте новый объект в массив `projects`:

```ts
{
  id: 'new-project',
  title: 'Название объекта',
  type: 'Квартира / дом / коммерческое помещение',
  summary: 'Короткое описание выполненных работ.',
  cover: '/projects/new-project/cover.webp',
  images: [
    '/projects/new-project/cover.webp',
    '/projects/new-project/detail-1.webp'
  ]
}
```

## Как заменить фотографии

Положите оптимизированные изображения в `public/projects/название-объекта/` и укажите пути в `src/data/projects.ts`.

Рекомендации:

- формат `webp` или `avif`;
- ширина 1400-1800 px для крупных фото;
- вес одного изображения желательно держать до 300-500 KB;
- реальные фотографии не смешивать с текущими placeholder-фото.

## Сборка

```bash
npm run build
```

Готовый production-сайт появится в папке `dist`.

## Cloudflare Pages

Настройки проекта:

- Framework preset: `Vite`;
- Build command: `npm run build`;
- Build output directory: `dist`;
- Node.js version: 22 или новее.

После получения реального домена замените `https://example.pages.dev` в `public/sitemap.xml` и `public/robots.txt`.

## Аналитика

Клики по Telegram, WhatsApp, телефону, CTA и просмотры проектов уже проходят через `src/lib/analytics.ts`. Сейчас события отправляются как `CustomEvent`, чтобы позднее можно было подключить Cloudflare Web Analytics, Plausible, Яндекс Метрику или другую систему без переписывания компонентов.
