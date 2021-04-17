import { UnorderedList, ListItem, Center } from "@chakra-ui/layout";
import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Tfoot,
  Td,
} from "@chakra-ui/table";
import React from "react";
import Header from "../Components/header/Header";

export default function Stats() {
  return (
    <>
      <Table colorScheme="green" variant="simple">
        <TableCaption>Student Theo Khalil OverAll grades</TableCaption>
        <Thead>
          <Tr>
            <Th>Material</Th>
            <Th>Grade</Th>
            <Th>Over</Th>
            <Th textAlign="center">Mention</Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>French</Td>
            <Td isNumeric>50</Td>
            <Td isNumeric>60</Td>
            <Td textAlign="center">A</Td>
          </Tr>
          <Tr>
            <Td>Arabic</Td>
            <Td isNumeric>55</Td>
            <Td isNumeric>60</Td>
            <Td textAlign="center">A+</Td>
          </Tr>
          <Tr>
            <Td>Maths</Td>
            <Td isNumeric>55</Td>
            <Td isNumeric>100</Td>
            <Td textAlign="center">C</Td>
          </Tr>
          <Tr>
            <Td>Chemisrty</Td>
            <Td isNumeric>35</Td>
            <Td isNumeric>80</Td>
            <Td textAlign="center">C-</Td>
          </Tr>
          <Tr>
            <Td>Physics</Td>
            <Td isNumeric>20</Td>
            <Td isNumeric>120</Td>
            <Td textAlign="center">F</Td>
          </Tr>
          <Tr>
            <Td>English</Td>
            <Td isNumeric>50</Td>
            <Td isNumeric>60</Td>
            <Td textAlign="center">A</Td>
          </Tr>

          <Tr>
            <Td>Sciences</Td>
            <Td isNumeric>60</Td>
            <Td isNumeric>80</Td>
            <Td textAlign="center">B</Td>
          </Tr>
          <Tr>
            <Td>Philosophy</Td>
            <Td isNumeric>55</Td>
            <Td isNumeric>60</Td>
            <Td textAlign="center">A+</Td>
          </Tr>
          <Tr>
            <Td>Sociology</Td>
            <Td isNumeric>40</Td>
            <Td isNumeric>50</Td>
            <Td textAlign="center">A</Td>
          </Tr>
          <Tr>
            <Td>Economy</Td>
            <Td isNumeric>45</Td>
            <Td isNumeric>50</Td>
            <Td textAlign="center">A+</Td>
          </Tr>
        </Tbody>
        <Tfoot></Tfoot>
      </Table>
      <div className="recomendation">
        <Center>
          <div className="recomendation-title">
            <p>
              {" "}
              Regardging your grades Theo we suggest to have a undergraduate
              studies in These Majors:
            </p>
          </div>
        </Center>
        <Center>
          <UnorderedList padding="1.5rem">
            <ListItem>Lorem ipsum dolor sit amet</ListItem>
            <ListItem>Consectetur adipiscing elit</ListItem>
            <ListItem>Integer molestie lorem at massa</ListItem>
            <ListItem>Facilisis in pretium nisl aliquet</ListItem>
          </UnorderedList>
        </Center>
        <Center>
          <div className="recomendation-message">
            <p className="recomendation-message__one">
              Nous avons étudié vos notes et avons conclus que les domains
              inscrit pourront vous satisfaire.
            </p>{" "}
            <br />
            <p className="recomendation-message__two">
              Nos resultats sont issus d'un calcul mathematique qui analyse tout
              votre parcours scolaire et conclus grace a un algorithme les
              domaines qui peuvent vous interesser.
            </p>
            <br />{" "}
            <p className="recomendation-message__two">
              Si vous desirez contacter notre service de recommendations pour
              avoir une aide en direct, <br /> Contacter le: +961 XX XXX XXX
            </p>
          </div>
        </Center>
      </div>
    </>
  );
}
