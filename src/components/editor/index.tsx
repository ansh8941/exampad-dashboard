"use client";
import { ReactNode } from "react";
import dynamic from 'next/dynamic';

 const ReactQuill = dynamic(() => import('react-quill'), { ssr: false })
import "./quill.snow.css"; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

interface EditorProps {
  formik: {
    values: { content: any };
    setFieldValue: (a: string, b: ReactNode) => any;
  };
}

const Editor = (props: EditorProps) => {
  const { formik } = props;

  return (
    <ReactQuill
      theme="snow"
      value={formik.values.content || ""}
      onChange={(e: ReactNode) => formik.setFieldValue("content", e)}
    />
  );
};

export default Editor;
