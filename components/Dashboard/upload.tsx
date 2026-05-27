"use client";

import React, { useState, useRef } from "react";
import styles from "../css/Uploadmusic.module.css";
import { useTheme } from "@/hooks";
import { Colors } from "@/utils";

const GENRES = [
  "Pop", "Rock", "Hip Hop", "R&B / Soul", "Jazz", "EDM / Electronic",
  "Classical", "Country", "Reggae", "Blues", "Metal", "Folk / Acoustic",
  "Indie", "Latin", "Gospel / Rohani", "Dangdut", "Keroncong", "Lainnya",
];

const LANGUAGES = ["Indonesia", "English", "Jawa", "Sunda", "Mandarin", "Lainnya"];

const RELEASE_TYPES = ["Single", "EP", "Album", "Mixtape"];

type Form = {
  // Core
  title: string;
  artist: string;
  featuredArtist: string;
  releaseType: string;
  albumName: string;
  trackNumber: string;
  genre: string;
  subGenre: string;
  language: string;
  releaseDate: string;
  // Credits
  composer: string;
  lyricist: string;
  arranger: string;
  producer: string;
  recordingEngineer: string;
  mixingEngineer: string;
  masteringEngineer: string;
  // Rights
  label: string;
  publisher: string;
  copyright: string;
  isrc: string;
  upc: string;
  // Content
  isExplicit: boolean;
  isInstrumental: boolean;
  bpm: string;
  key: string;
  lyrics: string;
  description: string;
};

const initialForm: Form = {
  title: "", artist: "", featuredArtist: "", releaseType: "Single",
  albumName: "", trackNumber: "1", genre: "", subGenre: "", language: "Indonesia",
  releaseDate: "", composer: "", lyricist: "", arranger: "", producer: "",
  recordingEngineer: "", mixingEngineer: "", masteringEngineer: "",
  label: "", publisher: "", copyright: "", isrc: "", upc: "",
  isExplicit: false, isInstrumental: false, bpm: "", key: "",
  lyrics: "", description: "",
};

const STEPS = ["Info Dasar", "Credits", "Hak & Distribusi", "Konten & File"];

const MUSICAL_KEYS = [
  "C Major", "C Minor", "C# Major", "C# Minor",
  "D Major", "D Minor", "Eb Major", "Eb Minor",
  "E Major", "E Minor", "F Major", "F Minor",
  "F# Major", "F# Minor", "G Major", "G Minor",
  "Ab Major", "Ab Minor", "A Major", "A Minor",
  "Bb Major", "Bb Minor", "B Major", "B Minor",
];

export default function UploadMusic() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>(initialForm);
  const [audio, setAudio] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [audioName, setAudioName] = useState<string>("");
  const [submitted, setSubmitted] = useState(false);
const {IsDark , themeToggle} = useTheme()
  const audioRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);
const theme = IsDark ? Colors.PrimaryBg : Colors.SecondryBg
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheck = (name: keyof Form) => {
    setForm((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleCover = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setCover(file);
    if (file) setCoverPreview(URL.createObjectURL(file));
  };

  const handleAudio = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setAudio(file);
    if (file) setAudioName(file.name);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(form).forEach(([k, v]) => data.append(k, String(v)));
    if (audio) data.append("audio", audio);
    if (cover) data.append("cover", cover);
    console.log("UPLOAD PAYLOAD", { form, audio, cover });
    setSubmitted(true);
  };

  const canNext = () => {
    if (step === 0) return form.title && form.artist && form.genre && form.releaseDate && form.releaseType;
    if (step === 1) return form.composer;
    if (step === 2) return form.copyright;
    if (step === 3) return audio && cover;
    return true;
  };

  if (submitted) {
    return (
      <div className={styles.successScreen}>
        <div className={styles.successIcon}>✓</div>
        <h2 className={styles.successTitle}>Upload Berhasil!</h2>
        <p className={styles.successSub}>
          <strong>{form.title}</strong> oleh <strong>{form.artist}</strong> sedang diproses.<br />
          Kamu akan menerima notifikasi saat musik siap ditayangkan.
        </p>
        <button className={styles.successBtn} onClick={() => { setSubmitted(false); setStep(0); setForm(initialForm); setAudio(null); setCover(null); setCoverPreview(null); setAudioName(""); }}>
          Upload Lagi
        </button>
      </div>
    );
  }

  return (
    <div className={`${styles.page} ${theme}`}>
      <div className={styles.noise} aria-hidden />

      <div className={`${styles.wrapper} ${theme}`}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <span className={styles.pageLabel}>Dashboard Artis</span>
          <h1 className={styles.pageTitle}>Upload Musik</h1>
          <p className={styles.pageSub}>Lengkapi metadata sesuai standar industri musik internasional.</p>
        </div>

        {/* Stepper */}
        <div className={styles.stepper}>
          {STEPS.map((s, i) => (
            <React.Fragment key={i}>
              <div className={`${styles.stepItem} ${i === step ? styles.stepActive : ""} ${i < step ? styles.stepDone : ""}`}>
                <div className={styles.stepCircle}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span className={styles.stepLabel}>{s}</span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`${styles.stepLine} ${i < step ? styles.stepLineDone : ""}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Form Card */}
        <form onSubmit={handleSubmit} className={styles.card}>

          {/* ── STEP 0: Info Dasar ── */}
          {step === 0 && (
            <div className={`${styles.section} ${theme}`}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNum}>01</span> Informasi Dasar
              </h2>
              <p className={styles.sectionDesc}>Data utama yang akan tampil di semua platform streaming.</p>

              <div className={styles.row}>
                <div className={styles.fieldFull}>
                  <label className={styles.label}>Judul Lagu <span className={styles.req}>*</span></label>
                  <input className={styles.input} name="title" value={form.title} placeholder="e.g. Langit Malam" onChange={handleChange} required />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>Nama Artist <span className={styles.req}>*</span></label>
                  <input className={styles.input} name="artist" value={form.artist} placeholder="Nama artis utama" onChange={handleChange} required />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Featured Artist</label>
                  <input className={styles.input} name="featuredArtist" value={form.featuredArtist} placeholder="ft. Artist (opsional)" onChange={handleChange} />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>Tipe Rilis <span className={styles.req}>*</span></label>
                  <select className={styles.select} name="releaseType" value={form.releaseType} onChange={handleChange}>
                    {RELEASE_TYPES.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Nama Album / EP</label>
                  <input className={styles.input} name="albumName" value={form.albumName} placeholder="Kosongkan jika single" onChange={handleChange} />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>No. Track</label>
                  <input className={styles.input} type="number" name="trackNumber" value={form.trackNumber} min={1} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Tanggal Rilis <span className={styles.req}>*</span></label>
                  <input className={styles.input} type="date" name="releaseDate" value={form.releaseDate} onChange={handleChange} required />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>Genre <span className={styles.req}>*</span></label>
                  <select className={styles.select} name="genre" value={form.genre} onChange={handleChange} required>
                    <option value="">Pilih Genre</option>
                    {GENRES.map((g) => <option key={g}>{g}</option>)}
                  </select>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Sub-Genre</label>
                  <input className={styles.input} name="subGenre" value={form.subGenre} placeholder="e.g. Indie Pop" onChange={handleChange} />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>Bahasa Lirik <span className={styles.req}>*</span></label>
                  <select className={styles.select} name="language" value={form.language} onChange={handleChange}>
                    {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 1: Credits ── */}
          {step === 1 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNum}>02</span> Credits & Tim Produksi
              </h2>
              <p className={styles.sectionDesc}>Berikan kredit yang tepat kepada semua kontributor.</p>

              <div className={styles.creditGroup}>
                <h3 className={styles.creditGroupTitle}>Penulisan</h3>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Composer / Pencipta <span className={styles.req}>*</span></label>
                    <input className={styles.input} name="composer" value={form.composer} placeholder="Nama pencipta lagu" onChange={handleChange} required />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Lyricist / Penulis Lirik</label>
                    <input className={styles.input} name="lyricist" value={form.lyricist} placeholder="Jika berbeda dari composer" onChange={handleChange} />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Arranger</label>
                    <input className={styles.input} name="arranger" value={form.arranger} placeholder="Penata musik / aransemen" onChange={handleChange} />
                  </div>
                </div>
              </div>

              <div className={styles.creditGroup}>
                <h3 className={styles.creditGroupTitle}>Produksi</h3>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Producer</label>
                    <input className={styles.input} name="producer" value={form.producer} placeholder="Music producer" onChange={handleChange} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Recording Engineer</label>
                    <input className={styles.input} name="recordingEngineer" value={form.recordingEngineer} placeholder="Sound engineer rekaman" onChange={handleChange} />
                  </div>
                </div>
                <div className={styles.row}>
                  <div className={styles.field}>
                    <label className={styles.label}>Mixing Engineer</label>
                    <input className={styles.input} name="mixingEngineer" value={form.mixingEngineer} placeholder="Sound engineer mixing" onChange={handleChange} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label}>Mastering Engineer</label>
                    <input className={styles.input} name="masteringEngineer" value={form.masteringEngineer} placeholder="Sound engineer mastering" onChange={handleChange} />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ── STEP 2: Rights & Distribution ── */}
          {step === 2 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNum}>03</span> Hak Cipta & Distribusi
              </h2>
              <p className={styles.sectionDesc}>Informasi legal yang dibutuhkan untuk distribusi ke platform streaming.</p>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>Label Rekaman</label>
                  <input className={styles.input} name="label" value={form.label} placeholder="Nama label (kosongkan jika indie)" onChange={handleChange} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Publisher / Penerbit Musik</label>
                  <input className={styles.input} name="publisher" value={form.publisher} placeholder="Publisher hak cipta" onChange={handleChange} />
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.fieldFull}>
                  <label className={styles.label}>Copyright <span className={styles.req}>*</span></label>
                  <input className={styles.input} name="copyright" value={form.copyright} placeholder="© 2026 Nama Artist / Label. All Rights Reserved." onChange={handleChange} required />
                  <span className={styles.hint}>Format standar: © [Tahun] [Nama Pemegang Hak]</span>
                </div>
              </div>

              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>ISRC Code</label>
                  <input className={styles.input} name="isrc" value={form.isrc} placeholder="e.g. IDABC2600001" onChange={handleChange} maxLength={12} />
                  <span className={styles.hint}>International Standard Recording Code — 12 karakter</span>
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>UPC / EAN Barcode</label>
                  <input className={styles.input} name="upc" value={form.upc} placeholder="e.g. 012345678901" onChange={handleChange} maxLength={13} />
                  <span className={styles.hint}>Untuk rilis album/EP (opsional untuk single)</span>
                </div>
              </div>

              <div className={styles.infoBox}>
                <span className={styles.infoIcon}>ℹ</span>
                <p className={styles.infoText}>
                  ISRC dan UPC bisa digenerate otomatis jika kosong. Jika kamu sudah punya kode dari distributor, masukkan di sini.
                </p>
              </div>
            </div>
          )}

          {/* ── STEP 3: Content & Files ── */}
          {step === 3 && (
            <div className={styles.section}>
              <h2 className={styles.sectionTitle}>
                <span className={styles.sectionNum}>04</span> Konten & File Upload
              </h2>
              <p className={styles.sectionDesc}>Upload file audio berkualitas tinggi dan artwork sesuai standar DSP.</p>

              {/* Content Flags */}
              <div className={styles.flagsRow}>
                <button
                  type="button"
                  className={`${styles.flagBtn} ${form.isExplicit ? styles.flagActive : ""}`}
                  onClick={() => handleCheck("isExplicit")}
                >
                  <span className={styles.flagIcon}>🔞</span>
                  <span>Explicit Content</span>
                  {form.isExplicit && <span className={styles.flagCheck}>✓</span>}
                </button>
                <button
                  type="button"
                  className={`${styles.flagBtn} ${form.isInstrumental ? styles.flagActive : ""}`}
                  onClick={() => handleCheck("isInstrumental")}
                >
                  <span className={styles.flagIcon}>🎼</span>
                  <span>Instrumental (No Lyrics)</span>
                  {form.isInstrumental && <span className={styles.flagCheck}>✓</span>}
                </button>
              </div>

              {/* BPM + Key */}
              <div className={styles.row}>
                <div className={styles.field}>
                  <label className={styles.label}>BPM (Tempo)</label>
                  <input className={styles.input} type="number" name="bpm" value={form.bpm} placeholder="e.g. 120" min={40} max={300} onChange={handleChange} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label}>Kunci Nada</label>
                  <select className={styles.select} name="key" value={form.key} onChange={handleChange}>
                    <option value="">Pilih Key</option>
                    {MUSICAL_KEYS.map((k) => <option key={k}>{k}</option>)}
                  </select>
                </div>
              </div>

              {/* Audio Upload */}
              <div className={styles.uploadBlock}>
                <div className={styles.uploadLabel}>
                  File Audio <span className={styles.req}>*</span>
                </div>
                <div className={styles.uploadSpec}>WAV 24-bit / 44.1kHz atau lebih tinggi · MP3 320kbps · FLAC</div>
                <div
                  className={`${styles.dropZone} ${audioName ? styles.dropZoneFilled : ""}`}
                  onClick={() => audioRef.current?.click()}
                >
                  <input ref={audioRef} type="file" accept=".wav,.mp3,.flac,.aiff" onChange={handleAudio} className={styles.hiddenInput} required />
                  {audioName ? (
                    <div className={styles.fileReady}>
                      <span className={styles.fileIcon}>🎵</span>
                      <span className={styles.fileName}>{audioName}</span>
                    </div>
                  ) : (
                    <div className={styles.dropPlaceholder}>
                      <span className={styles.dropIcon}>♪</span>
                      <span>Klik atau drag file audio ke sini</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Cover Upload */}
              <div className={styles.uploadBlock}>
                <div className={styles.uploadLabel}>
                  Cover Artwork <span className={styles.req}>*</span>
                </div>
                <div className={styles.uploadSpec}>JPG / PNG · Minimal 3000×3000px · Rasio 1:1 · Maks 10MB</div>
                <div className={styles.coverRow}>
                  <div
                    className={`${styles.coverDropZone} ${coverPreview ? styles.coverDropZoneFilled : ""}`}
                    onClick={() => coverRef.current?.click()}
                  >
                    <input ref={coverRef} type="file" accept="image/*" onChange={handleCover} className={styles.hiddenInput} required />
                    {coverPreview ? (
                      <img src={coverPreview} alt="cover preview" className={styles.coverPreview} />
                    ) : (
                      <div className={styles.dropPlaceholder}>
                        <span className={styles.dropIcon}>🖼</span>
                        <span>Upload Cover</span>
                      </div>
                    )}
                  </div>
                  <div className={styles.coverHints}>
                    <p>Standar cover untuk DSP (Spotify, Apple Music, dll):</p>
                    <ul>
                      <li>Resolusi minimum 3000×3000 pixel</li>
                      <li>Format JPG atau PNG</li>
                      <li>Tidak boleh ada teks "free", "download", atau URL</li>
                      <li>Tidak boleh ada logo platform lain</li>
                      <li>Kamu harus memiliki hak atas gambar ini</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Lyrics */}
              {!form.isInstrumental && (
                <div className={styles.fieldFull}>
                  <label className={styles.label}>Lirik Lagu</label>
                  <textarea
                    className={styles.textarea}
                    name="lyrics"
                    value={form.lyrics}
                    placeholder="Masukkan lirik lengkap di sini..."
                    rows={8}
                    onChange={handleChange}
                  />
                  <span className={styles.hint}>Lirik akan ditampilkan di platform yang mendukung (Apple Music, Spotify, dll)</span>
                </div>
              )}

              {/* Description */}
              <div className={styles.fieldFull}>
                <label className={styles.label}>Deskripsi / Catatan</label>
                <textarea
                  className={styles.textarea}
                  name="description"
                  value={form.description}
                  placeholder="Cerita di balik lagu, inspirasi, catatan khusus untuk tim..."
                  rows={4}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {/* ── Navigation ── */}
          <div className={styles.navRow}>
            {step > 0 && (
              <button type="button" className={styles.btnBack} onClick={() => setStep((s) => s - 1)}>
                ← Kembali
              </button>
            )}
            <div className={styles.navSpacer} />
            {step < STEPS.length - 1 ? (
              <button
                type="button"
                className={styles.btnNext}
                onClick={() => setStep((s) => s + 1)}
                disabled={!canNext()}
              >
                Lanjut →
              </button>
            ) : (
              <button type="submit" className={styles.btnSubmit} disabled={!canNext()}>
                ✓ Upload Sekarang
              </button>
            )}
          </div>

        </form>
      </div>
    </div>
  );
}