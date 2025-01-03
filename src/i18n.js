// src/i18n.js
import { createI18n } from 'vue-i18n'

// Define messages for each locale
const messages = {
  en: {
    Home: 'HOME',
    Services: 'SERVICES',
    Team: 'TEAM',
    Course: 'COURSE',
    About: 'ABOUT',
    WhyUs: 'WHY US',
    Repo: 'REPO',
    Login: 'LOGIN',
    Portfolio: 'PORTFOLIO',
    Testimony: 'TESTIMONY',
    Contact: 'CONTACT',
    eBook: 'eBOOKS',
    Stores: 'STORES',
    Items: 'ITEMS',
  },
  khm: {
    Home: 'ទំព័រដើម',
    Services: 'សេវាកម្ម',
    Team: 'ក្រុមការងារ',
    Course: 'វគ្គសិក្សា',
    About: 'អំពីយើង',
    WhyUs: 'ជ្រើសយើង',
    Repo: 'រ៉េប៉ូ',
    Login: 'ចូលប្រើ',
    Portfolio: 'ផតហ្វូល្យូ',
    Testimony: 'មតិអតិថិជន',
    Contact: 'ទំនាក់ទំនង',
    eBook: 'សៀវភៅ​អេឡិចត្រូនិច',
    Stores: 'ហាង',
    Items: 'ទំនិញ',
  }
}

// Create i18n instance with options
const i18n = createI18n({
  locale: 'en', // set locale
  fallbackLocale: 'en', // set fallback locale
  messages, // set locale messages
})

export default i18n