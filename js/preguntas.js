// ============================================
// PREGUNTAS.JS - Banco de preguntas y generador
// Versión: 2.0 - CORREGIDA Y COMPLETA
// ============================================

// Banco completo de preguntas
const bancoPreguntas = [
    {
        id: 1,
        pregunta: "¿Cuál es el propósito principal de la evaluación formativa en el proceso educativo?",
        A: "Asignar una calificación numérica al final del período",
        B: "Retroalimentar el proceso de aprendizaje para mejorarlo continuamente",
        C: "Clasificar a los estudiantes según su rendimiento académico",
        D: "Determinar qué estudiantes merecen becas y reconocimientos",
        correcta: "B",
        tema: "Evaluación educativa",
        nivel: "comprensión",
        justificacion: "La evaluación formativa tiene como propósito mejorar el proceso, no solo medir resultados finales."
    },
    {
        id: 2,
        pregunta: "Según la política educativa costarricense, la educación debe estar centrada en:",
        A: "Los resultados de las pruebas estandarizadas",
        B: "Las necesidades del mercado laboral",
        C: "La persona como centro del proceso educativo",
        D: "Los contenidos curriculares establecidos",
        correcta: "C",
        tema: "Política educativa",
        nivel: "conocimiento",
        justificacion: "El MEP establece un enfoque centrado en la persona, su desarrollo integral y sus potencialidades."
    },
    {
        id: 3,
        pregunta: "¿Qué caracteriza a una Comunidad Profesional de Aprendizaje?",
        A: "Docentes que trabajan de forma aislada en sus aulas",
        B: "Un grupo jerárquico donde el director imparte órdenes",
        C: "Colaboración sistemática para mejorar prácticas pedagógicas",
        D: "Reuniones administrativas para tratar temas disciplinarios",
        correcta: "C",
        tema: "Gestión educativa",
        nivel: "comprensión",
        justificacion: "Las CPA se basan en la colaboración, el aprendizaje colectivo y la mejora continua."
    },
    {
        id: 4,
        pregunta: "¿Cuál es un componente clave del liderazgo pedagógico?",
        A: "Administrar eficientemente los recursos financieros",
        B: "Mantener la disciplina estricta en la institución",
        C: "Acompañar y retroalimentar la práctica docente",
        D: "Elaborar horarios y asignar grupos",
        correcta: "C",
        tema: "Liderazgo",
        nivel: "aplicación",
        justificacion: "El liderazgo pedagógico se enfoca en mejorar los procesos de enseñanza y aprendizaje."
    },
    {
        id: 5,
        pregunta: "¿Qué implica la transformación curricular en el sistema educativo?",
        A: "Mantener los mismos programas por décadas",
        B: "Actualizar planes de estudio según necesidades sociales",
        C: "Eliminar asignaturas consideradas difíciles",
        D: "Reducir la cantidad de años de educación obligatoria",
        correcta: "B",
        tema: "Currículo",
        nivel: "comprensión",
        justificacion: "La transformación curricular busca adecuar la educación a las demandas del siglo XXI."
    },
    {
        id: 6,
        pregunta: "¿Qué son las competencias docentes según el marco del MEP?",
        A: "Conocimientos teóricos que debe dominar un profesor",
        B: "Capacidades para actuar eficazmente en situaciones pedagógicas",
        C: "Títulos académicos que acreditan la formación",
        D: "Años de experiencia en el aula",
        correcta: "B",
        tema: "Competencias",
        nivel: "conocimiento",
        justificacion: "Las competencias integran conocimientos, habilidades y actitudes para la acción profesional."
    },
    {
        id: 7,
        pregunta: "¿Cómo se define la educación inclusiva en los lineamientos del MEP?",
        A: "Educación especial para estudiantes con discapacidad",
        B: "Proceso que garantiza el derecho a una educación de calidad para todos",
        C: "Programas separados para diferentes grupos de estudiantes",
        D: "Adaptaciones solo para quienes las solicitan",
        correcta: "B",
        tema: "Inclusión",
        nivel: "comprensión",
        justificacion: "La inclusión reconoce la diversidad como valor y garantiza participación y aprendizaje para todos."
    },
    {
        id: 8,
        pregunta: "¿Qué busca la integración pedagógica de la tecnología?",
        A: "Sustituir al docente por herramientas digitales",
        B: "Usar tecnología para mejorar procesos de enseñanza y aprendizaje",
        C: "Enseñar solo informática en las escuelas",
        D: "Eliminar libros de texto físicos",
        correcta: "B",
        tema: "Tecnología educativa",
        nivel: "aplicación",
        justificacion: "La tecnología es un medio, no un fin; debe potenciar aprendizajes significativos."
    },
    {
        id: 9,
        pregunta: "¿Qué es la retroalimentación formativa?",
        A: "Información sobre errores sin sugerencias de mejora",
        B: "Comunicación que ayuda al estudiante a cerrar brechas de aprendizaje",
        C: "Calificación numérica con comentarios breves",
        D: "Señalar todo lo que está mal en un trabajo",
        correcta: "B",
        tema: "Evaluación educativa",
        nivel: "comprensión",
        justificacion: "La retroalimentación formativa orienta hacia la mejora, no solo señala errores."
    },
    {
        id: 10,
        pregunta: "¿Qué caracteriza a la gestión del cambio educativo?",
        A: "Mantener todo igual para evitar conflictos",
        B: "Proceso planificado para transformar prácticas institucionales",
        C: "Cambiar constantemente sin dirección clara",
        D: "Imponer nuevas normas sin consultar",
        correcta: "B",
        tema: "Gestión educativa",
        nivel: "aplicación",
        justificacion: "El cambio requiere planificación, participación y acompañamiento para ser sostenible."
    },
    {
        id: 11,
        pregunta: "Según el MEP, ¿qué debe garantizar la mejora institucional?",
        A: "Resultados en pruebas estandarizadas exclusivamente",
        B: "Mejores condiciones para el aprendizaje de todos los estudiantes",
        C: "Reducción de personal docente",
        D: "Aumento de horas lectivas sin análisis pedagógico",
        correcta: "B",
        tema: "Gestión educativa",
        nivel: "conocimiento",
        justificacion: "La mejora institucional se enfoca en el aprendizaje y el desarrollo integral del estudiante."
    },
    {
        id: 12,
        pregunta: "¿Qué es la observación de clase con fines formativos?",
        A: "Vigilar que el docente cumpla horarios",
        B: "Proceso de acompañamiento para mejorar prácticas pedagógicas",
        C: "Evaluación unilateral del desempeño del profesor",
        D: "Registro de incidentes disciplinarios",
        correcta: "B",
        tema: "Acompañamiento docente",
        nivel: "comprensión",
        justificacion: "La observación formativa busca el crecimiento profesional, no la fiscalización."
    },
    {
        id: 13,
        pregunta: "¿Cuál es el objetivo de las adecuaciones curriculares?",
        A: "Reducir el nivel de exigencia para algunos estudiantes",
        B: "Garantizar el acceso al currículo para todos los estudiantes",
        C: "Separar a estudiantes con dificultades del grupo regular",
        D: "Eliminar contenidos complejos del programa",
        correcta: "B",
        tema: "Inclusión",
        nivel: "aplicación",
        justificacion: "Las adecuaciones buscan eliminar barreras para el aprendizaje y la participación."
    },
    {
        id: 14,
        pregunta: "¿Qué establece la Ley Fundamental de Educación de Costa Rica?",
        A: "La educación es un derecho de todos",
        B: "La educación es obligatoria solo hasta primaria",
        C: "El estado no tiene responsabilidad en la educación",
        D: "La educación es un privilegio para algunos",
        correcta: "A",
        tema: "Política educativa",
        nivel: "conocimiento",
        justificacion: "La Ley Fundamental establece la educación como derecho y responsabilidad del Estado."
    },
    {
        id: 15,
        pregunta: "¿Qué son los indicadores de logro en la planificación docente?",
        A: "Notas que se asignan al final del período",
        B: "Evidencias que demuestran el aprendizaje alcanzado",
        C: "Contenidos que se deben enseñar",
        D: "Actividades que realizan los estudiantes",
        correcta: "B",
        tema: "Evaluación educativa",
        nivel: "aplicación",
        justificacion: "Los indicadores permiten verificar si se han alcanzado los aprendizajes esperados."
    },
    {
        id: 16,
        pregunta: "¿Qué rol tienen los directores en el liderazgo pedagógico?",
        A: "Solo supervisar el cumplimiento de horarios",
        B: "Gestionar recursos y acompañar la práctica docente",
        C: "Tomar decisiones unilaterales",
        D: "Enfocarse únicamente en lo administrativo",
        correcta: "B",
        tema: "Liderazgo",
        nivel: "comprensión",
        justificacion: "El director pedagógico combina gestión administrativa con acompañamiento técnico."
    },
    {
        id: 17,
        pregunta: "¿Qué son los recursos tecnológicos en educación?",
        A: "Solo computadoras y tabletas",
        B: "Herramientas que apoyan los procesos de enseñanza y aprendizaje",
        C: "Sustitutos del docente",
        D: "Elementos decorativos del aula",
        correcta: "B",
        tema: "Tecnología educativa",
        nivel: "conocimiento",
        justificacion: "Los recursos tecnológicos son mediadores pedagógicos, no fines en sí mismos."
    },
    {
        id: 18,
        pregunta: "¿Qué busca el currículo por competencias?",
        A: "Acumular conocimientos teóricos",
        B: "Desarrollar capacidades para resolver problemas de la vida real",
        C: "Memorizar información para exámenes",
        D: "Enseñar solo contenidos prácticos",
        correcta: "B",
        tema: "Currículo",
        nivel: "comprensión",
        justificacion: "El enfoque por competencias integra saber, saber hacer y saber ser."
    },
    {
        id: 19,
        pregunta: "¿Qué son las adecuaciones no significativas?",
        A: "Cambios profundos en el currículo",
        B: "Modificaciones menores en metodología o evaluación",
        C: "Eliminación de contenidos",
        D: "Separación del estudiante del aula regular",
        correcta: "B",
        tema: "Inclusión",
        nivel: "aplicación",
        justificacion: "Son ajustes que no alteran los aprendizajes esperados del nivel."
    },
    {
        id: 20,
        pregunta: "¿Qué función tiene el planeamiento didáctico?",
        A: "Cumplir un requisito administrativo",
        B: "Organizar intencionadamente el proceso de enseñanza-aprendizaje",
        C: "Registrar lo que se hace en clase",
        D: "Controlar al docente",
        correcta: "B",
        tema: "Gestión educativa",
        nivel: "comprensión",
        justificacion: "El planeamiento da direccionalidad y coherencia a la práctica pedagógica."
    }
];

// Obtener preguntas por tema
function obtenerPreguntasPorTema(tema, cantidad = 5) {
    const filtradas = bancoPreguntas.filter(p => p.tema === tema);
    const mezcladas = [...filtradas].sort(() => 0.5 - Math.random());
    return mezcladas.slice(0, Math.min(cantidad, mezcladas.length));
}

// Obtener preguntas aleatorias
function obtenerPreguntasAleatorias(cantidad = 10) {
    const mezcladas = [...bancoPreguntas].sort(() => 0.5 - Math.random());
    return mezcladas.slice(0, Math.min(cantidad, mezcladas.length));
}

// Cargar preguntas para un módulo específico
function cargarPreguntasModulo(tema) {
    const container = document.getElementById('preguntas-modulo');
    if (!container) return;
    
    const preguntas = obtenerPreguntasPorTema(tema, 3);
    
    container.innerHTML = preguntas.map((p, index) => `
        <div style="background: white; padding: 1.5rem; border-radius: 12px; margin-bottom: 1rem; border: 1px solid #E5E7EB;">
            <p style="font-weight: 600; margin-bottom: 1rem;">${index + 1}. ${p.pregunta}</p>
            <div style="display: grid; gap: 0.5rem;">
                ${['A','B','C','D'].map(letra => `
                    <label style="display: flex; align-items: center; gap: 0.5rem; padding: 0.5rem; border-radius: 8px;">
                        <input type="radio" name="pregunta-${p.id}" value="${letra}">
                        <span>${letra}) ${p[letra]}</span>
                    </label>
                `).join('')}
            </div>
            <button onclick="this.nextElementSibling.style.display='block'" style="margin-top: 1rem; background: #2563EB; color: white; border: none; padding: 0.5rem 1rem; border-radius: 8px;">
                Ver respuesta
            </button>
            <div style="display: none; margin-top: 1rem; padding: 1rem; background: #EFF6FF; border-radius: 8px;">
                <p><strong>Respuesta correcta: ${p.correcta}</strong></p>
                <p style="color: #4B5563;">${p.justificacion || ''}</p>
            </div>
        </div>
    `).join('');
}

// Exportar funciones
window.bancoPreguntas = bancoPreguntas;
window.obtenerPreguntasPorTema = obtenerPreguntasPorTema;
window.obtenerPreguntasAleatorias = obtenerPreguntasAleatorias;
window.cargarPreguntasModulo = cargarPreguntasModulo;
