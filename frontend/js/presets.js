/**
 * CATÁLOGO Y PLANTILLAS BASE DE SISTEMAS DIGITALES (ESQUEMÁTICOS PUROS)
 * Se sincroniza automáticamente con PostgreSQL a través de la API de NestJS
 */

window.FALLBACK_CATALOG = {
  categories: [
    {
      id: 'gates',
      name: 'Lógica Básica',
      items: [
        { type: 'AND', name: 'AND', ic: '74LS08', desc: 'Puerta lógica AND (2 entradas)' },
        { type: 'OR', name: 'OR', ic: '74LS32', desc: 'Puerta lógica OR (2 entradas)' },
        { type: 'NOT', name: 'NOT', ic: '74LS04', desc: 'Inversor lógico (1 entrada)' },
        { type: 'NAND', name: 'NAND', ic: '74LS00', desc: 'Puerta lógica NAND (2 entradas)' },
        { type: 'NOR', name: 'NOR', ic: '74LS02', desc: 'Puerta lógica NOR (2 entradas)' },
        { type: 'XOR', name: 'XOR', ic: '74LS86', desc: 'Puerta lógica XOR (2 entradas)' },
        { type: 'XNOR', name: 'XNOR', ic: '74LS266', desc: 'Puerta lógica XNOR (Equivalencia)' },
        { type: 'AND3', name: 'AND 3-In', ic: '74LS11', desc: 'Triple AND de 3 entradas' },
        { type: 'NAND3', name: 'NAND 3-In', ic: '74LS10', desc: 'Triple NAND de 3 entradas' },
        { type: 'NAND4', name: 'NAND 4-In', ic: '74LS20', desc: 'Dual NAND de 4 entradas' },
        { type: 'OR5', name: 'OR 5-In (SOP)', ic: 'SOP-OR', desc: 'OR de 5 entradas para minitérminos' }
      ]
    },
    {
      id: 'arithmetic',
      name: 'Sumadores y Comparadores',
      items: [
        { type: 'HALF_ADDER', name: 'Medio Sumador (Half-Adder)', ic: 'HA', desc: 'Suma 2 bits (A, B) -> S y C' },
        { type: 'FULL_ADDER', name: 'Sumador Completo (Full-Adder)', ic: 'FA', desc: 'Suma A, B y Cin -> S y Cout' },
        { type: 'IC_74283', name: 'Sumador 4 bits (74LS283)', ic: '74LS283', desc: 'Sumador binario de 4 bits con acarreo' },
        { type: 'COMP_1BIT', name: 'Comparador 1 bit', ic: 'COMP', desc: 'Compara A y B -> A>B, A=B, A<B' },
        { type: 'IC_7485', name: 'Comparador 4 bits (74LS85)', ic: '74LS85', desc: 'Comparador de magnitud de 4 bits con cascada' }
      ]
    },
    {
      id: 'mux_demux',
      name: 'Multiplexores y Decodificadores',
      items: [
        { type: 'MUX_2_1', name: 'MUX 2:1', ic: '74LS157', desc: 'Selector de 2 entradas (I0, I1)' },
        { type: 'MUX_4_1', name: 'MUX 4:1 (74LS153)', ic: '74LS153', desc: 'Selector de 4 entradas (I0..I3)' },
        { type: 'MUX_8_1', name: 'MUX 8:1 (74LS151)', ic: '74LS151', desc: 'Selector de 8 entradas (E0..E7)' },
        { type: 'DEMUX_1_4', name: 'DEMUX 1:4', ic: '74LS139', desc: 'Distribuidor de 1 entrada a 4 salidas' },
        { type: 'DECO_3_8', name: 'Decodificador 3:8 (74LS138)', ic: '74LS138', desc: '3 entradas (X,Y,Z) a 8 minitérminos' }
      ]
    },
    {
      id: 'io',
      name: 'Entradas y Salidas',
      items: [
        { type: 'INPUT', name: 'Entrada Binaria (A, B...)', ic: 'IN', desc: 'Terminal interactivo 0 / 1' },
        { type: 'OUTPUT', name: 'Salida LED (S, Y...)', ic: 'OUT', desc: 'Monitor luminoso de salida' },
        { type: 'HEX_DISPLAY', name: 'Display 4-Bits (Hex/Dec)', ic: 'HEX', desc: 'Visualizador numérico de 4 bits' },
        { type: 'VCC', name: 'Fuente +Vcc (1 Lógico)', ic: '+5V', desc: 'Nivel alto constante (1)' },
        { type: 'GND', name: 'Tierra GND (0 Lógico)', ic: '0V', desc: 'Nivel bajo constante (0)' }
      ]
    }
  ]
};

window.FALLBACK_PRESETS = [
  {
    id: 'full-adder',
    title: 'Sumador Completo (1 bit)',
    category: 'Sumadores y Comparadores',
    moduleTag: 'Aritmética Binaria',
    description: 'Suma dos bits A y B junto con el acarreo de entrada Cin, generando la salida S (Suma) y Cout (Acarreo).',
    formulas: ['S = A ⊕ B ⊕ Cin', 'Cout = AB + ACin + BCin'],
    isPreset: true,
    nodes: [
      { id: 'inA', type: 'INPUT', label: 'A', x: 120, y: 70, state: [1] },
      { id: 'inB', type: 'INPUT', label: 'B', x: 120, y: 120, state: [0] },
      { id: 'inCin', type: 'INPUT', label: 'Cin', x: 120, y: 260, state: [1] },
      { id: 'xor1', type: 'XOR', label: 'U1', x: 290, y: 72 },
      { id: 'and1', type: 'AND', label: 'U2', x: 310, y: 190 },
      { id: 'xor2', type: 'XOR', label: 'U3', x: 520, y: 135 },
      { id: 'or1', type: 'OR', label: 'U4', x: 455, y: 235 },
      { id: 'outS', type: 'OUTPUT', label: 'S', x: 700, y: 147 },
      { id: 'outCout', type: 'OUTPUT', label: 'Cout', x: 700, y: 247 }
    ],
    wires: [
      { id: 'w1', fromNode: 'inA', fromPin: 0, toNode: 'xor1', toPin: 0 },
      { id: 'w2', fromNode: 'inB', fromPin: 0, toNode: 'xor1', toPin: 1 },
      { id: 'w3', fromNode: 'inA', fromPin: 0, toNode: 'and1', toPin: 0 },
      { id: 'w4', fromNode: 'inB', fromPin: 0, toNode: 'and1', toPin: 1 },
      { id: 'w5', fromNode: 'xor1', fromPin: 0, toNode: 'xor2', toPin: 0 },
      { id: 'w6', fromNode: 'inCin', fromPin: 0, toNode: 'xor2', toPin: 1 },
      { id: 'w7', fromNode: 'and1', fromPin: 0, toNode: 'or1', toPin: 0 },
      { id: 'w8', fromNode: 'inCin', fromPin: 0, toNode: 'or1', toPin: 1 },
      { id: 'w9', fromNode: 'xor2', fromPin: 0, toNode: 'outS', toPin: 0 },
      { id: 'w10', fromNode: 'or1', fromPin: 0, toNode: 'outCout', toPin: 0 }
    ]
  },
  {
    id: 'half-adder',
    title: 'Semisumador Binario (Half-Adder)',
    category: 'Sumadores y Comparadores',
    moduleTag: 'Aritmética Binaria',
    description: 'Suma dos bits de entrada A y B generando S (Suma) con una compuerta XOR y C (Acarreo) con una compuerta AND.',
    formulas: ['S = A ⊕ B', 'C = A · B'],
    isPreset: true,
    nodes: [
      { id: 'inA', type: 'INPUT', label: 'A', x: 140, y: 95, state: [1] },
      { id: 'inB', type: 'INPUT', label: 'B', x: 140, y: 195, state: [0] },
      { id: 'xor1', type: 'XOR', label: 'U1', x: 350, y: 85 },
      { id: 'and1', type: 'AND', label: 'U2', x: 350, y: 190 },
      { id: 'outS', type: 'OUTPUT', label: 'S', x: 560, y: 97 },
      { id: 'outC', type: 'OUTPUT', label: 'C', x: 560, y: 202 }
    ],
    wires: [
      { id: 'w1', fromNode: 'inA', fromPin: 0, toNode: 'xor1', toPin: 0 },
      { id: 'w2', fromNode: 'inB', fromPin: 0, toNode: 'xor1', toPin: 1 },
      { id: 'w3', fromNode: 'inA', fromPin: 0, toNode: 'and1', toPin: 0 },
      { id: 'w4', fromNode: 'inB', fromPin: 0, toNode: 'and1', toPin: 1 },
      { id: 'w5', fromNode: 'xor1', fromPin: 0, toNode: 'outS', toPin: 0 },
      { id: 'w6', fromNode: 'and1', fromPin: 0, toNode: 'outC', toPin: 0 }
    ]
  },
  {
    id: 'comparator-7485',
    title: 'Comparador 4 bits (74LS85)',
    category: 'Sumadores y Comparadores',
    moduleTag: 'CI 74LS85',
    description: 'Compara dos palabras de 4 bits (A3..A0 y B3..B0) con entradas de cascada (I>=0, I==1, I<=0).',
    formulas: ['A > B', 'A = B', 'A < B'],
    isPreset: true,
    nodes: [
      { id: 'a3', type: 'INPUT', label: 'A3', x: 130, y: 34, state: [1] },
      { id: 'a2', type: 'INPUT', label: 'A2', x: 130, y: 68, state: [0] },
      { id: 'a1', type: 'INPUT', label: 'A1', x: 130, y: 102, state: [1] },
      { id: 'a0', type: 'INPUT', label: 'A0', x: 130, y: 136, state: [0] },
      { id: 'b3', type: 'INPUT', label: 'B3', x: 130, y: 178, state: [0] },
      { id: 'b2', type: 'INPUT', label: 'B2', x: 130, y: 212, state: [1] },
      { id: 'b1', type: 'INPUT', label: 'B1', x: 130, y: 246, state: [1] },
      { id: 'b0', type: 'INPUT', label: 'B0', x: 130, y: 280, state: [0] },
      { id: 'gndGT', type: 'GND', label: 'I>', x: 130, y: 320 },
      { id: 'vccEQ', type: 'VCC', label: 'I=', x: 130, y: 354 },
      { id: 'gndLT', type: 'GND', label: 'I<', x: 130, y: 388 },
      { id: 'ic85', type: 'IC_7485', label: 'U1', x: 350, y: 80 },
      { id: 'outGT', type: 'OUTPUT', label: 'A > B', x: 600, y: 86 },
      { id: 'outEQ', type: 'OUTPUT', label: 'A = B', x: 600, y: 202 },
      { id: 'outLT', type: 'OUTPUT', label: 'A < B', x: 600, y: 318 }
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
    id: 'mux-4-1',
    title: 'MUX 4:1 (74LS153)',
    category: 'Multiplexores y Decodificadores',
    moduleTag: 'CI 74LS153',
    description: 'Selecciona una de las 4 entradas de datos (I0..I3) hacia la salida Y según las líneas selectoras S1 y S0.',
    formulas: ["Y = I0·S1'S0' + I1·S1'S0 + I2·S1·S0' + I3·S1·S0"],
    isPreset: true,
    nodes: [
      { id: 'i0', type: 'INPUT', label: 'I0', x: 140, y: 55, state: [1] },
      { id: 'i1', type: 'INPUT', label: 'I1', x: 140, y: 95, state: [0] },
      { id: 'i2', type: 'INPUT', label: 'I2', x: 140, y: 135, state: [1] },
      { id: 'i3', type: 'INPUT', label: 'I3', x: 140, y: 175, state: [0] },
      { id: 's1', type: 'INPUT', label: 'S1', x: 140, y: 225, state: [0] },
      { id: 's0', type: 'INPUT', label: 'S0', x: 140, y: 265, state: [0] },
      { id: 'mux4', type: 'MUX_4_1', label: 'U2', x: 370, y: 80 },
      { id: 'outY', type: 'OUTPUT', label: 'Y', x: 580, y: 150 }
    ],
    wires: [
      { id: 'w1', fromNode: 'i0', fromPin: 0, toNode: 'mux4', toPin: 0 },
      { id: 'w2', fromNode: 'i1', fromPin: 0, toNode: 'mux4', toPin: 1 },
      { id: 'w3', fromNode: 'i2', fromPin: 0, toNode: 'mux4', toPin: 2 },
      { id: 'w3b', fromNode: 'i3', fromPin: 0, toNode: 'mux4', toPin: 3 },
      { id: 'w4', fromNode: 's1', fromPin: 0, toNode: 'mux4', toPin: 4 },
      { id: 'w5', fromNode: 's0', fromPin: 0, toNode: 'mux4', toPin: 5 },
      { id: 'w6', fromNode: 'mux4', fromPin: 0, toNode: 'outY', toPin: 0 }
    ]
  },
  {
    id: 'adder-74283',
    title: 'Sumador 4 bits (74LS283)',
    category: 'Sumadores y Comparadores',
    moduleTag: 'CI 74LS283',
    description: 'Suma dos números binarios de 4 bits (A4..A1 y B4..B1) más acarreo de entrada C0.',
    formulas: ['Σ = A + B + C0 (4 bits)', 'C4 = Carry Out'],
    isPreset: true,
    nodes: [
      { id: 'a4', type: 'INPUT', label: 'A4', x: 120, y: 34, state: [0] },
      { id: 'a3', type: 'INPUT', label: 'A3', x: 120, y: 70, state: [1] },
      { id: 'a2', type: 'INPUT', label: 'A2', x: 120, y: 106, state: [0] },
      { id: 'a1', type: 'INPUT', label: 'A1', x: 120, y: 142, state: [1] },
      { id: 'b4', type: 'INPUT', label: 'B4', x: 120, y: 184, state: [0] },
      { id: 'b3', type: 'INPUT', label: 'B3', x: 120, y: 220, state: [0] },
      { id: 'b2', type: 'INPUT', label: 'B2', x: 120, y: 256, state: [1] },
      { id: 'b1', type: 'INPUT', label: 'B1', x: 120, y: 292, state: [1] },
      { id: 'c0', type: 'INPUT', label: 'C0', x: 120, y: 334, state: [0] },
      { id: 'ic283', type: 'IC_74283', label: 'U1', x: 350, y: 80 },
      { id: 'c4', type: 'OUTPUT', label: 'C4', x: 590, y: 76 },
      { id: 's4', type: 'OUTPUT', label: 'Σ4', x: 590, y: 132 },
      { id: 's3', type: 'OUTPUT', label: 'Σ3', x: 590, y: 188 },
      { id: 's2', type: 'OUTPUT', label: 'Σ2', x: 590, y: 244 },
      { id: 's1', type: 'OUTPUT', label: 'Σ1', x: 590, y: 300 }
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
    id: 'comparator-1bit',
    title: 'Comparador de Magnitud (1 bit)',
    category: 'Sumadores y Comparadores',
    moduleTag: 'Comparación Digital',
    description: 'Compara dos bits A y B e indica mediante tres salidas si A < B, A = B o A > B.',
    formulas: ["(A < B) = A'B", "(A = B) = (A ⊕ B)'", "(A > B) = AB'"],
    isPreset: true,
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
  },
  {
    id: 'mux-boolean-fn',
    title: 'Síntesis con MUX 8:1 (74LS151)',
    category: 'Multiplexores y Decodificadores',
    moduleTag: 'CI 74LS151',
    description: 'Implementa f(A,B,C) = Σm(0, 2, 4, 7) conectando +Vcc (1) y GND (0) a las entradas E0..E7 del MUX 8:1.',
    formulas: ['f(A,B,C) = Σm(0, 2, 4, 7)'],
    isPreset: true,
    nodes: [
      { id: 'vcc', type: 'VCC', label: '+Vcc', x: 120, y: 55 },
      { id: 'gnd', type: 'GND', label: 'GND', x: 120, y: 125 },
      { id: 'inA', type: 'INPUT', label: 'A', x: 120, y: 230, state: [0] },
      { id: 'inB', type: 'INPUT', label: 'B', x: 120, y: 270, state: [1] },
      { id: 'inC', type: 'INPUT', label: 'C', x: 120, y: 310, state: [0] },
      { id: 'mux8', type: 'MUX_8_1', label: 'U1', x: 370, y: 65 },
      { id: 'outF', type: 'OUTPUT', label: 'F', x: 590, y: 155 }
    ],
    wires: [
      { id: 'w0', fromNode: 'vcc', fromPin: 0, toNode: 'mux8', toPin: 0 },
      { id: 'w1', fromNode: 'gnd', fromPin: 0, toNode: 'mux8', toPin: 1 },
      { id: 'w2', fromNode: 'vcc', fromPin: 0, toNode: 'mux8', toPin: 2 },
      { id: 'w3', fromNode: 'gnd', fromPin: 0, toNode: 'mux8', toPin: 3 },
      { id: 'w4', fromNode: 'vcc', fromPin: 0, toNode: 'mux8', toPin: 4 },
      { id: 'w5', fromNode: 'gnd', fromPin: 0, toNode: 'mux8', toPin: 5 },
      { id: 'w6', fromNode: 'gnd', fromPin: 0, toNode: 'mux8', toPin: 6 },
      { id: 'w7', fromNode: 'vcc', fromPin: 0, toNode: 'mux8', toPin: 7 },
      { id: 'w8', fromNode: 'inA', fromPin: 0, toNode: 'mux8', toPin: 8 },
      { id: 'w9', fromNode: 'inB', fromPin: 0, toNode: 'mux8', toPin: 9 },
      { id: 'w10', fromNode: 'inC', fromPin: 0, toNode: 'mux8', toPin: 10 },
      { id: 'w11', fromNode: 'mux8', fromPin: 0, toNode: 'outF', toPin: 0 }
    ]
  },
  {
    id: 'deco-sop',
    title: 'Síntesis SOP con Decodificador 3:8',
    category: 'Multiplexores y Decodificadores',
    moduleTag: 'Suma de Productos',
    description: 'Implementa F(X,Y,Z) = Σm(1, 4, 5, 6, 7) sumando las salidas del Decodificador 3:8 en una compuerta OR.',
    formulas: ['F(X,Y,Z) = Σm(1, 4, 5, 6, 7)'],
    isPreset: true,
    nodes: [
      { id: 'inX', type: 'INPUT', label: 'X', x: 120, y: 110, state: [1] },
      { id: 'inY', type: 'INPUT', label: 'Y', x: 120, y: 175, state: [0] },
      { id: 'inZ', type: 'INPUT', label: 'Z', x: 120, y: 240, state: [1] },
      { id: 'deco', type: 'DECO_3_8', label: 'U1', x: 320, y: 80 },
      { id: 'or5', type: 'OR5', label: 'U2', x: 545, y: 140 },
      { id: 'outF', type: 'OUTPUT', label: 'F', x: 710, y: 174 }
    ],
    wires: [
      { id: 'w1', fromNode: 'inX', fromPin: 0, toNode: 'deco', toPin: 0 },
      { id: 'w2', fromNode: 'inY', fromPin: 0, toNode: 'deco', toPin: 1 },
      { id: 'w3', fromNode: 'inZ', fromPin: 0, toNode: 'deco', toPin: 2 },
      { id: 'w4', fromNode: 'deco', fromPin: 1, toNode: 'or5', toPin: 0 },
      { id: 'w5', fromNode: 'deco', fromPin: 4, toNode: 'or5', toPin: 1 },
      { id: 'w6', fromNode: 'deco', fromPin: 5, toNode: 'or5', toPin: 2 },
      { id: 'w7', fromNode: 'deco', fromPin: 6, toNode: 'or5', toPin: 3 },
      { id: 'w8', fromNode: 'deco', fromPin: 7, toNode: 'or5', toPin: 4 },
      { id: 'w9', fromNode: 'or5', fromPin: 0, toNode: 'outF', toPin: 0 }
    ]
  }
];
