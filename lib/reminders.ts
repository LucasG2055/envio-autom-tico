// This is a mock implementation. In a real app, this would connect to your database
export async function getStats() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 300))

  // Mock data
  return {
    todayAppointments: 8,
    todayAppointmentsChange: 12,
    pendingReminders: 5,
    successfulReminders: 42,
    successRate: 95,
    failedReminders: 2,
  }
}

export async function getReminderLogs() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 400))

  // Mock data
  return [
    {
      id: "1",
      patientName: "María García",
      phone: "+541112345678",
      message:
        "Hola María, le recordamos su cita para mañana 6 de marzo a las 14:30. Por favor confirme su asistencia. Gracias.",
      sentAt: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      status: "success",
    },
    {
      id: "2",
      patientName: "Juan Pérez",
      phone: "+541187654321",
      message:
        "Hola Juan, le recordamos su cita para mañana 6 de marzo a las 16:00. Por favor confirme su asistencia. Gracias.",
      sentAt: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
      status: "success",
    },
    {
      id: "3",
      patientName: "Luis Martínez",
      phone: "+541199887766",
      message:
        "Hola Luis, le recordamos su cita para mañana 6 de marzo a las 10:15. Por favor confirme su asistencia. Gracias.",
      sentAt: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      status: "error",
      error: "Número no válido o no disponible",
    },
  ]
}

