export const mockVehicles = [
  {
    id: 1,
    name: "Toyota Innova Crysta",
    brand: "Toyota",
    model: "Innova Crysta VX",
    category: "SUV",
    pricePerDay: 2500,
    fuelType: "Diesel",
    transmission: "Automatic",
    seats: 7,
    year: 2024,
    rating: 4.8,
    reviewsCount: 42,
    available: true,
    regNumber: "TS-09-EV-8842",
    image: "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80"
    ],
    features: ["Air Conditioning", "GPS Navigation", "Bluetooth Audio", "USB Fast Charger", "Rear Parking Camera", "Captain Seats"],
    specs: {
      engine: "2.4L Turbo Diesel",
      mileage: "14.5 kmpl",
      bootSpace: "300 Liters",
      airbags: "7 Airbags"
    },
    description: "The Toyota Innova Crysta is India's most trusted MPV/SUV, offering unparalleled comfort, spacious captain seating, power-packed diesel engine, and supreme highway stability."
  },
  {
    id: 2,
    name: "Hyundai Creta SX(O)",
    brand: "Hyundai",
    model: "Creta 1.5 Turbo",
    category: "SUV",
    pricePerDay: 1800,
    fuelType: "Petrol",
    transmission: "Automatic",
    seats: 5,
    year: 2024,
    rating: 4.7,
    reviewsCount: 38,
    available: true,
    regNumber: "TS-08-FB-1209",
    image: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80"
    ],
    features: ["Panoramic Sunroof", "Bose Premium Sound", "Ventilated Seats", "360 Camera", "ADAS Safety", "Wireless Charging"],
    specs: {
      engine: "1.5L Turbo GDi",
      mileage: "17.4 kmpl",
      bootSpace: "433 Liters",
      airbags: "6 Airbags"
    },
    description: "Modern, feature-loaded compact SUV with panoramic sunroof, ventilated leatherette seats, advanced ADAS tech, and smooth DCT transmission."
  },
  {
    id: 3,
    name: "Honda City V i-VTEC",
    brand: "Honda",
    model: "City 5th Gen",
    category: "Sedan",
    pricePerDay: 1600,
    fuelType: "Petrol",
    transmission: "Manual",
    seats: 5,
    year: 2023,
    rating: 4.6,
    reviewsCount: 29,
    available: true,
    regNumber: "TS-07-HC-9012",
    image: "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80"
    ],
    features: ["Air Conditioning", "Apple CarPlay / Android Auto", "Sunroof", "Cruise Control", "Rear AC Vents"],
    specs: {
      engine: "1.5L i-VTEC Petrol",
      mileage: "17.8 kmpl",
      bootSpace: "506 Liters",
      airbags: "4 Airbags"
    },
    description: "The timeless benchmark sedan. Exceptionally smooth engine, plush legroom, and refined highway cruising capabilities."
  },
  {
    id: 4,
    name: "Tata Nexon EV Max",
    brand: "Tata",
    model: "Nexon EV Long Range",
    category: "Electric",
    pricePerDay: 2200,
    fuelType: "Electric",
    transmission: "Automatic",
    seats: 5,
    year: 2024,
    rating: 4.9,
    reviewsCount: 51,
    available: true,
    regNumber: "TS-09-EV-0010",
    image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&w=800&q=80"
    ],
    features: ["Fast Charging Support", "Electronic Parking Brake", "Wireless Charger", "Connected Car Tech", "Multi-Regen Modes"],
    specs: {
      engine: "40.5 kWh Battery (143 PS)",
      mileage: "453 km Range / Charge",
      bootSpace: "350 Liters",
      airbags: "6 Airbags"
    },
    description: "India's best-selling Electric SUV with 453km claimed range, zero emissions, instant electric torque, and fast charging capability."
  },
  {
    id: 5,
    name: "BMW 5 Series 530i",
    brand: "BMW",
    model: "530i M Sport",
    category: "Luxury",
    pricePerDay: 7500,
    fuelType: "Petrol",
    transmission: "Automatic",
    seats: 5,
    year: 2024,
    rating: 4.95,
    reviewsCount: 19,
    available: true,
    regNumber: "TS-09-LUX-005",
    image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80"
    ],
    features: ["M Sport Aerodynamics", "Harman Kardon Audio", "Adaptive Suspension", "Gesture Control", "Soft Close Doors", "Heated Leather Seats"],
    specs: {
      engine: "2.0L TwinPower Turbo (252 hp)",
      mileage: "14.8 kmpl",
      bootSpace: "530 Liters",
      airbags: "8 Airbags"
    },
    description: "Ultimate luxury executive sedan combining breathtaking performance, VIP acoustic isolation, dynamic sport suspension, and commanding prestige."
  },
  {
    id: 6,
    name: "Maruti Swift ZXi+",
    brand: "Maruti Suzuki",
    model: "Swift DualJet",
    category: "Hatchback",
    pricePerDay: 1200,
    fuelType: "Petrol",
    transmission: "Manual",
    seats: 5,
    year: 2023,
    rating: 4.5,
    reviewsCount: 64,
    available: true,
    regNumber: "TS-07-SW-3321",
    image: "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80"
    ],
    features: ["Air Conditioning", "Keyless Entry", "Touchscreen Infotainment", "Rear Parking Sensors", "Electrically Folding Mirrors"],
    specs: {
      engine: "1.2L K-Series DualJet",
      mileage: "22.5 kmpl",
      bootSpace: "268 Liters",
      airbags: "2 Airbags"
    },
    description: "Compact, sporty, and ultra-economical hatchback. Easy to park in tight spaces with unmatched fuel efficiency."
  },
  {
    id: 7,
    name: "Mahindra Thar 4x4",
    brand: "Mahindra",
    model: "Thar LX Hard Top",
    category: "SUV",
    pricePerDay: 2800,
    fuelType: "Diesel",
    transmission: "Manual",
    seats: 4,
    year: 2024,
    rating: 4.85,
    reviewsCount: 47,
    available: true,
    regNumber: "TS-10-TH-4444",
    image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80"
    ],
    features: ["4x4 Low-Range Transfer Case", "Convertible/Hard Top", "Touchscreen Infotainment", "All-Terrain Tyres", "Roll Cage"],
    specs: {
      engine: "2.2L mHawk Diesel (130 bhp)",
      mileage: "13.0 kmpl",
      bootSpace: "180 Liters",
      airbags: "2 Airbags"
    },
    description: "Iconic off-roader with true 4x4 low-ratio transfer case, high ground clearance, rugged stance, and modern cabin comforts."
  },
  {
    id: 8,
    name: "Royal Enfield Himalayan 450",
    brand: "Royal Enfield",
    model: "Himalayan Sherpa 450",
    category: "Bike",
    pricePerDay: 1100,
    fuelType: "Petrol",
    transmission: "Manual",
    seats: 2,
    year: 2024,
    rating: 4.9,
    reviewsCount: 33,
    available: true,
    regNumber: "TS-09-RE-4500",
    image: "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=800&q=80"
    ],
    features: ["Liquid-Cooled Sherpa Engine", "TFT Display with Google Maps Navigation", "Ride-by-Wire", "Switchable ABS", "Luggage Mounts"],
    specs: {
      engine: "452cc Single Cylinder (40 bhp)",
      mileage: "30 kmpl",
      bootSpace: "N/A (Pannier Compatible)",
      airbags: "Dual Channel ABS"
    },
    description: "Purpose-built adventure tourer with long travel Showa suspension, Google Maps mirror-nav TFT screen, and 40hp liquid-cooled engine."
  },
  {
    id: 9,
    name: "Kia Seltos GTX+",
    brand: "Kia",
    model: "Seltos 1.5 Turbo DCT",
    category: "SUV",
    pricePerDay: 2000,
    fuelType: "Petrol",
    transmission: "Automatic",
    seats: 5,
    year: 2024,
    rating: 4.75,
    reviewsCount: 28,
    available: false,
    regNumber: "TS-09-KS-7711",
    image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=800&q=80"
    ],
    features: ["Dual-Screen Cockpit", "HUD (Heated Head-Up Display)", "Ventilated Front Seats", "Smart Keyless Start", "Dual Zone Climate Control"],
    specs: {
      engine: "1.5L Turbo Petrol (160 PS)",
      mileage: "16.5 kmpl",
      bootSpace: "433 Liters",
      airbags: "6 Airbags"
    },
    description: "Aggressive GT-Line styling, dual 10.25-inch panoramic displays, 160hp turbo engine, and ultra-smooth dual-clutch transmission."
  },
  {
    id: 10,
    name: "Hyundai i20 N Line",
    brand: "Hyundai",
    model: "i20 N Line N8 DCT",
    category: "Hatchback",
    pricePerDay: 1400,
    fuelType: "Petrol",
    transmission: "Automatic",
    seats: 5,
    year: 2024,
    rating: 4.65,
    reviewsCount: 22,
    available: true,
    regNumber: "TS-08-NL-9900",
    image: "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80",
    images: [
      "https://images.unsplash.com/photo-1542282088-72c9c27ed0cd?auto=format&fit=crop&w=800&q=80"
    ],
    features: ["Sporty Dual Exhaust Note", "Paddle Shifters", "N-Line Leatherette Interior", "Bose 7-Speaker Audio", "Sunroof"],
    specs: {
      engine: "1.0L Turbo GDi (120 PS)",
      mileage: "20.0 kmpl",
      bootSpace: "311 Liters",
      airbags: "6 Airbags"
    },
    description: "Hot hatchback with tuned sports exhaust, paddle shifters, stiffer chassis tuning for sharp cornering, and premium tech."
  }
];
