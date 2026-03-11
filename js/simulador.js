// ============================================
// SIMULADOR.JS - Examen de práctica 60 preguntas
// Academia para la Prueba de Idoneidad Docente
// ============================================

// Configuración del simulador
const SIM_CONFIG = {
    totalPreguntas: 60,
    tiempoSegundos: 4 * 60 * 60, // 4 horas en segundos
    tiempoAlerta: 300 // 5 minutos antes
};

let estadoSimulador = {
    preguntas: [],
    respuestas: {},
    marcadas: new Set(),
    preguntaActual: 0,
    tiempoRestante: SIM_CONFIG.tiempoSegundos,
    timerInterval: null,
    finalizado: false
};

// Cargar preguntas desde JSON
async function cargarPreguntasSimulador() {
    try {
        const respuesta = await fetch('../data/preguntas.json');
        const preguntas = await respuesta.json();
        
        // Seleccionar 60 preguntas aleatorias
        estadoSimulador.preguntas = seleccionarAleatorias(preguntas, 60);
        estadoSimulador.respuestas = {};
        estadoSimulador.marcadas.clear();
        
        mostrarPregunta();
        iniciarTemporizador();
        
    } catch (error) {
        console.error('Error cargando preguntas:', error);
        // Datos de emergencia si falla la carga
        estadoSimulador.preguntas = generarPreguntasEmergencia();
        mostrarPregunta();
        iniciarTemporizador();
    }
}

// Seleccionar preguntas aleatorias
function seleccionarAleatorias(array, cantidad) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, cantidad);
}

// Iniciar temporizador
function iniciarTemporizador() {
    if (estadoSimulador.timerInterval) {
        clearInterval(estadoSimulador.timerInterval);
    }
    
    estadoSimulador.timerInterval = setInterval(() => {
        estadoSimulador.tiempoRestante--;
        
        // Actualizar display
        actualizarTemporizador();
        
        // Verificar tiempo límite
        if (estadoSimulador.tiempoRestante <= 0) {
            finalizarSimulador();
        }
        
        // Alerta de 5 minutos
        if (estadoSimulador.tiempoRestante === SIM_CONFIG.tiempoAlerta) {
            alert('⏰ Quedan 5 minutos para finalizar el examen');
        }
        
    }, 1000);
}

// Actualizar display del temporizador
function actualizarTemporizador() {
    const horas = Math.floor(estadoSimulador.tiempoRestante / 3600);
    const minutos = Math.floor((estadoSimulador.tiempoRestante % 3600) / 60);
    const segundos = estadoSimulador.tiempoRestante % 60;
    
    const tiempoStr = `${horas.toString().padStart(2,'0')}:${minutos.toString().padStart(2,'0')}:${segundos.toString().padStart(2,'0')}`;
    
    const timerElement = document.getElementById('timer-display');
    if (timerElement) {
        timerElement.textContent = tiempoStr;
        
        // Cambiar color si queda poco tiempo
        if (estadoSimulador.tiempoRestante < 300) {
            timerElement.style.color = '#DC2626';
        }
    }
}

// Mostrar pregunta actual
function mostrarPregunta() {
    if (estadoSimulador.finalizado) return;
    
    const pregunta = estadoSimulador.preguntas[estadoSimulador.preguntaActual];
    if (!pregunta) return;
    
    const container = document.getElementById('pregunta-container');
    if (!container) return;
    
    const respuestaGuardada = estadoSimulador.respuestas[estadoSimulador.preguntaActual];
    
    container.innerHTML = `
        <div class="pregunta-header">
            <span class="pregunta-numero">Pregunta ${estadoSimulador.preguntaActual + 1} de ${estadoSimulador.preguntas.length}</span>
            <span class="pregunta-tema">${pregunta.tema || 'General'}</span>
        </div>
        
        <div class="pregunta-texto">
            ${pregunta.pregunta}
        </div>
        
        <div class="opciones-container">
            <label class="opcion ${respuestaGuardada === 'A' ? 'selected' : ''}">
                <input type="radio" name="respuesta" value="A" ${respuestaGuardada === 'A' ? 'checked' : ''} onchange="guardarRespuesta('A')">
                <span class="opcion-letra">A</span>
                <span class="opcion-texto">${pregunta.A}</span>
            </label>
            
            <label class="opcion ${respuestaGuardada === 'B' ? 'selected' : ''}">
                <input type="radio" name="respuesta" value="B" ${respuestaGuardada === 'B' ? 'checked' : ''} onchange="guardarRespuesta('B')">
                <span class="opcion-letra">B</span>
                <span class="opcion-texto">${pregunta.B}</span>
            </label>
            
            <label class="opcion ${respuestaGuardada === 'C' ? 'selected' : ''}">
                <input type="radio" name="respuesta" value="C" ${respuestaGuardada === 'C' ? 'checked' : ''} onchange="guardarRespuesta('C')">
                <span class="opcion-letra">C</span>
                <span class="opcion-texto">${pregunta.C}</span>
            </label>
            
            <label class="opcion ${respuestaGuardada === 'D' ? 'selected' : ''}">
                <input type="radio" name="respuesta" value="D" ${respuestaGuardada === 'D' ? 'checked' : ''} onchange="guardarRespuesta('D')">
                <span class="opcion-letra">D</span>
                <span class="opcion-texto">${pregunta.D}</span>
            </label>
        </div>
        
        <div class="pregunta-actions">
            <button class="btn-accion" onclick="marcarPregunta()" ${estadoSimulador.marcadas.has(estadoSimulador.preguntaActual) ? 'style="background:#FEF3C7"' : ''}>
                <i class="fas fa-flag"></i>
                ${estadoSimulador.marcadas.has(estadoSimulador.preguntaActual) ? 'Marcada' : 'Marcar para revisar'}
            </button>
        </div>
    `;
    
    actualizarPanelNavegacion();
}

// Guardar respuesta
function guardarRespuesta(opcion) {
    estadoSimulador.respuestas[estadoSimulador.preguntaActual] = opcion;
    actualizarPanelNavegacion();
}

// Marcar/desmarcar pregunta
function marcarPregunta() {
    if (estadoSimulador.marcadas.has(estadoSimulador.preguntaActual)) {
        estadoSimulador.marcadas.delete(estadoSimulador.preguntaActual);
    } else {
        estadoSimulador.marcadas.add(estadoSimulador.preguntaActual);
    }
    mostrarPregunta(); // Para actualizar el botón
    actualizarPanelNavegacion();
}

// Navegación
function siguientePregunta() {
    if (estadoSimulador.preguntaActual < estadoSimulador.preguntas.length - 1) {
        estadoSimulador.preguntaActual++;
        mostrarPregunta();
    }
}

function anteriorPregunta() {
    if (estadoSimulador.preguntaActual > 0) {
        estadoSimulador.preguntaActual--;
        mostrarPregunta();
    }
}

function irAPregunta(numero) {
    estadoSimulador.preguntaActual = numero;
    mostrarPregunta();
}

// Actualizar panel de navegación (números 1-60)
function actualizarPanelNavegacion() {
    const panel = document.getElementById('panel-navegacion');
    if (!panel) return;
    
    let html = '';
    for (let i = 0; i < estadoSimulador.preguntas.length; i++) {
        let clase = 'nav-numero';
        
        if (estadoSimulador.respuestas[i]) {
            clase += ' respondida';
        } else if (estadoSimulador.marcadas.has(i)) {
            clase += ' marcada';
        }
        
        if (i === estadoSimulador.preguntaActual) {
            clase += ' actual';
        }
        
        html += `<button class="${clase}" onclick="irAPregunta(${i})">${i + 1}</button>`;
    }
    
    panel.innerHTML = html;
}

// Finalizar simulador
function finalizarSimulador() {
    if (estadoSimulador.finalizado) return;
    
    clearInterval(estadoSimulador.timerInterval);
    estadoSimulador.finalizado = true;
    
    // Calcular resultados
    let correctas = 0;
    const temasFallados = new Set();
    
    estadoSimulador.preguntas.forEach((pregunta, index) => {
        if (estadoSimulador.respuestas[index] === pregunta.correcta) {
            correctas++;
        } else {
            if (pregunta.tema) temasFallados.add(pregunta.tema);
        }
    });
    
    const porcentaje = (correctas / estadoSimulador.preguntas.length) * 100;
    
    // Guardar en progreso
    if (typeof registrarSimulacion !== 'undefined') {
        registrarSimulacion({
            aciertos: correctas,
            total: estadoSimulador.preguntas.length,
            porcentaje: porcentaje,
            temas: Array.from(temasFallados)
        });
    }
    
    // Mostrar resultados
    mostrarResultados(correctas, porcentaje, Array.from(temasFallados));
}

// Mostrar pantalla de resultados
function mostrarResultados(correctas, porcentaje, temasFallados) {
    const container = document.getElementById('simulador-container');
    if (!container) return;
    
    container.innerHTML = `
        <div class="resultados-container">
            <h2>📊 Resultado del simulador</h2>
            
            <div class="resultado-stats">
                <div class="stat-circle">
                    <div class="circle" style="background: conic-gradient(#10B981 0deg ${porcentaje * 3.6}deg, #E5E7EB ${porcentaje * 3.6}deg 360deg)">
                        <span>${Math.round(porcentaje)}%</span>
                    </div>
                </div>
                
                <div class="stats-grid">
                    <div class="stat-item">
                        <span class="stat-label">Correctas</span>
                        <span class="stat-value correctas">${correctas}</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-label">Incorrectas</span>
                        <span class="stat-value incorrectas">${60 - correctas}</span>
                    </div>
                </div>
            </div>
            
            ${temasFallados.length > 0 ? `
                <div class="temas-reforzar">
                    <h3>Temas para reforzar:</h3>
                    <ul>
                        ${temasFallados.map(tema => `<li>🔹 ${tema}</li>`).join('')}
                    </ul>
                </div>
            ` : `
                <div class="felicitaciones">
                    🎉 ¡Excelente trabajo! Has dominado todos los temas.
                </div>
            `}
            
            <div class="resultado-actions">
                <button onclick="location.reload()" class="btn-primary">
                    <i class="fas fa-redo"></i> Nuevo simulador
                </button>
                <a href="../index.html" class="btn-outline">
                    <i class="fas fa-home"></i> Ir al inicio
                </a>
            </div>
        </div>
    `;
}

// Datos de emergencia si falla la carga
function generarPreguntasEmergencia() {
    return [
        {
            pregunta: "¿Cuál es el propósito principal de la evaluación formativa?",
            A: "Asignar una calificación final",
            B: "Retroalimentar el aprendizaje durante el proceso",
            C: "Clasificar a los estudiantes",
            D: "Determinar la promoción anual",
            correcta: "B",
            tema: "Evaluación educativa"
        },
        {
            pregunta: "Según la política educativa costarricense, la educación debe ser:",
            A: "Exclusiva para algunos sectores",
            B: "Centrada en la persona",
            C: "Enfocada solo en resultados",
            D: "Independiente del contexto social",
            correcta: "B",
            tema: "Política educativa"
        }
    ];
}

// Inicializar cuando se carga la página
document.addEventListener('DOMContentLoaded', function() {
    if (window.location.pathname.includes('simulador.html')) {
        cargarPreguntasSimulador();
    }
});
