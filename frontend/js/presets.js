/**
 * CATÁLOGO Y PLANTILLAS BASE DE SISTEMAS DIGITALES (ESQUEMÁTICOS PUROS)
 * Se sincroniza automáticamente con PostgreSQL a través de la API de NestJS
 */

window.FALLBACK_CATALOG = {
  categories: [
    {
      id: 'gates_basic',
      name: 'Compuertas Básicas (2 Entradas)',
      items: [
        { type: 'AND', name: 'AND', ic: '74LS08', desc: 'Puerta lógica AND (2 entradas)' },
        { type: 'OR', name: 'OR', ic: '74LS32', desc: 'Puerta lógica OR (2 entradas)' },
        { type: 'NOT', name: 'NOT', ic: '74LS04', desc: 'Inversor lógico (1 entrada)' },
        { type: 'NAND', name: 'NAND', ic: '74LS00', desc: 'Puerta lógica NAND (2 entradas)' },
        { type: 'NOR', name: 'NOR', ic: '74LS02', desc: 'Puerta lógica NOR (2 entradas)' },
        { type: 'XOR', name: 'XOR', ic: '74LS86', desc: 'Puerta lógica XOR (2 entradas)' },
        { type: 'XNOR', name: 'XNOR', ic: '74LS266', desc: 'Puerta lógica XNOR (Equivalencia)' }
      ]
    },
    {
      id: 'gates_multi',
      name: 'Compuertas Multi-Entrada (3, 4 y 8 In)',
      items: [
        { type: 'AND3', name: 'AND 3-In', ic: '74LS11', desc: 'Triple AND de 3 entradas (TTL 74LS11)' },
        { type: 'AND4', name: 'AND 4-In', ic: '74LS21', desc: 'Dual AND de 4 entradas (TTL 74LS21)' },
        { type: 'AND8', name: 'AND 8-In', ic: 'AND-8', desc: 'Compuerta AND de 8 entradas' },
        { type: 'NAND3', name: 'NAND 3-In', ic: '74LS10', desc: 'Triple NAND de 3 entradas (TTL 74LS10)' },
        { type: 'NAND4', name: 'NAND 4-In', ic: '74LS20', desc: 'Dual NAND de 4 entradas (TTL 74LS20)' },
        { type: 'NAND8', name: 'NAND 8-In', ic: '74LS30', desc: 'NAND de 8 entradas (TTL 74LS30)' },
        { type: 'OR3', name: 'OR 3-In', ic: '74LS4075', desc: 'Triple OR de 3 entradas (TTL 74LS4075)' },
        { type: 'OR4', name: 'OR 4-In', ic: '74LS4072', desc: 'Dual OR de 4 entradas (TTL 74LS4072)' },
        { type: 'OR5', name: 'OR 5-In (SOP)', ic: 'SOP-OR', desc: 'OR de 5 entradas para minitérminos' },
        { type: 'OR8', name: 'OR 8-In (SOP)', ic: 'SOP-OR8', desc: 'OR de 8 entradas para minitérminos' },
        { type: 'NOR3', name: 'NOR 3-In', ic: '74LS27', desc: 'Triple NOR de 3 entradas (TTL 74LS27)' },
        { type: 'NOR4', name: 'NOR 4-In', ic: '74LS4002', desc: 'Dual NOR de 4 entradas' },
        { type: 'XOR3', name: 'XOR 3-In', ic: 'PARITY-ODD', desc: 'XOR de 3 entradas (Paridad Impar)' },
        { type: 'XNOR3', name: 'XNOR 3-In', ic: 'PARITY-EVEN', desc: 'XNOR de 3 entradas (Paridad Par)' }
      ]
    },
    {
      id: 'arithmetic',
      name: 'Sumadores y Comparadores',
      items: [
        { type: 'BLOCK_MS', name: 'Medio Sumador (M.S.)', ic: 'M.S.', desc: 'Bloque modular 1 bit (A, B -> S, Cout)' },
        { type: 'BLOCK_SC', name: 'Sumador Completo (S.C.)', ic: 'S.C.', desc: 'Bloque modular 1 bit (A, B, Cin -> S, Cout)' },
        { type: 'HALF_ADDER', name: 'Medio Sumador IC', ic: 'HA', desc: 'Suma 2 bits (A, B) -> S y C' },
        { type: 'FULL_ADDER', name: 'Sumador Completo IC', ic: 'FA', desc: 'Suma A, B y Cin -> S y Cout' },
        { type: 'IC_74283', name: 'Sumador 4 bits (74LS283)', ic: '74LS283', desc: 'Sumador binario de 4 bits con acarreo' },
        { type: 'COMP_1BIT', name: 'Comparador 1 bit', ic: 'COMP', desc: 'Compara A y B -> A>B, A=B, A<B' },
        { type: 'IC_7485', name: 'Comparador 4 bits (74LS85)', ic: '74LS85', desc: 'Comparador de magnitud de 4 bits con cascada' }
      ]
    },
    {
      id: 'decoders_bcd',
      name: 'Decodificadores y Conversores BCD',
      items: [
        { type: 'DEC_1_2', name: 'Decodificador 1 a 2', ic: 'DEC 1:2', desc: '1 entrada (A0) a 2 salidas (O0, O1)' },
        { type: 'DEC_2_4', name: 'Decodificador 2 a 4', ic: 'DEC 2:4', desc: '2 entradas (A1, A0) a 4 salidas (O0..O3)' },
        { type: 'DEC_2_4_EN', name: 'Decodificador 2 a 4 (con Enable)', ic: '74LS139', desc: '2 a 4 con pin Enable E para cascada' },
        { type: 'DECO_3_8', name: 'Decodificador 3:8 (74LS138)', ic: '74LS138', desc: '3 entradas (X,Y,Z) a 8 minitérminos' },
        { type: 'DEC_3_8_EN', name: 'Decodificador 3:8 (con Enable)', ic: '74LS138-EN', desc: '3 a 8 con pin CS para cascada 4:16' },
        { type: 'IC_7442', name: 'Decodificador BCD a Decimal (74LS42)', ic: '74LS42', desc: '4 entradas BCD a 10 salidas (O0..O9)' },
        { type: 'IC_74154', name: 'Decodificador 4 a 16 (74LS154)', ic: '74LS154', desc: '4 entradas (A3..A0) a 16 salidas (O0..O15)' },
        { type: 'BCD_7SEG', name: 'Decodificador BCD a 7-Seg (74LS48)', ic: '74LS48', desc: 'Activo en ALTO (1) para Cátodo Común' },
        { type: 'IC_7447', name: 'Decodificador BCD a 7-Seg (74LS47)', ic: '74LS47', desc: 'Activo en BAJO (0) para Ánodo Común' }
      ]
    },
    {
      id: 'encoders',
      name: 'Codificadores y Prioridad (MSI)',
      items: [
        { type: 'ENC_4_2', name: 'Codificador 4 a 2', ic: 'ENC 4:2', desc: '4 entradas (I0..I3) a 2 bits (A1, A0)' },
        { type: 'ENC_8_3', name: 'Codificador 8 a 3', ic: 'ENC 8:3', desc: '8 entradas (I0..I7) a 3 bits (A2..A0)' },
        { type: 'ENC_PRIO_8_3', name: 'Codificador con Prioridad 8 a 3', ic: 'PRIO 8:3', desc: 'Prioridad I7 > I6 > ... > I0 (Activo Alto)' },
        { type: 'IC_74148', name: 'Codificador Prioridad 8 a 3 (74LS148)', ic: '74LS148', desc: 'SN74LS148 8 a 3 (Nivel Activo Bajo)' },
        { type: 'IC_74147', name: 'Codificador Prioridad 10 a 4 (74LS147)', ic: '74LS147', desc: 'SN74LS147 Decimal a BCD (Activo Bajo)' }
      ]
    },
    {
      id: 'mux_demux',
      name: 'Multiplexores y Demultiplexores',
      items: [
        { type: 'MUX_2_1', name: 'MUX 2:1', ic: '74LS157', desc: 'Selector de 2 entradas (I0, I1)' },
        { type: 'MUX_4_1', name: 'MUX 4:1 (74LS153)', ic: '74LS153', desc: 'Selector de 4 entradas (I0..I3)' },
        { type: 'MUX_8_1', name: 'MUX 8:1 (74LS151)', ic: '74LS151', desc: 'Selector de 8 entradas (E0..E7)' },
        { type: 'DEMUX_1_4', name: 'DEMUX 1:4', ic: '74LS139', desc: 'Distribuidor de 1 entrada a 4 salidas' }
      ]
    },
    {
      id: 'io',
      name: 'Entradas, Salidas y Displays 7-Seg',
      items: [
        { type: 'INPUT', name: 'Entrada Binaria (A, B...)', ic: 'IN', desc: 'Terminal interactivo 0 / 1' },
        { type: 'OUTPUT', name: 'Salida LED (S, Y...)', ic: 'OUT', desc: 'Monitor luminoso de salida' },
        { type: 'DISPLAY_7SEG_CC', name: 'Display 7-Seg (Cátodo Común)', ic: '7SEG-CC', desc: 'Enciende segmentos a..g con 1 lógico' },
        { type: 'DISPLAY_7SEG_CA', name: 'Display 7-Seg (Ánodo Común)', ic: '7SEG-CA', desc: 'Enciende segmentos a..g con 0 lógico (74LS47)' },
        { type: 'HEX_DISPLAY', name: 'Display 4-Bits (Hex/Dec)', ic: 'HEX', desc: 'Visualizador numérico de 4 bits' },
        { type: 'VCC', name: 'Fuente +Vcc (1 Lógico)', ic: '+5V', desc: 'Nivel alto constante (1)' },
        { type: 'GND', name: 'Tierra GND (0 Lógico)', ic: '0V', desc: 'Nivel bajo constante (0)' }
      ]
    }
  ]
};

window.FALLBACK_PRESETS = [
  {
    id: 'bcd-7seg-7447',
    title: 'Decodificador BCD a 7 Segmentos + Display (CI 74LS47 Ánodo Común)',
    category: 'Decodificadores y Conversores BCD',
    moduleTag: 'CI 74LS47 + Display',
    description: 'Circuito 74LS47: decodificador BCD para display de ánodo común con salidas activas en bajo (0) conectado a un Display de 7 segmentos e indicadores a..g.',
    formulas: [
      '\\text{BCD } (D,C,B,A) \\implies \\text{Segmentos } \\overline{a}..\\overline{g} \\text{ (Ánodo Común)}'
    ],
    isPreset: true,
    nodes: [
      { id: 'inD', type: 'INPUT', label: 'D', x: 100, y: 65, state: [0] },
      { id: 'inC', type: 'INPUT', label: 'C', x: 100, y: 115, state: [1] },
      { id: 'inB', type: 'INPUT', label: 'B', x: 100, y: 165, state: [0] },
      { id: 'inA', type: 'INPUT', label: 'A', x: 100, y: 215, state: [1] },
      { id: 'ic7447', type: 'IC_7447', label: 'U1 (74LS47)', x: 280, y: 55 },
      { id: 'dispCA', type: 'DISPLAY_7SEG_CA', label: 'Display Ánodo', x: 540, y: 55 },
      { id: 'outA', type: 'OUTPUT', label: 'a', x: 730, y: 36 },
      { id: 'outB', type: 'OUTPUT', label: 'b', x: 730, y: 74 },
      { id: 'outC', type: 'OUTPUT', label: 'c', x: 730, y: 112 },
      { id: 'outD', type: 'OUTPUT', label: 'd', x: 730, y: 150 },
      { id: 'outE', type: 'OUTPUT', label: 'e', x: 730, y: 188 },
      { id: 'outF', type: 'OUTPUT', label: 'f', x: 730, y: 226 },
      { id: 'outG', type: 'OUTPUT', label: 'g', x: 730, y: 264 }
    ],
    wires: [
      { id: 'wD', fromNode: 'inD', fromPin: 0, toNode: 'ic7447', toPin: 0 },
      { id: 'wC', fromNode: 'inC', fromPin: 0, toNode: 'ic7447', toPin: 1 },
      { id: 'wB', fromNode: 'inB', fromPin: 0, toNode: 'ic7447', toPin: 2 },
      { id: 'wA', fromNode: 'inA', fromPin: 0, toNode: 'ic7447', toPin: 3 },
      { id: 'wd0', fromNode: 'ic7447', fromPin: 0, toNode: 'dispCA', toPin: 0 },
      { id: 'wd1', fromNode: 'ic7447', fromPin: 1, toNode: 'dispCA', toPin: 1 },
      { id: 'wd2', fromNode: 'ic7447', fromPin: 2, toNode: 'dispCA', toPin: 2 },
      { id: 'wd3', fromNode: 'ic7447', fromPin: 3, toNode: 'dispCA', toPin: 3 },
      { id: 'wd4', fromNode: 'ic7447', fromPin: 4, toNode: 'dispCA', toPin: 4 },
      { id: 'wd5', fromNode: 'ic7447', fromPin: 5, toNode: 'dispCA', toPin: 5 },
      { id: 'wd6', fromNode: 'ic7447', fromPin: 6, toNode: 'dispCA', toPin: 6 },
      { id: 'wo0', fromNode: 'ic7447', fromPin: 0, toNode: 'outA', toPin: 0 },
      { id: 'wo1', fromNode: 'ic7447', fromPin: 1, toNode: 'outB', toPin: 0 },
      { id: 'wo2', fromNode: 'ic7447', fromPin: 2, toNode: 'outC', toPin: 0 },
      { id: 'wo3', fromNode: 'ic7447', fromPin: 3, toNode: 'outD', toPin: 0 },
      { id: 'wo4', fromNode: 'ic7447', fromPin: 4, toNode: 'outE', toPin: 0 },
      { id: 'wo5', fromNode: 'ic7447', fromPin: 5, toNode: 'outF', toPin: 0 },
      { id: 'wo6', fromNode: 'ic7447', fromPin: 6, toNode: 'outG', toPin: 0 }
    ]
  },
  {
    id: 'bcd-7seg-cc',
    title: 'Decodificador BCD a 7 Segmentos + Display (Cátodo Común / 74LS48)',
    category: 'Decodificadores y Conversores BCD',
    moduleTag: 'BCD a 7 Segmentos',
    description: 'Decodificador BCD a 7 segmentos con salidas activas en alto (1) conectado a un Display de Cátodo Común (Pág. 11 del PDF).',
    formulas: [
      '\\text{BCD } (D,C,B,A) \\implies \\text{Segmentos } a..g \\text{ (Cátodo Común)}'
    ],
    isPreset: true,
    nodes: [
      { id: 'inD', type: 'INPUT', label: 'D', x: 100, y: 65, state: [0] },
      { id: 'inC', type: 'INPUT', label: 'C', x: 100, y: 115, state: [0] },
      { id: 'inB', type: 'INPUT', label: 'B', x: 100, y: 165, state: [1] },
      { id: 'inA', type: 'INPUT', label: 'A', x: 100, y: 215, state: [1] },
      { id: 'bcd48', type: 'BCD_7SEG', label: 'U1 (74LS48)', x: 280, y: 55 },
      { id: 'dispCC', type: 'DISPLAY_7SEG_CC', label: 'Display Cátodo', x: 540, y: 55 },
      { id: 'outA', type: 'OUTPUT', label: 'a', x: 730, y: 36 },
      { id: 'outB', type: 'OUTPUT', label: 'b', x: 730, y: 74 },
      { id: 'outC', type: 'OUTPUT', label: 'c', x: 730, y: 112 },
      { id: 'outD', type: 'OUTPUT', label: 'd', x: 730, y: 150 },
      { id: 'outE', type: 'OUTPUT', label: 'e', x: 730, y: 188 },
      { id: 'outF', type: 'OUTPUT', label: 'f', x: 730, y: 226 },
      { id: 'outG', type: 'OUTPUT', label: 'g', x: 730, y: 264 }
    ],
    wires: [
      { id: 'wD', fromNode: 'inD', fromPin: 0, toNode: 'bcd48', toPin: 0 },
      { id: 'wC', fromNode: 'inC', fromPin: 0, toNode: 'bcd48', toPin: 1 },
      { id: 'wB', fromNode: 'inB', fromPin: 0, toNode: 'bcd48', toPin: 2 },
      { id: 'wA', fromNode: 'inA', fromPin: 0, toNode: 'bcd48', toPin: 3 },
      { id: 'wd0', fromNode: 'bcd48', fromPin: 0, toNode: 'dispCC', toPin: 0 },
      { id: 'wd1', fromNode: 'bcd48', fromPin: 1, toNode: 'dispCC', toPin: 1 },
      { id: 'wd2', fromNode: 'bcd48', fromPin: 2, toNode: 'dispCC', toPin: 2 },
      { id: 'wd3', fromNode: 'bcd48', fromPin: 3, toNode: 'dispCC', toPin: 3 },
      { id: 'wd4', fromNode: 'bcd48', fromPin: 4, toNode: 'dispCC', toPin: 4 },
      { id: 'wd5', fromNode: 'bcd48', fromPin: 5, toNode: 'dispCC', toPin: 5 },
      { id: 'wd6', fromNode: 'bcd48', fromPin: 6, toNode: 'dispCC', toPin: 6 },
      { id: 'wo0', fromNode: 'bcd48', fromPin: 0, toNode: 'outA', toPin: 0 },
      { id: 'wo1', fromNode: 'bcd48', fromPin: 1, toNode: 'outB', toPin: 0 },
      { id: 'wo2', fromNode: 'bcd48', fromPin: 2, toNode: 'outC', toPin: 0 },
      { id: 'wo3', fromNode: 'bcd48', fromPin: 3, toNode: 'outD', toPin: 0 },
      { id: 'wo4', fromNode: 'bcd48', fromPin: 4, toNode: 'outE', toPin: 0 },
      { id: 'wo5', fromNode: 'bcd48', fromPin: 5, toNode: 'outF', toPin: 0 },
      { id: 'wo6', fromNode: 'bcd48', fromPin: 6, toNode: 'outG', toPin: 0 }
    ]
  },
  {
    id: 'taller-deco-4-16',
    title: 'Taller: Decodificador 4 a 16 en base a Decodificadores 2 a 4',
    category: 'Decodificadores y Conversores BCD',
    moduleTag: 'Taller Pág. 18',
    description: 'Desarrollo de un decodificador 4 a 16 utilizando 5 decodificadores 2 a 4: 1 maestro (A3, A2) que habilita a 4 esclavos (A1, A0).',
    formulas: [
      'E_m = \\text{DEC}_{2:4}(A_3, A_2)',
      'O_{4m+k} = E_m \\cdot \\text{DEC}_{2:4}(A_1, A_0)'
    ],
    isPreset: true,
    nodes: [
      { id: 'inA3', type: 'INPUT', label: 'A3', x: 60, y: 50, state: [0] },
      { id: 'inA2', type: 'INPUT', label: 'A2', x: 60, y: 100, state: [1] },
      { id: 'inA1', type: 'INPUT', label: 'A1', x: 60, y: 240, state: [0] },
      { id: 'inA0', type: 'INPUT', label: 'A0', x: 60, y: 290, state: [1] },
      { id: 'decM', type: 'DEC_2_4', label: 'DEC_M (A3,A2)', x: 210, y: 50 },
      { id: 'dec0', type: 'DEC_2_4_EN', label: 'DEC0 (0..3)', x: 430, y: 16 },
      { id: 'dec1', type: 'DEC_2_4_EN', label: 'DEC1 (4..7)', x: 430, y: 180 },
      { id: 'dec2', type: 'DEC_2_4_EN', label: 'DEC2 (8..11)', x: 430, y: 344 },
      { id: 'dec3', type: 'DEC_2_4_EN', label: 'DEC3 (12..15)', x: 430, y: 508 },
      { id: 'o0', type: 'OUTPUT', label: 'O0', x: 650, y: 20 },
      { id: 'o1', type: 'OUTPUT', label: 'O1', x: 650, y: 56 },
      { id: 'o4', type: 'OUTPUT', label: 'O4', x: 650, y: 184 },
      { id: 'o5', type: 'OUTPUT', label: 'O5', x: 650, y: 220 },
      { id: 'o8', type: 'OUTPUT', label: 'O8', x: 650, y: 348 },
      { id: 'o12', type: 'OUTPUT', label: 'O12', x: 650, y: 512 },
      { id: 'o15', type: 'OUTPUT', label: 'O15', x: 650, y: 600 }
    ],
    wires: [
      { id: 'wm1', fromNode: 'inA3', fromPin: 0, toNode: 'decM', toPin: 0 },
      { id: 'wm2', fromNode: 'inA2', fromPin: 0, toNode: 'decM', toPin: 1 },
      { id: 'we0', fromNode: 'decM', fromPin: 0, toNode: 'dec0', toPin: 2 },
      { id: 'we1', fromNode: 'decM', fromPin: 1, toNode: 'dec1', toPin: 2 },
      { id: 'we2', fromNode: 'decM', fromPin: 2, toNode: 'dec2', toPin: 2 },
      { id: 'we3', fromNode: 'decM', fromPin: 3, toNode: 'dec3', toPin: 2 },
      { id: 'wa10', fromNode: 'inA1', fromPin: 0, toNode: 'dec0', toPin: 0 },
      { id: 'wa00', fromNode: 'inA0', fromPin: 0, toNode: 'dec0', toPin: 1 },
      { id: 'wa11', fromNode: 'inA1', fromPin: 0, toNode: 'dec1', toPin: 0 },
      { id: 'wa01', fromNode: 'inA0', fromPin: 0, toNode: 'dec1', toPin: 1 },
      { id: 'wa12', fromNode: 'inA1', fromPin: 0, toNode: 'dec2', toPin: 0 },
      { id: 'wa02', fromNode: 'inA0', fromPin: 0, toNode: 'dec2', toPin: 1 },
      { id: 'wa13', fromNode: 'inA1', fromPin: 0, toNode: 'dec3', toPin: 0 },
      { id: 'wa03', fromNode: 'inA0', fromPin: 0, toNode: 'dec3', toPin: 1 },
      { id: 'wo0', fromNode: 'dec0', fromPin: 0, toNode: 'o0', toPin: 0 },
      { id: 'wo1', fromNode: 'dec0', fromPin: 1, toNode: 'o1', toPin: 0 },
      { id: 'wo4', fromNode: 'dec1', fromPin: 0, toNode: 'o4', toPin: 0 },
      { id: 'wo5', fromNode: 'dec1', fromPin: 1, toNode: 'o5', toPin: 0 },
      { id: 'wo8', fromNode: 'dec2', fromPin: 0, toNode: 'o8', toPin: 0 },
      { id: 'wo12', fromNode: 'dec3', fromPin: 0, toNode: 'o12', toPin: 0 },
      { id: 'wo15', fromNode: 'dec3', fromPin: 3, toNode: 'o15', toPin: 0 }
    ]
  },
  {
    id: 'cascade-deco-3-8',
    title: 'Conexión en Cascada: 2 Decodificadores 3 a 8 (S0..S15)',
    category: 'Decodificadores y Conversores BCD',
    moduleTag: 'Cascada Pág. 8',
    description: 'Utilizando dos decodificadores 3 a 8 pequeños y un inversor en la entrada D se construye un decodificador de 16 salidas (Pág. 8 del PDF).',
    formulas: ["CS_1 = D', \\quad CS_2 = D"],
    isPreset: true,
    nodes: [
      { id: 'inA', type: 'INPUT', label: 'A', x: 70, y: 40, state: [0] },
      { id: 'inB', type: 'INPUT', label: 'B', x: 70, y: 90, state: [1] },
      { id: 'inC', type: 'INPUT', label: 'C', x: 70, y: 140, state: [0] },
      { id: 'inD', type: 'INPUT', label: 'D', x: 70, y: 260, state: [0] },
      { id: 'notD', type: 'NOT', label: 'INV_D', x: 210, y: 210 },
      { id: 'dec1', type: 'DEC_3_8_EN', label: 'DEC1 (S0..S7)', x: 380, y: 20 },
      { id: 'dec2', type: 'DEC_3_8_EN', label: 'DEC2 (S8..S15)', x: 380, y: 270 },
      { id: 'outS0', type: 'OUTPUT', label: 'S0', x: 610, y: 30 },
      { id: 'outS2', type: 'OUTPUT', label: 'S2', x: 610, y: 95 },
      { id: 'outS7', type: 'OUTPUT', label: 'S7', x: 610, y: 210 },
      { id: 'outS8', type: 'OUTPUT', label: 'S8', x: 610, y: 280 },
      { id: 'outS10', type: 'OUTPUT', label: 'S10', x: 610, y: 345 },
      { id: 'outS15', type: 'OUTPUT', label: 'S15', x: 610, y: 460 }
    ],
    wires: [
      { id: 'w1', fromNode: 'inA', fromPin: 0, toNode: 'dec1', toPin: 0 },
      { id: 'w2', fromNode: 'inB', fromPin: 0, toNode: 'dec1', toPin: 1 },
      { id: 'w3', fromNode: 'inC', fromPin: 0, toNode: 'dec1', toPin: 2 },
      { id: 'w4', fromNode: 'inA', fromPin: 0, toNode: 'dec2', toPin: 0 },
      { id: 'w5', fromNode: 'inB', fromPin: 0, toNode: 'dec2', toPin: 1 },
      { id: 'w6', fromNode: 'inC', fromPin: 0, toNode: 'dec2', toPin: 2 },
      { id: 'w7', fromNode: 'inD', fromPin: 0, toNode: 'notD', toPin: 0 },
      { id: 'w8', fromNode: 'notD', fromPin: 0, toNode: 'dec1', toPin: 3 },
      { id: 'w9', fromNode: 'inD', fromPin: 0, toNode: 'dec2', toPin: 3 },
      { id: 'ws0', fromNode: 'dec1', fromPin: 0, toNode: 'outS0', toPin: 0 },
      { id: 'ws2', fromNode: 'dec1', fromPin: 2, toNode: 'outS2', toPin: 0 },
      { id: 'ws7', fromNode: 'dec1', fromPin: 7, toNode: 'outS7', toPin: 0 },
      { id: 'ws8', fromNode: 'dec2', fromPin: 0, toNode: 'outS8', toPin: 0 },
      { id: 'ws10', fromNode: 'dec2', fromPin: 2, toNode: 'outS10', toPin: 0 },
      { id: 'ws15', fromNode: 'dec2', fromPin: 7, toNode: 'outS15', toPin: 0 }
    ]
  },
  {
    id: 'encoder-8-3-or',
    title: 'Codificador 8 a 3 con Compuertas OR (Pág. 14)',
    category: 'Codificadores y Prioridad (MSI)',
    moduleTag: 'Codificador 8:3',
    description: 'Codificador octal a binario construido a partir de 3 compuertas OR de 4 entradas (A2, A1, A0).',
    formulas: [
      'A_2 = I_4 + I_5 + I_6 + I_7',
      'A_1 = I_2 + I_3 + I_6 + I_7',
      'A_0 = I_1 + I_3 + I_5 + I_7'
    ],
    isPreset: true,
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
  },
  {
    id: 'adder-4bit-modular',
    title: 'Sumador de 4 bits en Cascada (M.S. + 3 S.C.)',
    category: 'Sumadores y Comparadores',
    moduleTag: 'Ripple Carry Adder',
    description: 'Sumador binario de 4 bits formado por 1 Medio Sumador (M.S.) para el bit 0 y 3 Sumadores Completos (S.C.) para los bits 1 a 3 en cascada de acarreo horizontal.',
    formulas: [
      'S = A + B \\pmod{16}',
      'C_{out} = \\text{Acarreo bit 4}'
    ],
    isPreset: true,
    nodes: [
      // Entradas Bus A y B (escalonadas limpiamente arriba de cada bloque de izquierda a derecha)
      { id: 'inA3', type: 'INPUT', label: 'A3', x: 110, y: 45, state: [0] },
      { id: 'inB3', type: 'INPUT', label: 'B3', x: 110, y: 100, state: [0] },
      { id: 'inA2', type: 'INPUT', label: 'A2', x: 290, y: 45, state: [1] },
      { id: 'inB2', type: 'INPUT', label: 'B2', x: 290, y: 100, state: [0] },
      { id: 'inA1', type: 'INPUT', label: 'A1', x: 470, y: 45, state: [0] },
      { id: 'inB1', type: 'INPUT', label: 'B1', x: 470, y: 100, state: [1] },
      { id: 'inA0', type: 'INPUT', label: 'A0', x: 650, y: 45, state: [1] },
      { id: 'inB0', type: 'INPUT', label: 'B0', x: 650, y: 100, state: [1] },

      // Bloques Modulares (bit 3 a la izquierda hasta bit 0 a la derecha, perfectamente alineados en Y=170)
      { id: 'sc3', type: 'BLOCK_SC', label: 'SC3', x: 180, y: 170 },
      { id: 'sc2', type: 'BLOCK_SC', label: 'SC2', x: 360, y: 170 },
      { id: 'sc1', type: 'BLOCK_SC', label: 'SC1', x: 540, y: 170 },
      { id: 'ms0', type: 'BLOCK_MS', label: 'MS0', x: 720, y: 170 },

      // Salidas: Cout alineado a la izquierda en Y=197 y S3..S0 debajo de cada bloque en Y=310
      { id: 'outCout', type: 'OUTPUT', label: 'Cout', x: 40, y: 197 },
      { id: 'outS3', type: 'OUTPUT', label: 'S3', x: 250, y: 310 },
      { id: 'outS2', type: 'OUTPUT', label: 'S2', x: 430, y: 310 },
      { id: 'outS1', type: 'OUTPUT', label: 'S1', x: 610, y: 310 },
      { id: 'outS0', type: 'OUTPUT', label: 'S0', x: 790, y: 310 }
    ],
    wires: [
      // Conexiones de Entradas A y B a pines superiores (0 y 1) de cada bloque
      { id: 'wA3', fromNode: 'inA3', fromPin: 0, toNode: 'sc3', toPin: 0 },
      { id: 'wB3', fromNode: 'inB3', fromPin: 0, toNode: 'sc3', toPin: 1 },
      { id: 'wA2', fromNode: 'inA2', fromPin: 0, toNode: 'sc2', toPin: 0 },
      { id: 'wB2', fromNode: 'inB2', fromPin: 0, toNode: 'sc2', toPin: 1 },
      { id: 'wA1', fromNode: 'inA1', fromPin: 0, toNode: 'sc1', toPin: 0 },
      { id: 'wB1', fromNode: 'inB1', fromPin: 0, toNode: 'sc1', toPin: 1 },
      { id: 'wA0', fromNode: 'inA0', fromPin: 0, toNode: 'ms0', toPin: 0 },
      { id: 'wB0', fromNode: 'inB0', fromPin: 0, toNode: 'ms0', toPin: 1 },

      // Cascada de Acarreo (Ripple Carry: Cout pin 1 [izquierda] -> Cin pin 2 [derecha])
      { id: 'wC0', fromNode: 'ms0', fromPin: 1, toNode: 'sc1', toPin: 2 },
      { id: 'wC1', fromNode: 'sc1', fromPin: 1, toNode: 'sc2', toPin: 2 },
      { id: 'wC2', fromNode: 'sc2', fromPin: 1, toNode: 'sc3', toPin: 2 },
      { id: 'wC3', fromNode: 'sc3', fromPin: 1, toNode: 'outCout', toPin: 0 },

      // Salidas de Suma (S pin 0 [inferior] -> Salidas LED outS0..outS3)
      { id: 'wS0', fromNode: 'ms0', fromPin: 0, toNode: 'outS0', toPin: 0 },
      { id: 'wS1', fromNode: 'sc1', fromPin: 0, toNode: 'outS1', toPin: 0 },
      { id: 'wS2', fromNode: 'sc2', fromPin: 0, toNode: 'outS2', toPin: 0 },
      { id: 'wS3', fromNode: 'sc3', fromPin: 0, toNode: 'outS3', toPin: 0 }
    ]
  },
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
      { id: 'mux4', type: 'MUX_4_1', label: 'U1', x: 370, y: 80 },
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
