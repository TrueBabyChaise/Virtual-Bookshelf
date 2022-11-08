import PropType from "prop-types"

function LoginContainer ({ children }) {
  return (
    <div className="h-full flex flex-col min-h-screen dark:bg-gray-900">
      <div className="flex flex-1 px-1">
        <div className="container mx-auto my-auto">
          { children }
        </div>
      </div>
    </div>
  )
}

LoginContainer.propTypes = {
  children: PropType.node.isRequired
}

export default LoginContainer
