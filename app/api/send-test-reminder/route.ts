import { NextResponse } from "next/server"
import { sendWhatsAppReminder } from "@/lib/whatsapp"

export async function POST(request: Request) {
  try {
    const formData = await request.formData()
    const phone = formData.get("phone") as string

    if (!phone) {
      return NextResponse.json({ success: false, error: "El número de teléfono es obligatorio" }, { status: 400 })
    }

    // Crear una cita de prueba
    const testAppointment = {
      id: "test",
      patientName: "Paciente de Prueba",
      date: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 horas desde ahora
      phone,
    }

    // Enviar un recordatorio de prueba
    const result = await sendWhatsAppReminder(testAppointment)

    return NextResponse.json({
      success: true,
      message: "Recordatorio de prueba enviado correctamente",
      result,
    })
  } catch (error) {
    console.error("Error al enviar recordatorio de prueba:", error)
    return NextResponse.json({ success: false, error: "Error al enviar recordatorio de prueba" }, { status: 500 })
  }
}

