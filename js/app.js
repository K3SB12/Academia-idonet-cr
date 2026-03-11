// ============================================
// APP.JS - Núcleo de la plataforma
// Academia para la Prueba de Idoneidad Docente
// Costa Rica - Ministerio de Educación Pública
// ============================================

// Variables globales
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
    
    // Configurar menú móvil
    const mobileBtn = document.getElementById('mobileMenuBtn');
    const sidebar = document.getElementById('sidebar');
    
    if (mobileBtn) {
        mobileBtn.addEventListener('click', function() {
            sidebar.classList.toggle('mobile-open');
        });
    }
    
    // Cerrar sidebar al hacer clic fuera (móvil)
    document.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            if (!sidebar.contains(e.target) && !mobileBtn.contains(e.target)) {
                sidebar.classList.remove('mobile-open');
            }
        }
    });
    
    // Cargar progreso guardado
    cargarProgresoGuardado();
});

// ============================================
// FUNCIONES DE NAVEGACIÓN
// ============================================

function cargarInicio() {
    const content = document.getElementById('dynamic-content');
    
    content.innerHTML = `
        <!-- Hero Section -->
        <section class="hero-section">
            <h1>Academia para la Prueba de Idoneidad Docente</h1>
            <p>Plataforma abierta y gratuita para docentes, directores y asesores de Costa Rica que desean fortalecer su preparación profesional.</p>
            <div class="hero-buttons">
                <a href="#" onclick="cargarModulos(); return false;" class="btn btn-primary">
                    <i class="fas fa-book-open"></i> Explorar módulos
                </a>
                <a href="simulador/simulador.html" class="btn btn-outline">
                    <i class="fas fa-pencil-alt"></i> Iniciar simulador
                </a>
            </div>
        </section>

        <!-- Módulos Destacados -->
        <section>
            <h2 style="margin-bottom: 1.5rem;">Módulos de estudio</h2>
            <div class="modulos-grid" id="modulos-destacados">
                <!-- Se carga dinámicamente -->
            </div>
        </section>

        <!-- Estadísticas Rápidas -->
        <section style="margin-top: 3rem;">
            <h2 style="margin-bottom: 1.5rem;">Tu progreso</h2>
            <div class="progreso-stats" id="stats-rapidas">
                <!-- Se carga dinámicamente -->
            </div>
        </section>
    `;
    
    // Cargar módulos destacados
    const modulosDestacados = document.getElementById('modulos-destacados');
    modulosDestacados.innerHTML = `
        <div class="modulo-card">
            <div class="card-icon"><i class="fas fa-gavel"></i></div>
            <h3>Política educativa</h3>
            <p>Marco normativo del sistema educativo costarricense</p>
            <div class="progress-bar"><div class="progress-fill" style="width: 30%;"></div></div>
            <small>30% completado</small>
            <a href="modulos/politica.html" class="btn-modulo">Continuar <i class="fas fa-arrow-right"></i></a>
        </div>
        <div class="modulo-card">
            <div class="card-icon"><i class="fas fa-chart-line"></i></div>
            <h3>Evaluación educativa</h3>
            <p>Evaluación formativa, sumativa y retroalimentación</p>
            <div class="progress-bar"><div class="progress-fill" style="width: 15%;"></div></div>
            <small>15% completado</small>
            <a href="modulos/evaluacion.html" class="btn-modulo">Continuar <i class="fas fa-arrow-right"></i></a>
        </div>
        <div class="modulo-card">
            <div class="card-icon"><i class="fas fa-laptop"></i></div>
            <h3>Tecnología educativa</h3>
            <p>Integración pedagógica de tecnologías digitales</p>
            <div class="progress-bar"><div class="progress-fill" style="width: 5%;"></div></div>
            <small>5% completado</small>
            <a href="modulos/tecnologia.html" class="btn-modulo">Continuar <i class="fas fa-arrow-right"></i></a>
        </div>
    `;
    
    // Cargar estadísticas
    const statsRapidas = document.getElementById('stats-rapidas');
    statsRapidas.innerHTML = `
        <div class="stat-card">
            <div class="stat-icon"><i class="fas fa-check-circle"></i></div>
            <div class="stat-info">
                <h4>Módulos completados</h4>
                <div class="stat-number">2/8</div>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon"><i class="fas fa-clock"></i></div>
            <div class="stat-info">
                <h4>Simulaciones</h4>
                <div class="stat-number">3</div>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon"><i class="fas fa-star"></i></div>
            <div class="stat-info">
                <h4>Promedio</h4>
                <div class="stat-number">72%</div>
            </div>
        </div>
    `;
    
    // Actualizar clase activa en navegación
    actualizarNavActiva('inicio');
}

function cargarModulos() {
    window.location.href = 'modulos/politica.html';
}

function actualizarNavActiva(seccion) {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    
    if (seccion === 'inicio') {
        document.querySelector('.nav-item[href="index.html"]').classList.add('active');
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
        }
    } else {
        // Inicializar progreso
        const progresoInicial = {
            modulosCompletados: [],
            simulaciones: []
        };
        localStorage.setItem('progresoMEP', JSON.stringify(progresoInicial));
        currentUser.progreso = progresoInicial;
    }
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
    }
}
