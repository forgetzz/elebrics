import { useAuth } from '@/hooks'
import React from 'react'

export default function Home() {
  const { user } = useAuth()

  const stats = [
    { label: 'Total Streams', value: '2,4 Jt', change: '+18%' },
    { label: 'Pendapatan', value: 'Rp 4,2 Jt', change: '+9%' },
    { label: 'Rilis Aktif', value: '47', change: '3 baru' },
    { label: 'Platform', value: '12', change: 'aktif' },
  ]

  const topTracks = [
    { rank: 1, title: 'Langit Sore', artist: 'Ardian', plays: '482K' },
    { rank: 2, title: 'Rindu yang Tertinggal', artist: 'Mira feat. Dika', plays: '371K' },
    { rank: 3, title: 'Bukan Salah Angin', artist: 'The Wanderers', plays: '284K' },
    { rank: 4, title: 'Malam Minggu Terakhir', artist: 'Rendra Solo', plays: '198K' },
    { rank: 5, title: 'Pulang ke Rumah', artist: 'Sinta & Band', plays: '154K' },
  ]

  const platforms = [
    { name: 'Spotify', pct: 62 },
    { name: 'YouTube', pct: 20 },
    { name: 'TikTok', pct: 11 },
    { name: 'Apple Music', pct: 7 },
  ]

  const activities = [
    { text: 'Rilis Langit Sore berhasil ke 12 platform', time: '2 jam lalu', icon: '✓' },
    { text: 'Pembayaran royalti Rp 1,8 Jt siap dicairkan', time: '5 jam lalu', icon: '💰' },
    { text: 'Masuk playlist editorial Spotify', time: 'Kemarin', icon: '🎵' },
    { text: 'Klaim hak cipta YouTube terdeteksi', time: '2 hari lalu', icon: '⚠️' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#fafafa', fontFamily: "'DM Sans', -apple-system, sans-serif" }}>
      
      {/* Header */}
      <header style={{ background: '#fff', borderBottom: '1px solid #e5e7eb', padding: '1.5rem', position: 'sticky', top: 0, zIndex: 10 }}>
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ fontSize: 24, fontWeight: 700, background: 'linear-gradient(135deg, #d85a30 0%, #f97316 100%)', backgroundClip: 'text', color: 'transparent' }}>
            elbric Music
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 13, color: '#6b7280' }}>
              {user?.email ?? 'Pengguna'}
            </span>
            <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'linear-gradient(135deg, #c4b5fd 0%, #a78bfa 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 14, fontWeight: 600, color: '#fff' }}>
              {user?.email?.slice(0, 1).toUpperCase()}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: 1200, margin: '0 auto', padding: '2rem 1rem' }}>
        
        {/* Welcome Section */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>
            Selamat datang kembali! 👋
          </h1>
          <p style={{ color: '#6b7280', fontSize: 14 }}>
            Lihat performa musik Anda bulan ini
          </p>
        </div>

        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: 1, marginBottom: '2rem', background: '#fff', borderRadius: 12, overflow: 'hidden', border: '1px solid #e5e7eb' }}>
          {stats.map((stat, idx) => (
            <div 
              key={stat.label}
              style={{ 
                padding: '1.5rem', 
                borderRight: idx % 2 === 0 && idx < stats.length - 1 ? '1px solid #e5e7eb' : 'none',
                borderBottom: idx < 2 ? '1px solid #e5e7eb' : 'none',
              }}
            >
              <div style={{ fontSize: 12, color: '#6b7280', marginBottom: '0.5rem', textTransform: 'uppercase', letterSpacing: '0.5px', fontWeight: 600 }}>
                {stat.label}
              </div>
              <div style={{ fontSize: 28, fontWeight: 700, color: '#111827', marginBottom: '0.5rem' }}>
                {stat.value}
              </div>
              <div style={{ fontSize: 12, color: '#16a34a', fontWeight: 500 }}>
                ↑ {stat.change}
              </div>
            </div>
          ))}
        </div>

        {/* Two Column Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 1.5, marginBottom: '2rem' }}>
          
          {/* Top Tracks Card */}
          <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
            <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: 0 }}>
                🎵 Lagu Terpopuler
              </h2>
            </div>
            <div style={{ maxHeight: 400, overflowY: 'auto' }}>
              {topTracks.map((track, idx) => (
                <div 
                  key={track.rank}
                  style={{ 
                    padding: '1rem 1.5rem',
                    borderBottom: idx < topTracks.length - 1 ? '1px solid #f3f4f6' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 12,
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = '#f9fafb'}
                  onMouseLeave={(e) => e.currentTarget.style.background = '#fff'}
                >
                  <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#f3f4f6', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 600, color: '#6b7280', flexShrink: 0 }}>
                    {track.rank}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: '#111827', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {track.title}
                    </div>
                    <div style={{ fontSize: 12, color: '#9ca3af', marginTop: '0.25rem' }}>
                      {track.artist}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right', whiteSpace: 'nowrap', flexShrink: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: '#111827' }}>
                      {track.plays}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            
            {/* Platform Distribution */}
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: '1.5rem' }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: '1rem', margin: '0 0 1rem 0' }}>
                🌐 Distribusi Platform
              </h2>
              {platforms.map((platform) => (
                <div key={platform.name} style={{ marginBottom: '1.25rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: 13 }}>
                    <span style={{ fontWeight: 500, color: '#111827' }}>{platform.name}</span>
                    <span style={{ color: '#6b7280', fontWeight: 600 }}>{platform.pct}%</span>
                  </div>
                  <div style={{ width: '100%', height: 6, background: '#f3f4f6', borderRadius: 99, overflow: 'hidden' }}>
                    <div 
                      style={{ 
                        height: '100%', 
                        width: `${platform.pct}%`, 
                        background: `hsl(${280 + platform.pct}, 70%, 55%)`,
                        borderRadius: 99,
                        transition: 'width 0.3s ease'
                      }} 
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Quick Stats */}
            <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', padding: '1.5rem' }}>
              <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', marginBottom: '1.5rem', margin: '0 0 1.5rem 0' }}>
                📊 Ringkas
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 1 }}>
                <div>
                  <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: '0.5rem', textTransform: 'uppercase', fontWeight: 600 }}>Bulan Ini</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>89,4K</div>
                  <div style={{ fontSize: 12, color: '#16a34a', marginTop: '0.25rem' }}>streams</div>
                </div>
                <div>
                  <div style={{ fontSize: 11, color: '#9ca3af', marginBottom: '0.5rem', textTransform: 'uppercase', fontWeight: 600 }}>Hari Ini</div>
                  <div style={{ fontSize: 20, fontWeight: 700, color: '#111827' }}>12,8K</div>
                  <div style={{ fontSize: 12, color: '#16a34a', marginTop: '0.25rem' }}>streams</div>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Activities Section */}
        <div style={{ background: '#fff', borderRadius: 12, border: '1px solid #e5e7eb', overflow: 'hidden' }}>
          <div style={{ padding: '1.5rem', borderBottom: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: 16, fontWeight: 700, color: '#111827', margin: 0 }}>
              📅 Aktivitas Terbaru
            </h2>
          </div>
          <div>
            {activities.map((activity, idx) => (
              <div 
                key={idx}
                style={{ 
                  padding: '1rem 1.5rem',
                  borderBottom: idx < activities.length - 1 ? '1px solid #f3f4f6' : 'none',
                  display: 'flex',
                  gap: 12,
                  alignItems: 'flex-start'
                }}
              >
                <div style={{ fontSize: 20, flexShrink: 0, marginTop: '0.25rem' }}>
                  {activity.icon}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, color: '#111827', fontWeight: 500 }}>
                    {activity.text}
                  </div>
                  <div style={{ fontSize: 12, color: '#9ca3af', marginTop: '0.25rem' }}>
                    {activity.time}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </main>

    </div>
  )
}
