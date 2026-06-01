import { useAuth, useTheme } from '@/hooks'
import { db } from '@/lib/firebase';
import { ActivityType, Datas, PlatformType, StatType, TrackType, WithdrawActivityType } from '@/types';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import styles from '../css/Home.module.css'
import { collection, getDocs } from "firebase/firestore";


export default function Home() {
  const { user } = useAuth()
  const router = useRouter()
  const [verifikasi, setVerifikasi] = useState<boolean | null>(null)
  const { ThemeHelper } = useTheme()
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [topTracks, setTopTracks] = useState<TrackType[]>([]);
  const [stats, setStats] = useState<StatType[]>([]);
  const [platforms, setPlatforms] = useState<PlatformType[]>([]);
  const [trendingSong, setTrendingSong] = useState<string[]>([])
  const [
    withdrawActivities,
    setWithdrawActivities,
  ] = useState<WithdrawActivityType[]>(
    []
  );

  useEffect(() => {
    if (!user) return;

    const fetchDashboard = async () => {
      try {
        const userRef = doc(db, "users", user.uid);
        const balanceRef = doc(db, "balances", user.uid);
        const musicRef = collection(
          db,
          "users",
          user.uid,
          "music"
        );

        const withdrawRef = collection(
          db,
          "balances",
          user.uid,
          "withdraw_history"
        );

        const [
          userSnap,
          balanceSnap,
          musicSnap,
          withdrawSnap,
        ] = await Promise.all([
          getDoc(userRef),
          getDoc(balanceRef),
          getDocs(musicRef),
          getDocs(withdrawRef),
        ]);

        const userData = userSnap.data();
        console.log(userSnap.data())
        if (!userData) return
        const balanceData = balanceSnap.data();

        // ======================
        // STATS
        // ======================

        setStats([
          {
            label: "Total Katalog",
            value: `${musicSnap.size || 0}`,
            change: "+18%",
          },
          {
            label: "Pendapatan",
            value: `Rp ${(balanceData?.saldo || 0)
              .toLocaleString("id-ID")}`,
            change: "+9%",
          },
          {
            label: "Rilis Aktif",
            value: `${musicSnap.size || 0}`,
            change: "3 baru",
          },
          {
            label: "reject",
            value: `${userData.reject || 0}`,
            change: "aktif",
          },
        ]);

        // ======================
        // TRENDING SONG
        // ======================

        setTrendingSong(
          userData?.trendingSong || []
        );

        // ======================
        // PLATFORM
        // ======================

        setPlatforms([
          {
            name: "Spotify,iTunes,YouTube,Tiktok,Tidal, DLL.",
            pct: Number(
              userData?.totalPlatfrom || 0
            ),
          },
        ]);

        // ======================
        // TRACKS
        // ======================

        const tracks = musicSnap.docs.map(
          (doc, index) => {
            const music = doc.data();

            return {
              rank: index + 1,
              title: music.title,
              artist: music.artist,
              coverUrl:
                music.files?.coverUrl,
            };
          }
        );

        setTopTracks(tracks);

        // ======================
        // TODAY ACTIVITIES
        // ======================

        const today = new Date();

        const activitiesData =
          musicSnap.docs
            .map((doc) => {
              const music = doc.data();

              return {
                text: `${music.title} - ${music.artist}`,
                time: new Date(
                  music.uploadedAt
                ),
                icon: "🎵",
              };
            })
            .filter((item) => {
              const date = item.time;

              return (
                date.getDate() ===
                today.getDate() &&
                date.getMonth() ===
                today.getMonth() &&
                date.getFullYear() ===
                today.getFullYear()
              );
            })
            .map((item) => ({
              ...item,
              time:
                item.time.toLocaleDateString(
                  "id-ID"
                ),
            }));

        setActivities(
          activitiesData as ActivityType[]
        );

        // ======================
        // WITHDRAW
        // ======================

        const withdrawData =
          withdrawSnap.docs
            .map((doc) => {
              const wd = doc.data();

              return {
                text: `Withdraw Rp ${Number(
                  wd.amount
                ).toLocaleString(
                  "id-ID"
                )} berhasil`,
                time:
                  wd.createdAt
                    ?.toDate()
                    ?.toLocaleDateString(
                      "id-ID"
                    ),
                icon: "💸",
                status: wd.status,
              };
            })
            .filter(
              (item) =>
                item.status ===
                "approved"
            );

        setWithdrawActivities(
          withdrawData
        );
      } catch (err) {
        console.log(err);
      }
    };

    fetchDashboard();
  }, [user]);


  useEffect(() => {
    if (!user) return;

    const unsub = onSnapshot(doc(db, "users", user.uid), (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as Datas;
        setVerifikasi(data.verifikasi);
      }
    });

    return () => unsub();
  }, [user]);


  useEffect(() => {
    if (verifikasi === false) router.replace("../Verifikasi");
  }, [verifikasi]);






  console.log(ThemeHelper.TextColor)
  return (
    <div className={`${styles.page}  ${ThemeHelper.ThemeBgPrimary}`}>

      {/* Header */}
      <header className={styles.header}>
        <div className={styles.headerInner}>
          <img className='w-[8%]' src="/logo/logo1.png" alt="" />
          <div className={`${styles.logo} ${ThemeHelper.TextColor}`}>
            ELBIRC MUSIC DASHBOARD
          </div>

        </div>
      </header>

      {/* Main */}
      <main className={`${styles.main}  ${ThemeHelper.ThemeBgPrimary}`}>

        {/* Welcome */}
        {/* <div className={`${styles.welcome} ${ThemeHelper.TextColor}` }>
          <h1 className={styles.welcomeTitle}>Selamat datang kembali! 👋</h1>
       
          <div className={styles.headerUser}>
           
            <div className={styles.avatar}>
              {user?.email?.slice(0, 1).toUpperCase()}
            </div>
             <span className={styles.headerEmail}>{user?.email ?? 'Pengguna'}</span>
          </div>
        </div> */}

        {/* Stats */}
        <div className={styles.statsGrid}>
          {stats.map((stat) => (
            <div key={stat.label} className={styles.statCard}>

              <div className={styles.statTop}>
                {/* <div className={styles.iconWrap}>
          {stat.icon}
        </div> */}

                {/* optional badge */}
                {/* <span className={styles.badge}>+12%</span> */}
              </div>

              <div className={styles.statContent}>
                <p className={styles.statLabel}>{stat.label}</p>
                <h2 className={styles.statValue}>{stat.value}</h2>

                {/* optional */}
                {/* <span className={styles.statChange}>
          ↑ {stat.change}
        </span> */}
              </div>
            </div>
          ))}
        </div>

        {/* Two Columns */}
        <div className={styles.twoCol}>

          {/* Top Tracks */}
          <div className={styles.card}>
            <div className={styles.cardHeader}>
              <h2 className={styles.cardTitle}>Lagu Anda</h2>
              <span className={styles.songCount}>
                {topTracks.length} Lagu
              </span>
            </div>

            <div className={styles.trackList}>
              {topTracks.map((track) => (
                <div key={track.rank} className={styles.trackRow}>


                  <div className={styles.trackImageWrapper}>
                    <img
                      src={track.coverUrl}
                      alt={track.title}
                      className={styles.trackImage}
                    />

                    {/* <div className={styles.playOverlay}>
                      ▶
                    </div> */}
                  </div>

                  <div className={styles.trackInfo}>
                    <div className={styles.trackTitle}>
                      {track.title}
                    </div>

                    <div className={styles.trackArtist}>
                      {track.artist}
                    </div>
                  </div>

                  {/* Optional duration / plays */}
                  {/* <div className={styles.trackMeta}>
          {track.plays}
        </div> */}
                </div>
              ))}
            </div>
          </div>

          {/* Platform Distribution */}
          <div className={styles.platformCard}>
            <div className={styles.cardHeader} style={{ padding: '1.25rem 0 1rem', marginBottom: '1rem', borderBottom: '1px solid #e5e7eb' }}>
              <h2 className={styles.cardTitle}>🌐 Distribusi Platform</h2>
            </div>
            {platforms.map((platform) => (
              <div key={platform.name} className={styles.platformItem}>
                <div className={styles.platformMeta}>
                  <span className={styles.platformName}>{platform.name}</span>
                  <span className={styles.platformPct}>{platform.pct}%</span>
                </div>
                <div className={styles.platformTrack}>
                  <div className={styles.platformFill} style={{ width: `${platform.pct}%` }} />
                </div>
              </div>
            ))}

            <h1 className="text-xl font-bold mb-4">Trending Songs</h1>

            <div className="space-y-3">
              {Array.isArray(trendingSong) &&
                trendingSong.map((item, key) => (
                  <div
                    key={key}
                    className="p-4 rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition"
                  >
                    <p className="font-medium">{item}</p>
                  </div>
                ))}
            </div>
          </div>

        </div>

        {/* Activities */}
        <div className={styles.activityCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}> Rilis Terbaru</h2>
          </div>
          {
            activities && activities.length > 0 ? (
              <>
                {activities.map((activity, idx) => (
                  <div key={idx} className={styles.activityRow}>
                    <div className={styles.activityIcon}>
                      {activity.icon}
                    </div>

                    <div className={styles.activityContent}>
                      <div className={styles.activityText}>
                        {activity.text}
                      </div>

                      <div className={styles.activityTime}>
                        {activity.time}
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <h1 className='text-center mb-20'>TIDAK ADA RILIS TERBARU </h1>
            )
          }
        </div>
        {/* WITHDRAW ACTIVITIES */}

        <div className={styles.activityCard}>

          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}>
              Withdraw History
            </h2>
          </div>

          {withdrawActivities.map(
            (activity, idx) => (
              <div
                key={idx}
                className={styles.activityRow}
              >
                <div
                  className={styles.activityIcon}
                >
                  {activity.icon}
                </div>
                <div className={styles.activityContent}>
                  <div className={styles.activityText}>
                    {activity.text}
                  </div>

                  <div className={styles.activityTime}>
                    {activity.time}
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </main>
    </div>
  )
}