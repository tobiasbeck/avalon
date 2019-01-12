import { Character, KnightName } from "./types";

export const CHARACTERS: Array<Character> = [
  {
    role: 'servant',
    name: 'Servant',
    description: "Knows nothing about the other roles",
    team: 'good',
    special: false,
    default: true,
  },
  {
    role: 'minion',
    name: 'Minion',
    description: "Knows other evil players",
    team: 'evil',
    special: false,
    default: true,
  },
  {
    role: 'merlin',
    name: 'Merlin',
    description: "Knows evil players",
    team: 'good',
    special: 'merlin',
    default: true,
  },
  {
    role: 'assassin',
    name: 'Assasin',
    description: "<ul><li>Knows other evil players</li><li>Can kill one player at the end</li></ul>",
    team: 'evil',
    special: 'assassin',
    default: true
  },
  {
    role: 'percival',
    name: 'Percvial',
    description: "Knows Merlin (and Morgana)",
    team: 'good',
    special: 'percival'
  },
  {
    role: 'mordred',
    name: 'Mordred',
    description: "<ul><li>Knows other evil players</li><li>Is not known by Merlin</li></ul>",
    team: 'evil',
    special: 'mordred'
  },
  {
    role: 'oberon',
    name: 'Oberon',
    description: "<ul><li>Does not know the other evil player</li><li>Evil player do not know him</li></ul>",
    team: 'evil',
    special: 'oberon'
  },
  {
    role: 'morgana',
    name: 'Morgana',
    description: "Percival sees her as Merlin",
    team: 'evil',
    special: 'morgana'
  }
];
export const GAME_SIZES = {
  5: {
    evils: 2,
    quests: [
      {
        players: 2,
        fails: 1
      },
      {
        players: 3,
        fails: 1
      },
      {
        players: 2,
        fails: 1
      },
      {
        players: 3,
        fails: 1
      },
      {
        players: 3,
        fails: 1
      }
    ]
  },
  6: {
    evils: 2,
    quests: [
      {
        players: 2,
        fails: 1
      },
      {
        players: 3,
        fails: 1
      },
      {
        players: 4,
        fails: 1
      },
      {
        players: 3,
        fails: 1
      },
      {
        players: 4,
        fails: 1
      }
    ]
  },
  7: {
    evils: 3,
    quests: [
      {
        players: 2,
        fails: 1
      },
      {
        players: 3,
        fails: 1
      },
      {
        players: 3,
        fails: 1
      },
      {
        players: 4,
        fails: 2
      },
      {
        players: 4,
        fails: 1
      }
    ]
  },
  8: {
    evils: 3,
    quests: [
      {
        players: 3,
        fails: 1
      },
      {
        players: 4,
        fails: 1
      },
      {
        players: 4,
        fails: 1
      },
      {
        players: 5,
        fails: 2
      },
      {
        players: 5,
        fails: 1
      }
    ]
  },
  9: {
    evils: 3,
    quests: [
      {
        players: 3,
        fails: 1
      },
      {
        players: 4,
        fails: 1
      },
      {
        players: 4,
        fails: 1
      },
      {
        players: 5,
        fails: 2
      },
      {
        players: 5,
        fails: 1
      }
    ]
  },
  10: {
    evils: 4,
    quests: [
      {
        players: 3,
        fails: 1
      },
      {
        players: 4,
        fails: 1
      },
      {
        players: 4,
        fails: 1
      },
      {
        players: 5,
        fails: 2
      },
      {
        players: 5,
        fails: 1
      }
    ]
  }
}

export const KNIGHT_NAMES:{m: Array<KnightName>, f: Array<KnightName>} = {
  m: [
    { prefix: 'Knight' },
    { prefix: 'Squire' },
    { prefix: 'Prince' },
    { prefix: 'Landgrave' },
    { prefix: 'Viscount' },
    { prefix: 'Lord' },
    { prefix: 'Alderman' },
    { prefix: 'Bishop' },
    { prefix: 'Earl' },
    { prefix: 'Duke' },
    { prefix: 'Serf' },
    { prefix: 'Baron' },
    { prefix: 'Baronet' },
  ],
  f: [
    { prefix: 'Empress' },
    { prefix: 'Queen' },
    { prefix: 'Princess' },
    { prefix: 'Landgravine' },
    { prefix: 'Viscountess' },
    { prefix: 'Lady' },
    { prefix: 'Countess' },
    { prefix: 'Duchess' },
    { prefix: 'Baroness' },
    { prefix: 'Baronetess' },
  ]
}