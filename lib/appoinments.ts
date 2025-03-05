import { getSheetData } from "./google-sheets"
import { addHours } from "date-fns"

export interface Appointment {
  id: string
  patientName: string
  date: Date
  phone: string
  reminderSent: boolean
}

export async function getUpcomingAppointments(): Promise<Appointment[]> {
  try {
    // Obtener el rango configurado o usar uno predeterminado
    const configuredRange = process.env.GOOGLE_SHEET_RANGE || "A2:E100"

    // Obtener datos de la planilla
    const rows = await getSheetData(configuredRange)

    if (!rows || rows.length === 0) {
      console.log("No se encontraron datos en la planilla")
      return []
    }

    // Mapear los datos a objetos de cita
    // Ajusta los índices según la estructura de tu planilla
    const appointments = rows.map((row, index) => {
      // Asumiendo que tu planilla tiene: Fecha | Hora | Nombre | Teléfono | Estado
      // Ajusta estos índices según la estructura real de tu planilla
      const dateStr = row[0] // Columna A: Fecha (formato: DD/MM/YYYY)
      const timeStr = row[1] // Columna B: Hora (formato: HH:MM)
      const patientName = row[2] // Columna C: Nombre del paciente
      const phone = row[3] // Columna D: Teléfono/WhatsApp
      const status = row[4] // Columna E: Estado (opcional)

      // Crear un objeto Date a partir de la fecha y hora
      // Ajusta el formato según cómo estén guardadas las fechas en tu planilla
      const [day, month, year] = dateStr.split("/").map(Number)
      const [hours, minutes] = timeStr.split(":").map(Number)

      const date = new Date(year, month - 1, day, hours, minutes)

      return {
        id: `appointment-${index}`,
        patientName,
        date,
        phone,
        // Si tienes una columna que indica si el recordatorio fue enviado, úsala aquí
        reminderSent: status === "Recordatorio enviado",
      }
    })

    // Filtrar citas para las próximas 48 horas
    const now = new Date()
    const in48Hours = addHours(now, 48)

    return appointments.filter((appointment) => {
      const appointmentDate = new Date(appointment.date)
      return appointmentDate >= now && appointmentDate <= in48Hours
    })
  } catch (error) {
    console.error("Error al obtener citas:", error)
    return []
  }
}

// Función para marcar un recordatorio como enviado
export async function markReminderAsSent(appointmentId: string) {
  // En una implementación real, actualizarías la planilla de Google Sheets
  // Para marcar que el recordatorio fue enviado

  // Nota: Esto requiere permisos de escritura en la API de Google Sheets
  console.log(`Marcando recordatorio como enviado para la cita ${appointmentId}`)

  // Por ahora, solo registramos la acción
  // En una implementación completa, actualizarías la celda correspondiente
  return true
}



