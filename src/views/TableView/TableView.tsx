import React, { useContext } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import {
  Table,
  TableBody,
  TableHead,
  TableCell,
  TableRow,
  TableContainer,
  Paper,
  Avatar,
} from "@mui/material";
import TableStar from "../../components/TableStar/TableStar";
import Checkbox from "../../components/Checkbox/Checkbox";
import { TableViewProps } from "../../types/types";
import {
  FlexDiv,
  StyledHeaderRow,
  StyledHeaderCell,
  StyledTableCell,
} from "./TableView.styles";
import { UserContext } from "../../contexts/UserContext";
import { formattedDate, formattedTime } from "../../utils/utils";

export default function TableView(props: TableViewProps) {
  const user = useSelector((state: RootState) => state.user);
  const { gists, onRowClick } = props;
  const displayFileNames = (filesArr: string[]) => {
    return React.Children.toArray(
      filesArr.map((file) => {
        return (
          <span>
            {file} {filesArr.length > 1 ? " / " : ""}{" "}
          </span>
        );
      })
    );
  };
  return (
    <>
      <TableContainer sx={{ marginTop: "2em" }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <StyledHeaderRow>
              <TableCell sx={{ width: "2em" }}>
                <Checkbox />
              </TableCell>
              <TableCell></TableCell>
              <StyledHeaderCell>Name</StyledHeaderCell>
              <StyledHeaderCell>Date</StyledHeaderCell>
              <StyledHeaderCell>Time</StyledHeaderCell>
              <StyledHeaderCell>Keyword</StyledHeaderCell>
              <StyledHeaderCell>Notebook Name</StyledHeaderCell>
              <TableCell></TableCell>
            </StyledHeaderRow>
          </TableHead>
          <TableBody>
            {React.Children.toArray(
              gists &&
                gists.length > 0 &&
                gists.map((row: any) => {
                  const filenames = Object.keys(row.files);
                  return (
                    <TableRow
                      key={row.id}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                    >
                      <TableCell sx={{ width: ".1em", paddingRight: ".2em" }}>
                        <Checkbox />
                      </TableCell>
                      <TableCell
                        sx={{
                          width: ".1em",
                          paddingRight: ".2em",
                          paddingLeft: ".2em",
                        }}
                      >
                        <Avatar src={row.owner.avatar_url} />
                      </TableCell>

                      <StyledTableCell
                        onClick={() => onRowClick(row)}
                        sx={{ cursor: "pointer" }}
                      >
                        <FlexDiv>{row.owner.login}</FlexDiv>
                      </StyledTableCell>
                      <StyledTableCell>
                        {formattedDate(row.created_at)}
                      </StyledTableCell>
                      <StyledTableCell>
                        {formattedTime(row.created_at)}
                      </StyledTableCell>
                      <StyledTableCell>{"WebServer"}</StyledTableCell>
                      <StyledTableCell className="notebook-name">
                        {displayFileNames(filenames)}
                      </StyledTableCell>
                      <StyledTableCell>
                        {user?.username && (
                          <TableStar
                            id={row.id}
                            handleStar={props.handleStar}
                            handleUnstar={props.handleUnstar}
                          />
                        )}
                      </StyledTableCell>
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
