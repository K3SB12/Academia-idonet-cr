// ============================================
// BIBLIOTECA.JS - Gestión de lecturas digitales
// Academia para la Prueba de Idoneidad Docente
// ============================================

// Datos de ejemplo para la biblioteca
const lecturasData = [
    {
        id: 1,
        titulo: "Política Educativa hacia el Siglo XXI",
        tema: "Política educativa",
        archivo: "biblioteca/documentos/politica_educativa.pdf",
        probabilidad: "Alta",
        tipo: "PDF",
        resumen: "Marco normativo y lineamientos del MEP"
    },
    {
        id: 2,
        titulo: "Transformación Curricular en Costa Rica",
        tema: "Currículo",
        archivo: "biblioteca/documentos/transformacion_curricular.pdf",
        probabilidad: "Alta",
        tipo: "PDF",
        resumen: "Actualización de programas de estudio"
    },
    {
        id: 3,
        titulo: "Reglamento de Evaluación de los Aprendizajes",
        tema: "Evaluación",
        archivo: "biblioteca/documentos/reglamento_evaluacion.pdf",
        probabilidad: "Alta",
        tipo: "PDF",
        resumen: "Decreto Ejecutivo y normativa vigente"
    },
    {
        id: 4,
        titulo: "Marco de Competencias Docentes",
        tema: "Competencias",
        archivo: "biblioteca/documentos/competencias_docentes.pdf",
        probabilidad: "Media",
        tipo: "PDF",
        resumen: "Estándares para el desarrollo profesional"
    },
    {
        id: 5,
        titulo: "Integración de Tecnología en el Aula",
        tema: "Tecnología",
        archivo: "biblioteca/documentos/tecnologia_educativa.pdf",
        probabilidad: "Media",
        tipo: "PDF",
        resumen: "Guía para el uso pedagógico de TIC"
    },
    {
        id: 6,
        titulo: "Educación Inclusiva: Lineamientos MEP",
        tema: "Inclusión",
        archivo: "biblioteca/documentos/inclusion_educativa.pdf",
        probabilidad: "Alta",
        tipo: "PDF",
        resumen: "Atención a la diversidad en el aula"
    },
    {
        id: 7,
        titulo: "Liderazgo Pedagógico para Directores",
        tema: "Liderazgo",
        archivo: "biblioteca/documentos/liderazgo_pedagogico.pdf",
        probabilidad: "Media",
        tipo: "PDF",
        resumen: "Estrategias para el acompañamiento docente"
    },
    {
        id: 8,
        titulo: "Comunidades Profesionales de Aprendizaje",
        tema: "Gestión",
        archivo: "biblioteca/documentos/comunidades_aprendizaje.pdf",
        probabilidad: "Media",
        tipo: "PDF",
        resumen: "Trabajo colaborativo entre docentes"
    }
];

// Cargar biblioteca
function cargarBiblioteca() {
    const content = document.getElementById('dynamic-content');
    
    // Actualizar clase activa
    document.querySelectorAll('.nav-item').forEach(item => {
        item.classList.remove('active');
    });
    document.getElementById('nav-biblioteca').classList.add('active');
    
    // Mostrar biblioteca
    content.innerHTML = `
        <h1 style="margin-bottom: 1rem;">📚 Biblioteca de lecturas</h1>
        <p style="color: #6B7280; margin-bottom: 2rem;">Documentos, normativas y materiales para tu preparación</p>
        
        <div class="biblioteca-header">
            <div class="search-box">
                <i class="fas fa-search"></i>
                <input type="text" id="buscador-lecturas" placeholder="Buscar lecturas..." onkeyup="filtrarLecturas()">
            </div>
            
            <div class="filtros-categoria" id="filtros-categoria">
                <button class="filtro-btn active" onclick="filtrarPorTema('todos')">Todos</button>
                <button class="filtro-btn" onclick="filtrarPorTema('Política educativa')">Política</button>
                <button class="filtro-btn" onclick="filtrarPorTema('Currículo')">Currículo</button>
                <button class="filtro-btn" onclick="filtrarPorTema('Evaluación')">Evaluación</button>
                <button class="filtro-btn" onclick="filtrarPorTema('Competencias')">Competencias</button>
                <button class="filtro-btn" onclick="filtrarPorTema('Tecnología')">Tecnología</button>
                <button class="filtro-btn" onclick="filtrarPorTema('Inclusión')">Inclusión</button>
            </div>
        </div>
        
        <div class="lecturas-grid" id="lecturas-grid">
            <!-- Se carga dinámicamente -->
        </div>
        
        <div style="margin-top: 3rem; background: #EFF6FF; padding: 1.5rem; border-radius: 12px; text-align: center;">
            <i class="fas fa-robot" style="font-size: 2rem; color: #2563EB; margin-bottom: 1rem;"></i>
            <h3 style="margin-bottom: 0.5rem;">Análisis con IA (próximamente)</h3>
            <p style="color: #6B7280;">En una siguiente fase, podrás analizar automáticamente las lecturas y generar preguntas personalizadas.</p>
        </div>
    `;
    
    mostrarLecturas(lecturasData);
}

// Mostrar lecturas en grid
function mostrarLecturas(lecturas) {
    const grid = document.getElementById('lecturas-grid');
    
    if (!grid) return;
    
    if (lecturas.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1/-1; text-align: center; padding: 3rem;">
                <i class="fas fa-search" style="font-size: 3rem; color: #9CA3AF; margin-bottom: 1rem;"></i>
                <h3>No se encontraron lecturas</h3>
                <p style="color: #6B7280;">Intenta con otros términos de búsqueda</p>
            </div>
        `;
        return;
    }
    
    grid.innerHTML = lecturas.map(lectura => `
        <div class="lectura-card" onclick="abrirPDF('${lectura.archivo}', '${lectura.titulo}')">
            <div class="lectura-icon">
                <i class="fas ${getIconoTipo(lectura.tipo)}"></i>
            </div>
            <div class="lectura-titulo">${lectura.titulo}</div>
            <span class="lectura-tema">${lectura.tema}</span>
            <p style="font-size: 0.9rem; color: #4B5563; margin: 0.5rem 0;">${lectura.resumen || ''}</p>
            <div class="lectura-probabilidad">
                <i class="fas fa-chart-line"></i>
                Probabilidad en examen: ${lectura.probabilidad}
            </div>
        </div>
    `).join('');
}

// Iconos por tipo de documento
function getIconoTipo(tipo) {
    const iconos = {
        'PDF': 'fa-file-pdf',
        'DOC': 'fa-file-word',
        'VIDEO': 'fa-video',
        'PPT': 'fa-file-powerpoint'
    };
    return iconos[tipo] || 'fa-file';
}

// Filtrar lecturas por búsqueda
function filtrarLecturas() {
    const termino = document.getElementById('buscador-lecturas').value.toLowerCase();
    
    const filtradas = lecturasData.filter(lectura => 
        lectura.titulo.toLowerCase().includes(termino) ||
        lectura.tema.toLowerCase().includes(termino) ||
        (lectura.resumen && lectura.resumen.toLowerCase().includes(termino))
    );
    
    mostrarLecturas(filtradas);
}

// Filtrar por tema
function filtrarPorTema(tema) {
    // Actualizar botones
    document.querySelectorAll('.filtro-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    event.target.classList.add('active');
    
    if (tema === 'todos') {
        mostrarLecturas(lecturasData);
    } else {
        const filtradas = lecturasData.filter(lectura => lectura.tema === tema);
        mostrarLecturas(filtradas);
    }
}

// Abrir PDF en modal
function abrirPDF(ruta, titulo) {
    const modal = document.getElementById('pdfModal');
    const iframe = document.getElementById('pdfIframe');
    const tituloModal = document.getElementById('modal-titulo');
    
    iframe.src = ruta;
    tituloModal.textContent = titulo;
    modal.style.display = 'block';
    
    // Registrar lectura para progreso
    console.log('📖 Leyendo:', titulo);
}

// Cerrar modal
function cerrarModal() {
    const modal = document.getElementById('pdfModal');
    const iframe = document.getElementById('pdfIframe');
    
    modal.style.display = 'none';
    iframe.src = '';
}
