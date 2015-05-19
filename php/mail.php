<?php
    
    //echo $_POST["nom"];

    // Récupération des variables et sécurisation des données
    $nom = htmlentities($_POST['nom']); // htmlentities() convertit des caractères "spéciaux" en équivalent HTML
    $mail = htmlentities($_POST['mail']);
    $objet = htmlentities($_POST['objet']);
    $message = htmlentities($_POST['message']);

    // Variables concernant l'email
    $destinataire = 'manon_lay@hotmail.fr'; // Adresse email du webmaster (à personnaliser)
    $sujet = $objet; // Titre de l'email
    $contenu = '<html><head><title>'.$objet.'</title></head><body>';
    $contenu .= '<p>Bonjour, vous avez reçu un message à partir de votre site web.</p>';
    $contenu .= '<p><strong>Objet</strong>: '.$objet.'</p>';
    $contenu .= '<p><strong>Nom</strong>: '.$nom.'</p>';
    $contenu .= '<p><strong>Email</strong>: '.$mail.'</p>';
    $contenu .= '<p><strong>Message</strong>:<br/> '.$message.'</p>';
    $contenu .= '</body></html>'; // Contenu du message de l'email (en XHTML)

    // Pour envoyer un email HTML, l'en-tête Content-type doit être défini
    $headers = 'MIME-Version: 1.0'."\r\n";
    $headers .= 'Content-type: text/html; charset=utf-8'."\r\n";

    // Envoyer l'email
    mail($destinataire, $sujet, $contenu, $headers); // Fonction principale qui envoi l'email
    echo '<label id="message-error" class="error" for="message">Votre message a bien été envoyé ! Je vous répondrai dans les plus bref délais.<br></label>'; // Afficher un message pour indiquer que le message a été envoyé
    // (2) Fin du code pour traiter l'envoi de l'email
    
?>