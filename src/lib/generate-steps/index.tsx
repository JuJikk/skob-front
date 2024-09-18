import type { Step } from "react-joyride"

export const generateSteps = (): Step[] => [
  {
    content: (
      <div className="px-3 pb-0 mx-8">
        <p className="text-4xl">Скоб!</p>
        <p className="mt-4 text-xl">
          Це маленький гайд щоб тобі було легше зрозуміти як працювати з сайтом
        </p>
        <div className="mt-4 border-b border-sessionbutton-foreground" />
      </div>
    ),
    locale: { skip: <strong aria-label="skip">Пропустити</strong> },
    styles: {
      options: {
        width: 500,
      },
    },
    placement: "center",
    target: "body",
  },

  {
    content: (
      <div className="mb-4 flex flex-col gap-4 px-2 text-left">
        <p className="mr-4 text-base font-bold">Юнаки</p>
        <p className="mr-2 text-sm">
          Тут ти можеш міняти своїх юнаків щоб побачити їх проби
        </p>
      </div>
    ),
    locale: { skip: <strong aria-label="skip">Пропустити</strong> },
    styles: {
      options: {
        width: 380,
      },
    },
    placement: "bottom",
    target: "#user-select",
  },

  {
    content: (
      <div className="mb-4 flex flex-col gap-4 px-2 text-left">
        <p className="mr-4 text-base font-bold">Центр керування</p>
        <p className="mr-2 text-sm">Тут заховані основні функції, ти можеш:</p>
        <ul className="list-disc pl-4">
          <li>Додати юнака в гурток</li>
          <li>Підписати цілу пробу юнаку</li>
          <li>Редагувати інформацію про юнака</li>
        </ul>
        <p className="mr-2 text-sm">Зайди щоб перевірити)</p>
      </div>
    ),
    styles: {
      options: {
        width: 380,
      },
    },
    locale: { skip: <strong aria-label="skip">Пропустити</strong> },
    placement: "bottom",
    target: "#dropdown",
  },

  {
    content: (
      <div className="mb-4 flex flex-col gap-4 px-2 text-left">
        <p className="mr-4 text-base font-bold">Проби</p>
        <p className="mr-2 text-sm">
          А ось тут ти зможеш підписати проби та відслідковувати прогрес своїх юнаків
        </p>
      </div>
    ),
    locale: { skip: <strong aria-label="skip">Пропустити</strong> },
    styles: {
      options: {
        width: 380,
      },
    },
    placement: "top",
    target: "#accordion",
  },
]