import NavigationBar from "@components/Navigation/NavigationBar"

function AppContainer ({ children }) {
  return (
    <div className="h-full min-h-screen flex dark:bg-gray-900">
      <NavigationBar />
      <div className="p-4">
        { children }
      </div>
    </div>
  )
}

export default AppContainer
