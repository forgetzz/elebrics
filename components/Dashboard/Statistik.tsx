"use client";
import { BanknoteArrowDown, CircleDollarSign, EarIcon, Music, Music2, Save, Users, Users2 } from "lucide-react";
import styles from "../css/Statistik.module.css"
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ButtonTwo from "../ui/ButtonTwo";
import { Button } from "../ui/Button";



const STATS_BY_PERIOD: Record<string, { streams: string; listeners: string; saves: string; revenue: string; streamChange: number; listenerChange: number }> = {
  "7 Hari": { streams: "3.2K", listeners: "1.8K", saves: "214", revenue: "Rp 28K", streamChange: 12, listenerChange: 8 },
  "30 Hari": { streams: "12.4K", listeners: "6.1K", saves: "870", revenue: "Rp 108K", streamChange: 24, listenerChange: 15 },
  "3 Bulan": { streams: "38.7K", listeners: "14.2K", saves: "2.4K", revenue: "Rp 337K", streamChange: -3, listenerChange: 5 },
  "1 Tahun": { streams: "142K", listeners: "44K", saves: "8.9K", revenue: "Rp 1.2M", streamChange: 67, listenerChange: 42 },
};

const BARS_BY_PERIOD: Record<string, { label: string; val: number; highlight?: boolean }[]> = {
  "7 Hari": [
    { label: "Sen", val: 38 }, { label: "Sel", val: 52 }, { label: "Rab", val: 45 }, { label: "Kam", val: 61 },
    { label: "Jum", val: 80, highlight: true }, { label: "Sab", val: 73 }, { label: "Min", val: 55 },
  ],
  "30 Hari": [
    { label: "M1", val: 55 }, { label: "M2", val: 62 }, { label: "M3", val: 78 }, { label: "M4", val: 90, highlight: true },
  ],
  "3 Bulan": [
    { label: "Jan", val: 60 }, { label: "Feb", val: 75 }, { label: "Mar", val: 90, highlight: true },
  ],
  "1 Tahun": [
    { label: "Jan", val: 30 }, { label: "Feb", val: 38 }, { label: "Mar", val: 42 }, { label: "Apr", val: 50 },
    { label: "Mei", val: 58 }, { label: "Jun", val: 65 }, { label: "Jul", val: 72 }, { label: "Agu", val: 68 },
    { label: "Sep", val: 78 }, { label: "Okt", val: 85 }, { label: "Nov", val: 90, highlight: true }, { label: "Des", val: 88 },
  ],
};

const TOP_TRACKS = [
  { rank: 1, title: "Langit Malam", type: "Single", streams: "4.2K", pct: 100 },
  { rank: 2, title: "Pulang", type: "EP", streams: "3.1K", pct: 74 },
  { rank: 3, title: "Rindu", type: "Single", streams: "2.7K", pct: 64 },
  { rank: 4, title: "Senja Kota", type: "Album", streams: "1.9K", pct: 45 },
  { rank: 5, title: "Mimpi", type: "Single", streams: "1.2K", pct: 29 },
];

const PLATFORMS = [
  { name: "Spotify", pct: 48, color: "#1DB954" },
  { name: "YouTube", pct: 18, color: "#FF0000" },
];




export default function StatistikPage() {
  const [period, setPeriod] = useState("30 Hari");
  const stats = STATS_BY_PERIOD[period];
  const bars = BARS_BY_PERIOD[period];
  const router = useRouter()



  const wd = () => {
    router.push("/Withdraw")
  }


  return (
    <div className={styles.stRoot}>
      <div className={styles.stHeader}>
        <h1 className={styles.stTitle}>Statistik</h1>
        <p className={styles.stSub}>
          Pantau performa musik kamu di semua platform.
        </p>
      </div>



      {/* Stat cards */}
      <div className={styles.stCards}>
        <div className={styles.stCard}>
          <div className={styles.stCardIcon}><Music2 size={30} /></div>
          <div className={styles.stCardLabel}>Total Streams</div>
          <div className={styles.stCardVal}>{stats.streams}</div>

          <div
            className={`${styles.stCardChange} ${stats.streamChange >= 0
                ? styles.up
                : styles.down
              }`}
          />
        </div>

        <div className={styles.stCard}>
          <div className={styles.stCardIcon}><Users2 size={30} /></div>
          <div className={styles.stCardLabel}>Pendengar</div>
          <div className={styles.stCardVal}>{stats.listeners}</div>

          <div
            className={`${styles.stCardChange} ${stats.listenerChange >= 0
                ? styles.up
                : styles.down
              }`}
          />
        </div>

        <div className={styles.stCard}>
          <div className={styles.stCardIcon}><Save /></div>
          <div className={styles.stCardLabel}>Disimpan</div>
          <div className={styles.stCardVal}>{stats.saves}</div>
        </div>

        <div className={styles.stCard}>
          <div className={styles.stCardIcon}> <BanknoteArrowDown size={30} /> </div>
          <div className={styles.stCardLabel}>Est. Royalti</div>
          <div className={styles.stCardVal}>{stats.revenue}</div>
          <div className="w-[10%] " >
            <Button textBtn="Withdraw" func={() => wd()}  />

          </div>
        </div>
      </div>

      {/* Bar chart */}
      {/* <div className={styles.stChartCard}>
    <div className={styles.stChartTitle}>
      Streams — {period}
    </div>

    <div className={styles.stBarChart}>
      {bars.map((b, i) => (
        <div key={i} className={styles.stBarCol}>
          <div
            className={`${styles.stBar} ${
              b.highlight ? styles.highlight : ""
            }`}
            style={{
              height: `${(b.val / maxBar) * 100}%`,
            }}
          />

          <span className={styles.stBarLabel}>
            {b.label}
          </span>
        </div>
      ))}
    </div>
  </div> */}

      {/* Top tracks */}
      <div className={styles.stTracksCard}>
        <div className={styles.stTracksTitle}>
          Top Lagu
        </div>

        {TOP_TRACKS.map((tr) => (
          <div
            key={tr.rank}
            className={styles.stTrackItem}
          >
            <span
              className={`${styles.stTrackRank} ${tr.rank <= 3 ? styles.top : ""
                }`}
            >
              {tr.rank}
            </span>

            <div className={styles.stTrackThumb}>
              <Music size={30} />
            </div>

            <div className={styles.stTrackInfo}>
              <div className={styles.stTrackName}>
                {tr.title}
              </div>

              <div className={styles.stTrackMeta}>
                {tr.type}
              </div>

              <div className={styles.stTrackBarWrap}>
                <div
                  className={styles.stTrackBarFill}
                  style={{ width: `${tr.pct}%` }}
                />
              </div>
            </div>

            <div className={styles.stTrackStreams}>
              {tr.streams}
            </div>
          </div>
        ))}
      </div>

      {/* Platform breakdown */}
      <div className={styles.stPlatformCard}>
        <div className={styles.stPlatformTitle}>
          Distribusi Platform
        </div>

        {PLATFORMS.map((pl) => (
          <div
            key={pl.name}
            className={styles.stPlatformItem}
          >
            <div
              className={styles.stPlatformDot}
              style={{ background: pl.color }}
            />

            <div className={styles.stPlatformName}>
              {pl.name}
            </div>

            <div
              className={styles.stPlatformBarWrap}
            >
              <div
                className={styles.stPlatformBarFill}
                style={{
                  width: `${pl.pct}%`,
                  background: pl.color,
                }}
              />
            </div>

            <div className={styles.stPlatformPct}>
              {pl.pct}%
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}