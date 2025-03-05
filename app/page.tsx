import { Suspense } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CalendarClock, CheckCircle, MessageSquare, Settings } from "lucide-react"
import DashboardStats from "@/components/dashboard-stats"
import ReminderLogs from "@/components/reminder-logs"
import UpcomingAppointments from "@/components/upcoming-appointments"
import ReminderSettings from "@/components/reminder-settings"

export default function Dashboard() {
  return (
    <main className="container mx-auto py-6 px-4 md:px-6">
      <div className="flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Panel de Recordatorios</h1>

        <Suspense fallback={<div>Cargando estadísticas...</div>}>
          <DashboardStats />
        </Suspense>

        <Tabs defaultValue="upcoming">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="upcoming">
              <CalendarClock className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Próximas Citas</span>
            </TabsTrigger>
            <TabsTrigger value="logs">
              <MessageSquare className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Recordatorios</span>
            </TabsTrigger>
            <TabsTrigger value="settings">
              <Settings className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Configuración</span>
            </TabsTrigger>
            <TabsTrigger value="test" className="text-green-600">
              <CheckCircle className="mr-2 h-4 w-4" />
              <span className="hidden sm:inline">Probar</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Próximas Citas</CardTitle>
                <CardDescription>Citas programadas para las próximas 48 horas</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Cargando citas...</div>}>
                  <UpcomingAppointments />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="logs" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Historial de Recordatorios</CardTitle>
                <CardDescription>Registro de mensajes enviados a pacientes</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Cargando historial...</div>}>
                  <ReminderLogs />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Configuración</CardTitle>
                <CardDescription>Ajustes del sistema de recordatorios</CardDescription>
              </CardHeader>
              <CardContent>
                <ReminderSettings />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="test" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Enviar Recordatorio de Prueba</CardTitle>
                <CardDescription>Envía un mensaje de prueba para verificar la configuración</CardDescription>
              </CardHeader>
              <CardContent>
                <Suspense fallback={<div>Cargando...</div>}>
                  <TestReminder />
                </Suspense>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}

function TestReminder() {
  return (
    <div className="space-y-4">
      <p>Envía un mensaje de prueba para verificar que la configuración funciona correctamente.</p>
      <form action="/api/send-test-reminder" method="POST" className="flex gap-2">
        <input
          type="tel"
          name="phone"
          placeholder="+541112345678"
          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
        <button
          type="submit"
          className="inline-flex items-center justify-center whitespace-nowrap rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground ring-offset-background transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50"
        >
          Enviar Prueba
        </button>
      </form>
    </div>
  )
}

