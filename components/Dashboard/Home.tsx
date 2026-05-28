import { useAuth, useTheme } from '@/hooks'
import { db } from '@/lib/firebase';
import { Datas } from '@/types';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import styles from '../css/Home.module.css'
import { collection, getDocs } from "firebase/firestore";
type ActivityType = {
  text: string;
  time: string;
  icon: string;
};

type TrackType = {
  rank: number;
  title: string;
  artist: string;

  coverUrl: string
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
export default function Home() {
  const { user } = useAuth()
  const router = useRouter()
  const [verifikasi, setVerifikasi] = useState<boolean | null>(null)
  const { ThemeHelper } = useTheme()
  const [activities, setActivities] = useState<ActivityType[]>([]);
  const [topTracks, setTopTracks] = useState<TrackType[]>([]);
  const [stats, setStats] = useState<StatType[]>([]);
  const [platforms, setPlatforms] = useState<PlatformType[]>([]);
  const [
    withdrawActivities,
    setWithdrawActivities,
  ] = useState<WithdrawActivityType[]>(
    []
  );

  useEffect(() => {
    const fetchWithdraws = async () => {
      if (!user) return;

      try {
        const wdRef = collection(
          db,
          "balances",
          user.uid,
          "withdraw_history"
        );

        const snapshot = await getDocs(
          wdRef
        );

        const data = snapshot.docs
          .map((doc) => {
            const wd = doc.data();

            return {
              text: `Withdraw Rp ${Number(
                wd.amount
              ).toLocaleString("id-ID")} berhasil`,

              time: wd.createdAt
                ?.toDate()
                ?.toLocaleDateString("id-ID"),

              icon: "💸",

              status: wd.status,
            };
          })

          // FILTER APPROVED
          .filter(
            (item) =>
              item.status === "approved"
          );

        setWithdrawActivities(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchWithdraws();
  }, [user]);

  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      // MUSIC
      const musicRef = collection(db, "users", user.uid, "music");
      const musicSnap = await getDocs(musicRef);

      // BALANCE
      const balanceRef = doc(
        db,
        "balances",
        user.uid
      );

      const balanceSnap =
        await getDoc(balanceRef);

      // USER DOC
      const userRef = doc(
        db,
        "users",
        user.uid
      );

      const userSnap =
        await getDoc(userRef);

      const userData =
        userSnap.data();

      // TOTAL BALANCE
      const totalBalance =
        balanceSnap.data()?.saldo || 0;


      const dashboardStats = [
        {
          label: "Total Streams",
          value: userData?.totalStreams.toLocaleString("id-ID"),
          change: "+18%",
        },

        {
          label: "Pendapatan",
          value: `Rp ${totalBalance.toLocaleString("id-ID")}`,
          change: "+9%",
        },

        {
          label: "Rilis Aktif",
          value: `${musicSnap.size}`,
          change: "3 baru",
        },

        {
          label: "Platform",
          value: `${userData?.platforms || 0}`,
          change: "aktif",
        },
      ];

      setStats(dashboardStats);
    };

    fetchStats();
  }, [user]);

  useEffect(() => {
    const fetchTracks = async () => {
      if (!user) return;

      const postsRef = collection(db, "users", user.uid, "music");

      const snapshot = await getDocs(postsRef);

      const data = snapshot.docs.map((doc, index) => {
        const music = doc.data();

        return {
  rank: index + 1,
          title: music.title,
          artist: music.artist,
        coverUrl: doc.data().files.coverUrl,
        };
      });

      setTopTracks(data);
    };

    fetchTracks();
  }, [user]);

  useEffect(() => {
    const fetchPosts = async () => {
      if (!user) return;

      const postsRef = collection(db, "users", user.uid, "music");

      const snapshot = await getDocs(postsRef);

      const today = new Date();

      const data = snapshot.docs
        .map((doc) => {
          const music = doc.data();

          return {
            text: `${music.title} - ${music.artist}`,
            time: new Date(music.uploadedAt),
            icon: "🎵",
          };
        })

        .filter((item) => {
          const date = item.time;

          return (
            date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear()
          );
        })

        .map((item) => ({
          ...item,
          time: item.time.toLocaleDateString("id-ID"),
        }));

      setActivities(data);
    };

    fetchPosts();
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


  useEffect(() => {
    const fetchPlatforms = async () => {
      if (!user) return;

      const userRef = doc(db, "users", user.uid);

      const snapshot = await getDoc(userRef);

      const data = snapshot.data();

      const platformData = [
        {
          name: "spotify",
          pct: Number(data?.spotify || 0),
        },

        {
          name: "youTube",
          pct: Number(data?.youtube || 0),
        },
      ];

      setPlatforms(platformData);
    };

    fetchPlatforms();
  }, [user]);





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
          </div>

        </div>

        {/* Activities */}
        <div className={styles.activityCard}>
          <div className={styles.cardHeader}>
            <h2 className={styles.cardTitle}> Rilis Terbaru</h2>
          </div>
          {activities.map((activity, idx) => (
            <div key={idx} className={styles.activityRow}>
              <div className={styles.activityIcon}>{activity.icon}</div>
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