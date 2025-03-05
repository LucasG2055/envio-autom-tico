// This is a mock implementation. In a real app, this would connect to Google Sheets API
export async function getUpcomingAppointments() {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Mock data
  return [
    {
      id: "1",
      patientName: "María García",
      date: new Date(Date.now() + 1000 * 60 * 60 * 4), // 4 hours from now
      phone: "+541112345678",
      reminderSent: true,
    },
    {
      id: "2",
      patientName: "Juan Pérez",
      date: new Date(Date.now() + 1000 * 60 * 60 * 8), // 8 hours from now
      phone: "+541187654321",
      reminderSent: true,
    },
    {
      id: "3",
      patientName: "Ana Rodríguez",
      date: new Date(Date.now() + 1000 * 60 * 60 * 20), // 20 hours from now
      phone: "+541156781234",
      reminderSent: false,
    },
    {
      id: "4",
      patientName: "Carlos Sánchez",
      date: new Date(Date.now() + 1000 * 60 * 60 * 25), // 25 hours from now
      phone: "+541143215678",
      reminderSent: false,
    },
  ]
}

