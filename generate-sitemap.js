
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, where } from "firebase/firestore";
import dotenv from "dotenv";
import { SitemapStream, streamToPromise } from "sitemap";
import * as fs from "fs";
import path from "path";

dotenv.config();

// 🔐 Firebase Configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// 🔎 Fetch blog post slugs for category 'Sprouts-education'
const fetchSlugs = async () => {
  try {
    const postsQuery = query(collection(db, "posts"), where("categoryId", "==", "elite_Computing"));
    const querySnapshot = await getDocs(postsQuery);
    return querySnapshot.docs.map((doc) => doc.data().slug).filter((slug) => slug);
  } catch (error) {
    console.error("❌ Error fetching slugs:", error);
    return [];
  }
};

// 🗺️ Generate a single sitemap.xml file directly inside public/
const generateSitemaps = async () => {
  console.log("🚀 Starting sitemap generation...");

  const slugs = await fetchSlugs();
  if (slugs.length === 0) {
    console.log("❗ No posts found for 'Elite-Computing'. Sitemap generation skipped.");
    return;
  }

  const hostname = "https://elitecomputing.co.in";
  const sitemapStream = new SitemapStream({ hostname });

 const staticRoutes = [
  "/", 
  "/about", 
  "/accessories", 
  "/peripheral", 
  "/hardware", 
  "/software", 
  "/cloud-solution", 
  "/iot", 
  "/network-solution", 
  "/sd-wan", 
  "/security-solution", 
  "/wireless-solution", 
  "/clients", 
  "/services", 
  "/contact", 
  "/blog", 
  // Accessories subpages
  "/accessories/wirelesscharger", 
  "/accessories/charger", 
  "/accessories/dockshub", 
  "/accessories/screen", 
  "/accessories/cable", 
  "/accessories/computer", 
  "/accessories/adapter", 
  "/accessories/audio", 
  "/accessories/surge-protectors", 
  "/accessories/airtag-accessories", 
  "/accessories/magnetic", 
  "/accessories/powerbank", 
  // Special/dynamic or fallback routes
  "/post/:slug", 
  "*" // Page not found fallback
];

  // Write static pages
  staticRoutes.forEach(route => {
    sitemapStream.write({ url: route, changefreq: "daily", priority: 0.8 });
  });

  // Write blog slugs
  slugs.forEach(slug => {
    sitemapStream.write({ url: `/post/${slug}`, changefreq: "daily", priority: 0.7 });
  });

  sitemapStream.end();
  const sitemap = await streamToPromise(sitemapStream);

  const publicDir = path.join(process.cwd(), "public");

  const sitemapPath = path.join(publicDir, "sitemap.xml");
  fs.writeFileSync(sitemapPath, sitemap.toString(), "utf8");

  console.log(`✅ Sitemap generated: sitemap.xml`);
};

export { generateSitemaps };

