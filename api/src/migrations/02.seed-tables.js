import { sequelize, Type, Pokemon, Team } from "../models/index.js";

// Créations des types
console.log("🌱 Création des types...");
const typeAcier = await Type.create({ name: "Acier", color: "aaaabb" });
const typeCombat = await Type.create({ name: "Combat", color: "bb5544" });
const typeDragon = await Type.create({ name: "Dragon", color: "7766ee" });
const typeEau = await Type.create({ name: "Eau", color: "3399ff" });
const typeElectrik = await Type.create({ name: "Electrik", color: "ffbb33" });
const typeFeu = await Type.create({ name: "Feu", color: "ff4422" });
const typeGlace = await Type.create({ name: "Glace", color: "77ddff" });
const typeInsecte = await Type.create({ name: "Insecte", color: "aabb22" });
const typeNormal = await Type.create({ name: "Normal", color: "bbaabb" });
const typePlante = await Type.create({ name: "Plante", color: "77cc55" });
const typePoison = await Type.create({ name: "Poison", color: "aa5599" });
const typePsy = await Type.create({ name: "Psy", color: "ff5599" });
const typeRoche = await Type.create({ name: "Roche", color: "bbaa66" });
const typeSol = await Type.create({ name: "Sol", color: "ddbb55" });
const typeSpectre = await Type.create({ name: "Spectre", color: "6666bb" });
const typeTénèbres = await Type.create({ name: "Ténèbres", color: "665544" });
const typeVol = await Type.create({ name: "Vol", color: "6699ff" });
console.log("✅ Types créés\n");

// Création des Pokémons
console.log("🌱 Création des pokémons...");
const pokemon1 = await Pokemon.create({ name: "Bulbizarre", hp: 45, atk: 49, def: 49, atk_spe: 65, def_spe: 65, speed: 45 });
const pokemon2 = await Pokemon.create({ name: "Herbizarre", hp: 60, atk: 62, def: 63, atk_spe: 80, def_spe: 80, speed: 60 });
const pokemon3 = await Pokemon.create({ name: "Florizarre", hp: 80, atk: 82, def: 83, atk_spe: 100, def_spe: 100, speed: 80 });
const pokemon4 = await Pokemon.create({ name: "Salameche", hp: 39, atk: 52, def: 43, atk_spe: 60, def_spe: 50, speed: 65 });
const pokemon5 = await Pokemon.create({ name: "Reptincel", hp: 58, atk: 64, def: 58, atk_spe: 80, def_spe: 65, speed: 80 });
const pokemon6 = await Pokemon.create({ name: "Dracaufeu", hp: 78, atk: 84, def: 78, atk_spe: 109, def_spe: 85, speed: 100 });
const pokemon7 = await Pokemon.create({ name: "Carapuce", hp: 44, atk: 48, def: 65, atk_spe: 50, def_spe: 64, speed: 43 });
const pokemon8 = await Pokemon.create({ name: "Carabaffe", hp: 59, atk: 63, def: 80, atk_spe: 65, def_spe: 80, speed: 58 });
const pokemon9 = await Pokemon.create({ name: "Tortank", hp: 79, atk: 83, def: 100, atk_spe: 85, def_spe: 105, speed: 78 });
const pokemon10 = await Pokemon.create({ name: "Chenipan", hp: 45, atk: 30, def: 35, atk_spe: 20, def_spe: 20, speed: 45 });
const pokemon11 = await Pokemon.create({ name: "Chrysacier", hp: 50, atk: 20, def: 55, atk_spe: 25, def_spe: 25, speed: 30 });
const pokemon12 = await Pokemon.create({ name: "Papilusion", hp: 60, atk: 45, def: 50, atk_spe: 80, def_spe: 80, speed: 70 });
const pokemon13 = await Pokemon.create({ name: "Aspicot", hp: 40, atk: 35, def: 30, atk_spe: 20, def_spe: 20, speed: 50 });
const pokemon14 = await Pokemon.create({ name: "Coconfort", hp: 45, atk: 25, def: 50, atk_spe: 25, def_spe: 25, speed: 35 });
const pokemon15 = await Pokemon.create({ name: "Dardargnan", hp: 65, atk: 80, def: 40, atk_spe: 45, def_spe: 80, speed: 75 });
const pokemon16 = await Pokemon.create({ name: "Roucool", hp: 40, atk: 45, def: 40, atk_spe: 35, def_spe: 35, speed: 56 });
const pokemon17 = await Pokemon.create({ name: "Roucoups", hp: 63, atk: 60, def: 55, atk_spe: 50, def_spe: 50, speed: 71 });
const pokemon18 = await Pokemon.create({ name: "Roucarnage", hp: 83, atk: 80, def: 75, atk_spe: 70, def_spe: 70, speed: 91 });
const pokemon19 = await Pokemon.create({ name: "Rattata", hp: 30, atk: 56, def: 35, atk_spe: 25, def_spe: 35, speed: 72 });
const pokemon20 = await Pokemon.create({ name: "Rattatac", hp: 55, atk: 81, def: 60, atk_spe: 50, def_spe: 70, speed: 97 });
const pokemon21 = await Pokemon.create({ name: "Piafabec", hp: 40, atk: 60, def: 30, atk_spe: 31, def_spe: 31, speed: 70 });
const pokemon22 = await Pokemon.create({ name: "Rapasdepic", hp: 65, atk: 90, def: 65, atk_spe: 61, def_spe: 61, speed: 100 });
const pokemon23 = await Pokemon.create({ name: "Abo", hp: 35, atk: 60, def: 44, atk_spe: 40, def_spe: 54, speed: 55 });
const pokemon24 = await Pokemon.create({ name: "Arbok", hp: 60, atk: 85, def: 69, atk_spe: 65, def_spe: 79, speed: 80 });
const pokemon25 = await Pokemon.create({ name: "Pikachu", hp: 35, atk: 55, def: 30, atk_spe: 50, def_spe: 40, speed: 90 });
const pokemon26 = await Pokemon.create({ name: "Raichu", hp: 60, atk: 90, def: 55, atk_spe: 90, def_spe: 80, speed: 100 });
const pokemon27 = await Pokemon.create({ name: "Sabelette", hp: 50, atk: 75, def: 85, atk_spe: 20, def_spe: 30, speed: 40 });
const pokemon28 = await Pokemon.create({ name: "Sablaireau", hp: 75, atk: 100, def: 110, atk_spe: 45, def_spe: 55, speed: 65 });
const pokemon29 = await Pokemon.create({ name: "Nidoran F", hp: 55, atk: 47, def: 52, atk_spe: 40, def_spe: 40, speed: 41 });
const pokemon30 = await Pokemon.create({ name: "Nidorina", hp: 70, atk: 62, def: 67, atk_spe: 55, def_spe: 55, speed: 56 });
const pokemon31 = await Pokemon.create({ name: "Nidoqueen", hp: 90, atk: 82, def: 87, atk_spe: 75, def_spe: 85, speed: 76 });
const pokemon32 = await Pokemon.create({ name: "Nidoran M", hp: 46, atk: 57, def: 40, atk_spe: 40, def_spe: 40, speed: 50 });
const pokemon33 = await Pokemon.create({ name: "Nidorino", hp: 61, atk: 72, def: 57, atk_spe: 55, def_spe: 55, speed: 65 });
const pokemon34 = await Pokemon.create({ name: "Nidoking", hp: 81, atk: 92, def: 77, atk_spe: 85, def_spe: 75, speed: 85 });
const pokemon35 = await Pokemon.create({ name: "Melofee", hp: 70, atk: 45, def: 48, atk_spe: 60, def_spe: 65, speed: 35 });
const pokemon36 = await Pokemon.create({ name: "Melodelfe", hp: 95, atk: 70, def: 73, atk_spe: 85, def_spe: 90, speed: 60 });
const pokemon37 = await Pokemon.create({ name: "Goupix", hp: 38, atk: 41, def: 40, atk_spe: 50, def_spe: 65, speed: 65 });
const pokemon38 = await Pokemon.create({ name: "Feunard", hp: 73, atk: 76, def: 75, atk_spe: 81, def_spe: 100, speed: 100 });
const pokemon39 = await Pokemon.create({ name: "Rondoudou", hp: 115, atk: 45, def: 20, atk_spe: 45, def_spe: 25, speed: 20 });
const pokemon40 = await Pokemon.create({ name: "Grodoudou", hp: 140, atk: 70, def: 45, atk_spe: 75, def_spe: 50, speed: 45 });
const pokemon41 = await Pokemon.create({ name: "Nosferapti", hp: 40, atk: 45, def: 35, atk_spe: 30, def_spe: 40, speed: 55 });
const pokemon42 = await Pokemon.create({ name: "Nosferalto", hp: 75, atk: 80, def: 70, atk_spe: 65, def_spe: 75, speed: 90 });
const pokemon43 = await Pokemon.create({ name: "Mystherbe", hp: 45, atk: 50, def: 55, atk_spe: 75, def_spe: 65, speed: 30 });
const pokemon44 = await Pokemon.create({ name: "Ortide", hp: 60, atk: 65, def: 70, atk_spe: 85, def_spe: 75, speed: 40 });
const pokemon45 = await Pokemon.create({ name: "Rafflesia", hp: 75, atk: 80, def: 85, atk_spe: 100, def_spe: 90, speed: 50 });
const pokemon46 = await Pokemon.create({ name: "Paras", hp: 35, atk: 70, def: 55, atk_spe: 45, def_spe: 55, speed: 25 });
const pokemon47 = await Pokemon.create({ name: "Parasect", hp: 60, atk: 95, def: 80, atk_spe: 60, def_spe: 80, speed: 30 });
const pokemon48 = await Pokemon.create({ name: "Mimitoss", hp: 60, atk: 55, def: 50, atk_spe: 40, def_spe: 55, speed: 45 });
const pokemon49 = await Pokemon.create({ name: "Aeromite", hp: 70, atk: 65, def: 60, atk_spe: 90, def_spe: 75, speed: 90 });
const pokemon50 = await Pokemon.create({ name: "Taupiqueur", hp: 10, atk: 55, def: 25, atk_spe: 35, def_spe: 45, speed: 95 });
const pokemon51 = await Pokemon.create({ name: "Triopikeur", hp: 35, atk: 80, def: 50, atk_spe: 50, def_spe: 70, speed: 120 });
const pokemon52 = await Pokemon.create({ name: "Miaouss", hp: 40, atk: 45, def: 35, atk_spe: 40, def_spe: 40, speed: 90 });
const pokemon53 = await Pokemon.create({ name: "Persian", hp: 65, atk: 70, def: 60, atk_spe: 65, def_spe: 65, speed: 115 });
const pokemon54 = await Pokemon.create({ name: "Psykokwak", hp: 50, atk: 52, def: 48, atk_spe: 65, def_spe: 50, speed: 55 });
const pokemon55 = await Pokemon.create({ name: "Akwakwak", hp: 80, atk: 82, def: 78, atk_spe: 95, def_spe: 80, speed: 85 });
const pokemon56 = await Pokemon.create({ name: "Ferosinge", hp: 40, atk: 80, def: 35, atk_spe: 35, def_spe: 45, speed: 70 });
const pokemon57 = await Pokemon.create({ name: "Colossinge", hp: 65, atk: 105, def: 60, atk_spe: 60, def_spe: 70, speed: 95 });
const pokemon58 = await Pokemon.create({ name: "Caninos", hp: 55, atk: 70, def: 45, atk_spe: 70, def_spe: 50, speed: 60 });
const pokemon59 = await Pokemon.create({ name: "Arcanin", hp: 90, atk: 110, def: 80, atk_spe: 100, def_spe: 80, speed: 95 });
const pokemon60 = await Pokemon.create({ name: "Ptitard", hp: 40, atk: 50, def: 40, atk_spe: 40, def_spe: 40, speed: 90 });
const pokemon61 = await Pokemon.create({ name: "Tetarte", hp: 65, atk: 65, def: 65, atk_spe: 50, def_spe: 50, speed: 90 });
const pokemon62 = await Pokemon.create({ name: "Tartard", hp: 90, atk: 85, def: 95, atk_spe: 70, def_spe: 90, speed: 70 });
const pokemon63 = await Pokemon.create({ name: "Abra", hp: 25, atk: 20, def: 15, atk_spe: 105, def_spe: 55, speed: 90 });
const pokemon64 = await Pokemon.create({ name: "Kadabra", hp: 40, atk: 35, def: 30, atk_spe: 120, def_spe: 70, speed: 105 });
const pokemon65 = await Pokemon.create({ name: "Alakazam", hp: 55, atk: 50, def: 45, atk_spe: 135, def_spe: 85, speed: 120 });
const pokemon66 = await Pokemon.create({ name: "Machoc", hp: 70, atk: 80, def: 50, atk_spe: 35, def_spe: 35, speed: 35 });
const pokemon67 = await Pokemon.create({ name: "Machopeur", hp: 80, atk: 100, def: 70, atk_spe: 50, def_spe: 60, speed: 45 });
const pokemon68 = await Pokemon.create({ name: "Mackogneur", hp: 90, atk: 130, def: 80, atk_spe: 65, def_spe: 85, speed: 55 });
const pokemon69 = await Pokemon.create({ name: "Chetiflor", hp: 50, atk: 75, def: 35, atk_spe: 70, def_spe: 30, speed:40 });
const pokemon70 = await Pokemon.create({ name: "Boustiflor", hp: 65, atk: 90, def: 50, atk_spe: 85, def_spe: 45, speed: 55 });
const pokemon71 = await Pokemon.create({ name: "Empiflor", hp: 80, atk: 105, def: 65, atk_spe: 100, def_spe: 60, speed: 70 });
const pokemon72 = await Pokemon.create({ name: "Tentacool", hp: 40, atk: 40, def: 35, atk_spe: 50, def_spe: 100, speed: 70 });
const pokemon73 = await Pokemon.create({ name: "Tentacruel", hp: 80, atk: 70, def: 65, atk_spe: 80, def_spe: 120, speed: 100 });
const pokemon74 = await Pokemon.create({ name: "Racaillou", hp: 40, atk: 80, def: 100, atk_spe: 30, def_spe: 30, speed: 20 });
const pokemon75 = await Pokemon.create({ name: "Gravalanch", hp: 55, atk: 95, def: 115, atk_spe: 45, def_spe: 45, speed: 35 });
const pokemon76 = await Pokemon.create({ name: "Grolem", hp: 80, atk: 110, def: 130, atk_spe: 55, def_spe: 65, speed: 45 });
const pokemon77 = await Pokemon.create({ name: "Ponyta", hp: 50, atk: 85, def: 55, atk_spe: 65, def_spe: 65, speed: 90 });
const pokemon78 = await Pokemon.create({ name: "Galopa", hp: 65, atk: 100, def: 70, atk_spe: 80, def_spe: 80, speed: 105 });
const pokemon79 = await Pokemon.create({ name: "Ramoloss", hp: 90, atk: 65, def: 65, atk_spe: 40, def_spe: 40, speed: 15 });
const pokemon80 = await Pokemon.create({ name: "Flagadoss", hp: 95, atk: 75, def: 110, atk_spe: 100, def_spe: 80, speed: 30 });
const pokemon81 = await Pokemon.create({ name: "Magneti", hp: 25, atk: 35, def: 70, atk_spe: 95, def_spe: 55, speed: 45 });
const pokemon82 = await Pokemon.create({ name: "Magneton", hp: 50, atk: 60, def: 95, atk_spe: 120, def_spe: 70, speed: 70 });
const pokemon83 = await Pokemon.create({ name: "Canarticho", hp: 52, atk: 65, def: 55, atk_spe: 58, def_spe: 62, speed: 60 });
const pokemon84 = await Pokemon.create({ name: "Doduo", hp: 35, atk: 85, def: 45, atk_spe: 35, def_spe: 35, speed: 75 });
const pokemon85 = await Pokemon.create({ name: "Dodrio", hp: 60, atk: 110, def: 70, atk_spe: 60, def_spe: 60, speed: 100 });
const pokemon86 = await Pokemon.create({ name: "Otaria", hp: 65, atk: 45, def: 55, atk_spe: 45, def_spe: 70, speed: 45 });
const pokemon87 = await Pokemon.create({ name: "Lamantine", hp: 90, atk: 70, def: 80, atk_spe: 70, def_spe: 95, speed: 70 });
const pokemon88 = await Pokemon.create({ name: "Tadmorv", hp: 80, atk: 80, def: 50, atk_spe: 40, def_spe: 50, speed: 25 });
const pokemon89 = await Pokemon.create({ name: "Grotadmorv", hp: 105, atk: 105, def: 75, atk_spe: 65, def_spe: 100, speed: 50 });
const pokemon90 = await Pokemon.create({ name: "Kokiyas", hp: 30, atk: 65, def: 100, atk_spe: 45, def_spe: 25, speed: 40 });
const pokemon91 = await Pokemon.create({ name: "Crustabri", hp: 50, atk: 95, def: 180, atk_spe: 85, def_spe: 45, speed: 70 });
const pokemon92 = await Pokemon.create({ name: "Fantominus", hp: 30, atk: 35, def: 30, atk_spe: 100, def_spe: 35, speed: 80 });
const pokemon93 = await Pokemon.create({ name: "Spectrum", hp: 45, atk: 50, def: 45, atk_spe: 115, def_spe: 55, speed: 95 });
const pokemon94 = await Pokemon.create({ name: "Ectoplasma", hp: 60, atk: 65, def: 60, atk_spe: 130, def_spe: 75, speed: 110 });
const pokemon95 = await Pokemon.create({ name: "Onix", hp: 35, atk: 45, def: 160, atk_spe: 30, def_spe: 45, speed: 70 });
const pokemon96 = await Pokemon.create({ name: "Soporifik", hp: 60, atk: 48, def: 45, atk_spe: 43, def_spe: 90, speed: 42 });
const pokemon97 = await Pokemon.create({ name: "Hypnomade", hp: 85, atk: 73, def: 70, atk_spe: 73, def_spe: 115, speed: 67 });
const pokemon98 = await Pokemon.create({ name: "Krabby", hp: 30, atk: 105, def: 90, atk_spe: 25, def_spe: 25, speed: 50 });
const pokemon99 = await Pokemon.create({ name: "Krabboss", hp: 55, atk: 130, def: 115, atk_spe: 50, def_spe: 50, speed: 75 });
const pokemon100 = await Pokemon.create({ name: "Voltorbe", hp: 40, atk: 30, def: 50, atk_spe: 55, def_spe: 55, speed: 100 });
const pokemon101 = await Pokemon.create({ name: "Electrode", hp: 60, atk: 50, def: 70, atk_spe: 80, def_spe: 80, speed: 140 });
const pokemon102 = await Pokemon.create({ name: "Noeunoeuf", hp: 60, atk: 40, def: 80, atk_spe: 60, def_spe: 45, speed: 40 });
const pokemon103 = await Pokemon.create({ name: "Noadkoko", hp: 95, atk: 95, def: 85, atk_spe: 125, def_spe: 65, speed: 55 });
const pokemon104 = await Pokemon.create({ name: "Osselait", hp: 50, atk: 50, def: 95, atk_spe: 40, def_spe: 50, speed: 35 });
const pokemon105 = await Pokemon.create({ name: "Ossatueur", hp: 60, atk: 80, def: 110, atk_spe: 50, def_spe: 80, speed: 45 });
const pokemon106 = await Pokemon.create({ name: "Kicklee", hp: 50, atk: 120, def: 53, atk_spe: 35, def_spe: 110, speed: 87 });
const pokemon107 = await Pokemon.create({ name: "Tygnon", hp: 50, atk: 105, def: 79, atk_spe: 35, def_spe: 110, speed: 76 });
const pokemon108 = await Pokemon.create({ name: "Excelangue", hp: 90, atk: 55, def: 75, atk_spe: 60, def_spe: 75, speed: 30 });
const pokemon109 = await Pokemon.create({ name: "Smogo", hp: 40, atk: 65, def: 95, atk_spe: 60, def_spe: 45, speed: 35 });
const pokemon110 = await Pokemon.create({ name: "Smogogo", hp: 65, atk: 90, def: 120, atk_spe: 85, def_spe: 70, speed: 60 });
const pokemon111 = await Pokemon.create({ name: "Rhinocorne", hp: 80, atk: 85, def: 95, atk_spe: 30, def_spe: 30, speed: 25 });
const pokemon112 = await Pokemon.create({ name: "Rhinoferos", hp: 105, atk: 130, def: 120, atk_spe: 45, def_spe: 45, speed: 40 });
const pokemon113 = await Pokemon.create({ name: "Leveinard", hp: 250, atk: 5, def: 5, atk_spe: 35, def_spe: 105, speed: 50 });
const pokemon114 = await Pokemon.create({ name: "Saquedeneu", hp: 65, atk: 55, def: 115, atk_spe: 100, def_spe: 40, speed: 60 });
const pokemon115 = await Pokemon.create({ name: "Kangourex", hp: 105, atk: 95, def: 80, atk_spe: 40, def_spe: 80, speed: 90 });
const pokemon116 = await Pokemon.create({ name: "Hypotrempe", hp: 30, atk: 40, def: 70, atk_spe: 70, def_spe: 25, speed: 60 });
const pokemon117 = await Pokemon.create({ name: "Hypocean", hp: 55, atk: 65, def: 95, atk_spe: 95, def_spe: 45, speed: 85 });
const pokemon118 = await Pokemon.create({ name: "Poissirene", hp: 45, atk: 67, def: 60, atk_spe: 35, def_spe: 50, speed: 63 });
const pokemon119 = await Pokemon.create({ name: "Poissoroy", hp: 80, atk: 92, def: 65, atk_spe: 65, def_spe: 80, speed: 68 });
const pokemon120 = await Pokemon.create({ name: "Stari", hp: 30, atk: 45, def: 55, atk_spe: 70, def_spe: 55, speed: 85 });
const pokemon121 = await Pokemon.create({ name: "Staross", hp: 60, atk: 75, def: 85, atk_spe: 100, def_spe: 85, speed: 115 });
const pokemon122 = await Pokemon.create({ name: "M.Mime", hp: 40, atk: 45, def: 65, atk_spe: 100, def_spe: 120, speed: 90 });
const pokemon123 = await Pokemon.create({ name: "Insecateur", hp: 70, atk: 110, def: 80, atk_spe: 55, def_spe: 80, speed: 105 });
const pokemon124 = await Pokemon.create({ name: "Lippoutou", hp: 65, atk: 50, def: 35, atk_spe: 115, def_spe: 95, speed: 95 });
const pokemon125 = await Pokemon.create({ name: "Elektek", hp: 65, atk: 83, def: 57, atk_spe: 95, def_spe: 85, speed: 105 });
const pokemon126 = await Pokemon.create({ name: "Magmar", hp: 65, atk: 95, def: 57, atk_spe: 100, def_spe: 85, speed: 93 });
const pokemon127 = await Pokemon.create({ name: "Scarabrute", hp: 65, atk: 125, def: 100, atk_spe: 55, def_spe: 70, speed: 85 });
const pokemon128 = await Pokemon.create({ name: "Tauros", hp: 75, atk: 100, def: 95, atk_spe: 40, def_spe: 70, speed: 110 });
const pokemon129 = await Pokemon.create({ name: "Magicarpe", hp: 20, atk: 10, def: 55, atk_spe: 15, def_spe: 20, speed: 80 });
const pokemon130 = await Pokemon.create({ name: "Leviator", hp: 95, atk: 125, def: 79, atk_spe: 60, def_spe: 100, speed: 81 });
const pokemon131 = await Pokemon.create({ name: "Lokhlass", hp: 130, atk: 85, def: 80, atk_spe: 85, def_spe: 95, speed: 60 });
const pokemon132 = await Pokemon.create({ name: "Metamorph", hp: 48, atk: 48, def: 48, atk_spe: 48, def_spe: 48, speed: 48 });
const pokemon133 = await Pokemon.create({ name: "Evoli", hp: 55, atk: 55, def: 50, atk_spe: 45, def_spe: 65, speed: 55 });
const pokemon134 = await Pokemon.create({ name: "Aquali", hp: 130, atk: 65, def: 60, atk_spe: 110, def_spe: 95, speed: 65 });
const pokemon135 = await Pokemon.create({ name: "Voltali", hp: 65, atk: 65, def: 60, atk_spe: 110, def_spe: 95, speed: 130 });
const pokemon136 = await Pokemon.create({ name: "Pyroli", hp: 65, atk: 130, def: 60, atk_spe: 95, def_spe: 110, speed: 65 });
const pokemon137 = await Pokemon.create({ name: "Porygon", hp: 65, atk: 60, def: 70, atk_spe: 85, def_spe: 75, speed: 40 });
const pokemon138 = await Pokemon.create({ name: "Amonita", hp: 35, atk: 40, def: 100, atk_spe: 90, def_spe: 55, speed: 35 });
const pokemon139 = await Pokemon.create({ name: "Amonistar", hp: 70, atk: 60, def: 125, atk_spe: 115, def_spe: 70, speed: 55 });
const pokemon140 = await Pokemon.create({ name: "Kabuto", hp: 30, atk: 80, def: 90, atk_spe: 55, def_spe: 45, speed: 55 });
const pokemon141 = await Pokemon.create({ name: "Kabutops", hp: 60, atk: 115, def: 105, atk_spe: 65, def_spe: 70, speed: 80 });
const pokemon142 = await Pokemon.create({ name: "Ptera", hp: 80, atk: 105, def: 65, atk_spe: 60, def_spe: 75, speed: 130 });
const pokemon143 = await Pokemon.create({ name: "Ronflex", hp: 160, atk: 110, def: 65, atk_spe: 65, def_spe: 110, speed: 30 });
const pokemon144 = await Pokemon.create({ name: "Artikodin", hp: 90, atk: 85, def: 100, atk_spe: 95, def_spe: 125, speed: 85 });
const pokemon145 = await Pokemon.create({ name: "Electhor", hp: 90, atk: 90, def: 85, atk_spe: 125, def_spe: 90, speed: 100 });
const pokemon146 = await Pokemon.create({ name: "Sulfura", hp: 90, atk: 100, def: 90, atk_spe: 125, def_spe: 85, speed: 90 });
const pokemon147 = await Pokemon.create({ name: "Minidraco", hp: 41, atk: 64, def: 45, atk_spe: 50, def_spe: 50, speed: 50 });
const pokemon148 = await Pokemon.create({ name: "Draco", hp: 61, atk: 84, def: 65, atk_spe: 70, def_spe: 70, speed: 70 });
const pokemon149 = await Pokemon.create({ name: "Dracolosse", hp: 91, atk: 134, def: 95, atk_spe: 100, def_spe: 100, speed: 80 });
const pokemon150 = await Pokemon.create({ name: "Mewtwo", hp: 106, atk: 110, def: 90, atk_spe: 154, def_spe: 90, speed: 130 });
const pokemon151 = await Pokemon.create({ name: "Mew", hp: 100, atk: 100, def: 100, atk_spe: 100, def_spe: 100, speed: 100 });
console.log("✅ Pokémons créés\n");

// Association des types aux pokémons (équivalent de la table pokemon_type du SQL)
console.log("🌱 Association des types aux pokémons...");

// Rappel pour moi: les id des types suivent l'ordre de création plus haut :
// 1 Acier, 2 Combat, 3 Dragon, 4 Eau, 5 Electrik, 6 Feu, 7 Glace, 8 Insecte, 9 Normal,
// 10 Plante, 11 Poison, 12 Psy, 13 Roche, 14 Sol, 15 Spectre, 16 Ténèbres, 17 Vol
//
// Pour chaque pokémon, dans l'ordre (du n°1 au n°151) : les id de ses types
const typeIdsByPokemon = [
  [10, 11], // 1 Bulbizarre
  [10, 11], // 2 Herbizarre
  [10, 11], // 3 Florizarre
  [6], // 4 Salameche
  [6], // 5 Reptincel
  [6, 17], // 6 Dracaufeu
  [4], // 7 Carapuce
  [4], // 8 Carabaffe
  [4], // 9 Tortank
  [8], // 10 Chenipan
  [8], // 11 Chrysacier
  [8, 17], // 12 Papilusion
  [8, 11], // 13 Aspicot
  [8, 11], // 14 Coconfort
  [8, 11], // 15 Dardargnan
  [9, 17], // 16 Roucool
  [9, 17], // 17 Roucoups
  [9, 17], // 18 Roucarnage
  [9], // 19 Rattata
  [9], // 20 Rattatac
  [9, 17], // 21 Piafabec
  [9, 17], // 22 Rapasdepic
  [11], // 23 Abo
  [11], // 24 Arbok
  [5], // 25 Pikachu
  [5], // 26 Raichu
  [14], // 27 Sabelette
  [14], // 28 Sablaireau
  [11], // 29 Nidoran F
  [11], // 30 Nidorina
  [11, 14], // 31 Nidoqueen
  [11], // 32 Nidoran M
  [11], // 33 Nidorino
  [11, 14], // 34 Nidoking
  [9], // 35 Melofee
  [9], // 36 Melodelfe
  [6], // 37 Goupix
  [6], // 38 Feunard
  [9], // 39 Rondoudou
  [9], // 40 Grodoudou
  [11, 17], // 41 Nosferapti
  [11, 17], // 42 Nosferalto
  [10, 11], // 43 Mystherbe
  [10, 11], // 44 Ortide
  [10, 11], // 45 Rafflesia
  [8, 10], // 46 Paras
  [8, 10], // 47 Parasect
  [8, 11], // 48 Mimitoss
  [8, 11], // 49 Aeromite
  [14], // 50 Taupiqueur
  [14], // 51 Triopikeur
  [9], // 52 Miaouss
  [9], // 53 Persian
  [4], // 54 Psykokwak
  [4], // 55 Akwakwak
  [2], // 56 Ferosinge
  [2], // 57 Colossinge
  [6], // 58 Caninos
  [6], // 59 Arcanin
  [4], // 60 Ptitard
  [4], // 61 Tetarte
  [4, 2], // 62 Tartard
  [12], // 63 Abra
  [12], // 64 Kadabra
  [12], // 65 Alakazam
  [2], // 66 Machoc
  [2], // 67 Machopeur
  [2], // 68 Mackogneur
  [10, 11], // 69 Chetiflor
  [10, 11], // 70 Boustiflor
  [10, 11], // 71 Empiflor
  [4, 11], // 72 Tentacool
  [4, 11], // 73 Tentacruel
  [13, 14], // 74 Racaillou
  [13, 14], // 75 Gravalanch
  [13, 14], // 76 Grolem
  [6], // 77 Ponyta
  [6], // 78 Galopa
  [4, 12], // 79 Ramoloss
  [4, 12], // 80 Flagadoss
  [5, 1], // 81 Magneti
  [5, 1], // 82 Magneton
  [9, 17], // 83 Canarticho
  [9, 17], // 84 Doduo
  [9, 17], // 85 Dodrio
  [4], // 86 Otaria
  [4, 7], // 87 Lamantine
  [11], // 88 Tadmorv
  [11], // 89 Grotadmorv
  [4], // 90 Kokiyas
  [4, 7], // 91 Crustabri
  [15, 11], // 92 Fantominus
  [15, 11], // 93 Spectrum
  [15, 11], // 94 Ectoplasma
  [13, 14], // 95 Onix
  [12], // 96 Soporifik
  [12], // 97 Hypnomade
  [4], // 98 Krabby
  [4], // 99 Krabboss
  [5], // 100 Voltorbe
  [5], // 101 Electrode
  [10, 12], // 102 Noeunoeuf
  [10, 12], // 103 Noadkoko
  [14], // 104 Osselait
  [14], // 105 Ossatueur
  [2], // 106 Kicklee
  [2], // 107 Tygnon
  [9], // 108 Excelangue
  [11], // 109 Smogo
  [11], // 110 Smogogo
  [14, 13], // 111 Rhinocorne
  [14, 13], // 112 Rhinoferos
  [9], // 113 Leveinard
  [10], // 114 Saquedeneu
  [9], // 115 Kangourex
  [4], // 116 Hypotrempe
  [4], // 117 Hypocean
  [4], // 118 Poissirene
  [4], // 119 Poissoroy
  [4], // 120 Stari
  [4, 12], // 121 Staross
  [12], // 122 M.Mime
  [8, 17], // 123 Insecateur
  [7, 12], // 124 Lippoutou
  [5], // 125 Elektek
  [6], // 126 Magmar
  [8], // 127 Scarabrute
  [9], // 128 Tauros
  [4], // 129 Magicarpe
  [4, 17], // 130 Leviator
  [4, 7], // 131 Lokhlass
  [9], // 132 Metamorph
  [9], // 133 Evoli
  [4], // 134 Aquali
  [5], // 135 Voltali
  [6], // 136 Pyroli
  [9], // 137 Porygon
  [13, 4], // 138 Amonita
  [13, 4], // 139 Amonistar
  [13, 4], // 140 Kabuto
  [13, 4], // 141 Kabutops
  [13, 17], // 142 Ptera
  [9], // 143 Ronflex
  [7, 17], // 144 Artikodin
  [5, 17], // 145 Electhor
  [6, 17], // 146 Sulfura
  [3], // 147 Minidraco
  [3], // 148 Draco
  [3, 17], // 149 Dracolosse
  [12], // 150 Mewtwo
  [12], // 151 Mew
];

for (let i = 0; i < typeIdsByPokemon.length; i++) {
  // L'id du pokémon est son numéro (i + 1), car ils ont été créés dans l'ordre
  const pokemon = await Pokemon.findByPk(i + 1);
  // setTypes remplit la table de liaison pokemon_type
  await pokemon.setTypes(typeIdsByPokemon[i]);
}
console.log("✅ Types associés aux pokémons\n");

// Créations des équipes
console.log("🌱 Création des équipes...");
const team1 = await Team.create({ name: "Ultimate Team", description: "La meilleure team du monde" });
const team2 = await Team.create({ name: "La Team de l'enfer", description: "Le feuuuuu" });
const team3 = await Team.create({ name: "Squad fofolle", description: "Pour tout gagner" });
console.log("✅ Équipes créées\n");

// Association des pokémons aux équipes
console.log("🌱 Association des pokémons aux équipes...");
await team1.addPokemons([pokemon3, pokemon6, pokemon9, pokemon12, pokemon15, pokemon34]);
await team2.addPokemons([pokemon6, pokemon38, pokemon59, pokemon126, pokemon136, pokemon146]);
await team3.addPokemons([pokemon151, pokemon150, pokemon149, pokemon146, pokemon145, pokemon144]);
console.log("✅ Pokémons associés aux équipes\n");

// Fermeture de la connexion
await sequelize.close();