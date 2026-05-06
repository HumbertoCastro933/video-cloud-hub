-- Crear tabla de videos
CREATE TABLE IF NOT EXISTS videos (
    id SERIAL PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    descripcion TEXT,
    categoria VARCHAR(100),
    url_video TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Crear tabla de playlists
CREATE TABLE IF NOT EXISTS playlists (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(255) NOT NULL,
    descripcion TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla intermedia para relación muchos a muchos
CREATE TABLE IF NOT EXISTS playlist_videos (
    playlist_id INTEGER REFERENCES playlists(id) ON DELETE CASCADE,
    video_id INTEGER REFERENCES videos(id) ON DELETE CASCADE,
    added_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (playlist_id, video_id)
);