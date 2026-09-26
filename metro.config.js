const { getDefaultConfig } = require('expo/metro-config');
const { withNativeWind } = require('nativewind/metro');

const config = getDefaultConfig(__dirname);

// O Metro sobe um worker de transform por núcleo (10 numa CPU de 16), cada um
// com ~230 MB de Babel + NativeWind. Num notebook de 8 GB isso estoura a RAM no
// bundle frio e o OOM killer derruba o `expo start` (exit 137). Com 2 workers o
// bundle frio de iOS fica em ~1,35 GB e só ~3 s mais lento que com 4.
config.maxWorkers = 2;

module.exports = withNativeWind(config, { input: './global.css' });
