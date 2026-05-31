import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mysql from 'mysql2/promise';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portofolio',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Helper function untuk mendapatkan koneksi
async function getDbConnection() {
  try {
    return await pool.getConnection();
  } catch (error) {
    console.error('Database connection error:', error);
    return null;
  }
}

// Routes
app.get('/', async (req, res) => {
  try {
    const connection = await getDbConnection();
    if (!connection) {
      return res.status(500).send('Database connection failed');
    }

    const [projects] = await connection.query('SELECT * FROM project');
    connection.release();

    res.send(renderHome(projects));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/project', async (req, res) => {
  try {
    const connection = await getDbConnection();
    if (!connection) {
      return res.status(500).send('Database connection failed');
    }

    const [projects] = await connection.query('SELECT * FROM project');
    connection.release();

    res.send(renderProjects(projects));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/profile', async (req, res) => {
  try {
    const connection = await getDbConnection();
    if (!connection) {
      return res.status(500).send('Database connection failed');
    }

    const [profileData] = await connection.query('SELECT * FROM profile LIMIT 1');
    connection.release();

    const profile = profileData[0] || {};
    res.send(renderProfile(profile));
  } catch (error) {
    console.error('Error:', error);
    res.status(500).send('Internal Server Error');
  }
});

// API endpoints (untuk client-side fetch)
app.get('/api/projects', async (req, res) => {
  try {
    const connection = await getDbConnection();
    if (!connection) {
      return res.status(500).json({ error: 'Database connection failed' });
    }

    const [projects] = await connection.query('SELECT * FROM project');
    connection.release();

    res.json(projects);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/profile', async (req, res) => {
  try {
    const connection = await getDbConnection();
    if (!connection) {
      return res.status(500).json({ error: 'Database connection failed' });
    }

    const [profileData] = await connection.query('SELECT * FROM profile LIMIT 1');
    connection.release();

    res.json(profileData[0] || {});
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// HTML Template Functions
function renderHome(projects) {
  const projectsHtml = projects.map(p => `
    <div class="card" onclick="openModal('${escapeHtml(p.nama_project)}', '${escapeHtml(p.deskripsi)}', '${escapeHtml(p.code)}', '${p.link_project}', 'assets/${p.gambar}')">
      <img src="assets/${p.gambar}" alt="project">
      <div class="card-content">
        <h3>${escapeHtml(p.nama_project)}</h3>
        <p>${escapeHtml(p.deskripsi)}</p>
        <a href="${p.link_project}" target="_blank" class="project-btn">View Project</a>
      </div>
    </div>
  `).join('');

  return getBaseHTML(`
    <section class="hero">
      <div class="hero-content">
        <h1>Shafira Aini <span>Saichu</span></h1>
        <p>Mahasiswa D3 Teknologi Informasi yang memiliki minat pada UI/UX Design dan Web Development.</p>
      </div>
    </section>

    <section class="projects">
      <h2>My Projects</h2>
      <div class="project-container">
        ${projectsHtml}
      </div>
    </section>

    <div id="modal" class="modal">
      <div class="modal-content">
        <span class="close" onclick="closeModal()">&times;</span>
        <img id="modalImage" src="" alt="project">
        <div class="modal-text">
          <h2 id="modalTitle"></h2>
          <p id="modalDesc"></p>
          <div>
            <strong>Tech Stack:</strong>
            <p id="modalTech"></p>
          </div>
          <a id="modalLink" href="" target="_blank" class="project-btn">View Project</a>
        </div>
      </div>
    </div>

    <script>
      const modal = document.getElementById("modal");

      function openModal(title, desc, tech, link, image){
        document.getElementById("modalTitle").innerText = title;
        document.getElementById("modalDesc").innerText = desc;
        document.getElementById("modalTech").innerText = tech;
        document.getElementById("modalImage").src = image;
        document.getElementById("modalLink").href = link;
        modal.style.display = "block";
      }

      function closeModal(){
        modal.style.display = "none";
      }

      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
    </script>
  `);
}

function renderProjects(projects) {
  const projectsHtml = projects.map(p => `
    <div class="card" onclick="openModal('${escapeHtml(p.nama_project)}', '${escapeHtml(p.deskripsi)}', '${escapeHtml(p.code)}', '${p.link_project}', 'assets/${p.gambar}')">
      <img src="assets/${p.gambar}" alt="project">
      <div class="card-content">
        <h3>${escapeHtml(p.nama_project)}</h3>
        <p>${escapeHtml(p.deskripsi)}</p>
        <a href="${p.link_project}" target="_blank" class="project-btn">View Project</a>
      </div>
    </div>
  `).join('');

  return getBaseHTML(`
    <div class="project-container">
      ${projectsHtml}
    </div>

    <div id="modal" class="modal">
      <div class="modal-content">
        <span class="close" onclick="closeModal()">&times;</span>
        <img id="modalImage" src="" alt="project">
        <div class="modal-text">
          <h2 id="modalTitle"></h2>
          <p id="modalDesc"></p>
          <div>
            <strong>Tech Stack:</strong>
            <p id="modalTech"></p>
          </div>
          <a id="modalLink" href="" target="_blank" class="project-btn">View Project</a>
        </div>
      </div>
    </div>

    <script>
      const modal = document.getElementById("modal");

      function openModal(title, desc, tech, link, image){
        document.getElementById("modalTitle").innerText = title;
        document.getElementById("modalDesc").innerText = desc;
        document.getElementById("modalTech").innerText = tech;
        document.getElementById("modalImage").src = image;
        document.getElementById("modalLink").href = link;
        modal.style.display = "block";
      }

      function closeModal(){
        modal.style.display = "none";
      }

      window.onclick = function(event) {
        if (event.target == modal) {
          modal.style.display = "none";
        }
      }
    </script>
  `);
}

function renderProfile(profile) {
  return getBaseHTML(`
    <section class="profile-page">
      <div class="profile-card">
        <img src="assets/${profile.foto || 'default.jpg'}" alt="profile">
        <h1>${escapeHtml(profile.nama || 'Nama Tidak Tersedia')}</h1>
        <p class="desc">${escapeHtml(profile.deskripsi || '')}</p>

        <div class="profile-info">
          <div class="info-box">
            <h3>Nama</h3>
            <p>${escapeHtml(profile.nama || '-')}</p>
          </div>
          <div class="info-box">
            <h3>Pendidikan</h3>
            <p>${escapeHtml(profile.pendidikan || '-')}</p>
          </div>
          <div class="info-box">
            <h3>Universitas</h3>
            <p>${escapeHtml(profile.universitas || '-')}</p>
          </div>
          <div class="info-box">
            <h3>Skill</h3>
            <p>${escapeHtml(profile.skill || '-')}</p>
          </div>
          <div class="info-box">
            <h3>Email</h3>
            <p>${escapeHtml(profile.email || '-')}</p>
          </div>
        </div>
      </div>
    </section>
  `);
}

function getBaseHTML(content) {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Portfolio Shafira</title>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
      <link rel="stylesheet" href="/style.css">
    </head>
    <body>
      <nav>
        <h2>Portfolio</h2>
        <ul>
          <li><a href="/">Home</a></li>
          <li><a href="/project">Projects</a></li>
          <li><a href="/profile">Profile</a></li>
        </ul>
      </nav>

      ${content}

      <footer>
        <p>&copy; 2024 Shafira Aini Saichu. All Rights Reserved.</p>
      </footer>
    </body>
    </html>
  `;
}

function escapeHtml(text) {
  const map = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, m => map[m]);
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
