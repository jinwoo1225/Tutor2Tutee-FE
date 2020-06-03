import React from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

function SearchBar() {
  return (
    <InputGroup>
      <Form.Control placeholder="강의를 검색하세요!" />
      <InputGroup.Append>
        <Button>검색</Button>
      </InputGroup.Append>
    </InputGroup>
  );
}

export default SearchBar;
