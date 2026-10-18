import { Spot } from '../types';

export const INITIAL_SPOTS: Spot[] = [
  {
    id: 'spot-the-corner',
    name: 'The Corner Island Bar & Lounge',
    category: 'Food & Drink',
    island: 'Big Corn',
    priceTier: '$$',
    insiderTip: 'Stop by after 8 PM when the vibrant neon roof lights illuminate the open veranda for ice-cold Toña beers, tropical rum cocktails, and lively island music.',
    description: "An iconic Caribbean nightlife and social hub on Big Corn Island. Renowned for its distinctive corrugated roof trimmed in glowing neon magenta and blue lights, breezy open-air wooden deck, friendly bartenders, and spirited evening vibe along the paved island avenue.",
    locationDetails: 'Main avenue street corner in Brig Bay, Big Corn Island. Just minutes from the harbor; ask any taxi driver for "The Corner".',
    operatingHours: 'Monday – Saturday: 5:00 PM – 2:00 AM | Sunday: 6:00 PM – Midnight',
    coordinates: [12.181439493497367, -83.06089744454592],
    imageUrl: '/src/assets/images/the_corner_bar_1792277384823.jpg',
    rating: 4.8,
    reviewsCount: 45,
    reviews: [
      {
        id: 'rev-corner-1',
        author: 'Dida Ramos',
        rating: 5,
        date: 'Yesterday',
        comment: 'Best night vibe on Big Corn! The neon lights look amazing in person and the rum cocktails are generous and ice-cold.'
      },
      {
        id: 'rev-corner-2',
        author: 'Marcus Vance',
        rating: 5,
        date: '5 days ago',
        comment: 'Great outdoor veranda to sit and watch island life go by. Super welcoming staff and fun reggae music.'
      }
    ]
  },
  {
    id: 'spot-spekitos-place',
    name: "Spekito's Place & Natural Aquarium",
    category: 'Food & Drink',
    island: 'Big Corn',
    priceTier: '$$',
    insiderTip: "Walk through the shark-topped palapa gate and order the fresh whole red snapper with coconut rice and Spekito's secret Creole garlic sauce.",
    description: "Famous for its iconic leaping shark entrance gate, Spekito's Place (Restaurante y Acuario Natural) is one of Big Corn Island's most beloved beachfront culinary landmarks. Serving gargantuan whole red snappers, fresh spiny lobsters, coconut rice, and ice-cold Toña, with open-air palapa tables overlooking turquoise Caribbean waves.",
    locationDetails: 'Brig Bay / South coastal road, Big Corn Island. Look for the thatch gate with the giant Great White and Hammerhead shark sculptures. Tel: 25755903.',
    operatingHours: 'Daily: 11:00 AM – 12:00 Midnight (Menu abierto)',
    coordinates: [12.166438587695584, -83.04652753707589],
    imageUrl: '/src/assets/images/spekitos_place_sharks_1792276438737.jpg',
    rating: 4.9,
    reviewsCount: 64,
    reviews: [
      {
        id: 'rev-spek-1',
        author: 'Mateo Sanchez',
        rating: 5,
        date: '3 days ago',
        comment: "You cannot miss the shark sculptures on the roof! Spekito is a wonderful island host and the snapper is the freshest in town. Authentic Creole cooking at its best."
      },
      {
        id: 'rev-spek-2',
        author: 'Carolina Vargas',
        rating: 5,
        date: '1 week ago',
        comment: "Incredible lobster and cold Toña right by the water. Sitting in the shaded palapa with the ocean breeze is pure magic."
      }
    ]
  },
  {
    id: 'spot-corn-island-dive-center',
    name: 'Corn Island Dive Center & Chillin Café',
    category: 'Activities',
    island: 'Big Corn',
    priceTier: '$$$',
    insiderTip: 'Book the morning 2-tank trip out to Blowing Rock for 30m visibility, then unwind with an iced espresso at Chillin Café upstairs.',
    description: "Big Corn Island's premier PADI dive resort and training facility. Located in a charming blue two-story seaside lodge with the Chillin Café on the second deck. Offers guided scuba diving on pristine barrier reefs, Blowing Rock seamount excursions, open water certifications, and guided snorkeling.",
    locationDetails: 'Brig Bay / North End beachfront road, Big Corn Island. Look for the blue and white two-story building with the white picket fence and dive gear staging. www.cornislanddivecenter.com',
    operatingHours: 'Monday – Sunday: 7:30 AM – 5:30 PM (Chillin Café: 7:00 AM – 4:00 PM)',
    coordinates: [12.183050942756335, -83.06133251903528],
    imageUrl: '/src/assets/images/corn_island_dive_center_real_1792276438826.jpg',
    rating: 4.9,
    reviewsCount: 52,
    reviews: [
      {
        id: 'rev-dive-1',
        author: 'Ryan Gallagher',
        rating: 5,
        date: '2 days ago',
        comment: "Top-tier dive shop! The divemasters are super knowledgeable and safety-conscious. Swimming alongside eagle rays and nurse sharks at Blowing Rock was unforgettable."
      },
      {
        id: 'rev-dive-2',
        author: 'Samantha Bailey',
        rating: 5,
        date: '2 weeks ago',
        comment: "Super friendly crew and well-maintained gear. Having the Chillin Café upstairs for fresh smoothies and coffee between dives makes it unbeatable."
      }
    ]
  },
  {
    id: 'spot-yemaya-reef',
    name: 'Yemaya Reefs Beach Hideaway',
    category: 'Beaches',
    island: 'Little Corn',
    priceTier: '$$$',
    insiderTip: 'Head to the calm turquoise reef lagoon right in front of the villas around 9 AM for peaceful paddleboarding over vibrant coral gardens.',
    description: "Nestled amidst lush coconut palms along the tranquil northern shores of Little Corn Island, Yemaya Reefs offers luxury beachfront eco-villas with panoramic turquoise ocean views, organic Caribbean dining, wellness yoga pavilions, and immediate access to pristine barrier reefs.",
    locationDetails: 'North end of Little Corn Island. Accessible by walking trail through the lush central coconut forest or by private beach boat transfer.',
    operatingHours: 'Open daily: 7:00 AM – 10:00 PM (Beachfront & Restaurant)',
    coordinates: [12.2965, -83.0485],
    imageUrl: '/src/assets/images/yemaya_reef_1792277385620.jpg',
    rating: 5.0,
    reviewsCount: 58,
    reviews: [
      {
        id: 'rev-yemaya-1',
        author: 'Camila Morales',
        rating: 5,
        date: '4 days ago',
        comment: "Absolute heaven on earth. Waking up to the calm Caribbean lagoon and towering coconut trees right outside your private deck is unmatched."
      },
      {
        id: 'rev-yemaya-2',
        author: 'Julian Thorne',
        rating: 5,
        date: '2 weeks ago',
        comment: "The coral reef right off the beach is thriving with tropical fish and spotted rays. Delicious farm-to-table Caribbean cuisine as well."
      }
    ]
  },
  {
    id: 'spot-las-palmeras',
    name: 'Las Palmeras Oceanview Hotel & Restaurant',
    category: 'Food & Drink',
    island: 'Big Corn',
    priceTier: '$$',
    insiderTip: 'Grab an oceanfront wooden picnic table on the elevated palm terrace for the freshest garlic lobster salad and unobstructed sea panoramas.',
    description: "A tranquil oceanfront sanctuary on Big Corn Island featuring a scenic wooden dining terrace surrounded by coconut palms and a dark green picket fence. Celebrated for fresh seafood platters, Caribbean breakfast, tropical juices, and gentle trade wind breezes overlooking the turquoise waters.",
    locationDetails: 'South West Bay coastal road, Big Corn Island. Situated right on the shoreline with direct steps down to the beach.',
    operatingHours: 'Daily: 7:30 AM – 9:00 PM',
    coordinates: [12.1610, -83.0640],
    imageUrl: '/src/assets/images/las_palmeras_oceanview_1792277384897.jpg',
    rating: 4.8,
    reviewsCount: 39,
    reviews: [
      {
        id: 'rev-palmeras-1',
        author: 'Elena Gomez',
        rating: 5,
        date: '1 week ago',
        comment: "The views from the palm-shaded deck are unbeatable. We spent hours here sipping cold Toña and listening to the calm waves lap against the shore."
      },
      {
        id: 'rev-palmeras-2',
        author: 'David Wright',
        rating: 4,
        date: '3 weeks ago',
        comment: "Great seafood chowder and generous lobster tails. The owner and staff treat you like longtime friends."
      }
    ]
  },
  {
    id: 'spot-los-delfines',
    name: 'Los Delfines Hotel & Dive Center',
    category: 'Activities',
    island: 'Little Corn',
    priceTier: '$$',
    insiderTip: 'Relax in the breezy wooden rocking chairs on the turquoise veranda between morning reef explorations and twilight sunset walks.',
    description: "A beloved island classic offering charming white and aqua-trimmed bungalows, picturesque wooden veranda porches, and an on-site dive shop. Surrounded by vibrant tropical gardens with flowering hibiscus and bougainvillea, situated just steps from the tranquil Caribbean shoreline.",
    locationDetails: 'Central village path, Little Corn Island. Easily reached in 3 minutes on foot from the main panga arrival dock.',
    operatingHours: 'Daily: 7:00 AM – 9:30 PM (Dive shop open 7:30 AM – 5:00 PM)',
    coordinates: [12.2885, -83.0545],
    imageUrl: '/src/assets/images/los_delfines_hotel_1792277384787.jpg',
    rating: 4.8,
    reviewsCount: 44,
    reviews: [
      {
        id: 'rev-delfines-1',
        author: 'Sophie Laurent',
        rating: 5,
        date: '4 days ago',
        comment: "The turquoise trim and flower garden give this place so much island charm. Dive guides were fantastic and spotted nurse sharks right away!"
      },
      {
        id: 'rev-delfines-2',
        author: 'Carlos Medina',
        rating: 5,
        date: '2 weeks ago',
        comment: "Super clean rooms, great hot water, and the rocking chairs on the front porch are the best spot for morning coffee."
      }
    ]
  },
  {
    id: 'spot-rosa-del-mar',
    name: 'Hospedaje Rosa Del Mar & Sweets Cafe',
    category: 'Practical Tips',
    island: 'Big Corn',
    priceTier: '$',
    insiderTip: 'Pop into Sweets Cafe on the mint-green ground floor for fresh homemade coconut cakes, cinnamon bread, and great island transit advice.',
    description: "A gorgeous pastel mint-green two-story lodge featuring classical white columns, a curving grand garden staircase, and lush courtyard palms. Home to the famous Sweets Cafe on the ground floor, known across Big Corn for warm baked coconut treats, iced coffees, island breakfast, and friendly local travel tips.",
    locationDetails: 'East coastal road near Sally Peachie / South End, Big Corn Island (GPS: 12.167371, -83.047067). Look for the mint-green two-story lodge with Sweets Cafe on the ground floor.',
    operatingHours: 'Monday – Saturday: 7:00 AM – 8:00 PM | Sunday: 8:00 AM – 6:00 PM',
    coordinates: [12.167371229970318, -83.04706689681282],
    imageUrl: '/src/assets/images/rosa_del_mar_sweets_cafe_1792277386123.jpg',
    rating: 4.9,
    reviewsCount: 51,
    reviews: [
      {
        id: 'rev-rosa-1',
        author: 'Ana Belen',
        rating: 5,
        date: '3 days ago',
        comment: "The coconut bread and pineapple tarts at Sweets Cafe are legendary! The host Rosa is an absolute angel and gave us all the best taxi and ferry tips."
      },
      {
        id: 'rev-rosa-2',
        author: 'Jack Miller',
        rating: 5,
        date: '1 week ago',
        comment: "Beautiful mint-green building with an amazing garden courtyard. Clean, peaceful, and the best iced coffee on Big Corn."
      }
    ]
  },
  {
    id: 'spot-parque-rodrigo-campbell',
    name: 'Parque Municipal Ródrigo Campbell',
    category: 'Activities',
    island: 'Big Corn',
    priceTier: '$',
    insiderTip: 'Snap a photo with the iconic giant Blue Crab statue (Monumento al Cangrejo Azul) and relax under the breezy palm trees along the waterfront.',
    description: "Big Corn Island's premier central civic park, named in honor of revered island leader Ródrigo Campbell. Known throughout the Corn Islands for the colorful giant Blue Crab monument (Monumento al Cangrejo Azul), celebratory Crab Soup Festival gatherings every August, shaded oceanfront walking paths, tropical gardens, and community recreation space.",
    locationDetails: 'East coastal beachfront promenade, Big Corn Island (GPS: 12.169872, -83.040577). Directly along the coastal road; prominent stone monument featuring the vibrant giant blue land crab.',
    operatingHours: 'Open daily 24 hours (Best visited 7:00 AM – 9:00 PM)',
    coordinates: [12.169871930362655, -83.04057747781756],
    imageUrl: '/src/assets/images/parque_rodrigo_campbell_1792279007686.jpg',
    rating: 4.9,
    reviewsCount: 38,
    reviews: [
      {
        id: 'rev-parque-1',
        author: 'Ernesto Hodgson',
        rating: 5,
        date: 'Yesterday',
        comment: "The giant Blue Crab statue is the ultimate island photo spot! Beautiful park right on the ocean with nice sea breezes."
      },
      {
        id: 'rev-parque-2',
        author: 'Leila Jackson',
        rating: 5,
        date: '4 days ago',
        comment: "A lovely public park to sit, watch local life, and feel the sea air. Beautiful landscaping and very clean."
      }
    ]
  },
  {
    id: 'spot-museo-emancipacion',
    name: 'Museo de la Emancipación y la Esclavitud',
    category: 'Activities',
    island: 'Big Corn',
    priceTier: '$',
    insiderTip: 'Ask the island curator to share the historic story of August 27, 1841—Emancipation Day—and how the annual Crab Festival (Fiesta del Cangrejo) commemorates island liberation.',
    description: "Housed in the historic two-story wooden Caribbean Casa de la Cultura, the Museo de la Emancipación y la Esclavitud honors the rich Creole, Afro-descendant, and indigenous heritage of Corn Island. Features evocative exhibits on Queen Victoria's emancipation proclamation of 1841, maritime artifacts, heritage photos, and oral histories of the island's ancestors.",
    locationDetails: 'South End / Central district road, Big Corn Island (GPS: 12.171046, -83.057865). Classic two-story white and turquoise Caribbean wooden house with porch and bell.',
    operatingHours: 'Monday – Friday: 8:00 AM – 4:00 PM | Saturday: 9:00 AM – 1:00 PM',
    coordinates: [12.171045852426978, -83.0578652372529],
    imageUrl: '/src/assets/images/museo_emancipacion_1792279020249.jpg',
    rating: 4.8,
    reviewsCount: 29,
    reviews: [
      {
        id: 'rev-museo-1',
        author: 'Clarence Britton',
        rating: 5,
        date: '2 days ago',
        comment: "Essential visit for anyone traveling to Corn Island! Learning the true history behind the Crab Soup Festival and emancipation gave our whole trip so much meaning."
      },
      {
        id: 'rev-museo-2',
        author: 'Valerie Dupont',
        rating: 5,
        date: '1 week ago',
        comment: "Charming traditional Caribbean wooden house with very knowledgeable local guides. Small admission donation well worth supporting."
      }
    ]
  },
  {
    id: 'spot-banpro',
    name: 'Banpro (Banco de la Producción)',
    category: 'Practical Tips',
    island: 'Big Corn',
    priceTier: '$',
    insiderTip: 'The 24/7 ATM dispenses both US Dollars ($) and Nicaraguan Córdobas (C$). Always carry cash because many island restaurants and boat captains do not take cards.',
    description: "The primary banking branch and ATM on Big Corn Island. Banpro (Banco de la Producción) provides essential financial services including a 24-hour ATM for cash withdrawals in USD and NIO, currency exchange, teller services, and wire transfers. Crucial stop before heading across to Little Corn Island where there are no banks or ATMs.",
    locationDetails: 'Brig Bay commercial road, Big Corn Island (GPS: 12.172095, -83.061419). Located near the main town port and municipal center with visible green Banpro signage.',
    operatingHours: 'ATM: 24/7 | Branch Lobby: Mon–Fri: 8:30 AM – 4:30 PM, Sat: 8:30 AM – 12:30 PM',
    coordinates: [12.172094656396022, -83.06141880489795],
    imageUrl: '/src/assets/images/banpro_corn_island_1792279226935.jpg',
    rating: 4.8,
    reviewsCount: 42,
    reviews: [
      {
        id: 'rev-banpro-1',
        author: 'Mateo Sandoval',
        rating: 5,
        date: '2 days ago',
        comment: "Lifesaver! The ATM works reliably with international Visa and Mastercard, giving the choice of USD or Córdobas. Get your cash here before taking the panga to Little Corn."
      },
      {
        id: 'rev-banpro-2',
        author: 'Sarah Jenkins',
        rating: 5,
        date: '1 week ago',
        comment: "Clean, air-conditioned branch with friendly staff. Security guard outside was helpful with directions."
      }
    ]
  },
  {
    id: 'spot-apollos-gym',
    name: "Apollo's Gym",
    category: 'Activities',
    island: 'Big Corn',
    priceTier: '$',
    insiderTip: 'Affordable day pass and weekly passes available for travelers! Hit your workout early in the morning for the coolest breeze and friendly local energy.',
    description: "Big Corn Island's premier local fitness center and gym. Apollo's Gym offers a warm, community-driven workout space equipped with free weights, barbells, dumbbells, bench presses, squat racks, and functional training gear. A welcoming atmosphere for both locals and travelers looking to keep up their fitness routine in paradise.",
    locationDetails: 'Brig Bay / North End access road, Big Corn Island (GPS: 12.172619, -83.061451). Located just north of Banpro along the main road.',
    operatingHours: 'Monday – Saturday: 6:00 AM – 9:00 PM | Sunday: Closed',
    coordinates: [12.17261903776319, -83.06145099140663],
    imageUrl: '/src/assets/images/apollos_gym_corn_island_1792279214420.jpg',
    rating: 4.9,
    reviewsCount: 35,
    reviews: [
      {
        id: 'rev-apollo-1',
        author: 'Marcus Vance',
        rating: 5,
        date: 'Yesterday',
        comment: "Great open-air island gym with everything you need for heavy lifting and cardio. Very welcoming owner and great music vibe!"
      },
      {
        id: 'rev-apollo-2',
        author: 'Camila Reyes',
        rating: 5,
        date: '5 days ago',
        comment: "Super reasonable day passes and good selection of free weights and benches. Keeps you motivated while on vacation."
      }
    ]
  },
  {
    id: 'spot-bit-corn-island',
    name: 'Bit Corn Island (Floating Bar)',
    category: 'Food & Drink',
    island: 'Big Corn',
    priceTier: '$$',
    insiderTip: 'Catch the boat shuttle from Picnic Beach in Southwest Bay right before sunset. Order a cold Toña or fresh rum punch, dive into the crystal turquoise Caribbean sea, and watch the sun melt into the horizon.',
    description: "An iconic Caribbean floating sanctuary anchored off the tranquil turquoise waters of Southwest Bay (Picnic Beach). Bit Corn Island is a world-renowned open-air wooden floating palapa bar featuring a thatched tiki roof, sunny swim decks, swim ladders, bar stools, and chilled tropical cocktails. Visitors can swim around the barge, leap into the sea, vibe to reggae beats, and take in the most breathtaking, unobstructed golden hour sunsets on Big Corn Island.",
    locationDetails: 'Moored offshore in Southwest Bay / Picnic Beach, Big Corn Island (GPS: 12.158087, -83.066640). Simply wave from Picnic Beach or ask beachside locals for the quick boat shuttle out to the floating bar.',
    operatingHours: 'Daily: 1:00 PM – 7:30 PM (Peak sunset hours: 4:30 PM – 6:30 PM)',
    coordinates: [12.158087248805721, -83.06663978467434],
    imageUrl: '/src/assets/images/bit_corn_island_bar_1792279872078.jpg',
    rating: 4.9,
    reviewsCount: 58,
    reviews: [
      {
        id: 'rev-bit-1',
        author: 'Liam O’Connor',
        rating: 5,
        date: 'Yesterday',
        comment: 'Best sunset in all of Nicaragua! The boat shuttle was super easy from Picnic Beach, the drinks were ice cold, and jumping off the deck into warm turquoise water was pure magic.'
      },
      {
        id: 'rev-bit-2',
        author: 'Elena Rostova',
        rating: 5,
        date: '4 days ago',
        comment: 'Unreal floating bar experience. Beautiful reggae tunes, great company from other travelers, and an unforgettable golden sunset.'
      }
    ]
  }
];

