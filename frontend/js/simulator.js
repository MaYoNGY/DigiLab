/**
 * MOTOR PRINCIPAL DEL SIMULADOR DE SISTEMAS DIGITALES (DigiLab Studio)
 * - Nodos Esquemáticos Puros (IEEE / Trapecios MUX / Terminales I/O / CIs 74LS)
 * - Sistema Multipestaña Real (+ crea pestaña nueva sin borrar el lienzo)
 * - Historial Deshacer/Rehacer (Ctrl+Z / Ctrl+Y) y Deshacer al eliminar en "Mis Lienzos"
 * - Protección de Sesión (Sin parpadeo al recargar F5 y bloqueo de botón Atrás tras Cerrar Sesión)
 */

class DigitalSimulator {
  constructor() {
    this.nodes = [];
    this.wires = [];
    this.currentCircuitId = null;
    this.selectedNodeId = null;
    this.selectedWireId = null;

    // Sistema Multipestaña Real
    this.tabs = [];
    this.activeTabId = null;
    this.tabCounter = 1;

    // Pila Deshacer / Rehacer por pestaña y papelera temporal para "Mis Lienzos"
    this.lastDeletedCanvasBackup = null;

    // Modo de herramienta en el lienzo ('select' | 'pan')
    this.interactionMode = 'select';

    // Estado de Simulación Interactiva (Tiempo Real vs Pausa)
    this.isSimulating = true;

    // Estado de Autenticación
    this.authToken = localStorage.getItem('digilab_token') || null;
    this.currentUser = null;
    this.userCircuits = [];

    // Estado de vista / lienzo
    this.zoom = 1;
    this.panX = 0;
    this.panY = 0;
    this.isPanning = false;
    this.panStart = { x: 0, y: 0 };

    // Estado de arrastre de nodo
    this.draggingNode = null;
    this.dragMoved = false;
    this.dragOffset = { x: 0, y: 0 };

    // Estado de creación de cable
    this.wiringStart = null;
    this.tempWirePath = null;

    // Valores calculados en la simulación actual
    this.nodeOutputs = {};
    this.nodeInputs = {};

    // Catálogo y Plantillas Base
    this.catalog = window.FALLBACK_CATALOG;
    this.presets = window.FALLBACK_PRESETS;

    // Referencias DOM
    this.landingView = document.getElementById('landingView');
    this.simulatorView = document.getElementById('simulatorView');
    this.viewport = document.getElementById('canvasViewport');
    this.world = document.getElementById('canvasWorld');
    this.wiresSvg = document.getElementById('wiresSvg');
    this.nodesLayer = document.getElementById('nodesLayer');

    this.init();
  }

  async init() {
    this.setupSessionAndHistoryGuard();
    this.bindAuthAndNavigationEvents();
    this.bindDropdownMenus();
    this.bindSimulationControls();
    this.bindEvents();
    this.initSynthesisModal();
    this.initPinoutModal();

    await this.syncWithNestBackend();
    this.renderCatalog();
    this.populatePresetsDropdown();

    // Si hay token guardado, PRIMERO verificar la sesión para autenticar y aislar las pestañas del usuario correcto
    if (this.authToken) {
      this.enterSimulatorWorkspace(false);
      await this.verifySavedSession();
    } else {
      // Si es usuario invitado o no hay sesión, restaurar sus pestañas o abrir plantilla base
      const restored = this.restoreWorkspaceTabsFromSession();
      if (!restored) {
        const defaultPreset = this.presets.find((p) => p.id === 'full-adder') || this.presets[0];
        if (defaultPreset) {
          this.openCircuitInNewTab(defaultPreset, true);
        } else {
          this.createNewBlankTab();
        }
      }
      if (sessionStorage.getItem('digilab_workspace_active') === '1') {
        this.enterSimulatorWorkspace(false);
      }
    }

    this.renderMathInElementSafe(document.body);
  }

  // =========================================================================
  // RENDERIZADO DE EXPRESIONES ALGEBRAICAS Y BOOLEANAS CON KATEX
  // =========================================================================
  formatVarToLatex(varLabel) {
    const clean = String(varLabel || '').trim().split(' ')[0];
    if (/^C_?in$/i.test(clean)) return 'C_{\\text{in}}';
    if (/^C_?out$/i.test(clean)) return 'C_{\\text{out}}';
    const subMatch = clean.match(/^([A-Za-z]+)_?(\d+)$/);
    if (subMatch) {
      return `${subMatch[1]}_{${subMatch[2]}}`;
    }
    return clean;
  }

  convertFormulaStringToLatex(formula) {
    if (!formula) return '';
    let s = String(formula).trim();
    // Si ya viene envuelto en $...$, extraer contenido
    if (s.startsWith('$') && s.endsWith('$')) {
      return s.slice(1, -1);
    }
    s = s
      .replace(/⊕/g, ' \\oplus ')
      .replace(/⊙/g, ' \\odot ')
      .replace(/·/g, ' \\cdot ')
      .replace(/≤/g, ' \\le ')
      .replace(/≥/g, ' \\ge ')
      .replace(/≠/g, ' \\ne ')
      .replace(/Σm/g, '\\sum m')
      .replace(/\bCin\b/g, 'C_{\\text{in}}')
      .replace(/\bCout\b/g, 'C_{\\text{out}}');

    // Convertir variables negadas con apóstrofo (ej. S1', A', I0') a \overline{...}
    s = s.replace(/([A-Za-z]+)(\d*)'/g, (_, letters, digits) => {
      const base = digits ? `${letters}_{${digits}}` : letters;
      return `\\overline{${base}}`;
    });

    // Convertir subíndices simples como I0, S1, A3, B0, Y0..Y7
    s = s.replace(/\b([A-Za-z])(\d+)\b/g, '$1_{$2}');
    return s;
  }

  renderLatexToHtml(latexStr, displayMode = false) {
    if (window.katex && typeof window.katex.renderToString === 'function') {
      try {
        return window.katex.renderToString(latexStr, {
          throwOnError: false,
          displayMode
        });
      } catch {
        return latexStr;
      }
    }
    return latexStr;
  }

  renderMathInElementSafe(targetEl = document.body) {
    if (!targetEl) return;
    if (typeof window.renderMathInElement === 'function') {
      try {
        window.renderMathInElement(targetEl, {
          delimiters: [
            { left: '$$', right: '$$', display: true },
            { left: '$', right: '$', display: false }
          ],
          throwOnError: false
        });
      } catch {}
    } else {
      // Si el script defer de KaTeX aún está terminando de cargar, reintentar brevemente
      setTimeout(() => {
        if (typeof window.renderMathInElement === 'function') {
          window.renderMathInElement(targetEl, {
            delimiters: [
              { left: '$$', right: '$$', display: true },
              { left: '$', right: '$', display: false }
            ],
            throwOnError: false
          });
        }
      }, 180);
    }
  }

  // =========================================================================
  // PROTECCIÓN DE SESIÓN, ANTI-PARPADEO AL RECARGAR Y BLOQUEO DE BOTÓN ATRÁS
  // =========================================================================
  setupSessionAndHistoryGuard() {
    window.addEventListener('popstate', () => {
      const hasToken = !!localStorage.getItem('digilab_token');
      const inWorkspace = sessionStorage.getItem('digilab_workspace_active') === '1';

      if (!hasToken && !inWorkspace) {
        // Si ya cerró sesión y presiona la flecha Atrás del navegador, impedir volver a la cuenta anterior
        this.forceLoggedOutLandingState();
        history.pushState({ view: 'landing', loggedOut: true }, '', window.location.pathname);
      } else if (hasToken || inWorkspace) {
        // Si está dentro de la aplicación con sesión activa, evitar que la flecha Atrás lo mande al login
        this.landingView.classList.add('hidden');
        this.simulatorView.classList.remove('hidden');
        document.documentElement.classList.add('in-workspace-mode');
        history.pushState({ view: 'simulator' }, '', '#simulator');
      }
    });

    window.addEventListener('pageshow', (event) => {
      if (event.persisted && !localStorage.getItem('digilab_token') && sessionStorage.getItem('digilab_workspace_active') !== '1') {
        this.forceLoggedOutLandingState();
      }
    });
  }

  forceLoggedOutLandingState() {
    this.authToken = null;
    this.currentUser = null;
    this.userCircuits = [];
    this.tabs = [];
    this.activeTabId = null;
    this.nodes = [];
    this.wires = [];
    this.currentCircuitId = null;
    this.selectedNodeId = null;
    try {
      sessionStorage.clear();
      localStorage.removeItem('digilab_guest_circuits');
    } catch {}
    document.documentElement.classList.remove('in-workspace-mode');
    this.simulatorView.classList.add('hidden');
    this.landingView.classList.remove('hidden');
    this.updateUserHeaderUI();
    this.renderTabsBar();
    this.renderAll();
    this.renderUserCanvasesLists();
  }

  // =========================================================================
  // NOTIFICACIONES TOAST (CON SOPORTE PARA BOTÓN "↶ DESHACER")
  // =========================================================================
  showToast(message, undoActionLabel = null, undoCallback = null) {
    const toast = document.getElementById('toastNotification');
    if (!toast) return;

    toast.innerHTML = '';
    const span = document.createElement('span');
    span.textContent = message;
    toast.appendChild(span);

    if (undoActionLabel && typeof undoCallback === 'function') {
      const btn = document.createElement('button');
      btn.className = 'toast-undo-btn';
      btn.textContent = undoActionLabel;
      btn.addEventListener('click', () => {
        clearTimeout(this.toastTimeout);
        toast.classList.add('hidden');
        undoCallback();
      });
      toast.appendChild(btn);
    }

    toast.classList.remove('hidden');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      toast.classList.add('hidden');
    }, undoCallback ? 7500 : 3200);
  }

  // =========================================================================
  // SISTEMA MULTIPESTAÑA REAL (+ ABRE NUEVA PESTAÑA SIN BORRAR LA ANTERIOR)
  // =========================================================================
  saveCurrentTabState() {
    if (!this.activeTabId) return;
    const tab = this.tabs.find((t) => t.tabId === this.activeTabId);
    if (!tab) return;

    tab.circuitId = this.currentCircuitId;
    tab.title = document.getElementById('activeCircuitTitleInput')?.value || tab.title;
    tab.moduleTag = document.getElementById('bannerModuleTag')?.textContent || tab.moduleTag;
    tab.description = document.getElementById('bannerDesc')?.textContent || tab.description;
    tab.nodes = JSON.parse(JSON.stringify(this.nodes));
    tab.wires = JSON.parse(JSON.stringify(this.wires));
    tab.zoom = this.zoom;
    tab.panX = this.panX;
    tab.panY = this.panY;
    tab.selectedNodeId = this.selectedNodeId;
    this.persistWorkspaceTabsToSession();
  }

  getTabStorageKey() {
    return this.currentUser ? `digilab_open_tabs_${this.currentUser.id}` : 'digilab_open_tabs_guest';
  }

  persistWorkspaceTabsToSession() {
    try {
      const minimalTabs = this.tabs.map((t) => ({
        tabId: t.tabId,
        circuitId: t.circuitId,
        title: t.title,
        moduleTag: t.moduleTag,
        description: t.description,
        formulas: t.formulas || [],
        nodes: t.nodes,
        wires: t.wires,
        zoom: t.zoom || 1,
        panX: t.panX || 0,
        panY: t.panY || 0
      }));
      sessionStorage.setItem(
        this.getTabStorageKey(),
        JSON.stringify({
          activeTabId: this.activeTabId,
          tabCounter: this.tabCounter,
          tabs: minimalTabs
        })
      );
    } catch {}
  }

  restoreWorkspaceTabsFromSession() {
    try {
      const raw = sessionStorage.getItem(this.getTabStorageKey());
      if (!raw) return false;
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.tabs) || parsed.tabs.length === 0) return false;

      this.tabs = parsed.tabs.map((t) => ({
        ...t,
        undoStack: [],
        redoStack: []
      }));
      this.tabCounter = parsed.tabCounter || this.tabs.length + 1;
      const targetId = parsed.activeTabId || this.tabs[0].tabId;
      this.switchToTab(targetId, false);
      return true;
    } catch {
      return false;
    }
  }

  createNewBlankTab(customTitle = null) {
    this.saveCurrentTabState();
    const newTitle = customTitle || `Circuito ${this.tabCounter++}`;
    const newTab = {
      tabId: `tab_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      circuitId: null,
      title: newTitle,
      moduleTag: 'Diseño Libre',
      description: 'Haz clic en cualquier componente del panel izquierdo para añadirlo al lienzo.',
      formulas: [],
      nodes: [
        { id: `inA_${Date.now()}`, type: 'INPUT', label: 'A', x: 140, y: 110, state: [0] },
        { id: `inB_${Date.now() + 1}`, type: 'INPUT', label: 'B', x: 140, y: 190, state: [0] },
        { id: `outS_${Date.now() + 2}`, type: 'OUTPUT', label: 'S', x: 520, y: 150 }
      ],
      wires: [],
      zoom: 1,
      panX: 0,
      panY: 0,
      selectedNodeId: null,
      undoStack: [],
      redoStack: []
    };

    this.tabs.push(newTab);
    this.switchToTab(newTab.tabId);
    this.showToast(`➕ Pestaña "${newTitle}" creada.`);
    return newTab;
  }

  openCircuitInNewTab(circuitObj, isPresetTemplate = false) {
    this.saveCurrentTabState();

    // Si ya hay una pestaña abierta con este mismo circuito guardado, cambiar a ella
    if (!isPresetTemplate && circuitObj.id) {
      const existingTab = this.tabs.find((t) => t.circuitId === circuitObj.id);
      if (existingTab) {
        this.switchToTab(existingTab.tabId);
        return existingTab;
      }
    }

    const newTab = {
      tabId: `tab_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      circuitId: isPresetTemplate ? null : (circuitObj.id || null),
      presetId: isPresetTemplate ? circuitObj.id : null,
      title: circuitObj.title || `Circuito ${this.tabCounter++}`,
      moduleTag: circuitObj.moduleTag || (isPresetTemplate ? 'Circuito Base' : 'Mi Lienzo'),
      description: circuitObj.description || 'Circuito digital interactivo.',
      formulas: circuitObj.formulas || [],
      nodes: JSON.parse(JSON.stringify(circuitObj.nodes || [])),
      wires: JSON.parse(JSON.stringify(circuitObj.wires || [])),
      zoom: 1,
      panX: 0,
      panY: 0,
      selectedNodeId: null,
      undoStack: [],
      redoStack: []
    };

    const mainIcNode =
      newTab.nodes.find((n) => !['INPUT', 'OUTPUT', 'VCC', 'GND'].includes(n.type)) || newTab.nodes[0];
    newTab.selectedNodeId = mainIcNode ? mainIcNode.id : null;

    this.tabs.push(newTab);
    this.switchToTab(newTab.tabId);
    return newTab;
  }

  switchToTab(tabId, savePrevious = true) {
    if (savePrevious && this.activeTabId && this.activeTabId !== tabId) {
      this.saveCurrentTabState();
    }

    const tab = this.tabs.find((t) => t.tabId === tabId);
    if (!tab) return;

    this.activeTabId = tab.tabId;
    this.currentCircuitId = tab.circuitId || null;
    this.nodes = JSON.parse(JSON.stringify(tab.nodes || []));
    this.wires = JSON.parse(JSON.stringify(tab.wires || []));
    this.zoom = tab.zoom || 1;
    this.panX = tab.panX || 0;
    this.panY = tab.panY || 0;
    this.selectedNodeId = tab.selectedNodeId || null;

    document.getElementById('bannerModuleTag').textContent = tab.moduleTag || 'Diseño Digital';
    document.getElementById('activeCircuitTitleInput').value = tab.title || 'Circuito';
    document.getElementById('truthTableTitle').textContent = `Tabla de Verdad (${tab.title || 'Circuito'})`;
    document.getElementById('bannerDesc').textContent = tab.description || '';

    const formulasContainer = document.getElementById('bannerFormulas');
    formulasContainer.innerHTML = (tab.formulas || [])
      .map((f) => {
        const latex = this.convertFormulaStringToLatex(f);
        return `<span class="formula-chip">${this.renderLatexToHtml(latex, false)}</span>`;
      })
      .join('');

    const presetSelect = document.getElementById('presetSelect');
    if (presetSelect) {
      presetSelect.value = tab.presetId || '';
    }

    this.updateWorldTransform();
    this.evaluateCircuit();
    this.renderTabsBar();
    this.renderAll();
    this.generateTruthTable();
    this.updateInspector();
    this.renderUserCanvasesLists();
    this.persistWorkspaceTabsToSession();
  }

  closeTab(tabId) {
    const idx = this.tabs.findIndex((t) => t.tabId === tabId);
    if (idx === -1) return;

    const closedTab = this.tabs[idx];
    this.tabs.splice(idx, 1);

    if (this.tabs.length === 0) {
      this.createNewBlankTab('Circuito 1');
    } else if (this.activeTabId === tabId) {
      const nextTab = this.tabs[Math.max(0, idx - 1)];
      this.switchToTab(nextTab.tabId, false);
    } else {
      this.renderTabsBar();
      this.persistWorkspaceTabsToSession();
    }

    this.showToast(`Pestaña "${closedTab.title}" cerrada.`, '↶ Reabrir', () => {
      this.tabs.splice(idx, 0, closedTab);
      this.switchToTab(closedTab.tabId);
    });
  }

  renderTabsBar() {
    const bar = document.getElementById('activeWorkTabs');
    if (!bar) return;
    bar.innerHTML = '';

    this.tabs.forEach((tab) => {
      const el = document.createElement('div');
      el.className = `work-tab ${tab.tabId === this.activeTabId ? 'active' : ''}`;
      el.innerHTML = `
        <span class="work-tab-dot"></span>
        <span class="work-tab-name">${tab.title}</span>
        <button class="work-tab-close" title="Cerrar esta pestaña">✕</button>
      `;

      el.addEventListener('click', (e) => {
        if (e.target.classList.contains('work-tab-close')) return;
        this.switchToTab(tab.tabId);
      });

      el.querySelector('.work-tab-close').addEventListener('click', (e) => {
        e.stopPropagation();
        this.closeTab(tab.tabId);
      });

      bar.appendChild(el);
    });
  }

  // =========================================================================
  // HISTORIAL DESHACER / REHACER EN EL LIENZO (CTRL+Z / CTRL+Y)
  // =========================================================================
  pushUndoSnapshot() {
    const tab = this.tabs.find((t) => t.tabId === this.activeTabId);
    if (!tab) return;
    tab.undoStack = tab.undoStack || [];
    tab.redoStack = [];
    tab.undoStack.push({
      nodes: JSON.parse(JSON.stringify(this.nodes)),
      wires: JSON.parse(JSON.stringify(this.wires)),
      selectedNodeId: this.selectedNodeId
    });
    if (tab.undoStack.length > 35) {
      tab.undoStack.shift();
    }
  }

  undoCanvasAction() {
    const tab = this.tabs.find((t) => t.tabId === this.activeTabId);
    if (!tab || !tab.undoStack || tab.undoStack.length === 0) {
      this.showToast('No hay más acciones para deshacer.');
      return;
    }

    tab.redoStack = tab.redoStack || [];
    tab.redoStack.push({
      nodes: JSON.parse(JSON.stringify(this.nodes)),
      wires: JSON.parse(JSON.stringify(this.wires)),
      selectedNodeId: this.selectedNodeId
    });

    const prev = tab.undoStack.pop();
    this.nodes = prev.nodes;
    this.wires = prev.wires;
    this.selectedNodeId = prev.selectedNodeId;

    this.evaluateCircuit();
    this.renderAll();
    this.generateTruthTable();
    this.updateInspector();
    this.saveCurrentTabState();
    this.showToast('↶ Acción deshecha.');
  }

  redoCanvasAction() {
    const tab = this.tabs.find((t) => t.tabId === this.activeTabId);
    if (!tab || !tab.redoStack || tab.redoStack.length === 0) {
      this.showToast('No hay acciones para rehacer.');
      return;
    }

    tab.undoStack = tab.undoStack || [];
    tab.undoStack.push({
      nodes: JSON.parse(JSON.stringify(this.nodes)),
      wires: JSON.parse(JSON.stringify(this.wires)),
      selectedNodeId: this.selectedNodeId
    });

    const next = tab.redoStack.pop();
    this.nodes = next.nodes;
    this.wires = next.wires;
    this.selectedNodeId = next.selectedNodeId;

    this.evaluateCircuit();
    this.renderAll();
    this.generateTruthTable();
    this.updateInspector();
    this.saveCurrentTabState();
    this.showToast('↷ Acción rehecha.');
  }

  // =========================================================================
  // AUTENTICACIÓN DE USUARIOS CON VALIDACIONES ESTRICTAS
  // =========================================================================
  bindAuthAndNavigationEvents() {
    const btnSwitchToRegister = document.getElementById('btnSwitchToRegister');
    const btnSwitchToLogin = document.getElementById('btnSwitchToLogin');
    const loginForm = document.getElementById('loginForm');
    const registerForm = document.getElementById('registerForm');
    const authAlert = document.getElementById('authAlert');

    const showAuthError = (msg, isSuccess = false) => {
      authAlert.textContent = msg;
      authAlert.className = `auth-alert ${isSuccess ? 'success' : 'error'}`;
    };

    if (btnSwitchToRegister) {
      btnSwitchToRegister.addEventListener('click', () => {
        loginForm.classList.add('hidden');
        registerForm.classList.remove('hidden');
        authAlert.classList.add('hidden');
      });
    }

    if (btnSwitchToLogin) {
      btnSwitchToLogin.addEventListener('click', () => {
        registerForm.classList.add('hidden');
        loginForm.classList.remove('hidden');
        authAlert.classList.add('hidden');
      });
    }

    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      authAlert.classList.add('hidden');
      const username = document.getElementById('loginUsername').value.trim().toLowerCase();
      const password = document.getElementById('loginPassword').value;

      if (username.length < 3) {
        showAuthError('El nombre de usuario debe tener al menos 3 caracteres.');
        return;
      }

      try {
        const res = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, password })
        });
        let data = null;
        try {
          data = await res.json();
        } catch {}

        if (!res.ok) {
          if (res.status === 404 || !data) {
            throw new Error('El backend NestJS no está activo en esta URL (/api). Si subiste solo el Frontend, usa el botón "Explorar Simulador" o despliega el Backend.');
          }
          throw new Error(data.message || 'Usuario o contraseña incorrectos.');
        }
        await this.onAuthSuccess(data.token, data.user);
      } catch (err) {
        showAuthError(err.message);
      }
    });

    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      authAlert.classList.add('hidden');
      const name = document.getElementById('regName').value.trim();
      const username = document.getElementById('regUsername').value.trim().toLowerCase();
      const password = document.getElementById('regPassword').value;

      if (name.length < 2) {
        showAuthError('Ingresa tu nombre completo (mínimo 2 caracteres).');
        return;
      }
      if (!/^[a-z0-9_.-]{3,24}$/.test(username)) {
        showAuthError('El usuario debe tener 3 a 24 caracteres (solo letras, números, puntos o guiones, sin espacios).');
        return;
      }
      if (password.length < 4) {
        showAuthError('La contraseña debe tener al menos 4 caracteres.');
        return;
      }

      try {
        const res = await fetch('/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ name, username, password })
        });
        let data = null;
        try {
          data = await res.json();
        } catch {}

        if (!res.ok) {
          if (res.status === 404 || !data) {
            throw new Error('El backend NestJS no está activo en esta URL (/api). Si subiste solo el Frontend, usa el botón "Explorar Simulador" o despliega el Backend.');
          }
          throw new Error(data.message || 'Ese nombre de usuario ya está ocupado.');
        }
        await this.onAuthSuccess(data.token, data.user);
      } catch (err) {
        showAuthError(err.message);
      }
    });

    document.getElementById('btnGuestEnterNav').addEventListener('click', () => {
      this.enterSimulatorWorkspace(true);
    });

    document.getElementById('btnGuestEnterHero').addEventListener('click', () => {
      this.enterSimulatorWorkspace(true);
    });

    document.querySelectorAll('[data-open-preset]').forEach((card) => {
      card.addEventListener('click', () => {
        const presetId = card.dataset.openPreset;
        this.enterSimulatorWorkspace(true);
        this.loadPreset(presetId);
      });
    });

    const featureCardMyDesigns = document.getElementById('featureCardMyDesigns');
    if (featureCardMyDesigns) {
      featureCardMyDesigns.addEventListener('click', async () => {
        this.enterSimulatorWorkspace(true);
        await this.fetchUserCircuits();
        document.getElementById('modalMyCanvases').classList.remove('hidden');
      });
    }

    // ÚNICO BOTÓN QUE CIERRA LA SESIÓN Y REGRESA AL LOGIN (CON BLOQUEO DE FLECHA ATRÁS)
    document.getElementById('btnLogout').addEventListener('click', () => {
      this.forceLoggedOutLandingState();
      localStorage.removeItem('digilab_token');
      sessionStorage.removeItem('digilab_workspace_active');
      sessionStorage.removeItem('digilab_open_tabs_state');

      document.getElementById('loginForm')?.reset();
      document.getElementById('registerForm')?.reset();
      document.getElementById('authAlert')?.classList.add('hidden');

      history.replaceState({ view: 'landing', loggedOut: true }, '', window.location.pathname);
      history.pushState({ view: 'landing', loggedOut: true }, '', window.location.pathname);
      this.showToast('Sesión cerrada correctamente.');
    });
  }

  async verifySavedSession() {
    try {
      const res = await fetch('/api/auth/me', {
        headers: { Authorization: `Bearer ${this.authToken}` }
      });
      if (!res.ok) throw new Error('Sesión expirada');
      const user = await res.json();
      await this.onAuthSuccess(this.authToken, user, false);
    } catch {
      this.authToken = null;
      localStorage.removeItem('digilab_token');
      sessionStorage.removeItem('digilab_workspace_active');
      this.forceLoggedOutLandingState();
    }
  }

  async onAuthSuccess(token, user, showWelcomeToast = true) {
    this.authToken = token;
    this.currentUser = user;
    localStorage.setItem('digilab_token', token);
    sessionStorage.setItem('digilab_workspace_active', '1');
    this.updateUserHeaderUI();
    await this.fetchUserCircuits();

    // VACIAR PESTAÑAS Y MEMORIA: Aislamiento total absoluto entre cuentas
    this.tabs = [];
    this.activeTabId = null;
    this.nodes = [];
    this.wires = [];

    // ÚNICAMENTE abrir los circuitos que le pertenecen a ESTE usuario autenticado
    if (this.userCircuits.length > 0) {
      this.userCircuits.forEach((circuit) => {
        this.openCircuitInNewTab(circuit, false);
      });
      if (this.tabs.length > 0) {
        this.switchToTab(this.tabs[0].tabId, false);
      }
    } else {
      // Si el usuario es nuevo y no tiene circuitos, abrir un lienzo inicial limpio
      const defaultPreset = this.presets.find((p) => p.id === 'full-adder') || this.presets[0];
      if (defaultPreset) {
        this.openCircuitInNewTab(defaultPreset, true);
      } else {
        this.createNewBlankTab('Circuito 1');
      }
    }

    this.renderTabsBar();
    this.renderAll();
    this.enterSimulatorWorkspace(true);

    if (showWelcomeToast) {
      if (this.userCircuits.length > 0) {
        this.showToast(`¡Hola ${user.name}! Se abrieron tus circuitos guardados.`);
      } else {
        this.showToast(`¡Bienvenido, ${user.name}!`);
      }
    }
  }

  updateUserHeaderUI() {
    const avatar = document.getElementById('userAvatarLetter');
    const nameDisp = document.getElementById('userNameDisplay');
    const btnLogout = document.getElementById('btnLogout');

    if (this.currentUser) {
      avatar.textContent = (this.currentUser.name || this.currentUser.username || 'U')[0].toUpperCase();
      nameDisp.textContent = this.currentUser.name || this.currentUser.username;
      btnLogout.textContent = 'Cerrar Sesión';
    } else {
      avatar.textContent = 'I';
      nameDisp.textContent = 'Invitado';
      btnLogout.textContent = 'Ir a Login';
    }
  }

  enterSimulatorWorkspace(pushHistory = true) {
    sessionStorage.setItem('digilab_workspace_active', '1');
    document.documentElement.classList.add('in-workspace-mode');
    this.landingView.classList.add('hidden');
    this.simulatorView.classList.remove('hidden');

    if (pushHistory) {
      history.replaceState({ view: 'simulator' }, '', '#simulator');
      history.pushState({ view: 'simulator' }, '', '#simulator');
    }

    this.evaluateCircuit();
    this.renderTabsBar();
    this.renderAll();
    this.generateTruthTable();
    this.updateInspector();
  }

  // =========================================================================
  // MENÚS DESPLEGABLES SUPERIORES (ARCHIVO, EDITAR, SIMULAR, HERRAMIENTAS)
  // =========================================================================
  bindDropdownMenus() {
    const closeAllDropdowns = () => {
      document.querySelectorAll('.menu-dropdown').forEach((menu) => menu.classList.add('hidden'));
      document.querySelectorAll('.menu-link[data-dropdown]').forEach((btn) => btn.classList.remove('open'));
    };

    document.querySelectorAll('.menu-link[data-dropdown]').forEach((trigger) => {
      trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetId = trigger.dataset.dropdown;
        const menuEl = document.getElementById(targetId);
        const isAlreadyOpen = !menuEl.classList.contains('hidden');
        closeAllDropdowns();
        if (!isAlreadyOpen) {
          menuEl.classList.remove('hidden');
          trigger.classList.add('open');
        }
      });
    });

    window.addEventListener('click', () => closeAllDropdowns());

    // Archivo
    document.getElementById('menuFileNew').addEventListener('click', () => {
      closeAllDropdowns();
      this.createNewBlankTab();
    });

    document.getElementById('menuFileSave').addEventListener('click', () => {
      closeAllDropdowns();
      this.saveCurrentCanvasToCloud();
    });

    document.getElementById('menuFileOpen').addEventListener('click', async () => {
      closeAllDropdowns();
      await this.fetchUserCircuits();
      document.getElementById('modalMyCanvases').classList.remove('hidden');
    });

    document.getElementById('menuFileImport').addEventListener('click', () => {
      closeAllDropdowns();
      document.getElementById('fileImportInput').click();
    });

    document.getElementById('menuFileExport').addEventListener('click', () => {
      closeAllDropdowns();
      this.downloadCircuitJson();
    });

    // Editar
    document.getElementById('menuEditUndo').addEventListener('click', () => {
      closeAllDropdowns();
      this.undoCanvasAction();
    });

    document.getElementById('menuEditRedo').addEventListener('click', () => {
      closeAllDropdowns();
      this.redoCanvasAction();
    });

    document.getElementById('menuEditDuplicate').addEventListener('click', () => {
      closeAllDropdowns();
      this.duplicateSelectedNode();
    });

    document.getElementById('menuEditRotate').addEventListener('click', () => {
      closeAllDropdowns();
      this.rotateSelectedNode();
    });

    document.getElementById('menuEditDelete').addEventListener('click', () => {
      closeAllDropdowns();
      if (this.selectedNodeId) this.deleteNode(this.selectedNodeId);
    });

    document.getElementById('menuEditClear').addEventListener('click', () => {
      closeAllDropdowns();
      this.clearCurrentCanvasWithUndo();
    });

    // Simular
    document.getElementById('menuSimToggle').addEventListener('click', () => {
      closeAllDropdowns();
      this.toggleSimulationState();
    });

    document.getElementById('menuSimStep').addEventListener('click', () => {
      closeAllDropdowns();
      this.stepSimulationOnce();
    });

    document.getElementById('menuSimResetInputs').addEventListener('click', () => {
      closeAllDropdowns();
      this.resetAllInputsToZero();
    });

    document.getElementById('menuSimTruth').addEventListener('click', () => {
      closeAllDropdowns();
      this.generateTruthTable();
      this.showToast('Tabla de verdad recalculada.');
    });

    // Herramientas
    document.getElementById('menuToolSynth').addEventListener('click', () => {
      closeAllDropdowns();
      document.getElementById('modalSynthesis').classList.remove('hidden');
    });

    document.getElementById('menuToolPinout').addEventListener('click', () => {
      closeAllDropdowns();
      document.getElementById('modalPinout').classList.remove('hidden');
    });

    document.getElementById('menuVerGuiaBtn').addEventListener('click', () => {
      closeAllDropdowns();
      document.querySelectorAll('.dock-tab').forEach((b) => b.classList.remove('active'));
      document.querySelectorAll('.dock-content').forEach((c) => c.classList.remove('active'));
      const refTabBtn = document.querySelector('[data-docktab="dockReference"]');
      if (refTabBtn) refTabBtn.classList.add('active');
      document.getElementById('dockReference').classList.add('active');
      document.getElementById('bottomDock').classList.remove('collapsed');
    });
  }

  // =========================================================================
  // CONTROLES DE SIMULACIÓN EN BARRA DE HERRAMIENTAS
  // =========================================================================
  bindSimulationControls() {
    document.getElementById('btnToggleSimulation').addEventListener('click', () => {
      this.toggleSimulationState();
    });

    document.getElementById('btnStepSimulation').addEventListener('click', () => {
      this.stepSimulationOnce();
    });

    document.getElementById('btnResetInputs').addEventListener('click', () => {
      this.resetAllInputsToZero();
    });
  }

  toggleSimulationState() {
    this.isSimulating = !this.isSimulating;
    const btn = document.getElementById('btnToggleSimulation');
    const icon = document.getElementById('simBtnIcon');
    const label = document.getElementById('simBtnLabel');
    const indicator = document.getElementById('simStatusIndicator');
    const statusText = document.getElementById('backendStatusText');

    if (this.isSimulating) {
      btn.classList.add('running');
      btn.classList.remove('paused');
      icon.textContent = '▶';
      label.textContent = 'Simular';
      indicator.classList.add('active');
      indicator.classList.remove('paused');
      statusText.textContent = 'Simulación en tiempo real';
      this.evaluateCircuit();
      this.renderAll();
      this.updateInspector();
      this.showToast('▶ Simulación en tiempo real activa.');
    } else {
      btn.classList.remove('running');
      btn.classList.add('paused');
      icon.textContent = '⏸';
      label.textContent = 'En Pausa';
      indicator.classList.remove('active');
      indicator.classList.add('paused');
      statusText.textContent = 'Simulación en Pausa (Usa "Paso" para evaluar)';
      this.showToast('⏸ Simulación en pausa.');
    }
  }

  stepSimulationOnce() {
    this.evaluateCircuit();
    this.renderAll();
    this.updateInspector();
    this.showToast('⏭ Paso de propagación lógica evaluado.');
  }

  resetAllInputsToZero() {
    this.pushUndoSnapshot();
    let count = 0;
    this.nodes.forEach((n) => {
      if (n.type === 'INPUT') {
        n.state = [0];
        count++;
      }
    });
    if (this.isSimulating) {
      this.evaluateCircuit();
    }
    this.renderAll();
    this.updateInspector();
    this.saveCurrentTabState();
    this.showToast(`↺ ${count} entradas reiniciadas a 0.`);
  }

  // =========================================================================
  // SINCRONIZACIÓN CON POSTGRESQL Y GESTIÓN DE "MIS LIENZOS" (CON + NUEVO Y DESHACER AL BORRAR)
  // =========================================================================
  async syncWithNestBackend() {
    const txt = document.getElementById('backendStatusText');
    try {
      const [catRes, preRes] = await Promise.all([
        fetch('/api/simulator/catalog'),
        fetch('/api/simulator/presets')
      ]);
      if (catRes.ok && preRes.ok) {
        this.catalog = await catRes.json();
        this.presets = await preRes.json();
        txt.textContent = 'Simulación en tiempo real';
      }
    } catch {
      txt.textContent = 'Simulación en tiempo real';
    }
  }

  async fetchUserCircuits() {
    if (!this.authToken) {
      try {
        const localSaved = JSON.parse(localStorage.getItem('digilab_guest_circuits') || '[]');
        this.userCircuits = Array.isArray(localSaved) ? localSaved : [];
      } catch {
        this.userCircuits = [];
      }
      this.renderUserCanvasesLists();
      return;
    }

    try {
      const res = await fetch('/api/simulator/my-circuits', {
        headers: { Authorization: `Bearer ${this.authToken}` }
      });
      if (res.ok) {
        this.userCircuits = await res.json();
      }
    } catch {
      this.userCircuits = [];
    }
    this.renderUserCanvasesLists();
  }

  renderUserCanvasesLists() {
    const badge = document.getElementById('myCanvasesCountBadge');
    const sidebarList = document.getElementById('sidebarCanvasesList');
    const modalGrid = document.getElementById('modalCanvasesGrid');

    if (badge) badge.textContent = this.userCircuits.length;
    if (!sidebarList || !modalGrid) return;

    if (this.userCircuits.length === 0) {
      const emptyHtml = `
        <div style="padding:14px;background:#fff9fc;border:1px solid var(--border-light);border-radius:10px;text-align:center;">
          <p style="font-size:0.75rem;color:var(--text-muted);margin-bottom:10px;">
            Aún no tienes lienzos en tu lista. Pulsa <b>"+ Nuevo"</b> arriba o <b>"Guardar"</b> en la barra superior para crear uno.
          </p>
        </div>
      `;
      sidebarList.innerHTML = emptyHtml;
      modalGrid.innerHTML = emptyHtml;
      return;
    }

    sidebarList.innerHTML = '';
    this.userCircuits.forEach((c) => {
      const dateStr = c.updatedAt
        ? new Date(c.updatedAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
        : 'Reciente';
      const card = document.createElement('div');
      card.className = `saved-canvas-card ${this.currentCircuitId === c.id ? 'active' : ''}`;
      card.innerHTML = `
        <div class="saved-canvas-top">
          <span class="saved-canvas-title">${c.title}</span>
          <button class="btn-xs-rose btn-del-canvas" title="Eliminar este lienzo (con opción de Deshacer)">✕</button>
        </div>
        <div class="saved-canvas-meta">
          <span>${(c.nodes || []).length} componentes · ${(c.wires || []).length} cables</span>
          <span>${dateStr}</span>
        </div>
      `;

      card.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-del-canvas')) return;
        this.openCircuitInNewTab(c, false);
        this.showToast(`Lienzo "${c.title}" abierto.`);
      });

      card.querySelector('.btn-del-canvas').addEventListener('click', async (e) => {
        e.stopPropagation();
        await this.deleteUserCircuitWithUndo(c);
      });

      sidebarList.appendChild(card);
    });

    modalGrid.innerHTML = '';
    this.userCircuits.forEach((c) => {
      const dateStr = c.updatedAt
        ? new Date(c.updatedAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' })
        : 'Reciente';
      const item = document.createElement('div');
      item.className = 'canvas-modal-item';
      item.innerHTML = `
        <div>
          <span class="module-pill">${c.moduleTag || 'Proyecto Guardado'}</span>
          <h4 style="font-size:0.92rem;margin:6px 0 4px;color:var(--text-dark);">${c.title}</h4>
          <p style="font-size:0.73rem;color:var(--text-muted);">${(c.nodes || []).length} componentes · Actualizado: ${dateStr}</p>
        </div>
        <div class="canvas-modal-actions">
          <button class="btn btn-rose-solid btn-open-c" style="flex:1;justify-content:center;padding:6px 10px;font-size:0.75rem;">Abrir en Pestaña</button>
          <button class="btn btn-outline-soft btn-dl-c" style="padding:6px 10px;font-size:0.75rem;" title="Exportar JSON">⬇️</button>
          <button class="btn btn-outline-soft btn-rm-c" style="padding:6px 10px;font-size:0.75rem;color:var(--danger);" title="Eliminar (con opción Deshacer)">🗑️</button>
        </div>
      `;

      item.querySelector('.btn-open-c').addEventListener('click', () => {
        this.openCircuitInNewTab(c, false);
        document.getElementById('modalMyCanvases').classList.add('hidden');
        this.showToast(`Trabajando en "${c.title}"`);
      });

      item.querySelector('.btn-dl-c').addEventListener('click', () => {
        this.downloadCircuitJson(c);
      });

      item.querySelector('.btn-rm-c').addEventListener('click', async () => {
        await this.deleteUserCircuitWithUndo(c);
      });

      modalGrid.appendChild(item);
    });
  }

  /**
   * Crea un nuevo lienzo directamente en la lista "Mis Lienzos" y lo abre en una nueva pestaña
   */
  async createNewCanvasInMyList() {
    const nextNum = this.userCircuits.length + 1;
    const newTitle = `Mi Circuito ${nextNum}`;
    const newTab = this.createNewBlankTab(newTitle);
    await this.saveCurrentCanvasToCloud(true);

    // Asegurar que la pestaña "Mis Lienzos" quede visible mostrando el nuevo cuadro creado abajo
    document.querySelectorAll('.side-tab').forEach((b) => b.classList.remove('active'));
    document.querySelectorAll('.left-tab-body').forEach((body) => body.classList.remove('active'));
    document.querySelector('[data-lefttab="leftMyWork"]')?.classList.add('active');
    document.getElementById('leftMyWork')?.classList.add('active');

    this.showToast(`✨ "${newTab.title}" creado y añadido a Mis Lienzos.`);
  }

  async saveCurrentCanvasToCloud(silent = false) {
    const titleInput = document.getElementById('activeCircuitTitleInput');
    const title = (titleInput.value || '').trim() || 'Mi Lienzo Digital';

    const payload = {
      id: this.currentCircuitId || `c_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      title,
      category: 'Mis Lienzos',
      moduleTag: 'Proyecto Guardado',
      description: document.getElementById('bannerDesc').textContent,
      formulas: [],
      nodes: this.nodes,
      wires: this.wires,
      updatedAt: new Date().toISOString()
    };

    if (!this.authToken || !this.currentUser) {
      // Guardar también localmente si está en modo invitado para que "+ Nuevo" y "Guardar" funcionen siempre
      const existingIdx = this.userCircuits.findIndex((c) => c.id === payload.id);
      if (existingIdx >= 0) {
        this.userCircuits[existingIdx] = payload;
      } else {
        this.userCircuits.unshift(payload);
      }
      localStorage.setItem('digilab_guest_circuits', JSON.stringify(this.userCircuits));
      this.currentCircuitId = payload.id;
      this.saveCurrentTabState();
      this.renderUserCanvasesLists();
      if (!silent) {
        this.showToast(`💾 Lienzo "${title}" guardado en Mis Lienzos.`);
      }
      return;
    }

    try {
      const res = await fetch('/api/simulator/circuits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.authToken}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) throw new Error('Error al guardar');
      const data = await res.json();
      this.currentCircuitId = data.circuit.id;
      document.getElementById('bannerModuleTag').textContent = 'Guardado en Cuenta';
      this.saveCurrentTabState();

      await this.fetchUserCircuits();
      if (!silent) {
        this.showToast(`💾 Lienzo "${title}" guardado en PostgreSQL.`);
      }
    } catch {
      this.showToast('No se pudo guardar en el servidor.');
    }
  }

  /**
   * Elimina un lienzo de "Mis Lienzos" ofreciendo un botón "↶ Deshacer" por si el usuario se equivocó
   */
  async deleteUserCircuitWithUndo(circuitObj) {
    const backup = JSON.parse(JSON.stringify(circuitObj));
    this.lastDeletedCanvasBackup = backup;

    // Quitar de la vista inmediatamente
    this.userCircuits = this.userCircuits.filter((c) => c.id !== backup.id);
    if (!this.authToken) {
      localStorage.setItem('digilab_guest_circuits', JSON.stringify(this.userCircuits));
    } else {
      try {
        await fetch(`/api/simulator/circuits/${backup.id}`, {
          method: 'DELETE',
          headers: { Authorization: `Bearer ${this.authToken}` }
        });
      } catch {}
    }

    if (this.currentCircuitId === backup.id) {
      this.currentCircuitId = null;
    }
    this.renderUserCanvasesLists();

    // Mostrar notificación con botón "↶ Deshacer"
    this.showToast(`🗑️ Lienzo "${backup.title}" eliminado.`, '↶ Deshacer', async () => {
      if (!this.authToken) {
        this.userCircuits.unshift(backup);
        localStorage.setItem('digilab_guest_circuits', JSON.stringify(this.userCircuits));
        this.renderUserCanvasesLists();
        this.showToast(`✅ Lienzo "${backup.title}" restaurado.`);
      } else {
        try {
          const res = await fetch('/api/simulator/circuits', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${this.authToken}`
            },
            body: JSON.stringify(backup)
          });
          if (res.ok) {
            await this.fetchUserCircuits();
            this.showToast(`✅ Lienzo "${backup.title}" restaurado en PostgreSQL.`);
          }
        } catch {
          this.showToast('No se pudo restaurar el lienzo.');
        }
      }
    });
  }

  downloadCircuitJson(circuitObj = null) {
    const title = circuitObj
      ? circuitObj.title
      : document.getElementById('activeCircuitTitleInput').value.trim() || 'mi-circuito-digital';

    const payload = circuitObj || {
      id: this.currentCircuitId || `export-${Date.now()}`,
      title,
      moduleTag: document.getElementById('bannerModuleTag').textContent,
      description: document.getElementById('bannerDesc').textContent,
      nodes: this.nodes,
      wires: this.wires
    };

    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/[^a-z0-9-_]+/g, '-')}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  // =========================================================================
  // CATÁLOGO LATERAL CON ICONOS ESQUEMÁTICOS SVG
  // =========================================================================
  renderCatalog(filterText = '') {
    const container = document.getElementById('componentCatalog');
    container.innerHTML = '';
    const query = filterText.trim().toLowerCase();

    this.catalog.categories.forEach((cat) => {
      const filteredItems = cat.items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) ||
          item.type.toLowerCase().includes(query) ||
          (item.ic && item.ic.toLowerCase().includes(query)) ||
          (item.desc && item.desc.toLowerCase().includes(query))
      );

      if (filteredItems.length === 0) return;

      const catDiv = document.createElement('div');
      catDiv.className = 'catalog-category';
      catDiv.innerHTML = `
        <div class="category-title">
          <span>▾ ${cat.name}</span>
          <span class="category-count">${filteredItems.length}</span>
        </div>
      `;

      const grid = document.createElement('div');
      grid.className = 'catalog-grid';

      filteredItems.forEach((item) => {
        const def = window.COMPONENT_DEFS[item.type] || {};
        const badge = item.ic || def.ic || item.type;
        const subText = def.sub || item.desc || '';
        const iconSvg = window.getCatalogIconSvg(item.type);

        const card = document.createElement('div');
        card.className = 'catalog-item';
        card.innerHTML = `
          <div class="item-left">
            <div class="item-svg-icon">${iconSvg}</div>
            <div class="item-info">
              <span class="item-name">${item.name}</span>
              <span class="item-desc">${subText}</span>
            </div>
          </div>
          <span class="item-badge">${badge}</span>
        `;
        card.addEventListener('click', () => {
          this.addNodeOfType(item.type);
          document.getElementById('leftSidebar').classList.remove('open');
        });
        grid.appendChild(card);
      });

      catDiv.appendChild(grid);
      container.appendChild(catDiv);
    });
  }

  populatePresetsDropdown() {
    const select = document.getElementById('presetSelect');
    select.innerHTML = `<option value="">-- Seleccionar circuito de ejemplo --</option>`;
    this.presets.forEach((p) => {
      const opt = document.createElement('option');
      opt.value = p.id;
      opt.textContent = p.title;
      select.appendChild(opt);
    });
  }

  loadPreset(presetId) {
    const preset = this.presets.find((p) => p.id === presetId);
    if (!preset) return;
    this.openCircuitInNewTab(preset, true);
  }

  addNodeOfType(type, customX, customY, customLabel) {
    const def = window.COMPONENT_DEFS[type];
    if (!def) return null;

    this.pushUndoSnapshot();

    let label = customLabel || def.ic || def.name;
    if (!customLabel && type === 'INPUT') {
      const count = this.nodes.filter((n) => n.type === 'INPUT').length;
      const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
      label = letters[count] || `In${count + 1}`;
    } else if (!customLabel && type === 'OUTPUT') {
      const count = this.nodes.filter((n) => n.type === 'OUTPUT').length;
      const outNames = ['S', 'Cout', 'Y', 'F', 'Z'];
      label = outNames[count] || `Out${count + 1}`;
    } else if (!customLabel && def.kind === 'gate') {
      const gateCount = this.nodes.filter((n) => !['INPUT', 'OUTPUT', 'VCC', 'GND'].includes(n.type)).length;
      label = `U${gateCount + 1}`;
    }

    const offset = (this.nodes.length % 6) * 24;
    const node = {
      id: `n_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      type,
      label,
      x: customX !== undefined ? customX : Math.round((220 - this.panX + offset) / this.zoom),
      y: customY !== undefined ? customY : Math.round((120 - this.panY + offset) / this.zoom),
      rotation: 0,
      state: type === 'INPUT' ? [0] : []
    };

    this.nodes.push(node);
    this.selectedNodeId = node.id;
    if (this.isSimulating) {
      this.evaluateCircuit();
    }
    this.renderAll();
    this.generateTruthTable();
    this.updateInspector();
    this.saveCurrentTabState();
    return node;
  }

  rotateSelectedNode() {
    const node = this.nodes.find((n) => n.id === this.selectedNodeId);
    if (!node) {
      this.showToast('Selecciona un componente en el lienzo para rotarlo.');
      return;
    }
    this.pushUndoSnapshot();
    node.rotation = ((node.rotation || 0) + 90) % 360;
    this.renderAll();
    this.updateInspector();
    this.saveCurrentTabState();
  }

  duplicateSelectedNode() {
    const node = this.nodes.find((n) => n.id === this.selectedNodeId);
    if (!node) {
      this.showToast('Selecciona un componente en el lienzo para duplicarlo.');
      return;
    }
    this.pushUndoSnapshot();
    const copy = JSON.parse(JSON.stringify(node));
    copy.id = `n_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    copy.x += 30;
    copy.y += 30;
    copy.label = `${node.label}_2`;
    this.nodes.push(copy);
    this.selectedNodeId = copy.id;
    if (this.isSimulating) {
      this.evaluateCircuit();
    }
    this.renderAll();
    this.generateTruthTable();
    this.updateInspector();
    this.saveCurrentTabState();
    this.showToast(`📋 Componente "${node.label}" duplicado.`);
  }

  clearCurrentCanvasWithUndo() {
    if (this.nodes.length === 0) return;
    this.pushUndoSnapshot();
    this.nodes = [];
    this.wires = [];
    this.selectedNodeId = null;
    this.evaluateCircuit();
    this.renderAll();
    this.generateTruthTable();
    this.updateInspector();
    this.saveCurrentTabState();
    this.showToast('🧹 Lienzo limpiado.', '↶ Deshacer', () => this.undoCanvasAction());
  }

  // =========================================================================
  // EVALUACIÓN LÓGICA DEL CIRCUITO EN TIEMPO REAL
  // =========================================================================
  evaluateCircuit(overrideInputsMap = null) {
    const outputsMap = {};
    const inputsMap = {};

    this.nodes.forEach((n) => {
      const def = window.COMPONENT_DEFS[n.type];
      if (!def) return;
      outputsMap[n.id] = new Array(def.outputs.length).fill(0);
      inputsMap[n.id] = new Array(def.inputs.length).fill(0);
    });

    const maxIterations = Math.max(14, this.nodes.length + 4);
    for (let iter = 0; iter < maxIterations; iter++) {
      let changed = false;

      this.nodes.forEach((n) => {
        const def = window.COMPONENT_DEFS[n.type];
        if (!def) return;
        const inVals = new Array(def.inputs.length).fill(0);

        this.wires.forEach((w) => {
          if (w.toNode === n.id) {
            const srcOut = outputsMap[w.fromNode];
            if (srcOut && srcOut[w.fromPin] !== undefined) {
              inVals[w.toPin] = srcOut[w.fromPin];
            }
          }
        });
        inputsMap[n.id] = inVals;
      });

      this.nodes.forEach((n) => {
        const def = window.COMPONENT_DEFS[n.type];
        if (!def) return;

        let stateToUse = n.state;
        if (overrideInputsMap && overrideInputsMap[n.id] !== undefined) {
          stateToUse = [overrideInputsMap[n.id]];
        }

        const newOut = def.evaluate(inputsMap[n.id], stateToUse);
        const prevOut = outputsMap[n.id];

        for (let i = 0; i < newOut.length; i++) {
          if (prevOut[i] !== newOut[i]) {
            changed = true;
            prevOut[i] = newOut[i];
          }
        }
      });

      if (!changed) break;
    }

    if (!overrideInputsMap) {
      this.nodeOutputs = outputsMap;
      this.nodeInputs = inputsMap;
      this.renderLiveSimulationResults();
    }

    return { outputsMap, inputsMap };
  }

  getPinPosition(node, pinIndex, isOutput) {
    const def = window.COMPONENT_DEFS[node.type];
    const pinY = node.y + window.getPinOffsetY(node.type, pinIndex, isOutput);
    const pinX = isOutput ? node.x + def.width : node.x;
    return { x: pinX, y: pinY };
  }

  renderAll() {
    this.renderNodes();
    this.renderWires();
    this.highlightActiveTruthRow();
  }

  // =========================================================================
  // RENDERIZADO DE NODOS ESQUEMÁTICOS PUROS EN EL LIENZO (SIN RECTÁNGULOS ENVOLVENTES)
  // =========================================================================
  renderNodes() {
    this.nodesLayer.innerHTML = '';

    this.nodes.forEach((node) => {
      const def = window.COMPONENT_DEFS[node.type];
      if (!def) return;

      const el = document.createElement('div');
      el.className = `circuit-node ${this.selectedNodeId === node.id ? 'selected' : ''}`;
      el.style.left = `${node.x}px`;
      el.style.top = `${node.y}px`;
      el.style.width = `${def.width}px`;
      el.style.height = `${def.height}px`;
      el.dataset.id = node.id;

      const outVals = this.nodeOutputs[node.id] || [0];
      const inVals = this.nodeInputs[node.id] || [0];

      // 1. Terminales Esquemáticos de Entrada (A ○───)
      if (node.type === 'INPUT' || node.type === 'VCC' || node.type === 'GND') {
        const val = node.type === 'VCC' ? 1 : node.type === 'GND' ? 0 : (node.state && node.state[0] ? 1 : 0);
        const wrap = document.createElement('div');
        wrap.className = 'schematic-io-in';
        wrap.innerHTML = `
          <span class="io-in-label">${node.label}</span>
          <button class="io-in-circle ${val ? 'high' : ''}" title="${node.type === 'INPUT' ? 'Haz clic para alternar entre 0 y 1' : node.label}">
            ${val}
          </button>
          <span class="io-in-lead ${val ? 'high' : ''}"></span>
        `;

        if (node.type === 'INPUT') {
          const btnCircle = wrap.querySelector('.io-in-circle');
          btnCircle.addEventListener('mousedown', (e) => e.stopPropagation());
          btnCircle.addEventListener('click', (e) => {
            e.stopPropagation();
            node.state = [val ? 0 : 1];
            if (this.isSimulating) {
              this.evaluateCircuit();
            }
            this.renderAll();
            this.updateInspector();
            this.saveCurrentTabState();
          });
        }
        el.appendChild(wrap);
      }
      // 2. Terminales Esquemáticos de Salida (───● S)
      else if (node.type === 'OUTPUT') {
        const isHigh = inVals[0] === 1;
        const wrap = document.createElement('div');
        wrap.className = 'schematic-io-out';
        wrap.innerHTML = `
          <span class="io-out-lead ${isHigh ? 'high' : ''}"></span>
          <div class="io-out-circle ${isHigh ? 'high' : ''}" title="Salida ${node.label} = ${isHigh ? 1 : 0}">
            ${isHigh ? '1' : '0'}
          </div>
          <span class="io-out-label">${node.label}</span>
        `;
        el.appendChild(wrap);
      }
      // 3. Display Hexadecimal de 4 bits
      else if (node.type === 'HEX_DISPLAY') {
        const num = outVals[0] || 0;
        const hexStr = num.toString(16).toUpperCase();
        const wrap = document.createElement('div');
        wrap.className = 'hex-screen';
        wrap.innerHTML = `
          <div class="hex-val">0x${hexStr}</div>
          <div class="dec-val">Dec: ${num}</div>
        `;
        el.appendChild(wrap);
      }
      // 4. Compuertas IEEE puras, Trapecios MUX y Bloques IC 74LS
      else {
        const svgWrapper = document.createElement('div');
        svgWrapper.style.width = '100%';
        svgWrapper.style.height = '100%';
        if (node.rotation) {
          svgWrapper.style.transform = `rotate(${node.rotation}deg)`;
        }
        svgWrapper.innerHTML = window.renderSchematicNodeSvg(node, inVals, outVals);
        el.appendChild(svgWrapper);

        if (def.kind === 'gate' && node.label) {
          const tag = document.createElement('span');
          tag.className = 'schematic-floating-tag';
          tag.textContent = node.label;
          el.appendChild(tag);
        }
      }

      // Pines de Entrada
      def.inputs.forEach((pinName, idx) => {
        const offsetY = window.getPinOffsetY(node.type, idx, false);
        const pinVal = inVals[idx] === 1;

        const pin = document.createElement('div');
        pin.className = `pin input-pin ${pinVal ? 'high' : ''}`;
        pin.style.top = `${offsetY - 5}px`;
        pin.title = `Entrada ${pinName} (${pinVal ? 1 : 0})`;

        pin.addEventListener('mousedown', (e) => {
          e.stopPropagation();
          this.startOrCompleteWiring(node.id, idx, false, e);
        });
        pin.addEventListener('mouseup', (e) => {
          e.stopPropagation();
          this.completeWiringOnPin(node.id, idx, false);
        });

        el.appendChild(pin);
      });

      // Pines de Salida
      def.outputs.forEach((pinName, idx) => {
        const offsetY = window.getPinOffsetY(node.type, idx, true);
        const pinVal = outVals[idx] === 1;

        const pin = document.createElement('div');
        pin.className = `pin output-pin ${pinVal ? 'high' : ''}`;
        pin.style.top = `${offsetY - 5}px`;
        pin.title = `Salida ${pinName} (${pinVal ? 1 : 0})`;

        pin.addEventListener('mousedown', (e) => {
          e.stopPropagation();
          this.startOrCompleteWiring(node.id, idx, true, e);
        });
        pin.addEventListener('mouseup', (e) => {
          e.stopPropagation();
          this.completeWiringOnPin(node.id, idx, true);
        });

        el.appendChild(pin);
      });

      el.addEventListener('mousedown', (e) => {
        if (e.button !== 0) return;
        e.stopPropagation();
        if (this.interactionMode === 'pan') {
          this.isPanning = true;
          this.panStart = { x: e.clientX - this.panX, y: e.clientY - this.panY };
          return;
        }
        this.selectedNodeId = node.id;
        this.selectedWireId = null;
        this.draggingNode = node;
        this.dragMoved = false;
        const coords = this.clientToWorld(e.clientX, e.clientY);
        this.dragOffset = { x: coords.x - node.x, y: coords.y - node.y };
        this.renderAll();
        this.updateInspector();
      });

      el.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.deleteNode(node.id);
      });

      this.nodesLayer.appendChild(el);
    });
  }

  // =========================================================================
  // CABLES ORTOGONALES ESQUEMÁTICOS Y PUNTOS DE UNIÓN (COMO EN LAS IMÁGENES 1, 2 Y 3)
  // =========================================================================
  renderWires() {
    this.wiresSvg.innerHTML = '';

    // Contar cuántos cables salen del mismo pin para dibujar puntos de soldadura (junctions)
    const pinUsageCount = {};
    this.wires.forEach((w) => {
      const key = `${w.fromNode}_${w.fromPin}`;
      pinUsageCount[key] = (pinUsageCount[key] || 0) + 1;
    });

    const drawnJunctions = new Set();

    this.wires.forEach((wire, idx) => {
      const fromNode = this.nodes.find((n) => n.id === wire.fromNode);
      const toNode = this.nodes.find((n) => n.id === wire.toNode);
      if (!fromNode || !toNode) return;

      const p1 = this.getPinPosition(fromNode, wire.fromPin, true);
      const p2 = this.getPinPosition(toNode, wire.toPin, false);

      const outVals = this.nodeOutputs[fromNode.id] || [];
      const isHigh = outVals[wire.fromPin] === 1;

      const { d, bendX } = this.buildOrthogonalPath(p1.x, p1.y, p2.x, p2.y, wire.toPin, idx);

      const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      path.setAttribute('d', d);
      path.setAttribute('class', `wire-path ${isHigh ? 'high' : ''}`);
      path.setAttribute('title', 'Clic o clic derecho para eliminar conexión');

      path.addEventListener('click', (e) => {
        e.stopPropagation();
        this.deleteWire(wire.id);
      });

      path.addEventListener('contextmenu', (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.deleteWire(wire.id);
      });

      this.wiresSvg.appendChild(path);

      // Si este pin alimenta múltiples destinos, colocar punto de unión (junction dot)
      const key = `${wire.fromNode}_${wire.fromPin}`;
      if (pinUsageCount[key] > 1 && !drawnJunctions.has(key)) {
        drawnJunctions.add(key);
        const jDot = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        jDot.setAttribute('cx', String(bendX));
        jDot.setAttribute('cy', String(p1.y));
        jDot.setAttribute('r', '4');
        jDot.setAttribute('class', `wire-junction ${isHigh ? 'high' : ''}`);
        this.wiresSvg.appendChild(jDot);
      }
    });

    if (this.tempWirePath) {
      this.wiresSvg.appendChild(this.tempWirePath);
    }
  }

  buildOrthogonalPath(x1, y1, x2, y2, toPin = 0) {
    if (Math.abs(y2 - y1) <= 2 && x2 >= x1) {
      return { d: `M ${x1} ${y1} L ${x2} ${y2}`, bendX: (x1 + x2) / 2 };
    }

    if (x2 >= x1 + 24) {
      // Escalonar levemente el punto de giro vertical según el pin para que cables paralelos no se superpongan
      const offset = ((toPin % 4) - 1.5) * 8;
      const midX = Math.round((x1 + x2) / 2 + offset);
      return {
        d: `M ${x1} ${y1} H ${midX} V ${y2} H ${x2}`,
        bendX: midX
      };
    }

    // Ruta cuando el destino está a la izquierda del origen
    const pad = 26;
    const midY = Math.round((y1 + y2) / 2);
    return {
      d: `M ${x1} ${y1} H ${x1 + pad} V ${midY} H ${x2 - pad} V ${y2} H ${x2}`,
      bendX: x1 + pad
    };
  }

  startOrCompleteWiring(nodeId, pinIndex, isOutput, event) {
    if (this.wiringStart) {
      this.completeWiringOnPin(nodeId, pinIndex, isOutput);
      return;
    }

    this.wiringStart = { nodeId, pinIndex, isOutput };
    this.tempWirePath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    this.tempWirePath.setAttribute('class', 'wire-temp');
    this.wiresSvg.appendChild(this.tempWirePath);

    const coords = this.clientToWorld(event.clientX, event.clientY);
    this.updateTempWire(coords.x, coords.y);
  }

  updateTempWire(mouseX, mouseY) {
    if (!this.wiringStart || !this.tempWirePath) return;
    const node = this.nodes.find((n) => n.id === this.wiringStart.nodeId);
    if (!node) return;
    const startPos = this.getPinPosition(node, this.wiringStart.pinIndex, this.wiringStart.isOutput);
    const { d } = this.wiringStart.isOutput
      ? this.buildOrthogonalPath(startPos.x, startPos.y, mouseX, mouseY)
      : this.buildOrthogonalPath(mouseX, mouseY, startPos.x, startPos.y);
    this.tempWirePath.setAttribute('d', d);
  }

  completeWiringOnPin(targetNodeId, targetPinIndex, targetIsOutput) {
    if (!this.wiringStart) return;

    const start = this.wiringStart;
    this.wiringStart = null;
    this.tempWirePath = null;

    if (start.isOutput === targetIsOutput || start.nodeId === targetNodeId) {
      this.renderWires();
      return;
    }

    this.pushUndoSnapshot();

    const fromNode = start.isOutput ? start.nodeId : targetNodeId;
    const fromPin = start.isOutput ? start.pinIndex : targetPinIndex;
    const toNode = start.isOutput ? targetNodeId : start.nodeId;
    const toPin = start.isOutput ? targetPinIndex : start.pinIndex;

    this.wires = this.wires.filter((w) => !(w.toNode === toNode && w.toPin === toPin));

    this.wires.push({
      id: `w_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      fromNode,
      fromPin,
      toNode,
      toPin
    });

    if (this.isSimulating) {
      this.evaluateCircuit();
    }
    this.renderAll();
    this.generateTruthTable();
    this.saveCurrentTabState();
  }

  deleteNode(nodeId) {
    const target = this.nodes.find((n) => n.id === nodeId);
    if (!target) return;
    this.pushUndoSnapshot();
    this.nodes = this.nodes.filter((n) => n.id !== nodeId);
    this.wires = this.wires.filter((w) => w.fromNode !== nodeId && w.toNode !== nodeId);
    if (this.selectedNodeId === nodeId) this.selectedNodeId = null;
    if (this.isSimulating) {
      this.evaluateCircuit();
    }
    this.renderAll();
    this.generateTruthTable();
    this.updateInspector();
    this.saveCurrentTabState();
    this.showToast(`Componente "${target.label}" eliminado.`, '↶ Deshacer', () => this.undoCanvasAction());
  }

  deleteWire(wireId) {
    this.pushUndoSnapshot();
    this.wires = this.wires.filter((w) => w.id !== wireId);
    if (this.isSimulating) {
      this.evaluateCircuit();
    }
    this.renderAll();
    this.generateTruthTable();
    this.saveCurrentTabState();
  }

  // =========================================================================
  // TABLA DE VERDAD VERIFICADA Y EXPRESIONES BOOLEANAS (SOP)
  // =========================================================================
  generateTruthTable(forceFullTable = false) {
    const container = document.getElementById('truthTableContainer');
    const exprBox = document.getElementById('booleanExpressionsBox');
    const hintText = document.getElementById('truthTableHintText');

    // Ordenar entradas y salidas de arriba hacia abajo según su posición en el esquema
    const inputNodes = this.nodes
      .filter((n) => n.type === 'INPUT')
      .slice()
      .sort((a, b) => a.y - b.y || a.x - b.x);

    const outputNodes = this.nodes
      .filter((n) => n.type === 'OUTPUT')
      .slice()
      .sort((a, b) => a.y - b.y || a.x - b.x);

    if (inputNodes.length === 0 || outputNodes.length === 0) {
      container.innerHTML = `<div style="padding:14px;color:var(--text-muted);font-size:0.76rem;">Añade al menos una <b>Entrada Binaria</b> y una <b>Salida LED</b> para generar la Tabla de Verdad automáticamente.</div>`;
      exprBox.innerHTML = `<div style="color:var(--text-muted);font-size:0.75rem;">Sin salidas conectadas para analizar.</div>`;
      return;
    }

    const totalVars = inputNodes.length;
    const isExhaustive = totalVars <= 6 || forceFullTable;
    const maxVarsForFull = Math.min(totalVars, 8);
    const totalPossibleRows = 1 << maxVarsForFull;

    // Construir lista de vectores de prueba asegurando que TODAS las entradas reciban valor explícito
    const testVectors = [];

    if (isExhaustive) {
      const rowsCount = 1 << Math.min(totalVars, 7);
      for (let r = 0; r < rowsCount; r++) {
        const bits = [];
        for (let i = 0; i < totalVars; i++) {
          const bit = (r >> (totalVars - 1 - i)) & 1;
          bits.push(bit);
        }
        testVectors.push({ index: r, bits });
      }
      if (hintText) {
        hintText.textContent = `Tabla exhaustiva (${testVectors.length} combinaciones) · Haz clic en una fila para probarla`;
      }
    } else {
      // Para circuitos de 7+ entradas (como Comparador 4-bits 74LS85 con 8 entradas A3..A0, B3..B0)
      // Incluir la combinación actual en vivo + 32 vectores representativos que evalúan TODAS las columnas
      const currentBits = inputNodes.map((n) => (n.state && n.state[0] ? 1 : 0));
      const seenKeys = new Set();

      const addVector = (bits) => {
        const key = bits.join('');
        if (!seenKeys.has(key)) {
          seenKeys.add(key);
          const numIndex = parseInt(key, 2) || 0;
          testVectors.push({ index: numIndex, bits });
        }
      };

      addVector(currentBits);

      // Si son 8 entradas (ej. 4 bits A y 4 bits B), probar pares (A, B) representativos donde A<B, A=B y A>B
      const samplePairs = [
        [0, 0], [0, 1], [1, 0], [1, 1],
        [2, 2], [2, 5], [5, 2], [5, 5],
        [6, 10], [10, 6], [10, 10], [7, 8],
        [8, 7], [9, 9], [12, 3], [3, 12],
        [14, 15], [15, 14], [15, 15]
      ];

      samplePairs.forEach(([valA, valB]) => {
        const bits = new Array(totalVars).fill(0);
        for (let b = 0; b < Math.min(4, totalVars); b++) {
          bits[b] = (valA >> (3 - b)) & 1;
        }
        for (let b = 0; b < Math.min(4, Math.max(0, totalVars - 4)); b++) {
          bits[4 + b] = (valB >> (3 - b)) & 1;
        }
        addVector(bits);
      });

      if (hintText) {
        hintText.innerHTML = `Mostrando ${testVectors.length} combinaciones de ${1 << totalVars} · <button id="btnExpandFullTruth" class="btn-xs-rose" style="padding:1px 6px;">Ver 128 filas</button>`;
      }
    }

    let html = `<table class="truth-table"><thead><tr>`;
    inputNodes.forEach((inp) => {
      html += `<th>${inp.label}</th>`;
    });
    outputNodes.forEach((out) => {
      html += `<th class="out-col">${out.label}</th>`;
    });
    html += `</tr></thead><tbody>`;

    const mintermsPerOutput = {};
    outputNodes.forEach((out) => {
      mintermsPerOutput[out.id] = [];
    });

    testVectors.forEach((vec) => {
      const overrideMap = {};
      inputNodes.forEach((inp, idx) => {
        overrideMap[inp.id] = vec.bits[idx];
      });

      const simResult = this.evaluateCircuit(overrideMap);
      const rowKey = vec.bits.join('');

      html += `<tr data-bits="${rowKey}" title="Haz clic para aplicar ${rowKey} en el circuito">`;
      vec.bits.forEach((b) => {
        html += `<td>${b}</td>`;
      });

      outputNodes.forEach((out) => {
        const val = simResult.inputsMap[out.id] && simResult.inputsMap[out.id][0] ? 1 : 0;
        html += `<td class="${val === 1 ? 'val-1' : ''}">${val}</td>`;
        if (val === 1) {
          mintermsPerOutput[out.id].push({ index: vec.index, bits: vec.bits });
        }
      });

      html += `</tr>`;
    });

    html += `</tbody></table>`;
    container.innerHTML = html;

    const btnExpand = document.getElementById('btnExpandFullTruth');
    if (btnExpand) {
      btnExpand.addEventListener('click', () => this.generateTruthTable(true));
    }

    // Al hacer clic en cualquier fila de la tabla de verdad, aplicar esos bits a las entradas del lienzo
    container.querySelectorAll('tr[data-bits]').forEach((tr) => {
      tr.addEventListener('click', () => {
        const bits = tr.dataset.bits.split('').map(Number);
        inputNodes.forEach((inpNode, idx) => {
          if (bits[idx] !== undefined) {
            inpNode.state = [bits[idx]];
          }
        });
        this.evaluateCircuit();
        this.renderAll();
        this.updateInspector();
        this.saveCurrentTabState();
      });
    });

    // Generar Expresiones Booleanas (SOP) con tipografía algebraica KaTeX
    exprBox.innerHTML = '';
    outputNodes.forEach((out) => {
      const mList = mintermsPerOutput[out.id];
      const item = document.createElement('div');
      item.className = 'expr-item';
      const outLatex = this.formatVarToLatex(out.label);

      if (mList.length === 0) {
        item.innerHTML = `<div class="expr-title">${this.renderLatexToHtml(`${outLatex} = 0 \\;\\text{(Nivel Bajo Constante)}`)}</div>`;
      } else if (isExhaustive && mList.length === testVectors.length) {
        item.innerHTML = `<div class="expr-title">${this.renderLatexToHtml(`${outLatex} = 1 \\;\\text{(Nivel Alto Constante)}`)}</div>`;
      } else {
        const indicesStr = mList.slice(0, 12).map((m) => m.index).join(', ');
        const sopTermsLatex = mList.slice(0, 8).map((m) =>
          m.bits
            .map((bit, idx) => {
              const varLatex = this.formatVarToLatex(inputNodes[idx].label);
              return bit === 1 ? varLatex : `\\overline{${varLatex}}`;
            })
            .join('\\,')
        );

        const mintermLatex = `${outLatex} = \\sum m(${indicesStr}${mList.length > 12 ? ', \\dots' : ''})`;
        const sopLatex = `${outLatex} = ${sopTermsLatex.join(' + ')}${mList.length > 8 ? ' + \\dots' : ''}`;

        item.innerHTML = `
          <div class="expr-title">${this.renderLatexToHtml(mintermLatex, false)}</div>
          <div class="expr-sop">${this.renderLatexToHtml(sopLatex, false)}</div>
        `;
      }

      exprBox.appendChild(item);
    });

    this.highlightActiveTruthRow();
  }

  highlightActiveTruthRow() {
    const inputNodes = this.nodes
      .filter((n) => n.type === 'INPUT')
      .slice()
      .sort((a, b) => a.y - b.y || a.x - b.x);
    if (inputNodes.length === 0) return;

    const currentKey = inputNodes.map((n) => (n.state && n.state[0] ? 1 : 0)).join('');
    const rows = document.querySelectorAll('#truthTableContainer tr[data-bits]');
    rows.forEach((tr) => {
      if (tr.dataset.bits === currentKey) {
        tr.classList.add('active-row');
      } else {
        tr.classList.remove('active-row');
      }
    });
  }

  // =========================================================================
  // PESTAÑA DE RESULTADOS DE SIMULACIÓN EN VIVO (DOCK INFERIOR)
  // =========================================================================
  renderLiveSimulationResults() {
    const box = document.getElementById('simResultsLiveBox');
    if (!box) return;

    const inputs = this.nodes.filter((n) => n.type === 'INPUT' || n.type === 'VCC' || n.type === 'GND');
    const gates = this.nodes.filter((n) => !['INPUT', 'OUTPUT', 'VCC', 'GND'].includes(n.type));
    const outputs = this.nodes.filter((n) => n.type === 'OUTPUT' || n.type === 'HEX_DISPLAY');

    const renderRows = (list, isOutNode = false) => {
      if (list.length === 0) return `<div style="font-size:0.72rem;color:var(--text-muted);">Sin elementos</div>`;
      return list
        .map((n) => {
          const vals = isOutNode ? (this.nodeInputs[n.id] || [0]) : (this.nodeOutputs[n.id] || [0]);
          const valStr = vals.join(', ');
          const isHigh = vals[0] === 1;
          return `
            <div class="sim-res-row">
              <span><b>${n.label}</b> <small style="color:var(--text-muted);">(${n.type})</small></span>
              <span style="font-weight:800;color:${isHigh ? '#059669' : '#be185d'};">${valStr}</span>
            </div>
          `;
        })
        .join('');
    };

    box.innerHTML = `
      <div class="sim-res-card">
        <h4>Entradas Activas (${inputs.length})</h4>
        ${renderRows(inputs, false)}
      </div>
      <div class="sim-res-card">
        <h4>Compuertas / Bloques (${gates.length})</h4>
        ${renderRows(gates, false)}
      </div>
      <div class="sim-res-card">
        <h4>Salidas Lógicas (${outputs.length})</h4>
        ${renderRows(outputs, true)}
      </div>
    `;
  }

  // =========================================================================
  // INSPECTOR DE PROPIEDADES (COMO EN LAS IMÁGENES DE REFERENCIA)
  // =========================================================================
  updateInspector() {
    const box = document.getElementById('inspectorContent');
    const node = this.nodes.find((n) => n.id === this.selectedNodeId);

    if (!node) {
      box.innerHTML = `<p style="font-size:0.76rem;color:var(--text-muted);line-height:1.5;">Haz clic sobre cualquier compuerta, terminal o circuito integrado en el lienzo para inspeccionar sus propiedades, rotación y estado de pines.</p>`;
      return;
    }

    const def = window.COMPONENT_DEFS[node.type] || {};
    const inVals = this.nodeInputs[node.id] || [];
    const outVals = this.nodeOutputs[node.id] || [];
    const iconSvg = window.getCatalogIconSvg(node.type);
    const currentRot = node.rotation || 0;

    box.innerHTML = `
      <div class="prop-header-card">
        <div class="item-svg-icon">${iconSvg}</div>
        <div>
          <h4 style="font-size:0.88rem;color:var(--text-dark);font-weight:800;">${def.name}</h4>
          <span style="font-size:0.7rem;color:var(--text-muted);">${def.sub || 'Componente Digital'}</span>
        </div>
      </div>

      <div class="prop-section-subtitle" style="margin-top:0;padding-top:0;border-top:none;">▾ Propiedades</div>

      <div class="prop-form-row">
        <label>Etiqueta</label>
        <input id="inspectorLabelInput" type="text" class="prop-input" value="${node.label}" />
      </div>

      <div class="prop-form-row">
        <label>Posición (X, Y)</label>
        <div class="prop-xy-grid">
          <input id="inspectorPosX" type="number" class="prop-input" value="${node.x}" />
          <input id="inspectorPosY" type="number" class="prop-input" value="${node.y}" />
        </div>
      </div>

      <div class="prop-form-row">
        <label>Rotación</label>
        <select id="inspectorRotationSelect" class="prop-input">
          <option value="0" ${currentRot === 0 ? 'selected' : ''}>0°</option>
          <option value="90" ${currentRot === 90 ? 'selected' : ''}>90°</option>
          <option value="180" ${currentRot === 180 ? 'selected' : ''}>180°</option>
          <option value="270" ${currentRot === 270 ? 'selected' : ''}>270°</option>
        </select>
      </div>

      <div class="prop-section-subtitle">▾ Información</div>
      <table class="prop-info-table">
        <tr>
          <td>Tipo</td>
          <td>${def.ic || node.type}</td>
        </tr>
        <tr>
          <td>Familia</td>
          <td>${def.family || '74LS (TTL)'}</td>
        </tr>
        <tr>
          <td>Entradas</td>
          <td>${def.inputs.length ? `${def.inputs.length} (${def.inputs.map((p, i) => `${p}=${inVals[i] || 0}`).join(', ')})` : '0'}</td>
        </tr>
        <tr>
          <td>Salida</td>
          <td>${def.outputs.length ? `${def.outputs.length} (${def.outputs.map((p, i) => `${p}=${outVals[i] || 0}`).join(', ')})` : '0'}</td>
        </tr>
        <tr>
          <td>Descripción</td>
          <td>${def.desc || def.formula || def.sub || 'Bloque lógico digital'}</td>
        </tr>
      </table>

      <div style="margin-top:14px;display:flex;gap:8px;">
        <button id="btnInspectorPinout" class="btn btn-outline-soft" style="flex:1;justify-content:center;font-size:0.74rem;padding:7px;">🔲 Encapsulado DIP</button>
        <button id="btnInspectorDelete" class="btn btn-outline-soft" style="color:var(--danger);border-color:#fecdd3;font-size:0.74rem;padding:7px;" title="Eliminar componente">🗑️</button>
      </div>
    `;

    document.getElementById('inspectorLabelInput').addEventListener('input', (e) => {
      node.label = e.target.value || def.name;
      this.renderNodes();
      this.generateTruthTable();
      this.saveCurrentTabState();
    });

    document.getElementById('inspectorPosX').addEventListener('change', (e) => {
      node.x = Number(e.target.value) || 0;
      this.renderAll();
      this.saveCurrentTabState();
    });

    document.getElementById('inspectorPosY').addEventListener('change', (e) => {
      node.y = Number(e.target.value) || 0;
      this.renderAll();
      this.saveCurrentTabState();
    });

    document.getElementById('inspectorRotationSelect').addEventListener('change', (e) => {
      node.rotation = Number(e.target.value) || 0;
      this.renderAll();
      this.saveCurrentTabState();
    });

    document.getElementById('btnInspectorPinout').addEventListener('click', () => {
      document.getElementById('modalPinout').classList.remove('hidden');
    });

    document.getElementById('btnInspectorDelete').addEventListener('click', () => {
      this.deleteNode(node.id);
    });
  }

  // =========================================================================
  // SINTETIZADOR AUTOMÁTICO Y MODAL DE PINES
  // =========================================================================
  initSynthesisModal() {
    const grid = document.getElementById('synthMintermGrid');
    const defaultActive = [1, 2, 4, 7];

    grid.innerHTML = '';
    for (let m = 0; m < 8; m++) {
      const bin = m.toString(2).padStart(3, '0');
      const isChecked = defaultActive.includes(m);
      const div = document.createElement('div');
      div.className = `minterm-box ${isChecked ? 'checked' : ''}`;
      div.dataset.minterm = m;
      div.innerHTML = `
        <strong style="color:var(--rose-primary);">m${m}</strong>
        <span style="font-size:0.72rem;color:var(--text-muted);">ABC = ${bin}</span>
        <span class="m-val" style="font-size:0.82rem;font-weight:800;color:${isChecked ? '#059669' : '#64748b'};">F = ${isChecked ? '1' : '0'}</span>
      `;
      div.addEventListener('click', () => {
        div.classList.toggle('checked');
        const active = div.classList.contains('checked');
        div.querySelector('.m-val').textContent = `F = ${active ? '1' : '0'}`;
        div.querySelector('.m-val').style.color = active ? '#059669' : '#64748b';
      });
      grid.appendChild(div);
    }

    document.getElementById('btnBuildSynthesized').addEventListener('click', () => {
      const selectedMinterms = Array.from(grid.querySelectorAll('.minterm-box.checked')).map((el) =>
        Number(el.dataset.minterm)
      );
      const method = document.querySelector('input[name="synthMethod"]:checked').value;
      this.buildSynthesizedCircuit(selectedMinterms, method);
      document.getElementById('modalSynthesis').classList.add('hidden');
    });
  }

  buildSynthesizedCircuit(minterms, method) {
    const mStr = minterms.join(', ');
    const nodes = [];
    const wires = [];

    if (method === 'MUX') {
      nodes.push(
        { id: 'vcc', type: 'VCC', label: '+Vcc', x: 120, y: 60 },
        { id: 'gnd', type: 'GND', label: 'GND', x: 120, y: 125 },
        { id: 'inA', type: 'INPUT', label: 'A', x: 120, y: 225, state: [0] },
        { id: 'inB', type: 'INPUT', label: 'B', x: 120, y: 265, state: [0] },
        { id: 'inC', type: 'INPUT', label: 'C', x: 120, y: 305, state: [0] },
        { id: 'mux8', type: 'MUX_8_1', label: 'U1', x: 370, y: 65 },
        { id: 'outF', type: 'OUTPUT', label: 'F', x: 590, y: 155 }
      );

      for (let m = 0; m < 8; m++) {
        const isOne = minterms.includes(m);
        wires.push({
          id: `wm_${m}`,
          fromNode: isOne ? 'vcc' : 'gnd',
          fromPin: 0,
          toNode: 'mux8',
          toPin: m
        });
      }

      wires.push(
        { id: 'ws2', fromNode: 'inA', fromPin: 0, toNode: 'mux8', toPin: 8 },
        { id: 'ws1', fromNode: 'inB', fromPin: 0, toNode: 'mux8', toPin: 9 },
        { id: 'ws0', fromNode: 'inC', fromPin: 0, toNode: 'mux8', toPin: 10 },
        { id: 'wout', fromNode: 'mux8', fromPin: 0, toNode: 'outF', toPin: 0 }
      );
    } else {
      nodes.push(
        { id: 'inX', type: 'INPUT', label: 'X', x: 120, y: 100, state: [0] },
        { id: 'inY', type: 'INPUT', label: 'Y', x: 120, y: 165, state: [0] },
        { id: 'inZ', type: 'INPUT', label: 'Z', x: 120, y: 230, state: [0] },
        { id: 'deco', type: 'DECO_3_8', label: 'U1', x: 320, y: 80 },
        { id: 'orSop', type: 'OR5', label: 'U2', x: 545, y: 140 },
        { id: 'outF', type: 'OUTPUT', label: 'F', x: 710, y: 174 }
      );

      wires.push(
        { id: 'wx', fromNode: 'inX', fromPin: 0, toNode: 'deco', toPin: 0 },
        { id: 'wy', fromNode: 'inY', fromPin: 0, toNode: 'deco', toPin: 1 },
        { id: 'wz', fromNode: 'inZ', fromPin: 0, toNode: 'deco', toPin: 2 },
        { id: 'wf', fromNode: 'orSop', fromPin: 0, toNode: 'outF', toPin: 0 }
      );

      minterms.slice(0, 5).forEach((m, idx) => {
        wires.push({
          id: `wd_${m}`,
          fromNode: 'deco',
          fromPin: m,
          toNode: 'orSop',
          toPin: idx
        });
      });
    }

    this.openCircuitInNewTab(
      {
        title: `Síntesis Σm(${mStr})`,
        moduleTag: method === 'MUX' ? 'Síntesis MUX 8:1' : 'Síntesis SOP 3:8',
        description: `Circuito sintetizado automáticamente para F = Σm(${mStr}).`,
        formulas: [`F = Σm(${mStr})`],
        nodes,
        wires
      },
      true
    );
    this.showToast(`⚡ Circuito Σm(${mStr}) creado en una nueva pestaña.`);
  }

  initPinoutModal() {
    const buttons = document.querySelectorAll('.chip-select-btn');
    buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        buttons.forEach((b) => b.classList.remove('active'));
        btn.classList.add('active');
        this.renderChipPinout(btn.dataset.chip);
      });
    });
    this.renderChipPinout('74LS00');
  }

  renderChipPinout(chipCode) {
    const data = window.IC_PINOUT_DATA[chipCode];
    if (!data) return;

    const container = document.getElementById('chipDiagramContainer');
    const rows = data.pins / 2;
    const svgHeight = rows * 36 + 50;

    let pinsSvg = '';
    for (let i = 0; i < rows; i++) {
      const y = 35 + i * 34;
      const leftLabel = data.left[i];
      const rightLabel = data.right[i];

      pinsSvg += `
        <rect x="170" y="${y}" width="20" height="14" fill="#fbcfe8" rx="2"/>
        <text x="160" y="${y + 11}" text-anchor="end" fill="#fce7f3" font-family="JetBrains Mono" font-size="12">${leftLabel}</text>
      `;

      pinsSvg += `
        <rect x="370" y="${y}" width="20" height="14" fill="#fbcfe8" rx="2"/>
        <text x="400" y="${y + 11}" text-anchor="start" fill="#f472b6" font-family="JetBrains Mono" font-size="12">${rightLabel}</text>
      `;
    }

    container.innerHTML = `
      <div style="text-align:center;">
        <span class="module-pill">${data.package}</span>
        <h4 style="margin-top:6px;font-size:1rem;color:#fff;">${data.title}</h4>
      </div>
      <svg width="560" height="${svgHeight}" viewBox="0 0 560 ${svgHeight}">
        <rect x="190" y="16" width="180" height="${svgHeight - 32}" rx="8" fill="#4c0519" stroke="#f472b6" stroke-width="2.5"/>
        <path d="M 262 16 A 18 18 0 0 0 298 16" fill="#2e091e" stroke="#f472b6" stroke-width="2"/>
        <circle cx="212" cy="36" r="5" fill="#db2777"/>
        <text x="280" y="${svgHeight / 2}" text-anchor="middle" fill="#f472b6" font-family="JetBrains Mono" font-weight="800" font-size="18">${chipCode}</text>
        <text x="280" y="${svgHeight / 2 + 20}" text-anchor="middle" fill="#fbcfe8" font-family="JetBrains Mono" font-size="11">TTL 74LS SERIES</text>
        ${pinsSvg}
      </svg>
    `;
  }

  // =========================================================================
  // EVENTOS DEL LIENZO Y BARRAS DE HERRAMIENTAS AUDITADAS
  // =========================================================================
  clientToWorld(clientX, clientY) {
    const rect = this.viewport.getBoundingClientRect();
    return {
      x: (clientX - rect.left - this.panX) / this.zoom,
      y: (clientY - rect.top - this.panY) / this.zoom
    };
  }

  updateWorldTransform() {
    this.world.style.transform = `translate(${this.panX}px, ${this.panY}px) scale(${this.zoom})`;
    document.getElementById('zoomLabel').textContent = `${Math.round(this.zoom * 100)}%`;
  }

  resetView() {
    this.zoom = 1;
    this.panX = 0;
    this.panY = 0;
    this.updateWorldTransform();
    this.saveCurrentTabState();
  }

  setInteractionMode(mode) {
    this.interactionMode = mode;
    document.getElementById('subtoolSelectMode')?.classList.toggle('active', mode === 'select');
    document.getElementById('subtoolPanMode')?.classList.toggle('active', mode === 'pan');
    this.viewport.classList.toggle('pan-mode', mode === 'pan');
  }

  bindEvents() {
    document.getElementById('searchComponent').addEventListener('input', (e) => {
      this.renderCatalog(e.target.value);
    });

    document.getElementById('presetSelect').addEventListener('change', (e) => {
      if (e.target.value) {
        this.loadPreset(e.target.value);
      }
    });

    // Renombrar la pestaña activa en tiempo real
    document.getElementById('activeCircuitTitleInput').addEventListener('input', (e) => {
      const val = e.target.value.trim() || 'Circuito';
      const tab = this.tabs.find((t) => t.tabId === this.activeTabId);
      if (tab) {
        tab.title = val;
        this.renderTabsBar();
        document.getElementById('truthTableTitle').textContent = `Tabla de Verdad (${val})`;
        this.persistWorkspaceTabsToSession();
      }
    });

    // Pestañas del panel izquierdo
    document.querySelectorAll('.side-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.side-tab').forEach((b) => b.classList.remove('active'));
        document.querySelectorAll('.left-tab-body').forEach((body) => body.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(btn.dataset.lefttab).classList.add('active');
      });
    });

    // Pestañas del Dock Inferior
    document.querySelectorAll('.dock-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.dock-tab').forEach((b) => b.classList.remove('active'));
        document.querySelectorAll('.dock-content').forEach((c) => c.classList.remove('active'));
        btn.classList.add('active');
        const targetDock = document.getElementById(btn.dataset.docktab);
        targetDock.classList.add('active');
        document.getElementById('bottomDock').classList.remove('collapsed');
        this.renderMathInElementSafe(targetDock);
      });
    });

    document.getElementById('btnToggleDockSize').addEventListener('click', () => {
      document.getElementById('bottomDock').classList.toggle('collapsed');
    });

    // Sub-barra flotante sobre el lienzo (Todos los botones auditados)
    document.getElementById('subtoolSelectMode').addEventListener('click', () => this.setInteractionMode('select'));
    document.getElementById('subtoolPanMode').addEventListener('click', () => this.setInteractionMode('pan'));
    document.getElementById('subtoolAddInput').addEventListener('click', () => this.addNodeOfType('INPUT'));
    document.getElementById('subtoolAddOutput').addEventListener('click', () => this.addNodeOfType('OUTPUT'));
    document.getElementById('subtoolRotateNode').addEventListener('click', () => this.rotateSelectedNode());
    document.getElementById('subtoolDuplicateNode').addEventListener('click', () => this.duplicateSelectedNode());
    document.getElementById('subtoolDeleteNode').addEventListener('click', () => {
      if (this.selectedNodeId) {
        this.deleteNode(this.selectedNodeId);
      } else {
        this.showToast('Selecciona un componente para eliminarlo.');
      }
    });

    // Botones de crear nueva pestaña (+ y Nuevo)
    document.getElementById('btnQuickNewTab').addEventListener('click', () => this.createNewBlankTab());
    document.getElementById('btnNewTabToolbar').addEventListener('click', () => this.createNewBlankTab());

    // Botón "+ Nuevo" dentro de la pestaña "Mis Lienzos" (Crea un nuevo cuadro en la lista de abajo)
    document.getElementById('btnNewBlankFromList').addEventListener('click', () => {
      this.createNewCanvasInMyList();
    });

    // Botones Deshacer / Rehacer de la barra superior
    document.getElementById('btnUndoToolbar').addEventListener('click', () => this.undoCanvasAction());
    document.getElementById('btnRedoToolbar').addEventListener('click', () => this.redoCanvasAction());

    // Botones responsive móviles
    const leftSidebar = document.getElementById('leftSidebar');
    const rightSidebar = document.getElementById('rightSidebar');

    document.getElementById('btnToggleLeftSidebar').addEventListener('click', () => {
      leftSidebar.classList.toggle('open');
      rightSidebar.classList.remove('open');
    });

    document.getElementById('btnToggleRightSidebar').addEventListener('click', () => {
      rightSidebar.classList.toggle('open');
      leftSidebar.classList.remove('open');
    });

    // Movimiento en el lienzo
    window.addEventListener('mousemove', (e) => {
      if (this.draggingNode) {
        this.dragMoved = true;
        const coords = this.clientToWorld(e.clientX, e.clientY);
        this.draggingNode.x = Math.max(10, Math.round((coords.x - this.dragOffset.x) / 6) * 6);
        this.draggingNode.y = Math.max(10, Math.round((coords.y - this.dragOffset.y) / 6) * 6);
        this.renderAll();
        const posXInput = document.getElementById('inspectorPosX');
        const posYInput = document.getElementById('inspectorPosY');
        if (posXInput && posYInput && this.selectedNodeId === this.draggingNode.id) {
          posXInput.value = this.draggingNode.x;
          posYInput.value = this.draggingNode.y;
        }
      } else if (this.wiringStart) {
        const coords = this.clientToWorld(e.clientX, e.clientY);
        this.updateTempWire(coords.x, coords.y);
      } else if (this.isPanning) {
        this.panX = e.clientX - this.panStart.x;
        this.panY = e.clientY - this.panStart.y;
        this.updateWorldTransform();
      }
    });

    window.addEventListener('mouseup', () => {
      if (this.draggingNode && this.dragMoved) {
        this.generateTruthTable();
        this.saveCurrentTabState();
      }
      this.draggingNode = null;
      this.isPanning = false;
      if (this.wiringStart) {
        this.wiringStart = null;
        this.tempWirePath = null;
        this.renderWires();
      }
    });

    this.viewport.addEventListener('mousedown', (e) => {
      if (e.target === this.viewport || e.target === this.world || e.target === this.wiresSvg) {
        this.isPanning = true;
        this.panStart = { x: e.clientX - this.panX, y: e.clientY - this.panY };
        this.selectedNodeId = null;
        this.renderNodes();
        this.updateInspector();
      }
    });

    this.viewport.addEventListener(
      'wheel',
      (e) => {
        e.preventDefault();
        const delta = e.deltaY < 0 ? 0.1 : -0.1;
        this.zoom = Math.min(1.8, Math.max(0.45, Number((this.zoom + delta).toFixed(2))));
        this.updateWorldTransform();
      },
      { passive: false }
    );

    document.getElementById('btnZoomIn').addEventListener('click', () => {
      this.zoom = Math.min(1.8, Number((this.zoom + 0.15).toFixed(2)));
      this.updateWorldTransform();
    });
    document.getElementById('btnZoomOut').addEventListener('click', () => {
      this.zoom = Math.max(0.45, Number((this.zoom - 0.15).toFixed(2)));
      this.updateWorldTransform();
    });
    document.getElementById('btnResetView').addEventListener('click', () => this.resetView());

    // Atajos de teclado (Supr, Ctrl+Z, Ctrl+Y, Ctrl+D, R)
    window.addEventListener('keydown', (e) => {
      if (document.activeElement && ['INPUT', 'TEXTAREA', 'SELECT'].includes(document.activeElement.tagName)) {
        return;
      }
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'z') {
        e.preventDefault();
        this.undoCanvasAction();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'y') {
        e.preventDefault();
        this.redoCanvasAction();
      } else if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'd') {
        e.preventDefault();
        this.duplicateSelectedNode();
      } else if (e.key.toLowerCase() === 'r' && this.selectedNodeId) {
        e.preventDefault();
        this.rotateSelectedNode();
      } else if ((e.key === 'Delete' || e.key === 'Backspace') && this.selectedNodeId) {
        e.preventDefault();
        this.deleteNode(this.selectedNodeId);
      }
    });

    document.getElementById('btnRefreshTruth').addEventListener('click', () => {
      this.generateTruthTable();
      this.showToast('Tabla de verdad actualizada.');
    });

    // Modales
    document.getElementById('btnSynthesis').addEventListener('click', () => {
      document.getElementById('modalSynthesis').classList.remove('hidden');
    });

    document.getElementById('btnICPinout').addEventListener('click', () => {
      document.getElementById('modalPinout').classList.remove('hidden');
    });

    document.getElementById('btnMyCanvases').addEventListener('click', async () => {
      await this.fetchUserCircuits();
      document.getElementById('modalMyCanvases').classList.remove('hidden');
    });

    document.querySelectorAll('[data-close]').forEach((btn) => {
      btn.addEventListener('click', () => {
        document.getElementById(btn.dataset.close).classList.add('hidden');
      });
    });

    document.getElementById('btnClearCanvas').addEventListener('click', () => {
      this.clearCurrentCanvasWithUndo();
    });

    document.getElementById('btnSaveCloud').addEventListener('click', () => {
      this.saveCurrentCanvasToCloud();
    });

    document.getElementById('btnExportJson').addEventListener('click', () => {
      this.downloadCircuitJson();
    });

    const fileInput = document.getElementById('fileImportInput');
    document.getElementById('btnImportCircuit').addEventListener('click', () => fileInput.click());
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          if (Array.isArray(data.nodes) && Array.isArray(data.wires)) {
            this.openCircuitInNewTab(data, true);
            this.showToast('Archivo JSON importado en una nueva pestaña.');
          }
        } catch {
          this.showToast('El archivo JSON no tiene un formato válido.');
        }
      };
      reader.readAsText(file);
    });
  }
}

window.addEventListener('DOMContentLoaded', () => {
  window.simulatorApp = new DigitalSimulator();
});
