<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);

include 'koneksi.php';

$query = mysqli_query(
$conn,
"SELECT * FROM project"
);
?>

<!DOCTYPE html>
<html lang="en">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Portfolio Shafira</title>

<link rel="stylesheet" href="style.css">

</head>
<body>

<nav>

<h2>Portfolio</h2>

<ul>
<li><a href="index.php">Home</a></li>
<li><a href="project.php">Projects</a></li>
<li><a href="profile.php">Profile</a></li>
</ul>

</nav>

<section class="hero">

<div class="hero-content">

<h1>
Shafira Aini <span>Saichu</span>
</h1>

<p>
Mahasiswa D3 Teknologi Informasi yang memiliki minat pada UI/UX Design dan Web Development.
</p>

</div>

</section>

<section class="projects">

<h2>My Projects</h2>

<div class="project-container">

<?php while($row = mysqli_fetch_assoc($query)){ ?>

<div class="card" onclick="openModal('<?php echo addslashes($row['nama_project']); ?>', '<?php echo addslashes($row['deskripsi']); ?>', '<?php echo addslashes($row['code']); ?>', '<?php echo $row['link_project']; ?>', 'assets/<?php echo $row['gambar']; ?>')">

<img src="assets/<?php echo $row['gambar']; ?>" alt="project">

<div class="card-content">

<h3>
<?php echo $row['nama_project']; ?>
</h3>

<p>
<?php echo $row['deskripsi']; ?>
</p>

<a
href="<?php echo $row['link_project']; ?>"
target="_blank"
class="project-btn">

View Project

</a>

</div>

</div>

<?php } ?>

</div>

</section>

<!-- MODAL -->
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

<footer>
© 2026 Shafira Portfolio Website
</footer>

</body>

<script>

const modal = document.getElementById("modal");

function openModal(title, desc, tech, link, image){

  document.getElementById("modalTitle").innerText = title;
  document.getElementById("modalDesc").innerText = desc;
  document.getElementById("modalTech").innerText = tech;
  document.getElementById("modalImage").src = image;
  document.getElementById("modalLink").href = link;

  modal.style.display = "flex";
}

function closeModal(){
  modal.style.display = "none";
}

window.onclick = function(event){
  if(event.target == modal){
    modal.style.display = "none";
  }
}

</script>

</html>