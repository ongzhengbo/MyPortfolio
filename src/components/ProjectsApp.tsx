import { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { PROJECTS } from '@/data/apps';

function CollapsibleSection({ items }: { items: string[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div style={{ marginTop: 12 }}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center w-full"
        style={{
          background: 'rgba(0,0,0,0.03)',
          border: '1px solid rgba(0,0,0,0.06)',
          borderRadius: 4,
          padding: '8px 12px',
          fontSize: 13,
          fontWeight: 600,
          color: '#5c4d68',
          cursor: 'pointer',
        }}
      >
        <ChevronRight
          size={14}
          style={{
            marginRight: 6,
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s',
            color: '#b45c86',
          }}
        />
        What I Did
      </button>
      <div
        style={{
          maxHeight: isOpen ? 500 : 0,
          overflow: 'hidden',
          transition: 'max-height 0.3s ease',
        }}
      >
        <ul style={{ margin: '10px 0 0 18px', padding: 0 }}>
          {items.map((item, i) => (
            <li
              key={i}
              style={{
                fontSize: 13,
                color: '#54495b',
                lineHeight: 1.6,
                marginBottom: 6,
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function ProjectsApp() {
  return (
    <div style={{ padding: '28px 32px 32px', fontFamily: '"Segoe UI", sans-serif' }}>
      {/* Hero */}
      <div className="text-center" style={{ paddingBottom: 20 }}>
        <h1 style={{ fontSize: 28, fontWeight: 600, color: '#1a1a1a', margin: 0 }}>
          My Projects
        </h1>
        <p style={{ fontSize: 14, color: '#666666', marginTop: 8 }}>
          Selected works in gameplay programming, UI systems, and technical design
        </p>
      </div>

      {/* Projects Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
        }}
      >
        {PROJECTS.map((project) => (
          <div
            key={project.name}
            style={{
              border: '1px solid #e5e5e5',
              borderRadius: 4,
              overflow: 'hidden',
              transition: 'box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            {/* YouTube Thumbnail */}
            <a
              href={`https://www.youtube.com/watch?v=${project.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block' }}
            >
              <img
                src={`https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`}
                alt={project.name}
                style={{
                  width: '100%',
                  height: 160,
                  objectFit: 'cover',
                  display: 'block',
                }}
              />
            </a>

            {/* Content */}
            <div style={{ padding: 16 }}>
              <h3
                style={{
                  fontSize: 16,
                  fontWeight: 600,
                  color: '#333',
                  margin: 0,
                }}
              >
                {project.name}
              </h3>
              <p
                style={{
                  fontSize: 14,
                  color: '#555',
                  lineHeight: 1.6,
                  marginTop: 8,
                }}
              >
                {project.description}
              </p>

              {/* Collapsible What I Did */}
              <CollapsibleSection items={project.whatIDid} />

              {/* Tags */}
              <div className="flex flex-wrap" style={{ gap: 8, marginTop: 12 }}>
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    style={{
                      background: '#f0f4f8',
                      color: '#0078D7',
                      padding: '4px 10px',
                      borderRadius: 2,
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
