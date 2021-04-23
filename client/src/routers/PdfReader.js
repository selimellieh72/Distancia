import React, { useEffect, useState } from "react";
import { Document, Page } from "react-pdf/dist/esm/entry.webpack";
import mypdf from "./pdf.pdf";
import { Center, Button, Heading, Divider } from "@chakra-ui/react";
import { ReactComponent as DownloadSvg } from "../assets/svg/download.svg";

import { useLocation } from "react-router-dom";

export default function PdfReader(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  const { pdfLink, title } = useLocation().state;

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <>
      <Center flexDir="column" display="flex" mt="1rem">
        <Heading mb="1rem" as="h1">
          {title}
        </Heading>
        <hr className="header__divider" />
      </Center>
      <Center>
        <Document file={pdfLink} onLoadSuccess={onDocumentLoadSuccess}>
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
        <a href={pdfLink} download>
          <Button my="1rem" colorScheme="green" display="flex">
            Download <DownloadSvg className="download-icon" />
          </Button>
        </a>

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
