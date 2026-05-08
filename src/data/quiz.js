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

// ---------------------------------------------------------------
// HOW TO CHANGE A PLANT'S PHOTO
// ---------------------------------------------------------------
// 1. Find a plant on Unsplash: https://unsplash.com/s/photos/<plant-name>
// 2. Click the photo → right-click the big image → "Copy Image Address"
//    (the URL should start with https://images.unsplash.com/photo-...)
// 3. Find the plant below by name and replace the `photo:` URL.
// 4. Run `npm run deploy` from the plant-app folder to publish.
// If a URL ever 404s, the app falls back to a pretty gradient + emoji.
// ---------------------------------------------------------------

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
        emoji: '🌿',
        tagline: 'The Drama Queen of your windowsill',
        blurb:
          "Pink, green, and cream stripes that practically pose for the camera. She's a little needy — loves humidity, hates being moved — but the way she folds her leaves up at night like a prayer? Worth every misting.",
        photo: 'https://www.whiteflowerfarm.com/mas_assets/cache/image/a/8/3/3/43059.Jpg',
        whereToBuy: 'Etsy, The Sill',
        price: '$15–25',
        water: 'Weekly, keep humidity high',
        light: 'Bright indirect 🌞',
        difficulty: '💧💧💧 (high-maintenance bestie)',
      },
      {
        name: 'Calathea Orbifolia',
        latin: 'Goeppertia orbifolia',
        emoji: '🌱',
        tagline: 'The polite roommate who stays up late',
        blurb:
          'Big silvery-striped leaves that move with the sun. She forgives almost nothing about tap water but pays you back in elegance.',
        photo: 'https://www.myhomenature.com/cdn/shop/products/calathea_orbifolia11_c11230f0-54ed-4d81-b594-e52e7a7df78f.jpg',
        whereToBuy: 'The Sill, Bloomscape',
        price: '$20–35',
        water: 'Weekly with filtered water',
        light: 'Bright indirect 🌞',
        difficulty: '💧💧💧',
      },
      {
        name: 'Maranta Prayer Plant',
        latin: 'Maranta leuconeura',
        emoji: '🙏',
        tagline: 'Folds her hands at sunset, every single night',
        blurb:
          'Pink veins on velvet green leaves. She literally claps her leaves shut at night — the gentlest goodnight ritual a plant has ever offered.',
        photo: 'https://www.plantswagshop.com/cdn/shop/files/20_c6bafd00-fd44-42da-abe2-41c1cfc76b3c.png',
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
        emoji: '💗',
        tagline: 'Pink, purple, and absolutely shameless about it',
        blurb:
          'Striped in lavender, fuchsia, and mint green like a cotton candy explosion. Trails beautifully, propagates in a glass of water, and basically begs to be photographed.',
        photo: 'https://jaymegarden.com/cdn/shop/files/s-l1600_077ece06-6d4f-4935-8708-4b9e823baebb.webp?v=1750897427',
        whereToBuy: 'Etsy, local nursery',
        price: '$8–15',
        water: 'When top inch is dry',
        light: 'Bright indirect 🌞',
        difficulty: '💧 (easy queen)',
      },
      {
        name: 'Pink Princess Philodendron',
        latin: 'Philodendron erubescens',
        emoji: '👑',
        tagline: 'The it-girl with bubblegum splashes',
        blurb:
          'Each leaf is a lottery — pink variegation in chaotic, perfect shapes. She’s pricey but iconic and you know it.',
        photo: 'https://ecoclubofficial.com/wp-content/uploads/2021/11/246301833_952809778645339_6039951277024748445_n.jpeg',
        whereToBuy: 'Etsy, specialty growers',
        price: '$25–60',
        water: 'When top inch is dry',
        light: 'Bright indirect 🌞',
        difficulty: '💧💧',
      },
      {
        name: 'Polka Dot Plant',
        latin: 'Hypoestes phyllostachya',
        emoji: '🎀',
        tagline: 'A leaf that wears blush',
        blurb:
          'Tiny pink freckles on green leaves. Compact, photogenic, and looks adorable in a tiny terracotta pot on a stack of art books.',
        photo: 'https://wildlarkvt.com/cdn/shop/products/DSC_1827_82a1f970-4113-4a91-8d16-f2bb45ef60db_1200x1200.jpg?v=1645570677',
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
        emoji: '🌿',
        tagline: 'Purple, fast, and weirdly forgiving',
        blurb:
          "Trails like a waterfall, glows purple in the sun, and bounces back from neglect like nothing happened. You can literally snap off a piece, drop it in dirt, and it'll grow.",
        photo: 'https://gardengoodsdirect.com/cdn/shop/files/wandering-jew-plant-1221610517.jpg',
        whereToBuy: 'Etsy, Home Depot',
        price: '$6–12',
        water: 'When the soil dries (forgiving)',
        light: 'Bright light 🌞',
        difficulty: '💧 (basically immortal)',
      },
      {
        name: 'Pothos',
        latin: 'Epipremnum aureum',
        emoji: '🍃',
        tagline: 'The plant that survived your worst era',
        blurb:
          "Will grow in low light, will grow in water, will grow if you forget about it for a month. The horse girl of houseplants — loyal forever.",
        photo: 'https://www.marthastewart.com/thmb/2rgzyjL7ZvSuEo78vb429jSEuR4=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/ms-pothos-hero-marble-queen-getty-96ed7f63d8fe45edb99eceaaa83f886e.jpg',
        whereToBuy: 'Literally everywhere',
        price: '$5–15',
        water: 'When leaves droop a little',
        light: 'Anything 🌥️',
        difficulty: '💧 (unkillable)',
      },
      {
        name: 'ZZ Plant',
        latin: 'Zamioculcas zamiifolia',
        emoji: '🌿',
        tagline: 'Neglected? She thrives.',
        blurb:
          'Glossy leaves on architectural stems. Stores water in its rhizomes — meaning the more you forget, the better. A plant for the chronically over-scheduled.',
        photo: 'https://www.tiptonhurst.com/cdn/shop/files/zzplant_5e1cd7f4-af9a-45ec-abc8-6823970895db.png?v=1757625353&width=1563',
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
        emoji: '💗',
        tagline: 'Heart-shaped pink and white drama',
        blurb:
          'Translucent leaves shaped like hearts, splashed with pink, cream, and green. Goes dormant in winter — which means you’ll get to spreadsheet a whole new growing season every spring.',
        photo: 'https://classiccaladiums.com/cdn/shop/articles/CC-Blog-images_caladium-forpot-producers.jpg',
        whereToBuy: 'Local nursery, Etsy',
        price: '$10–20',
        water: 'Keep soil consistently moist',
        light: 'Bright indirect 🌞',
        difficulty: '💧💧',
      },
      {
        name: 'Alocasia Polly',
        latin: 'Alocasia × amazonica',
        emoji: '🌿',
        tagline: 'The houseplant that needs a tutorial',
        blurb:
          'Shiny dark leaves with sharp white veins. She’s opinionated about humidity, light, and how often you breathe near her — perfect for someone who wants a project.',
        photo: 'https://www.gabriellaplants.com/cdn/shop/files/gabriella-plants-alocasia-micholitziana-variegated-frydek-4-1132568307.jpg',
        whereToBuy: 'Etsy, specialty nurseries',
        price: '$15–30',
        water: 'When top inch is dry',
        light: 'Bright indirect 🌞',
        difficulty: '💧💧💧',
      },
      {
        name: 'String of Pearls',
        latin: 'Curio rowleyanus',
        emoji: '🟢',
        tagline: 'Tiny green beads on a delicate thread',
        blurb:
          'Looks impossible to keep alive — and is, if you don’t research. Likes bright light, infrequent water, and the kind of person who knows the difference.',
        photo: 'https://duvallhardware.com/wp-content/uploads/2023/12/String-of-Pearls.jpg',
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
        emoji: '🌷',
        tagline: 'Architectural, blush-toned, low drama',
        blurb:
          'Broad green leaves edged in soft pink. Tolerates lower light, doesn’t throw tantrums, and looks like she costs more than she does. The Carrara marble of houseplants.',
        photo: 'https://gardengoodsdirect.com/cdn/shop/files/aglaonema-red-valentine-28842992042026.jpg?v=1695359218',
        whereToBuy: 'The Sill, Bloomscape',
        price: '$15–30',
        water: 'When top inch is dry',
        light: 'Low to bright indirect 🌥️',
        difficulty: '💧 (chic and chill)',
      },
      {
        name: 'Snake Plant ‘Moonshine’',
        latin: 'Dracaena trifasciata',
        emoji: '🌱',
        tagline: 'Silver-green swords. Zero notes.',
        blurb:
          'Pale silvery upright leaves like a piece of sculpture. Will survive almost anything you do or don’t do. Famously hard to kill, beautifully hard to upstage.',
        photo: 'https://hips.hearstapps.com/vader-prod.s3.amazonaws.com/1716209064-81SXDZveAL.jpg',
        whereToBuy: 'Most nurseries',
        price: '$15–35',
        water: 'Every 2–3 weeks',
        light: 'Anything 🌥️',
        difficulty: '💧 (queen of low effort)',
      },
      {
        name: 'Bird of Paradise',
        latin: 'Strelitzia nicolai',
        emoji: '🌴',
        tagline: 'One plant. Whole room.',
        blurb:
          'A single 5-foot statement piece with broad paddle leaves. The kind of plant that walks into a room and rearranges the energy.',
        photo: 'https://www.gardenia.net/wp-content/uploads/2023/05/learn-how-to-grow-and-care-bird-of-paradise.webp',
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
        emoji: '💚',
        tagline: 'A trailing love letter',
        blurb:
          "Soft green heart-shaped leaves that grow approximately everywhere. Drape her over a bookshelf and she'll cascade down like a fairytale by year two. Forgiving and romantic.",
        photo: 'https://jungle-houseplants.co.uk/cdn/shop/articles/brazil-01_540x_cec3a7f8-aa71-4116-b681-08e05d4b058f_540x.jpg',
        whereToBuy: 'Most nurseries',
        price: '$8–15',
        water: 'When top inch is dry',
        light: 'Low to bright indirect 🌥️',
        difficulty: '💧 (the cozy classic)',
      },
      {
        name: 'Kalanchoe Blossfeldiana',
        latin: 'Kalanchoe blossfeldiana',
        emoji: '🌸',
        tagline: 'Tiny pink blooms, all winter long',
        blurb:
          'Clusters of bright pink, peach, or coral flowers on chunky succulent leaves. She blooms when nothing else does — pure cottage windowsill energy.',
        photo: 'https://images.thdstatic.com/productImages/97b21b8f-700e-4963-a7df-5e77700f6258/svn/altman-plants-succulent-plants-0872856-4f_600.jpg',
        whereToBuy: 'Most nurseries, grocery store florals',
        price: '$8–18',
        water: 'When soil dries fully',
        light: 'Bright direct 🌞',
        difficulty: '💧 (cottagecore queen)',
      },
      {
        name: 'Fern (Boston or Maidenhair)',
        latin: 'Nephrolepis / Adiantum',
        emoji: '🌿',
        tagline: 'Green clouds in a hanging basket',
        blurb:
          'Soft, frilly fronds that look incredible in a macramé hanger. Loves humidity, loves a steamy bathroom, loves you back.',
        photo: 'https://unitedplantsavers.org/wp-content/uploads/2021/02/Image_016.jpg',
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
        emoji: '💜',
        tagline: 'Velvet leaves with opinions',
        blurb:
          'Swirled silver, pink, and burgundy leaves like a watercolor painting. She’s moody about humidity but has more personality per square inch than any other plant in your collection.',
        photo: 'https://kenmatthewsgardencenter.com/wp-content/uploads/2021/07/red-kiss-rex-begonia-1509722_960_720.jpg',
        whereToBuy: 'Etsy, local nursery',
        price: '$10–18',
        water: 'When top inch is dry',
        light: 'Bright indirect 🌞',
        difficulty: '💧💧',
      },
      {
        name: 'African Violet',
        latin: 'Saintpaulia',
        emoji: '💜',
        tagline: 'The grandmother plant making a comeback',
        blurb:
          'Velvet leaves and clusters of tiny purple, pink, or white flowers. Will bloom almost continuously if you treat her right — and yes, she absolutely knows when you’re in the room.',
        photo: 'https://dam.thdstatic.com/content/production/kP4ACr6FR5n-r0LJmL9fxw/aHN9f50yy5hXONxubZW4ww/Original%20file/how-to-grow-african-violets-hero.jpg',
        whereToBuy: 'Local nurseries, Etsy',
        price: '$8–15',
        water: 'From the bottom only',
        light: 'Bright indirect 🌞',
        difficulty: '💧💧',
      },
      {
        name: 'Oxalis Triangularis',
        latin: 'Oxalis triangularis',
        emoji: '🦋',
        tagline: 'Purple butterfly leaves that fold at night',
        blurb:
          'Deep purple shamrock leaves that close up like little wings when the lights go out. The most personable plant on this list — she literally says goodnight.',
        photo: 'https://houseplanthouse.com/wp-content/uploads/2021/05/oxalis-triangularis-questions-and-answers-blogpost-houseplanthouse-17-1.jpg',
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
        emoji: '💕',
        tagline: 'A delicate cascade of tiny purple hearts',
        blurb:
          'Trailing strands of marbled silver-green and purple heart-shaped leaves. Loves bright light, easy to propagate, and looks unreal hanging in a sunny window.',
        photo: 'https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,c_fill,g_auto,w_1500,ar_3:2/stock%2Fshutterstock_2373142853',
        whereToBuy: 'Etsy, The Sill',
        price: '$12–20',
        water: 'When soil dries (drought-tolerant)',
        light: 'Bright direct 🌞',
        difficulty: '💧 (sun-soaker)',
      },
      {
        name: 'Hoya Carnosa Compacta',
        latin: 'Hoya carnosa ‘Hindu Rope’',
        emoji: '🌸',
        tagline: 'Curly waxy leaves and surprise pink flowers',
        blurb:
          'Looks like a green braid trailing from a pot. Patient, slow-growing, and rewards bright light with clusters of perfect pink star-shaped blooms.',
        photo: 'https://strapi.myplantin.com/large_main_e0bd67be-2724-4bca-8344-091d5912bec6.webp',
        whereToBuy: 'Etsy, specialty nurseries',
        price: '$15–30',
        water: 'When soil dries fully',
        light: 'Bright indirect to direct 🌞',
        difficulty: '💧 (slow + chill)',
      },
      {
        name: 'Burro’s Tail',
        latin: 'Sedum morganianum',
        emoji: '🌵',
        tagline: 'Plump succulent braids that drape forever',
        blurb:
          'Pale green beaded tails that get longer every year. Loves a sunny windowsill and almost no attention from you.',
        photo: 'https://succulentsbox.com/cdn/shop/files/6_3_31816f6e-a69f-4d3b-9ed3-2c67e781c1d2.jpg?v=1769576522',
        whereToBuy: 'Etsy, local nursery',
        price: '$10–20',
        water: 'Every 2–3 weeks',
        light: 'Bright direct 🌞',
        difficulty: '💧 (soak the sun, ignore the rest)',
      },
    ],
  },
}
