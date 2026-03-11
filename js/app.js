// ============================================
// APP.JS - Lógica principal y navegación
// Academia para la Prueba de Idoneidad Docente
// Versión: 2.0 - CORREGIDA Y COMPLETA
// ============================================

// Variable global de progreso
let currentUser = {
    nombre: 'Docente invitado',
    progreso: {
        modulosCompletados: [],
        simulaciones: []
    }
};

// Inicialización
document.addEventListener('DOMContentLoaded', function() {
    console.log('✅ Plataforma Academia MEP iniciada');
    cargarProgresoGuardado();
});

// ============================================
// FUNCIONES DE NAVEGACIÓN PRINCIPALES
// ============================================

// Cargar página de inicio
function cargarInicio() {
    const content = document.getElementById('dynamic-content');
    if (!content) return;
    
    actualizarNavActiva('inicio');
    
    const progreso = JSON.parse(localStorage.getItem('progresoMEP')) || {
        modulosCompletados: [],
        simulaciones: []
    };
    
    const modulosCompletados = progreso.modulosCompletados.length;
    const totalSimulaciones = progreso.simulaciones.length;
    
    let promedio = 0;
    if (progreso.simulaciones.length > 0) {
        const suma = progreso.simulaciones.reduce((acc, sim) => acc + sim.porcentaje, 0);
        promedio = Math.round(suma / progreso.simulaciones.length);
    }
    
    content.innerHTML = `
        <section class="hero-section">
            <h1>Academia para la Prueba de Idoneidad Docente</h1>
            <p>Plataforma abierta y gratuita para docentes, directores y asesores de Costa Rica que desean fortalecer su preparación profesional.</p>
            <div class="hero-buttons">
                <button onclick="window.cargarModulos()" class="btn btn-primary">
                    <i class="fas fa-book-open"></i> Explorar módulos
                </button>
                <button onclick="window.cargarSimulador()" class="btn btn-outline">
                    <i class="fas fa-pencil-alt"></i> Iniciar simulador
                </button>
            </div>
        </section>

        <section>
            <h2 style="margin-bottom: 1.5rem;">Módulos de estudio</h2>
            <div class="modulos-grid" id="modulos-destacados">
                ${generarTarjetasModulos(modulosCompletados)}
            </div>
        </section>

        <section style="margin-top: 3rem;">
            <h2 style="margin-bottom: 1.5rem;">Tu progreso</h2>
            <div class="progreso-stats">
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-check-circle"></i></div>
                    <div class="stat-info">
                        <h4>Módulos completados</h4>
                        <div class="stat-number">${modulosCompletados}/8</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-clock"></i></div>
                    <div class="stat-info">
                        <h4>Simulaciones</h4>
                        <div class="stat-number">${totalSimulaciones}</div>
                    </div>
                </div>
                <div class="stat-card">
                    <div class="stat-icon"><i class="fas fa-star"></i></div>
                    <div class="stat-info">
                        <h4>Promedio</h4>
                        <div class="stat-number">${promedio}%</div>
                    </div>
                </div>
            </div>
        </section>
    `;
}

// Generar tarjetas de módulos
function generarTarjetasModulos(completados) {
    const modulos = [
        { id: 'politica', icono: 'fa-gavel', titulo: 'Política educativa', desc: 'Marco normativo del sistema educativo costarricense', progreso: 30 },
        { id: 'evaluacion', icono: 'fa-chart-line', titulo: 'Evaluación educativa', desc: 'Evaluación formativa, sumativa y retroalimentación', progreso: 15 },
        { id: 'tecnologia', icono: 'fa-laptop', titulo: 'Tecnología educativa', desc: 'Integración pedagógica de tecnologías digitales', progreso: 5 },
        { id: 'curriculo', icono: 'fa-book', titulo: 'Currículo', desc: 'Diseño y desarrollo curricular', progreso: 0 },
        { id: 'inclusion', icono: 'fa-heart', titulo: 'Educación inclusiva', desc: 'Atención a la diversidad', progreso: 0 },
        { id: 'liderazgo', icono: 'fa-users', titulo: 'Liderazgo pedagógico', desc: 'Gestión y dirección educativa', progreso: 0 }
    ];
    
    return modulos.map(mod => `
        <div class="modulo-card">
            <div class="card-icon"><i class="fas ${mod.icono}"></i></div>
            <h3>${mod.titulo}</h3>
            <p>${mod.desc}</p>
            <div class="progress-bar">
                <div class="progress-fill" style="width: ${completados.includes(mod.id) ? 100 : mod.progreso}%;"></div>
            </div>
            <small>${completados.includes(mod.id) ? 'Completado' : mod.progreso + '% completado'}</small>
            <button onclick="window.cargarModuloDetalle('${mod.id}')" class="btn-modulo">
                Continuar <i class="fas fa-arrow-right"></i>
            </button>
        </div>
    `).join('');
}

// Cargar lista de módulos
function cargarModulos() {
    const content = document.getElementById('dynamic-content');
    if (!content) return;
    
    actualizarNavActiva('modulos');
    
    const progreso = JSON.parse(localStorage.getItem('progresoMEP')) || { modulosCompletados: [] };
    
    content.innerHTML = `
        <h1 style="margin-bottom: 1.5rem;">📚 Todos los módulos de estudio</h1>
        <p style="color: #6B7280; margin-bottom: 2rem;">Explora cada tema y da seguimiento a tu progreso</p>
        <div class="modulos-grid">
            ${generarTarjetasModulos(progreso.modulosCompletados)}
        </div>
    `;
}

// Cargar detalle de un módulo específico
function cargarModuloDetalle(moduloId) {
    const modulos = {
        politica: {
            titulo: 'Política Educativa Costarricense',
            desc: 'Marco normativo, lineamientos del MEP y fundamentos legales',
            video: 'dQw4w9WgXcQ',
            lecturas: [1, 2, 3]
        },
        evaluacion: {
            titulo: 'Evaluación Educativa',
            desc: 'Evaluación formativa, sumativa y retroalimentación pedagógica',
            video: 'dQw4w9WgXcQ',
            lecturas: [3, 4, 9]
        },
        tecnologia: {
            titulo: 'Tecnología Educativa',
            desc: 'Integración de TIC en procesos de enseñanza-aprendizaje',
            video: 'dQw4w9WgXcQ',
            lecturas: [5, 8]
        }
    };
    
    const modulo = modulos[moduloId] || modulos.politica;
    
    const content = document.getElementById('dynamic-content');
    if (!content) return;
    
    content.innerHTML = `
        <div style="background: linear-gradient(135deg, #1E3A8A 0%, #2563EB 100%); color: white; padding: 2rem; border-radius: 16px; margin-bottom: 2rem;">
            <h1 style="color: white;">📘 ${modulo.titulo}</h1>
            <p style="opacity: 0.9;">${modulo.desc}</p>
        </div>
        
        <div style="margin-bottom: 2rem;">
            <h2>🎥 Video explicativo</h2>
            <div style="position: relative; padding-bottom: 56.25%; height: 0; overflow: hidden; border-radius: 12px; margin: 1.5rem 0;">
                <iframe src="https://www.youtube.com/embed/${modulo.video}" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%;" frameborder="0" allowfullscreen></iframe>
            </div>
        </div>
        
        <div style="background: white; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;">
            <h2>📖 Lecturas recomendadas</h2>
            <div id="lecturas-modulo"></div>
        </div>
        
        <div style="background: white; border-radius: 12px; padding: 1.5rem; margin: 1.5rem 0;">
            <h2>✏️ Preguntas de práctica</h2>
            <div id="preguntas-modulo"></div>
        </div>
        
        <button onclick="window.moduloCompletado('${moduloId}')" class="btn-primary" style="margin-top: 2rem;">
            <i class="fas fa-check-circle"></i> Marcar módulo como completado
        </button>
    `;
    
    // Cargar lecturas del módulo
    setTimeout(() => {
        if (window.cargarLecturasModulo) {
            window.cargarLecturasModulo(modulo.lecturas);
        }
        if (window.cargarPreguntasModulo) {
            window.cargarPreguntasModulo(moduloId);
        }
    }, 100);
}

// Cargar simulador (muestra modal de instrucciones)
function cargarSimulador() {
    const modal = document.getElementById('simuladorModal');
    if (modal) {
        modal.style.display = 'block';
    }
}

// Iniciar simulador después de instrucciones
function iniciarSimulador() {
    cerrarSimuladorModal();
    
    const content = document.getElementById('dynamic-content');
    if (!content) return;
    
    actualizarNavActiva('simulador');
    
    content.innerHTML = `
        <div class="simulador-container" style="display: flex; gap: 2rem;">
            <div class="simulador-main" style="flex: 2;">
                <div class="pregunta-container" id="pregunta-container">
                    <div style="text-align: center; padding: 3rem;">
                        <i class="fas fa-spinner fa-spin" style="font-size: 3rem; color: #2563EB;"></i>
                        <p>Cargando simulador...</p>
                    </div>
                </div>
                
                <div style="display: flex; gap: 1rem; margin-top: 1rem;">
                    <button onclick="window.anteriorPregunta()" class="btn-nav prev" style="flex:1; padding:1rem; background:#F3F4F6; border:none; border-radius:8px;">
                        <i class="fas fa-arrow-left"></i> Anterior
                    </button>
                    <button onclick="window.siguientePregunta()" class="btn-nav next" style="flex:1; padding:1rem; background:#2563EB; color:white; border:none; border-radius:8px;">
                        Siguiente <i class="fas fa-arrow-right"></i>
                    </button>
                </div>
                
                <button onclick="window.finalizarSimulador()" style="width:100%; margin-top:1rem; padding:1rem; background:#DC2626; color:white; border:none; border-radius:8px;">
                    <i class="fas fa-flag-checkered"></i> Finalizar examen
                </button>
            </div>
            
            <div class="simulador-sidebar" style="flex:1; background:white; border-radius:16px; padding:1.5rem;">
                <div style="background:linear-gradient(135deg,#1E3A8A,#2563EB); color:white; padding:1.5rem; border-radius:12px; text-align:center;">
                    <i class="fas fa-clock"></i>
                    <h3>Tiempo restante</h3>
                    <div style="font-size:2.5rem; font-family:monospace;" id="timer-display">04:00:00</div>
                </div>
                
                <h3 style="margin:1.5rem 0 1rem;">Navegación rápida</h3>
                <div style="display:grid; grid-template-columns:repeat(5,1fr); gap:0.5rem;" id="panel-navegacion"></div>
                
                <div style="margin-top:1.5rem; font-size:0.9rem;">
                    <p><span style="display:inline-block; width:12px; height:12px; background:#10B981; border-radius:4px; margin-right:0.5rem;"></span> Respondida</p>
                    <p><span style="display:inline-block; width:12px; height:12px; background:#FEF3C7; border:1px solid #D97706; border-radius:4px; margin-right:0.5rem;"></span> Marcada</p>
                </div>
            </div>
        </div>
    `;
    
    // Inicializar simulador
    setTimeout(() => {
        if (window.inicializarSimulador) {
            window.inicializarSimulador();
        }
    }, 100);
}

// Cerrar modal del simulador
function cerrarSimuladorModal() {
    const modal = document.getElementById('simuladorModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Actualizar clase activa en navegación
function actualizarNavActiva(seccion) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    const navMap = {
        'inicio': 'nav-inicio',
        'modulos': 'nav-modulos',
        'biblioteca': 'nav-biblioteca',
        'simulador': 'nav-simulador',
        'progreso': 'nav-progreso'
    };
    
    const elementoId = navMap[seccion];
    if (elementoId) {
        const elemento = document.getElementById(elementoId);
        if (elemento) elemento.classList.add('active');
    }
}

// ============================================
// GESTIÓN DE PROGRESO (localStorage)
// ============================================

function cargarProgresoGuardado() {
    const guardado = localStorage.getItem('progresoMEP');
    
    if (guardado) {
        try {
            currentUser.progreso = JSON.parse(guardado);
            console.log('📊 Progreso cargado:', currentUser.progreso);
        } catch(e) {
            console.error('Error al cargar progreso');
            inicializarProgreso();
        }
    } else {
        inicializarProgreso();
    }
}

function inicializarProgreso() {
    const progresoInicial = {
        modulosCompletados: [],
        simulaciones: []
    };
    localStorage.setItem('progresoMEP', JSON.stringify(progresoInicial));
    currentUser.progreso = progresoInicial;
}

function guardarProgreso() {
    localStorage.setItem('progresoMEP', JSON.stringify(currentUser.progreso));
}

function registrarSimulacion(resultado) {
    const simulacion = {
        fecha: new Date().toISOString(),
        aciertos: resultado.aciertos,
        total: resultado.total,
        porcentaje: resultado.porcentaje,
        temas: resultado.temas || []
    };
    
    currentUser.progreso.simulaciones.push(simulacion);
    guardarProgreso();
}

function moduloCompletado(moduloId) {
    if (!currentUser.progreso.modulosCompletados.includes(moduloId)) {
        currentUser.progreso.modulosCompletados.push(moduloId);
        guardarProgreso();
        alert('✅ ¡Módulo completado! Sigue así.');
    } else {
        alert('Este módulo ya estaba completado.');
    }
}

// ============================================
// EXPORTAR FUNCIONES GLOBALES
// ============================================
window.cargarInicio = cargarInicio;
window.cargarModulos = cargarModulos;
window.cargarModuloDetalle = cargarModuloDetalle;
window.cargarSimulador = cargarSimulador;
window.iniciarSimulador = iniciarSimulador;
window.cerrarSimuladorModal = cerrarSimuladorModal;
window.registrarSimulacion = registrarSimulacion;
window.moduloCompletado = moduloCompletado;
