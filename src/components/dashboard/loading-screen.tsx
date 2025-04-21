import { Loader2 } from "lucide-react"

export default function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <div className="text-center">
        <div className="flex items-center justify-center">
          <Loader2 className="h-12 w-12 text-blue-600 animate-spin" />
        </div>
        <p className="mt-4 text-lg text-gray-600">Loading your dashboard...</p>
      </div>
    </div>
  )
}
