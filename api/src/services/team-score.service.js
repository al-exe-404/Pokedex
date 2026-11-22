// Ici on va prendre les Pokémons d'une team et renvoyer 4 moyennes.
// offensive, defensive, speed et une dernière: global, qui regroupe le tout.
// offensive = moyenne de atk et atk_spe, defensive = moyenne de hp, def et def_spe,
// speed = la vitesse, global = la moyenne des trois autres.

// Qui dit moyenne, dit Math.round pour arrondir.
// La multiplication par 10 amène la première décimale juste avant la virgule,
// là où Math.round sait travailler, utile pour les cas où l'on / 3.
// La division par 10 remet ensuite la virgule à sa place.
// ex: 63.8666 * 10 = 638.666 => Math.round(638.666) = 639
// 639 /10 = 63.9
function roundToOneDecimal(number) {
  return Math.round(number * 10) / 10;
}

export function calculateTeamScore(pokemons) {
  if (pokemons.length === 0) {
    // À noter que l'on peut créer une équipe sans Pokemons donc si team vide alors score = 0 (et on évite une division par 0)
    return { offensive: 0, defensive: 0, speed: 0, global: 0 };
  }

  let offensiveTotal = 0;
  let defensiveTotal = 0;
  let speedTotal = 0;

  for (const pokemon of pokemons) {
    offensiveTotal += (pokemon.atk + pokemon.atk_spe) / 2;
    defensiveTotal += (pokemon.hp + pokemon.def + pokemon.def_spe) / 3;
    speedTotal += pokemon.speed;
  }

  // On divise par le nombre de Pokemon présent dans l'équipe pour avoir les moyennes.
  const offensive = offensiveTotal / pokemons.length;
  const defensive = defensiveTotal / pokemons.length;
  const speed = speedTotal / pokemons.length;

  // Et enfin, la moyenne globale.
  const globalAverage = (offensive + defensive + speed) / 3;

  return {
    offensive: roundToOneDecimal(offensive),
    defensive: roundToOneDecimal(defensive),
    speed: roundToOneDecimal(speed),
    global: roundToOneDecimal(globalAverage),
  };
}