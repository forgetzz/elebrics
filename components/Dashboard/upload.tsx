"use client";

import { useAuth, useTheme } from "@/hooks";
import { db } from "@/lib/firebase";
import { addDoc, arrayUnion, collection, doc, setDoc, updateDoc } from "firebase/firestore";
import React, { useState, useRef } from "react";
import styles from "../css/Upload.module.css"
import clsx from "clsx";

interface MusicMetadata {

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

type FormState = {
  title: string; artist: string; featuredArtist: string; releaseType: string;
  albumName?: string; trackNumber: string; genre: string; subGenre: string;
  language: string; releaseDate: string; composer: string; lyricist: string;
  arranger: string; producer: string; recordingEngineer: string;
  mixingEngineer: string; masteringEngineer: string; label: string;
  publisher: string; copyright: string; isrc: string; upc: string;
  isExplicit: boolean; isInstrumental: boolean; bpm: string; key: string;
  lyrics: string; description: string;
};

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

// ─── PINATA UPLOAD ─────────────────────────────────────────────────────────
async function uploadToPinata(
  file: File
): Promise<{ url: string }> {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/upload", {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Upload gagal");
  }

  return await res.json();
}

async function saveToFirestore(metadata: MusicMetadata): Promise<string> {


  await new Promise((r) => setTimeout(r, 600));
  console.log("FIRESTORE PAYLOAD:", metadata);
  return `doc_${Date.now()}`;
}


export default function UploadMusic() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<FormState>(initialForm);
  const [audio, setAudio] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [coverPreview, setCoverPreview] = useState<string | null>(null);
  const [audioName, setAudioName] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadPhase, setUploadPhase] = useState("");
  const [audioProgress, setAudioProgress] = useState(0);
  const [coverProgress, setCoverProgress] = useState(0);
  const [firestoreProgress, setFirestoreProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{ docId: string; metadata: MusicMetadata } | null>(null);
  const { user } = useAuth()
  const { ThemeHelper } = useTheme()
  const audioRef = useRef<HTMLInputElement>(null);
  const coverRef = useRef<HTMLInputElement>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((p) => ({ ...p, [name]: value }));
  };
  const handleCheck = (name: keyof FormState) =>
    setForm((p) => ({ ...p, [name]: !p[name] }));
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

  const canNext = () => {
    if (step === 0) return form.title && form.artist && form.genre && form.releaseDate && form.releaseType;
    if (step === 1) return !!form.composer;
    if (step === 2) return !!form.copyright;
    if (step === 3) return !!(audio && cover);
    return true;
  };

  // ── SUBMIT ──────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!audio || !cover) {
      setError("File audio dan cover wajib diupload.");
      return;
    }
    setError(null);
    setUploading(true);

    try {
      // 1. Upload audio ke Pinata
      setUploadPhase("Mengupload audio ke Pinata...");
      setAudioProgress(10);
      const audioResult = await uploadToPinata(audio);

      setAudioProgress(100);

      // 2. Upload cover ke Pinata
      setUploadPhase("Mengupload cover artwork ke Pinata...");
      setCoverProgress(10);
      const coverResult = await uploadToPinata(cover);
      setCoverProgress(100);

      // 3. Bangun metadata object
      setUploadPhase("Menyimpan metadata ke Firestore...");
      setFirestoreProgress(30);

      const metadata: MusicMetadata = {
        title: form.title,
        artist: form.artist,
        featuredArtist: form.featuredArtist,
        releaseType: form.releaseType,
        albumName: form.albumName,
        trackNumber: parseInt(form.trackNumber, 10) || 1,
        genre: form.genre,
        subGenre: form.subGenre,
        language: form.language,
        releaseDate: form.releaseDate,
        credits: {
          composer: form.composer,
          lyricist: form.lyricist,
          arranger: form.arranger,
          producer: form.producer,
          recordingEngineer: form.recordingEngineer,
          mixingEngineer: form.mixingEngineer,
          masteringEngineer: form.masteringEngineer,
        },
        rights: {
          label: form.label,
          publisher: form.publisher,
          copyright: form.copyright,
          isrc: form.isrc,
          upc: form.upc,
        },
        content: {
          isExplicit: form.isExplicit,
          isInstrumental: form.isInstrumental,
          bpm: form.bpm ? parseInt(form.bpm, 10) : null,
          key: form.key,
          lyrics: form.lyrics,
          description: form.description,
        },
        files: {
          audioCid: audioResult.url,
          audioUrl: audioResult.url,
          audioFileName: audio.name,
          coverCid: coverResult.url,
          coverUrl: coverResult.url,
          coverFileName: cover.name,
        },
        status: "processing",
        uploadedAt: new Date().toISOString(),
      };
      if (!user) return
      // 4. Simpan ke Firestore
      setFirestoreProgress(70);
      addDoc(
        collection(db, "users", user.uid, "music"),
        metadata
      );
      const docId = await saveToFirestore(metadata);
      setResult({ docId, metadata });
      setFirestoreProgress(100);


    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Terjadi kesalahan tidak diketahui.");
    } finally {
      setUploading(false);
      setUploadPhase("");
    }
  };

  // ── SUCCESS SCREEN ───────────────────────────────────────────────────────
  if (result) {
    const m = result.metadata;
    return (
      <div style={s.page}>
        <div style={s.successCard}>
          <div style={s.successIcon}>✓</div>
          <h2 style={s.successTitle}>Upload Berhasil!</h2>
          <p style={s.successSub}>
            <strong>{m.title}</strong> oleh <strong>{m.artist}</strong> sedang diproses.
          </p>

          {/* <div style={s.metaBlock}>
            <h3 style={s.metaBlockTitle}>Firestore Document ID</h3>
            <code style={s.code}>{result.docId}</code>
          </div> */}

          {/* <div style={s.metaBlock}>
            <h3 style={s.metaBlockTitle}>IPFS — Audio</h3>
            <a href={m.files.audioUrl} target="_blank" rel="noreferrer" style={s.link}>
              {m.files.audioCid}
            </a>
          </div>

          <div style={s.metaBlock}>
            <h3 style={s.metaBlockTitle}>IPFS — Cover</h3>
            <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
              <img src={m.files.coverUrl} alt="cover" style={s.coverThumb} />
              <a href={m.files.coverUrl} target="_blank" rel="noreferrer" style={s.link}>
                {m.files.coverCid}
              </a>
            </div>
          </div> */}

          {/* <div style={s.metaBlock}>
            <h3 style={s.metaBlockTitle}>Metadata Object</h3>
            <pre style={s.pre}>{JSON.stringify(m, null, 2)}</pre>
          </div> */}

          <button
            style={s.btnSubmit}
            onClick={() => {
              setResult(null); setStep(0); setForm(initialForm);
              setAudio(null); setCover(null); setCoverPreview(null); setAudioName("");
              setAudioProgress(0); setCoverProgress(0); setFirestoreProgress(0);
            }}
          >
            Upload Lagi
          </button>
        </div>
      </div>
    );
  }

  // ── UPLOADING OVERLAY ────────────────────────────────────────────────────
  if (uploading) {
    return (
      <div className={styles.page}>
        <div className={styles.uploadingCard}>
          <div className={styles.spinner} />

          <h2 className={styles.uploadingTitle}>
            Sedang Upload...
          </h2>

          <p className={styles.uploadingPhase}>
            {uploadPhase}
          </p>

          <ProgressBar
            label="Audio → Pinata IPFS"
            value={audioProgress}
          />

          <ProgressBar
            label="Cover → Pinata IPFS"
            value={coverProgress}
          />

          <ProgressBar
            label="Metadata → Firestore"
            value={firestoreProgress}
          />
        </div>
      </div>
    );
  }

  // ── MAIN FORM ────────────────────────────────────────────────────────────
  return (
    <div className={styles.page}>
      <div className={styles.wrapper}>
        {/* Header */}
        <div className={styles.pageHeader}>
          <span className={styles.pageLabel}>
            Dashboard Artis
          </span>

          <h1
            className={clsx(
              styles.pageTitle,
              ThemeHelper.TextColor
            )}
          >Upload Musik</h1>
          <p className={styles.pageSub}>
            Lengkapi metadata · File diupload ke Pinata IPFS · Tersimpan otomatis ke Firestore
          </p>
        </div>

        {/* Stepper */}
        <div style={s.stepper}>
          {STEPS.map((label, i) => (
            <React.Fragment key={i}>
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                <div style={{
                  ...s.stepCircle,
                  ...(i === step ? s.stepCircleActive : i < step ? s.stepCircleDone : {}),
                }}>
                  {i < step ? "✓" : i + 1}
                </div>
                <span style={{ ...s.stepLabel, ...(i === step ? s.stepLabelActive : {}) }}>
                  {label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div style={{ ...s.stepLine, ...(i < step ? s.stepLineDone : {}) }} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Error */}
        {error && (
          <div style={s.errorBox}>
            <strong>⚠ Error:</strong> {error}
          </div>
        )}

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className={`${styles.formCard} ${ThemeHelper.ThemeBgPrimary}`}
        >

          {/* STEP 0 */}
          {step === 0 && (
            <Section num="01" title="Informasi Dasar" desc="Data utama yang akan tampil di semua platform streaming.">
              <Row>
                <Field label="Judul Lagu" required full>
                  <input style={s.input} name="title" value={form.title} placeholder="e.g. Langit Malam" onChange={handleChange} required />
                </Field>
              </Row>
              <Row>
                <Field label="Nama Artist" required>
                  <input style={s.input} name="artist" value={form.artist} placeholder="Nama artis utama" onChange={handleChange} required />
                </Field>
                <Field label="Featured Artist">
                  <input style={s.input} name="featuredArtist" value={form.featuredArtist} placeholder="ft. Artist (opsional)" onChange={handleChange} />
                </Field>
              </Row>
              <Row>
                <Field label="Tipe Rilis" required>
                  <select style={s.select} name="releaseType" value={form.releaseType} onChange={handleChange}>
                    {RELEASE_TYPES.map((r) => <option key={r}>{r}</option>)}
                  </select>
                </Field>
                {/* <Field label="Nama Album / EP">
                  <input style={s.input} name="albumName" value={form.albumName} placeholder="Kosongkan jika single" onChange={handleChange} />
                </Field> */}
              </Row>
              <Row>
                <Field label="No. Track">
                  <input style={s.input} type="number" name="trackNumber" value={form.trackNumber} min={1} onChange={handleChange} />
                </Field>
                <Field label="Tanggal Rilis" required>
                  <input style={s.input} type="date" name="releaseDate" value={form.releaseDate} onChange={handleChange} required />
                </Field>
              </Row>
              <Row>
                <Field label="Genre" required>
                  <select style={s.select} name="genre" value={form.genre} onChange={handleChange} required>
                    <option value="">Pilih Genre</option>
                    {GENRES.map((g) => <option key={g}>{g}</option>)}
                  </select>
                </Field>
                <Field label="Sub-Genre">
                  <input style={s.input} name="subGenre" value={form.subGenre} placeholder="e.g. Indie Pop" onChange={handleChange} />
                </Field>
              </Row>
              <Row>
                <Field label="Bahasa Lirik" required>
                  <select style={s.select} name="language" value={form.language} onChange={handleChange}>
                    {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
                  </select>
                </Field>
              </Row>
            </Section>
          )}

          {/* STEP 1 */}
          {step === 1 && (
            <Section num="02" title="Credits & Tim Produksi" desc="Berikan kredit yang tepat kepada semua kontributor.">
              <CreditGroup title="Penulisan">
                <Row>
                  <Field label="Composer / Pencipta" required>
                    <input style={s.input} name="composer" value={form.composer} placeholder="Nama pencipta lagu" onChange={handleChange} required />
                  </Field>
                  <Field label="Lyricist / Penulis Lirik">
                    <input style={s.input} name="lyricist" value={form.lyricist} placeholder="Jika berbeda dari composer" onChange={handleChange} />
                  </Field>
                </Row>
                <Row>
                  <Field label="Arranger">
                    <input style={s.input} name="arranger" value={form.arranger} placeholder="Penata musik / aransemen" onChange={handleChange} />
                  </Field>
                </Row>
              </CreditGroup>
              <CreditGroup title="Produksi">
                <Row>
                  <Field label="Producer">
                    <input style={s.input} name="producer" value={form.producer} placeholder="Music producer" onChange={handleChange} />
                  </Field>
                  <Field label="Recording Engineer">
                    <input style={s.input} name="recordingEngineer" value={form.recordingEngineer} placeholder="Sound engineer rekaman" onChange={handleChange} />
                  </Field>
                </Row>
                <Row>
                  <Field label="Mixing Engineer">
                    <input style={s.input} name="mixingEngineer" value={form.mixingEngineer} placeholder="Sound engineer mixing" onChange={handleChange} />
                  </Field>
                  <Field label="Mastering Engineer">
                    <input style={s.input} name="masteringEngineer" value={form.masteringEngineer} placeholder="Sound engineer mastering" onChange={handleChange} />
                  </Field>
                </Row>
              </CreditGroup>
            </Section>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <Section num="03" title="Hak Cipta & Distribusi" desc="Informasi legal yang dibutuhkan untuk distribusi ke platform streaming.">
              <Row>
                <Field label="Label Rekaman">
                  <input style={s.input} name="label" value={form.label} placeholder="Nama label (kosongkan jika indie)" onChange={handleChange} />
                </Field>
                <Field label="Publisher / Penerbit Musik">
                  <input style={s.input} name="publisher" value={form.publisher} placeholder="Publisher hak cipta" onChange={handleChange} />
                </Field>
              </Row>
              <Row>
                <Field label="Copyright" required full>
                  <input style={s.input} name="copyright" value={form.copyright} placeholder="© 2026 Nama Artist / Label. All Rights Reserved." onChange={handleChange} required />
                  <span style={s.hint}>Format standar: © [Tahun] [Nama Pemegang Hak]</span>
                </Field>
              </Row>
              <Row>
                <Field label="ISRC Code">
                  <input style={s.input} name="isrc" value={form.isrc} placeholder="e.g. IDABC2600001" onChange={handleChange} maxLength={12} />
                  <span style={s.hint}>International Standard Recording Code — 12 karakter</span>
                </Field>
                <Field label="UPC / EAN Barcode">
                  <input style={s.input} name="upc" value={form.upc} placeholder="e.g. 012345678901" onChange={handleChange} maxLength={13} />
                  <span style={s.hint}>Untuk rilis album/EP (opsional untuk single)</span>
                </Field>
              </Row>
              {/* <div style={s.infoBox}>
                <span style={{ fontSize: 18, marginRight: 10 }}>ℹ</span>
                <p style={{ margin: 0, fontSize: 13, lineHeight: 1.5 }}>
                  ISRC dan UPC bisa digenerate otomatis jika kosong. File audio & cover akan diupload ke
                  <strong> Pinata IPFS</strong>, lalu URL & CID-nya disimpan ke <strong>Firestore</strong>.
                </p>
              </div> */}
            </Section>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <Section num="04" title="Konten & File Upload" desc="Upload file audio berkualitas tinggi dan artwork sesuai standar DSP.">
              {/* Flags */}
              <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
                {(["isExplicit", "isInstrumental"] as const).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => handleCheck(key)}
                    style={{ ...s.flagBtn, ...(form[key] ? s.flagBtnActive : {}) }}
                  >
                    <span>{key === "isExplicit" ? "🔞 Explicit" : "🎼 Instrumental"}</span>
                    {form[key] && <span style={{ marginLeft: 6 }}>✓</span>}
                  </button>
                ))}
              </div>

              <Row>
                <Field label="BPM (Tempo)">
                  <input style={s.input} type="number" name="bpm" value={form.bpm} placeholder="e.g. 120" min={40} max={300} onChange={handleChange} />
                </Field>
                <Field label="Kunci Nada">
                  <select style={s.select} name="key" value={form.key} onChange={handleChange}>
                    <option value="">Pilih Key</option>
                    {MUSICAL_KEYS.map((k) => <option key={k}>{k}</option>)}
                  </select>
                </Field>
              </Row>

              {/* Audio Drop */}
              <div style={s.uploadBlock}>
                <div style={s.uploadLabel}>File Audio <span style={{ color: "#e74c3c" }}>*</span></div>
                <div style={s.uploadSpec}>WAV 24-bit / 44.1kHz · MP3 320kbps · FLAC</div>
                <div style={{ ...s.dropZone, ...(audioName ? s.dropZoneFilled : {}) }} onClick={() => audioRef.current?.click()}>
                  <input
                    ref={audioRef}
                    type="file"
                    accept=".wav,.mp3,.flac,.aiff"
                    onChange={handleAudio}
                    style={s.hiddenInput}
                  />
                  {audioName
                    ? <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "0 20px" }}>
                      <span style={{ fontSize: 28 }}>🎵</span>
                      <span style={{ fontWeight: 600, fontSize: 14, wordBreak: "break-all" }}>{audioName}</span>
                    </div>
                    : <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "#94a3b8" }}>
                      <span style={{ fontSize: 36 }}>♪</span>
                      <span style={{ fontSize: 14 }}>Klik atau drag file audio ke sini</span>
                    </div>
                  }
                </div>
              </div>

              {/* Cover Drop */}
              <div style={s.uploadBlock}>
                <div style={s.uploadLabel}>Cover Artwork <span style={{ color: "#e74c3c" }}>*</span></div>
                <div style={s.uploadSpec}>JPG / PNG · Min 3000×3000px · Maks 10MB</div>
                <div style={{ display: "flex", gap: 20, alignItems: "flex-start" }}>
                  <div
                    style={{ ...s.coverDropZone, ...(coverPreview ? s.coverDropZoneFilled : {}) }}
                    onClick={() => coverRef.current?.click()}
                  >
                    <input
                      ref={coverRef}
                      type="file"
                      accept="image/*"
                      onChange={handleCover}
                      style={s.hiddenInput}
                    />
                    {coverPreview
                      ? <img src={coverPreview} alt="cover" style={s.coverPreviewImg} />
                      : <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: "#94a3b8" }}>
                        <span style={{ fontSize: 32 }}>🖼</span>
                        <span style={{ fontSize: 13 }}>Upload Cover</span>
                      </div>
                    }
                  </div>
                  <ul style={s.coverHints}>
                    <li>Resolusi minimum 3000×3000 pixel</li>
                    <li>Format JPG atau PNG</li>
                    <li>Tidak boleh ada teks "free", "download", atau URL</li>
                    <li>Tidak boleh ada logo platform lain</li>
                    <li>Kamu harus memiliki hak atas gambar ini</li>
                  </ul>
                </div>
              </div>

              {!form.isInstrumental && (
                <Field label="Lirik Lagu" full>
                  <textarea style={{ ...s.input, ...s.textarea }} name="lyrics" value={form.lyrics} placeholder="Masukkan lirik lengkap di sini..." rows={10} onChange={handleChange} />
                  <span style={s.hint}>Lirik akan ditampilkan di platform yang mendukung (Apple Music, Spotify, dll)</span>
                </Field>
              )}

              <Field label="Deskripsi / Catatan" full>
                <textarea style={{ ...s.input, ...s.textarea }} name="description" value={form.description} placeholder="Cerita di balik lagu, inspirasi, catatan khusus untuk tim..." rows={5} onChange={handleChange} />
              </Field>
            </Section>
          )}

          {/* Navigation */}
          <div style={s.navRow}>
            {step > 0 && (
              <button type="button" style={s.btnBack} onClick={() => setStep((p) => p - 1)}>← Kembali</button>
            )}
            <div style={{ flex: 1 }} />
            {step < STEPS.length - 1
              ? <button type="button" style={{ ...s.btnNext, ...(canNext() ? {} : s.btnDisabled) }} onClick={() => setStep((p) => p + 1)} disabled={!canNext()}>Lanjut →</button>
              : <button type="submit" style={{ ...s.btnSubmit, ...(canNext() ? {} : s.btnDisabled) }} disabled={!canNext()}>☁ Upload Sekarang</button>
            }
          </div>
        </form>
      </div>
    </div>
  );
}

// ─── HELPER COMPONENTS ────────────────────────────────────────────────────
function Section({ num, title, desc, children }: { num: string; title: string; desc: string; children: React.ReactNode }) {

  const { ThemeHelper} = useTheme()
  return (
    <div className={`${styles.section} ${ThemeHelper.ThemeBgPrimary}`}>
      <h2 className={styles.sectionTitle}>
        <span style={s.sectionNum}>{num}</span> {title}
      </h2>
      <p style={s.sectionDesc}>{desc}</p>
      {children}
    </div>
  );
}

function CreditGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={s.creditGroup}>
      <h3 style={s.creditGroupTitle}>{title}</h3>
      {children}
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return <div style={s.row}>{children}</div>;
}

function Field({ label, required, full, children }: { label: string; required?: boolean; full?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ ...(full ? s.fieldFull : s.field) }}>
      <label style={s.label}>{label}{required && <span style={{ color: "#e74c3c", marginLeft: 3 }}>*</span>}</label>
      {children}
    </div>
  );
}

function ProgressBar({ label, value }: { label: string; value: number }) {
  return (
    <div style={{ marginBottom: 16, width: "100%" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
        <span style={{ fontSize: 13, color: "#cbd5e1" }}>{label}</span>
        <span style={{ fontSize: 13, fontWeight: 700, color: value === 100 ? "#4ade80" : "#f8fafc" }}>{value}%</span>
      </div>
      <div style={{ height: 6, borderRadius: 99, background: "#1e293b", overflow: "hidden" }}>
        <div style={{
          height: "100%", borderRadius: 99,
          background: value === 100 ? "#4ade80" : "linear-gradient(90deg,#6366f1,#a855f7)",
          width: `${value}%`,
          transition: "width 0.4s ease",
        }} />
      </div>
    </div>
  );
}

// ─── STYLES ───────────────────────────────────────────────────────────────
const s: Record<string, React.CSSProperties> = {
  page: {
    minHeight: "100vh",
    display: "flex", justifyContent: "center", alignItems: "flex-start",
    padding: "40px 16px 80px",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  wrapper: { width: "100%", maxWidth: 760 },
  pageHeader: { marginBottom: 36, textAlign: "center" },
  pageLabel: { fontSize: 11, letterSpacing: 3, textTransform: "uppercase", color: "#6366f1", fontWeight: 700 },
  pageTitle: { margin: "8px 0 4px", fontSize: 34, fontWeight: 800, },
  pageSub: { fontSize: 15, color: "#64748b", margin: 0 },

  // Stepper
  stepper: { display: "flex", alignItems: "center", marginBottom: 32, gap: 0 },
  stepCircle: {
    width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center",
    justifyContent: "center", fontSize: 14, fontWeight: 700, border: "2px solid #1e293b",
    background: "#0f172a", color: "#475569", flexShrink: 0,
  },
  stepCircleActive: { border: "2px solid #6366f1", color: "#6366f1", background: "#0f172a" },
  stepCircleDone: { background: "#6366f1", border: "2px solid #6366f1", color: "#fff" },
  stepLabel: { fontSize: 11, color: "#475569", textAlign: "center" as const, maxWidth: 70 },
  stepLabelActive: { color: "#6366f1", fontWeight: 700 },
  stepLine: { flex: 1, height: 2, background: "#1e293b", margin: "0 4px", marginBottom: 20 },
  stepLineDone: { background: "#6366f1" },

  // Card / Form
  card: { background: "#0f172a", borderRadius: 16, border: "1px solid #1e293b", overflow: "hidden" },
  section: { padding: "32px 32px 8px" },
  sectionTitle: { display: "flex", alignItems: "center", gap: 12, fontSize: 20, fontWeight: 800, color: "#f8fafc", margin: "0 0 4px" },
  sectionNum: { fontSize: 12, fontWeight: 800, color: "#6366f1", letterSpacing: 1 },
  sectionDesc: { fontSize: 13, color: "#475569", marginBottom: 28, marginTop: 4 },

  // Layout
  row: { display: "flex", gap: 16, marginBottom: 20, flexWrap: "wrap" as const },
  field: { flex: 1, minWidth: 200, display: "flex", flexDirection: "column" as const, gap: 6 },
  fieldFull: { flex: "0 0 100%", display: "flex", flexDirection: "column" as const, gap: 6 },

  // Fields
  label: { fontSize: 12, fontWeight: 700, color: "#94a3b8", letterSpacing: 0.5, textTransform: "uppercase" as const },
  input: {
    background: "#1e293b", border: "1px solid #334155", borderRadius: 10,
    color: "#f1f5f9", fontSize: 16, padding: "14px 16px",
    outline: "none", width: "100%", boxSizing: "border-box" as const,
    transition: "border-color 0.2s",
  },
  select: {
    background: "#1e293b", border: "1px solid #334155", borderRadius: 10,
    color: "#f1f5f9", fontSize: 16, padding: "14px 16px",
    outline: "none", width: "100%", boxSizing: "border-box" as const,
  },
  textarea: { resize: "vertical" as const, minHeight: 120, fontFamily: "inherit" },
  hint: { fontSize: 11, color: "#475569", marginTop: 2 },

  // Credits
  creditGroup: { background: "#0a0f1e", borderRadius: 10, padding: "20px 20px 4px", marginBottom: 20, border: "1px solid #1e293b" },
  creditGroupTitle: { fontSize: 13, fontWeight: 700, color: "#6366f1", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 16, marginTop: 0 },

  // Upload
  uploadBlock: { marginBottom: 28 },
  uploadLabel: { fontSize: 12, fontWeight: 700, color: "#94a3b8", textTransform: "uppercase" as const, letterSpacing: 0.5, marginBottom: 4 },
  uploadSpec: { fontSize: 11, color: "#475569", marginBottom: 10 },
  dropZone: {
    border: "2px dashed #334155", borderRadius: 12, minHeight: 100,
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", transition: "all 0.2s", background: "#0a0f1e",
  },
  dropZoneFilled: { border: "2px solid #6366f1", background: "#1e293b" },
  coverDropZone: {
    width: 140, height: 140, border: "2px dashed #334155", borderRadius: 12,
    display: "flex", alignItems: "center", justifyContent: "center",
    cursor: "pointer", flexShrink: 0, overflow: "hidden", background: "#0a0f1e",
  },
  coverDropZoneFilled: { border: "2px solid #6366f1" },
  coverPreviewImg: { width: "100%", height: "100%", objectFit: "cover" as const },
  coverHints: { fontSize: 12, color: "#64748b", lineHeight: 1.8, paddingLeft: 18, margin: 0 },
  hiddenInput: { display: "none" },

  // Flags
  flagBtn: {
    display: "flex", alignItems: "center", gap: 8, padding: "10px 18px",
    borderRadius: 10, border: "1px solid #334155", background: "#1e293b",
    color: "#94a3b8", fontSize: 13, fontWeight: 600, cursor: "pointer",
  },
  flagBtnActive: { border: "1px solid #6366f1", color: "#a5b4fc", background: "#1e1b4b" },

  // Nav
  navRow: { display: "flex", alignItems: "center", padding: "24px 32px", borderTop: "1px solid #1e293b" },
  btnBack: {
    padding: "13px 24px", borderRadius: 10, border: "1px solid #334155",
    background: "transparent", color: "#94a3b8", fontSize: 14, fontWeight: 600, cursor: "pointer",
  },
  btnNext: {
    padding: "13px 28px", borderRadius: 10, border: "none",
    background: "linear-gradient(135deg,#6366f1,#a855f7)", color: "#fff",
    fontSize: 14, fontWeight: 700, cursor: "pointer",
  },
  btnSubmit: {
    padding: "13px 28px", borderRadius: 10, border: "none",
    background: "linear-gradient(135deg,#059669,#10b981)", color: "#fff",
    fontSize: 14, fontWeight: 700, cursor: "pointer",
  },
  btnDisabled: { opacity: 0.4, cursor: "not-allowed" },

  // Info box
  infoBox: {
    display: "flex", alignItems: "flex-start", gap: 12, padding: "14px 18px",
    background: "#1e293b", borderRadius: 10, border: "1px solid #2d3f55",
    marginBottom: 20, color: "#94a3b8",
  },

  // Error
  errorBox: {
    background: "#450a0a", border: "1px solid #7f1d1d", borderRadius: 10,
    padding: "12px 16px", color: "#fca5a5", fontSize: 13, marginBottom: 16,
  },

  // Uploading
  uploadingCard: {
    background: "", borderRadius: 20, padding: "48px 40px",
    maxWidth: 480, width: "100%", textAlign: "center" as const,
    border: "1px solid #1e293b",
  },
  spinner: {
    width: 48, height: 48, borderRadius: "50%",
    border: "3px solid #1e293b", borderTop: "3px solid #6366f1",
    animation: "spin 0.8s linear infinite",
    margin: "0 auto 24px",
  },
  uploadingTitle: { color: "#f8fafc", fontSize: 22, fontWeight: 800, margin: "0 0 8px" },
  uploadingPhase: { color: "#64748b", fontSize: 14, marginBottom: 32 },

  // Success
  successCard: {
    background: "#0f172a", borderRadius: 20, padding: "48px 40px",
    maxWidth: 720, width: "100%", border: "1px solid #1e293b",
  },
  successIcon: {
    width: 64, height: 64, borderRadius: "50%",
    background: "linear-gradient(135deg,#059669,#10b981)",
    display: "flex", alignItems: "center", justifyContent: "center",
    fontSize: 28, color: "#fff", margin: "0 0 20px",
  },
  successTitle: { fontSize: 28, fontWeight: 800, color: "#f8fafc", margin: "0 0 8px" },
  successSub: { fontSize: 15, color: "#64748b", margin: "0 0 28px" },
  metaBlock: { marginBottom: 20 },
  metaBlockTitle: { fontSize: 11, fontWeight: 700, color: "#6366f1", textTransform: "uppercase" as const, letterSpacing: 1, marginBottom: 6 },
  code: { background: "#1e293b", padding: "6px 12px", borderRadius: 6, fontSize: 13, color: "#a5b4fc", display: "block" },
  pre: {
    background: "#1e293b", borderRadius: 10, padding: 16, fontSize: 11,
    color: "#94a3b8", overflowX: "auto" as const, maxHeight: 300,
    lineHeight: 1.6, margin: 0,
  },
  link: { color: "#6366f1", fontSize: 12, wordBreak: "break-all" as const },
  coverThumb: { width: 60, height: 60, borderRadius: 6, objectFit: "cover" as const },
};