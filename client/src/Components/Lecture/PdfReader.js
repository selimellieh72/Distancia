import React, { useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import mypdf from "./pdf.pdf";
import { Center, Button, Heading, Divider } from "@chakra-ui/react";
import { ReactComponent as DownloadSvg } from "../../assets/svg/download.svg";

export default function PdfReader() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <>
      <Center flexDir="column" display="flex" mt="1rem">
        <Heading mb="1rem" as="h1">Chaptire</Heading>
        <hr className="header__divider" />
      </Center>
      <Center>
        <Document file={mypdf} onLoadSuccess={onDocumentLoadSuccess}>
          <Page pageNumber={pageNumber} />
        </Document>
      </Center>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
      >
        <Button colorScheme="green" display="flex">
          Download <DownloadSvg className="download-icon" />
        </Button>
        <span>
          Page {pageNumber} of {numPages}
        </span>
        <div className="lecture__buttons">
          <button
            disabled={pageNumber === 1}
            onClick={() => setPageNumber(pageNumber - 1)}
            className="btn"
            id="prev-page"
          >
            Prev Page
          </button>
          <button
            disabled={pageNumber === numPages}
            onClick={() => setPageNumber(pageNumber + 1)}
            className="btn"
            id="next-page"
          >
            Next Page 
          </button>
        </div>
      </div>
    </>
  );
}
