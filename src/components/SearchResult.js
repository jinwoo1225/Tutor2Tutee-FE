import React, { useEffect, useState } from "react";
import { Container, Card } from "react-bootstrap";
import SearchBar from "./SearchBar";
import Axios from "axios";
import { URL } from "./App";

function SearchResult({
  match: {
    params: { query },
  },
  history,
}) {
  const [searchResult, setSearchResult] = useState(undefined);
  useEffect(() => {
    Axios.get(URL + "search/" + query)
      .then(({ data }) => {
        console.log(data);
        setSearchResult(() => {
          return data;
        });
      })
      .catch(({ error }) => console.log(error));
  }, [query]);

  return (
    <Container className="mt-md-3">
      <SearchBar prefix={query} history={history} />
      <h3 className="text-center">{query}에 대한 검색 정보입니다.</h3>
      {searchResult === undefined ? (
        <h4 className="text-center">검색중입니다.</h4>
      ) : (
        <div className="text-center">
          <h5>이런 검색어는 어떠세요?</h5>
          {searchResult.matchedKeyword === null ? null : (
            <p
              as="a"
              onClick={() =>
                history.push("/search/result/" + searchResult.matchedKeyword)
              }
            >
              {searchResult.matchedKeyword}
            </p>
          )}
          {searchResult.recommendKeyword === null ? null : (
            <p
              as="a"
              onClick={() =>
                history.push("/search/result/" + searchResult.recommendKeyword)
              }
            >
              {searchResult.recommendKeyword}
            </p>
          )}
          <h5>
            {searchResult.classes.length === 0
              ? "검색하신 강의가 없습니다."
              : searchResult.classes.length + "개의 강의가 있어요."}
          </h5>

          {searchResult.classes.map((_class) => {
            return (
              <Card body key={_class._id}>
                {_class.className}
              </Card>
            );
          })}
        </div>
      )}
    </Container>
  );
}

export default SearchResult;
