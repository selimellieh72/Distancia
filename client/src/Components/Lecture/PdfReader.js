import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import mypdf from "./pdf.pdf";
import { Center } from "@chakra-ui/react";

export default function PdfReader() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <>
      <Center>
        <Document file={mypdf} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      </Center>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <p>
          Page {pageNumber} of {numPages}
        </p>
        <button
          isabled={pageNumber === 1}
          onClick={() => setPageNumber(pageNumber - 1)}
          class="btn"
          id="next-page"
        >
          Next Page <i class="fas fa-arrow-circle-right"></i>
        </button>
        <button
          disabled={pageNumber === numPages}
          onClick={() => setPageNumber(pageNumber + 1)}
          class="btn"
          id="next-page"
        >
          Next Page <i class="fas fa-arrow-circle-right"></i>
        </button>
      </div>
    </>
  );
}
