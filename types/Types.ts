import { ReactNode } from "react";
import type { User as FirebaseUser } from "firebase/auth";
export interface ButtonTypes {
  func: () => void;
  textBtn: string;
}

export interface ButtonTypes2 {
  func: () => void;
  textBtn: string;
  textColor: string;
}

export interface ThemeContextTypes {
  themeToggle: () => void;
  IsDark: boolean;
}

export interface ThemeProvider {
  children: ReactNode;
}

export interface AuthNode {
  children: ReactNode;
}

export type AuthType = {
  user: FirebaseUser | null;
  isLoading: boolean;
};

export interface UserData {
  name: string;
  sponsorUsername: string;
  email: string;
  bank: string;
  rekening: string;
  whatsapp: string;
  imageProfile: string;
}

export interface registerType {
  name: string;
  email: string;
  password: string;
  namaRekening: string;
  whatsapp: string;
  bank: string;
  username: string;
  rekening: string;
}

export interface Datas {
  name: string;
  username: string;
  verifikasi: boolean;
  pendapatan: string;
  totalStrem: string;
  totalLagu: string;
}

export interface MusicMetadata {
  title: string;
  artist: string;
  featuredArtist: string;
  releaseType: string;
  albumName?: string;
  trackNumber: number;
  genre: string;
  subGenre: string;
  language: string;
  releaseDate: string;
  // Credits
  credits: {
    composer: string;
    lyricist: string;
    arranger: string;
    producer: string;
    recordingEngineer: string;
    mixingEngineer: string;
    masteringEngineer: string;
  };
  // Rights
  rights: {
    label: string;
    publisher: string;
    copyright: string;
    isrc: string;
    upc: string;
  };
  // Content
  content: {
    isExplicit: boolean;
    isInstrumental: boolean;
    bpm: number | null;
    key: string;
    lyrics: string;
    description: string;
  };
  // Files (dari Pinata)
  files: {
    audioCid: string;
    audioUrl: string;
    audioFileName: string;
    coverCid: string;
    coverUrl: string;
    coverFileName: string;
  };
  // System
  status: "processing" | "live" | "rejected";
  uploadedAt: string; // ISO string; ganti dengan serverTimestamp() Firestore
}

export type FormState = {
  title: string;
  artist: string;
  featuredArtist: string;
  releaseType: string;
  albumName?: string;
  trackNumber: string;
  genre: string;
  subGenre: string;
  language: string;
  releaseDate: string;
  composer: string;
  lyricist: string;
  arranger: string;
  producer: string;
  recordingEngineer: string;
  mixingEngineer: string;
  masteringEngineer: string;
  label: string;
  publisher: string;
  copyright: string;
  isrc: string;
  upc: string;
  isExplicit: boolean;
  isInstrumental: boolean;
  bpm: string;
  key: string;
  lyrics: string;
  description: string;
};

type ActivityType = {
  text: string;
  time: string;
  icon: string;
};

type TrackType = {
  rank: number;
  title: string;
  artist: string;

  coverUrl: string;
};

type StatType = {
  label: string;
  value: string;
  change: string;
};

type PlatformType = {
  name: string;
  pct: number;
};

type WithdrawActivityType = {
  text: string;
  time: string;
  icon: string;
  status: string;
};

export type {
  PlatformType,
  WithdrawActivityType,
  StatType,
  ActivityType,
  TrackType,
};
