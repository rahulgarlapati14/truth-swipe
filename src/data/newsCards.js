// Curated News Cards Dataset for TruthSwipe
// Contains verified REAL news and viral FAKE news items across multiple categories.

export const INITIAL_NEWS_CARDS = [
  {
    id: 'news-1',
    headline: 'James Webb Space Telescope Detects Atmospheric Water Vapor on Nearby Habitable-Zone Exoplanet',
    summary: 'Spectroscopic observations confirm significant water vapor signatures in the atmosphere of TRAPPIST-1e, marking a major milestone in astrobiology.',
    category: 'Science & Health',
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=1000&auto=format&fit=crop',
    source: 'NASA / ESA Astrobiology',
    publishDate: '2026-08-14',
    readTime: '2 min read',
    isTrue: true,
    verdict: 'Verified Real News',
    trustScore: 98,
    redFlags: [
      '✅ Peer-reviewed spectroscopy data published in Nature Astronomy',
      '✅ Confirmed by independent international research observatories',
      '✅ Official press releases from NASA and ESA'
    ],
    explanation: 'This report is fully verified. Spectroscopic instruments aboard JWST analysed infrared starlight passing through the atmosphere of exoplanet TRAPPIST-1e, detecting unmistakable signatures of molecular H2O.',
    consensusFake: 12,
    fullArticleUrl: 'https://nasa.gov'
  },
  {
    id: 'news-2',
    headline: 'Viral Video Shows AI Robot Passing Bar Exam and Demanding Human Citizenship Rights in Court',
    summary: 'A trending TikTok clip claims an humanoid AI named "Aura-7" successfully sued a district court to obtain legal personhood after scoring in the 99th percentile of the legal bar exam.',
    category: 'Tech & AI',
    image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?q=80&w=1000&auto=format&fit=crop',
    source: 'Viral Social Media Post',
    publishDate: '2026-09-02',
    readTime: '1 min read',
    isTrue: false,
    verdict: 'Debunked Hoax',
    trustScore: 8,
    redFlags: [
      '🚨 CGI animation rendered using Unreal Engine 5 by a visual effects artist',
      '🚨 No legal court filings or case records exist under "Aura-7"',
      '🚨 Out-of-context audio generated using AI voice cloning'
    ],
    explanation: 'This video is entirely fabricated. Digital forensics confirmed the video was created by a CGI artist as a promotional project. AI systems cannot hold legal personhood or stand trial in court.',
    consensusFake: 89,
    fullArticleUrl: 'https://factcheck.org'
  },
  {
    id: 'news-3',
    headline: 'Scientists Successfully Generate Clean Fusion Power Output Exceeding Energy Input in Landmark Ignition Test',
    summary: 'Physicists at the National Ignition Facility achieved a net energy gain of 3.15 megajoules from a controlled nuclear fusion reaction, exceeding the laser input energy.',
    category: 'Science & Health',
    image: 'https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1000&auto=format&fit=crop',
    source: 'US Department of Energy',
    publishDate: '2026-05-19',
    readTime: '3 min read',
    isTrue: true,
    verdict: 'Verified Real News',
    trustScore: 96,
    redFlags: [
      '✅ Official press briefing by Energy Secretary and Lead Nuclear Physicists',
      '✅ Verified by Lawrence Livermore National Laboratory data logs',
      '✅ Detailed technical breakdown published in Physical Review Letters'
    ],
    explanation: 'True. Lawrence Livermore National Lab achieved fusion ignition where laser energy focused on a tiny fuel capsule yielded more fusion energy output than supplied by lasers.',
    consensusFake: 18,
    fullArticleUrl: 'https://energy.gov'
  },
  {
    id: 'news-4',
    headline: '5G Mobile Towers Are Secretly Depleting Honeybee Populations via Microwave Frequency Interference',
    summary: 'A widely shared blog post claims 5G wireless signals disorient bees\' navigational abilities, leading to a catastrophic 60% decline in global hives.',
    category: 'Science & Health',
    image: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?q=80&w=1000&auto=format&fit=crop',
    source: 'NaturalHealthDaily Blog',
    publishDate: '2026-07-28',
    readTime: '2 min read',
    isTrue: false,
    verdict: 'Pseudoscience Myth',
    trustScore: 14,
    redFlags: [
      '🚨 Cites non-existent "Dr. H. Vane" with fake credentials',
      '🚨 Contradicted by peer-reviewed entomology studies by USDA & EFSA',
      '🚨 Misrepresents pesticide exposure and Varroa mites as radio wave damage'
    ],
    explanation: 'False. Extensive entomological research by the USDA, European Food Safety Authority, and WHO shows non-ionizing 5G radio waves have no effect on bee navigation. Main factors in bee decline remain habitat loss and pesticides.',
    consensusFake: 94,
    fullArticleUrl: 'https://snopes.com'
  },
  {
    id: 'news-5',
    headline: 'Global Central Banks Announce Pilot Scheme for Interoperable Digital Currency Settlement',
    summary: 'Major central banks including the ECB, Bank of Japan, and Bank of England complete initial trials for cross-border instant settlement using wholesale CBDCs.',
    category: 'World & Economy',
    image: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=1000&auto=format&fit=crop',
    source: 'Reuters / Financial Times',
    publishDate: '2026-09-10',
    readTime: '3 min read',
    isTrue: true,
    verdict: 'Verified Real News',
    trustScore: 94,
    redFlags: [
      '✅ Joint communique published by the Bank for International Settlements (BIS)',
      '✅ Official financial reporting across Bloomberg, Reuters, and FT',
      '✅ Technical sandbox whitepaper released'
    ],
    explanation: 'This report is factual. The Bank for International Settlements (BIS) along with seven central banks published Project Agora results detailing wholesale digital currency clearing.',
    consensusFake: 22,
    fullArticleUrl: 'https://reuters.com'
  },
  {
    id: 'news-6',
    headline: 'New Solar Flare Warning: Sun Radiation Expected to Wipe Out All Smartphone Hard Drives Tonight',
    summary: 'A viral chain message urges people to wrap their phones in aluminum foil immediately to prevent solar storm radiation from erasing digital memories.',
    category: 'Tech & AI',
    image: 'https://images.unsplash.com/photo-1532960401447-7dd05bef20b0?q=80&w=1000&auto=format&fit=crop',
    source: 'WhatsApp Viral Chain Message',
    publishDate: '2026-09-21',
    readTime: '1 min read',
    isTrue: false,
    verdict: 'Viral Alarmist Hoax',
    trustScore: 5,
    redFlags: [
      '🚨 Solar flares cause radio blackouts, NOT flash memory erasure',
      '🚨 Classical clickbait structure urging rapid forwarding',
      '🚨 NOAA Space Weather Prediction Center issued no such extreme alert'
    ],
    explanation: 'Completely false! Solar storms affect high-frequency satellite signals and power grid transformers, but solar particles cannot penetrate atmospheric layers to erase microchip flash storage inside phones.',
    consensusFake: 97,
    fullArticleUrl: 'https://politifact.com'
  },
  {
    id: 'news-7',
    headline: 'DeepMind AI Breakthrough Predicts 3D Protein Structures for Nearly All Known Organisms',
    summary: 'AlphaFold 3 expands atomic-level predictions to include DNA, RNA, ligands, and post-translational modifications, accelerating drug discovery worldwide.',
    category: 'Tech & AI',
    image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?q=80&w=1000&auto=format&fit=crop',
    source: 'Nature Journal / Google DeepMind',
    publishDate: '2026-06-05',
    readTime: '4 min read',
    isTrue: true,
    verdict: 'Verified Breakthrough',
    trustScore: 99,
    redFlags: [
      '✅ Published in Nature with open code repository and server access',
      '✅ Validated by global structural biology research teams',
      '✅ Official announcements from DeepMind research directors'
    ],
    explanation: 'Verified. AlphaFold 3 models molecular interactions across proteins, nucleic acids, and small molecules with unprecedented atomic accuracy.',
    consensusFake: 10,
    fullArticleUrl: 'https://nature.com'
  },
  {
    id: 'news-8',
    headline: 'Ancient 2,000-Year-Old Roman Coin Found Containing Microscopic QR Code Engraving',
    summary: 'Archaeologists in Rome reportedly uncovered a silver denarius coin featuring a functioning digital QR code leading to an ancient Latin riddle website.',
    category: 'Weird & Bizarre',
    image: 'https://images.unsplash.com/photo-1605792657660-596af9009e82?q=80&w=1000&auto=format&fit=crop',
    source: 'Satire Times / TikTok',
    publishDate: '2026-08-30',
    readTime: '1 min read',
    isTrue: false,
    verdict: 'Satirical Fabrication',
    trustScore: 4,
    redFlags: [
      '🚨 QR codes were invented in 1994 by Denso Wave in Japan',
      '🚨 Image created with Photoshop matrix overlay',
      '🚨 Source website is a well-known April Fools / Satire blog'
    ],
    explanation: 'False! QR codes require optical matrix barcoding invented in 1994. The image was an internet meme edited for entertainment purposes.',
    consensusFake: 98,
    fullArticleUrl: 'https://hoax-slayer.com'
  }
];

export const CATEGORIES = [
  'All',
  'Tech & AI',
  'Science & Health',
  'World & Economy',
  'Weird & Bizarre'
];
