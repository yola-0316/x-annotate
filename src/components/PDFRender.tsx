import { Document, Page } from "react-pdf";

export function PdfViewer({ file }: { file?: File }={}) {
  return (
    <Document file={file}>
      <Page pageNumber={1} />
    </Document>
  );
}
