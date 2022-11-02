import NavigationBar from "@components/Navigation/NavigationBar"
import PropType from "prop-types"

function AppContainer ({ children }) {
  return (
    <div className="h-full min-h-screen flex dark:bg-gray-900">
      <NavigationBar />
      <div className="flex-1 px-6 py-7">

        { children }
      </div>
    </div>
  )
}

AppContainer.propTypes = {
  children: PropType.node.isRequired
}

export default AppContainer
