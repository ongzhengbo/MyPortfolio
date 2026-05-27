import { CERTIFICATES } from '@/data/apps';

export default function CertificateApp() {
  return (
    <div style={{ padding: '28px 32px 32px', fontFamily: '"Segoe UI", sans-serif' }}>
      {/* Hero */}
      <div className="text-center" style={{ paddingBottom: 20 }}>
        <h1 style={{ fontSize: 28, fontWeight: 600, color: '#1a1a1a', margin: 0 }}>
          My Certificates
        </h1>
        <p style={{ fontSize: 14, color: '#666666', marginTop: 8 }}>
          Courses and certifications that support my development journey
        </p>
      </div>

      {/* Certificates Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
        }}
      >
        {CERTIFICATES.map((cert) => (
          <div
            key={cert.name}
            style={{
              border: '1px solid #e5e5e5',
              borderRadius: 4,
              padding: 16,
              transition: 'box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.06)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <h3
              style={{
                fontSize: 15,
                fontWeight: 600,
                color: '#333',
                margin: '0 0 12px 0',
              }}
            >
              {cert.name}
            </h3>
            <img
              src={cert.image}
              alt={cert.name}
              style={{
                width: '100%',
                borderRadius: 2,
                border: '1px solid #f0f0f0',
                display: 'block',
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
