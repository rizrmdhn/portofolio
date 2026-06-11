//#region ../../node_modules/.pnpm/uuid@14.0.0/node_modules/uuid/dist-node/stringify.js
var byteToHex = [];
for (let i = 0; i < 256; ++i) byteToHex.push((i + 256).toString(16).slice(1));
function unsafeStringify(arr, offset = 0) {
	return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
//#endregion
//#region ../../node_modules/.pnpm/uuid@14.0.0/node_modules/uuid/dist-node/rng.js
var rnds8 = new Uint8Array(16);
function rng() {
	return crypto.getRandomValues(rnds8);
}
//#endregion
//#region ../../node_modules/.pnpm/uuid@14.0.0/node_modules/uuid/dist-node/v7.js
var _state = {};
function v7(options, buf, offset) {
	let bytes;
	if (options) bytes = v7Bytes(options.random ?? options.rng?.() ?? rng(), options.msecs, options.seq, buf, offset);
	else {
		const now = Date.now();
		const rnds = rng();
		updateV7State(_state, now, rnds);
		bytes = v7Bytes(rnds, _state.msecs, _state.seq, buf, offset);
	}
	return buf ?? unsafeStringify(bytes);
}
function updateV7State(state, now, rnds) {
	state.msecs ??= -Infinity;
	state.seq ??= 0;
	if (now > state.msecs) {
		state.seq = rnds[6] << 23 | rnds[7] << 16 | rnds[8] << 8 | rnds[9];
		state.msecs = now;
	} else {
		state.seq = state.seq + 1 | 0;
		if (state.seq === 0) state.msecs++;
	}
	return state;
}
function v7Bytes(rnds, msecs, seq, buf, offset = 0) {
	if (rnds.length < 16) throw new Error("Random bytes length must be >= 16");
	if (!buf) {
		buf = new Uint8Array(16);
		offset = 0;
	} else if (offset < 0 || offset + 16 > buf.length) throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
	msecs ??= Date.now();
	seq ??= rnds[6] * 127 << 24 | rnds[7] << 16 | rnds[8] << 8 | rnds[9];
	buf[offset++] = msecs / 1099511627776 & 255;
	buf[offset++] = msecs / 4294967296 & 255;
	buf[offset++] = msecs / 16777216 & 255;
	buf[offset++] = msecs / 65536 & 255;
	buf[offset++] = msecs / 256 & 255;
	buf[offset++] = msecs & 255;
	buf[offset++] = 112 | seq >>> 28 & 15;
	buf[offset++] = seq >>> 20 & 255;
	buf[offset++] = 128 | seq >>> 14 & 63;
	buf[offset++] = seq >>> 6 & 255;
	buf[offset++] = seq << 2 & 255 | rnds[10] & 3;
	buf[offset++] = rnds[11];
	buf[offset++] = rnds[12];
	buf[offset++] = rnds[13];
	buf[offset++] = rnds[14];
	buf[offset++] = rnds[15];
	return buf;
}
//#endregion
export { v7 as t };
