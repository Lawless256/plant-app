// Each option's `archetype` maps to one of 8 plant personality archetypes.
// The archetype with the most votes wins. Ties broken by earliest in this list.
export const ARCHETYPE_ORDER = [
  'devoted',
  'aesthetic',
  'chaotic',
  'overthinker',
  'minimalist',
  'cozy',
  'whisperer',
  'sunshine',
]

export const QUESTIONS = [
  {
    q: "It's Monday morning. Your plants are:",
    options: [
      { text: 'Freshly watered and journaled 📓', archetype: 'devoted' },
      { text: 'Probably fine? 🤷‍♀️', archetype: 'minimalist' },
      { text: 'Definitely thirsty, I forgot 💀', archetype: 'chaotic' },
      { text: "I'm the plant, I need water too 🥲", archetype: 'cozy' },
    ],
  },
  {
    q: 'Pick your plant shelf aesthetic:',
    options: [
      { text: 'Cottagecore chaos with 47 pots 🌾', archetype: 'cozy' },
      { text: 'One perfect dramatic specimen 💅', archetype: 'minimalist' },
      { text: 'Trailing vines everywhere 🌿', archetype: 'sunshine' },
      { text: 'Pink everything, obviously 🌸', archetype: 'aesthetic' },
    ],
  },
  {
    q: 'A new leaf is emerging. You:',
    options: [
      { text: 'Document it in a spreadsheet 📊', archetype: 'overthinker' },
      { text: 'Text 3 friends immediately 📱', archetype: 'aesthetic' },
      { text: 'Name it 💖', archetype: 'whisperer' },
      { text: 'Cry a little (happy tears) 🥹', archetype: 'devoted' },
    ],
  },
  {
    q: 'Your plant care philosophy is:',
    options: [
      { text: 'Tough love 😤', archetype: 'minimalist' },
      { text: 'Helicopter plant parent 🚁', archetype: 'devoted' },
      { text: 'Vibes-based watering ✨', archetype: 'chaotic' },
      { text: 'I talk to them daily 🗣️', archetype: 'whisperer' },
    ],
  },
  {
    q: "You see a plant at the store you don't recognize. You:",
    options: [
      { text: 'Buy it and Google later 🛒', archetype: 'chaotic' },
      { text: 'Research for 2 weeks first 🔬', archetype: 'overthinker' },
      { text: 'Ask it how it’s doing 👋', archetype: 'whisperer' },
      { text: 'Only buy it if it’s pink 💕', archetype: 'aesthetic' },
    ],
  },
  {
    q: 'Ideal Sunday activity:',
    options: [
      { text: 'Propagating cuttings in cute vases 🌱', archetype: 'devoted' },
      { text: 'Repotting everything 🪴', archetype: 'overthinker' },
      { text: 'Making plant TikToks 🎥', archetype: 'aesthetic' },
      { text: 'Napping next to my plants 😴', archetype: 'cozy' },
    ],
  },
  {
    q: 'Your windowsill gets:',
    options: [
      { text: 'Bright indirect light ☁️', archetype: 'minimalist' },
      { text: 'Direct sun all day ☀️', archetype: 'sunshine' },
      { text: 'Sad corner light 🌑', archetype: 'cozy' },
      { text: 'Whatever light it wants, it’s the boss 👑', archetype: 'chaotic' },
    ],
  },
  {
    q: 'Your plant just grew a new leaf. You name it:',
    options: [
      { text: 'Something dignified like Margaux 🎩', archetype: 'minimalist' },
      { text: 'A chaotic name like Lil Stinky 🦨', archetype: 'chaotic' },
      { text: 'After a celebrity (Beyon-leaf) 🎤', archetype: 'aesthetic' },
      { text: 'It already has a family name 👶', archetype: 'whisperer' },
    ],
  },
]

// Plant matches keyed by archetype. Each archetype has a primary plant + 2 compatible matches
// for the "Meet Another Match" cycle button. All photos are real Unsplash plant photos.
export const ARCHETYPES = {
  devoted: {
    label: 'The Devoted Plant Mom',
    tagline: 'You water on schedule and your plants write thank-you notes.',
    blurb:
      "You don't just own plants — you raise them. You remember birthdays (rooting anniversaries), keep a watering log, and have absolutely cried over a yellowing leaf. Your perfect match is a plant that notices the love and shows it off.",
    matches: [
      {
        name: 'Stromanthe Triostar',
        latin: 'Stromanthe sanguinea',
        tagline: 'The Drama Queen of your windowsill',
        blurb:
          "Pink, green, and cream stripes that practically pose for the camera. She's a little needy — loves humidity, hates being moved — but the way she folds her leaves up at night like a prayer? Worth every misting.",
        photo: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=800&q=80',
        whereToBuy: 'Etsy, The Sill',
        price: '$15–25',
        water: 'Weekly, keep humidity high',
        light: 'Bright indirect 🌞',
        difficulty: '💧💧💧 (high-maintenance bestie)',
      },
      {
        name: 'Calathea Orbifolia',
        latin: 'Goeppertia orbifolia',
        tagline: 'The polite roommate who stays up late',
        blurb:
          'Big silvery-striped leaves that move with the sun. She forgives almost nothing about tap water but pays you back in elegance.',
        photo: 'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?w=800&q=80',
        whereToBuy: 'The Sill, Bloomscape',
        price: '$20–35',
        water: 'Weekly with filtered water',
        light: 'Bright indirect 🌞',
        difficulty: '💧💧💧',
      },
      {
        name: 'Maranta Prayer Plant',
        latin: 'Maranta leuconeura',
        tagline: 'Folds her hands at sunset, every single night',
        blurb:
          'Pink veins on velvet green leaves. She literally claps her leaves shut at night — the gentlest goodnight ritual a plant has ever offered.',
        photo: 'https://images.unsplash.com/photo-1620127252536-03bdfcf6d5b8?w=800&q=80',
        whereToBuy: 'Etsy, local nurseries',
        price: '$12–22',
        water: 'When top inch is dry',
        light: 'Medium indirect 🌥️',
        difficulty: '💧💧',
      },
    ],
  },
  aesthetic: {
    label: 'The Aesthetic Collector',
    tagline: "If it's not pink, it's not coming home with you.",
    blurb:
      "Your plant shelf is a curated mood board. You bought a plant once because it matched a vase. You're not sorry. You want a leaf that looks good in natural light AND on a shelfie.",
    matches: [
      {
        name: 'Tradescantia Nanouk',
        latin: 'Tradescantia albiflora ‘Nanouk’',
        tagline: 'Pink, purple, and absolutely shameless about it',
        blurb:
          'Striped in lavender, fuchsia, and mint green like a cotton candy explosion. Trails beautifully, propagates in a glass of water, and basically begs to be photographed.',
        photo: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&q=80',
        whereToBuy: 'Etsy, local nursery',
        price: '$8–15',
        water: 'When top inch is dry',
        light: 'Bright indirect 🌞',
        difficulty: '💧 (easy queen)',
      },
      {
        name: 'Pink Princess Philodendron',
        latin: 'Philodendron erubescens',
        tagline: 'The it-girl with bubblegum splashes',
        blurb:
          'Each leaf is a lottery — pink variegation in chaotic, perfect shapes. She’s pricey but iconic and you know it.',
        photo: 'https://images.unsplash.com/photo-1632981996678-1ce6e83bdd8d?w=800&q=80',
        whereToBuy: 'Etsy, specialty growers',
        price: '$25–60',
        water: 'When top inch is dry',
        light: 'Bright indirect 🌞',
        difficulty: '💧💧',
      },
      {
        name: 'Polka Dot Plant',
        latin: 'Hypoestes phyllostachya',
        tagline: 'A leaf that wears blush',
        blurb:
          'Tiny pink freckles on green leaves. Compact, photogenic, and looks adorable in a tiny terracotta pot on a stack of art books.',
        photo: 'https://images.unsplash.com/photo-1602025984151-5ba9bee07301?w=800&q=80',
        whereToBuy: 'Most nurseries, Home Depot',
        price: '$5–10',
        water: 'Keep slightly moist',
        light: 'Bright indirect 🌞',
        difficulty: '💧💧',
      },
    ],
  },
  chaotic: {
    label: 'The Chaotic Nurturer',
    tagline: 'Vibes-based watering, vibes-based love. Somehow it works.',
    blurb:
      "You forget. You over-water. You under-water. You buy a plant on impulse on a Tuesday. Your plants are alive out of pure spite and devotion to chaos — and they actually thrive on it.",
    matches: [
      {
        name: 'Wandering Dude',
        latin: 'Tradescantia zebrina',
        tagline: 'Purple, fast, and weirdly forgiving',
        blurb:
          "Trails like a waterfall, glows purple in the sun, and bounces back from neglect like nothing happened. You can literally snap off a piece, drop it in dirt, and it'll grow.",
        photo: 'https://images.unsplash.com/photo-1620127518039-fbf01ce6b39d?w=800&q=80',
        whereToBuy: 'Etsy, Home Depot',
        price: '$6–12',
        water: 'When the soil dries (forgiving)',
        light: 'Bright light 🌞',
        difficulty: '💧 (basically immortal)',
      },
      {
        name: 'Pothos',
        latin: 'Epipremnum aureum',
        tagline: 'The plant that survived your worst era',
        blurb:
          "Will grow in low light, will grow in water, will grow if you forget about it for a month. The horse girl of houseplants — loyal forever.",
        photo: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&q=80',
        whereToBuy: 'Literally everywhere',
        price: '$5–15',
        water: 'When leaves droop a little',
        light: 'Anything 🌥️',
        difficulty: '💧 (unkillable)',
      },
      {
        name: 'ZZ Plant',
        latin: 'Zamioculcas zamiifolia',
        tagline: 'Neglected? She thrives.',
        blurb:
          'Glossy leaves on architectural stems. Stores water in its rhizomes — meaning the more you forget, the better. A plant for the chronically over-scheduled.',
        photo: 'https://images.unsplash.com/photo-1632207691143-643e2a9a9361?w=800&q=80',
        whereToBuy: 'Most nurseries',
        price: '$15–30',
        water: 'Every 2–3 weeks',
        light: 'Low to bright 🌥️',
        difficulty: '💧 (she does not need you)',
      },
    ],
  },
  overthinker: {
    label: 'The Plant Overthinker',
    tagline: 'You read three forums before buying a $4 plant.',
    blurb:
      "You have a soil pH meter. You have opinions about LECA. You’ve watched a 47-minute YouTube video on a single propagation method. Your perfect match rewards your obsession with a leaf so weird and beautiful it deserves the spreadsheet.",
    matches: [
      {
        name: 'Caladium',
        latin: 'Caladium bicolor',
        tagline: 'Heart-shaped pink and white drama',
        blurb:
          'Translucent leaves shaped like hearts, splashed with pink, cream, and green. Goes dormant in winter — which means you’ll get to spreadsheet a whole new growing season every spring.',
        photo: 'https://images.unsplash.com/photo-1604762512526-b7b22e2c75c7?w=800&q=80',
        whereToBuy: 'Local nursery, Etsy',
        price: '$10–20',
        water: 'Keep soil consistently moist',
        light: 'Bright indirect 🌞',
        difficulty: '💧💧',
      },
      {
        name: 'Alocasia Polly',
        latin: 'Alocasia × amazonica',
        tagline: 'The houseplant that needs a tutorial',
        blurb:
          'Shiny dark leaves with sharp white veins. She’s opinionated about humidity, light, and how often you breathe near her — perfect for someone who wants a project.',
        photo: 'https://images.unsplash.com/photo-1632981996678-1ce6e83bdd8d?w=800&q=80',
        whereToBuy: 'Etsy, specialty nurseries',
        price: '$15–30',
        water: 'When top inch is dry',
        light: 'Bright indirect 🌞',
        difficulty: '💧💧💧',
      },
      {
        name: 'String of Pearls',
        latin: 'Curio rowleyanus',
        tagline: 'Tiny green beads on a delicate thread',
        blurb:
          'Looks impossible to keep alive — and is, if you don’t research. Likes bright light, infrequent water, and the kind of person who knows the difference.',
        photo: 'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?w=800&q=80',
        whereToBuy: 'Etsy, The Sill',
        price: '$12–25',
        water: 'When pearls feel slightly soft',
        light: 'Bright direct 🌞',
        difficulty: '💧💧💧',
      },
    ],
  },
  minimalist: {
    label: 'The Minimalist Queen',
    tagline: 'One perfect plant. That’s it. That’s the post.',
    blurb:
      "You don’t want a jungle. You want one stunning specimen on a clean ceramic pot, looking sculptural in the corner of a sunlit room. Your match is a plant that earns its space.",
    matches: [
      {
        name: 'Pink Aglaonema',
        latin: 'Aglaonema ‘Lipstick’ / ‘Pink Splash’',
        tagline: 'Architectural, blush-toned, low drama',
        blurb:
          'Broad green leaves edged in soft pink. Tolerates lower light, doesn’t throw tantrums, and looks like she costs more than she does. The Carrara marble of houseplants.',
        photo: 'https://images.unsplash.com/photo-1632981996678-1ce6e83bdd8d?w=800&q=80',
        whereToBuy: 'The Sill, Bloomscape',
        price: '$15–30',
        water: 'When top inch is dry',
        light: 'Low to bright indirect 🌥️',
        difficulty: '💧 (chic and chill)',
      },
      {
        name: 'Snake Plant ‘Moonshine’',
        latin: 'Dracaena trifasciata',
        tagline: 'Silver-green swords. Zero notes.',
        blurb:
          'Pale silvery upright leaves like a piece of sculpture. Will survive almost anything you do or don’t do. Famously hard to kill, beautifully hard to upstage.',
        photo: 'https://images.unsplash.com/photo-1620127252536-03bdfcf6d5b8?w=800&q=80',
        whereToBuy: 'Most nurseries',
        price: '$15–35',
        water: 'Every 2–3 weeks',
        light: 'Anything 🌥️',
        difficulty: '💧 (queen of low effort)',
      },
      {
        name: 'Bird of Paradise',
        latin: 'Strelitzia nicolai',
        tagline: 'One plant. Whole room.',
        blurb:
          'A single 5-foot statement piece with broad paddle leaves. The kind of plant that walks into a room and rearranges the energy.',
        photo: 'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?w=800&q=80',
        whereToBuy: 'The Sill, Bloomscape',
        price: '$50–120',
        water: 'Weekly',
        light: 'Bright direct 🌞',
        difficulty: '💧💧',
      },
    ],
  },
  cozy: {
    label: 'The Cozy Chaos Gardener',
    tagline: 'Cottagecore vibes. 47 plants. Not enough shelves.',
    blurb:
      "Your home is a soft, leafy hug. There's a plant on the windowsill, the bookshelf, the bathroom counter, and one balanced on top of the fridge that you're pretty sure is alive. Your match is something easy, romantic, and infinitely propagatable.",
    matches: [
      {
        name: 'Heartleaf Philodendron',
        latin: 'Philodendron hederaceum',
        tagline: 'A trailing love letter',
        blurb:
          "Soft green heart-shaped leaves that grow approximately everywhere. Drape her over a bookshelf and she'll cascade down like a fairytale by year two. Forgiving and romantic.",
        photo: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&q=80',
        whereToBuy: 'Most nurseries',
        price: '$8–15',
        water: 'When top inch is dry',
        light: 'Low to bright indirect 🌥️',
        difficulty: '💧 (the cozy classic)',
      },
      {
        name: 'Kalanchoe Blossfeldiana',
        latin: 'Kalanchoe blossfeldiana',
        tagline: 'Tiny pink blooms, all winter long',
        blurb:
          'Clusters of bright pink, peach, or coral flowers on chunky succulent leaves. She blooms when nothing else does — pure cottage windowsill energy.',
        photo: 'https://images.unsplash.com/photo-1602025984151-5ba9bee07301?w=800&q=80',
        whereToBuy: 'Most nurseries, grocery store florals',
        price: '$8–18',
        water: 'When soil dries fully',
        light: 'Bright direct 🌞',
        difficulty: '💧 (cottagecore queen)',
      },
      {
        name: 'Fern (Boston or Maidenhair)',
        latin: 'Nephrolepis / Adiantum',
        tagline: 'Green clouds in a hanging basket',
        blurb:
          'Soft, frilly fronds that look incredible in a macramé hanger. Loves humidity, loves a steamy bathroom, loves you back.',
        photo: 'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?w=800&q=80',
        whereToBuy: 'Most nurseries',
        price: '$10–25',
        water: 'Keep consistently moist',
        light: 'Medium indirect 🌥️',
        difficulty: '💧💧',
      },
    ],
  },
  whisperer: {
    label: 'The Plant Whisperer',
    tagline: 'You name them. You talk to them. They listen.',
    blurb:
      "You greet your plants in the morning. You apologize when you bump them. You're convinced one of them is in a bad mood today and honestly? You might be right. Your match is something with personality — a plant that talks back.",
    matches: [
      {
        name: 'Rex Begonia',
        latin: 'Begonia rex-cultorum',
        tagline: 'Velvet leaves with opinions',
        blurb:
          'Swirled silver, pink, and burgundy leaves like a watercolor painting. She’s moody about humidity but has more personality per square inch than any other plant in your collection.',
        photo: 'https://images.unsplash.com/photo-1604762512526-b7b22e2c75c7?w=800&q=80',
        whereToBuy: 'Etsy, local nursery',
        price: '$10–18',
        water: 'When top inch is dry',
        light: 'Bright indirect 🌞',
        difficulty: '💧💧',
      },
      {
        name: 'African Violet',
        latin: 'Saintpaulia',
        tagline: 'The grandmother plant making a comeback',
        blurb:
          'Velvet leaves and clusters of tiny purple, pink, or white flowers. Will bloom almost continuously if you treat her right — and yes, she absolutely knows when you’re in the room.',
        photo: 'https://images.unsplash.com/photo-1602025984151-5ba9bee07301?w=800&q=80',
        whereToBuy: 'Local nurseries, Etsy',
        price: '$8–15',
        water: 'From the bottom only',
        light: 'Bright indirect 🌞',
        difficulty: '💧💧',
      },
      {
        name: 'Oxalis Triangularis',
        latin: 'Oxalis triangularis',
        tagline: 'Purple butterfly leaves that fold at night',
        blurb:
          'Deep purple shamrock leaves that close up like little wings when the lights go out. The most personable plant on this list — she literally says goodnight.',
        photo: 'https://images.unsplash.com/photo-1620127252536-03bdfcf6d5b8?w=800&q=80',
        whereToBuy: 'Etsy, local nursery',
        price: '$8–15',
        water: 'When top inch is dry',
        light: 'Bright indirect 🌞',
        difficulty: '💧💧',
      },
    ],
  },
  sunshine: {
    label: 'The Sunshine Seeker',
    tagline: 'You chase windows. Your plants chase you.',
    blurb:
      "You have figured out which window gets the best afternoon light and you have arranged your entire life around it. Your perfect match is a vining, sun-loving stunner that grows toward the light along with you.",
    matches: [
      {
        name: 'String of Hearts',
        latin: 'Ceropegia woodii',
        tagline: 'A delicate cascade of tiny purple hearts',
        blurb:
          'Trailing strands of marbled silver-green and purple heart-shaped leaves. Loves bright light, easy to propagate, and looks unreal hanging in a sunny window.',
        photo: 'https://images.unsplash.com/photo-1604762524889-3e2fcc145683?w=800&q=80',
        whereToBuy: 'Etsy, The Sill',
        price: '$12–20',
        water: 'When soil dries (drought-tolerant)',
        light: 'Bright direct 🌞',
        difficulty: '💧 (sun-soaker)',
      },
      {
        name: 'Hoya Carnosa Compacta',
        latin: 'Hoya carnosa ‘Hindu Rope’',
        tagline: 'Curly waxy leaves and surprise pink flowers',
        blurb:
          'Looks like a green braid trailing from a pot. Patient, slow-growing, and rewards bright light with clusters of perfect pink star-shaped blooms.',
        photo: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=800&q=80',
        whereToBuy: 'Etsy, specialty nurseries',
        price: '$15–30',
        water: 'When soil dries fully',
        light: 'Bright indirect to direct 🌞',
        difficulty: '💧 (slow + chill)',
      },
      {
        name: 'Burro’s Tail',
        latin: 'Sedum morganianum',
        tagline: 'Plump succulent braids that drape forever',
        blurb:
          'Pale green beaded tails that get longer every year. Loves a sunny windowsill and almost no attention from you.',
        photo: 'https://images.unsplash.com/photo-1620127252536-03bdfcf6d5b8?w=800&q=80',
        whereToBuy: 'Etsy, local nursery',
        price: '$10–20',
        water: 'Every 2–3 weeks',
        light: 'Bright direct 🌞',
        difficulty: '💧 (soak the sun, ignore the rest)',
      },
    ],
  },
}
