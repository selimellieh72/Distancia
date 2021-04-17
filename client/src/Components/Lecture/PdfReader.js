import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import mypdf from "./pdf.pdf";

export default function PdfReader() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <>
      <Document file={mypdf} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>

      <p>
        Page {pageNumber} of {numPages}
      </p>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <button
          disabled={pageNumber === 1}
          onClick={() => setPageNumber(pageNumber - 1)}
        >
          -
        </button>
        <button
          disabled={pageNumber === numPages}
          onClick={() => setPageNumber(pageNumber + 1)}
        >
          +
        </button>
      </div>
    </>
  );
}
