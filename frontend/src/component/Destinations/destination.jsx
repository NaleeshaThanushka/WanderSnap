import React, { useState } from 'react';
import './destination.css'

const Destination = () => {
  // State variables for modal visibility and data
  const [modalContent, setModalContent] = useState(null); // Controls which modal is open ('region', 'attraction', or null)
  const [selectedData, setSelectedData] = useState(null); // Holds data for the currently selected region or attraction
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0); // Manages the index of the photo currently displayed in the attraction modal

  // Placeholder image URLs for various attractions across Sri Lanka.
  // Each key maps to an array of image URLs to support multiple photos per attraction.
  const attractionPhotos = {
    // Western Province Attractions
    galleFaceGreen: [
      "https://images.pexels.com/photos/30858001/pexels-photo-30858001.jpeg",
      "https://images.pexels.com/photos/32451023/pexels-photo-32451023.jpeg",
      "https://images.pexels.com/photos/30857988/pexels-photo-30857988.jpeg"
    ],
    nationalMuseum: [
      "https://images.pexels.com/photos/12121574/pexels-photo-12121574.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
      "https://images.pexels.com/photos/6943649/pexels-photo-6943649.jpeg",
      "https://images.pexels.com/photos/14607314/pexels-photo-14607314.jpeg"
    ],
    pettahMarket: [
      "https://images.squarespace-cdn.com/content/v1/59899fa9f9a61eda9f9f0394/1528979167454-8KKEF3WI21SGNFUWF8OH/DSC04522.jpg",
      "https://thumbs.dreamstime.com/b/pettah-floating-market-colombo-sri-lanka-markets-located-bastian-mawatha-neighborhood-consist-trade-94067084.jpg",
      "https://www.holidify.com/images/cmsuploads/compressed/17220713958_226fae1516_b_20190724215944.jpg"
    ],
    viharamahadeviPark: [
      "https://www.travelmapsrilanka.com/destinations/destinationimages/viharamahadevi-park-sri-lanka.webp",
      "https://res.cloudinary.com/jerrick/image/upload/d_642250b563292b35f27461a7.png,f_jpg,q_auto,w_720/64303c9245c514001d605d3e.jpg",
      "https://media.safarway.com/content/87c0c0e5-5a38-4b50-9b66-2730fd049c76_lg.jpg"
    ],
    negomboBeach: [
      "https://placehold.co/400x300/FFD700/000000?text=Negombo+Beach+1",
      "https://placehold.co/400x300/FFD700/000000?text=Negombo+Beach+2"
    ],
    dutchFort: [
      "https://placehold.co/400x300/C0C0C0/000000?text=Dutch+Fort+1"
    ],
    fishMarket: [
      "https://placehold.co/400x300/FFA07A/000000?text=Fish+Market+1"
    ],
    muthurajawelaWetland: [
      "https://placehold.co/400x300/87CEEB/000000?text=Muthurajawela+Wetland+1"
    ],
    kalutaraBeach: [
      "https://placehold.co/400x300/F0E68C/000000?text=Kalutara+Beach+1"
    ],
    kalutaraBodhiya: [
      "https://placehold.co/400x300/DA70D6/000000?text=Kalutara+Bodhiya+1"
    ],
    richmondCastle: [
      "https://placehold.co/400x300/D2B48C/000000?text=Richmond+Castle+1"
    ],
    faHienCave: [
      "https://placehold.co/400x300/A9A9A9/000000?text=Fa+Hien+Cave+1"
    ],
    // Southern Province Attractions
    galleFort: [
      "https://placehold.co/400x300/B0E0E6/000000?text=Galle+Fort+1",
      "https://placehold.co/400x300/B0E0E6/000000?text=Galle+Fort+2"
    ],
    dutchReformedChurch: [
      "https://placehold.co/400x300/F5DEB3/000000?text=Dutch+Reformed+Church+1"
    ],
    maritimeMuseum: [
      "https://placehold.co/400x300/ADD8E6/000000?text=Maritime+Museum+1"
    ],
    galleLighthouse: [
      "https://placehold.co/400x300/FFB6C1/000000?text=Galle+Lighthouse+1"
    ],
    mirissaBeach: [
      "https://placehold.co/400x300/98FB98/000000?text=Mirissa+Beach+1"
    ],
    whaleWatching: [
      "https://placehold.co/400x300/6A5ACD/FFFFFF?text=Whale+Watching+1",
      "https://placehold.co/400x300/6A5ACD/FFFFFF?text=Whale+Watching+2"
    ],
    coconutTreeHill: [
      "https://placehold.co/400x300/F08080/000000?text=Coconut+Tree+Hill+1"
    ],
    snakeIsland: [
      "https://placehold.co/400x300/DDA0DD/000000?text=Snake+Island+1"
    ],
    // Central Province Attractions
    templeOfTheTooth: [
      "https://placehold.co/400x300/BA55D3/FFFFFF?text=Temple+of+Tooth+1",
      "https://placehold.co/400x300/BA55D3/FFFFFF?text=Temple+of+Tooth+2"
    ],
    kandyLake: [
      "https://placehold.co/400x300/87CEFA/000000?text=Kandy+Lake+1"
    ],
    royalBotanicalGardens: [
      "https://placehold.co/400x300/3CB371/FFFFFF?text=Royal+Botanical+Gardens+1",
      "https://placehold.co/400x300/3CB371/FFFFFF?text=Royal+Botanical+Gardens+2"
    ],
    bahirawakandaTemple: [
      "https://placehold.co/400x300/FF6347/FFFFFF?text=Bahirawakanda+Temple+1"
    ],
    gregoryLake: [
      "https://placehold.co/400x300/4682B4/FFFFFF?text=Gregory+Lake+1"
    ],
    hortonPlains: [
      "https://placehold.co/400x300/20B2AA/FFFFFF?text=Horton+Plains+1",
      "https://placehold.co/400x300/20B2AA/FFFFFF?text=Horton+Plains+2"
    ],
    teaPlantations: [
      "https://placehold.co/400x300/8B4513/FFFFFF?text=Tea+Plantation+1",
      "https://placehold.co/400x300/8B4513/FFFFFF?text=Tea+Plantation+2"
    ],
    seethaAmmanTemple: [
      "https://placehold.co/400x300/CD5C5C/FFFFFF?text=Seetha+Amman+Temple+1"
    ],
    // Northern Province Attractions
    jaffnaFort: ["https://placehold.co/400x300/A52A2A/FFFFFF?text=Jaffna+Fort+1"],
    nallurKandaswamyTemple: ["https://placehold.co/400x300/FF8C00/FFFFFF?text=Nallur+Kandaswamy+Temple+1"],
    casuarinaBeach: ["https://placehold.co/400x300/87CEEB/000000?text=Casuarina+Beach+1"],
    delftIsland: ["https://placehold.co/400x300/6B8E23/FFFFFF?text=Delft+Island+1"],
    // Eastern Province Attractions
    koneswaramTemple: ["https://placehold.co/400x300/800080/FFFFFF?text=Koneswaram+Temple+1"],
    nilaveliBeach: ["https://placehold.co/400x300/00BFFF/FFFFFF?text=Nilaveli+Beach+1"],
    pigeonIsland: ["https://placehold.co/400x300/7FFFD4/000000?text=Pigeon+Island+National+Park+1"],
    pasikudahBeach: ["https://placehold.co/400x300/FFDAB9/000000?text=Pasikudah+Beach+1"],
    batticaloaFort: ["https://placehold.co/400x300/4682B4/FFFFFF?text=Batticaloa+Fort+1"],
    kalladyBridge: ["https://placehold.co/400x300/D3D3D3/000000?text=Kallady+Bridge+1"],
    // North Central Province Attractions
    ruwanwelisayaStupa: ["https://placehold.co/400x300/FFD700/000000?text=Ruwanwelisaya+Stupa+1"],
    jayasriMahaBodhi: ["https://placehold.co/400x300/32CD32/FFFFFF?text=Jaya+Sri+Maha+Bodhi+1"],
    isurumuniyaTemple: ["https://placehold.co/400x300/DAA520/000000?text=Isurumuniya+Temple+1"],
    sigiriyaRockFortress: ["https://placehold.co/400x300/B8860B/FFFFFF?text=Sigiriya+Rock+Fortress+1", "https://placehold.co/400x300/B8860B/FFFFFF?text=Sigiriya+Rock+Fortress+2"],
    dambullaCaveTemple: ["https://placehold.co/400x300/CD853F/FFFFFF?text=Dambulla+Cave+Temple+1"],
    // North Western Province Attractions
    wilpattuNationalPark: ["https://placehold.co/400x300/556B2F/FFFFFF?text=Wilpattu+National+Park+1", "https://placehold.co/400x300/556B2F/FFFFFF?text=Wilpattu+National+Park+2"],
    munneswaramTemple: ["https://placehold.co/400x300/D2691E/FFFFFF?text=Munneswaram+Temple+1"],
    ethagalaRock: ["https://bokun.s3.amazonaws.com/cbbc2836-5de4-462f-9bd5-0480326b77c4.jpg", "https://upload.wikimedia.org/wikipedia/commons/3/3f/Kurunegala_City_from_the_Sky.jpg", "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhalt0d5DeHsL9dSLSlGo15MfgfQIYyskyNlXahci3VpCF94W14KV7wCQEyqHbOTRa9AlBSkSZnUBiyW7_jAAlcyZ494krFpYcOIMJK407gHRST2tkhaSoI0a9G2rOLWyCLgNsNV61uoz-HPVfP3SmBz-8B_68aGxi5z-a9zvAVuBALX4iZB9P_ByabUU0/w1200-h630-p-k-no-nu/kurunegala-at-night.jpg"], // Corrected placeholder text
    // Uva Province Attractions
    ellaRock: ["https://placehold.co/400x300/228B22/FFFFFF?text=Ella+Rock+1"],
    nineArchBridge: ["https://placehold.co/400x300/8B4513/FFFFFF?text=Nine+Arch+Bridge+1"],
    littleAdamsPeak: ["https://placehold.co/400x300/7CFC00/000000?text=Little+Adams+Peak+1"],
    rawanaFalls: ["https://placehold.co/400x300/4169E1/FFFFFF?text=Rawana+Falls+1"],
    badullaKatharagamaDevalaya: ["https://placehold.co/400x300/FF4500/FFFFFF?text=Badulla+Kataragama+Devalaya+1"],
    muthiyanganaTemple: ["https://placehold.co/400x300/DA70D6/000000?text=Muthiyangana+Raja+Maha+Vihara+1"],
    // Sabaragamuwa Province Attractions
    sriPada: ["https://placehold.co/400x300/696969/FFFFFF?text=Sri+Pada+(Adam's+Peak)+1"],
    sinharajaForestReserve: ["https://placehold.co/400x300/006400/FFFFFF?text=Sinharaja+Forest+Reserve+1", "https://placehold.co/400x300/006400/FFFFFF?text=Sinharaja+Forest+Reserve+2"],
    bopathEllaFalls: ["https://placehold.co/400x300/48D1CC/000000?text=Bopath+Ella+Falls+1"],
    pinnawalaElephantOrphanage: ["https://placehold.co/400x300/8B4513/FFFFFF?text=Pinnawala+Elephant+Orphanage+1"],
    kitulgala: ["https://placehold.co/400x300/8FBC8F/000000?text=Kitulgala+1"]
  };

  // Comprehensive data for all Sri Lankan provinces, their cities, and attractions.
  // Each attraction now references the 'photos' array from attractionPhotos.
  const regions = {
    western: {
      name: "Western Province",
      capital: "Colombo",
      places: [
        {
          name: "Colombo",
          description: "Commercial capital with colonial architecture, shopping districts, and vibrant nightlife.",
          attractions: [
            { 
              name: "Galle Face Green", 
              photos: attractionPhotos.galleFaceGreen, 
              details: "An urban park by the sea, perfect for relaxation and street food.",
              rating: 4.5,
              duration: "2-3 hours",
              category: "Park & Recreation"
            },
            { 
              name: "National Museum", 
              photos: attractionPhotos.nationalMuseum, 
              details: "Sri Lanka's largest museum, showcasing ancient artifacts and art.",
              rating: 4.3,
              duration: "2-4 hours",
              category: "Museum & Culture"
            },
            { 
              name: "Pettah Market", 
              photos: attractionPhotos.pettahMarket, 
              details: "Pettah is one of the busiest, oldest, and most vibrant commercial districts in Colombo, Sri Lanka. It’s famous for its bustling open-air markets, wholesale shops, street food, and historic landmarks like the Jami Ul-Alfar Mosque",
              rating: 4.0,
              duration: "1-2 hours",
              category: "Shopping & Markets"
            },
            { 
              name: "Viharamahadevi Park", 
              photos: attractionPhotos.viharamahadeviPark, 
              details: "Viharamahadevi Park also features a large and well-maintained children’s playground, making it a popular spot for families visiting the city. The playground includes swings, slides, climbing frames, and other fun activities designed to keep children entertained. In addition to the playground, there are pony rides and a small train ride that attract many young visitors. These facilities, combined with the park’s natural beauty, create a joyful and relaxing environment for both children and parents.",

              rating: 4.2,
              duration: "1-2 hours",
              category: "Park & Recreation"
            }
          ],
          image: "https://images.pexels.com/photos/23338899/pexels-photo-23338899.jpeg?cs=srgb&dl=pexels-thilina-alagiyawanna-3266092-23338899.jpg&fm=jpg"
        },
        {
          name: "Negombo",
          description: "Coastal city famous for its beaches, fishing industry, and proximity to the airport.",
          attractions: [
            { 
              name: "Negombo Beach", 
              photos: attractionPhotos.negomboBeach, 
              details: "A wide sandy beach popular for sunbathing and water sports.",
              rating: 4.4,
              duration: "Half day",
              category: "Beach & Water"
            },
            { 
              name: "Dutch Fort", 
              photos: attractionPhotos.dutchFort, 
              details: "Remains of a 17th-century Dutch fortification.",
              rating: 4.1,
              duration: "1 hour",
              category: "Historical Sites"
            },
            { 
              name: "Fish Market", 
              photos: attractionPhotos.fishMarket, 
              details: "A vibrant market where fresh seafood is sold daily.",
              rating: 4.0,
              duration: "1 hour",
              category: "Markets & Local Life"
            },
            { 
              name: "Muthurajawela Wetland", 
              photos: attractionPhotos.muthurajawelaWetland, 
              details: "A vast coastal wetland rich in biodiversity, ideal for boat safaris.",
              rating: 4.6,
              duration: "3-4 hours",
              category: "Nature & Wildlife"
            }
          ],
          image: "https://placehold.co/600x400/ADD8E6/000000?text=Negombo"
        },
        {
          name: "Kalutara",
          description: "Beautiful coastal town with golden beaches and the famous Kalutara Bodhiya.",
          attractions: [
            { 
              name: "Kalutara Beach", 
              photos: attractionPhotos.kalutaraBeach, 
              details: "A scenic beach known for its tranquility.",
              rating: 4.3,
              duration: "Half day",
              category: "Beach & Water"
            },
            { 
              name: "Kalutara Bodhiya", 
              photos: attractionPhotos.kalutaraBodhiya, 
              details: "A revered Buddhist temple with a hollow dagoba.",
              rating: 4.7,
              duration: "1-2 hours",
              category: "Religious Sites"
            },
            { 
              name: "Richmond Castle", 
              photos: attractionPhotos.richmondCastle, 
              details: "An impressive Edwardian mansion with beautiful architecture.",
              rating: 4.2,
              duration: "1 hour",
              category: "Historical Sites"
            },
            { 
              name: "Fa Hien Cave", 
              photos: attractionPhotos.faHienCave, 
              details: "A prehistoric cave site with archaeological significance.",
              rating: 4.0,
              duration: "1-2 hours",
              category: "Historical Sites"
            }
          ],
          image: "https://placehold.co/600x400/90EE90/000000?text=Kalutara"
        }
      ]
    },
    southern: {
      name: "Southern Province",
      capital: "Galle",
      places: [
        {
          name: "Galle",
          description: "Historic fortified city with Dutch colonial architecture and stunning coastal views.",
          attractions: [
            { 
              name: "Galle Fort", 
              photos: attractionPhotos.galleFort, 
              details: "A UNESCO World Heritage site, a fortified city with colonial charm.",
              rating: 4.7,
              duration: "Half day",
              category: "UNESCO Heritage"
            },
            { 
              name: "Dutch Reformed Church", 
              photos: attractionPhotos.dutchReformedChurch, 
              details: "A historic church within Galle Fort.",
              rating: 4.2,
              duration: "30 minutes",
              category: "Religious Sites"
            },
            { 
              name: "Maritime Museum", 
              photos: attractionPhotos.maritimeMuseum, 
              details: "Showcasing the marine archaeological heritage of Sri Lanka.",
              rating: 4.0,
              duration: "1-2 hours",
              category: "Museum & Culture"
            },
            { 
              name: "Galle Lighthouse", 
              photos: attractionPhotos.galleLighthouse, 
              details: "An iconic lighthouse offering panoramic views.",
              rating: 4.3,
              duration: "30 minutes",
              category: "Landmarks"
            }
          ],
          image: "https://placehold.co/600x400/FFD700/000000?text=Galle"
        },
        {
          name: "Mirissa",
          description: "Popular beach destination known for whale watching and surfing.",
          attractions: [
            { 
              name: "Mirissa Beach", 
              photos: attractionPhotos.mirissaBeach, 
              details: "A beautiful crescent-shaped beach.",
              rating: 4.5,
              duration: "Half day",
              category: "Beach & Water"
            },
            { 
              name: "Whale Watching", 
              photos: attractionPhotos.whaleWatching, 
              details: "One of the best places in the world for whale and dolphin watching.",
              rating: 4.8,
              duration: "3-4 hours",
              category: "Nature & Wildlife"
            },
            { 
              name: "Coconut Tree Hill", 
              photos: attractionPhotos.coconutTreeHill, 
              details: "A picturesque spot with palm trees overlooking the ocean.",
              rating: 4.4,
              duration: "1 hour",
              category: "Natural Beauty"
            },
            { 
              name: "Snake Island", 
              photos: attractionPhotos.snakeIsland, 
              details: "A small island accessible by walking during low tide.",
              rating: 4.1,
              duration: "1-2 hours",
              category: "Natural Beauty"
            }
          ],
          image: "https://placehold.co/600x400/FFB6C1/000000?text=Mirissa"
        }
      ]
    },
    central: {
      name: "Central Province",
      capital: "Kandy",
      places: [
        {
          name: "Kandy",
          description: "Cultural capital home to the Temple of the Tooth and beautiful lake.",
          attractions: [
            { 
              name: "Temple of the Tooth", 
              photos: attractionPhotos.templeOfTheTooth, 
              details: "A sacred Buddhist temple housing a relic of the tooth of the Buddha.",
              rating: 4.8,
              duration: "2-3 hours",
              category: "Religious Sites"
            },
            { 
              name: "Kandy Lake", 
              photos: attractionPhotos.kandyLake, 
              details: "A picturesque artificial lake in the heart of Kandy.",
              rating: 4.4,
              duration: "1 hour",
              category: "Natural Beauty"
            },
            { 
              name: "Royal Botanical Gardens", 
              photos: attractionPhotos.royalBotanicalGardens, 
              details: "Vast gardens with a stunning collection of orchids and other plants.",
              rating: 4.6,
              duration: "3-4 hours",
              category: "Gardens & Nature"
            },
            { 
              name: "Bahirawakanda Temple", 
              photos: attractionPhotos.bahirawakandaTemple, 
              details: "A large Buddha statue offering panoramic views of Kandy.",
              rating: 4.3,
              duration: "1-2 hours",
              category: "Religious Sites"
            }
          ],
          image: "https://placehold.co/600x400/DDA0DD/000000?text=Kandy"
        },
        {
          name: "Nuwara Eliya",
          description: "Hill station known as 'Little England' with tea plantations and cool climate.",
          attractions: [
            { 
              name: "Gregory Lake", 
              photos: attractionPhotos.gregoryLake, 
              details: "A prominent lake offering boat rides and leisure activities.",
              rating: 4.3,
              duration: "2-3 hours",
              category: "Natural Beauty"
            },
            { 
              name: "Horton Plains", 
              photos: attractionPhotos.hortonPlains, 
              details: "A national park known for its unique landscapes and World's End cliff.",
              rating: 4.7,
              duration: "Full day",
              category: "Nature & Wildlife"
            },
            { 
              name: "Tea Plantations", 
              photos: attractionPhotos.teaPlantations, 
              details: "Vast tea estates offering tours and tea tasting.",
              rating: 4.5,
              duration: "Half day",
              category: "Cultural Experience"
            },
            { 
              name: "Seetha Amman Temple", 
              photos: attractionPhotos.seethaAmmanTemple, 
              details: "A Hindu temple with mythological significance.",
              rating: 4.2,
              duration: "1 hour",
              category: "Religious Sites"
            }
          ],
          image: "https://placehold.co/600x400/B0E0E6/000000?text=Nuwara+Eliya"
        }
      ]
    },
    northern: {
      name: "Northern Province",
      capital: "Jaffna",
      places: [
        {
          name: "Jaffna",
          description: "Cultural hub with ancient temples, colonial architecture, and unique cuisine.",
          attractions: [
            {
              name: "Jaffna Fort",
              photos: attractionPhotos.jaffnaFort,
              details: "A large fort built by the Portuguese and later expanded by the Dutch.",
              rating: 4.5,
              duration: "1-2 hours",
              category: "Historical Sites"
            },
            {
              name: "Nallur Kandaswamy Temple",
              photos: attractionPhotos.nallurKandaswamyTemple,
              details: "A significant Hindu temple dedicated to Lord Murugan.",
              rating: 4.8,
              duration: "1-2 hours",
              category: "Religious Sites"
            },
            {
              name: "Casuarina Beach",
              photos: attractionPhotos.casuarinaBeach,
              details: "A beautiful, shallow beach ideal for swimming.",
              rating: 4.3,
              duration: "Half day",
              category: "Beach & Water"
            },
            {
              name: "Delft Island",
              photos: attractionPhotos.delftIsland,
              details: "Known for wild horses, ancient ruins, and unique coral structures.",
              rating: 4.0,
              duration: "Full day",
              category: "Nature & History"
            }
          ],
          image: "https://placehold.co/600x400/FFC0CB/000000?text=Jaffna"
        }
      ]
    },
    eastern: {
      name: "Eastern Province",
      capital: "Trincomalee",
      places: [
        {
          name: "Trincomalee",
          description: "Coastal city with natural harbor, beautiful beaches, and historical sites.",
          attractions: [
            {
              name: "Koneswaram Temple",
              photos: attractionPhotos.koneswaramTemple,
              details: "An ancient Hindu temple perched on a cliff overlooking the sea.",
              rating: 4.7,
              duration: "1-2 hours",
              category: "Religious Sites"
            },
            {
              name: "Nilaveli Beach",
              photos: attractionPhotos.nilaveliBeach,
              details: "Pristine white sand beach perfect for relaxation and water sports.",
              rating: 4.6,
              duration: "Half day",
              category: "Beach & Water"
            },
            {
              name: "Pigeon Island National Park",
              photos: attractionPhotos.pigeonIsland,
              details: "Famous for snorkeling and diving among coral reefs and marine life.",
              rating: 4.8,
              duration: "Half day",
              category: "Nature & Wildlife"
            }
          ],
          image: "https://placehold.co/600x400/87CEFA/000000?text=Trincomalee"
        },
        {
          name: "Batticaloa",
          description: "Known for its 'singing fish', tranquil lagoons, and historical fort.",
          attractions: [
            {
              name: "Pasikudah Beach",
              photos: attractionPhotos.pasikudahBeach,
              details: "A very shallow and calm beach, ideal for families.",
              rating: 4.4,
              duration: "Half day",
              category: "Beach & Water"
            },
            {
              name: "Batticaloa Fort",
              photos: attractionPhotos.batticaloaFort,
              details: "A small, well-preserved Dutch fort on an island.",
              rating: 4.0,
              duration: "1 hour",
              category: "Historical Sites"
            },
            {
              name: "Kallady Bridge",
              photos: attractionPhotos.kalladyBridge,
              details: "Known for the 'singing fish' phenomenon during certain times of the year.",
              rating: 3.8,
              duration: "30 minutes",
              category: "Unique Attractions"
            }
          ],
          image: "https://placehold.co/600x400/B0E0E6/000000?text=Batticaloa"
        }
      ]
    },
    northCentral: {
      name: "North Central Province",
      capital: "Anuradhapura",
      places: [
        {
          name: "Anuradhapura",
          description: "Ancient capital city, a UNESCO World Heritage site with vast ruins and sacred Buddhist sites.",
          attractions: [
            {
              name: "Ruwanwelisaya Stupa",
              photos: attractionPhotos.ruwanwelisayaStupa,
              details: "One of the largest stupas in Sri Lanka, a sacred Buddhist pilgrimage site.",
              rating: 4.9,
              duration: "1-2 hours",
              category: "Religious Sites"
            },
            {
              name: "Jaya Sri Maha Bodhi",
              photos: attractionPhotos.jayasriMahaBodhi,
              details: "A sacred fig tree, believed to be a sapling from the Bodhi tree under which Buddha attained enlightenment.",
              rating: 4.9,
              duration: "1 hour",
              category: "Religious Sites"
            },
            {
              name: "Isurumuniya Temple",
              photos: attractionPhotos.isurumuniyaTemple,
              details: "A rock temple known for its ancient carvings, including the 'Isurumuniya Lovers'.",
              rating: 4.5,
              duration: "1 hour",
              category: "Religious Sites"
            }
          ],
          image: "https://placehold.co/600x400/D8BFD8/000000?text=Anuradhapura"
        },
        {
          name: "Polonnaruwa",
          description: "Another ancient capital, featuring well-preserved ruins of palaces, temples, and statues.",
          attractions: [
            {
              name: "Sigiriya Rock Fortress", // Often visited from Polonnaruwa/Dambulla area
              photos: attractionPhotos.sigiriyaRockFortress,
              details: "An ancient rock fortress and palace, a UNESCO World Heritage site.",
              rating: 4.9,
              duration: "3-4 hours",
              category: "UNESCO Heritage"
            },
            {
              name: "Dambulla Cave Temple", // Often visited from Polonnaruwa/Dambulla area
              photos: attractionPhotos.dambullaCaveTemple,
              details: "A UNESCO World Heritage site with five cave temples containing statues and murals.",
              rating: 4.7,
              duration: "2-3 hours",
              category: "UNESCO Heritage"
            }
          ],
          image: "https://placehold.co/600x400/DAA520/000000?text=Polonnaruwa"
        }
      ]
    },
    northWestern: {
      name: "North Western Province",
      capital: "Kurunegala",
      places: [
        {
          name: "Kurunegala",
          description: "Known for its large rock formations and a giant Buddha statue.",
          attractions: [
            {
              name: "Ethagala (Elephant Rock)",
              photos: attractionPhotos.ethagalaRock, // Using a specific placeholder
              details: "Ethagala, also known as Elephant Rock, is the most iconic among the seven giant rock formations that frame the town of Kurunegala, rising approximately 316 m (1,037 ft) above the surrounding plains, its shape resembling a giant crouching elephant . Located just about 1 km from Kurunegala’s city centre, it offers both a moderate 15–20-minute climb via carved steps and a driveable road to the summit At the top sits the ancient Athugala Viharaya temple and a commanding 88-ft pure-white Samadhi Buddha statue that glows dramatically at dusk and can even be seen lit up at night . From the summit, visitors are treated to panoramic views of Kurunegala, its lake, and the surrounding hills—especially magical during the evening golden hour . Whether you're a hiker, photographer, or seeker of serene mountain-spirit, Ethagala is a must-visit landmark that blends natural beauty, spiritual significance, and local legend in one unforgettable experience alamy.com",
              rating: 4.2,
              duration: "1-2 hours",
              category: "Natural Beauty & Religious Sites"
            }
          ],
          image: "https://api.homelands.lk/uploads/1690791792500-kurunegala_dcard.jpg"
        },
        {
          name: "Puttalam",
          description: "Coastal town known for its lagoon, salt production, and gateway to Wilpattu National Park.",
          attractions: [
            {
              name: "Wilpattu National Park",
              photos: attractionPhotos.wilpattuNationalPark,
              details: "Sri Lanka's largest national park, famous for its leopard population and natural lakes.",
              rating: 4.6,
              duration: "Full day",
              category: "Nature & Wildlife"
            },
            {
              name: "Munneswaram Temple",
              photos: attractionPhotos.munneswaramTemple,
              details: "An ancient Hindu temple complex, significant for its connection to the Ramayana epic.",
              rating: 4.3,
              duration: "1 hour",
              category: "Religious Sites"
            }
          ],
          image: "https://placehold.co/600x400/F0E68C/000000?text=Puttalam"
        }
      ]
    },
    uva: {
      name: "Uva Province",
      capital: "Badulla",
      places: [
        {
          name: "Badulla",
          description: "A major city in the central highlands, surrounded by tea plantations and waterfalls.",
          attractions: [
            {
              name: "Muthiyangana Raja Maha Vihara",
              photos: attractionPhotos.muthiyanganaTemple,
              details: "An ancient Buddhist temple believed to be visited by Lord Buddha.",
              rating: 4.5,
              duration: "1 hour",
              category: "Religious Sites"
            },
            {
              name: "Badulla Kataragama Devalaya",
              photos: attractionPhotos.badullaKatharagamaDevalaya,
              details: "A Hindu shrine dedicated to God Kataragama.",
              rating: 4.0,
              duration: "30 minutes",
              category: "Religious Sites"
            }
          ],
          image: "https://placehold.co/600x400/DDA0DD/000000?text=Badulla"
        },
        {
          name: "Ella",
          description: "A small, charming town in the highlands, popular for hiking and stunning views.",
          attractions: [
            {
              name: "Ella Rock",
              photos: attractionPhotos.ellaRock,
              details: "A popular hiking destination offering breathtaking panoramic views.",
              rating: 4.7,
              duration: "3-4 hours",
              category: "Hiking & Nature"
            },
            {
              name: "Nine Arch Bridge",
              photos: attractionPhotos.nineArchBridge,
              details: "An iconic colonial-era railway bridge, famous for its impressive architecture.",
              rating: 4.8,
              duration: "1-2 hours",
              category: "Landmarks"
            },
            {
              name: "Little Adam's Peak",
              photos: attractionPhotos.littleAdamsPeak,
              details: "An easier hike than Ella Rock, providing stunning views of the surrounding valleys.",
              rating: 4.6,
              duration: "2-3 hours",
              category: "Hiking & Nature"
            },
            {
              name: "Rawana Falls",
              photos: attractionPhotos.rawanaFalls,
              details: "A beautiful cascading waterfall, easily accessible from the main road.",
              rating: 4.2,
              duration: "30 minutes",
              category: "Waterfalls"
            }
          ],
          image: "https://placehold.co/600x400/90EE90/000000?text=Ella"
        }
      ]
    },
    sabaragamuwa: {
      name: "Sabaragamuwa Province",
      capital: "Ratnapura",
      places: [
        {
          name: "Ratnapura",
          description: "Known as the 'City of Gems' and a gateway to Adam's Peak.",
          attractions: [
            {
              name: "Sri Pada (Adam's Peak)",
              photos: attractionPhotos.sriPada,
              details: "A sacred mountain pilgrimage site for multiple religions, known for its 'sacred footprint'.",
              rating: 4.9,
              duration: "Full day/Overnight",
              category: "Religious Sites & Hiking"
            },
            {
              name: "Sinharaja Forest Reserve",
              photos: attractionPhotos.sinharajaForestReserve,
              details: "A UNESCO World Heritage site and a biodiversity hotspot, ideal for rainforest trekking.",
              rating: 4.7,
              duration: "Half day-Full day",
              category: "UNESCO Heritage & Nature"
            },
            {
              name: "Bopath Ella Falls",
              photos: attractionPhotos.bopathEllaFalls,
              details: "A beautiful, popular waterfall with a distinctive 'Bo' leaf shape.",
              rating: 4.3,
              duration: "1 hour",
              category: "Waterfalls"
            }
          ],
          image: "https://placehold.co/600x400/8B0000/FFFFFF?text=Ratnapura"
        },
        {
          name: "Kegalle",
          description: "Known for the Pinnawala Elephant Orphanage and lush landscapes.",
          attractions: [
            {
              name: "Pinnawala Elephant Orphanage",
              photos: attractionPhotos.pinnawalaElephantOrphanage, // Corrected to specific placeholder
              details: "A facility for orphaned wild elephants, offering opportunities to observe them.",
              rating: 4.0,
              duration: "2-3 hours",
              category: "Wildlife & Conservation"
            },
            {
              name: "Kitulgala",
              photos: attractionPhotos.kitulgala,
              details: "Popular for white-water rafting and adventure sports.",
              rating: 4.5,
              duration: "Half day-Full day",
              category: "Adventure & Nature"
            }
          ],
          image: "https://placehold.co/600x400/F08080/000000?text=Kegalle"
        }
      ]
    },
  };

  // Handles click on a region on the SVG map, setting modal content to 'region'
  const handleRegionClick = (regionKey) => {
    setSelectedData(regions[regionKey]);
    setModalContent('region');
  };

  // Handles click on an attraction card, setting modal content to 'attraction'
  // Resets current photo index to 0 for the newly selected attraction
  const handleAttractionClick = (attraction) => {
    setSelectedData(attraction);
    setCurrentPhotoIndex(0); 
    setModalContent('attraction');
  };

  // Closes any open modal and resets selected data and photo index
  const closeModal = () => {
    setModalContent(null);
    setSelectedData(null);
    setCurrentPhotoIndex(0); 
  };

  // Advances to the next photo in the attraction's photo array, looping back to the start
  const handleNextPhoto = () => {
    if (selectedData && selectedData.photos) {
      setCurrentPhotoIndex((prevIndex) => 
        (prevIndex + 1) % selectedData.photos.length
      );
    }
  };

  // Goes to the previous photo in the attraction's photo array, looping to the end if at the start
  const handlePrevPhoto = () => {
    if (selectedData && selectedData.photos) {
      setCurrentPhotoIndex((prevIndex) => 
        (prevIndex - 1 + selectedData.photos.length) % selectedData.photos.length
      );
    }
  };

  // Renders star icons based on a given rating (full, half, empty stars)
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<span key={i} className="star filled">★</span>);
    }
    
    if (hasHalfStar) {
      stars.push(<span key="half" className="star half">★</span>);
    }
    
    const remainingStars = 5 - Math.ceil(rating);
    for (let i = 0; i < remainingStars; i++) {
      stars.push(<span key={`empty-${i}`} className="star empty">☆</span>);
    }
    
    return stars;
  };

  // Renders the appropriate modal content based on `modalContent` state
  const renderModalContent = () => {
    if (!modalContent || !selectedData) {
      return null; // No modal to render if no content or data is selected
    }

    if (modalContent === 'region') {
      const region = selectedData;
      return (
        <div className="details-modal">
          <button className="close-button" onClick={closeModal}>×</button>
          <div className="modal-content">
            <div className="modal-header">
              <h3>{region.name}</h3>
              <p className="capital">Capital: {region.capital}</p>
            </div>
            
            <div className="places-grid">
              {region.places.map((place, index) => (
                <div key={index} className="place-card">
                  <div className="place-image">
                    <img src={place.image} alt={place.name} />
                  </div>
                  <div className="place-content">
                    <h4>{place.name}</h4>
                    <p className="place-description">{place.description}</p>
                    <div className="attractions">
                      <h5>Top Attractions:</h5>
                      <div className="attractions-grid">
                        {place.attractions.map((attraction, i) => (
                          <div key={i} className="attraction-card" onClick={() => handleAttractionClick(attraction)}>
                            <div className="attraction-image">
                              {/* Display the first photo for the attraction card preview */}
                              <img src={attraction.photos[0]} alt={attraction.name} />
                            </div>
                            <div className="attraction-info">
                              <h6>{attraction.name}</h6>
                              <div className="rating">
                                {renderStars(attraction.rating)}
                                <span className="rating-number">{attraction.rating}</span>
                              </div>
                              <div className="attraction-meta">
                                <span className="duration">{attraction.duration}</span>
                                <span className="category">{attraction.category}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    } else if (modalContent === 'attraction') {
      const attraction = selectedData;
      // Check if the attraction has more than one photo to enable navigation buttons
      const hasMultiplePhotos = attraction.photos && attraction.photos.length > 1;

      return (
        <div className="details-modal attraction-modal">
          <button className="close-button" onClick={closeModal}>×</button>
          <div className="modal-content">
            <div className="attraction-header">
              {/* Display the current photo based on currentPhotoIndex */}
              <img src={attraction.photos[currentPhotoIndex]} alt={attraction.name} className="attraction-hero-image" />
              {hasMultiplePhotos && (
                <div className="photo-navigation">
                  <button onClick={handlePrevPhoto} className="nav-button prev-button">❮</button>
                  <button onClick={handleNextPhoto} className="nav-button next-button">❯</button>
                </div>
              )}
              <div className="attraction-title">
                <h3>{attraction.name}</h3>
                <span className="attraction-category">{attraction.category}</span>
              </div>
            </div>
            
            <div className="attraction-details">
              <div className="attraction-stats">
                <div className="stat">
                  <label>Rating</label>
                  <div className="rating">
                    {renderStars(attraction.rating)}
                    <span className="rating-number">{attraction.rating}</span>
                  </div>
                </div>
                <div className="stat">
                  <label>Duration</label>
                  <span className="duration">{attraction.duration}</span>
                </div>
              </div>
              
              <div className="attraction-description">
                <h4>About this attraction</h4>
                <p>{attraction.details}</p>
              </div>
              
              <div className="attraction-actions">
                <button className="btn-secondary" onClick={closeModal}>Back</button>
                <button className="btn-primary">Plan Visit</button>
              </div>
            </div>
          </div>
        </div>
      );
    }
  };

  return (
    <div className="sri-lanka-map-container">
      {/* Inline CSS for the component. This replaces the external CSS file. */}
     
      <div className="map-header">
        <h2>Explore Sri Lanka</h2>
        <p>Click on any province to discover amazing destinations</p>
      </div>

      <div className="map-wrapper">
        <svg
          viewBox="0 0 800 600"
          className="sri-lanka-map"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Western Province */}
          <path
            d="M 150 250 L 200 240 L 210 280 L 180 320 L 140 310 Z"
            className="region western"
            onClick={() => handleRegionClick('western')}
          />
          <text x="175" y="285" className="region-label">Western</text>

          {/* Southern Province */}
          <path
            d="M 180 320 L 210 280 L 280 290 L 320 340 L 280 380 L 200 370 Z"
            className="region southern"
            onClick={() => handleRegionClick('southern')}
          />
          <text x="240" y="340" className="region-label">Southern</text>

          {/* Central Province */}
          <path
            d="M 210 280 L 280 290 L 320 250 L 300 200 L 250 210 L 200 240 Z"
            className="region central"
            onClick={() => handleRegionClick('central')}
          />
          <text x="255" y="245" className="region-label">Central</text>

          {/* Northern Province */}
          <path
            d="M 300 100 L 350 110 L 360 150 L 310 140 Z"
            className="region northern"
            onClick={() => handleRegionClick('northern')}
          />
          <text x="320" y="130" className="region-label">Northern</text>

          {/* Eastern Province */}
          <path
            d="M 360 150 L 400 180 L 420 220 L 390 250 L 350 240 L 340 190 Z"
            className="region eastern"
            onClick={() => handleRegionClick('eastern')}
          />
          <text x="380" y="200" className="region-label">Eastern</text>

          {/* North Central Province */}
          <path
            d="M 280 290 L 320 250 L 350 240 L 390 250 L 360 290 L 300 300 Z"
            className="region northCentral"
            onClick={() => handleRegionClick('northCentral')}
          />
          <text x="330" y="275" className="region-label">North Central</text>

          {/* North Western Province */}
          <path
            d="M 140 310 L 180 320 L 200 370 L 150 380 L 100 350 Z"
            className="region northWestern"
            onClick={() => handleRegionClick('northWestern')}
          />
          <text x="150" y="345" className="region-label">North Western</text>

          {/* Uva Province */}
          <path
            d="M 320 340 L 380 380 L 400 420 L 350 450 L 300 400 Z"
            className="region uva"
            onClick={() => handleRegionClick('uva')}
          />
          <text x="350" y="400" className="region-label">Uva</text>

          {/* Sabaragamuwa Province */}
          <path
            d="M 280 380 L 320 340 L 300 400 L 250 420 L 220 390 Z"
            className="region sabaragamuwa"
            onClick={() => handleRegionClick('sabaragamuwa')}
          />
          <text x="260" y="390" className="region-label">Sabaragamuwa</text>

        </svg>
      </div>

      {renderModalContent()}
    </div>
  );
};

export default Destination;
