<?php

include 'koneksi.php';

$query = mysqli_query(
$conn,
"SELECT * FROM profile LIMIT 1"
);

$data = mysqli_fetch_assoc($query);

?>

<!DOCTYPE html>
<html lang="en">
<head>

<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Profile - Shafira</title>

<link rel="preconnect" href="https://fonts.googleapis.com">

<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">

<link rel="stylesheet" href="style.css">

</head>
<body>

<!-- NAVBAR -->

<nav>

<h2>Portfolio</h2>

<ul>
<li><a href="index.php">Home</a></li>
<li><a href="project.php">Project</a></li>
<li><a href="profile.php">Profile</a></li>
</ul>

</nav>

<!-- PROFILE -->

<section class="profile-page">

<div class="profile-card">

<img
src="assets/<?php echo $data['foto']; ?>"
alt="profile"
>

<h1>
<?php echo $data['nama']; ?>
</h1>

<p class="desc">
<?php echo $data['deskripsi']; ?>
</p>

<div class="profile-info">

<div class="info-box">
<h3>Nama</h3>
<p>
<?php echo $data['nama']; ?>
</p>
</div>

<div class="info-box">
<h3>Pendidikan</h3>
<p>
<?php echo $data['pendidikan']; ?>
</p>
</div>

<div class="info-box">
<h3>Universitas</h3>
<p>
<?php echo $data['universitas']; ?>
</p>
</div>

<div class="info-box">
<h3>Skill</h3>
<p>
<?php echo $data['skill']; ?>
</p>
</div>

<div class="info-box">
<h3>Email</h3>
<p>
<?php echo $data['email']; ?>
</p>
</div>

<div class="info-box">
<h3>Domisili</h3>
<p>
<?php echo $data['domisili']; ?>
</p>
</div>

</div>

</div>

</section>

<footer>

© 2026 Shafira Portfolio Website

</footer>

</body>
</html>