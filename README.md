# LibTestor

« Destructive », ça signifie que pour faire ses tests, la librairie détruit la page pour y placer tous les éléments nécessaires aux tests de la librairie.

Ça signifie aussi que pour l'utilisateur de votre libraire, après avoir joué une fois les tests dans son application et s'être assuré qu'ils passaient tous, il peut le détruire pour alléger la librairie.

## Utilisation


### Distance avec connexion internet

```
<script defer src="https://cdn.jsdelivr.net/gh/PhilippePerret/LibTestorJS@main/lib_testor.js"></script>
```

Noter que le script [doit être activé](#activer-script)

### Locale sans connexion


<a name="activer-script"></a>

### Activer le script

Pour lancer le test d'une librairie, ajouter le code suivant (dans son fichier de développement et dans le fichier de production en disant qu'il peut ensuite être supprimé après avoir été joué)

```
(on présuppose que la librairie s'appelle MaLib)

(Si vous voulez simplement copier-coller ce code, renseignez 
 ci-dessous le nom de la librairie)
const LIBRARY_NAME = "MaLib"

// Ne pas toucher ci-dessous Ne pas toucher ci-dessous Ne pas toucher

const TESTED_LIBRARY = eval(LIBRARY_NAME)
window[LIBRARY_NAME] = TESTED_LIBRARY

window[LIBRARY_NAME].ctest() = function() {
  sessionStorage.setItem("LIST_TESTOR_LIBRARY_NAME", LIBRARY_NAME)
  run_lib_testor()
  /* === ICI LES TESTS === */

  assert(2+2 == 4, "Une addition fait le travail")

  /* === FIN DES TESTS === */
  stop_lib_testor()
}

```