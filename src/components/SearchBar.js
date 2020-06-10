import React, { useEffect, useState } from "react";
import { Form, InputGroup, Button } from "react-bootstrap";

function SearchBar({ prefix, history }) {
  const [query, setQuery] = useState(prefix);
  const Search = () => {
    history.push(`/search/result/${query}`);
  };
  useEffect(() => {
    if (prefix !== undefined)
      document.querySelector(".searchQuery").value = prefix;
  }, [prefix]);
  return (
    <InputGroup>
      <Form.Control
        placeholder="강의를 검색하세요!"
        onChange={(e) => {
          setQuery(e.target.value);
        }}
        onKeyUp={(e) => {
          if (e.keyCode === 13) {
            Search();
          }
        }}
        className="searchQuery"
      />
      <InputGroup.Append>
        <Button onClick={Search}>검색</Button>
      </InputGroup.Append>
    </InputGroup>
  );
}

export default SearchBar;
