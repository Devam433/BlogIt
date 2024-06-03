import React,{forwardRef, useId} from 'react'

const Input = forwardRef(function Input({
    label,
    type="text",
    className="",
    height='',
    width='',
    defaultValue=null,
    ...props
},ref){
    const id=useId();
    return (
    <div className='w-full h-[45px] text-lg'>
        {label && <label htmlFor={id}>{label}</label>}
        <input type={`${type}`} id={id} className={`${className} indent-3 rounded-sm h-${height===true ? height : `10`} w-72 `} {...props} ref={ref}/>
    </div>
    )
})


export default Input