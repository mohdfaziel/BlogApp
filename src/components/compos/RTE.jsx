import React from "react";
import { Editor } from "@tinymce/tinymce-react";
//like ref used to get ref of input fields IIly Controller from hook forms help to achieve same functionality
import { Controller } from "react-hook-form";
import { isFulfilled } from "@reduxjs/toolkit";
//here control is the main hero
export default function ({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}

      <Controller
        name={name || "Content"}
        // this control is passed from hook form
        control={control}
        //here field is an attribute and has a tracking event here event is onchange i.e any change occurs in this field inform me through render
        render={({ field: { onChange } }) => (
          //here is the input field which we want to render it can be an input field, editor etc
          <Editor
            initialValue={defaultValue}
            init={{
                //these are the features and properties which will be present in out editor
              initialValue: defaultValue,
              height: 500,
              menubar: true,
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
              content_style:
                "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
            onEditorChange={onChange}
          />
        )}
      />
    </div>
  );
}
