/**
 * DEFINICIÓN DE COMPONENTES DIGITALES Y SÍMBOLOS ESQUEMÁTICOS PUROS (IEEE / TTL 74LS)
 * Nodos sin tarjetas rectangulares envolventes: Compuertas puras, Terminales I/O, Trapecios MUX y Bloques IC
 */

window.COMPONENT_DEFS = {
  INPUT: {
    name: 'Entrada Lógica',
    sub: 'Terminal binario interactivo (0 / 1)',
    ic: 'IN',
    kind: 'io_in',
    family: 'Entrada Digital',
    manufacturer: 'DigiLab I/O',
    pkg: 'Terminal Lógico',
    inputs: [],
    outputs: ['Q'],
    width: 82,
    height: 36,
    pinYInputs: [],
    pinYOutputs: [18],
    evaluate: (inVals, state) => [state && state[0] ? 1 : 0]
  },
  VCC: {
    name: 'Fuente +Vcc (1)',
    sub: 'Nivel alto constante (+5V)',
    ic: '+5V',
    kind: 'io_in',
    family: 'Alimentación TTL',
    manufacturer: 'DigiLab Power',
    pkg: 'Terminal +Vcc',
    inputs: [],
    outputs: ['1'],
    width: 82,
    height: 36,
    pinYInputs: [],
    pinYOutputs: [18],
    evaluate: () => [1]
  },
  GND: {
    name: 'Tierra GND (0)',
    sub: 'Nivel bajo constante (0V)',
    ic: '0V',
    kind: 'io_in',
    family: 'Alimentación TTL',
    manufacturer: 'DigiLab Power',
    pkg: 'Terminal GND',
    inputs: [],
    outputs: ['0'],
    width: 82,
    height: 36,
    pinYInputs: [],
    pinYOutputs: [18],
    evaluate: () => [0]
  },
  OUTPUT: {
    name: 'Salida Lógica (LED)',
    sub: 'Monitor de salida (1 bit)',
    ic: 'OUT',
    kind: 'io_out',
    family: 'Salida Visual',
    manufacturer: 'DigiLab Optics',
    pkg: 'LED Esquemático',
    inputs: ['In'],
    outputs: [],
    width: 92,
    height: 36,
    pinYInputs: [18],
    pinYOutputs: [],
    evaluate: (inVals) => [inVals[0] ? 1 : 0]
  },
  HEX_DISPLAY: {
    name: 'Display Hex 4-Bits',
    sub: 'Visualizador Hex / Dec (0-F)',
    ic: 'HEX',
    kind: 'hex',
    family: 'Visualizador 7-Seg',
    manufacturer: 'DigiLab Optics',
    pkg: 'Display 4-Bits',
    inputs: ['D3', 'D2', 'D1', 'D0'],
    outputs: [],
    width: 112,
    height: 120,
    pinYInputs: [24, 48, 72, 96],
    pinYOutputs: [],
    evaluate: (inVals) => {
      const val = ((inVals[0] || 0) << 3) | ((inVals[1] || 0) << 2) | ((inVals[2] || 0) << 1) | (inVals[3] || 0);
      return [val];
    }
  },

  // COMPUERTAS LÓGICAS ESQUEMÁTICAS PURAS (ESTÁNDAR IEEE)
  AND: {
    name: 'Compuerta AND',
    sub: 'Puerta lógica AND (2 entradas)',
    ic: '74LS08',
    kind: 'gate',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-14',
    inputs: ['A', 'B'],
    outputs: ['Y'],
    width: 96,
    height: 60,
    pinYInputs: [16, 44],
    pinYOutputs: [30],
    formula: 'Y = A · B',
    desc: 'Salida en 1 solo cuando todas las entradas son 1.',
    evaluate: (inVals) => [(inVals[0] & inVals[1]) ? 1 : 0]
  },
  OR: {
    name: 'Compuerta OR',
    sub: 'Puerta lógica OR (2 entradas)',
    ic: '74LS32',
    kind: 'gate',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-14',
    inputs: ['A', 'B'],
    outputs: ['Y'],
    width: 96,
    height: 60,
    pinYInputs: [16, 44],
    pinYOutputs: [30],
    formula: 'Y = A + B',
    desc: 'Salida en 1 cuando al menos una entrada es 1.',
    evaluate: (inVals) => [(inVals[0] | inVals[1]) ? 1 : 0]
  },
  NOT: {
    name: 'Compuerta NOT',
    sub: 'Inversor lógico (1 entrada)',
    ic: '74LS04',
    kind: 'gate',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-14',
    inputs: ['A'],
    outputs: ['Y'],
    width: 88,
    height: 52,
    pinYInputs: [26],
    pinYOutputs: [26],
    formula: "Y = A'",
    desc: 'Invierte el nivel lógico de su entrada.',
    evaluate: (inVals) => [inVals[0] ? 0 : 1]
  },
  NAND: {
    name: 'Compuerta NAND',
    sub: 'Puerta lógica NAND (2 entradas)',
    ic: '74LS00',
    kind: 'gate',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-14',
    inputs: ['A', 'B'],
    outputs: ['Y'],
    width: 100,
    height: 60,
    pinYInputs: [16, 44],
    pinYOutputs: [30],
    formula: "Y = (A · B)'",
    desc: 'Salida en 0 solo cuando ambas entradas son 1.',
    evaluate: (inVals) => [(inVals[0] & inVals[1]) ? 0 : 1]
  },
  NOR: {
    name: 'Compuerta NOR',
    sub: 'Puerta lógica NOR (2 entradas)',
    ic: '74LS02',
    kind: 'gate',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-14',
    inputs: ['A', 'B'],
    outputs: ['Y'],
    width: 100,
    height: 60,
    pinYInputs: [16, 44],
    pinYOutputs: [30],
    formula: "Y = (A + B)'",
    desc: 'Salida en 1 solo cuando todas las entradas son 0.',
    evaluate: (inVals) => [(inVals[0] | inVals[1]) ? 0 : 1]
  },
  XOR: {
    name: 'Compuerta XOR',
    sub: 'Puerta lógica XOR (2 entradas)',
    ic: '74LS86',
    kind: 'gate',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-14',
    inputs: ['A', 'B'],
    outputs: ['Y'],
    width: 100,
    height: 60,
    pinYInputs: [16, 44],
    pinYOutputs: [30],
    formula: 'Y = A ⊕ B',
    desc: 'Salida en 1 cuando las entradas son diferentes.',
    evaluate: (inVals) => [(inVals[0] ^ inVals[1]) ? 1 : 0]
  },
  XNOR: {
    name: 'Compuerta XNOR',
    sub: 'Puerta lógica XNOR (Equivalencia)',
    ic: '74LS266',
    kind: 'gate',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-14',
    inputs: ['A', 'B'],
    outputs: ['Y'],
    width: 104,
    height: 60,
    pinYInputs: [16, 44],
    pinYOutputs: [30],
    formula: "Y = (A ⊕ B)'",
    desc: 'Salida en 1 cuando ambas entradas son iguales.',
    evaluate: (inVals) => [(inVals[0] ^ inVals[1]) ? 0 : 1]
  },
  AND3: {
    name: 'Compuerta AND 3-In',
    sub: 'Triple AND de 3 entradas',
    ic: '74LS11',
    kind: 'gate',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-14',
    inputs: ['A', 'B', 'C'],
    outputs: ['Y'],
    width: 98,
    height: 72,
    pinYInputs: [16, 36, 56],
    pinYOutputs: [36],
    formula: 'Y = A · B · C',
    desc: 'Salida en 1 cuando las 3 entradas son 1 (TTL 74LS11).',
    evaluate: (inVals) => [(inVals[0] & inVals[1] & inVals[2]) ? 1 : 0]
  },
  AND4: {
    name: 'Compuerta AND 4-In',
    sub: 'Dual AND de 4 entradas',
    ic: '74LS21',
    kind: 'gate',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-14',
    inputs: ['A', 'B', 'C', 'D'],
    outputs: ['Y'],
    width: 104,
    height: 90,
    pinYInputs: [16, 36, 56, 74],
    pinYOutputs: [45],
    formula: 'Y = A · B · C · D',
    desc: 'Salida en 1 únicamente cuando las 4 entradas son 1 (TTL 74LS21).',
    evaluate: (inVals) => [(inVals[0] & inVals[1] & inVals[2] & inVals[3]) ? 1 : 0]
  },
  AND8: {
    name: 'Compuerta AND 8-In',
    sub: 'AND de 8 entradas (Decodificador)',
    ic: 'AND-8',
    kind: 'ic',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-14',
    inputs: ['I0', 'I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7'],
    outputs: ['Y'],
    width: 126,
    height: 196,
    formula: 'Y = I0 · I1 · ... · I7',
    desc: 'Salida en 1 únicamente cuando las 8 entradas son 1.',
    evaluate: (inVals) => [inVals.every((v) => v === 1) ? 1 : 0]
  },
  NAND3: {
    name: 'Compuerta NAND 3-In',
    sub: 'Triple NAND de 3 entradas',
    ic: '74LS10',
    kind: 'gate',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-14',
    inputs: ['A', 'B', 'C'],
    outputs: ['Y'],
    width: 100,
    height: 72,
    pinYInputs: [16, 36, 56],
    pinYOutputs: [36],
    formula: "Y = (A · B · C)'",
    desc: 'Salida en 0 únicamente cuando las 3 entradas son 1 (TTL 74LS10).',
    evaluate: (inVals) => [(inVals[0] & inVals[1] & inVals[2]) ? 0 : 1]
  },
  NAND4: {
    name: 'Compuerta NAND 4-In',
    sub: 'Dual NAND de 4 entradas',
    ic: '74LS20',
    kind: 'gate',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-14',
    inputs: ['A', 'B', 'C', 'D'],
    outputs: ['Y'],
    width: 102,
    height: 88,
    pinYInputs: [16, 34, 54, 72],
    pinYOutputs: [44],
    formula: "Y = (A·B·C·D)'",
    desc: 'NAND de 4 entradas TTL 74LS20.',
    evaluate: (inVals) => [(inVals[0] & inVals[1] & inVals[2] & inVals[3]) ? 0 : 1]
  },
  NAND8: {
    name: 'Compuerta NAND 8-In',
    sub: 'NAND de 8 entradas (TTL 74LS30)',
    ic: '74LS30',
    kind: 'ic',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-14',
    inputs: ['I0', 'I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7'],
    outputs: ['Y'],
    width: 126,
    height: 196,
    formula: "Y = (I0·I1·...·I7)'",
    desc: 'Salida en 0 únicamente cuando las 8 entradas son 1 (TTL 74LS30).',
    evaluate: (inVals) => [inVals.every((v) => v === 1) ? 0 : 1]
  },
  OR3: {
    name: 'Compuerta OR 3-In',
    sub: 'Triple OR de 3 entradas',
    ic: '74LS4075',
    kind: 'gate',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-14',
    inputs: ['A', 'B', 'C'],
    outputs: ['Y'],
    width: 100,
    height: 72,
    pinYInputs: [16, 36, 56],
    pinYOutputs: [36],
    formula: 'Y = A + B + C',
    desc: 'Salida en 1 si al menos una de las 3 entradas es 1 (TTL 74LS4075).',
    evaluate: (inVals) => [(inVals[0] | inVals[1] | inVals[2]) ? 1 : 0]
  },
  OR4: {
    name: 'Compuerta OR 4-In',
    sub: 'Dual OR de 4 entradas',
    ic: '74LS4072',
    kind: 'gate',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-14',
    inputs: ['A', 'B', 'C', 'D'],
    outputs: ['Y'],
    width: 104,
    height: 90,
    pinYInputs: [16, 36, 56, 74],
    pinYOutputs: [45],
    formula: 'Y = A + B + C + D',
    desc: 'Salida en 1 si al menos una de las 4 entradas es 1 (TTL 74LS4072).',
    evaluate: (inVals) => [(inVals[0] | inVals[1] | inVals[2] | inVals[3]) ? 1 : 0]
  },
  OR5: {
    name: 'Compuerta OR (SOP)',
    sub: 'OR de 5 entradas para minitérminos',
    ic: 'SOP-OR',
    kind: 'gate',
    family: 'Lógica Combinacional',
    manufacturer: 'DigiLab Logic',
    pkg: 'Módulo SOP',
    inputs: ['m0', 'm1', 'm2', 'm3', 'm4'],
    outputs: ['F'],
    width: 104,
    height: 104,
    pinYInputs: [16, 34, 52, 70, 88],
    pinYOutputs: [52],
    formula: 'F = Σ minitérminos',
    desc: 'OR de 5 entradas para sumar minitérminos en arquitecturas SOP.',
    evaluate: (inVals) => [inVals.some((v) => v === 1) ? 1 : 0]
  },
  OR8: {
    name: 'Compuerta OR 8-In (SOP)',
    sub: 'OR de 8 entradas para minitérminos',
    ic: 'SOP-OR8',
    kind: 'ic',
    family: 'Lógica Combinacional',
    manufacturer: 'DigiLab Logic',
    pkg: 'Módulo SOP',
    inputs: ['m0', 'm1', 'm2', 'm3', 'm4', 'm5', 'm6', 'm7'],
    outputs: ['F'],
    width: 126,
    height: 196,
    formula: 'F = Σ minitérminos (m0..m7)',
    desc: 'OR de 8 entradas para sumar hasta 8 minitérminos en circuitos combinacionales.',
    evaluate: (inVals) => [inVals.some((v) => v === 1) ? 1 : 0]
  },
  NOR3: {
    name: 'Compuerta NOR 3-In',
    sub: 'Triple NOR de 3 entradas',
    ic: '74LS27',
    kind: 'gate',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-14',
    inputs: ['A', 'B', 'C'],
    outputs: ['Y'],
    width: 100,
    height: 72,
    pinYInputs: [16, 36, 56],
    pinYOutputs: [36],
    formula: "Y = (A + B + C)'",
    desc: 'Salida en 1 únicamente cuando las 3 entradas son 0 (TTL 74LS27).',
    evaluate: (inVals) => [(inVals[0] | inVals[1] | inVals[2]) ? 0 : 1]
  },
  NOR4: {
    name: 'Compuerta NOR 4-In',
    sub: 'Dual NOR de 4 entradas',
    ic: '74LS4002',
    kind: 'gate',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-14',
    inputs: ['A', 'B', 'C', 'D'],
    outputs: ['Y'],
    width: 104,
    height: 90,
    pinYInputs: [16, 36, 56, 74],
    pinYOutputs: [45],
    formula: "Y = (A + B + C + D)'",
    desc: 'Salida en 1 únicamente cuando las 4 entradas son 0 (TTL 74LS4002).',
    evaluate: (inVals) => [(inVals[0] | inVals[1] | inVals[2] | inVals[3]) ? 0 : 1]
  },
  XOR3: {
    name: 'Compuerta XOR 3-In',
    sub: 'Generador Paridad Impar 3-In',
    ic: 'PARITY-ODD',
    kind: 'gate',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-14',
    inputs: ['A', 'B', 'C'],
    outputs: ['Y'],
    width: 100,
    height: 72,
    pinYInputs: [16, 36, 56],
    pinYOutputs: [36],
    formula: 'Y = A ⊕ B ⊕ C',
    desc: 'Salida en 1 cuando un número impar de entradas está en 1.',
    evaluate: (inVals) => [((inVals[0] ^ inVals[1] ^ inVals[2]) & 1) ? 1 : 0]
  },
  XNOR3: {
    name: 'Compuerta XNOR 3-In',
    sub: 'Generador Paridad Par 3-In',
    ic: 'PARITY-EVEN',
    kind: 'gate',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-14',
    inputs: ['A', 'B', 'C'],
    outputs: ['Y'],
    width: 100,
    height: 72,
    pinYInputs: [16, 36, 56],
    pinYOutputs: [36],
    formula: "Y = (A ⊕ B ⊕ C)'",
    desc: 'Salida en 1 cuando un número par de entradas está en 1 (o todas en 0).',
    evaluate: (inVals) => [((inVals[0] ^ inVals[1] ^ inVals[2]) & 1) ? 0 : 1]
  },

  // CIRCUITOS ARITMÉTICOS (ESQUEMÁTICOS LIMPIOS)
  HALF_ADDER: {
    name: 'Medio Sumador',
    sub: 'Half-Adder (1 bit)',
    ic: 'HA',
    kind: 'ic',
    family: 'Módulo Aritmético',
    manufacturer: 'DigiLab Arithmetic',
    pkg: 'Bloque MSI',
    inputs: ['A', 'B'],
    outputs: ['S', 'C'],
    width: 136,
    height: 96,
    formula: 'S = A⊕B | C = A·B',
    evaluate: (inVals) => {
      const a = inVals[0] || 0;
      const b = inVals[1] || 0;
      return [a ^ b, a & b];
    }
  },
  FULL_ADDER: {
    name: 'Sumador Completo',
    sub: 'Full-Adder (1 bit)',
    ic: 'FA',
    kind: 'ic',
    family: 'Módulo Aritmético',
    manufacturer: 'Texas Instruments',
    pkg: 'Bloque MSI',
    inputs: ['A', 'B', 'Cin'],
    outputs: ['S', 'Cout'],
    width: 142,
    height: 116,
    formula: 'S = A⊕B⊕Cin | Cout = AB+(A⊕B)Cin',
    evaluate: (inVals) => {
      const a = inVals[0] || 0;
      const b = inVals[1] || 0;
      const c0 = inVals[2] || 0;
      const s = a ^ b ^ c0;
      const c1 = (a & b) | ((a ^ b) & c0);
      return [s, c1];
    }
  },
  IC_74283: {
    name: '74LS283',
    sub: 'Sumador de 4 bits',
    ic: '74LS283',
    kind: 'ic',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-16',
    inputs: ['A4', 'A3', 'A2', 'A1', 'B4', 'B3', 'B2', 'B1', 'C0'],
    outputs: ['C4', 'Σ4', 'Σ3', 'Σ2', 'Σ1'],
    width: 154,
    height: 244,
    formula: 'Σ = A + B + C0 (4 bits)',
    evaluate: (inVals) => {
      const A = ((inVals[0] || 0) << 3) | ((inVals[1] || 0) << 2) | ((inVals[2] || 0) << 1) | (inVals[3] || 0);
      const B = ((inVals[4] || 0) << 3) | ((inVals[5] || 0) << 2) | ((inVals[6] || 0) << 1) | (inVals[7] || 0);
      const C0 = inVals[8] || 0;
      const sum = A + B + C0;
      return [
        (sum >> 4) & 1,
        (sum >> 3) & 1,
        (sum >> 2) & 1,
        (sum >> 1) & 1,
        sum & 1
      ];
    }
  },

  // COMPARADORES
  COMP_1BIT: {
    name: 'Comparador 1 bit',
    sub: 'Magnitud A y B',
    ic: 'COMP 1B',
    kind: 'ic',
    family: 'Comparador Digital',
    manufacturer: 'DigiLab Logic',
    pkg: 'Bloque MSI',
    inputs: ['A', 'B'],
    outputs: ['A>B', 'A=B', 'A<B'],
    width: 142,
    height: 116,
    formula: "(A>B)=AB' | (A=B)=(A⊕B)' | (A<B)=A'B",
    evaluate: (inVals) => {
      const a = inVals[0] || 0;
      const b = inVals[1] || 0;
      return [
        (a && !b) ? 1 : 0,
        (a === b) ? 1 : 0,
        (!a && b) ? 1 : 0
      ];
    }
  },
  IC_7485: {
    name: '74LS85',
    sub: 'Comparador de 4 bits',
    ic: '74LS85',
    kind: 'ic',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-16',
    inputs: ['A3', 'A2', 'A1', 'A0', 'B3', 'B2', 'B1', 'B0', 'I>', 'I=', 'I<'],
    outputs: ['A > B', 'A = B', 'A < B'],
    width: 158,
    height: 280,
    formula: 'Comparador de magnitud de 4 bits con entradas de cascada',
    evaluate: (inVals) => {
      const A = ((inVals[0] || 0) << 3) | ((inVals[1] || 0) << 2) | ((inVals[2] || 0) << 1) | (inVals[3] || 0);
      const B = ((inVals[4] || 0) << 3) | ((inVals[5] || 0) << 2) | ((inVals[6] || 0) << 1) | (inVals[7] || 0);
      const iGT = inVals[8] || 0;
      const iEQ = inVals[9] !== undefined ? inVals[9] : 1;
      const iLT = inVals[10] || 0;

      if (A > B) return [1, 0, 0];
      if (A < B) return [0, 0, 1];
      if (iEQ === 1) return [0, 1, 0];
      if (iGT === 1 && iLT === 0) return [1, 0, 0];
      if (iGT === 0 && iLT === 1) return [0, 0, 1];
      if (iGT === 1 && iLT === 1) return [0, 0, 0];
      return [1, 1, 0];
    }
  },

  // MULTIPLEXORES (TRAPECIOS ESQUEMÁTICOS PUROS COMO EN LA IMAGEN) Y DECODIFICADORES
  MUX_2_1: {
    name: 'MUX 2:1',
    sub: 'Multiplexor de 2 entradas',
    ic: '74LS157',
    kind: 'mux',
    muxTitle: '2:1',
    muxSub: 'MUX',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-16',
    inputs: ['I0', 'I1', 'S0'],
    outputs: ['Y'],
    width: 108,
    height: 112,
    pinYInputs: [28, 56, 88],
    pinYOutputs: [56],
    formula: "Y = I0·S0' + I1·S0",
    evaluate: (inVals) => {
      const sel = inVals[2] || 0;
      return [sel === 0 ? (inVals[0] || 0) : (inVals[1] || 0)];
    }
  },
  MUX_4_1: {
    name: 'MUX 4:1 (74LS153)',
    sub: 'Multiplexor de 4 entradas',
    ic: '74LS153',
    kind: 'mux',
    muxTitle: '4:1',
    muxSub: 'MUX',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-16',
    inputs: ['I0', 'I1', 'I2', 'I3', 'S1', 'S0'],
    outputs: ['Y'],
    width: 118,
    height: 176,
    pinYInputs: [26, 52, 78, 104, 136, 158],
    pinYOutputs: [88],
    formula: "Y = I0·S1'S0' + I1·S1'S0 + I2·S1·S0' + I3·S1·S0",
    evaluate: (inVals) => {
      const idx = ((inVals[4] || 0) << 1) | (inVals[5] || 0);
      return [inVals[idx] || 0];
    }
  },
  MUX_8_1: {
    name: 'MUX 8:1 (74LS151)',
    sub: 'Multiplexor de 8 entradas',
    ic: '74LS151',
    kind: 'mux',
    muxTitle: '8:1',
    muxSub: 'MUX',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-16',
    inputs: ['E0', 'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'S2', 'S1', 'S0'],
    outputs: ['Z', "Z'"],
    width: 128,
    height: 268,
    pinYInputs: [22, 42, 62, 82, 102, 122, 142, 162, 198, 222, 246],
    pinYOutputs: [108, 160],
    formula: 'Z = E_(S2,S1,S0)',
    evaluate: (inVals) => {
      const idx = ((inVals[8] || 0) << 2) | ((inVals[9] || 0) << 1) | (inVals[10] || 0);
      const z = inVals[idx] || 0;
      return [z, z ? 0 : 1];
    }
  },
  DEMUX_1_4: {
    name: 'DEMUX 1:4',
    sub: 'Demultiplexor 1 a 4 salidas',
    ic: '74LS139',
    kind: 'mux',
    muxTitle: '1:4',
    muxSub: 'DEMUX',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-16',
    inputs: ['I', 'S1', 'S0'],
    outputs: ['O0', 'O1', 'O2', 'O3'],
    width: 118,
    height: 152,
    pinYInputs: [52, 106, 130],
    pinYOutputs: [32, 62, 92, 122],
    formula: 'O_k = I si k = (S1,S0)',
    evaluate: (inVals) => {
      const data = inVals[0] || 0;
      const sel = ((inVals[1] || 0) << 1) | (inVals[2] || 0);
      const out = [0, 0, 0, 0];
      out[sel] = data;
      return out;
    }
  },
  DECO_3_8: {
    name: 'Decodificador 3:8 (74LS138)',
    sub: 'Decodificador Binario SOP',
    ic: '74LS138',
    kind: 'ic',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-16',
    inputs: ['X', 'Y', 'Z'],
    outputs: ['S0', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7'],
    width: 146,
    height: 224,
    formula: 'S_k = 1 para el minitérmino k = (X,Y,Z)',
    evaluate: (inVals) => {
      const idx = ((inVals[0] || 0) << 2) | ((inVals[1] || 0) << 1) | (inVals[2] || 0);
      const out = [0, 0, 0, 0, 0, 0, 0, 0];
      out[idx] = 1;
      return out;
    }
  }
};

/**
 * Calcula las coordenadas exactas Y de cada pin de entrada o salida de un nodo
 */
window.getPinOffsetY = function (type, pinIndex, isOutput) {
  const def = window.COMPONENT_DEFS[type];
  if (!def) return 20;
  const customArr = isOutput ? def.pinYOutputs : def.pinYInputs;
  if (Array.isArray(customArr) && customArr[pinIndex] !== undefined) {
    return customArr[pinIndex];
  }
  const totalPins = isOutput ? def.outputs.length : def.inputs.length;
  const margin = 20;
  const usable = def.height - margin * 2;
  if (totalPins <= 1) return Math.round(def.height / 2);
  return Math.round(margin + (usable / (totalPins - 1)) * pinIndex);
};

// ============================================================================
// ICONOS SVG LIMPIOS PARA EL CATÁLOGO LATERAL E INSPECTOR (COMO EN LA IMAGEN)
// ============================================================================
window.getCatalogIconSvg = function (type) {
  const stroke = '#be185d';
  const fill = '#fff5f9';
  switch (type) {
    case 'INPUT':
      return `<svg width="34" height="22" viewBox="0 0 36 24">
        <text x="3" y="16" fill="#831843" font-size="11" font-weight="800" font-family="Plus Jakarta Sans">A</text>
        <circle cx="20" cy="12" r="5" fill="#fce7f3" stroke="${stroke}" stroke-width="2"/>
        <line x1="25" y1="12" x2="34" y2="12" stroke="${stroke}" stroke-width="2"/>
      </svg>`;
    case 'VCC':
      return `<svg width="34" height="22" viewBox="0 0 36 24">
        <circle cx="16" cy="12" r="6" fill="#d1fae5" stroke="#059669" stroke-width="2"/>
        <line x1="22" y1="12" x2="33" y2="12" stroke="#059669" stroke-width="2"/>
      </svg>`;
    case 'GND':
      return `<svg width="34" height="22" viewBox="0 0 36 24">
        <path d="M16 4v9M9 13h14M11.5 16.5h9M14 20h4" stroke="${stroke}" stroke-width="2" stroke-linecap="round"/>
      </svg>`;
    case 'OUTPUT':
      return `<svg width="34" height="22" viewBox="0 0 36 24">
        <line x1="2" y1="12" x2="11" y2="12" stroke="#059669" stroke-width="2"/>
        <circle cx="17" cy="12" r="5.5" fill="#10b981" stroke="#059669" stroke-width="2"/>
        <text x="26" y="16" fill="#831843" font-size="11" font-weight="800" font-family="Plus Jakarta Sans">S</text>
      </svg>`;
    case 'HEX_DISPLAY':
      return `<svg width="34" height="22" viewBox="0 0 36 24">
        <rect x="8" y="2" width="20" height="20" rx="3" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <text x="18" y="16" text-anchor="middle" fill="${stroke}" font-size="11" font-weight="800" font-family="JetBrains Mono">8</text>
      </svg>`;
    case 'AND':
    case 'AND3':
    case 'AND4':
      return `<svg width="36" height="24" viewBox="0 0 38 24">
        <line x1="2" y1="8" x2="9" y2="8" stroke="${stroke}" stroke-width="1.8"/>
        <line x1="2" y1="16" x2="9" y2="16" stroke="${stroke}" stroke-width="1.8"/>
        <path d="M9 3 H20 A9 9 0 0 1 20 21 H9 Z" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <line x1="29" y1="12" x2="36" y2="12" stroke="${stroke}" stroke-width="1.8"/>
      </svg>`;
    case 'AND8':
      return `<svg width="36" height="24" viewBox="0 0 38 24">
        <rect x="7" y="2" width="24" height="20" rx="3" fill="${fill}" stroke="${stroke}" stroke-width="1.8"/>
        <text x="19" y="16" text-anchor="middle" fill="${stroke}" font-size="9" font-weight="800" font-family="JetBrains Mono">&amp;8</text>
      </svg>`;
    case 'NAND':
    case 'NAND3':
    case 'NAND4':
    case 'NAND8':
      return `<svg width="36" height="24" viewBox="0 0 38 24">
        <line x1="2" y1="8" x2="8" y2="8" stroke="${stroke}" stroke-width="1.8"/>
        <line x1="2" y1="16" x2="8" y2="16" stroke="${stroke}" stroke-width="1.8"/>
        <path d="M8 3 H18 A9 9 0 0 1 18 21 H8 Z" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <circle cx="29.5" cy="12" r="2.4" fill="#fff" stroke="${stroke}" stroke-width="1.8"/>
        <line x1="32" y1="12" x2="37" y2="12" stroke="${stroke}" stroke-width="1.8"/>
      </svg>`;
    case 'OR':
    case 'OR3':
    case 'OR4':
    case 'OR5':
      return `<svg width="36" height="24" viewBox="0 0 38 24">
        <line x1="2" y1="8" x2="10" y2="8" stroke="${stroke}" stroke-width="1.8"/>
        <line x1="2" y1="16" x2="10" y2="16" stroke="${stroke}" stroke-width="1.8"/>
        <path d="M7 3 Q18 3 29 12 Q18 21 7 21 Q12 12 7 3 Z" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <line x1="29" y1="12" x2="36" y2="12" stroke="${stroke}" stroke-width="1.8"/>
      </svg>`;
    case 'OR8':
      return `<svg width="36" height="24" viewBox="0 0 38 24">
        <rect x="7" y="2" width="24" height="20" rx="3" fill="${fill}" stroke="${stroke}" stroke-width="1.8"/>
        <text x="19" y="16" text-anchor="middle" fill="${stroke}" font-size="8.5" font-weight="800" font-family="JetBrains Mono">≥1·8</text>
      </svg>`;
    case 'NOR':
    case 'NOR3':
    case 'NOR4':
      return `<svg width="36" height="24" viewBox="0 0 38 24">
        <line x1="2" y1="8" x2="9" y2="8" stroke="${stroke}" stroke-width="1.8"/>
        <line x1="2" y1="16" x2="9" y2="16" stroke="${stroke}" stroke-width="1.8"/>
        <path d="M6 3 Q16 3 26 12 Q16 21 6 21 Q11 12 6 3 Z" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <circle cx="29" cy="12" r="2.4" fill="#fff" stroke="${stroke}" stroke-width="1.8"/>
        <line x1="31.5" y1="12" x2="37" y2="12" stroke="${stroke}" stroke-width="1.8"/>
      </svg>`;
    case 'XOR':
    case 'XOR3':
      return `<svg width="36" height="24" viewBox="0 0 38 24">
        <line x1="2" y1="8" x2="9" y2="8" stroke="${stroke}" stroke-width="1.8"/>
        <line x1="2" y1="16" x2="9" y2="16" stroke="${stroke}" stroke-width="1.8"/>
        <path d="M5 3 Q10 12 5 21" fill="none" stroke="${stroke}" stroke-width="1.8"/>
        <path d="M9 3 Q19 3 29 12 Q19 21 9 21 Q14 12 9 3 Z" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <line x1="29" y1="12" x2="36" y2="12" stroke="${stroke}" stroke-width="1.8"/>
      </svg>`;
    case 'XNOR':
    case 'XNOR3':
      return `<svg width="36" height="24" viewBox="0 0 38 24">
        <line x1="1" y1="8" x2="8" y2="8" stroke="${stroke}" stroke-width="1.8"/>
        <line x1="1" y1="16" x2="8" y2="16" stroke="${stroke}" stroke-width="1.8"/>
        <path d="M4 3 Q9 12 4 21" fill="none" stroke="${stroke}" stroke-width="1.8"/>
        <path d="M8 3 Q17 3 26 12 Q17 21 8 21 Q13 12 8 3 Z" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <circle cx="29" cy="12" r="2.4" fill="#fff" stroke="${stroke}" stroke-width="1.8"/>
        <line x1="31.5" y1="12" x2="37" y2="12" stroke="${stroke}" stroke-width="1.8"/>
      </svg>`;
    case 'NOT':
      return `<svg width="36" height="24" viewBox="0 0 38 24">
        <line x1="2" y1="12" x2="9" y2="12" stroke="${stroke}" stroke-width="1.8"/>
        <polygon points="9,4 25,12 9,20" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <circle cx="28" cy="12" r="2.4" fill="#fff" stroke="${stroke}" stroke-width="1.8"/>
        <line x1="30.5" y1="12" x2="36" y2="12" stroke="${stroke}" stroke-width="1.8"/>
      </svg>`;
    case 'MUX_2_1':
    case 'MUX_4_1':
    case 'MUX_8_1':
    case 'DEMUX_1_4':
      return `<svg width="36" height="24" viewBox="0 0 38 24">
        <polygon points="9,2 28,6 28,18 9,22" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <line x1="3" y1="7" x2="9" y2="7" stroke="${stroke}" stroke-width="1.8"/>
        <line x1="3" y1="17" x2="9" y2="17" stroke="${stroke}" stroke-width="1.8"/>
        <line x1="28" y1="12" x2="35" y2="12" stroke="${stroke}" stroke-width="1.8"/>
      </svg>`;
    default:
      return `<svg width="36" height="24" viewBox="0 0 38 24">
        <rect x="8" y="3" width="22" height="18" rx="2.5" fill="${fill}" stroke="${stroke}" stroke-width="2"/>
        <line x1="3" y1="8" x2="8" y2="8" stroke="${stroke}" stroke-width="1.8"/>
        <line x1="3" y1="16" x2="8" y2="16" stroke="${stroke}" stroke-width="1.8"/>
        <line x1="30" y1="8" x2="35" y2="8" stroke="${stroke}" stroke-width="1.8"/>
        <line x1="30" y1="16" x2="35" y2="16" stroke="${stroke}" stroke-width="1.8"/>
      </svg>`;
  }
};

// ============================================================================
// GENERADOR DE SÍMBOLOS ESQUEMÁTICOS PUROS PARA EL LIENZO (SIN CAJA ENVOLVENTE)
// ============================================================================
window.renderSchematicNodeSvg = function (node, inVals, outVals) {
  const def = window.COMPONENT_DEFS[node.type];
  if (!def) return '';
  const w = def.width;
  const h = def.height;
  const stroke = '#334155';
  const fill = '#ffffff';
  const isOutHigh = outVals && outVals[0] === 1;
  const outStroke = isOutHigh ? '#10b981' : stroke;

  // 1. COMPUERTAS LÓGICAS PURAS (ESTÁNDAR IEEE COMO EN LAS IMÁGENES 1, 2 Y 3)
  if (def.kind === 'gate') {
    const inYs = def.inputs.map((_, idx) => window.getPinOffsetY(node.type, idx, false));
    const outY = window.getPinOffsetY(node.type, 0, true);

    if (node.type === 'AND' || node.type === 'AND3' || node.type === 'AND4') {
      const leadEndX = 22;
      const bodyRightStraight = 52;
      const r = (h - 12) / 2;
      const leads = inYs
        .map((y, idx) => `<line x1="0" y1="${y}" x2="${leadEndX}" y2="${y}" stroke="${inVals[idx] ? '#10b981' : stroke}" stroke-width="2.5"/>`)
        .join('');
      return `
        <svg class="schematic-svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
          ${leads}
          <line x1="${bodyRightStraight + r}" y1="${outY}" x2="${w}" y2="${outY}" stroke="${outStroke}" stroke-width="2.6"/>
          <path d="M ${leadEndX} 6 H ${bodyRightStraight} A ${r} ${r} 0 0 1 ${bodyRightStraight} ${h - 6} H ${leadEndX} Z"
                fill="${fill}" stroke="${stroke}" stroke-width="2.6" stroke-linejoin="round"/>
        </svg>
      `;
    }

    if (node.type === 'NAND' || node.type === 'NAND3' || node.type === 'NAND4') {
      const leadEndX = 20;
      const bodyRightStraight = 48;
      const r = (h - 12) / 2;
      const bubbleX = bodyRightStraight + r + 5;
      const leads = inYs
        .map((y, idx) => `<line x1="0" y1="${y}" x2="${leadEndX}" y2="${y}" stroke="${inVals[idx] ? '#10b981' : stroke}" stroke-width="2.5"/>`)
        .join('');
      return `
        <svg class="schematic-svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
          ${leads}
          <line x1="${bubbleX + 5}" y1="${outY}" x2="${w}" y2="${outY}" stroke="${outStroke}" stroke-width="2.6"/>
          <path d="M ${leadEndX} 6 H ${bodyRightStraight} A ${r} ${r} 0 0 1 ${bodyRightStraight} ${h - 6} H ${leadEndX} Z"
                fill="${fill}" stroke="${stroke}" stroke-width="2.6" stroke-linejoin="round"/>
          <circle cx="${bubbleX}" cy="${outY}" r="4.8" fill="#ffffff" stroke="${stroke}" stroke-width="2.5"/>
        </svg>
      `;
    }

    if (node.type === 'OR' || node.type === 'OR3' || node.type === 'OR4' || node.type === 'OR5') {
      const tipX = w - 18;
      const leads = inYs
        .map((y, idx) => `<line x1="0" y1="${y}" x2="25" y2="${y}" stroke="${inVals[idx] ? '#10b981' : stroke}" stroke-width="2.5"/>`)
        .join('');
      return `
        <svg class="schematic-svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
          ${leads}
          <line x1="${tipX}" y1="${outY}" x2="${w}" y2="${outY}" stroke="${outStroke}" stroke-width="2.6"/>
          <path d="M 18 6 Q 48 6 ${tipX} ${outY} Q 48 ${h - 6} 18 ${h - 6} Q 32 ${outY} 18 6 Z"
                fill="${fill}" stroke="${stroke}" stroke-width="2.6" stroke-linejoin="round"/>
        </svg>
      `;
    }

    if (node.type === 'NOR' || node.type === 'NOR3' || node.type === 'NOR4') {
      const tipX = w - 26;
      const bubbleX = tipX + 5.5;
      const leads = inYs
        .map((y, idx) => `<line x1="0" y1="${y}" x2="24" y2="${y}" stroke="${inVals[idx] ? '#10b981' : stroke}" stroke-width="2.5"/>`)
        .join('');
      return `
        <svg class="schematic-svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
          ${leads}
          <line x1="${bubbleX + 5}" y1="${outY}" x2="${w}" y2="${outY}" stroke="${outStroke}" stroke-width="2.6"/>
          <path d="M 16 6 Q 44 6 ${tipX} ${outY} Q 44 ${h - 6} 16 ${h - 6} Q 30 ${outY} 16 6 Z"
                fill="${fill}" stroke="${stroke}" stroke-width="2.6" stroke-linejoin="round"/>
          <circle cx="${bubbleX}" cy="${outY}" r="4.8" fill="#ffffff" stroke="${stroke}" stroke-width="2.5"/>
        </svg>
      `;
    }

    if (node.type === 'XOR' || node.type === 'XOR3') {
      const tipX = w - 18;
      const leads = inYs
        .map((y, idx) => `<line x1="0" y1="${y}" x2="27" y2="${y}" stroke="${inVals[idx] ? '#10b981' : stroke}" stroke-width="2.5"/>`)
        .join('');
      return `
        <svg class="schematic-svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
          ${leads}
          <line x1="${tipX}" y1="${outY}" x2="${w}" y2="${outY}" stroke="${outStroke}" stroke-width="2.6"/>
          <path d="M 14 6 Q 28 ${outY} 14 ${h - 6}" fill="none" stroke="${stroke}" stroke-width="2.6" stroke-linecap="round"/>
          <path d="M 22 6 Q 50 6 ${tipX} ${outY} Q 50 ${h - 6} 22 ${h - 6} Q 35 ${outY} 22 6 Z"
                fill="${fill}" stroke="${stroke}" stroke-width="2.6" stroke-linejoin="round"/>
        </svg>
      `;
    }

    if (node.type === 'XNOR' || node.type === 'XNOR3') {
      const tipX = w - 26;
      const bubbleX = tipX + 5.5;
      const leads = inYs
        .map((y, idx) => `<line x1="0" y1="${y}" x2="26" y2="${y}" stroke="${inVals[idx] ? '#10b981' : stroke}" stroke-width="2.5"/>`)
        .join('');
      return `
        <svg class="schematic-svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
          ${leads}
          <line x1="${bubbleX + 5}" y1="${outY}" x2="${w}" y2="${outY}" stroke="${outStroke}" stroke-width="2.6"/>
          <path d="M 13 6 Q 27 ${outY} 13 ${h - 6}" fill="none" stroke="${stroke}" stroke-width="2.6" stroke-linecap="round"/>
          <path d="M 21 6 Q 47 6 ${tipX} ${outY} Q 47 ${h - 6} 21 ${h - 6} Q 34 ${outY} 21 6 Z"
                fill="${fill}" stroke="${stroke}" stroke-width="2.6" stroke-linejoin="round"/>
          <circle cx="${bubbleX}" cy="${outY}" r="4.8" fill="#ffffff" stroke="${stroke}" stroke-width="2.5"/>
        </svg>
      `;
    }

    if (node.type === 'NOT') {
      const tipX = w - 26;
      const bubbleX = tipX + 5.5;
      return `
        <svg class="schematic-svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
          <line x1="0" y1="${outY}" x2="20" y2="${outY}" stroke="${inVals[0] ? '#10b981' : stroke}" stroke-width="2.5"/>
          <line x1="${bubbleX + 5}" y1="${outY}" x2="${w}" y2="${outY}" stroke="${outStroke}" stroke-width="2.6"/>
          <polygon points="20,6 ${tipX},${outY} 20,${h - 6}" fill="${fill}" stroke="${stroke}" stroke-width="2.6" stroke-linejoin="round"/>
          <circle cx="${bubbleX}" cy="${outY}" r="4.8" fill="#ffffff" stroke="${stroke}" stroke-width="2.5"/>
        </svg>
      `;
    }
  }

  // 2. MULTIPLEXORES Y DEMULTIPLEXORES EN FORMA DE TRAPECIO ESQUEMÁTICO PURO (IMAGEN 2)
  if (def.kind === 'mux') {
    const isDemux = node.type === 'DEMUX_1_4';
    const leftX = 18;
    const rightX = w - 18;
    const polyPoints = isDemux
      ? `${leftX},28 ${rightX},8 ${rightX},${h - 8} ${leftX},${h - 28}`
      : `${leftX},8 ${rightX},28 ${rightX},${h - 28} ${leftX},${h - 8}`;

    const inLines = def.inputs
      .map((pName, idx) => {
        const y = window.getPinOffsetY(node.type, idx, false);
        const active = inVals[idx] === 1;
        return `
          <line x1="0" y1="${y}" x2="${leftX}" y2="${y}" stroke="${active ? '#10b981' : stroke}" stroke-width="2.3"/>
          <text x="${leftX + 6}" y="${y + 3.5}" fill="#831843" font-size="9.5" font-weight="700" font-family="JetBrains Mono">${pName}</text>
        `;
      })
      .join('');

    const outLines = def.outputs
      .map((pName, idx) => {
        const y = window.getPinOffsetY(node.type, idx, true);
        const active = outVals[idx] === 1;
        return `
          <line x1="${rightX}" y1="${y}" x2="${w}" y2="${y}" stroke="${active ? '#10b981' : stroke}" stroke-width="2.4"/>
          <text x="${rightX - 6}" y="${y + 3.5}" text-anchor="end" fill="#be185d" font-size="9.5" font-weight="800" font-family="JetBrains Mono">${pName}</text>
        `;
      })
      .join('');

    const midY = h / 2;
    return `
      <svg class="schematic-svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
        <polygon points="${polyPoints}" fill="#ffffff" stroke="${stroke}" stroke-width="2.6" stroke-linejoin="round"/>
        ${inLines}
        ${outLines}
        <text x="${w / 2 + 2}" y="${midY - 3}" text-anchor="middle" fill="#1f122b" font-size="13" font-weight="800" font-family="Plus Jakarta Sans">${def.muxTitle}</text>
        <text x="${w / 2 + 2}" y="${midY + 12}" text-anchor="middle" fill="#9d174d" font-size="10.5" font-weight="800" font-family="Plus Jakarta Sans">${def.muxSub}</text>
      </svg>
    `;
  }

  // 3. BLOQUES DE CIRCUITO INTEGRADO ESQUEMÁTICO LIMPIO (74LS85, 74LS283, SUMADORES, DECO)
  const boxLeft = 14;
  const boxRight = w - 14;
  const boxW = boxRight - boxLeft;

  const inPinsSvg = def.inputs
    .map((pName, idx) => {
      const y = window.getPinOffsetY(node.type, idx, false);
      const active = inVals[idx] === 1;
      return `
        <line x1="0" y1="${y}" x2="${boxLeft}" y2="${y}" stroke="${active ? '#10b981' : stroke}" stroke-width="2.2"/>
        <text x="${boxLeft + 6}" y="${y + 3.5}" fill="#4a1d35" font-size="9.5" font-weight="700" font-family="JetBrains Mono">${pName}</text>
      `;
    })
    .join('');

  const outPinsSvg = def.outputs
    .map((pName, idx) => {
      const y = window.getPinOffsetY(node.type, idx, true);
      const active = outVals[idx] === 1;
      return `
        <line x1="${boxRight}" y1="${y}" x2="${w}" y2="${y}" stroke="${active ? '#10b981' : stroke}" stroke-width="2.4"/>
        <text x="${boxRight - 6}" y="${y + 3.5}" text-anchor="end" fill="#be185d" font-size="9.5" font-weight="800" font-family="JetBrains Mono">${pName}</text>
      `;
    })
    .join('');

  const cy = h / 2;
  return `
    <svg class="schematic-svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <rect x="${boxLeft}" y="6" width="${boxW}" height="${h - 12}" rx="4" fill="#ffffff" stroke="${stroke}" stroke-width="2.6"/>
      <path d="M ${w / 2 - 10} 6 A 10 10 0 0 0 ${w / 2 + 10} 6" fill="#fce7f3" stroke="${stroke}" stroke-width="2"/>
      ${inPinsSvg}
      ${outPinsSvg}
      <text x="${w / 2}" y="${cy - 4}" text-anchor="middle" fill="#1f122b" font-size="13" font-weight="800" font-family="Plus Jakarta Sans">${def.ic || def.name}</text>
      <text x="${w / 2}" y="${cy + 11}" text-anchor="middle" fill="#831843" font-size="8.5" font-weight="600" font-family="Plus Jakarta Sans">${def.sub.slice(0, 20)}</text>
    </svg>
  `;
};

// DATOS DE PINOUT FÍSICO DE CIS COMERCIALES (SERIE 74LS)
window.IC_PINOUT_DATA = {
  '74LS00': {
    title: '74LS00 · Cuádruple Compuerta NAND de 2 Entradas',
    package: 'Encapsulado DIP-14 · Serie TTL 74LS',
    pins: 14,
    left: ['1: 1A', '2: 1B', '3: 1Y (Out)', '4: 2A', '5: 2B', '6: 2Y (Out)', '7: GND'],
    right: ['14: VCC (+5V)', '13: 4B', '12: 4A', '11: 4Y (Out)', '10: 3B', '9: 3A', '8: 3Y (Out)']
  },
  '74LS02': {
    title: '74LS02 · Cuádruple Compuerta NOR de 2 Entradas',
    package: 'Encapsulado DIP-14 · Serie TTL 74LS',
    pins: 14,
    left: ['1: 1Y (Out)', '2: 1A', '3: 1B', '4: 2Y (Out)', '5: 2A', '6: 2B', '7: GND'],
    right: ['14: VCC (+5V)', '13: 4Y (Out)', '12: 4B', '11: 4A', '10: 3Y (Out)', '9: 3B', '8: 3A']
  },
  '74LS04': {
    title: '74LS04 · Séxtuple Inversor Lógico (NOT)',
    package: 'Encapsulado DIP-14 · Serie TTL 74LS',
    pins: 14,
    left: ['1: 1A', '2: 1Y', '3: 2A', '4: 2Y', '5: 3A', '6: 3Y', '7: GND'],
    right: ['14: VCC (+5V)', '13: 6A', '12: 6Y', '11: 5A', '10: 5Y', '9: 4A', '8: 4Y']
  },
  '74LS08': {
    title: '74LS08 · Cuádruple Compuerta AND de 2 Entradas',
    package: 'Encapsulado DIP-14 · Serie TTL 74LS',
    pins: 14,
    left: ['1: 1A', '2: 1B', '3: 1Y (Out)', '4: 2A', '5: 2B', '6: 2Y (Out)', '7: GND'],
    right: ['14: VCC (+5V)', '13: 4B', '12: 4A', '11: 4Y (Out)', '10: 3B', '9: 3A', '8: 3Y (Out)']
  },
  '74LS32': {
    title: '74LS32 · Cuádruple Compuerta OR de 2 Entradas',
    package: 'Encapsulado DIP-14 · Serie TTL 74LS',
    pins: 14,
    left: ['1: 1A', '2: 1B', '3: 1Y (Out)', '4: 2A', '5: 2B', '6: 2Y (Out)', '7: GND'],
    right: ['14: VCC (+5V)', '13: 4B', '12: 4A', '11: 4Y (Out)', '10: 3B', '9: 3A', '8: 3Y (Out)']
  },
  '74LS86': {
    title: '74LS86 · Cuádruple Compuerta XOR de 2 Entradas',
    package: 'Encapsulado DIP-14 · Serie TTL 74LS',
    pins: 14,
    left: ['1: 1A', '2: 1B', '3: 1Y (Out)', '4: 2A', '5: 2B', '6: 2Y (Out)', '7: GND'],
    right: ['14: VCC (+5V)', '13: 4B', '12: 4A', '11: 4Y (Out)', '10: 3B', '9: 3A', '8: 3Y (Out)']
  },
  '74LS283': {
    title: '74x283 · Sumador Binario Completo de 4 Bits',
    package: 'Encapsulado DIP-16 · Aritmética Binaria',
    pins: 16,
    left: ['1: Σ2', '2: B2', '3: A2', '4: Σ1', '5: A1', '6: B1', '7: C0 (Carry In)', '8: GND'],
    right: ['16: VCC (+5V)', '15: B3', '14: A3', '13: Σ3', '12: A4', '11: B4', '10: Σ4', '9: C4 (Carry Out)']
  },
  '74LS85': {
    title: '74LS85 · Comparador de Magnitud de 4 Bits con Cascada',
    package: 'Encapsulado DIP-16 · Comparador Digital',
    pins: 16,
    left: ['1: B3', '2: I(A<B)', '3: I(A=B)', '4: I(A>B)', '5: O(A>B)', '6: O(A=B)', '7: O(A<B)', '8: GND'],
    right: ['16: VCC (+5V)', '15: A3', '14: B2', '13: A2', '12: A1', '11: B1', '10: A0', '9: B0']
  },
  '74LS151': {
    title: '74LS151 · Multiplexor Digital de 8 Entradas a 1 Salida',
    package: 'Encapsulado DIP-16 · Selección de Datos',
    pins: 16,
    left: ['1: I3', '2: I2', '3: I1', '4: I0', '5: Z (Salida)', "6: Z' (Invertida)", "7: E' (Enable)", '8: GND'],
    right: ['16: VCC (+5V)', '15: I4', '14: I5', '13: I6', '12: I7', '11: S0', '10: S1', '9: S2']
  },
  '74LS10': {
    title: '74LS10 · Triple Compuerta NAND de 3 Entradas',
    package: 'Encapsulado DIP-14 · Serie TTL 74LS',
    pins: 14,
    left: ['1: 1A', '2: 1B', '3: 2A', '4: 2B', '5: 2C', '6: 2Y (Out)', '7: GND'],
    right: ['14: VCC (+5V)', '13: 1C', '12: 1Y (Out)', '11: 3C', '10: 3B', '9: 3A', '8: 3Y (Out)']
  },
  '74LS11': {
    title: '74LS11 · Triple Compuerta AND de 3 Entradas',
    package: 'Encapsulado DIP-14 · Serie TTL 74LS',
    pins: 14,
    left: ['1: 1A', '2: 1B', '3: 2A', '4: 2B', '5: 2C', '6: 2Y (Out)', '7: GND'],
    right: ['14: VCC (+5V)', '13: 1C', '12: 1Y (Out)', '11: 3C', '10: 3B', '9: 3A', '8: 3Y (Out)']
  },
  '74LS20': {
    title: '74LS20 · Dual Compuerta NAND de 4 Entradas',
    package: 'Encapsulado DIP-14 · Serie TTL 74LS',
    pins: 14,
    left: ['1: 1A', '2: 1B', '3: NC', '4: 1C', '5: 1D', '6: 1Y (Out)', '7: GND'],
    right: ['14: VCC (+5V)', '13: 2D', '12: 2C', '11: NC', '10: 2B', '9: 2A', '8: 2Y (Out)']
  },
  '74LS21': {
    title: '74LS21 · Dual Compuerta AND de 4 Entradas',
    package: 'Encapsulado DIP-14 · Serie TTL 74LS',
    pins: 14,
    left: ['1: 1A', '2: 1B', '3: NC', '4: 1C', '5: 1D', '6: 1Y (Out)', '7: GND'],
    right: ['14: VCC (+5V)', '13: 2D', '12: 2C', '11: NC', '10: 2B', '9: 2A', '8: 2Y (Out)']
  },
  '74LS27': {
    title: '74LS27 · Triple Compuerta NOR de 3 Entradas',
    package: 'Encapsulado DIP-14 · Serie TTL 74LS',
    pins: 14,
    left: ['1: 1A', '2: 1B', '3: 2A', '4: 2B', '5: 2C', '6: 2Y (Out)', '7: GND'],
    right: ['14: VCC (+5V)', '13: 1C', '12: 1Y (Out)', '11: 3C', '10: 3B', '9: 3A', '8: 3Y (Out)']
  },
  '74LS30': {
    title: '74LS30 · Compuerta NAND de 8 Entradas',
    package: 'Encapsulado DIP-14 · Serie TTL 74LS',
    pins: 14,
    left: ['1: A', '2: B', '3: C', '4: D', '5: E', '6: F', '7: GND'],
    right: ['14: VCC (+5V)', '13: NC', '12: Y (Out)', '11: H', '10: NC', '9: NC', '8: G']
  }
};
