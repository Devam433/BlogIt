import React from 'react' 

function Button({
    children,
    type="button",
    bgColor="bg-blue-700",
    className="",
    ...props
}) {
  return (
    < button
    type={`${type}`}
        className={`px-5 py-2.5 me-2 mb-2 text-base font-medium rounded-lg h-10 text-white ${bgColor} hover:bg-blue-800 transition-all ${className}`}
        {...props}
    >
        {children}
    </button>
  )
}

export default Button