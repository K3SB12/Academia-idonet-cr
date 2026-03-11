// ============================================
// BIBLIOTECA.JS - Gestión de lecturas digitales
// Versión: 2.0 - CORREGIDA Y COMPLETA
// ============================================

// Datos completos de lecturas
const lecturasData = [
    {
        id: 1,
        titulo: "Política Educativa hacia el Siglo XXI",
        tema: "Política educativa",
        archivo: "biblioteca/documentos/politica_educativa.pdf",
        probabilidad: "Alta",
        tipo: "PDF",
        resumen: "Marco normativo y lineamientos del MEP",
        fecha: "2020"
    },
    {
        id: 2,
        titulo: "Transformación Curricular en Costa Rica",
        tema: "Currículo",
        archivo: "biblioteca/documentos/transformacion_curricular.pdf",
        probabilidad: "Alta",
        tipo: "PDF",
        resumen: "Actualización de programas de estudio",
        fecha: "2021"
    },
    {
        id: 3,
        titulo: "Reglamento de Evaluación de los Aprendizajes",
        tema: "Evaluación",
        archivo: "biblioteca/documentos/reglamento_evaluacion.pdf",
        probabilidad: "Alta",
        tipo: "PDF",
        resumen: "Decreto Ejecutivo y normativa vigente",
        fecha: "2019"
    },
    {
        id: 4,
        titulo: "Marco de Competencias Docentes",
        tema: "Competencias",
        archivo: "biblioteca/documentos/competencias_docentes.pdf",
        probabilidad: "Media",
        tipo: "PDF",
        resumen: "Estándares para el desarrollo profesional",
        fecha: "2021"
    },
    {
        id: 5,
        titulo: "Integración de Tecnología en el Aula",
        tema: "Tecnología",
        archivo: "biblioteca/documentos/tecnologia_educativa.pdf",
        probabilidad: "Media",
        tipo: "PDF",
        resumen: "Guía para el uso pedagógico de TIC",
        fecha: "2022"
    },
    {
        id: 6,
        titulo: "Educación Inclusiva: Lineamientos MEP",
        tema: "Inclusión",
        archivo: "biblioteca/documentos/inclusion_educativa.pdf",
        probabilidad: "Alta",
        tipo: "PDF",
        resumen: "Atención a la diversidad en el aula",
        fecha: "2020"
    },
    {
        id: 7,
        titulo: "Liderazgo Pedagógico para Directores",
        tema: "Liderazgo",
        archivo: "biblioteca/documentos/liderazgo_pedagogico.pdf",
        probabilidad: "Media",
        tipo: "PDF",
        resumen: "Estrategias para el acompañamiento docente",
        fecha: "2021"
    },
    {
        id: 8,
        titulo: "Comunidades Profesionales de Aprendizaje",
        tema: "Gestión",
        archivo: "biblioteca/documentos/comunidades_aprendizaje.pdf",
        probabilidad: "Media",
        tipo: "PDF",
        resumen: "Trabajo colaborativo entre docentes",
        fecha: "2022"
    },
    {
        id: 9,
        titulo: "Retroalimentación Formativa en el Aula",
        tema: "Evaluación",
        archivo: "biblioteca/documentos/retroalimentacion.pdf",
        probabilidad: "Alta",
        tipo: "PDF",
        resumen: "Estrategias para la retroalimentación efectiva",
        fecha: "2023"
    },
    {
        id: 10,
        titulo: "Gestión del Cambio en Instituciones Educativas",
        tema: "Gestión",
        archivo: "biblioteca/documentos/gestion_cambio.pdf",
        probabilidad: "Media",
        tipo: "PDF",
        resumen: "Procesos de mejora institucional",
        fecha: "2020"
    }
];

// Variable para filtrado
let lecturasFiltradas = [...lecturasData];

// Cargar biblioteca
function cargarBiblioteca() {
    const content = document.getElementById('dynamic-content');
    if (!content) return;
    
    actualizarNavActiva('biblioteca');
    
    content.innerHTML = `
        <h1 style="margin-bottom: 1rem;">📚 Biblioteca de lecturas</h1>
        <p style="color: #6B7280; margin-bottom: 2rem;">Documentos, normativas y materiales para tu preparación</p>
        
        <div class="biblioteca-header">
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" id="buscador-lecturas" placeholder="Buscar lecturas..." onkeyup="window.filtrarLecturas()">
            </div>
            
            <div class="filtros-categoria" id="filtros-container">
                ${generarBotonesFiltro()}
            </div>
        </div>
        
        <div class="lecturas-grid" id="lecturas-grid">
            ${generarTarjetasLecturas(lecturasData)}
        </div>
        
        <div style="margin-top: 3rem; background: #EFF6FF; padding: 1.5rem; border-radius: 12px; text-align: center;">
            <i class="fas fa-robot" style="font-size: 2rem; color: #2563EB; margin-bottom: 1rem;"></i>
            <h3 style="margin-bottom: 0.5rem;">Análisis con IA (próximamente)</h3>
            <p style="color: #6B7280;">En una siguiente fase, podrás analizar automáticamente las lecturas.</p>
        </div>
    `;
}

// Generar botones de filtro únicos
function generarBotonesFiltro() {
    const temas = ['Todos', ...new Set(lecturasData.map(l => l.tema))];
    
    return temas.map(tema => `
        <button class="filtro-btn ${tema === 'Todos' ? 'active' : ''}" 
                onclick="window.filtrarPorTema('${tema}', this)">
            ${tema}
        </button>
    `).join('');
}

// Generar tarjetas de lecturas
function generarTarjetasLecturas(lecturas) {
    if (!lecturas || lecturas.length === 0) {
        return `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: #9CA3AF;"></i>
                <h3>No se encontraron lecturas</h3>
                <p style="color: #6B7280;">Intenta con otros términos</p>
            </div>
        `;
    }
    
    return lecturas.map(lectura => `
        <div class="lectura-card" onclick="window.abrirPDF('${lectura.archivo}', '${lectura.titulo}')">
            <div class="lectura-icon">
                <i class="fas fa-file-pdf"></i>
            </div>
            <div class="lectura-titulo">${lectura.titulo}</div>
            <span class="lectura-tema">${lectura.tema}</span>
            <p style="font-size: 0.9rem; color: #4B5563; margin: 0.5rem 0;">${lectura.resumen || ''}</p>
            <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 0.5rem;">
                <span class="lectura-probabilidad">
                    <i class="fas fa-chart-line"></i> ${lectura.probabilidad}
                </span>
                <small style="color: #9CA3AF;">${lectura.fecha}</small>
            </div>
        </div>
    `).join('');
}

// Filtrar lecturas por búsqueda
function filtrarLecturas() {
    const termino = document.getElementById('buscador-lecturas')?.value.toLowerCase() || '';
    
    lecturasFiltradas = lecturasData.filter(lectura => 
        lectura.titulo.toLowerCase().includes(termino) ||
        lectura.tema.toLowerCase().includes(termino) ||
        lectura.resumen.toLowerCase().includes(termino)
    );
    
    const grid = document.getElementById('lecturas-grid');
    if (grid) {
        grid.innerHTML = generarTarjetasLecturas(lecturasFiltradas);
    }
}

// Filtrar por tema
function filtrarPorTema(tema, boton) {
    // Actualizar botones
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    boton.classList.add('active');
    
    if (tema === 'Todos') {
        lecturasFiltradas = [...lecturasData];
    } else {
        lecturasFiltradas = lecturasData.filter(lectura => lectura.tema === tema);
    }
    
    const grid = document.getElementById('lecturas-grid');
    if (grid) {
        grid.innerHTML = generarTarjetasLecturas(lecturasFiltradas);
    }
}

// Abrir PDF en modal
function abrirPDF(ruta, titulo) {
    const modal = document.getElementById('pdfModal');
    const iframe = document.getElementById('pdfIframe');
    const tituloModal = document.getElementById('modal-titulo');
    
    if (!modal || !iframe) return;
    
    iframe.src = ruta;
    tituloModal.textContent = titulo;
    modal.style.display = 'block';
    
    console.log('📖 Leyendo:', titulo);
}

// Cerrar modal
function cerrarModal() {
    const modal = document.getElementById('pdfModal');
    const iframe = document.getElementById('pdfIframe');
    
    if (modal) modal.style.display = 'none';
    if (iframe) iframe.src = '';
}

// Cargar lecturas para un módulo específico
function cargarLecturasModulo(idsLecturas) {
    const container = document.getElementById('lecturas-modulo');
    if (!container) return;
    
    const lecturasModulo = lecturasData.filter(l => idsLecturas.includes(l.id));
    
    container.innerHTML = lecturasModulo.map(lectura => `
        <div style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border-bottom: 1px solid #E5E7EB; cursor: pointer;" 
             onclick="window.abrirPDF('${lectura.archivo}', '${lectura.titulo}')">
            <i class="fas fa-file-pdf" style="color: #DC2626; font-size: 1.5rem;"></i>
            <div style="flex:1;">
                <div style="font-weight: 600;">${lectura.titulo}</div>
                <small style="color: #6B7280;">${lectura.tema} · ${lectura.fecha}</small>
            </div>
            <i class="fas fa-eye" style="color: #2563EB;"></i>
        </div>
    `).join('');
}

// ============================================
// EXPORTAR FUNCIONES GLOBALES
// ============================================
window.cargarBiblioteca = cargarBiblioteca;
window.filtrarLecturas = filtrarLecturas;
window.filtrarPorTema = filtrarPorTema;
window.abrirPDF = abrirPDF;
window.cerrarModal = cerrarModal;
window.cargarLecturasModulo = cargarLecturasModulo;
