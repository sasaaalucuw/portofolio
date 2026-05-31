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

// Default/Fallback data jika database tidak tersedia
const DEFAULT_PROFILE = {
  nama: 'Shafira Aini Saichu',
  deskripsi: 'Mahasiswa D3 Teknologi Informasi yang memiliki minat pada UI/UX Design dan Web Development.',
  pendidikan: 'D3',
  universitas: 'Politeknik Harapan Bersama',
  skill: 'HTML, CSS, JavaScript, React, Node.js, UI/UX Design',
  email: 'shafira@example.com',
  foto: 'profile.jpg'
};

const DEFAULT_PROJECTS = [
  {
    id: 1,
    nama_project: 'Loading projects from database...',
    deskripsi: 'Please check database connection',
    code: 'Check environment variables',
    link_project: '#',
    gambar: 'project1.jpg'
  }
];

// Database connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'portofolio',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  enableKeepAlive: true,
  keepAliveInitialDelayMs: 0,
  ssl: process.env.DB_HOST && process.env.DB_HOST.includes('planetscale') ? 'required' : false
});

// Helper function untuk mendapatkan koneksi
async function getDbConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Database connection successful');
    return connection;
  } catch (error) {
    console.error('❌ Database connection failed:', {
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      database: process.env.DB_NAME,
      error: error.message
    });
    return null;
  }
}

// Routes
app.get('/', async (req, res) => {
  try {
    const connection = await getDbConnection();
    let projects = DEFAULT_PROJECTS;
    
    if (connection) {
      const [dbProjects] = await connection.query('SELECT * FROM project');
      connection.release();
      projects = dbProjects.length > 0 ? dbProjects : DEFAULT_PROJECTS;
    } else {
      console.warn('⚠️ Using fallback projects data');
    }

    res.send(renderHome(projects));
  } catch (error) {
    console.error('Route error:', error.message);
    res.send(renderHome(DEFAULT_PROJECTS));
  }
});

app.get('/project', async (req, res) => {
  try {
    const connection = await getDbConnection();
    let projects = DEFAULT_PROJECTS;
    
    if (connection) {
      const [dbProjects] = await connection.query('SELECT * FROM project');
      connection.release();
      projects = dbProjects.length > 0 ? dbProjects : DEFAULT_PROJECTS;
    } else {
      console.warn('⚠️ Using fallback projects data');
    }

    res.send(renderProjects(projects));
  } catch (error) {
    console.error('Route error:', error.message);
    res.send(renderProjects(DEFAULT_PROJECTS));
  }
});

app.get('/profile', async (req, res) => {
  try {
    const connection = await getDbConnection();
    let profile = DEFAULT_PROFILE;
    
    if (connection) {
      const [profileData] = await connection.query('SELECT * FROM profile LIMIT 1');
      connection.release();
      profile = profileData.length > 0 ? profileData[0] : DEFAULT_PROFILE;
    } else {
      console.warn('⚠️ Using fallback profile data');
    }

    res.send(renderProfile(profile));
  } catch (error) {
    console.error('Route error:', error.message);
    res.send(renderProfile(DEFAULT_PROFILE));
  }
});

// API endpoints (untuk client-side fetch)
app.get('/api/projects', async (req, res) => {
  try {
    const connection = await getDbConnection();
    if (!connection) {
      return res.json(DEFAULT_PROJECTS);
    }

    const [projects] = await connection.query('SELECT * FROM project');
    connection.release();

    res.json(projects.length > 0 ? projects : DEFAULT_PROJECTS);
  } catch (error) {
    console.error('API Error:', error.message);
    res.json(DEFAULT_PROJECTS);
  }
});

app.get('/api/profile', async (req, res) => {
  try {
    const connection = await getDbConnection();
    if (!connection) {
      return res.json(DEFAULT_PROFILE);
    }

    const [profileData] = await connection.query('SELECT * FROM profile LIMIT 1');
    connection.release();

    res.json(profileData.length > 0 ? profileData[0] : DEFAULT_PROFILE);
  } catch (error) {
    console.error('API Error:', error.message);
    res.json(DEFAULT_PROFILE);
  }
});

// HTML Template Functions
function renderHome(projects) {
  const projectsList = projects && projects.length > 0 ? projects : DEFAULT_PROJECTS;
  const projectsHtml = projectsList.map(p => `
    <div class="card" onclick="openModal('${escapeHtml(p.nama_project)}', '${escapeHtml(p.deskripsi)}', '${escapeHtml(p.code)}', '${p.link_project}', 'assets/${p.gambar}')">
      <img src="assets/${p.gambar}" alt="project" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22340%22 height=%22230%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22340%22 height=%22230%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2216%22 fill=%22%23999%22%3EImage not found%3C/text%3E%3C/svg%3E'">
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
  const projectsList = projects && projects.length > 0 ? projects : DEFAULT_PROJECTS;
  const projectsHtml = projectsList.map(p => `
    <div class="card" onclick="openModal('${escapeHtml(p.nama_project)}', '${escapeHtml(p.deskripsi)}', '${escapeHtml(p.code)}', '${p.link_project}', 'assets/${p.gambar}')">
      <img src="assets/${p.gambar}" alt="project" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22340%22 height=%22230%22%3E%3Crect fill=%22%23f0f0f0%22 width=%22340%22 height=%22230%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 dominant-baseline=%22middle%22 text-anchor=%22middle%22 font-family=%22Arial%22 font-size=%2216%22 fill=%22%23999%22%3EImage not found%3C/text%3E%3C/svg%3E'">
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
  const p = profile || DEFAULT_PROFILE;
  return getBaseHTML(`
    <section class="profile-page">
      <div class="profile-card">
        <img src="assets/${p.foto || 'profile.jpg'}" alt="profile" onerror="this.src='data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22180%22 height=%22180%22%3E%3Crect fill=%22%23ccc%22 width=%22180%22 height=%22180%22/%3E%3C/svg%3E'">
        <h1>${escapeHtml(p.nama || 'Nama Tidak Tersedia')}</h1>
        <p class="desc">${escapeHtml(p.deskripsi || 'Deskripsi tidak tersedia')}</p>

        <div class="profile-info">
          <div class="info-box">
            <h3>Nama</h3>
            <p>${escapeHtml(p.nama || '-')}</p>
          </div>
          <div class="info-box">
            <h3>Pendidikan</h3>
            <p>${escapeHtml(p.pendidikan || '-')}</p>
          </div>
          <div class="info-box">
            <h3>Universitas</h3>
            <p>${escapeHtml(p.universitas || '-')}</p>
          </div>
          <div class="info-box">
            <h3>Skill</h3>
            <p>${escapeHtml(p.skill || '-')}</p>
          </div>
          <div class="info-box">
            <h3>Email</h3>
            <p>${escapeHtml(p.email || '-')}</p>
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
  console.log(`
╔═══════════════════════════════════════╗
║  🚀 Server Running                     ║
╠═══════════════════════════════════════╣
║  URL: http://localhost:${PORT}             ║
║  Node: ${process.version}                 ║
║  Env: ${process.env.NODE_ENV || 'development'}           ║
║                                       ║
║  Database Config:                     ║
║  Host: ${process.env.DB_HOST || 'localhost'}    ║
║  Database: ${process.env.DB_NAME || 'portofolio'}        ║
╚═══════════════════════════════════════╝
  `);
});
