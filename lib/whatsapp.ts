import type { Appointment } from "./appointments"
import { format } from "date-fns"
import { es } from "date-fns/locale"
import { markReminderAsSent } from "./appointments"

export async function sendWhatsAppReminder(appointment: Appointment) {
  try {
    // Formatear la fecha y hora para el mensaje
    const formattedDate = format(new Date(appointment.date), "d 'de' MMMM", { locale: es })
    const formattedTime = format(new Date(appointment.date), "HH:mm", { locale: es })

    // Obtener la plantilla de mensaje de las variables de entorno o usar una predeterminada
    const messageTemplate =
      process.env.REMINDER_TEMPLATE ||
      "Hola {nombre}, le recordamos su cita para mañana {fecha} a las {hora}. Por favor confirme su asistencia. Gracias."

    // Reemplazar variables en la plantilla
    const message = messageTemplate
      .replace("{nombre}", appointment.patientName)
      .replace("{fecha}", formattedDate)
      .replace("{hora}", formattedTime)

    // Formatear el número de teléfono (eliminar espacios, asegurar formato internacional)
    let phoneNumber = appointment.phone.replace(/\s+/g, "")
    if (!phoneNumber.startsWith("+")) {
      // Si no tiene código de país, agregar el de Argentina
      phoneNumber = "+54" + phoneNumber.replace(/^0/, "")
    }

    console.log(`Enviando mensaje a ${phoneNumber}: ${message}`)

    // Aquí implementarías la llamada real a la API de WhatsApp Business o Twilio
    // Por ejemplo, con Twilio:
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      const twilio = require("twilio")(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)

      await twilio.messages.create({
        body: message,
        from: `whatsapp:${process.env.TWILIO_PHONE_NUMBER}`,
        to: `whatsapp:${phoneNumber}`,
      })
    } else {
      // Si no hay credenciales configuradas, simular éxito para pruebas
      console.log("Modo de prueba: mensaje simulado enviado correctamente")
    }

    // Marcar el recordatorio como enviado en la planilla
    await markReminderAsSent(appointment.id)

    return {
      success: true,
      messageId: `msg_${Date.now()}`,
      appointment,
    }
  } catch (error) {
    console.error(`Error al enviar recordatorio a ${appointment.phone}:`, error)
    throw error
  }
}

