import { NextResponse } from "next/server"
import { getUpcomingAppointments } from "@/lib/appointments"
import { sendWhatsAppReminder } from "@/lib/whatsapp"

// Esta ruta será llamada por un cron job cada hora
export async function GET() {
  try {
    // Obtener citas en la ventana de las próximas 24-25 horas
    const appointments = await getUpcomingAppointments()

    // Filtrar citas que necesitan recordatorios (24 horas antes de la cita)
    const appointmentsNeedingReminders = appointments.filter((appointment) => {
      const appointmentTime = new Date(appointment.date).getTime()
      const now = Date.now()
      const hoursDifference = (appointmentTime - now) / (1000 * 60 * 60)

      // Enviar recordatorios para citas entre 23.5 y 24.5 horas de distancia
      return hoursDifference >= 23.5 && hoursDifference <= 24.5 && !appointment.reminderSent
    })

    // Enviar recordatorios
    const results = await Promise.allSettled(
      appointmentsNeedingReminders.map(async (appointment) => {
        // En una app real, esto enviaría un mensaje de WhatsApp
        return await sendWhatsAppReminder(appointment)
      }),
    )

    // Contar éxitos y fallos
    const successful = results.filter((r) => r.status === "fulfilled").length
    const failed = results.filter((r) => r.status === "rejected").length

    return NextResponse.json({
      success: true,
      processed: appointmentsNeedingReminders.length,
      successful,
      failed,
    })
  } catch (error) {
    console.error("Error al procesar recordatorios:", error)
    return NextResponse.json({ success: false, error: "Error al procesar recordatorios" }, { status: 500 })
  }
}

