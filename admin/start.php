<?php if(!file_exists("./nac.base/config.json")){ ?>
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <meta name="description" content="">
    <meta name="author" content="">

    <title>Sign In</title>

    <!-- Bootstrap core CSS -->
    <link href="http://getbootstrap.com/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Custom styles for this template -->
    <link href="http://getbootstrap.com/examples/signin/signin.css" rel="stylesheet">

    <!-- HTML5 shim and Respond.js for IE8 support of HTML5 elements and media queries -->
    <!--[if lt IE 9]>
      <script src="https://oss.maxcdn.com/html5shiv/3.7.2/html5shiv.min.js"></script>
      <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->
  </head>

  <body>

    <div class="container">

      <form class="form-signin" method="post" action="register.php">
        <h2 class="form-signin-heading">Merci de vous inscrire</h2>
        <label for="inputNom" class="sr-only">Nom</label>
        <input type="text" id="inputNom" name="nom" class="form-control" placeholder="Votre nom" required autofocus>
        <label for="inputPrenom" class="sr-only">Prénom</label>
        <input type="text" id="inputPrenom" name="prenom" class="form-control" placeholder="Votre prénom" required autofocus>
        <label for="inputEmail" class="sr-only">Adresse email</label>
        <input type="email" id="inputEmail" name="id" class="form-control" placeholder="Votre adresse email" required autofocus>
        <label for="inputPassword" class="sr-only">Mot de passe</label>
        <input type="password" id="inputPassword" name="pwd" class="form-control" placeholder="Votre mot de passe" required>
        <button class="btn btn-lg btn-primary btn-block" name="register" type="submit">Enregistrer</button>
      </form>

    </div> <!-- /container -->


    <!-- IE10 viewport hack for Surface/desktop Windows 8 bug -->
    <script src="js/support-IE10.js"></script>
  </body>
</html>
<?php } else {
    header("location: ./login.php");
}
?>