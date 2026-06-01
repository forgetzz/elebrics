import { FormState, registerType } from "@/types";

const GENRES = [
  "Pop", "Rock", "Hip Hop", "R&B / Soul", "Jazz", "EDM / Electronic",
  "Classical", "Country", "Reggae", "Blues", "Metal", "Folk / Acoustic",
  "Indie", "Latin", "Gospel / Rohani", "Dangdut", "Keroncong", "Lainnya",
];
const LANGUAGES = ["Indonesia", "English", "Jawa", "Sunda", "Mandarin", "Lainnya"];
const RELEASE_TYPES = ["Single"];
const STEPS = ["Info Dasar", "Credits", "Hak & Distribusi", "Konten & File"];
const MUSICAL_KEYS = [
  "C Major", "C Minor", "C# Major", "C# Minor", "D Major", "D Minor",
  "Eb Major", "Eb Minor", "E Major", "E Minor", "F Major", "F Minor",
  "F# Major", "F# Minor", "G Major", "G Minor", "Ab Major", "Ab Minor",
  "A Major", "A Minor", "Bb Major", "Bb Minor", "B Major", "B Minor",
];
const initialForm: FormState = {
  title: "", artist: "", featuredArtist: "", releaseType: "Single", albumName: "",
  trackNumber: "1", genre: "", subGenre: "", language: "Indonesia", releaseDate: "",
  composer: "", lyricist: "", arranger: "", producer: "", recordingEngineer: "",
  mixingEngineer: "", masteringEngineer: "", label: "", publisher: "", copyright: "",
  isrc: "", upc: "", isExplicit: false, isInstrumental: false, bpm: "", key: "",
  lyrics: "", description: "",
};

const BANKS = ["BCA", "BRI", "BNI", "Mandiri", "CIMB", "Danamon"];


export {initialForm, STEPS, MUSICAL_KEYS, LANGUAGES, RELEASE_TYPES ,GENRES ,BANKS }