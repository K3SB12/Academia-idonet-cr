// ============================================
// SIMULADOR.JS - Lógica COMPLETA del examen
// 60 preguntas, 4 horas, localStorage
// Versión: 2.0 - CORREGIDA Y COMPLETA
// ============================================

// Configuración del simulador
const SIM_CONFIG = {
    totalPreguntas: 60,
    tiempoSegundos: 4 * 60 * 60, // 4 horas
    tiempoAlerta: 300 // 5 minutos
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

// Inicializar simulador
function inicializarSimulador() {
    cargarPreguntasSimulador();
}

// Cargar preguntas desde preguntas.json
async function cargarPreguntasSimulador() {
    try {
        // Intentar cargar desde archivo JSON
        const respuesta = await fetch('data/preguntas.json');
        const preguntas = await respuesta.json();
        
        // Seleccionar 60 preguntas aleatorias
        estadoSimulador.preguntas = seleccionarAleatorias(preguntas, 60);
        
    } catch (error) {
        console.error('Error cargando preguntas, usando datos de emergencia:', error);
        estadoSimulador.preguntas = generarPreguntasEmergencia(60);
    }
    
    // Reiniciar estado
    estadoSimulador.respuestas = {};
    estadoSimulador.marcadas.clear();
    estadoSimulador.preguntaActual = 0;
    estadoSimulador.tiempoRestante = SIM_CONFIG.tiempoSegundos;
    estadoSimulador.finalizado = false;
    
    mostrarPregunta();
    iniciarTemporizador();
    actualizarPanelNavegacion();
}

// Seleccionar preguntas aleatorias
function seleccionarAleatorias(array, cantidad) {
    const shuffled = [...array].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(cantidad, shuffled.length));
}

// Iniciar temporizador
function iniciarTemporizador() {
    if (estadoSimulador.timerInterval) {
        clearInterval(estadoSimulador.timerInterval);
    }
    
    estadoSimulador.timerInterval = setInterval(() => {
        if (estadoSimulador.finalizado) return;
        
        estadoSimulador.tiempoRestante--;
        actualizarTemporizador();
        
        if (estadoSimulador.tiempoRestante <= 0) {
            finalizarSimulador();
        }
        
        if (estadoSimulador.tiempoRestante === SIM_CONFIG.tiempoAlerta) {
            alert('⏰ Quedan 5 minutos para finalizar el examen');
        }
        
    }, 1000);
}

// Actualizar display del temporizador
function actualizarTemporizador() {
    const timerElement = document.getElementById('timer-display');
    if (!timerElement) return;
    
    const horas = Math.floor(estadoSimulador.tiempoRestante / 3600);
    const minutos = Math.floor((estadoSimulador.tiempoRestante % 3600) / 60);
    const segundos = estadoSimulador.tiempoRestante % 60;
    
    timerElement.textContent = `${horas.toString().padStart(2,'0')}:${minutos.toString().padStart(2,'0')}:${segundos.toString().padStart(2,'0')}`;
    
    if (estadoSimulador.tiempoRestante < 300) {
        timerElement.style.color = '#DC2626';
    }
}

// Mostrar pregunta actual
function mostrarPregunta() {
    if (estadoSimulador.finalizado) return;
    
    const container = document.getElementById('pregunta-container');
    if (!container) return;
    
    const pregunta = estadoSimulador.preguntas[estadoSimulador.preguntaActual];
    if (!pregunta) return;
    
    const respuestaGuardada = estadoSimulador.respuestas[estadoSimulador.preguntaActual];
    
    container.innerHTML = `
        <div style="background: white; border-radius: 16px; padding: 2rem;">
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1.5rem; padding-bottom: 1rem; border-bottom: 1px solid #E5E7EB;">
                <span style="color: #2563EB; font-weight: 600;">Pregunta ${estadoSimulador.preguntaActual + 1} de ${estadoSimulador.preguntas.length}</span>
                <span style="background: #EFF6FF; color: #2563EB; padding: 0.3rem 1rem; border-radius: 30px;">${pregunta.tema || 'General'}</span>
            </div>
            
            <div style="font-size: 1.2rem; margin-bottom: 2rem;">
                ${pregunta.pregunta}
            </div>
            
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                ${['A','B','C','D'].map(letra => `
                    <label style="display: flex; align-items: center; gap: 1rem; padding: 1rem; border: 2px solid ${respuestaGuardada === letra ? '#2563EB' : '#E5E7EB'}; border-radius: 12px; cursor: pointer; background: ${respuestaGuardada === letra ? '#EFF6FF' : 'white'};"
                           onclick="window.guardarRespuesta('${letra}')">
                        <input type="radio" name="respuesta" value="${letra}" ${respuestaGuardada === letra ? 'checked' : ''} style="display: none;">
                        <span style="width: 30px; height: 30px; background: ${respuestaGuardada === letra ? '#2563EB' : '#F3F4F6'}; color: ${respuestaGuardada === letra ? 'white' : '#1F2937'}; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600;">${letra}</span>
                        <span style="flex:1;">${pregunta[letra]}</span>
                    </label>
                `).join('')}
            </div>
            
            <div style="display: flex; gap: 1rem; margin-top: 2rem; padding-top: 1rem; border-top: 1px solid #E5E7EB;">
                <button onclick="window.marcarPregunta()" style="padding: 0.7rem 1.5rem; border: 1px solid #E5E7EB; background: ${estadoSimulador.marcadas.has(estadoSimulador.preguntaActual) ? '#FEF3C7' : 'white'}; border-radius: 8px; cursor: pointer;">
                    <i class="fas fa-flag"></i>
                    ${estadoSimulador.marcadas.has(estadoSimulador.preguntaActual) ? 'Marcada' : 'Marcar para revisar'}
                </button>
            </div>
        </div>
    `;
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
    mostrarPregunta();
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

// Actualizar panel de navegación
function actualizarPanelNavegacion() {
    const panel = document.getElementById('panel-navegacion');
    if (!panel) return;
    
    let html = '';
    for (let i = 0; i < estadoSimulador.preguntas.length; i++) {
        let clase = 'nav-numero';
        
        if (estadoSimulador.respuestas[i]) {
            clase += ' respondida';
        }
        if (estadoSimulador.marcadas.has(i)) {
            clase += ' marcada';
        }
        if (i === estadoSimulador.preguntaActual) {
            clase += ' actual';
        }
        
        html += `<button class="${clase}" onclick="window.irAPregunta(${i})">${i + 1}</button>`;
    }
    
    panel.innerHTML = html;
    
    // Actualizar contador de respondidas
    const respondidas = Object.keys(estadoSimulador.respuestas).length;
    const respondidasSpan = document.getElementById('respondidas-count');
    if (respondidasSpan) {
        respondidasSpan.textContent = respondidas;
    }
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
        const respuesta = estadoSimulador.respuestas[index];
        if (respuesta && pregunta.correcta && respuesta === pregunta.correcta) {
            correctas++;
        } else if (pregunta.tema) {
            temasFallados.add(pregunta.tema);
        }
    });
    
    const porcentaje = (correctas / estadoSimulador.preguntas.length) * 100;
    
    // Guardar en progreso
    if (window.registrarSimulacion) {
        window.registrarSimulacion({
            aciertos: correctas,
            total: estadoSimulador.preguntas.length,
            porcentaje: porcentaje,
            temas: Array.from(temasFallados)
        });
    }
    
    mostrarResultados(correctas, porcentaje, Array.from(temasFallados));
}

// Mostrar resultados
function mostrarResultados(correctas, porcentaje, temasFallados) {
    const container = document.getElementById('simulador-container');
    if (!container) return;
    
    container.innerHTML = `
        <div style="background: white; border-radius: 16px; padding: 2rem; max-width: 800px; margin: 0 auto;">
            <h2 style="text-align: center; margin-bottom: 2rem;">📊 Resultado del simulador</h2>
            
            <div style="display: flex; align-items: center; justify-content: center; gap: 3rem; margin-bottom: 2rem;">
                <div style="width: 150px; height: 150px; border-radius: 50%; background: conic-gradient(#10B981 0deg ${porcentaje * 3.6}deg, #E5E7EB ${porcentaje * 3.6}deg 360deg); display: flex; align-items: center; justify-content: center;">
                    <div style="width: 120px; height: 120px; border-radius: 50%; background: white; display: flex; align-items: center; justify-content: center; font-size: 2rem; font-weight: 700;">
                        ${Math.round(porcentaje)}%
                    </div>
                </div>
                
                <div>
                    <div style="margin-bottom: 1rem;">
                        <div style="color: #6B7280;">Correctas</div>
                        <div style="font-size: 2rem; font-weight: 700; color: #10B981;">${correctas}</div>
                    </div>
                    <div>
                        <div style="color: #6B7280;">Incorrectas</div>
                        <div style="font-size: 2rem; font-weight: 700; color: #DC2626;">${estadoSimulador.preguntas.length - correctas}</div>
                    </div>
                </div>
            </div>
            
            ${temasFallados.length > 0 ? `
                <div style="background: #FEF2F2; padding: 1.5rem; border-radius: 12px; margin: 2rem 0;">
                    <h3 style="color: #B91C1C; margin-bottom: 1rem;">📚 Temas para reforzar:</h3>
                    <ul style="list-style: none; padding: 0;">
                        ${temasFallados.map(tema => `
                            <li style="padding: 0.5rem 0; display: flex; align-items: center; gap: 0.5rem;">
                                <i class="fas fa-circle" style="color: #EF4444; font-size: 0.5rem;"></i>
                                ${tema}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            ` : `
                <div style="background: #D1FAE5; color: #065F46; padding: 2rem; border-radius: 12px; text-align: center; margin: 2rem 0;">
                    🎉 ¡Excelente trabajo! Has dominado todos los temas.
                </div>
            `}
            
            <div style="display: flex; gap: 1rem; justify-content: center;">
                <button onclick="window.inicializarSimulador()" class="btn-primary">
                    <i class="fas fa-redo"></i> Nuevo simulador
                </button>
                <button onclick="window.cargarInicio()" class="btn-outline">
                    <i class="fas fa-home"></i> Ir al inicio
                </button>
            </div>
        </div>
    `;
}

// Generar preguntas de emergencia
function generarPreguntasEmergencia(cantidad) {
    const basePreguntas = [
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
        },
        {
            pregunta: "¿Qué caracteriza a las Comunidades Profesionales de Aprendizaje?",
            A: "Docentes trabajando aisladamente",
            B: "Jerarquía rígida",
            C: "Colaboración para mejorar prácticas",
            D: "Reuniones administrativas",
            correcta: "C",
            tema: "Gestión educativa"
        }
    ];
    
    const preguntas = [];
    for (let i = 0; i < cantidad; i++) {
        const base = basePreguntas[i % basePreguntas.length];
        preguntas.push({
            ...base,
            id: i + 1,
            pregunta: `${base.pregunta} (${i + 1})`
        });
    }
    
    return preguntas;
}

// ============================================
// EXPORTAR FUNCIONES GLOBALES
// ============================================
window.inicializarSimulador = inicializarSimulador;
window.guardarRespuesta = guardarRespuesta;
window.marcarPregunta = marcarPregunta;
window.siguientePregunta = siguientePregunta;
window.anteriorPregunta = anteriorPregunta;
window.irAPregunta = irAPregunta;
window.finalizarSimulador = finalizarSimulador;
