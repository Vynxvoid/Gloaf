import axios from 'axios'
import img1 from "../assets/Images/cookies.jpg";
import img2 from "../assets/Images/croissant.jpg";
import img3 from "../assets/Images/pizza.jpg";
import img4 from "../assets/Images/Burger.jpg";
import img5 from "../assets/Images/Waffle.jpg";
import img6 from "../assets/Images/Sushi.png";

export const imageData = [
  {
    imgKey: 1,
    imgSrc: img1,
    imgTitle:
      "Food is not just fuel; it is an experience that brings people together.",
    imgText:
      "Eating a balanced diet helps improve energy, immunity, and overall well-being.",
  },
  {
    imgKey: 2,
    imgSrc: img2,
    imgTitle: "Good food is the foundation of genuine happiness.",
    imgText:
      "Fresh, locally sourced foods often retain more nutrients and better flavor.",
  },
  {
    imgKey: 3,
    imgSrc: img3,
    imgTitle: "A meal shared is a memory made.",
    imgText:
      "Spices not only add flavor but also offer antioxidant and digestive benefits.",
  },
];

export const baseServerURL = "http://localhost:8000/api"

export const api = axios.create({
  baseURL: baseServerURL,
  withCredentials: true
})

export const foodBannerImage = [
  {
    imgKey: 1,
    imgSrc: img1,
    imgTitle:
      "One bite is all it takes to fall in love with real flavor.",
    imgText:
      "Freshly cooked meals made to satisfy your cravings. Use coupon code FOODIE10 to get 10% off your first order.",
  },
  {
    imgKey: 2,
    imgSrc: img2,
    imgTitle:
      "Because great food makes every moment better.",
    imgText:
      "Indulge in chef-crafted dishes using premium ingredients. Apply coupon TASTY20 and enjoy flat 20% savings today.",
  },
  {
    imgKey: 3,
    imgSrc: img3,
    imgTitle:
      "Craving something delicious? We have got you covered.",
    imgText:
      "From comfort food to healthy bowls, there is something for everyone. Grab your deal with coupon EATMORE15.",
  },
]

export const createRestaurantSlug = (name = "") =>
  name.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

export const restaurantCatalog = [
  {
    slug: "the-golden-spoon",
    name: "The Golden Spoon",
    shortDescription: "Chef-driven pasta, wine pairings, and polished comfort food.",
    description:
      "A warm Italian dining room serving house-made pasta, rustic small plates, and a tight list of wines for cozy, elevated dinners.",
    cuisine: ["Italian", "Pasta", "Wine"],
    rating: 4.8,
    ratingsCount: "500+ ratings",
    distance: "1.2 mi",
    openUntil: "10:00 PM",
    address: "123 Flavor Street, Foodville, NY 10012",
    phone: "(555) 123-4567",
    isOpen: true,
    deliveryFee: "Free",
    expectedTime: "20-30 min",
    bannerTone: "from-[#814111] via-[#8d4a16] to-[#6c330d]",
    cardTone: "peach",
    heroImage: img2,
    featuredBadges: [
      { label: "Best Seller", tone: "bg-[#fff4e6] text-[#d76b12]" },
      { label: "Sustainable Packaging", tone: "bg-[#edf9ef] text-[#20743f]" },
      { label: "Verified Partner", tone: "bg-[#edf4ff] text-[#2357c5]" },
    ],
    popularItems: [
      {
        name: "Truffle Carbonara",
        description: "Fresh homemade pasta with creamy truffle sauce, parmesan crisp, and pancetta.",
        price: 18.5,
        image: img2,
      },
      {
        name: "Classic Bruschetta",
        description: "Toasted sourdough topped with fresh tomatoes, basil, garlic, and balsamic.",
        price: 9,
        image: img5,
      },
    ],
    menuSections: [
      {
        title: "Popular Items",
        count: 4,
        items: [
          {
            name: "Truffle Carbonara",
            description: "Fresh homemade pasta with creamy truffle sauce, parmesan crisp, and pancetta.",
            price: 18.5,
            image: img2,
          },
          {
            name: "Classic Bruschetta",
            description: "Toasted sourdough topped with fresh tomatoes, basil, garlic, and balsamic.",
            price: 9,
            image: img5,
          },
        ],
      },
      {
        title: "Appetizers",
        count: 6,
        items: [
          {
            name: "Burrata Plate",
            description: "Creamy burrata with roasted tomato confit, basil oil, and grilled country bread.",
            price: 14,
            image: img6,
          },
        ],
      },
      {
        title: "Main Courses",
        count: 8,
        items: [
          {
            name: "Grilled Salmon",
            description: "Atlantic salmon fillet grilled to perfection, served with asparagus and lemon butter sauce.",
            price: 24,
            image: img6,
            pill: "GF",
          },
          {
            name: "Spicy Pepperoni Pizza",
            description: "Traditional stone-baked pizza with spicy pepperoni, mozzarella, and our signature tomato sauce.",
            price: 16.5,
            image: img3,
          },
          {
            name: "Chicken Parmesan",
            description: "Breaded chicken breast topped with marinara sauce and melted mozzarella, served with spaghetti.",
            price: 19,
            image: img4,
          },
        ],
      },
      {
        title: "Desserts",
        count: 3,
        items: [
          {
            name: "Warm Choco Cookies",
            description: "Freshly baked chocolate chip cookies with a gooey center.",
            price: 4.5,
            image: img1,
            cardLayout: "feature",
          },
          {
            name: "Artisan Gelato",
            description: "Three scoops of our house-made gelato. Choose from vanilla, chocolate, or pistachio.",
            price: 6,
            image: img5,
            cardLayout: "feature",
          },
        ],
      },
      {
        title: "Beverages",
        count: 5,
        items: [
          {
            name: "House Red",
            description: "A smooth medium-bodied red selected to pair with rich pasta dishes.",
            price: 8,
            image: img2,
          },
        ],
      },
    ],
  },
  {
    slug: "the-spicy-wok",
    name: "The Spicy Wok",
    shortDescription: "Sichuan spice, wok-fired noodles, and bold street-style flavors.",
    description:
      "Famous for our Sichuan peppercorn dishes and flaming hot pots. A must-try for spice lovers.",
    cuisine: ["Asian", "Chinese", "Spicy"],
    rating: 4.8,
    ratingsCount: "1.2k ratings",
    distance: "2.4 mi",
    openUntil: "11:00 PM",
    address: "42 Pepper Lane, Foodville, NY 10012",
    phone: "(555) 223-9087",
    isOpen: true,
    deliveryFee: "Free",
    expectedTime: "20-30 min",
    bannerTone: "from-[#7a2a16] via-[#8f361b] to-[#60200d]",
    cardTone: "blush",
    heroImage: img6,
    featuredBadges: [
      { label: "Spice Favorite", tone: "bg-[#fff1ec] text-[#d85f3a]" },
      { label: "Fast Delivery", tone: "bg-[#edf8ff] text-[#2f6db7]" },
    ],
    popularItems: [
      {
        name: "Volcano Ramen",
        description: "Rich chili broth, spring noodles, soft egg, and smoky aromatics.",
        price: 16,
        image: img6,
      },
      {
        name: "Spicy Tacos",
        description: "Hot and crispy tacos with punchy sauce and charred vegetables.",
        price: 11.5,
        image: img3,
      },
    ],
    menuSections: [
      {
        title: "Popular Items",
        count: 4,
        items: [
          {
            name: "Volcano Ramen",
            description: "Rich chili broth, spring noodles, soft egg, and smoky aromatics.",
            price: 16,
            image: img6,
          },
          {
            name: "Firecracker Dumplings",
            description: "Pan-seared dumplings finished with chili crisp and scallion oil.",
            price: 10.5,
            image: img5,
          },
        ],
      },
      {
        title: "Main Courses",
        count: 7,
        items: [
          {
            name: "Kung Pao Bowl",
            description: "Wok-fried chicken, peanuts, peppers, and house sauce over jasmine rice.",
            price: 15,
            image: img4,
          },
          {
            name: "Chili Garlic Noodles",
            description: "Hand-pulled noodles tossed in a deep chili-garlic sauce with sesame crunch.",
            price: 13.5,
            image: img2,
          },
        ],
      },
      {
        title: "Desserts",
        count: 2,
        items: [
          {
            name: "Sesame Honey Twists",
            description: "Warm fried pastry sticks glazed with toasted sesame and honey.",
            price: 6.5,
            image: img1,
            cardLayout: "feature",
          },
        ],
      },
    ],
  },
  {
    slug: "hot-smoky-bbq",
    name: "Hot & Smoky BBQ",
    shortDescription: "Slow-cooked barbecue with deep smoke and ghost pepper heat.",
    description:
      "Authentic southern style BBQ with our signature spicy ghost pepper sauce option.",
    cuisine: ["American", "BBQ", "Grill"],
    rating: 4.6,
    ratingsCount: "500+ ratings",
    distance: "3.2 mi",
    openUntil: "09:30 PM",
    address: "88 Ember Avenue, Foodville, NY 10012",
    phone: "(555) 678-9123",
    isOpen: false,
    deliveryFee: "$3.99",
    expectedTime: "Pre-order",
    bannerTone: "from-[#5c240f] via-[#6e2d14] to-[#4b1d0d]",
    cardTone: "peach",
    heroImage: img4,
    featuredBadges: [
      { label: "Slow Smoked", tone: "bg-[#fff4e6] text-[#ba5a16]" },
      { label: "Signature Sauce", tone: "bg-[#fff0f0] text-[#b43939]" },
    ],
    popularItems: [
      {
        name: "Brisket Plate",
        description: "Tender smoked brisket with pickles, slaw, and house cornbread.",
        price: 22,
        image: img4,
      },
      {
        name: "Chipotle Wings",
        description: "Sticky wings tossed in chipotle glaze with ranch on the side.",
        price: 13,
        image: img5,
      },
    ],
    menuSections: [
      {
        title: "Popular Items",
        count: 4,
        items: [
          {
            name: "Brisket Plate",
            description: "Tender smoked brisket with pickles, slaw, and house cornbread.",
            price: 22,
            image: img4,
          },
          {
            name: "Chipotle Wings",
            description: "Sticky wings tossed in chipotle glaze with ranch on the side.",
            price: 13,
            image: img5,
          },
        ],
      },
      {
        title: "Main Courses",
        count: 6,
        items: [
          {
            name: "Pulled Pork Sandwich",
            description: "Smoked pork shoulder on a brioche bun with apple slaw.",
            price: 15,
            image: img4,
          },
        ],
      },
      {
        title: "Desserts",
        count: 2,
        items: [
          {
            name: "Bourbon Cookie Skillet",
            description: "Warm cookie skillet topped with vanilla cream and bourbon caramel.",
            price: 8,
            image: img1,
            cardLayout: "feature",
          },
        ],
      },
    ],
  },
  {
    slug: "urban-spice-kitchen",
    name: "Urban Spice Kitchen",
    shortDescription: "Bold Indian street flavors with a modern twist.",
    description:
      "A vibrant fusion of classic Indian street food and contemporary flavors, crafted with aromatic spices and fresh ingredients.",
    cuisine: ["Indian", "Street Food", "Fusion"],
    rating: 4.7,
    ratingsCount: "1K+ ratings",
    distance: "2.1 mi",
    openUntil: "11:00 PM",
    address: "22 Spice Street, Flavor Town, CA 90210",
    phone: "(555) 234-7789",
    isOpen: true,
    deliveryFee: "$2.49",
    expectedTime: "25-35 min",
    bannerTone: "from-[#7a1f1f] via-[#a83232] to-[#5c1515]",
    cardTone: "warm",
    heroImage: img2,
    featuredBadges: [
      { label: "Chef Special", tone: "bg-[#fff3e0] text-[#e65100]" },
      { label: "Top Rated", tone: "bg-[#e8f5e9] text-[#2e7d32]" },
    ],
    popularItems: [
      {
        name: "Butter Chicken Bowl",
        description: "Creamy tomato-based curry with tender chicken and basmati rice.",
        price: 14,
        image: img2,
      },
      {
        name: "Paneer Tikka Wrap",
        description: "Grilled paneer wrapped with mint chutney and fresh veggies.",
        price: 11,
        image: img3,
      },
    ],
    menuSections: [
      {
        title: "Popular Items",
        count: 5,
        items: [
          {
            name: "Butter Chicken Bowl",
            description: "Creamy tomato-based curry with tender chicken and basmati rice.",
            price: 14,
            image: img2,
          },
          {
            name: "Paneer Tikka Wrap",
            description: "Grilled paneer wrapped with mint chutney and fresh veggies.",
            price: 11,
            image: img3,
          },
        ],
      },
      {
        title: "Main Courses",
        count: 7,
        items: [
          {
            name: "Hyderabadi Biryani",
            description: "Fragrant basmati rice layered with spiced chicken and herbs.",
            price: 16,
            image: img2,
          },
        ],
      },
      {
        title: "Desserts",
        count: 3,
        items: [
          {
            name: "Gulab Jamun Cheesecake",
            description: "Fusion dessert with soft gulab jamun and creamy cheesecake base.",
            price: 9,
            image: img1,
            cardLayout: "feature",
          },
        ],
      },
    ],
  }
]

export const restaurantSearchResults = restaurantCatalog.map((restaurant) => ({
  slug: restaurant.slug,
  title: restaurant.name,
  tags: restaurant.cuisine,
  isOpen: restaurant.isOpen,
  rating: restaurant.rating,
  reviews: restaurant.ratingsCount.replace(" ratings", ""),
  expectedTime: restaurant.expectedTime,
  deliveryFee: restaurant.deliveryFee,
  description: restaurant.description,
  img: restaurant.heroImage,
  tone: restaurant.cardTone,
}))

export const dishSearchResults = restaurantCatalog.flatMap((restaurant) =>
  restaurant.popularItems.map((item, index) => ({
    title: item.name,
    restaurant: `${restaurant.name} • ${restaurant.distance}`,
    rating: restaurant.rating,
    price: item.price,
    expectedTime: restaurant.expectedTime,
    img: item.image,
    restaurantSlug: restaurant.slug,
    badge: index === 0 ? "Best Match" : undefined,
    tag: index === 1 && restaurant.slug === "the-spicy-wok" ? "Spicy" : undefined,
    liked: restaurant.slug === "the-spicy-wok" && index === 0,
    tone: restaurant.cardTone,
  }))
)

export const homeDishRecommendations = dishSearchResults.slice(0, 5)
export const homeRestaurantRecommendations = restaurantSearchResults.slice(0, 4)

export const getRestaurantBySlug = (slug) =>
  restaurantCatalog.find((restaurant) => restaurant.slug === slug)

