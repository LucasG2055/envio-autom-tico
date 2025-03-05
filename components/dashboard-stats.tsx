import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getStats } from "@/lib/reminders"
import { CalendarClock, CheckCircle, Clock, XCircle } from "lucide-react"

export default async function DashboardStats() {
  // In a real app, this would fetch data from your database
  const stats = await getStats()

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Citas Hoy</CardTitle>
          <CalendarClock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.todayAppointments}</div>
          <p className="text-xs text-muted-foreground">
            {stats.todayAppointmentsChange > 0 ? "+" : ""}
            {stats.todayAppointmentsChange}% desde ayer
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Recordatorios Pendientes</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.pendingReminders}</div>
          <p className="text-xs text-muted-foreground">Para las próximas 24 horas</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Enviados Exitosamente</CardTitle>
          <CheckCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.successfulReminders}</div>
          <p className="text-xs text-muted-foreground">{stats.successRate}% tasa de éxito</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Fallos</CardTitle>
          <XCircle className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stats.failedReminders}</div>
          <p className="text-xs text-muted-foreground">En los últimos 7 días</p>
        </CardContent>
      </Card>
    </div>
  )
}

