import NavigationBar from "@src/components/Navigation/NavigationBar"
import PropType from "prop-types"

function AppContainer ({ children }) {
  return (
    <div className="h-full flex flex-col min-h-screen dark:bg-gray-900">
      <NavigationBar />
      <div className="flex-1 px-1">
        {/* <NavigationTopBar /> */}
        <div className="container mx-auto">
          { children }
        </div>
      </div>
    </div>
  )
}

AppContainer.propTypes = {
  children: PropType.node.isRequired
}

export default AppContainer
