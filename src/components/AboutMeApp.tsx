import { SKILLS } from '@/data/apps';

export default function AboutMeApp() {
  return (
    <div style={{ padding: 32, fontFamily: '"Segoe UI", sans-serif' }}>
      {/* Hero */}
      <div className="text-center" style={{ paddingBottom: 24 }}>
        <h1 style={{ fontSize: 28, fontWeight: 600, color: '#1a1a1a', margin: 0 }}>
          Zheng Bo
        </h1>
        <p style={{ fontSize: 14, color: '#666666', marginTop: 8 }}>
          Game Developer · Gameplay Programmer · UI Systems Builder
        </p>
      </div>

      {/* Two Column Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          marginBottom: 16,
        }}
      >
        {/* About Me Card */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e5e5e5',
            borderRadius: 4,
            padding: 20,
          }}
        >
          <div
            className="flex items-center justify-between"
            style={{ marginBottom: 12 }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#333', margin: 0 }}>
              About Me
            </h3>
            <span
              style={{
                fontSize: 12,
                color: '#0078D7',
                background: 'rgba(0,120,215,0.1)',
                padding: '2px 8px',
                borderRadius: 2,
              }}
            >
              Creative + Technical
            </span>
          </div>
          <p style={{ fontSize: 14, lineHeight: 1.7, color: '#444', margin: 0 }}>
            I am a Game Development student at Nanyang Polytechnic with experience
            working on both solo and team-based projects. I enjoy building gameplay
            systems, experimenting with mechanics, and turning ideas into polished
            playable experiences.
          </p>
          <p
            style={{
              fontSize: 14,
              lineHeight: 1.7,
              color: '#444',
              margin: '12px 0 0 0',
            }}
          >
            My work spans Unity and Unreal Engine projects, with a focus on gameplay
            programming, UI systems, technical problem-solving, and collaboration in
            multidisciplinary teams.
          </p>
        </div>

        {/* Focus Areas Card */}
        <div
          style={{
            background: '#ffffff',
            border: '1px solid #e5e5e5',
            borderRadius: 4,
            padding: 20,
          }}
        >
          <div
            className="flex items-center justify-between"
            style={{ marginBottom: 12 }}
          >
            <h3 style={{ fontSize: 16, fontWeight: 600, color: '#333', margin: 0 }}>
              Focus Areas
            </h3>
            <span
              style={{
                fontSize: 12,
                color: '#0078D7',
                background: 'rgba(0,120,215,0.1)',
                padding: '2px 8px',
                borderRadius: 2,
              }}
            >
              What I enjoy
            </span>
          </div>
          <div className="flex flex-wrap" style={{ gap: 8, marginTop: 12 }}>
            {['Gameplay Systems', 'UI/UX', 'Tools & Workflows', 'Game Feel'].map(
              (tag) => (
                <span
                  key={tag}
                  style={{
                    background: '#f0f4f8',
                    color: '#0078D7',
                    padding: '6px 12px',
                    borderRadius: 2,
                    fontSize: 13,
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              )
            )}
          </div>
        </div>
      </div>

      {/* Skills Card */}
      <div
        style={{
          background: '#ffffff',
          border: '1px solid #e5e5e5',
          borderRadius: 4,
          padding: 20,
        }}
      >
        <div
          className="flex items-center justify-between"
          style={{ marginBottom: 12 }}
        >
          <h3 style={{ fontSize: 16, fontWeight: 600, color: '#333', margin: 0 }}>
            Skills
          </h3>
          <span
            style={{
              fontSize: 12,
              color: '#0078D7',
              background: 'rgba(0,120,215,0.1)',
              padding: '2px 8px',
              borderRadius: 2,
            }}
          >
            Tech Stack
          </span>
        </div>
        <div className="flex flex-wrap" style={{ gap: 8 }}>
          {SKILLS.map((skill) => (
            <span
              key={skill}
              style={{
                background: 'linear-gradient(135deg, #e8f4fd, #f0e8fd)',
                color: '#4a4a4a',
                padding: '8px 14px',
                borderRadius: 2,
                fontSize: 13,
                fontWeight: 500,
                border: '1px solid rgba(0,0,0,0.05)',
              }}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
