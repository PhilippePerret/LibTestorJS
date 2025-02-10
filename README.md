# LibTestor

Testeur léger, non intrusif et destructif de librairies JavaScript. 

Ce testeur permet de mettre en place très rapidement des tests JavaScript, de les lancer depuis la console du navigateur et de recevoir les résultats dans cette même console de navigateur.

Ce testeur est dit « Destructif » car pour faire ses tests, la librairie détruit la page pour y placer tous les éléments nécessaires aux tests de la librairie.

Ça signifie aussi que pour l'utilisateur de votre libraire, après avoir joué une fois les tests dans son application pour s'assurer qu'ils passent tous, il peut le détruire pour alléger la librairie.

## Utilisation

### Distante avec connexion internet

```
<script defer src="https://cdn.jsdelivr.net/gh/PhilippePerret/LibTestorJS@main/lib_testor.js"></script>
```

Noter que le script [doit être activé](#activer-script)

### Locale sans connexion

Noter que le script [doit être activé](#activer-script)

### Pour une application Phoenix/Elixir

* Télécharger le script `lib_testor.js` dans le dossier `priv/static/js` de votre application.
* Ajouter la balise suivante au `<head>` de votre fichier `root.html.heex` :

  ```
  <script defer src="/assets/js/lib_testor.js"></script>
  ```
* Copier le [code d'activation de LibTestor](#activer-script) à la fin de votre librairie JavaScript.

<a name="activer-script"></a>

### Activer le script

Pour lancer le test d'une librairie, ajouter le code suivant à la fin du code de votre librairie JavaScript (dans son fichier de développement et dans le fichier de production en disant qu'il peut ensuite être supprimé après avoir été joué).

```
(on présuppose que la librairie s'appelle « MaLib »)

(Si vous voulez simplement copier-coller ce code, renseignez 
 ci-dessous le nom de la librairie)
const LIBRARY_NAME = "MaLib" // <======= DÉFINIR ÇA 



const TESTED_LIBRARY = eval(LIBRARY_NAME)
window[LIBRARY_NAME] = TESTED_LIBRARY
window[LIBRARY_NAME].ctest() = function() {
  run_lib_testor(TESTED_LIBRARY)

  /* === DÉBUT DES TESTS === */

  assert(2+2 == 4, "Une addition fait le travail")

  /* === FIN DES TESTS === */
  stop_lib_testor()
}

```