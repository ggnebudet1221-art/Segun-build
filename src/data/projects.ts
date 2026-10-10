import { assetPath } from '../lib/assets';

export type Project = {
  id: string;
  title: string;
  type: string;
  summary: string;
  cover: string;
  images: string[];
};

export const projects: Project[] = [
  {
    id: 'bright-apartment',
    title: 'Светлая квартира',
    type: 'Placeholder-проект',
    summary: 'Пример карточки для будущей замены на реальный объект: чистовая отделка, стены, напольные покрытия и аккуратные узлы примыкания.',
    cover: assetPath('placeholders/project-living.svg'),
    images: [
      assetPath('placeholders/project-living.svg'),
      assetPath('placeholders/project-kitchen.svg'),
      assetPath('placeholders/project-bedroom.svg')
    ]
  },
  {
    id: 'bathroom-tile',
    title: 'Санузел с плиткой',
    type: 'Placeholder-проект',
    summary: 'Здесь можно показать плиточные работы, подготовку основания, сантехнические выводы и финальный вид помещения.',
    cover: assetPath('placeholders/project-bathroom.svg'),
    images: [
      assetPath('placeholders/project-bathroom.svg'),
      assetPath('placeholders/project-tile.svg'),
      assetPath('placeholders/project-detail.svg')
    ]
  },
  {
    id: 'house-finish',
    title: 'Отделка дома',
    type: 'Placeholder-проект',
    summary: 'Карточка под объект частного дома: перегородки, штукатурка, покраска, напольные покрытия и потолки.',
    cover: assetPath('placeholders/project-house.svg'),
    images: [
      assetPath('placeholders/project-house.svg'),
      assetPath('placeholders/project-living.svg'),
      assetPath('placeholders/project-detail.svg')
    ]
  },
  {
    id: 'commercial-space',
    title: 'Коммерческое помещение',
    type: 'Placeholder-проект',
    summary: 'Пример для офиса, студии или небольшого торгового помещения: подготовка, инженерные работы и финишная отделка.',
    cover: assetPath('placeholders/project-commercial.svg'),
    images: [
      assetPath('placeholders/project-commercial.svg'),
      assetPath('placeholders/project-kitchen.svg'),
      assetPath('placeholders/project-detail.svg')
    ]
  }
];
