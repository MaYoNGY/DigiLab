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
  DISPLAY_7SEG_CC: {
    name: 'Display 7-Seg (Cátodo Común)',
    sub: 'Segmentos a..g activos en ALTO (1)',
    ic: '7SEG-CC',
    kind: 'display_7seg',
    commonAnode: false,
    family: 'Visualizador 7-Seg',
    manufacturer: 'DigiLab Optics',
    pkg: 'DIP-10 LED',
    inputs: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'dp'],
    outputs: [],
    width: 132,
    height: 184,
    pinYInputs: [20, 40, 60, 80, 100, 120, 140, 160],
    pinYOutputs: [],
    formula: 'Cátodo Común: Segmento ON con 1 lógico',
    desc: 'Display de 7 segmentos de cátodo común. Cada segmento (a..g, dp) se enciende cuando recibe un 1 lógico (compatible con BCD_7SEG / 74LS48).',
    evaluate: (inVals) => inVals.map((v) => (v ? 1 : 0))
  },
  DISPLAY_7SEG_CA: {
    name: 'Display 7-Seg (Ánodo Común)',
    sub: 'Segmentos a..g activos en BAJO (0)',
    ic: '7SEG-CA',
    kind: 'display_7seg',
    commonAnode: true,
    family: 'Visualizador 7-Seg',
    manufacturer: 'DigiLab Optics',
    pkg: 'DIP-10 LED',
    inputs: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'dp'],
    outputs: [],
    width: 132,
    height: 184,
    pinYInputs: [20, 40, 60, 80, 100, 120, 140, 160],
    pinYOutputs: [],
    formula: 'Ánodo Común: Segmento ON con 0 lógico',
    desc: 'Display de 7 segmentos de ánodo común. Cada segmento (a..g, dp) se enciende cuando recibe un 0 lógico (compatible directo con el CI 74LS47).',
    evaluate: (inVals) => inVals.map((v) => (v ? 0 : 1))
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
  BLOCK_MS: {
    name: 'Medio Sumador (M.S.)',
    sub: 'Módulo 1-Bit (A, B → S, Cout)',
    ic: 'M.S.',
    kind: 'modular_adder',
    family: 'Aritmética Modular',
    manufacturer: 'Texas Instruments / DigiLab',
    pkg: 'Bloque Modular',
    inputs: ['A', 'B'],
    outputs: ['S', 'Cout'],
    width: 100,
    height: 90,
    pins: {
      inputs: [
        { name: 'A', side: 'top', x: 35, y: 0, orientation: 'north' },
        { name: 'B', side: 'top', x: 65, y: 0, orientation: 'north' }
      ],
      outputs: [
        { name: 'S', side: 'bottom', x: 50, y: 90, orientation: 'south' },
        { name: 'Cout', side: 'left', x: 0, y: 45, orientation: 'west' }
      ]
    },
    formula: 'S = A ⊕ B | Cout = A · B',
    desc: 'Medio sumador modular de 1 bit con entradas superiores y cascada de acarreo.',
    evaluate: (inVals) => {
      const a = inVals[0] || 0;
      const b = inVals[1] || 0;
      return [a ^ b, a & b];
    }
  },
  BLOCK_SC: {
    name: 'Sumador Completo (S.C.)',
    sub: 'Módulo 1-Bit (A, B, Cin → S, Cout)',
    ic: 'S.C.',
    kind: 'modular_adder',
    family: 'Aritmética Modular',
    manufacturer: 'Texas Instruments / DigiLab',
    pkg: 'Bloque Modular',
    inputs: ['A', 'B', 'Cin'],
    outputs: ['S', 'Cout'],
    width: 100,
    height: 90,
    pins: {
      inputs: [
        { name: 'A', side: 'top', x: 35, y: 0, orientation: 'north' },
        { name: 'B', side: 'top', x: 65, y: 0, orientation: 'north' },
        { name: 'Cin', side: 'right', x: 100, y: 45, orientation: 'east' }
      ],
      outputs: [
        { name: 'S', side: 'bottom', x: 50, y: 90, orientation: 'south' },
        { name: 'Cout', side: 'left', x: 0, y: 45, orientation: 'west' }
      ]
    },
    formula: 'S = A ⊕ B ⊕ Cin | Cout = AB + Cin(A ⊕ B)',
    desc: 'Sumador completo modular de 1 bit con entradas A y B arriba, suma abajo, acarreo de entrada a la derecha y acarreo de salida a la izquierda.',
    evaluate: (inVals) => {
      const a = inVals[0] || 0;
      const b = inVals[1] || 0;
      const cin = inVals[2] || 0;
      const s = a ^ b ^ cin;
      const cout = (a & b) | (cin & (a ^ b));
      return [s, cout];
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
  },
  DEC_1_2: {
    name: 'Decodificador 1 a 2',
    sub: '1 entrada (A0) a 2 salidas (O0, O1)',
    ic: 'DEC 1:2',
    kind: 'ic',
    family: 'Conversor de Código',
    manufacturer: 'DigiLab MSI',
    pkg: 'Bloque MSI',
    inputs: ['A0'],
    outputs: ['O0', 'O1'],
    width: 132,
    height: 92,
    formula: "O0 = A0' | O1 = A0",
    desc: 'Decodificador elemental de 1 entrada y 2 salidas realizado con un inversor lógico.',
    evaluate: (inVals) => {
      const a0 = inVals[0] ? 1 : 0;
      return [a0 === 0 ? 1 : 0, a0 === 1 ? 1 : 0];
    }
  },
  DEC_2_4: {
    name: 'Decodificador 2 a 4',
    sub: '2 entradas (A1,A0) a 4 salidas (O0..O3)',
    ic: 'DEC 2:4',
    kind: 'ic',
    family: 'Conversor de Código',
    manufacturer: 'DigiLab MSI',
    pkg: 'Bloque MSI',
    inputs: ['A1', 'A0'],
    outputs: ['O0', 'O1', 'O2', 'O3'],
    width: 138,
    height: 144,
    formula: "O0=A1'A0', O1=A1'A0, O2=A1·A0', O3=A1·A0",
    desc: 'Decodificador binario de 2 a 4 líneas con salidas activas en alto.',
    evaluate: (inVals) => {
      const idx = ((inVals[0] || 0) << 1) | (inVals[1] || 0);
      const out = [0, 0, 0, 0];
      out[idx] = 1;
      return out;
    }
  },
  DEC_2_4_EN: {
    name: 'Decodificador 2 a 4 (con Enable)',
    sub: 'A1, A0 + Enable E → O0..O3 (Cascada)',
    ic: '74LS139',
    kind: 'ic',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-16',
    inputs: ['A1', 'A0', 'E'],
    outputs: ['O0', 'O1', 'O2', 'O3'],
    width: 142,
    height: 152,
    formula: 'Habilitado cuando E = 1 (Ideal para árboles 4 a 16)',
    desc: 'Decodificador 2 a 4 con entrada habilitadora E para construir decodificadores 4 a 16 en cascada.',
    evaluate: (inVals) => {
      const en = inVals[2] || 0;
      if (!en) return [0, 0, 0, 0];
      const idx = ((inVals[0] || 0) << 1) | (inVals[1] || 0);
      const out = [0, 0, 0, 0];
      out[idx] = 1;
      return out;
    }
  },
  DEC_3_8_EN: {
    name: 'Decodificador 3 a 8 (con Enable)',
    sub: 'A2,A1,A0 + Enable CS → S0..S7',
    ic: '74LS138-EN',
    kind: 'ic',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-16',
    inputs: ['A2', 'A1', 'A0', 'CS'],
    outputs: ['S0', 'S1', 'S2', 'S3', 'S4', 'S5', 'S6', 'S7'],
    width: 150,
    height: 228,
    formula: 'S_k = CS · m_k(A2,A1,A0)',
    desc: 'Decodificador 3 a 8 con pin habilitador CS para expandir a 16 salidas en cascada.',
    evaluate: (inVals) => {
      const cs = inVals[3] || 0;
      if (!cs) return [0, 0, 0, 0, 0, 0, 0, 0];
      const idx = ((inVals[0] || 0) << 2) | ((inVals[1] || 0) << 1) | (inVals[2] || 0);
      const out = [0, 0, 0, 0, 0, 0, 0, 0];
      out[idx] = 1;
      return out;
    }
  },
  IC_7442: {
    name: 'Decodificador BCD a Decimal (74LS42)',
    sub: '4 entradas BCD (D..A) a 10 salidas (O0..O9)',
    ic: '74LS42',
    kind: 'ic',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-16',
    inputs: ['D', 'C', 'B', 'A'],
    outputs: ['O0', 'O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8', 'O9'],
    width: 156,
    height: 260,
    formula: 'Activa O_k para códigos BCD válidos (0 ≤ k ≤ 9)',
    desc: 'Conversor de código BCD (4 bits) a 10 líneas decimales (0 a 9). Para entradas ≥ 10 todas las salidas permanecen en 0.',
    evaluate: (inVals) => {
      const val = ((inVals[0] || 0) << 3) | ((inVals[1] || 0) << 2) | ((inVals[2] || 0) << 1) | (inVals[3] || 0);
      const out = new Array(10).fill(0);
      if (val >= 0 && val <= 9) out[val] = 1;
      return out;
    }
  },
  IC_74154: {
    name: 'Decodificador 4 a 16 (74LS154)',
    sub: '4 entradas (A3..A0) a 16 salidas (O0..O15)',
    ic: '74LS154',
    kind: 'ic',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-24',
    inputs: ['A3', 'A2', 'A1', 'A0'],
    outputs: ['O0', 'O1', 'O2', 'O3', 'O4', 'O5', 'O6', 'O7', 'O8', 'O9', 'O10', 'O11', 'O12', 'O13', 'O14', 'O15'],
    width: 162,
    height: 368,
    formula: 'O_k = 1 para k = (A3,A2,A1,A0)',
    desc: 'Decodificador de 4 líneas a 16 líneas (direccionamiento de 2⁴ = 16 combinaciones).',
    evaluate: (inVals) => {
      const val = ((inVals[0] || 0) << 3) | ((inVals[1] || 0) << 2) | ((inVals[2] || 0) << 1) | (inVals[3] || 0);
      const out = new Array(16).fill(0);
      out[val] = 1;
      return out;
    }
  },
  BCD_7SEG: {
    name: 'Decodificador BCD a 7-Seg (74LS48)',
    sub: 'Salidas a..g activas en ALTO (Cátodo Común)',
    ic: '74LS48',
    kind: 'ic',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-16',
    inputs: ['D', 'C', 'B', 'A'],
    outputs: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    width: 156,
    height: 208,
    formula: 'BCD (D,C,B,A) → Segmentos a..g activos en 1',
    desc: 'Decodificador BCD a 7 segmentos con salidas activas en alto (1) para Display de Cátodo Común.',
    evaluate: (inVals) => {
      const val = ((inVals[0] || 0) << 3) | ((inVals[1] || 0) << 2) | ((inVals[2] || 0) << 1) | (inVals[3] || 0);
      const table = [
        [1, 1, 1, 1, 1, 1, 0], // 0
        [0, 1, 1, 0, 0, 0, 0], // 1
        [1, 1, 0, 1, 1, 0, 1], // 2
        [1, 1, 1, 1, 0, 0, 1], // 3
        [0, 1, 1, 0, 0, 1, 1], // 4
        [1, 0, 1, 1, 0, 1, 1], // 5
        [1, 0, 1, 1, 1, 1, 1], // 6
        [1, 1, 1, 0, 0, 0, 0], // 7
        [1, 1, 1, 1, 1, 1, 1], // 8
        [1, 1, 1, 1, 0, 1, 1], // 9
        [0, 0, 0, 1, 1, 0, 1], // 10
        [0, 0, 1, 1, 0, 0, 1], // 11
        [0, 1, 0, 0, 0, 1, 1], // 12
        [1, 0, 0, 1, 0, 1, 1], // 13
        [0, 0, 0, 1, 1, 1, 1], // 14
        [0, 0, 0, 0, 0, 0, 0]  // 15
      ];
      return table[val] || [0, 0, 0, 0, 0, 0, 0];
    }
  },
  IC_7447: {
    name: 'Decodificador BCD a 7-Seg (74LS47)',
    sub: 'Salidas a..g activas en BAJO (Ánodo Común)',
    ic: '74LS47',
    kind: 'ic',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-16',
    inputs: ['D', 'C', 'B', 'A'],
    outputs: ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
    width: 156,
    height: 208,
    formula: 'BCD (D,C,B,A) → Segmentos a..g activos en 0 (Ánodo Común)',
    desc: 'Circuito integrado 74LS47: decodificador BCD a 7 segmentos para display de ánodo común con salidas activas en bajo (0).',
    evaluate: (inVals) => {
      const val = ((inVals[0] || 0) << 3) | ((inVals[1] || 0) << 2) | ((inVals[2] || 0) << 1) | (inVals[3] || 0);
      // Tabla de verdad oficial SN7447A (L = 0 enciende el segmento, H = 1 apaga)
      const table = [
        [0, 0, 0, 0, 0, 0, 1], // 0
        [1, 0, 0, 1, 1, 1, 1], // 1
        [0, 0, 1, 0, 0, 1, 0], // 2
        [0, 0, 0, 0, 1, 1, 0], // 3
        [1, 0, 0, 1, 1, 0, 0], // 4
        [0, 1, 0, 0, 1, 0, 0], // 5
        [1, 1, 0, 0, 0, 0, 0], // 6
        [0, 0, 0, 1, 1, 1, 1], // 7
        [0, 0, 0, 0, 0, 0, 0], // 8
        [0, 0, 0, 1, 1, 0, 0], // 9
        [1, 1, 1, 0, 0, 1, 0], // 10
        [1, 1, 0, 0, 1, 1, 0], // 11
        [1, 0, 1, 1, 1, 0, 0], // 12
        [0, 1, 1, 0, 1, 0, 0], // 13
        [1, 1, 1, 0, 0, 0, 0], // 14
        [1, 1, 1, 1, 1, 1, 1]  // 15
      ];
      return table[val] || [1, 1, 1, 1, 1, 1, 1];
    }
  },
  ENC_4_2: {
    name: 'Codificador 4 a 2',
    sub: '4 entradas (I0..I3) a 2 salidas (A1, A0)',
    ic: 'ENC 4:2',
    kind: 'ic',
    family: 'Conversor de Código',
    manufacturer: 'DigiLab MSI',
    pkg: 'Bloque MSI',
    inputs: ['I0', 'I1', 'I2', 'I3'],
    outputs: ['A1', 'A0'],
    width: 138,
    height: 144,
    formula: 'A1 = I2 + I3 | A0 = I1 + I3',
    desc: 'Codificador binario de 4 líneas a 2 bits.',
    evaluate: (inVals) => {
      const i1 = inVals[1] || 0;
      const i2 = inVals[2] || 0;
      const i3 = inVals[3] || 0;
      return [(i2 | i3) ? 1 : 0, (i1 | i3) ? 1 : 0];
    }
  },
  ENC_8_3: {
    name: 'Codificador 8 a 3',
    sub: '8 entradas (I0..I7) a 3 bits (A2,A1,A0)',
    ic: 'ENC 8:3',
    kind: 'ic',
    family: 'Conversor de Código',
    manufacturer: 'DigiLab MSI',
    pkg: 'Bloque MSI',
    inputs: ['I0', 'I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7'],
    outputs: ['A2', 'A1', 'A0'],
    width: 150,
    height: 224,
    formula: 'A2=I4+I5+I6+I7 | A1=I2+I3+I6+I7 | A0=I1+I3+I5+I7',
    desc: 'Codificador digital 8 a 3 que realiza la operación inversa del decodificador mediante 3 compuertas OR de 4 entradas.',
    evaluate: (inVals) => {
      const a2 = (inVals[4] | inVals[5] | inVals[6] | inVals[7]) ? 1 : 0;
      const a1 = (inVals[2] | inVals[3] | inVals[6] | inVals[7]) ? 1 : 0;
      const a0 = (inVals[1] | inVals[3] | inVals[5] | inVals[7]) ? 1 : 0;
      return [a2, a1, a0];
    }
  },
  ENC_PRIO_8_3: {
    name: 'Codificador con Prioridad 8 a 3',
    sub: 'Prioridad mayor en I7..I0 → A2, A1, A0',
    ic: 'PRIO 8:3',
    kind: 'ic',
    family: 'Conversor de Código',
    manufacturer: 'Texas Instruments',
    pkg: 'Bloque MSI',
    inputs: ['I0', 'I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7'],
    outputs: ['A2', 'A1', 'A0'],
    width: 152,
    height: 224,
    formula: 'Codifica el índice mayor activo entre I7..I0',
    desc: 'Codificador con prioridad de 8 a 3 líneas: permite que varias entradas estén activadas simultáneamente codificando la de mayor peso.',
    evaluate: (inVals) => {
      for (let i = 7; i >= 0; i--) {
        if (inVals[i]) {
          return [(i >> 2) & 1, (i >> 1) & 1, i & 1];
        }
      }
      return [0, 0, 0];
    }
  },
  IC_74148: {
    name: 'Codificador Prioridad 8 a 3 (74LS148)',
    sub: 'SN74LS148 (Entradas/Salidas Activas en Bajo)',
    ic: '74LS148',
    kind: 'ic',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-16',
    inputs: ['EI', 'I0', 'I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7'],
    outputs: ['A2', 'A1', 'A0', 'GS', 'EO'],
    width: 156,
    height: 244,
    formula: 'SN74LS148: Prioridad I7 > I6 > ... > I0 (Nivel Activo Bajo L=0)',
    desc: 'Circuito integrado SN74LS148: codificador de prioridad de 8 a 3 líneas con entradas y salidas activas en nivel bajo (L).',
    evaluate: (inVals) => {
      const ei = inVals[0] || 0;
      if (ei === 1) {
        return [1, 1, 1, 1, 1];
      }
      for (let i = 7; i >= 0; i--) {
        if ((inVals[i + 1] || 0) === 0) {
          const a2 = ((i >> 2) & 1) ? 0 : 1;
          const a1 = ((i >> 1) & 1) ? 0 : 1;
          const a0 = (i & 1) ? 0 : 1;
          return [a2, a1, a0, 0, 1];
        }
      }
      return [1, 1, 1, 1, 0];
    }
  },
  IC_74147: {
    name: 'Codificador Prioridad 10 a 4 BCD (74LS147)',
    sub: 'SN74LS147 Decimal a BCD (Activo Bajo)',
    ic: '74LS147',
    kind: 'ic',
    family: '74LS (TTL)',
    manufacturer: 'Texas Instruments',
    pkg: 'DIP-16',
    inputs: ['I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'I9'],
    outputs: ['D', 'C', 'B', 'A'],
    width: 156,
    height: 244,
    formula: 'SN74LS147: Prioridad I9 > I8 > ... > I1 → BCD Invertido',
    desc: 'Circuito integrado SN74LS147: codificador de prioridad de 10 líneas decimales a 4 bits BCD con entradas y salidas activas en bajo.',
    evaluate: (inVals) => {
      for (let i = 9; i >= 1; i--) {
        if ((inVals[i - 1] || 0) === 0) {
          const d = ((i >> 3) & 1) ? 0 : 1;
          const c = ((i >> 2) & 1) ? 0 : 1;
          const b = ((i >> 1) & 1) ? 0 : 1;
          const a = (i & 1) ? 0 : 1;
          return [d, c, b, a];
        }
      }
      return [1, 1, 1, 1];
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
    case 'DISPLAY_7SEG_CC':
    case 'DISPLAY_7SEG_CA':
      return `<svg width="34" height="22" viewBox="0 0 36 24">
        <rect x="8" y="1" width="20" height="22" rx="3" fill="#231229" stroke="${stroke}" stroke-width="1.8"/>
        <line x1="14" y1="5" x2="22" y2="5" stroke="#ff2a6d" stroke-width="2.2" stroke-linecap="round"/>
        <line x1="22" y1="5" x2="22" y2="12" stroke="#ff2a6d" stroke-width="2.2" stroke-linecap="round"/>
        <line x1="22" y1="12" x2="22" y2="19" stroke="#ff2a6d" stroke-width="2.2" stroke-linecap="round"/>
        <line x1="14" y1="19" x2="22" y2="19" stroke="#ff2a6d" stroke-width="2.2" stroke-linecap="round"/>
        <line x1="14" y1="12" x2="14" y2="19" stroke="#4a2854" stroke-width="2" stroke-linecap="round"/>
        <line x1="14" y1="5" x2="14" y2="12" stroke="#ff2a6d" stroke-width="2.2" stroke-linecap="round"/>
        <line x1="14" y1="12" x2="22" y2="12" stroke="#ff2a6d" stroke-width="2.2" stroke-linecap="round"/>
      </svg>`;
    case 'BCD_7SEG':
    case 'IC_7447':
      return `<svg width="36" height="24" viewBox="0 0 38 24">
        <rect x="6" y="2" width="26" height="20" rx="2.5" fill="${fill}" stroke="${stroke}" stroke-width="1.8"/>
        <text x="19" y="11" text-anchor="middle" fill="${stroke}" font-size="6.8" font-weight="800" font-family="JetBrains Mono">BCD</text>
        <text x="19" y="18.5" text-anchor="middle" fill="#831843" font-size="6.5" font-weight="800" font-family="JetBrains Mono">7SEG</text>
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
    case 'BLOCK_MS':
      return `<svg width="36" height="24" viewBox="0 0 38 24">
        <rect x="7" y="3" width="24" height="18" rx="2" fill="${fill}" stroke="${stroke}" stroke-width="1.8"/>
        <text x="19" y="15" text-anchor="middle" fill="${stroke}" font-size="8.5" font-weight="800" font-family="Plus Jakarta Sans">M.S.</text>
        <line x1="14" y1="0" x2="14" y2="3" stroke="${stroke}" stroke-width="1.5"/>
        <line x1="24" y1="0" x2="24" y2="3" stroke="${stroke}" stroke-width="1.5"/>
        <line x1="19" y1="21" x2="19" y2="24" stroke="${stroke}" stroke-width="1.5"/>
        <line x1="3" y1="12" x2="7" y2="12" stroke="${stroke}" stroke-width="1.5"/>
      </svg>`;
    case 'BLOCK_SC':
      return `<svg width="36" height="24" viewBox="0 0 38 24">
        <rect x="7" y="3" width="24" height="18" rx="2" fill="${fill}" stroke="${stroke}" stroke-width="1.8"/>
        <text x="19" y="15" text-anchor="middle" fill="${stroke}" font-size="8.5" font-weight="800" font-family="Plus Jakarta Sans">S.C.</text>
        <line x1="13" y1="0" x2="13" y2="3" stroke="${stroke}" stroke-width="1.5"/>
        <line x1="23" y1="0" x2="23" y2="3" stroke="${stroke}" stroke-width="1.5"/>
        <line x1="18" y1="21" x2="18" y2="24" stroke="${stroke}" stroke-width="1.5"/>
        <line x1="3" y1="12" x2="7" y2="12" stroke="${stroke}" stroke-width="1.5"/>
        <line x1="31" y1="12" x2="35" y2="12" stroke="${stroke}" stroke-width="1.5"/>
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

  // 3. BLOQUES MODULARES DE SUMADORES (M.S. Y S.C. ESQUEMÁTICO PURO)
  if (def.kind === 'modular_adder') {
    const isMS = node.type === 'BLOCK_MS';
    const inAActive = inVals[0] === 1;
    const inBActive = inVals[1] === 1;
    const inCinActive = inVals[2] === 1;
    const outSActive = outVals[0] === 1;
    const outCoutActive = outVals[1] === 1;

    return `
      <svg class="schematic-svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
        <!-- Caja modular -->
        <rect x="2" y="2" width="${w - 4}" height="${h - 4}" rx="4" fill="#ffffff" stroke="${stroke}" stroke-width="2.5"/>
        
        <!-- Nombre central -->
        <text x="${w / 2}" y="${h / 2 + 5}" text-anchor="middle" fill="#1f122b" font-size="14.5" font-weight="800" font-family="Plus Jakarta Sans, sans-serif">${def.ic}</text>
        
        <!-- Entrada A (superior izquierda) -->
        <line x1="35" y1="0" x2="35" y2="8" stroke="${inAActive ? '#10b981' : stroke}" stroke-width="2.4"/>
        <text x="35" y="21" text-anchor="middle" fill="#4a1d35" font-size="10.5" font-weight="800" font-family="JetBrains Mono, monospace">A</text>
        
        <!-- Entrada B (superior derecha) -->
        <line x1="65" y1="0" x2="65" y2="8" stroke="${inBActive ? '#10b981' : stroke}" stroke-width="2.4"/>
        <text x="65" y="21" text-anchor="middle" fill="#4a1d35" font-size="10.5" font-weight="800" font-family="JetBrains Mono, monospace">B</text>
        
        <!-- Salida S (inferior central) -->
        <line x1="50" y1="${h - 8}" x2="50" y2="${h}" stroke="${outSActive ? '#10b981' : stroke}" stroke-width="2.4"/>
        <text x="50" y="${h - 13}" text-anchor="middle" fill="#be185d" font-size="11" font-weight="800" font-family="JetBrains Mono, monospace">S</text>
        
        <!-- Salida Cout (borde izquierdo) -->
        <line x1="0" y1="45" x2="8" y2="45" stroke="${outCoutActive ? '#10b981' : stroke}" stroke-width="2.4"/>
        <text x="14" y="49" text-anchor="start" fill="#be185d" font-size="9.5" font-weight="800" font-family="JetBrains Mono, monospace">Cout</text>
        
        <!-- Entrada Cin (borde derecho, solo en S.C.) -->
        ${!isMS ? `
          <line x1="${w - 8}" y1="45" x2="${w}" y2="45" stroke="${inCinActive ? '#10b981' : stroke}" stroke-width="2.4"/>
          <text x="${w - 14}" y="49" text-anchor="end" fill="#4a1d35" font-size="9.5" font-weight="800" font-family="JetBrains Mono, monospace">Cin</text>
        ` : ''}
        <text x="${w / 2}" y="${h / 2 + 19}" text-anchor="middle" fill="#db2777" font-size="7.5" font-weight="700" font-family="Plus Jakarta Sans">▾ Subcircuito</text>
      </svg>
    `;
  }

  // 3.5. DISPLAY DE 7 SEGMENTOS REALISTA (ÁNODO COMÚN Y CÁTODO COMÚN)
  if (def.kind === 'display_7seg') {
    const isCommonAnode = !!def.commonAnode;
    const segOn = (idx) => {
      const bit = inVals[idx] !== undefined ? inVals[idx] : (isCommonAnode ? 1 : 0);
      return isCommonAnode ? bit === 0 : bit === 1;
    };

    const aOn = segOn(0);
    const bOn = segOn(1);
    const cOn = segOn(2);
    const dOn = segOn(3);
    const eOn = segOn(4);
    const fOn = segOn(5);
    const gOn = segOn(6);
    const dpOn = segOn(7);

    const activeColor = '#ff2a6d';
    const offColor = '#3a203e';
    const boxLeft = 16;
    const boxW = w - boxLeft - 4;

    const inPinsSvg = def.inputs
      .map((pName, idx) => {
        const y = window.getPinOffsetY(node.type, idx, false);
        const rawActive = inVals[idx] === 1;
        return `
          <line x1="0" y1="${y}" x2="${boxLeft}" y2="${y}" stroke="${rawActive ? '#10b981' : stroke}" stroke-width="2.2"/>
          <text x="${boxLeft + 5}" y="${y + 3}" fill="#fbcfe8" font-size="8.5" font-weight="700" font-family="JetBrains Mono">${pName}</text>
        `;
      })
      .join('');

    // Coordenadas de los 7 segmentos dentro de la pantalla (x: 44..108, y: 28..148)
    const sx = 48;
    const sy = 32;
    const sw = 48;
    const sh = 46;
    const t = 7; // grosor del segmento

    const segPolys = [
      // a (arriba horizontal)
      { on: aOn, label: 'a', lx: sx + sw / 2, ly: sy - 4, pts: `${sx + 4},${sy} ${sx + sw - 4},${sy} ${sx + sw - 8},${sy + t} ${sx + 8},${sy + t}` },
      // b (arriba derecha vertical)
      { on: bOn, label: 'b', lx: sx + sw + 7, ly: sy + sh / 2, pts: `${sx + sw},${sy + 3} ${sx + sw},${sy + sh - 2} ${sx + sw - t},${sy + sh - 6} ${sx + sw - t},${sy + 7}` },
      // c (abajo derecha vertical)
      { on: cOn, label: 'c', lx: sx + sw + 7, ly: sy + sh + sh / 2, pts: `${sx + sw},${sy + sh + 2} ${sx + sw},${sy + sh * 2 - 3} ${sx + sw - t},${sy + sh * 2 - 7} ${sx + sw - t},${sy + sh + 6}` },
      // d (abajo horizontal)
      { on: dOn, label: 'd', lx: sx + sw / 2, ly: sy + sh * 2 + 10, pts: `${sx + 8},${sy + sh * 2 - t} ${sx + sw - 8},${sy + sh * 2 - t} ${sx + sw - 4},${sy + sh * 2} ${sx + 4},${sy + sh * 2}` },
      // e (abajo izquierda vertical)
      { on: eOn, label: 'e', lx: sx - 6, ly: sy + sh + sh / 2, pts: `${sx},${sy + sh + 2} ${sx + t},${sy + sh + 6} ${sx + t},${sy + sh * 2 - 7} ${sx},${sy + sh * 2 - 3}` },
      // f (arriba izquierda vertical)
      { on: fOn, label: 'f', lx: sx - 6, ly: sy + sh / 2, pts: `${sx},${sy + 3} ${sx + t},${sy + 7} ${sx + t},${sy + sh - 6} ${sx},${sy + sh - 2}` },
      // g (centro horizontal)
      { on: gOn, label: 'g', lx: sx + sw / 2, ly: sy + sh - 5, pts: `${sx + 4},${sy + sh} ${sx + 8},${sy + sh - t / 2} ${sx + sw - 8},${sy + sh - t / 2} ${sx + sw - 4},${sy + sh} ${sx + sw - 8},${sy + sh + t / 2} ${sx + 8},${sy + sh + t / 2}` }
    ];

    const segmentsSvg = segPolys
      .map((s) => `
        <polygon points="${s.pts}" fill="${s.on ? activeColor : offColor}"
                 style="${s.on ? 'filter: drop-shadow(0 0 6px #ff2a6d);' : ''}"/>
      `)
      .join('');

    return `
      <svg class="schematic-svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
        <rect x="${boxLeft}" y="6" width="${boxW}" height="${h - 12}" rx="7" fill="#1b0e20" stroke="#be185d" stroke-width="2.5"/>
        <rect x="${boxLeft + 22}" y="18" width="${boxW - 28}" height="${h - 44}" rx="4" fill="#120816" stroke="#4a1d35" stroke-width="1.2"/>
        ${inPinsSvg}
        ${segmentsSvg}
        <circle cx="${sx + sw + 9}" cy="${sy + sh * 2 - 2}" r="4"
                fill="${dpOn ? activeColor : offColor}"
                style="${dpOn ? 'filter: drop-shadow(0 0 6px #ff2a6d);' : ''}"/>
        <text x="${boxLeft + boxW / 2 + 8}" y="${h - 12}" text-anchor="middle" fill="#f9a8d4" font-size="7.8" font-weight="800" font-family="Plus Jakarta Sans">
          ${isCommonAnode ? 'ÁNODO COMÚN (0)' : 'CÁTODO COMÚN (1)'}
        </text>
      </svg>
    `;
  }

  // 4. BLOQUES DE CIRCUITO INTEGRADO ESQUEMÁTICO LIMPIO (74LS85, 74LS283, SUMADORES, DECO)
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
  const hasDrill = window.canDrillDownNode && window.canDrillDownNode(node.type);
  return `
    <svg class="schematic-svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
      <rect x="${boxLeft}" y="6" width="${boxW}" height="${h - 12}" rx="4" fill="#ffffff" stroke="${stroke}" stroke-width="2.6"/>
      <path d="M ${w / 2 - 10} 6 A 10 10 0 0 0 ${w / 2 + 10} 6" fill="#fce7f3" stroke="${stroke}" stroke-width="2"/>
      ${inPinsSvg}
      ${outPinsSvg}
      <text x="${w / 2}" y="${cy - 4}" text-anchor="middle" fill="#1f122b" font-size="13" font-weight="800" font-family="Plus Jakarta Sans">${def.ic || def.name}</text>
      <text x="${w / 2}" y="${cy + 11}" text-anchor="middle" fill="#831843" font-size="8.5" font-weight="600" font-family="Plus Jakarta Sans">${def.sub.slice(0, 20)}</text>
      ${hasDrill ? `<text x="${w / 2}" y="${cy + 24}" text-anchor="middle" fill="#db2777" font-size="7.5" font-weight="800" font-family="Plus Jakarta Sans">▾ Doble clic: Interior</text>` : ''}
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
  },
  '74LS47': {
    title: '74LS47 · Decodificador/Controlador BCD a 7 Segmentos (Ánodo Común)',
    package: 'Encapsulado DIP-16 · Conversor de Código Display',
    pins: 16,
    left: ['1: B (In)', '2: C (In)', "3: LT' (Lamp Test)", "4: BI'/RBO'", "5: RBI'", '6: D (In)', '7: A (In)', '8: GND'],
    right: ['16: VCC (+5V)', "15: f' (Seg)", "14: g' (Seg)", "13: a' (Seg)", "12: b' (Seg)", "11: c' (Seg)", "10: d' (Seg)", "9: e' (Seg)"]
  },
  '74LS138': {
    title: '74LS138 · Decodificador / Demultiplexor de 3 a 8 Líneas',
    package: 'Encapsulado DIP-16 · Decodificador Binario',
    pins: 16,
    left: ['1: A0 (Select)', '2: A1 (Select)', '3: A2 (Select)', "4: E1' (Enable)", "5: E2' (Enable)", '6: E3 (Enable)', "7: O7' (Out)", '8: GND'],
    right: ['16: VCC (+5V)', "15: O0' (Out)", "14: O1' (Out)", "13: O2' (Out)", "12: O3' (Out)", "11: O4' (Out)", "10: O5' (Out)", "9: O6' (Out)"]
  },
  '74LS139': {
    title: '74LS139 · Doble Decodificador / Demultiplexor de 2 a 4 Líneas',
    package: 'Encapsulado DIP-16 · Decodificador Dual',
    pins: 16,
    left: ["1: 1E' (Enable)", '2: 1A0', '3: 1A1', "4: 1O0'", "5: 1O1'", "6: 1O2'", "7: 1O3'", '8: GND'],
    right: ['16: VCC (+5V)', "15: 2E' (Enable)", '14: 2A0', '13: 2A1', "12: 2O0'", "11: 2O1'", "10: 2O2'", "9: 2O3'"]
  },
  '74LS147': {
    title: 'SN74LS147 · Codificador de Prioridad de 10 a 4 Líneas (Decimal a BCD)',
    package: 'Encapsulado DIP-16 · Codificador con Prioridad',
    pins: 16,
    left: ["1: I4'", "2: I5'", "3: I6'", "4: I7'", "5: I8'", "6: C' (Out)", "7: B' (Out)", '8: GND'],
    right: ['16: VCC (+5V)', '15: NC', "14: D' (Out)", "13: I3'", "12: I2'", "11: I1'", "10: I9'", "9: A' (Out)"]
  },
  '74LS148': {
    title: 'SN74LS148 · Codificador de Prioridad de 8 a 3 Líneas (Cascadable)',
    package: 'Encapsulado DIP-16 · Codificador Octal con Prioridad',
    pins: 16,
    left: ["1: I4'", "2: I5'", "3: I6'", "4: I7'", "5: EI' (Enable In)", "6: A2' (Out)", "7: A1' (Out)", '8: GND'],
    right: ['16: VCC (+5V)', "15: EO' (Enable Out)", "14: GS' (Group)", "13: I3'", "12: I2'", "11: I1'", "10: I0'", "9: A0' (Out)"]
  },
  '74LS42': {
    title: '74LS42 · Decodificador de BCD a Decimal (4 a 10 Líneas)',
    package: 'Encapsulado DIP-16 · Conversor de Código',
    pins: 16,
    left: ["1: O0'", "2: O1'", "3: O2'", "4: O3'", "5: O4'", "6: O5'", "7: O6'", '8: GND'],
    right: ['16: VCC (+5V)', '15: A (LSB)', '14: B', '13: C', '12: D (MSB)', "11: O9'", "10: O8'", "9: O7'"]
  }
};

// ============================================================================
// ARQUITECTURA JERÁRQUICA MULTINIVEL (DE MAYOR A MENOR Y DE MENOR A MAYOR)
// Permite adentrarse en cualquier circuito integrado o bloque MSI hasta sus compuertas básicas
// ============================================================================
window.HIERARCHY_FAMILIES = {
  // 1. ARQUITECTURA INTERNA DEL 74LS283 Y SUMADORES (4 NIVELES DE MAYOR A MENOR)
  ADDER_74283_HIERARCHY: {
    id: 'ADDER_74283_HIERARCHY',
    title: 'Arquitectura Jerárquica del 74LS283 (Sumador de 4 Bits)',
    levels: [
      {
        level: 1,
        shortName: '1. CI 74LS283 (4 bits)',
        title: 'Nivel 1 (Mayor): Circuito Integrado 74LS283 — Sumador Binario de 4 Bits',
        subtitle: 'Encapsulado MSI completo que recibe dos palabras de 4 bits (A4..A1 y B4..B1) y C0.',
        formulas: ['\\Sigma = A + B + C_0 \\pmod{16}', 'C_4 = \\text{Carry Out}'],
        nodes: [
          { id: 'a4', type: 'INPUT', label: 'A4', x: 110, y: 34, state: [0] },
          { id: 'a3', type: 'INPUT', label: 'A3', x: 110, y: 70, state: [1] },
          { id: 'a2', type: 'INPUT', label: 'A2', x: 110, y: 106, state: [0] },
          { id: 'a1', type: 'INPUT', label: 'A1', x: 110, y: 142, state: [1] },
          { id: 'b4', type: 'INPUT', label: 'B4', x: 110, y: 184, state: [0] },
          { id: 'b3', type: 'INPUT', label: 'B3', x: 110, y: 220, state: [0] },
          { id: 'b2', type: 'INPUT', label: 'B2', x: 110, y: 256, state: [1] },
          { id: 'b1', type: 'INPUT', label: 'B1', x: 110, y: 292, state: [1] },
          { id: 'c0', type: 'INPUT', label: 'C0', x: 110, y: 334, state: [0] },
          { id: 'ic283', type: 'IC_74283', label: '74LS283', x: 340, y: 80 },
          { id: 'c4', type: 'OUTPUT', label: 'C4', x: 580, y: 76 },
          { id: 's4', type: 'OUTPUT', label: 'Σ4', x: 580, y: 132 },
          { id: 's3', type: 'OUTPUT', label: 'Σ3', x: 580, y: 188 },
          { id: 's2', type: 'OUTPUT', label: 'Σ2', x: 580, y: 244 },
          { id: 's1', type: 'OUTPUT', label: 'Σ1', x: 580, y: 300 }
        ],
        wires: [
          { id: 'w1', fromNode: 'a4', fromPin: 0, toNode: 'ic283', toPin: 0 },
          { id: 'w2', fromNode: 'a3', fromPin: 0, toNode: 'ic283', toPin: 1 },
          { id: 'w3', fromNode: 'a2', fromPin: 0, toNode: 'ic283', toPin: 2 },
          { id: 'w4', fromNode: 'a1', fromPin: 0, toNode: 'ic283', toPin: 3 },
          { id: 'w5', fromNode: 'b4', fromPin: 0, toNode: 'ic283', toPin: 4 },
          { id: 'w6', fromNode: 'b3', fromPin: 0, toNode: 'ic283', toPin: 5 },
          { id: 'w7', fromNode: 'b2', fromPin: 0, toNode: 'ic283', toPin: 6 },
          { id: 'w8', fromNode: 'b1', fromPin: 0, toNode: 'ic283', toPin: 7 },
          { id: 'w9', fromNode: 'c0', fromPin: 0, toNode: 'ic283', toPin: 8 },
          { id: 'w10', fromNode: 'ic283', fromPin: 0, toNode: 'c4', toPin: 0 },
          { id: 'w11', fromNode: 'ic283', fromPin: 1, toNode: 's4', toPin: 0 },
          { id: 'w12', fromNode: 'ic283', fromPin: 2, toNode: 's3', toPin: 0 },
          { id: 'w13', fromNode: 'ic283', fromPin: 3, toNode: 's2', toPin: 0 },
          { id: 'w14', fromNode: 'ic283', fromPin: 4, toNode: 's1', toPin: 0 }
        ]
      },
      {
        level: 2,
        shortName: '2. Bloques Full Adders',
        title: 'Nivel 2: Bloques Sumadores Completos en Cascada (4 Etapas de 1 Bit)',
        subtitle: 'Interior del 74LS283 descompuesto en bloques sumadores que procesan cada par de bits (Ai, Bi) y propagan el acarreo.',
        formulas: ['S_i = A_i \\oplus B_i \\oplus C_{i-1}', 'C_i = A_i B_i + C_{i-1}(A_i \\oplus B_i)'],
        nodes: [
          { id: 'inA3', type: 'INPUT', label: 'A3', x: 110, y: 45, state: [0] },
          { id: 'inB3', type: 'INPUT', label: 'B3', x: 110, y: 100, state: [0] },
          { id: 'inA2', type: 'INPUT', label: 'A2', x: 290, y: 45, state: [1] },
          { id: 'inB2', type: 'INPUT', label: 'B2', x: 290, y: 100, state: [0] },
          { id: 'inA1', type: 'INPUT', label: 'A1', x: 470, y: 45, state: [0] },
          { id: 'inB1', type: 'INPUT', label: 'B1', x: 470, y: 100, state: [1] },
          { id: 'inA0', type: 'INPUT', label: 'A0', x: 650, y: 45, state: [1] },
          { id: 'inB0', type: 'INPUT', label: 'B0', x: 650, y: 100, state: [1] },
          { id: 'sc3', type: 'BLOCK_SC', label: 'FA3 (S.C.)', x: 180, y: 170 },
          { id: 'sc2', type: 'BLOCK_SC', label: 'FA2 (S.C.)', x: 360, y: 170 },
          { id: 'sc1', type: 'BLOCK_SC', label: 'FA1 (S.C.)', x: 540, y: 170 },
          { id: 'ms0', type: 'BLOCK_MS', label: 'FA0 (M.S.)', x: 720, y: 170 },
          { id: 'outCout', type: 'OUTPUT', label: 'Cout', x: 40, y: 197 },
          { id: 'outS3', type: 'OUTPUT', label: 'S3', x: 250, y: 310 },
          { id: 'outS2', type: 'OUTPUT', label: 'S2', x: 430, y: 310 },
          { id: 'outS1', type: 'OUTPUT', label: 'S1', x: 610, y: 310 },
          { id: 'outS0', type: 'OUTPUT', label: 'S0', x: 790, y: 310 }
        ],
        wires: [
          { id: 'wA3', fromNode: 'inA3', fromPin: 0, toNode: 'sc3', toPin: 0 },
          { id: 'wB3', fromNode: 'inB3', fromPin: 0, toNode: 'sc3', toPin: 1 },
          { id: 'wA2', fromNode: 'inA2', fromPin: 0, toNode: 'sc2', toPin: 0 },
          { id: 'wB2', fromNode: 'inB2', fromPin: 0, toNode: 'sc2', toPin: 1 },
          { id: 'wA1', fromNode: 'inA1', fromPin: 0, toNode: 'sc1', toPin: 0 },
          { id: 'wB1', fromNode: 'inB1', fromPin: 0, toNode: 'sc1', toPin: 1 },
          { id: 'wA0', fromNode: 'inA0', fromPin: 0, toNode: 'ms0', toPin: 0 },
          { id: 'wB0', fromNode: 'inB0', fromPin: 0, toNode: 'ms0', toPin: 1 },
          { id: 'wC0', fromNode: 'ms0', fromPin: 1, toNode: 'sc1', toPin: 2 },
          { id: 'wC1', fromNode: 'sc1', fromPin: 1, toNode: 'sc2', toPin: 2 },
          { id: 'wC2', fromNode: 'sc2', fromPin: 1, toNode: 'sc3', toPin: 2 },
          { id: 'wC3', fromNode: 'sc3', fromPin: 1, toNode: 'outCout', toPin: 0 },
          { id: 'wS0', fromNode: 'ms0', fromPin: 0, toNode: 'outS0', toPin: 0 },
          { id: 'wS1', fromNode: 'sc1', fromPin: 0, toNode: 'outS1', toPin: 0 },
          { id: 'wS2', fromNode: 'sc2', fromPin: 0, toNode: 'outS2', toPin: 0 },
          { id: 'wS3', fromNode: 'sc3', fromPin: 0, toNode: 'outS3', toPin: 0 }
        ]
      },
      {
        level: 3,
        shortName: '3. Subcircuitos Suma y Acarreo',
        title: 'Nivel 3: Circuitos Lógicos de Suma Parcial y Acarreo (2 Medios Sumadores + OR)',
        subtitle: 'Interior de un Sumador Completo: dos bloques de Media Suma (P = A⊕B, G = A·B) y combinación de acarreos.',
        formulas: ['P = A \\oplus B, \\; G = A \\cdot B', 'S = P \\oplus C_{\\text{in}}, \\; C_{\\text{out}} = G + P \\cdot C_{\\text{in}}'],
        nodes: [
          { id: 'inA', type: 'INPUT', label: 'A', x: 100, y: 70, state: [1] },
          { id: 'inB', type: 'INPUT', label: 'B', x: 100, y: 130, state: [1] },
          { id: 'inCin', type: 'INPUT', label: 'Cin', x: 100, y: 240, state: [0] },
          { id: 'ha1', type: 'HALF_ADDER', label: 'M.S. 1 (Suma Parcial)', x: 260, y: 68 },
          { id: 'ha2', type: 'HALF_ADDER', label: 'M.S. 2 (Suma Final)', x: 470, y: 120 },
          { id: 'orCarry', type: 'OR', label: 'U_Carry', x: 660, y: 210 },
          { id: 'outS', type: 'OUTPUT', label: 'S', x: 680, y: 122 },
          { id: 'outCout', type: 'OUTPUT', label: 'Cout', x: 810, y: 222 }
        ],
        wires: [
          { id: 'w1', fromNode: 'inA', fromPin: 0, toNode: 'ha1', toPin: 0 },
          { id: 'w2', fromNode: 'inB', fromPin: 0, toNode: 'ha1', toPin: 1 },
          { id: 'w3', fromNode: 'ha1', fromPin: 0, toNode: 'ha2', toPin: 0 },
          { id: 'w4', fromNode: 'inCin', fromPin: 0, toNode: 'ha2', toPin: 1 },
          { id: 'w5', fromNode: 'ha2', fromPin: 0, toNode: 'outS', toPin: 0 },
          { id: 'w6', fromNode: 'ha1', fromPin: 1, toNode: 'orCarry', toPin: 0 },
          { id: 'w7', fromNode: 'ha2', fromPin: 1, toNode: 'orCarry', toPin: 1 },
          { id: 'w8', fromNode: 'orCarry', fromPin: 0, toNode: 'outCout', toPin: 0 }
        ]
      },
      {
        level: 4,
        shortName: '4. Compuertas Básicas (AND, OR, XOR)',
        title: 'Nivel 4 (Menor): Compuertas Lógicas Básicas (AND, OR y XOR)',
        subtitle: 'Nivel atómico: implementación física con compuertas elementales XOR (74LS86), AND (74LS08) y OR (74LS32).',
        formulas: ['S = (A \\oplus B) \\oplus C_{\\text{in}}', 'C_{\\text{out}} = (A \\cdot B) + ((A \\oplus B) \\cdot C_{\\text{in}})'],
        nodes: [
          { id: 'inA', type: 'INPUT', label: 'A', x: 100, y: 60, state: [1] },
          { id: 'inB', type: 'INPUT', label: 'B', x: 100, y: 115, state: [0] },
          { id: 'inCin', type: 'INPUT', label: 'Cin', x: 100, y: 250, state: [1] },
          { id: 'xor1', type: 'XOR', label: 'U1 (XOR)', x: 270, y: 62 },
          { id: 'and1', type: 'AND', label: 'U2 (AND)', x: 270, y: 165 },
          { id: 'xor2', type: 'XOR', label: 'U3 (XOR)', x: 480, y: 80 },
          { id: 'and2', type: 'AND', label: 'U4 (AND)', x: 480, y: 225 },
          { id: 'or1', type: 'OR', label: 'U5 (OR)', x: 640, y: 195 },
          { id: 'outS', type: 'OUTPUT', label: 'S', x: 760, y: 92 },
          { id: 'outCout', type: 'OUTPUT', label: 'Cout', x: 780, y: 207 }
        ],
        wires: [
          { id: 'w1', fromNode: 'inA', fromPin: 0, toNode: 'xor1', toPin: 0 },
          { id: 'w2', fromNode: 'inB', fromPin: 0, toNode: 'xor1', toPin: 1 },
          { id: 'w3', fromNode: 'inA', fromPin: 0, toNode: 'and1', toPin: 0 },
          { id: 'w4', fromNode: 'inB', fromPin: 0, toNode: 'and1', toPin: 1 },
          { id: 'w5', fromNode: 'xor1', fromPin: 0, toNode: 'xor2', toPin: 0 },
          { id: 'w6', fromNode: 'inCin', fromPin: 0, toNode: 'xor2', toPin: 1 },
          { id: 'w7', fromNode: 'xor1', fromPin: 0, toNode: 'and2', toPin: 0 },
          { id: 'w8', fromNode: 'inCin', fromPin: 0, toNode: 'and2', toPin: 1 },
          { id: 'w9', fromNode: 'and1', fromPin: 0, toNode: 'or1', toPin: 0 },
          { id: 'w10', fromNode: 'and2', fromPin: 0, toNode: 'or1', toPin: 1 },
          { id: 'w11', fromNode: 'xor2', fromPin: 0, toNode: 'outS', toPin: 0 },
          { id: 'w12', fromNode: 'or1', fromPin: 0, toNode: 'outCout', toPin: 0 }
        ]
      }
    ]
  },

  // 2. ARQUITECTURA INTERNA DEL DECODIFICADOR BCD A 7 SEGMENTOS (74LS47 / 74LS48 + DISPLAY)
  BCD_7SEG_HIERARCHY: {
    id: 'BCD_7SEG_HIERARCHY',
    title: 'Arquitectura Jerárquica del Decodificador BCD a 7 Segmentos (74LS47 / 74LS48)',
    levels: [
      {
        level: 1,
        shortName: '1. CI 74LS47 / 74LS48 + Display',
        title: 'Nivel 1 (Mayor): Decodificador BCD a 7 Segmentos Conectado a Display',
        subtitle: 'Convierte el código binario BCD (D, C, B, A) en las 7 señales (a..g) que iluminan el dígito decimal en el Display.',
        formulas: ['\\text{Entrada BCD } (D,C,B,A) \\implies \\text{Segmentos } (a,b,c,d,e,f,g)'],
        nodes: [
          { id: 'inD', type: 'INPUT', label: 'D', x: 100, y: 65, state: [0] },
          { id: 'inC', type: 'INPUT', label: 'C', x: 100, y: 115, state: [1] },
          { id: 'inB', type: 'INPUT', label: 'B', x: 100, y: 165, state: [0] },
          { id: 'inA', type: 'INPUT', label: 'A', x: 100, y: 215, state: [1] },
          { id: 'decoBcd', type: 'BCD_7SEG', label: '74LS48 (BCD-7Seg)', x: 280, y: 55 },
          { id: 'disp7', type: 'DISPLAY_7SEG_CC', label: 'Display 7-Seg', x: 540, y: 55 },
          { id: 'outA', type: 'OUTPUT', label: 'a', x: 720, y: 40 },
          { id: 'outB', type: 'OUTPUT', label: 'b', x: 720, y: 78 },
          { id: 'outC', type: 'OUTPUT', label: 'c', x: 720, y: 116 },
          { id: 'outD', type: 'OUTPUT', label: 'd', x: 720, y: 154 },
          { id: 'outE', type: 'OUTPUT', label: 'e', x: 720, y: 192 },
          { id: 'outF', type: 'OUTPUT', label: 'f', x: 720, y: 230 },
          { id: 'outG', type: 'OUTPUT', label: 'g', x: 720, y: 268 }
        ],
        wires: [
          { id: 'w1', fromNode: 'inD', fromPin: 0, toNode: 'decoBcd', toPin: 0 },
          { id: 'w2', fromNode: 'inC', fromPin: 0, toNode: 'decoBcd', toPin: 1 },
          { id: 'w3', fromNode: 'inB', fromPin: 0, toNode: 'decoBcd', toPin: 2 },
          { id: 'w4', fromNode: 'inA', fromPin: 0, toNode: 'decoBcd', toPin: 3 },
          { id: 'ws0', fromNode: 'decoBcd', fromPin: 0, toNode: 'disp7', toPin: 0 },
          { id: 'ws1', fromNode: 'decoBcd', fromPin: 1, toNode: 'disp7', toPin: 1 },
          { id: 'ws2', fromNode: 'decoBcd', fromPin: 2, toNode: 'disp7', toPin: 2 },
          { id: 'ws3', fromNode: 'decoBcd', fromPin: 3, toNode: 'disp7', toPin: 3 },
          { id: 'ws4', fromNode: 'decoBcd', fromPin: 4, toNode: 'disp7', toPin: 4 },
          { id: 'ws5', fromNode: 'decoBcd', fromPin: 5, toNode: 'disp7', toPin: 5 },
          { id: 'ws6', fromNode: 'decoBcd', fromPin: 6, toNode: 'disp7', toPin: 6 },
          { id: 'wo0', fromNode: 'decoBcd', fromPin: 0, toNode: 'outA', toPin: 0 },
          { id: 'wo1', fromNode: 'decoBcd', fromPin: 1, toNode: 'outB', toPin: 0 },
          { id: 'wo2', fromNode: 'decoBcd', fromPin: 2, toNode: 'outC', toPin: 0 },
          { id: 'wo3', fromNode: 'decoBcd', fromPin: 3, toNode: 'outD', toPin: 0 },
          { id: 'wo4', fromNode: 'decoBcd', fromPin: 4, toNode: 'outE', toPin: 0 },
          { id: 'wo5', fromNode: 'decoBcd', fromPin: 5, toNode: 'outF', toPin: 0 },
          { id: 'wo6', fromNode: 'decoBcd', fromPin: 6, toNode: 'outG', toPin: 0 }
        ]
      },
      {
        level: 2,
        shortName: '2. Etapa Decodificador BCD + Sumadores SOP',
        title: 'Nivel 2: Decodificador BCD a Decimal (74LS42) + Matriz OR de Segmentos',
        subtitle: 'El código BCD se decodifica primero en sus minitérminos decimales (0..9) y luego se suman con compuertas OR para cada segmento.',
        formulas: ['a = \\sum m(0,2,3,5,6,7,8,9)', 'b = \\sum m(0,1,2,3,4,7,8,9)'],
        nodes: [
          { id: 'inD', type: 'INPUT', label: 'D', x: 80, y: 70, state: [0] },
          { id: 'inC', type: 'INPUT', label: 'C', x: 80, y: 120, state: [1] },
          { id: 'inB', type: 'INPUT', label: 'B', x: 80, y: 170, state: [0] },
          { id: 'inA', type: 'INPUT', label: 'A', x: 80, y: 220, state: [1] },
          { id: 'dec42', type: 'IC_7442', label: 'DEC BCD 4:10', x: 230, y: 50 },
          { id: 'orSegA', type: 'OR8', label: 'OR Seg a', x: 460, y: 30 },
          { id: 'orSegB', type: 'OR8', label: 'OR Seg b', x: 460, y: 240 },
          { id: 'outSegA', type: 'OUTPUT', label: 'a', x: 650, y: 110 },
          { id: 'outSegB', type: 'OUTPUT', label: 'b', x: 650, y: 320 }
        ],
        wires: [
          { id: 'w1', fromNode: 'inD', fromPin: 0, toNode: 'dec42', toPin: 0 },
          { id: 'w2', fromNode: 'inC', fromPin: 0, toNode: 'dec42', toPin: 1 },
          { id: 'w3', fromNode: 'inB', fromPin: 0, toNode: 'dec42', toPin: 2 },
          { id: 'w4', fromNode: 'inA', fromPin: 0, toNode: 'dec42', toPin: 3 },
          { id: 'wa0', fromNode: 'dec42', fromPin: 0, toNode: 'orSegA', toPin: 0 },
          { id: 'wa2', fromNode: 'dec42', fromPin: 2, toNode: 'orSegA', toPin: 1 },
          { id: 'wa3', fromNode: 'dec42', fromPin: 3, toNode: 'orSegA', toPin: 2 },
          { id: 'wa5', fromNode: 'dec42', fromPin: 5, toNode: 'orSegA', toPin: 3 },
          { id: 'wa6', fromNode: 'dec42', fromPin: 6, toNode: 'orSegA', toPin: 4 },
          { id: 'wa7', fromNode: 'dec42', fromPin: 7, toNode: 'orSegA', toPin: 5 },
          { id: 'wa8', fromNode: 'dec42', fromPin: 8, toNode: 'orSegA', toPin: 6 },
          { id: 'wa9', fromNode: 'dec42', fromPin: 9, toNode: 'orSegA', toPin: 7 },
          { id: 'wb0', fromNode: 'dec42', fromPin: 0, toNode: 'orSegB', toPin: 0 },
          { id: 'wb1', fromNode: 'dec42', fromPin: 1, toNode: 'orSegB', toPin: 1 },
          { id: 'wb2', fromNode: 'dec42', fromPin: 2, toNode: 'orSegB', toPin: 2 },
          { id: 'wb3', fromNode: 'dec42', fromPin: 3, toNode: 'orSegB', toPin: 3 },
          { id: 'wb4', fromNode: 'dec42', fromPin: 4, toNode: 'orSegB', toPin: 4 },
          { id: 'wb7', fromNode: 'dec42', fromPin: 7, toNode: 'orSegB', toPin: 5 },
          { id: 'wb8', fromNode: 'dec42', fromPin: 8, toNode: 'orSegB', toPin: 6 },
          { id: 'wb9', fromNode: 'dec42', fromPin: 9, toNode: 'orSegB', toPin: 7 },
          { id: 'woa', fromNode: 'orSegA', fromPin: 0, toNode: 'outSegA', toPin: 0 },
          { id: 'wob', fromNode: 'orSegB', fromPin: 0, toNode: 'outSegB', toPin: 0 }
        ]
      },
      {
        level: 3,
        shortName: '3. Compuertas Básicas (NOT, AND, OR)',
        title: 'Nivel 3 (Menor): Compuertas Lógicas Básicas de Síntesis de Segmentos (a, b, c)',
        subtitle: 'Implementación mediante mapas de Karnaugh con inversores NOT, compuertas AND y OR para los segmentos del display.',
        formulas: ["a = D + B + C\\cdot A + C'\\cdot A'", "c = C + B' + A"],
        nodes: [
          { id: 'inD', type: 'INPUT', label: 'D', x: 80, y: 40, state: [0] },
          { id: 'inC', type: 'INPUT', label: 'C', x: 80, y: 105, state: [1] },
          { id: 'inB', type: 'INPUT', label: 'B', x: 80, y: 170, state: [0] },
          { id: 'inA', type: 'INPUT', label: 'A', x: 80, y: 235, state: [1] },
          { id: 'notC', type: 'NOT', label: 'NOT_C', x: 220, y: 115 },
          { id: 'notB', type: 'NOT', label: 'NOT_B', x: 220, y: 180 },
          { id: 'notA', type: 'NOT', label: 'NOT_A', x: 220, y: 245 },
          { id: 'andCA', type: 'AND', label: 'C·A', x: 370, y: 85 },
          { id: 'andNcNa', type: 'AND', label: "C'·A'", x: 370, y: 165 },
          { id: 'orSegA', type: 'OR4', label: 'OR_a', x: 540, y: 65 },
          { id: 'orSegC', type: 'OR3', label: 'OR_c', x: 540, y: 210 },
          { id: 'outA', type: 'OUTPUT', label: 'a', x: 700, y: 92 },
          { id: 'outC', type: 'OUTPUT', label: 'c', x: 700, y: 228 }
        ],
        wires: [
          { id: 'w1', fromNode: 'inC', fromPin: 0, toNode: 'notC', toPin: 0 },
          { id: 'w2', fromNode: 'inB', fromPin: 0, toNode: 'notB', toPin: 0 },
          { id: 'w3', fromNode: 'inA', fromPin: 0, toNode: 'notA', toPin: 0 },
          { id: 'w4', fromNode: 'inC', fromPin: 0, toNode: 'andCA', toPin: 0 },
          { id: 'w5', fromNode: 'inA', fromPin: 0, toNode: 'andCA', toPin: 1 },
          { id: 'w6', fromNode: 'notC', fromPin: 0, toNode: 'andNcNa', toPin: 0 },
          { id: 'w7', fromNode: 'notA', fromPin: 0, toNode: 'andNcNa', toPin: 1 },
          { id: 'w8', fromNode: 'inD', fromPin: 0, toNode: 'orSegA', toPin: 0 },
          { id: 'w9', fromNode: 'inB', fromPin: 0, toNode: 'orSegA', toPin: 1 },
          { id: 'w10', fromNode: 'andCA', fromPin: 0, toNode: 'orSegA', toPin: 2 },
          { id: 'w11', fromNode: 'andNcNa', fromPin: 0, toNode: 'orSegA', toPin: 3 },
          { id: 'w12', fromNode: 'inC', fromPin: 0, toNode: 'orSegC', toPin: 0 },
          { id: 'w13', fromNode: 'notB', fromPin: 0, toNode: 'orSegC', toPin: 1 },
          { id: 'w14', fromNode: 'inA', fromPin: 0, toNode: 'orSegC', toPin: 2 },
          { id: 'w15', fromNode: 'orSegA', fromPin: 0, toNode: 'outA', toPin: 0 },
          { id: 'w16', fromNode: 'orSegC', fromPin: 0, toNode: 'outC', toPin: 0 }
        ]
      }
    ]
  },

  // 3. ARQUITECTURA INTERNA DE DECODIFICADORES (4 A 16 -> 3 A 8 -> 2 A 4 -> COMPUERTAS)
  DECODER_HIERARCHY: {
    id: 'DECODER_HIERARCHY',
    title: 'Arquitectura Jerárquica de Decodificadores Binarios (De 4:16 a Compuertas)',
    levels: [
      {
        level: 1,
        shortName: '1. Decodificador 4 a 16 (74LS154)',
        title: 'Nivel 1 (Mayor): Circuito Integrado Decodificador 4 a 16 (74LS154)',
        subtitle: 'Bloque MSI de 4 entradas (A3..A0) que direcciona 2⁴ = 16 líneas de salida.',
        formulas: ['O_k = 1 \\iff k = (A_3 A_2 A_1 A_0)_2'],
        nodes: [
          { id: 'a3', type: 'INPUT', label: 'A3', x: 110, y: 80, state: [0] },
          { id: 'a2', type: 'INPUT', label: 'A2', x: 110, y: 140, state: [1] },
          { id: 'a1', type: 'INPUT', label: 'A1', x: 110, y: 200, state: [0] },
          { id: 'a0', type: 'INPUT', label: 'A0', x: 110, y: 260, state: [1] },
          { id: 'ic154', type: 'IC_74154', label: 'DEC 4a16', x: 310, y: 30 },
          { id: 'o0', type: 'OUTPUT', label: 'O0', x: 560, y: 40 },
          { id: 'o5', type: 'OUTPUT', label: 'O5', x: 560, y: 150 },
          { id: 'o10', type: 'OUTPUT', label: 'O10', x: 560, y: 260 },
          { id: 'o15', type: 'OUTPUT', label: 'O15', x: 560, y: 360 }
        ],
        wires: [
          { id: 'w1', fromNode: 'a3', fromPin: 0, toNode: 'ic154', toPin: 0 },
          { id: 'w2', fromNode: 'a2', fromPin: 0, toNode: 'ic154', toPin: 1 },
          { id: 'w3', fromNode: 'a1', fromPin: 0, toNode: 'ic154', toPin: 2 },
          { id: 'w4', fromNode: 'a0', fromPin: 0, toNode: 'ic154', toPin: 3 },
          { id: 'wo0', fromNode: 'ic154', fromPin: 0, toNode: 'o0', toPin: 0 },
          { id: 'wo5', fromNode: 'ic154', fromPin: 5, toNode: 'o5', toPin: 0 },
          { id: 'wo10', fromNode: 'ic154', fromPin: 10, toNode: 'o10', toPin: 0 },
          { id: 'wo15', fromNode: 'ic154', fromPin: 15, toNode: 'o15', toPin: 0 }
        ]
      },
      {
        level: 2,
        shortName: '2. Taller: Árbol de Decodificadores 2 a 4',
        title: 'Nivel 2: Desarrollo de Decodificador 4 a 16 en base a Decodificadores 2 a 4 (Taller Pág. 18)',
        subtitle: '1 Decodificador 2 a 4 maestro selecciona cuál de los 4 Decodificadores 2 a 4 esclavos se habilita.',
        formulas: ['E_m = \\text{DEC}_{2:4}(A_3, A_2)', 'O_{4m+k} = E_m \\cdot \\text{DEC}_{2:4}(A_1, A_0)'],
        nodes: [
          { id: 'a3', type: 'INPUT', label: 'A3', x: 70, y: 60, state: [0] },
          { id: 'a2', type: 'INPUT', label: 'A2', x: 70, y: 110, state: [1] },
          { id: 'a1', type: 'INPUT', label: 'A1', x: 70, y: 240, state: [0] },
          { id: 'a0', type: 'INPUT', label: 'A0', x: 70, y: 290, state: [1] },
          { id: 'decMaster', type: 'DEC_2_4', label: 'DEC0 (Maestro)', x: 220, y: 50 },
          { id: 'decS0', type: 'DEC_2_4_EN', label: 'DEC1 (O0..O3)', x: 450, y: 20 },
          { id: 'decS1', type: 'DEC_2_4_EN', label: 'DEC2 (O4..O7)', x: 450, y: 190 },
          { id: 'outO0', type: 'OUTPUT', label: 'O0', x: 670, y: 30 },
          { id: 'outO1', type: 'OUTPUT', label: 'O1', x: 670, y: 75 },
          { id: 'outO4', type: 'OUTPUT', label: 'O4', x: 670, y: 200 },
          { id: 'outO5', type: 'OUTPUT', label: 'O5', x: 670, y: 245 }
        ],
        wires: [
          { id: 'wm1', fromNode: 'a3', fromPin: 0, toNode: 'decMaster', toPin: 0 },
          { id: 'wm2', fromNode: 'a2', fromPin: 0, toNode: 'decMaster', toPin: 1 },
          { id: 'we0', fromNode: 'decMaster', fromPin: 0, toNode: 'decS0', toPin: 2 },
          { id: 'we1', fromNode: 'decMaster', fromPin: 1, toNode: 'decS1', toPin: 2 },
          { id: 'wa10', fromNode: 'a1', fromPin: 0, toNode: 'decS0', toPin: 0 },
          { id: 'wa00', fromNode: 'a0', fromPin: 0, toNode: 'decS0', toPin: 1 },
          { id: 'wa11', fromNode: 'a1', fromPin: 0, toNode: 'decS1', toPin: 0 },
          { id: 'wa01', fromNode: 'a0', fromPin: 0, toNode: 'decS1', toPin: 1 },
          { id: 'wo0', fromNode: 'decS0', fromPin: 0, toNode: 'outO0', toPin: 0 },
          { id: 'wo1', fromNode: 'decS0', fromPin: 1, toNode: 'outO1', toPin: 0 },
          { id: 'wo4', fromNode: 'decS1', fromPin: 0, toNode: 'outO4', toPin: 0 },
          { id: 'wo5', fromNode: 'decS1', fromPin: 1, toNode: 'outO5', toPin: 0 }
        ]
      },
      {
        level: 3,
        shortName: '3. Compuertas del Decodificador 2 a 4',
        title: 'Nivel 3: Interior del Decodificador 2 a 4 con Compuertas Básicas (Pág. 6)',
        subtitle: '2 Inversores NOT y 4 Compuertas AND que detectan cada combinación binaria de A1 y A0.',
        formulas: ["O_0 = A_1' A_0'", "O_1 = A_1' A_0", "O_2 = A_1 A_0'", "O_3 = A_1 A_0"],
        nodes: [
          { id: 'inA1', type: 'INPUT', label: 'A1', x: 90, y: 65, state: [1] },
          { id: 'inA0', type: 'INPUT', label: 'A0', x: 90, y: 165, state: [0] },
          { id: 'notA1', type: 'NOT', label: 'NOT1', x: 230, y: 60 },
          { id: 'notA0', type: 'NOT', label: 'NOT0', x: 230, y: 160 },
          { id: 'and0', type: 'AND', label: 'AND0', x: 420, y: 35 },
          { id: 'and1', type: 'AND', label: 'AND1', x: 420, y: 115 },
          { id: 'and2', type: 'AND', label: 'AND2', x: 420, y: 195 },
          { id: 'and3', type: 'AND', label: 'AND3', x: 420, y: 275 },
          { id: 'outO0', type: 'OUTPUT', label: 'O0', x: 590, y: 47 },
          { id: 'outO1', type: 'OUTPUT', label: 'O1', x: 590, y: 127 },
          { id: 'outO2', type: 'OUTPUT', label: 'O2', x: 590, y: 207 },
          { id: 'outO3', type: 'OUTPUT', label: 'O3', x: 590, y: 287 }
        ],
        wires: [
          { id: 'w1', fromNode: 'inA1', fromPin: 0, toNode: 'notA1', toPin: 0 },
          { id: 'w2', fromNode: 'inA0', fromPin: 0, toNode: 'notA0', toPin: 0 },
          { id: 'w3', fromNode: 'notA1', fromPin: 0, toNode: 'and0', toPin: 0 },
          { id: 'w4', fromNode: 'notA0', fromPin: 0, toNode: 'and0', toPin: 1 },
          { id: 'w5', fromNode: 'notA1', fromPin: 0, toNode: 'and1', toPin: 0 },
          { id: 'w6', fromNode: 'inA0', fromPin: 0, toNode: 'and1', toPin: 1 },
          { id: 'w7', fromNode: 'inA1', fromPin: 0, toNode: 'and2', toPin: 0 },
          { id: 'w8', fromNode: 'notA0', fromPin: 0, toNode: 'and2', toPin: 1 },
          { id: 'w9', fromNode: 'inA1', fromPin: 0, toNode: 'and3', toPin: 0 },
          { id: 'w10', fromNode: 'inA0', fromPin: 0, toNode: 'and3', toPin: 1 },
          { id: 'w11', fromNode: 'and0', fromPin: 0, toNode: 'outO0', toPin: 0 },
          { id: 'w12', fromNode: 'and1', fromPin: 0, toNode: 'outO1', toPin: 0 },
          { id: 'w13', fromNode: 'and2', fromPin: 0, toNode: 'outO2', toPin: 0 },
          { id: 'w14', fromNode: 'and3', fromPin: 0, toNode: 'outO3', toPin: 0 }
        ]
      },
      {
        level: 4,
        shortName: '4. Decodificador Elemental 1 a 2 (Inversor)',
        title: 'Nivel 4 (Menor): Decodificador 1 a 2 con un solo Inversor NOT (Pág. 5)',
        subtitle: 'Célula mínima de decodificación: para A0=0 activa O0 y para A0=1 activa O1.',
        formulas: ["O_0 = A_0'", 'O_1 = A_0'],
        nodes: [
          { id: 'inA0', type: 'INPUT', label: 'A0', x: 140, y: 120, state: [0] },
          { id: 'not0', type: 'NOT', label: 'U1 (NOT)', x: 320, y: 80 },
          { id: 'outO0', type: 'OUTPUT', label: 'O0', x: 500, y: 88 },
          { id: 'outO1', type: 'OUTPUT', label: 'O1', x: 500, y: 168 }
        ],
        wires: [
          { id: 'w1', fromNode: 'inA0', fromPin: 0, toNode: 'not0', toPin: 0 },
          { id: 'w2', fromNode: 'not0', fromPin: 0, toNode: 'outO0', toPin: 0 },
          { id: 'w3', fromNode: 'inA0', fromPin: 0, toNode: 'outO1', toPin: 0 }
        ]
      }
    ]
  },

  // 4. ARQUITECTURA INTERNA DE CODIFICADORES (74LS148 / 8 A 3 -> COMPUERTAS OR)
  ENCODER_HIERARCHY: {
    id: 'ENCODER_HIERARCHY',
    title: 'Arquitectura Jerárquica de Codificadores (8 a 3 y Prioridad 74LS148)',
    levels: [
      {
        level: 1,
        shortName: '1. Bloque Codificador 8 a 3',
        title: 'Nivel 1 (Mayor): Circuito Integrado Codificador 8 a 3 (SN74LS148 / ENC 8:3)',
        subtitle: 'Convierte 8 líneas de entrada (I0..I7) en su código binario de 3 bits (A2, A1, A0).',
        formulas: ['A_2 = I_4+I_5+I_6+I_7', 'A_1 = I_2+I_3+I_6+I_7', 'A_0 = I_1+I_3+I_5+I_7'],
        nodes: [
          { id: 'i0', type: 'INPUT', label: 'I0', x: 100, y: 30, state: [0] },
          { id: 'i1', type: 'INPUT', label: 'I1', x: 100, y: 70, state: [0] },
          { id: 'i2', type: 'INPUT', label: 'I2', x: 100, y: 110, state: [0] },
          { id: 'i3', type: 'INPUT', label: 'I3', x: 100, y: 150, state: [0] },
          { id: 'i4', type: 'INPUT', label: 'I4', x: 100, y: 190, state: [0] },
          { id: 'i5', type: 'INPUT', label: 'I5', x: 100, y: 230, state: [1] },
          { id: 'i6', type: 'INPUT', label: 'I6', x: 100, y: 270, state: [0] },
          { id: 'i7', type: 'INPUT', label: 'I7', x: 100, y: 310, state: [0] },
          { id: 'enc', type: 'ENC_PRIO_8_3', label: 'ENC 8:3', x: 320, y: 70 },
          { id: 'a2', type: 'OUTPUT', label: 'A2', x: 560, y: 100 },
          { id: 'a1', type: 'OUTPUT', label: 'A1', x: 560, y: 165 },
          { id: 'a0', type: 'OUTPUT', label: 'A0', x: 560, y: 230 }
        ],
        wires: [
          { id: 'w0', fromNode: 'i0', fromPin: 0, toNode: 'enc', toPin: 0 },
          { id: 'w1', fromNode: 'i1', fromPin: 0, toNode: 'enc', toPin: 1 },
          { id: 'w2', fromNode: 'i2', fromPin: 0, toNode: 'enc', toPin: 2 },
          { id: 'w3', fromNode: 'i3', fromPin: 0, toNode: 'enc', toPin: 3 },
          { id: 'w4', fromNode: 'i4', fromPin: 0, toNode: 'enc', toPin: 4 },
          { id: 'w5', fromNode: 'i5', fromPin: 0, toNode: 'enc', toPin: 5 },
          { id: 'w6', fromNode: 'i6', fromPin: 0, toNode: 'enc', toPin: 6 },
          { id: 'w7', fromNode: 'i7', fromPin: 0, toNode: 'enc', toPin: 7 },
          { id: 'wa2', fromNode: 'enc', fromPin: 0, toNode: 'a2', toPin: 0 },
          { id: 'wa1', fromNode: 'enc', fromPin: 1, toNode: 'a1', toPin: 0 },
          { id: 'wa0', fromNode: 'enc', fromPin: 2, toNode: 'a0', toPin: 0 }
        ]
      },
      {
        level: 2,
        shortName: '2. Compuertas Básicas OR (Pág. 14)',
        title: 'Nivel 2 (Menor): Implementación Interna del Codificador 8 a 3 con Compuertas OR (Pág. 14)',
        subtitle: 'Construcción mediante 3 compuertas OR de 4 entradas según las ecuaciones de conversión binaria.',
        formulas: ['A_2 = I_4 + I_5 + I_6 + I_7', 'A_1 = I_2 + I_3 + I_6 + I_7', 'A_0 = I_1 + I_3 + I_5 + I_7'],
        nodes: [
          { id: 'i0', type: 'INPUT', label: 'I0', x: 100, y: 24, state: [0] },
          { id: 'i1', type: 'INPUT', label: 'I1', x: 100, y: 66, state: [0] },
          { id: 'i2', type: 'INPUT', label: 'I2', x: 100, y: 108, state: [0] },
          { id: 'i3', type: 'INPUT', label: 'I3', x: 100, y: 150, state: [0] },
          { id: 'i4', type: 'INPUT', label: 'I4', x: 100, y: 192, state: [0] },
          { id: 'i5', type: 'INPUT', label: 'I5', x: 100, y: 234, state: [1] },
          { id: 'i6', type: 'INPUT', label: 'I6', x: 100, y: 276, state: [0] },
          { id: 'i7', type: 'INPUT', label: 'I7', x: 100, y: 318, state: [0] },
          { id: 'orA2', type: 'OR4', label: 'OR_A2', x: 380, y: 40 },
          { id: 'orA1', type: 'OR4', label: 'OR_A1', x: 380, y: 150 },
          { id: 'orA0', type: 'OR4', label: 'OR_A0', x: 380, y: 260 },
          { id: 'outA2', type: 'OUTPUT', label: 'A2', x: 580, y: 67 },
          { id: 'outA1', type: 'OUTPUT', label: 'A1', x: 580, y: 177 },
          { id: 'outA0', type: 'OUTPUT', label: 'A0', x: 580, y: 287 }
        ],
        wires: [
          { id: 'w1', fromNode: 'i4', fromPin: 0, toNode: 'orA2', toPin: 0 },
          { id: 'w2', fromNode: 'i5', fromPin: 0, toNode: 'orA2', toPin: 1 },
          { id: 'w3', fromNode: 'i6', fromPin: 0, toNode: 'orA2', toPin: 2 },
          { id: 'w4', fromNode: 'i7', fromPin: 0, toNode: 'orA2', toPin: 3 },
          { id: 'w5', fromNode: 'i2', fromPin: 0, toNode: 'orA1', toPin: 0 },
          { id: 'w6', fromNode: 'i3', fromPin: 0, toNode: 'orA1', toPin: 1 },
          { id: 'w7', fromNode: 'i6', fromPin: 0, toNode: 'orA1', toPin: 2 },
          { id: 'w8', fromNode: 'i7', fromPin: 0, toNode: 'orA1', toPin: 3 },
          { id: 'w9', fromNode: 'i1', fromPin: 0, toNode: 'orA0', toPin: 0 },
          { id: 'w10', fromNode: 'i3', fromPin: 0, toNode: 'orA0', toPin: 1 },
          { id: 'w11', fromNode: 'i5', fromPin: 0, toNode: 'orA0', toPin: 2 },
          { id: 'w12', fromNode: 'i7', fromPin: 0, toNode: 'orA0', toPin: 3 },
          { id: 'wo2', fromNode: 'orA2', fromPin: 0, toNode: 'outA2', toPin: 0 },
          { id: 'wo1', fromNode: 'orA1', fromPin: 0, toNode: 'outA1', toPin: 0 },
          { id: 'wo0', fromNode: 'orA0', fromPin: 0, toNode: 'outA0', toPin: 0 }
        ]
      }
    ]
  },

  // 5. ARQUITECTURA INTERNA DE COMPARADORES (74LS85 -> 1 BIT -> COMPUERTAS)
  COMPARATOR_HIERARCHY: {
    id: 'COMPARATOR_HIERARCHY',
    title: 'Arquitectura Jerárquica del Comparador de Magnitud (74LS85)',
    levels: [
      {
        level: 1,
        shortName: '1. CI 74LS85 (4 bits)',
        title: 'Nivel 1 (Mayor): Circuito Integrado Comparador de 4 Bits (74LS85)',
        subtitle: 'Compara dos palabras de 4 bits (A y B) determinando si A > B, A = B o A < B.',
        formulas: ['(A > B), \\quad (A = B), \\quad (A < B)'],
        nodes: [
          { id: 'a3', type: 'INPUT', label: 'A3', x: 110, y: 34, state: [1] },
          { id: 'a2', type: 'INPUT', label: 'A2', x: 110, y: 68, state: [0] },
          { id: 'a1', type: 'INPUT', label: 'A1', x: 110, y: 102, state: [1] },
          { id: 'a0', type: 'INPUT', label: 'A0', x: 110, y: 136, state: [0] },
          { id: 'b3', type: 'INPUT', label: 'B3', x: 110, y: 178, state: [0] },
          { id: 'b2', type: 'INPUT', label: 'B2', x: 110, y: 212, state: [1] },
          { id: 'b1', type: 'INPUT', label: 'B1', x: 110, y: 246, state: [1] },
          { id: 'b0', type: 'INPUT', label: 'B0', x: 110, y: 280, state: [0] },
          { id: 'gndGT', type: 'GND', label: 'I>', x: 110, y: 320 },
          { id: 'vccEQ', type: 'VCC', label: 'I=', x: 110, y: 354 },
          { id: 'gndLT', type: 'GND', label: 'I<', x: 110, y: 388 },
          { id: 'ic85', type: 'IC_7485', label: '74LS85', x: 340, y: 80 },
          { id: 'outGT', type: 'OUTPUT', label: 'A > B', x: 580, y: 86 },
          { id: 'outEQ', type: 'OUTPUT', label: 'A = B', x: 580, y: 202 },
          { id: 'outLT', type: 'OUTPUT', label: 'A < B', x: 580, y: 318 }
        ],
        wires: [
          { id: 'w1', fromNode: 'a3', fromPin: 0, toNode: 'ic85', toPin: 0 },
          { id: 'w2', fromNode: 'a2', fromPin: 0, toNode: 'ic85', toPin: 1 },
          { id: 'w3', fromNode: 'a1', fromPin: 0, toNode: 'ic85', toPin: 2 },
          { id: 'w4', fromNode: 'a0', fromPin: 0, toNode: 'ic85', toPin: 3 },
          { id: 'w5', fromNode: 'b3', fromPin: 0, toNode: 'ic85', toPin: 4 },
          { id: 'w6', fromNode: 'b2', fromPin: 0, toNode: 'ic85', toPin: 5 },
          { id: 'w7', fromNode: 'b1', fromPin: 0, toNode: 'ic85', toPin: 6 },
          { id: 'w8', fromNode: 'b0', fromPin: 0, toNode: 'ic85', toPin: 7 },
          { id: 'w9', fromNode: 'gndGT', fromPin: 0, toNode: 'ic85', toPin: 8 },
          { id: 'w10', fromNode: 'vccEQ', fromPin: 0, toNode: 'ic85', toPin: 9 },
          { id: 'w11', fromNode: 'gndLT', fromPin: 0, toNode: 'ic85', toPin: 10 },
          { id: 'w12', fromNode: 'ic85', fromPin: 0, toNode: 'outGT', toPin: 0 },
          { id: 'w13', fromNode: 'ic85', fromPin: 1, toNode: 'outEQ', toPin: 0 },
          { id: 'w14', fromNode: 'ic85', fromPin: 2, toNode: 'outLT', toPin: 0 }
        ]
      },
      {
        level: 2,
        shortName: '2. Bloque Comparador 1 Bit',
        title: 'Nivel 2: Módulo Comparador Elemental de 1 Bit',
        subtitle: 'Célula comparadora de un par de bits (Ai, Bi).',
        formulas: ["(A>B) = A\\cdot B'", '(A=B) = (A\\oplus B)\'', "(A<B) = A'\\cdot B"],
        nodes: [
          { id: 'inA', type: 'INPUT', label: 'A', x: 140, y: 90, state: [1] },
          { id: 'inB', type: 'INPUT', label: 'B', x: 140, y: 170, state: [0] },
          { id: 'comp1', type: 'COMP_1BIT', label: 'COMP 1B', x: 320, y: 80 },
          { id: 'outGT', type: 'OUTPUT', label: 'A > B', x: 540, y: 82 },
          { id: 'outEQ', type: 'OUTPUT', label: 'A = B', x: 540, y: 128 },
          { id: 'outLT', type: 'OUTPUT', label: 'A < B', x: 540, y: 174 }
        ],
        wires: [
          { id: 'w1', fromNode: 'inA', fromPin: 0, toNode: 'comp1', toPin: 0 },
          { id: 'w2', fromNode: 'inB', fromPin: 0, toNode: 'comp1', toPin: 1 },
          { id: 'w3', fromNode: 'comp1', fromPin: 0, toNode: 'outGT', toPin: 0 },
          { id: 'w4', fromNode: 'comp1', fromPin: 1, toNode: 'outEQ', toPin: 0 },
          { id: 'w5', fromNode: 'comp1', fromPin: 2, toNode: 'outLT', toPin: 0 }
        ]
      },
      {
        level: 3,
        shortName: '3. Compuertas Básicas (NOT, AND, NOR)',
        title: 'Nivel 3 (Menor): Compuertas Lógicas Básicas del Comparador',
        subtitle: 'Implementación mediante inversores NOT, compuertas AND y compuerta NOR de igualdad.',
        formulas: ["(A < B) = A'B", "(A = B) = (A'B + AB')'", "(A > B) = AB'"],
        nodes: [
          { id: 'inA', type: 'INPUT', label: 'A', x: 110, y: 90, state: [1] },
          { id: 'inB', type: 'INPUT', label: 'B', x: 110, y: 240, state: [0] },
          { id: 'notA', type: 'NOT', label: 'U1', x: 250, y: 65 },
          { id: 'notB', type: 'NOT', label: 'U2', x: 250, y: 255 },
          { id: 'andLess', type: 'AND', label: 'U3', x: 410, y: 75 },
          { id: 'andGreater', type: 'AND', label: 'U4', x: 410, y: 235 },
          { id: 'norEq', type: 'NOR', label: 'U5', x: 560, y: 155 },
          { id: 'outLess', type: 'OUTPUT', label: 'A < B', x: 720, y: 87 },
          { id: 'outEq', type: 'OUTPUT', label: 'A = B', x: 720, y: 167 },
          { id: 'outGreater', type: 'OUTPUT', label: 'A > B', x: 720, y: 247 }
        ],
        wires: [
          { id: 'w1', fromNode: 'inA', fromPin: 0, toNode: 'notA', toPin: 0 },
          { id: 'w2', fromNode: 'inB', fromPin: 0, toNode: 'notB', toPin: 0 },
          { id: 'w3', fromNode: 'notA', fromPin: 0, toNode: 'andLess', toPin: 0 },
          { id: 'w4', fromNode: 'inB', fromPin: 0, toNode: 'andLess', toPin: 1 },
          { id: 'w5', fromNode: 'inA', fromPin: 0, toNode: 'andGreater', toPin: 0 },
          { id: 'w6', fromNode: 'notB', fromPin: 0, toNode: 'andGreater', toPin: 1 },
          { id: 'w7', fromNode: 'andLess', fromPin: 0, toNode: 'norEq', toPin: 0 },
          { id: 'w8', fromNode: 'andGreater', fromPin: 0, toNode: 'norEq', toPin: 1 },
          { id: 'w9', fromNode: 'andLess', fromPin: 0, toNode: 'outLess', toPin: 0 },
          { id: 'w10', fromNode: 'norEq', fromPin: 0, toNode: 'outEq', toPin: 0 },
          { id: 'w11', fromNode: 'andGreater', fromPin: 0, toNode: 'outGreater', toPin: 0 }
        ]
      }
    ]
  },

  // 6. ARQUITECTURA INTERNA DE MULTIPLEXORES (MUX -> DECODIFICADOR + COMPUERTAS)
  MUX_HIERARCHY: {
    id: 'MUX_HIERARCHY',
    title: 'Arquitectura Jerárquica de Multiplexores (74LS153 / 74LS151)',
    levels: [
      {
        level: 1,
        shortName: '1. Bloque Multiplexor 4:1',
        title: 'Nivel 1 (Mayor): Circuito Integrado Multiplexor 4:1 (74LS153)',
        subtitle: 'Selecciona uno de los 4 canales de entrada (I0..I3) según los bits de control S1 y S0.',
        formulas: ["Y = I_0 S_1' S_0' + I_1 S_1' S_0 + I_2 S_1 S_0' + I_3 S_1 S_0"],
        nodes: [
          { id: 'i0', type: 'INPUT', label: 'I0', x: 130, y: 55, state: [1] },
          { id: 'i1', type: 'INPUT', label: 'I1', x: 130, y: 95, state: [0] },
          { id: 'i2', type: 'INPUT', label: 'I2', x: 130, y: 135, state: [1] },
          { id: 'i3', type: 'INPUT', label: 'I3', x: 130, y: 175, state: [0] },
          { id: 's1', type: 'INPUT', label: 'S1', x: 130, y: 225, state: [0] },
          { id: 's0', type: 'INPUT', label: 'S0', x: 130, y: 265, state: [0] },
          { id: 'mux4', type: 'MUX_4_1', label: 'MUX 4:1', x: 350, y: 80 },
          { id: 'outY', type: 'OUTPUT', label: 'Y', x: 560, y: 150 }
        ],
        wires: [
          { id: 'w1', fromNode: 'i0', fromPin: 0, toNode: 'mux4', toPin: 0 },
          { id: 'w2', fromNode: 'i1', fromPin: 0, toNode: 'mux4', toPin: 1 },
          { id: 'w3', fromNode: 'i2', fromPin: 0, toNode: 'mux4', toPin: 2 },
          { id: 'w4', fromNode: 'i3', fromPin: 0, toNode: 'mux4', toPin: 3 },
          { id: 'w5', fromNode: 's1', fromPin: 0, toNode: 'mux4', toPin: 4 },
          { id: 'w6', fromNode: 's0', fromPin: 0, toNode: 'mux4', toPin: 5 },
          { id: 'w7', fromNode: 'mux4', fromPin: 0, toNode: 'outY', toPin: 0 }
        ]
      },
      {
        level: 2,
        shortName: '2. Decodificador 2:4 + Compuertas AND/OR',
        title: 'Nivel 2: Decodificador de Selección (2 a 4) + Habilitación de Canales',
        subtitle: 'Un decodificador 2 a 4 decodifica (S1, S0) y habilita la compuerta AND del canal seleccionado.',
        formulas: ['m_k = \\text{DEC}_{2:4}(S_1, S_0)', 'Y = \\sum_{k=0}^{3} I_k \\cdot m_k'],
        nodes: [
          { id: 'i0', type: 'INPUT', label: 'I0', x: 90, y: 30, state: [1] },
          { id: 'i1', type: 'INPUT', label: 'I1', x: 90, y: 95, state: [0] },
          { id: 'i2', type: 'INPUT', label: 'I2', x: 90, y: 160, state: [1] },
          { id: 'i3', type: 'INPUT', label: 'I3', x: 90, y: 225, state: [0] },
          { id: 's1', type: 'INPUT', label: 'S1', x: 90, y: 295, state: [0] },
          { id: 's0', type: 'INPUT', label: 'S0', x: 90, y: 345, state: [0] },
          { id: 'decSel', type: 'DEC_2_4', label: 'DEC Sel', x: 220, y: 265 },
          { id: 'and0', type: 'AND', label: 'CH0', x: 420, y: 25 },
          { id: 'and1', type: 'AND', label: 'CH1', x: 420, y: 95 },
          { id: 'and2', type: 'AND', label: 'CH2', x: 420, y: 165 },
          { id: 'and3', type: 'AND', label: 'CH3', x: 420, y: 235 },
          { id: 'orFinal', type: 'OR4', label: 'OR_MUX', x: 580, y: 115 },
          { id: 'outY', type: 'OUTPUT', label: 'Y', x: 740, y: 142 }
        ],
        wires: [
          { id: 'ws1', fromNode: 's1', fromPin: 0, toNode: 'decSel', toPin: 0 },
          { id: 'ws0', fromNode: 's0', fromPin: 0, toNode: 'decSel', toPin: 1 },
          { id: 'wi0', fromNode: 'i0', fromPin: 0, toNode: 'and0', toPin: 0 },
          { id: 'wd0', fromNode: 'decSel', fromPin: 0, toNode: 'and0', toPin: 1 },
          { id: 'wi1', fromNode: 'i1', fromPin: 0, toNode: 'and1', toPin: 0 },
          { id: 'wd1', fromNode: 'decSel', fromPin: 1, toNode: 'and1', toPin: 1 },
          { id: 'wi2', fromNode: 'i2', fromPin: 0, toNode: 'and2', toPin: 0 },
          { id: 'wd2', fromNode: 'decSel', fromPin: 2, toNode: 'and2', toPin: 1 },
          { id: 'wi3', fromNode: 'i3', fromPin: 0, toNode: 'and3', toPin: 0 },
          { id: 'wd3', fromNode: 'decSel', fromPin: 3, toNode: 'and3', toPin: 1 },
          { id: 'wo0', fromNode: 'and0', fromPin: 0, toNode: 'orFinal', toPin: 0 },
          { id: 'wo1', fromNode: 'and1', fromPin: 0, toNode: 'orFinal', toPin: 1 },
          { id: 'wo2', fromNode: 'and2', fromPin: 0, toNode: 'orFinal', toPin: 2 },
          { id: 'wo3', fromNode: 'and3', fromPin: 0, toNode: 'orFinal', toPin: 3 },
          { id: 'wy', fromNode: 'orFinal', fromPin: 0, toNode: 'outY', toPin: 0 }
        ]
      }
    ]
  }
};

// Mapeo de cada tipo de componente a su familia jerárquica y nivel inicial correspondiente
window.NODE_TO_HIERARCHY_MAP = {
  IC_74283: { family: 'ADDER_74283_HIERARCHY', startLevel: 1, nextLevel: 2 },
  FULL_ADDER: { family: 'ADDER_74283_HIERARCHY', startLevel: 2, nextLevel: 3 },
  BLOCK_SC: { family: 'ADDER_74283_HIERARCHY', startLevel: 2, nextLevel: 3 },
  HALF_ADDER: { family: 'ADDER_74283_HIERARCHY', startLevel: 3, nextLevel: 4 },
  BLOCK_MS: { family: 'ADDER_74283_HIERARCHY', startLevel: 3, nextLevel: 4 },
  BCD_7SEG: { family: 'BCD_7SEG_HIERARCHY', startLevel: 1, nextLevel: 2 },
  IC_7447: { family: 'BCD_7SEG_HIERARCHY', startLevel: 1, nextLevel: 2 },
  IC_7442: { family: 'BCD_7SEG_HIERARCHY', startLevel: 2, nextLevel: 3 },
  IC_74154: { family: 'DECODER_HIERARCHY', startLevel: 1, nextLevel: 2 },
  DECO_3_8: { family: 'DECODER_HIERARCHY', startLevel: 2, nextLevel: 3 },
  DEC_3_8_EN: { family: 'DECODER_HIERARCHY', startLevel: 2, nextLevel: 3 },
  DEC_2_4: { family: 'DECODER_HIERARCHY', startLevel: 2, nextLevel: 3 },
  DEC_2_4_EN: { family: 'DECODER_HIERARCHY', startLevel: 2, nextLevel: 3 },
  DEC_1_2: { family: 'DECODER_HIERARCHY', startLevel: 3, nextLevel: 4 },
  ENC_8_3: { family: 'ENCODER_HIERARCHY', startLevel: 1, nextLevel: 2 },
  ENC_PRIO_8_3: { family: 'ENCODER_HIERARCHY', startLevel: 1, nextLevel: 2 },
  IC_74148: { family: 'ENCODER_HIERARCHY', startLevel: 1, nextLevel: 2 },
  IC_74147: { family: 'ENCODER_HIERARCHY', startLevel: 1, nextLevel: 2 },
  ENC_4_2: { family: 'ENCODER_HIERARCHY', startLevel: 1, nextLevel: 2 },
  IC_7485: { family: 'COMPARATOR_HIERARCHY', startLevel: 1, nextLevel: 2 },
  COMP_1BIT: { family: 'COMPARATOR_HIERARCHY', startLevel: 2, nextLevel: 3 },
  MUX_2_1: { family: 'MUX_HIERARCHY', startLevel: 1, nextLevel: 2 },
  MUX_4_1: { family: 'MUX_HIERARCHY', startLevel: 1, nextLevel: 2 },
  MUX_8_1: { family: 'MUX_HIERARCHY', startLevel: 1, nextLevel: 2 },
  DEMUX_1_4: { family: 'DECODER_HIERARCHY', startLevel: 2, nextLevel: 3 }
};

window.canDrillDownNode = function (type) {
  return !!window.NODE_TO_HIERARCHY_MAP[type];
};

window.getHierarchyInfoForNode = function (type) {
  const mapInfo = window.NODE_TO_HIERARCHY_MAP[type];
  if (!mapInfo) return null;
  const fam = window.HIERARCHY_FAMILIES[mapInfo.family];
  if (!fam) return null;
  return {
    family: fam,
    startLevel: mapInfo.startLevel,
    nextLevel: mapInfo.nextLevel
  };
};
