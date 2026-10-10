export type Project = {
  id: string;
  title: string;
  type: string;
  summary: string;
  cover: string;
  images: string[];
};

const img = (id: string, width = 1400, height = 1000) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${height}&q=82`;

export const projects: Project[] = [
  {
    id: 'bright-apartment',
    title: 'Светлая квартира',
    type: 'Placeholder-проект',
    summary: 'Пример карточки для будущей замены на реальный объект: чистовая отделка, стены, напольные покрытия и аккуратные узлы примыкания.',
    cover: img('photo-1600607687920-4e2a09cf159d', 1400, 1500),
    images: [
      img('photo-1600607687920-4e2a09cf159d'),
      img('photo-1600566753190-17f0baa2a6c3'),
      img('photo-1600210492486-724fe5c67fb0')
    ]
  },
  {
    id: 'bathroom-tile',
    title: 'Санузел с плиткой',
    type: 'Placeholder-проект',
    summary: 'Здесь можно показать плиточные работы, подготовку основания, сантехнические выводы и финальный вид помещения.',
    cover: img('photo-1620626011761-996317b8d101', 1400, 1000),
    images: [
      img('photo-1620626011761-996317b8d101'),
      img('photo-1600566752355-35792bedcfea'),
      img('photo-1584622650111-993a426fbf0a')
    ]
  },
  {
    id: 'house-finish',
    title: 'Отделка дома',
    type: 'Placeholder-проект',
    summary: 'Карточка под объект частного дома: перегородки, штукатурка, покраска, напольные покрытия и потолки.',
    cover: img('photo-1600585154340-be6161a56a0c', 1500, 1100),
    images: [
      img('photo-1600585154340-be6161a56a0c'),
      img('photo-1600607688969-a5bfcd646154'),
      img('photo-1600566753086-00f18fb6b3ea')
    ]
  },
  {
    id: 'commercial-space',
    title: 'Коммерческое помещение',
    type: 'Placeholder-проект',
    summary: 'Пример для офиса, студии или небольшого торгового помещения: подготовка, инженерные работы и финишная отделка.',
    cover: img('photo-1497366754035-f200968a6e72', 1500, 1100),
    images: [
      img('photo-1497366754035-f200968a6e72'),
      img('photo-1497366811353-6870744d04b2'),
      img('photo-1604328698692-f76ea9498e76')
    ]
  }
];
