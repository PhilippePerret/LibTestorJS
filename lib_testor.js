'use strict';
/**
 * LibTestor — Testeur de librairie
 * 
 * Pour utiliser lib_testor :
 * 
 * 1) Placer ce fichier ./priv/static/js/
 * 2) Implémenter dans sa librairie : 
 * 
 *  (note : on suppose que la libraire définit la class `Dom')
 * 
 *  // La fonction qui sera appelée en console de navigateur
 *  // (ce nom est impératif)
 *  Dom.ctest = function(){
 * 
 *    // Préparation de la libraire LitTestor
 *    // ------------------------------------
 *    if ('undefined' == typeof LibTestor) {
 *      sessionStorage.setItem("LIST_TESTOR_LIBRARY_NAME", "DOM")
 *      DCreate('SCRIPT', {in: document.head, src: "./assets/js/lib_testor.js"})
 *      return
 *    }
 * 
 *    // Implémentation de tests 
 *    // -----------------------
 *    assert(true, "Ça devrait être vrai")
 *    equal(2 + 2, 4, "2+2 doit être égal à 4")
 *    raise(cetteMethode, [arg1, arg2], "Message d'erreur attendu")
 *  }
 * 
 * === A S S E R T I O N S ===
 * 
 * assert(affirmation, message d'erreur)
 *    Teste une affirmation et produit une erreur si elle est
 *    fausse.
 * 
 * equal(actual, expected, message d'erreur)
 *    Teste l'égalité et génère une erreur le cas échéant.
 * 
 * raise([String] function, [Array] args, mess_attendu )
 *    Test que la fonction +function+ raise bien une erreur avec
 *    les arguments +args+
 * not_raison([String] fonction, [Array] args)
 *    Inverse de la précédente
 * 
 * == U S E F U L L   M E T H O D S ==
 * 
 * (ces fonctions s'emploient telles quelles, sans préfixe)
 * 
 *  clear()
 *    Vide la console de tout message.
 * 
 *  vide()    
 *    Permet de vider totalement la page
 * 
 *  body([String] contenu)
 *    Défini le contenu de la page avec une chaine, par exemple
 *      body("<div id=\"mondiv\">Le contenu</div>")
 * 
 *  log(message, var, var… )
 *      Raccourci pour console.log 
 * 
 *  t(titre)
 *      Pour placer un titre bleu
 * 
 * == INCLUSION/EXCLUSION DES TESTS ==
 * 
 * Pour ne jouer que quelques tests, on peut ajouter :
 *    only_tested()
 * … au début des tests. Dans ce cas, seuls les tests qui auront
 * tested: true dans leurs options seront traités, les autres
 * seront passé.
 */

class LibTestor {
  // Return TRUE s'il NE faut PAS jouer le test
  static notRunThisTest(options){
    if ( this.only_tested === false ) return false ;
    if ( options && options.tested ) return false ;
    return true
  }
  static setBody(content){
    document.body.innerHTML = content
  }
  static get only_tested(){
    if ( undefined === this._only_tested ) {
      this._only_tested = false
    } return this._only_tested
  }
  static set only_tested(v){this._only_tested = v}
}

// --- Options ---

window.only_tested = function(){LibTestor.only_tested = true}

// --- Données de tests ---
var failureCount = 0
var successCount = 0
var testCount    = 0

window.log    = function(){console.log(...arguments)}
window.clear  = function(){console.clear()}
window.vide   = function(){document.body.innerHTML = ""}
window.t      = function(intitule){
  log('%c'+intitule, "font-family:monospace;font-size:8pt;color:blue;")
}
window.body = LibTestor.setBody.bind(LibTestor)

// --- Assertions ---

window.assert = function(assertion, message_erreur, options) {
  if ( LibTestor.notRunThisTest(options) ) return
  ++ testCount
  if ( ! assertion ) {
    ++ failureCount
    err(message_erreur)
  } else {
    ++ successCount
  }
}
window.equal = function(actual, expected, err_msg, options){
  if ( LibTestor.notRunThisTest(options) ) return
  const expect_str = stringify(expected)
  const actual_str = stringify(actual)
  err_msg = `${err_msg}\nAttendu : ${expect_str}\nObtenu : ${actual_str}`
  var ok = true
  if ('object' == typeof actual && 'object' == typeof expected ) {
    // ok = ObjectsAreEqual(actual, expected)
    // Plus malin :
    ok = expect_str == actual_str
  } else {
    ok = actual == expected
  }
  assert(ok, err_msg, options)
}
window.raise = function(method, args, err_msg, options){
  if ( LibTestor.notRunThisTest(options) ) return
  try {
    method.apply(null, args)
    assert(false, `La méthode '${method.name.replace("bound ", "")}' devrait lever une erreur.`, options)
  } catch (erreur) {
    if ( err_msg ){
      equal(erreur.message, err_msg, "La méthode lève une erreur, mais pas celle indiquée.", options)
    } else {
      assert(true)
    }
  }
}
window.not_raise = function(method, args, options) {
  if ( LibTestor.notRunThisTest(options) ) return
  try {
    method.apply(null, args)
    assert(true)
  } catch(erreur) {
    assert(false, `La méthode '${method.name.replace("bound ", "")}' ne devrait pas lever d'erreur… L'erreur «««${erreur.message||erreur}»»» est levée.`)
  }
}
function ObjectsAreEqual(obj1, obj2){
  for ( var i in obj1 ) { if ( obj1[i] != obj2[i] ) {
    if ( 'Array' == DOM.typeOf(obj1[i]) ) {
      if ( !ObjectsAreEqual(obj1[i], obj2[i]) ) {
        // Parfois, les Array ne sont pas identiques alors qu'ils le
        // sont
        // log("Différents", i, obj1[i], obj2[i])
        return false
      }
    } else {
      // log("Différents", i, obj1[i], obj2[i])
      return false 
    }
  }}
  return true
}

// --- /Assertions ---

window.stringify  = function(v){return typeof v == 'string' ? v : JSON.stringify(v)}
window.err        = function(){console.error(...arguments)}
window.info       = function(){console.info(...arguments)}
window.get        = function(selector){return DGet(selector)}
window.add        = function(element){document.body.appendChild(element)}



const LibName = sessionStorage.getItem("LIST_TESTOR_LIBRARY_NAME")
// console.info("LibName = ", LibName)
if ( LibName ) {
  t(`=== TEST DE LA LIBRAIRIE ${LibName} ===`)
  clear()
  eval(LibName).ctest(true)
  t(`=== FIN DU TEST DE LA LIBRAIRIE ${LibName} ===`)
  if ( failureCount > 0 ) {
    log('%c'+"Success:%s - Failures:%s - Tests:%s\n(consulter la console)", "padding:0.3em;line-height:1.3em;background-color:#FFCCCC;color:red;font-family:Monospace,Courrier New;font-size:1.2em;", successCount, failureCount, testCount)
  } else {
    log('%c'+"La librairie DOM est opérationnelle (les %s tests sont passés avec succès)", "background-color:#CCFFCC;color:green", testCount)
  }

} else {
  console.error("La librairie qui charge LibTestor doit définir la propriété session LIST_TESTOR_LIBRARY_NAME en y mettant le nom string de la classe ou de l'objet (celui mis dans <objet>.ctest(loaded).")
}

// console.log("Fin de chargement de LibTestor")