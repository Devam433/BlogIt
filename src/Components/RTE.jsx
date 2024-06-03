
import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'

function RTE({name,label,control,defaultValue}) {

  const apiKey = import.meta.env.VITE_REACTTINYMCE_API_KEY;

  return (
    <div className='w-full'>
        {label && <label>{label}</label>}
        
        <Controller
        name={name || 'content'}
        defaultValue={defaultValue}
        control={control}
        render={({field: {onChange}})=>(
          <Editor
          apiKey={apiKey}
          initialValue={defaultValue}
          init={{
            height:500,
            menubar:false,
            plugins: [
                "image",
                "advlist",
                "autolink",
                "lists",
                "link",
                "image",
                "charmap",
                "preview",
                "anchor",
                "searchreplace",
                "visualblocks",
                "code",
                "fullscreen",
                "insertdatetime",
                "media",
                "table",
                "code",
                "help",
                "wordcount",
                "anchor",
            ],
            toolbar:
            "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
            content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
          }}
          onEditorChange={onChange}
          />
        )}
        />
    </div>
  )
}

export default RTE