const BIOME_COUNT = 5;
const SOUND_COUNT = 5;

const RENDER_SIZE = 4096;

// Sounds per biome
let sounds = [];
const FOREST = ["forest/ambient_forest_v1.wav", "forest/eulemur_mongoz_v1.wav", "forest/gorilla_gorilla_v1.wav", "forest/mitu_mitu_v1.wav", "forest/pongo_pygmaeus_v1.wav"];
const SHRUBLAND = ["base.wav", "ambient", "ambient", "ambient", "ambient"];
const SAVANNA =  ["ambient", "base.wav", "base.wav", "base.wav", "base.wav"];
const DESERT = ["forest/ambient_forest_v1.wav", "desert/diceros_bicornis_v1.wav", "desert/gyps_africanus_v1.wav", "desert/oryx_dammah_v1.wav", "desert/saiga_tatarica_v1.wav"];
const GRASSLAND= ["ambient", "base.wav", "base.wav", "base.wav", "base.wav"];

const PATHS = [FOREST, SHRUBLAND, SAVANNA, DESERT, GRASSLAND];

// Animal names per biome
const FOREST_NAMES = ["Mongoose Lemur", "Western Gorilla", "Alagoas Curassow", "Bornean Orangutan"];
const SHRUBLAND_NAMES = ["Animal", "Animal", "Animal", "Animal"];
const SAVANNA_NAMES =  ["Animal", "Animal", "Animal", "Animal"];
const DESERT_NAMES = ["Black Rhinoceros", "White-backed Vulture", "Scimitar-horned Oryx", "Saiga Antelope"]
const GRASSLAND_NAMES = ["Animal", "Animal", "Animal", "Animal"];

const NAMES = [FOREST_NAMES, SHRUBLAND_NAMES, SAVANNA_NAMES, DESERT_NAMES, GRASSLAND_NAMES];